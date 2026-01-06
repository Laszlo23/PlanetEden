# Sign-In With Ethereum (SIWE) Implementation

## Overview

This implementation provides wallet-based identity using Sign-In With Ethereum (SIWE). The wallet address is the primary and only identity - no email, password, or username required.

## Flow

### 1. Wallet Connection (Client-Side)
- User connects their wallet using `lib/wallet.ts` utilities
- Read-only connection - only retrieves the wallet address
- Supports any EVM-compatible wallet (MetaMask, WalletConnect, etc.)

### 2. SIWE Message Generation (Server-Side)
- Client requests a SIWE message from `/api/siwe/nonce`
- Server generates a cryptographically secure random nonce
- Server creates a SIWE message with the nonce and stores it temporarily
- Message is returned to client for signing

### 3. Message Signing (Client-Side)
- User signs the SIWE message with their wallet
- Signature is generated using the wallet's private key
- Only the signature is sent to the server (never the private key)

### 4. Signature Verification (Server-Side)
- Client sends signed message to `/api/siwe/verify`
- Server verifies:
  - Nonce exists and hasn't expired (10 minute window)
  - Address in message matches the session
  - Signature is cryptographically valid
- If valid, creates/updates user identity and issues session token

### 5. Session Management
- Secure HTTP-only cookie is set after successful verification
- Session token includes user ID and expiration (7 days)
- Token is signed with HMAC-SHA256 for integrity
- Session can be verified via `/api/auth/session`

## Security Considerations

### Replay Attack Prevention
- **Nonce-based**: Each SIWE message has a unique nonce
- **Single-use**: Nonce is deleted after successful verification
- **Time-limited**: Nonces expire after 10 minutes

### Server-Side Verification
- All signature verification happens server-side
- Client never verifies signatures (prevents manipulation)
- Cryptographic verification using viem's `verifyMessage`

### Minimal Data Storage
- Only wallet address and hashed internal ID stored
- No signed messages stored
- No personal data collected
- User ID is hashed for privacy

### Session Security
- HTTP-only cookies (not accessible via JavaScript)
- Secure flag in production (HTTPS only)
- Signed tokens prevent tampering
- Expiration enforced (7 days)

## API Endpoints

### `GET /api/siwe/nonce?address=0x...`
Generate a SIWE message and nonce.

**Response:**
```json
{
  "message": "string",
  "nonce": "string"
}
```

### `POST /api/siwe/verify`
Verify a signed SIWE message and create session.

**Body:**
```json
{
  "message": "string",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "userId": "string"
}
```

### `GET /api/auth/session`
Check if current session is valid.

**Response:**
```json
{
  "authenticated": true,
  "userId": "string"
}
```

### `DELETE /api/auth/session`
Log out by clearing session cookie.

## Usage Example

```typescript
// Client-side
import { connectWallet, signMessage } from "@/lib/wallet";

// 1. Connect wallet
const address = await connectWallet();

// 2. Get SIWE message
const response = await fetch(`/api/siwe/nonce?address=${address}`);
const { message } = await response.json();

// 3. Sign message
const signature = await signMessage(address, message);

// 4. Verify and create session
const verifyResponse = await fetch("/api/siwe/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message, signature }),
});

// Session cookie is now set automatically
```

## Database Schema

### User
- `id`: Hashed internal identifier (SHA-256)
- `walletAddress`: Ethereum address (lowercase, normalized)
- `createdAt`: Account creation timestamp
- `lastVerifiedAt`: Last SIWE verification timestamp

### Session (Temporary)
- `id`: Session ID (nonce)
- `walletAddress`: Associated wallet address
- `nonce`: SIWE nonce
- `expiresAt`: Expiration timestamp (10 minutes)
- `createdAt`: Creation timestamp

## Future Enhancements

The structure is ready for:
- Role-based access control
- Multi-signature support
- Session refresh tokens
- Rate limiting per wallet address
