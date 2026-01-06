import "server-only";
import { randomBytes } from "crypto";
import { logger } from "@/lib/logger";
import { bookingDb } from "@/db/store";
import type { Booking, CreateBookingInput } from "@/db/booking-schema";
import { generateBookingHash } from "./booking-hash";

/**
 * Booking Service
 * Handles off-chain booking creation and management
 */

/**
 * Create a new booking (off-chain)
 */
export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  // Validate time range
  if (input.startTime >= input.endTime) {
    throw new Error("Invalid time range: startTime must be before endTime");
  }

  if (input.startTime < new Date()) {
    throw new Error("Cannot create booking in the past");
  }

  // Generate booking ID
  const bookingId = randomBytes(16).toString("hex");

  // Generate booking hash for on-chain commitment
  const bookingHash = generateBookingHash({
    bookingId,
    providerAddress: input.providerAddress,
    clientAddress: input.clientAddress,
    startTime: input.startTime,
    endTime: input.endTime,
    metadata: input.metadata,
  });

  const now = new Date();

  const booking: Booking = {
    id: bookingId,
    providerAddress: input.providerAddress,
    clientAddress: input.clientAddress,
    startTime: input.startTime,
    endTime: input.endTime,
    bookingHash,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata,
  };

  // Store booking
  await bookingDb.create(booking);

  logger.info("Booking created", {
    bookingId,
    providerAddress: input.providerAddress,
  });

  return booking;
}

/**
 * Get booking by ID
 */
export async function getBooking(bookingId: string): Promise<Booking | null> {
  return await bookingDb.getById(bookingId);
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Promise<Booking> {
  const booking = await bookingDb.getById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = status;
  booking.updatedAt = new Date();

  await bookingDb.update(booking);

  logger.info("Booking status updated", { bookingId, status });

  return booking;
}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: string): Promise<Booking> {
  const booking = await bookingDb.getById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "cancelled";
  booking.updatedAt = new Date();

  await bookingDb.update(booking);

  logger.info("Booking cancelled", { bookingId });

  return booking;
}

/**
 * Get bookings for a provider
 */
export async function getProviderBookings(
  providerAddress: string
): Promise<Booking[]> {
  return await bookingDb.getByProvider(providerAddress);
}

/**
 * Get bookings for a client
 */
export async function getClientBookings(
  clientAddress: string
): Promise<Booking[]> {
  return await bookingDb.getByClient(clientAddress);
}

