import "server-only";
import { isProduction } from "./env.server";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

/**
 * Secure Logger
 * 
 * Prevents accidental logging of sensitive data by automatically
 * redacting common sensitive field names.
 * 
 * Features:
 * - Automatic sanitization of sensitive fields
 * - Different log levels for dev vs production
 * - Structured logging for better observability
 * 
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.info("User action", { userId: "123" });
 *   logger.error("Operation failed", error, { context: "payment" });
 */
class SecureLogger {
  private readonly sensitiveFields = [
    "password",
    "secret",
    "token",
    "key",
    "authorization",
    "cookie",
    "session",
    "private",
    "api_key",
    "apikey",
    "access_token",
    "refresh_token",
    "wallet",
    "mnemonic",
    "private_key",
    "seed",
    "credentials",
  ];

  /**
   * Sanitize data to remove sensitive information
   */
  private sanitize(data: unknown): unknown {
    if (data === null || data === undefined) {
      return data;
    }

    if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item));
    }

    if (typeof data === "object") {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase();
        const isSensitive = this.sensitiveFields.some((field) =>
          lowerKey.includes(field)
        );

        if (isSensitive) {
          sanitized[key] = "[REDACTED]";
        } else {
          sanitized[key] = this.sanitize(value);
        }
      }
      return sanitized;
    }

    return "[UNSERIALIZABLE]";
  }

  /**
   * Format log message with context
   */
  private format(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const sanitizedContext = context ? this.sanitize(context) : undefined;

    if (sanitizedContext) {
      return `[${timestamp}] [${level.toUpperCase()}] ${message} ${JSON.stringify(sanitizedContext)}`;
    }

    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (!isProduction) {
      console.debug(this.format("debug", message, context));
    }
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext): void {
    console.info(this.format("info", message, context));
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext): void {
    console.warn(this.format("warn", message, context));
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      error: error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: isProduction ? undefined : error.stack,
          }
        : String(error),
    };

    console.error(this.format("error", message, errorContext));
  }
}

/**
 * Singleton logger instance
 * Import this in your server-side code
 */
export const logger = new SecureLogger();
