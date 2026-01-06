import "server-only";
import { SiweMessage } from "siwe";
import { verifyMessage, isAddress } from "viem";
import { logger } from "@/lib/logger";
import { db } from "@/db/store";
import { randomBytes, createHash } from "crypto";

/**
 * SIWE Service
 * 
 * Handles Sign-In With Ethereum message generation and verification.
 * All verification happens server-side for security.
 */

/**
 * Generate a SIWE message for the user to sign
 * 
 * Creates a nonce-based message that the user signs with their wallet.
 * The nonce is stored server-side to prevent replay attacks.
 */
export async function generateSiweMessage(
  address: string,
  domain: string,
  origin: string
): Promise<{ message: string; nonce: string }> {
  // Validate address format
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }

  // Generate a cryptographically secure random nonce
  const nonce = randomBytes(16).toString("hex");

  // Create SIWE message
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement: "Sign in with Ethereum to Planet Eden",
    uri: origin,
    version: "1",
    chainId: 1, // Mainnet - adjust as needed for your chain
    nonce,
  });

  const message = siweMessage.prepareMessage();

  // Store session with nonce (expires in 10 minutes)
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  await db.createSession({
    id: nonce,
    walletAddress: address.toLowerCase(),
    nonce,
    expiresAt,
    createdAt: new Date(),
  });

  logger.info("SIWE message generated", { address: address.toLowerCase() });

  return { message, nonce };
}

/**
 * Verify a SIWE signature
 * 
 * This function:
 * 1. Validates the SIWE message structure
 * 2. Checks that the nonce exists and hasn't expired
 * 3. Cryptographically verifies the signature
 * 4. Creates or updates the user identity
 * 
 * Returns the user ID if verification succeeds.
 */
export async function verifySiweSignature(
  message: string,
  signature: string
): Promise<{ valid: boolean; userId: string | null; error?: string }> {
  try {
    // Parse the SIWE message
    const siweMessage = new SiweMessage(message);

    // Validate the message fields (this also validates signature format)
    const fields = await siweMessage.validate(signature);

    // Check if nonce exists in our session store
    const session = await db.getSessionByNonce(fields.nonce);
    if (!session) {
      logger.warn("SIWE verification failed: nonce not found", {
        nonce: fields.nonce,
      });
      return { valid: false, userId: null, error: "Invalid or expired nonce" };
    }

    // Normalize address for comparison
    const normalizedAddress = fields.address.toLowerCase();

    // Verify the address matches the session
    if (session.walletAddress.toLowerCase() !== normalizedAddress) {
      logger.warn("SIWE verification failed: address mismatch", {
        sessionAddress: session.walletAddress,
        messageAddress: normalizedAddress,
      });
      return { valid: false, userId: null, error: "Address mismatch" };
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      await db.deleteSession(session.id);
      logger.warn("SIWE verification failed: session expired", {
        nonce: fields.nonce,
      });
      return { valid: false, userId: null, error: "Session expired" };
    }

    // Verify the signature cryptographically
    const isValid = await verifyMessage({
      address: fields.address as `0x${string}`,
      message: siweMessage.prepareMessage(),
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      logger.warn("SIWE verification failed: invalid signature", {
        address: fields.address,
      });
      return { valid: false, userId: null, error: "Invalid signature" };
    }

    // Clean up session (nonce can only be used once)
    await db.deleteSession(session.id);

    // Create or update user identity
    const userId = await getOrCreateUser(normalizedAddress);

    logger.info("SIWE verification successful", {
      address: normalizedAddress,
      userId,
    });

    return { valid: true, userId };
  } catch (error) {
    logger.error("SIWE verification error", error);
    return {
      valid: false,
      userId: null,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}

/**
 * Get or create a user identity
 * 
 * Creates a hashed internal identifier for privacy.
 * The wallet address is the only external identifier.
 */
async function getOrCreateUser(walletAddress: string): Promise<string> {
  // Check if user exists
  const existing = await db.getUserByWalletAddress(walletAddress);
  if (existing) {
    // Update last verified timestamp
    await db.updateUserLastVerified(existing.id);
    return existing.id;
  }

  // Create new user with hashed identifier
  const userId = createUserId(walletAddress);
  const now = new Date();

  await db.createUser({
    id: userId,
    walletAddress,
    createdAt: now,
    lastVerifiedAt: now,
  });

  return userId;
}

/**
 * Create a hashed user ID from wallet address
 * 
 * This provides privacy while maintaining uniqueness.
 * The hash is deterministic, so the same address always gets the same ID.
 */
function createUserId(walletAddress: string): string {
  const hash = createHash("sha256")
    .update(walletAddress.toLowerCase() + (process.env.NODE_ENV ?? "development"))
    .digest("hex");
  return hash.substring(0, 32); // Use first 32 chars as ID
}
