"use client";

import { z } from "zod";

/**
 * Client-side environment variable schema
 * Only includes variables prefixed with NEXT_PUBLIC_
 * 
 * This ensures we never accidentally expose server-side secrets
 */
const clientEnvSchema = z.object({
  // Only add NEXT_PUBLIC_ variables here
  NEXT_PUBLIC_APP_DOMAIN: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_ORIGIN: z.string().url().optional(),
});

/**
 * Validated client-side environment variables
 * This will throw at build time if required env vars are missing or invalid
 */
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
});

/**
 * Type-safe client-side environment variable access
 * Use this in client components instead of process.env
 */
export type ClientEnv = z.infer<typeof clientEnvSchema>;
