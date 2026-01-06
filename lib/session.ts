import "server-only";
import { randomBytes, createHmac } from "crypto";
import { logger } from "./logger";

/**
 * Session Management
 * 
 * Handles secure session token generation and validation.
 * Sessions are HTTP-only and server-managed.
 */

import { serverEnv } from "./env.server";

const SESSION_SECRET =
  serverEnv.SESSION_SECRET || "change-me-in-production-min-32-chars";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Generate a secure session token
 * 
 * Creates a signed token that can be verified server-side.
 * The token includes the user ID and expiration time.
 */
export function createSessionToken(userId: string): string {
  const tokenId = randomBytes(16).toString("hex");
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;

  // Create signed token
  const payload = `${userId}:${expiresAt}:${tokenId}`;
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  return `${payload}:${signature}`;
}

/**
 * Verify and extract user ID from session token
 * 
 * Validates the token signature and expiration.
 * Returns null if token is invalid or expired.
 */
export function verifySessionToken(token: string): string | null {
  try {
    const parts = token.split(":");
    if (parts.length !== 4) {
      return null;
    }

    const [userId, expiresAtStr, tokenId, signature] = parts;

    if (!userId || !expiresAtStr || !tokenId || !signature) {
      return null;
    }

    // Check expiration
    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() > expiresAt) {
      logger.debug("Session token expired", { userId });
      return null;
    }

    // Verify signature
    const payload = `${userId}:${expiresAtStr}:${tokenId}`;
    const expectedSignature = createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      logger.warn("Invalid session token signature", { userId });
      return null;
    }

    return userId;
  } catch (error) {
    logger.error("Session token verification error", error);
    return null;
  }
}

/**
 * Get session options for cookies
 */
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}
