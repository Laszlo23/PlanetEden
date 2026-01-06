# Services

## SIWE Service (`siwe.ts`)

Sign-In With Ethereum (SIWE) service for wallet-based authentication.

### Features

- **Message Generation**: Creates SIWE messages with nonces for users to sign
- **Signature Verification**: Cryptographically verifies wallet signatures
- **Identity Management**: Creates and manages wallet identities with hashed identifiers

### Usage

```typescript
import { generateSiweMessage, verifySiweSignature } from "@/services/siwe";

// Generate a message for the user to sign
const { message, nonce } = await generateSiweMessage(
  "0x...",
  "example.com",
  "https://example.com"
);

// Verify a signed message
const result = await verifySiweSignature(message, signature);
if (result.valid) {
  // User is authenticated
  console.log("Authenticated:", result.address);
}
```

### Security

- Nonces are stored server-side and expire after 10 minutes
- Signatures are cryptographically verified using viem
- Wallet addresses are normalized (lowercase) for consistency
- Identity IDs are hashed for privacy
