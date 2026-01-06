"use client";

import { createWalletClient, custom } from "viem";
import type { Address } from "viem";

export type { Address };

// Extend Window interface for ethereum provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      isMetaMask?: boolean;
    };
  }
}

/**
 * Client-Side Wallet Utilities
 * 
 * Handles wallet connection and message signing.
 * All verification happens server-side.
 */

/**
 * Connect to user's wallet (read-only)
 * Returns the connected wallet address
 */
export async function connectWallet(): Promise<Address | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Ethereum provider found. Please install MetaMask or another wallet.");
  }

  try {
    // Request account access
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (!accounts || accounts.length === 0) {
      return null;
    }

    const address = accounts[0] as Address;
    return address;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
}

/**
 * Get the current connected address (if already connected)
 */
export async function getConnectedAddress(): Promise<Address | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    return null;
  }

  try {
    const accounts = (await window.ethereum.request({
      method: "eth_accounts",
    })) as string[];

    if (!accounts || accounts.length === 0) {
      return null;
    }

    return accounts[0] as Address;
  } catch (error) {
    console.error("Failed to get connected address:", error);
    return null;
  }
}

/**
 * Sign a message with the connected wallet
 */
export async function signMessage(
  address: Address,
  message: string
): Promise<string> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Ethereum provider found");
  }

  try {
    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    const signature = await walletClient.signMessage({
      account: address,
      message,
    });

    return signature;
  } catch (error) {
    console.error("Failed to sign message:", error);
    throw error;
  }
}
