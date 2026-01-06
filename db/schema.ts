import { z } from "zod";

/**
 * Wallet Identity Schema
 * Stores only wallet address and hashed identifier
 */
export const WalletIdentitySchema = z.object({
  id: z.string(), // Hashed identifier (derived from address + nonce)
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/), // Ethereum address
  createdAt: z.date(),
  lastVerifiedAt: z.date(),
});

export type WalletIdentity = z.infer<typeof WalletIdentitySchema>;

/**
 * Session Schema
 * Stores active SIWE sessions
 */
export const SessionSchema = z.object({
  id: z.string(), // Session ID
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  nonce: z.string(), // SIWE nonce
  expiresAt: z.date(),
  createdAt: z.date(),
});

export type Session = z.infer<typeof SessionSchema>;
