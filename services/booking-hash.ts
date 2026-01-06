import "server-only";
import { createHash } from "crypto";

/**
 * Booking Hash Service
 * Generates deterministic hashes for booking commitments
 */

interface BookingHashInput {
  bookingId: string;
  providerAddress: string;
  clientAddress?: string;
  startTime: Date;
  endTime: Date;
  metadata?: {
    title?: string;
    description?: string;
  };
}

/**
 * Generate a deterministic booking hash
 * This hash is committed on-chain to prove booking integrity
 * 
 * The hash includes:
 * - Booking ID
 * - Provider address
 * - Client address (if provided)
 * - Start and end times
 * - Metadata (if provided)
 * 
 * Note: No personal data is included in the hash
 */
export function generateBookingHash(input: BookingHashInput): `0x${string}` {
  // Create a deterministic string representation
  const hashInput = JSON.stringify({
    bookingId: input.bookingId,
    providerAddress: input.providerAddress.toLowerCase(),
    clientAddress: input.clientAddress?.toLowerCase() ?? "",
    startTime: input.startTime.toISOString(),
    endTime: input.endTime.toISOString(),
    metadata: input.metadata ?? {},
  });

  // Generate SHA-256 hash
  const hash = createHash("sha256").update(hashInput).digest("hex");

  // Return as 0x-prefixed hex string (bytes32 format)
  return `0x${hash}` as `0x${string}`;
}

/**
 * Verify a booking hash matches the input data
 */
export function verifyBookingHash(
  input: BookingHashInput,
  expectedHash: string
): boolean {
  const computedHash = generateBookingHash(input);
  return computedHash.toLowerCase() === expectedHash.toLowerCase();
}
