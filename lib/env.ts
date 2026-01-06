import { z } from "zod";

/**
 * Environment variable schema
 * Add all environment variables here with proper validation
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Next.js public variables (safe to expose to client)
  // Prefix with NEXT_PUBLIC_ to make them available on client
  // Only add variables that are truly safe to expose
  NEXT_PUBLIC_APP_DOMAIN: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_ORIGIN: z.string().url().optional(),

  // Server-only variables (never exposed to client)
  // Add your server-side secrets here
  // DATABASE_URL: z.string().url().optional(),
  // API_SECRET_KEY: z.string().min(32).optional(),
  BOOKING_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  RPC_URL: z.string().url().optional(),
  PRIVATE_KEY: z.string().regex(/^0x[a-fA-F0-9]{64}$/).optional(),
});

/**
 * Validated environment variables
 * This will throw at build time if required env vars are missing or invalid
 */
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  BOOKING_CONTRACT_ADDRESS: process.env.BOOKING_CONTRACT_ADDRESS,
  RPC_URL: process.env.RPC_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
});

/**
 * Type-safe environment variable access
 * Use this instead of process.env directly
 */
export type Env = z.infer<typeof envSchema>;
