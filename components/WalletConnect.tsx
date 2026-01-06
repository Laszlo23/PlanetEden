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
    <div className="flex items-center gap-3">
      {address ? (
        <>
          <div className="hidden sm:block text-sm">
            <p className="text-dark-textMuted text-xs">Connected</p>
            <p className="font-mono text-xs text-dark-text">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          {!isVerified ? (
            <button
              onClick={handleSignIn}
              disabled={isSigning}
              className="btn-primary text-sm px-4 py-2"
            >
              {isSigning ? "Signing..." : "Sign In"}
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-dark-success text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Verified</span>
            </div>
          )}
          <button
            onClick={handleDisconnect}
            className="text-dark-textMuted hover:text-dark-text text-sm"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="btn-primary text-sm px-4 py-2"
        >
          {isConnecting ? "Connecting..." : "Connect"}
        </button>
      )}
      {error && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-dark-error/20 border border-dark-error rounded-lg text-dark-error text-sm max-w-xs z-50">
          {error}
        </div>
      )}
    </div>
  );
}
