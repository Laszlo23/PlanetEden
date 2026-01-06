"use client";

import { createWalletClient, custom } from "viem";
import type { Address } from "viem";

/**
 * Client-side wallet utilities
 * Handles wallet connection and message signing
 */

export type { Address };

export interface WalletConnection {
  address: Address;
  isConnected: boolean;
}

/**
 * Connect to user's wallet (read-only)
 * Returns the connected address
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

/**
 * Disconnect wallet (clears local state, doesn't disconnect from provider)
 */
export function disconnectWallet(): void {
  // Clear any local storage or state
  // Note: This doesn't disconnect from MetaMask, just clears our app state
  if (typeof window !== "undefined") {
    document.cookie = "wallet-address=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
