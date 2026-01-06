import { z } from "zod";

/**
 * User Schema
 * 
 * Minimal user model for wallet-based identity.
 * Only stores wallet address and internal identifiers.
 * No personal data, no profiles, no business logic.
 */
export const UserSchema = z.object({
  id: z.string(), // Hashed internal identifier
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/), // Ethereum address (lowercase)
  createdAt: z.date(),
  lastVerifiedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Session Schema
 * 
 * Stores active SIWE sessions with nonces.
 * Sessions are temporary and expire after verification.
 */
export const SessionSchema = z.object({
  id: z.string(), // Session ID (nonce)
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/), // Normalized address
  nonce: z.string(), // SIWE nonce
  expiresAt: z.date(),
  createdAt: z.date(),
});

export type Session = z.infer<typeof SessionSchema>;
