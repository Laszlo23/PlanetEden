# Booking Integrity System

A booking system with on-chain anchoring for integrity verification.

## Architecture

### Off-Chain (Server)
- **Booking Data**: All booking details stored off-chain
- **Booking Hash**: Deterministic hash generated from booking data
- **No Personal Data**: Personal information never stored on-chain

### On-Chain (Smart Contract)
- **Booking Hash Commitments**: Only hashes are stored on-chain
- **Overlap Prevention**: Prevents double-booking per provider
- **Minimal Storage**: Efficient time slot-based storage

## Flow

1. **Create Booking** (Off-Chain)
   - Client creates booking with provider, time, metadata
   - Server generates deterministic booking hash
   - Booking stored in database

2. **Commit to Chain** (On-Chain)
   - Booking hash committed to smart contract
   - Contract verifies no overlapping bookings
   - Transaction hash returned

3. **Verification** (On-Chain)
   - Anyone can verify booking exists by checking hash
   - Contract prevents overlapping bookings
   - Off-chain data can be verified against on-chain hash

## API Endpoints

### `POST /api/bookings/create`
Create a new booking and commit it on-chain.

**Request:**
```json
{
  "providerAddress": "0x...",
  "clientAddress": "0x...",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:00:00Z",
  "metadata": {
    "title": "Consultation",
    "description": "Initial consultation"
  }
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "...",
    "providerAddress": "0x...",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T11:00:00Z",
    "status": "committed",
    "bookingHash": "0x..."
  },
  "txHash": "0x..."
}
```

### `POST /api/bookings/check`
Check if a time slot is available.

**Request:**
```json
{
  "providerAddress": "0x...",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:00:00Z"
}
```

**Response:**
```json
{
  "available": true,
  "providerAddress": "0x...",
  "startTime": "2024-01-15T10:00:00Z",
  "endTime": "2024-01-15T11:00:00Z"
}
```

### `GET /api/bookings/[id]`
Get booking details by ID.

### `DELETE /api/bookings/[id]`
Cancel a booking (off-chain and on-chain).

### `POST /api/bookings/verify`
Verify a booking hash exists on-chain.

## Security

- **Hash Integrity**: Booking hashes are deterministic and cannot be forged
- **Overlap Prevention**: Contract enforces no overlapping bookings
- **Privacy**: No personal data stored on-chain
- **Verification**: Anyone can verify booking commitments

## Environment Variables

```bash
BOOKING_CONTRACT_ADDRESS=0x...  # Deployed contract address
RPC_URL=https://...            # Ethereum RPC endpoint
PRIVATE_KEY=0x...               # Private key for contract writes
```
