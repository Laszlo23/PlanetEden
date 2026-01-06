import "server-only";
import { SiweMessage } from "siwe";
import { verifyMessage, isAddress } from "viem";
import { logger } from "@/lib/logger";
import { db } from "@/db/store";
import { randomBytes, createHash } from "crypto";

/**
 * SIWE Service
 * Handles Sign-In With Ethereum message generation and verification
 */

/**
 * Generate a SIWE message for the user to sign
 */
export async function generateSiweMessage(
  address: string,
  domain: string,
  origin: string
): Promise<{ message: string; nonce: string }> {
  // Validate address
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }

  // Generate a random nonce
  const nonce = randomBytes(16).toString("hex");

  // Create SIWE message
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement: "Sign in with Ethereum to Planet Eden",
    uri: origin,
    version: "1",
    chainId: 1, // Mainnet - adjust as needed
    nonce,
  });

  const message = siweMessage.prepareMessage();

  // Store session with nonce
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minute expiry

  await db.createSession({
    id: nonce,
    address: address.toLowerCase(),
    nonce,
    expiresAt,
    createdAt: new Date(),
  });

  logger.info("SIWE message generated", { address: address.toLowerCase() });

  return { message, nonce };
}

/**
 * Verify a SIWE signature
 */
export async function verifySiweSignature(
  message: string,
  signature: string
): Promise<{ valid: boolean; address: string | null; error?: string }> {
  try {
    // Parse the SIWE message
    const siweMessage = new SiweMessage(message);

    // Validate the message fields (without signature first to get fields)
    const fields = await siweMessage.validate(signature);

    // Check if nonce exists in our session store
    const session = await db.getSessionByNonce(fields.nonce);
    if (!session) {
      logger.warn("SIWE verification failed: nonce not found", {
        nonce: fields.nonce,
      });
      return { valid: false, address: null, error: "Invalid or expired nonce" };
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      await db.deleteSession(session.id);
      logger.warn("SIWE verification failed: session expired", {
        nonce: fields.nonce,
      });
      return { valid: false, address: null, error: "Session expired" };
    }

    // Verify the signature
    const isValid = await verifyMessage({
      address: fields.address as `0x${string}`,
      message: siweMessage.prepareMessage(),
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      logger.warn("SIWE verification failed: invalid signature", {
        address: fields.address,
      });
      return { valid: false, address: null, error: "Invalid signature" };
    }

    // Clean up session
    await db.deleteSession(session.id);

    // Create or update wallet identity
    const normalizedAddress = fields.address.toLowerCase();
    const identityId = await getOrCreateIdentity(normalizedAddress);

    logger.info("SIWE verification successful", {
      address: normalizedAddress,
      identityId,
    });

    return { valid: true, address: normalizedAddress };
  } catch (error) {
    logger.error("SIWE verification error", error);
    return {
      valid: false,
      address: null,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}

/**
 * Get or create a wallet identity
 */
async function getOrCreateIdentity(address: string): Promise<string> {
  // Check if identity exists
  const existing = await db.getIdentityByAddress(address);
  if (existing) {
    // Update last verified timestamp
    await db.updateIdentityLastVerified(existing.id);
    return existing.id;
  }

  // Create new identity with hashed identifier
  const identityId = createIdentityHash(address);
  const now = new Date();

  await db.createIdentity({
    id: identityId,
    address,
    createdAt: now,
    lastVerifiedAt: now,
  });

  return identityId;
}

/**
 * Create a hashed identifier from wallet address
 * This provides privacy while maintaining uniqueness
 */
function createIdentityHash(address: string): string {
  const hash = createHash("sha256")
    .update(address.toLowerCase() + (process.env.NODE_ENV ?? "development"))
    .digest("hex");
  return hash.substring(0, 32); // Use first 32 chars as ID
}
