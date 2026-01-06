import { z } from "zod";

/**
 * Off-chain booking schema
 * Contains all booking data (no personal data stored on-chain)
 */
export const BookingSchema = z.object({
  id: z.string(), // Unique booking ID
  providerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/), // Provider wallet address
  clientAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(), // Client wallet address (optional)
  startTime: z.date(), // Booking start time
  endTime: z.date(), // Booking end time
  bookingHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/), // On-chain commitment hash
  status: z.enum(["pending", "committed", "cancelled", "completed"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Off-chain metadata (not stored on-chain)
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      // Add other non-sensitive metadata as needed
    })
    .optional(),
});

export type Booking = z.infer<typeof BookingSchema>;

/**
 * Booking creation input (before hash generation)
 */
export const CreateBookingInputSchema = z.object({
  providerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  clientAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  startTime: z.date(),
  endTime: z.date(),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;
