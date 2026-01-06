"use client";

import { z } from "zod";

/**
 * Client-Safe Environment Variable Schema
 * 
 * Only includes variables prefixed with NEXT_PUBLIC_
 * This ensures we never accidentally expose server-side secrets.
 */
const clientEnvSchema = z.object({
  // Only add NEXT_PUBLIC_ variables here
  // NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

/**
 * Validated client-side environment variables
 * 
 * This will throw at build time if required env vars are missing or invalid.
 * Use this in client components when you need environment variables.
 * 
 * Example:
 *   "use client";
 *   import { clientEnv } from "@/lib/env.client";
 *   const appUrl = clientEnv.NEXT_PUBLIC_APP_URL;
 */
export const clientEnv = clientEnvSchema.parse({
  // Extract only NEXT_PUBLIC_ variables from process.env
  ...Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
  ),
});

/**
 * Type-safe client-side environment variable access
 */
export type ClientEnv = z.infer<typeof clientEnvSchema>;
