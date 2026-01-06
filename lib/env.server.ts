import "server-only";
import { env } from "./env";

/**
 * Server-Only Environment Variable Access
 * 
 * This file uses the "server-only" package marker to ensure
 * it can NEVER be imported in client components.
 * 
 * Use this for accessing server-side environment variables
 * to prevent accidental client-side leaks.
 * 
 * Example:
 *   import { serverEnv } from "@/lib/env.server";
 *   const dbUrl = serverEnv.DATABASE_URL;
 */
export const serverEnv = env;

/**
 * Helper to check if we're in production
 */
export const isProduction = serverEnv.NODE_ENV === "production";

/**
 * Helper to check if we're in development
 */
export const isDevelopment = serverEnv.NODE_ENV === "development";
