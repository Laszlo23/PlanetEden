# Library Utilities

## Environment Variables

### `env.server.ts` - Server-only Environment Variables
Use this in Server Components, API routes, and server-side code.

```typescript
import { serverEnv, isProduction } from "@/lib/env.server";

// Access validated environment variables
const nodeEnv = serverEnv.NODE_ENV;
```

**Important**: This file uses `server-only` to prevent accidental client-side imports.

### `env.client.ts` - Client-safe Environment Variables
Use this in Client Components when you need environment variables.

```typescript
"use client";
import { clientEnv } from "@/lib/env.client";

// Only NEXT_PUBLIC_* variables are available here
```

### `env.ts` - Base Environment Schema
Defines the Zod schema for all environment variables. Edit this file to add new environment variables.

## Logging

### `logger.ts` - Secure Logger
Use this for all server-side logging. Automatically sanitizes sensitive data.

```typescript
import { logger } from "@/lib/logger";

logger.info("User action", { userId: "123" });
logger.error("Operation failed", error, { context: "payment" });
```

**Features**:
- Automatically redacts sensitive fields (password, token, key, etc.)
- Different log levels (debug, info, warn, error)
- Structured logging with timestamps
- Debug logs only in development
