# Planet Eden

A clean, secure, scalable Next.js foundation ready for on-chain integration.

## Project Structure

```
planeteden/
├── app/              # Next.js App Router (routes, layouts, pages)
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── services/         # Business logic and API services
├── contracts/        # Smart contract interfaces and types
└── db/              # Database schemas and utilities
```

## Tech Stack

- **Next.js 14** - App Router only
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Runtime type validation for environment variables
- **SIWE** - Sign-In With Ethereum for wallet-based authentication
- **Viem** - Ethereum library for wallet interactions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## TypeScript Configuration

TypeScript is configured with strict mode enabled, including:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noUncheckedIndexedAccess: true`
- `noFallthroughCasesInSwitch: true`

## Security Features

### Environment Variable Validation
- **Zod schema validation** - All environment variables are validated at build time
- **Server-only access** - Use `lib/env.server.ts` for server-side env vars (prevents client leaks)
- **Client-safe access** - Use `lib/env.client.ts` for client-side env vars (only NEXT_PUBLIC_*)

### Security Headers
- **Content Security Policy (CSP)** - Prevents XSS attacks
- **HSTS** - Enforces HTTPS in production
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **Permissions Policy** - Restricts browser features

### Secure Logging
- **Automatic sanitization** - Sensitive fields (passwords, tokens, keys) are redacted
- **Structured logging** - Better observability without exposing secrets
- **Development vs Production** - Different log levels based on environment

### Middleware Foundation
- **Security headers** - Applied to all requests
- **Ready for auth** - Foundation for future authentication checks
- **Ready for wallet verification** - Foundation for wallet signature verification

## Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your environment variables to `.env.local`

3. **Important**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client. All other variables are server-only.

## Wallet Authentication (SIWE)

The project includes a complete Sign-In With Ethereum (SIWE) implementation:

### Features
- **Wallet Connection** - Read-only wallet connection (MetaMask, WalletConnect, etc.)
- **Cryptographic Verification** - Server-side signature verification
- **Identity Management** - Stores wallet address + hashed identifier
- **Session Management** - Secure session handling with nonces

### Usage

1. Connect your wallet using the `WalletConnect` component
2. Sign the SIWE message when prompted
3. Your wallet identity is verified and stored server-side

### API Routes

- `GET /api/siwe/nonce` - Generate SIWE message and nonce
- `POST /api/siwe/verify` - Verify signed message and create session

### Database

Currently uses an in-memory store (for development). Replace `db/store.ts` with your production database.

## Project Status

This is a foundation project with:
- ✅ TypeScript strict mode
- ✅ Tailwind CSS configured
- ✅ App Router structure
- ✅ Clean folder organization
- ✅ Production security hardening
- ✅ Environment variable validation
- ✅ Secure logging utilities
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Middleware foundation for auth/wallet verification
- ✅ Wallet-based identity (SIWE)
- ✅ Cryptographic signature verification
- ⏳ Ready for on-chain integration
