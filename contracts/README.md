# Smart Contracts

## BookingIntegrity.sol

A Solidity smart contract for on-chain booking commitments.

### Features

- **Minimal On-Chain Storage**: Only stores booking hashes (bytes32)
- **Overlap Prevention**: Prevents overlapping bookings per provider
- **Time Slot Management**: Uses time slot intervals for efficient checking
- **No Personal Data**: Only cryptographic hashes are stored on-chain

### Contract Functions

#### `commitBooking(startTime, endTime, bookingHash)`
Commits a booking hash for a time slot. Prevents overlapping bookings.

#### `cancelBooking(startTime, endTime, bookingHash)`
Cancels a booking commitment.

#### `isTimeSlotAvailable(provider, startTime, endTime)`
Checks if a time slot is available for a provider.

#### `getBookingHash(provider, timeSlot)`
Gets the booking hash for a specific time slot.

#### `hasBooking(provider, bookingHash)`
Checks if a booking hash exists for a provider.

### Events

- `BookingCommitted`: Emitted when a booking is committed
- `BookingCancelled`: Emitted when a booking is cancelled

### Deployment

1. Compile the contract using Hardhat, Foundry, or Remix
2. Deploy to your target network (mainnet, testnet, etc.)
3. Set `BOOKING_CONTRACT_ADDRESS` environment variable

### Usage

See `services/contract.ts` for TypeScript integration examples.
