"use client";

import { useState, useEffect } from "react";
import {
  connectWallet,
  getConnectedAddress,
  signMessage,
  type Address,
} from "@/lib/wallet";

/**
 * WalletConnect Component
 * 
 * Simple UI for testing wallet connection and SIWE flow.
 * This is a minimal implementation for testing purposes.
 */
export function WalletConnect() {
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already connected on mount
  useEffect(() => {
    checkConnection();
    checkSession();
  }, []);

  async function checkConnection() {
    try {
      const connectedAddress = await getConnectedAddress();
      if (connectedAddress) {
        setAddress(connectedAddress);
      }
    } catch (err) {
      console.error("Failed to check connection:", err);
    }
  }

  async function checkSession() {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setStatus("Authenticated");
        }
      }
    } catch (err) {
      console.error("Failed to check session:", err);
    }
  }

  async function handleConnect() {
    setIsConnecting(true);
    setError(null);
    setStatus("");

    try {
      const connectedAddress = await connectWallet();
      if (connectedAddress) {
        setAddress(connectedAddress);
        setStatus("Wallet connected");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleSignIn() {
    if (!address) return;

    setIsSigning(true);
    setError(null);
    setStatus("Requesting SIWE message...");

    try {
      // Step 1: Get SIWE message from server
      const nonceResponse = await fetch(
        `/api/siwe/nonce?address=${address}`
      );
      if (!nonceResponse.ok) {
        throw new Error("Failed to get SIWE message");
      }

      const { message } = await nonceResponse.json();
      setStatus("Please sign the message in your wallet...");

      // Step 2: Sign the message
      const signature = await signMessage(address, message);
      setStatus("Verifying signature...");

      // Step 3: Verify signature with server
      const verifyResponse = await fetch("/api/siwe/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || "Verification failed");
      }

      const data = await verifyResponse.json();
      setIsAuthenticated(true);
      setStatus(`Authenticated! User ID: ${data.userId.slice(0, 8)}...`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
      setStatus("");
    } finally {
      setIsSigning(false);
    }
  }

  async function handleSignOut() {
    try {
      await fetch("/api/auth/session", {
        method: "DELETE",
      });
      setIsAuthenticated(false);
      setAddress(null);
      setStatus("Signed out");
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Wallet Authentication</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {status && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
          {status}
        </div>
      )}

      {!address ? (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 mb-1">Connected Address:</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>

          {!isAuthenticated ? (
            <button
              onClick={handleSignIn}
              disabled={isSigning}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigning ? "Signing..." : "Sign In With Ethereum"}
            </button>
          ) : (
            <div className="space-y-2">
              <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                ✓ Authenticated
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
