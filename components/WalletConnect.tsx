"use client";

import { useState, useEffect } from "react";
import {
  connectWallet,
  getConnectedAddress,
  signMessage,
  disconnectWallet,
  type Address,
} from "@/lib/wallet";

export function WalletConnect() {
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  // Check if already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    try {
      const connectedAddress = await getConnectedAddress();
      if (connectedAddress) {
        setAddress(connectedAddress);
        // Check if verified by checking cookie
        const cookies = document.cookie.split(";");
        const walletCookie = cookies.find((c) =>
          c.trim().startsWith("wallet-address=")
        );
        if (walletCookie) {
          setIsVerified(true);
        }
      }
    } catch (err) {
      console.error("Failed to check connection:", err);
    }
  }

  async function handleConnect() {
    setIsConnecting(true);
    setError(null);

    try {
      const connectedAddress = await connectWallet();
      if (connectedAddress) {
        setAddress(connectedAddress);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect wallet"
      );
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleSignIn() {
    if (!address) return;

    setIsSigning(true);
    setError(null);

    try {
      // Step 1: Get SIWE message from server
      const nonceResponse = await fetch(
        `/api/siwe/nonce?address=${address}`
      );
      if (!nonceResponse.ok) {
        throw new Error("Failed to get SIWE message");
      }

      const { message } = await nonceResponse.json();

      // Step 2: Sign the message
      const signature = await signMessage(address, message);

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

      setIsVerified(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in"
      );
    } finally {
      setIsSigning(false);
    }
  }

  async function handleDisconnect() {
    disconnectWallet();
    setAddress(null);
    setIsVerified(false);
  }

  return (
    <div className="p-4 border rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {!address ? (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Connected Address:</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>

          {!isVerified ? (
            <button
              onClick={handleSignIn}
              disabled={isSigning}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isSigning ? "Signing..." : "Sign In With Ethereum"}
            </button>
          ) : (
            <div className="p-3 bg-green-100 text-green-700 rounded">
              ✓ Verified
            </div>
          )}

          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
