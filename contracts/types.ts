/**
 * TypeScript types for BookingIntegrity contract
 */

export type Address = `0x${string}`;

export interface BookingCommitment {
  provider: Address;
  startTime: bigint;
  endTime: bigint;
  bookingHash: `0x${string}`;
}

export interface BookingSlot {
  slot: bigint;
  bookingHash: `0x${string}` | null;
}

/**
 * Contract ABI for BookingIntegrity
 */
export const BOOKING_INTEGRITY_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "bytes32", name: "bookingHash", type: "bytes32" },
    ],
    name: "commitBooking",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "bytes32", name: "bookingHash", type: "bytes32" },
    ],
    name: "cancelBooking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
    ],
    name: "isTimeSlotAvailable",
    outputs: [{ internalType: "bool", name: "available", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "uint256", name: "timeSlot", type: "uint256" },
    ],
    name: "getBookingHash",
    outputs: [{ internalType: "bytes32", name: "bookingHash", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "bytes32", name: "bookingHash", type: "bytes32" },
    ],
    name: "hasBooking",
    outputs: [{ internalType: "bool", name: "exists", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TIME_SLOT_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "provider", type: "address" },
      { indexed: true, internalType: "uint256", name: "startTime", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "endTime", type: "uint256" },
      { indexed: false, internalType: "bytes32", name: "bookingHash", type: "bytes32" },
    ],
    name: "BookingCommitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "provider", type: "address" },
      { indexed: true, internalType: "uint256", name: "startTime", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "endTime", type: "uint256" },
      { indexed: false, internalType: "bytes32", name: "bookingHash", type: "bytes32" },
    ],
    name: "BookingCancelled",
    type: "event",
  },
] as const;
