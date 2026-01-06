import { z } from "zod";

/**
 * Environment Variable Schema
 * 
 * Define all environment variables here with proper validation.
 * This schema is validated at build time - missing or invalid vars will cause build to fail.
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Next.js public variables (safe to expose to client)
  // Only variables prefixed with NEXT_PUBLIC_ should be added here
  // NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Server-only variables (never exposed to client)
  // Add server-side secrets and configuration here
  // DATABASE_URL: z.string().url().optional(),
  // API_SECRET_KEY: z.string().min(32).optional(),
});

/**
 * Validated environment variables
 * 
 * This will throw at build time if required env vars are missing or invalid.
 * Use this for type-safe environment variable access.
 */
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  // Add other env vars here as you add them to the schema above
});

/**
 * Type-safe environment variable access
 * Use this type instead of process.env directly
 */
export type Env = z.infer<typeof envSchema>;
