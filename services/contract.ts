import "server-only";
import { createPublicClient, createWalletClient, http, type Address } from "viem";
import { mainnet } from "viem/chains"; // Adjust chain as needed
import { privateKeyToAccount } from "viem/accounts";
import { BOOKING_INTEGRITY_ABI } from "@/contracts/types";
import { logger } from "@/lib/logger";

/**
 * Contract Interaction Service
 * Handles on-chain booking commitments
 */

// Contract address (set via environment variable)
const CONTRACT_ADDRESS = process.env.BOOKING_CONTRACT_ADDRESS as Address | undefined;

if (!CONTRACT_ADDRESS) {
  logger.warn("BOOKING_CONTRACT_ADDRESS not set - contract operations will fail");
}

/**
 * Get public client for read operations
 */
function getPublicClient() {
  const rpcUrl = process.env.RPC_URL || "https://eth.llamarpc.com";
  return createPublicClient({
    chain: mainnet, // Adjust as needed
    transport: http(rpcUrl),
  });
}

/**
 * Get wallet client for write operations
 * Requires PRIVATE_KEY environment variable
 */
function getWalletClient() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY not set - cannot perform write operations");
  }

  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const rpcUrl = process.env.RPC_URL || "https://eth.llamarpc.com";

  return createWalletClient({
    account,
    chain: mainnet, // Adjust as needed
    transport: http(rpcUrl),
  });
}

/**
 * Check if a time slot is available for a provider
 */
export async function isTimeSlotAvailable(
  provider: Address,
  startTime: bigint,
  endTime: bigint
): Promise<boolean> {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address not configured");
  }

  try {
    const client = getPublicClient();
    const available = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: BOOKING_INTEGRITY_ABI,
      functionName: "isTimeSlotAvailable",
      args: [provider, startTime, endTime],
    });

    return available;
  } catch (error) {
    logger.error("Failed to check time slot availability", error);
    throw error;
  }
}

/**
 * Commit a booking hash on-chain
 */
export async function commitBookingOnChain(
  provider: Address,
  startTime: bigint,
  endTime: bigint,
  bookingHash: `0x${string}`
): Promise<string> {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address not configured");
  }

  try {
    const client = getWalletClient();

    // Check availability first
    const available = await isTimeSlotAvailable(provider, startTime, endTime);
    if (!available) {
      throw new Error("Time slot is not available");
    }

    // Commit booking
    const hash = await client.writeContract({
      address: CONTRACT_ADDRESS,
      abi: BOOKING_INTEGRITY_ABI,
      functionName: "commitBooking",
      args: [startTime, endTime, bookingHash],
    });

    logger.info("Booking committed on-chain", {
      provider,
      bookingHash,
      txHash: hash,
    });

    return hash;
  } catch (error) {
    logger.error("Failed to commit booking on-chain", error);
    throw error;
  }
}

/**
 * Cancel a booking on-chain
 */
export async function cancelBookingOnChain(
  provider: Address,
  startTime: bigint,
  endTime: bigint,
  bookingHash: `0x${string}`
): Promise<string> {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address not configured");
  }

  try {
    const client = getWalletClient();

    const hash = await client.writeContract({
      address: CONTRACT_ADDRESS,
      abi: BOOKING_INTEGRITY_ABI,
      functionName: "cancelBooking",
      args: [startTime, endTime, bookingHash],
    });

    logger.info("Booking cancelled on-chain", {
      provider,
      bookingHash,
      txHash: hash,
    });

    return hash;
  } catch (error) {
    logger.error("Failed to cancel booking on-chain", error);
    throw error;
  }
}

/**
 * Verify a booking hash exists on-chain
 */
export async function verifyBookingHash(
  provider: Address,
  bookingHash: `0x${string}`
): Promise<boolean> {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address not configured");
  }

  try {
    const client = getPublicClient();
    const exists = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: BOOKING_INTEGRITY_ABI,
      functionName: "hasBooking",
      args: [provider, bookingHash],
    });

    return exists;
  } catch (error) {
    logger.error("Failed to verify booking hash", error);
    throw error;
  }
}
