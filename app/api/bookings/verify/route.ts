import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyBookingHash } from "@/services/contract";
import { getBooking } from "@/services/booking";
import { logger } from "@/lib/logger";

const verifyBookingSchema = z.object({
  bookingId: z.string().optional(),
  providerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  bookingHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
});

/**
 * POST /api/bookings/verify
 * Verify a booking hash exists on-chain
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifyBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { bookingId, providerAddress, bookingHash } = parsed.data;

    // Verify on-chain
    const existsOnChain = await verifyBookingHash(
      providerAddress as `0x${string}`,
      bookingHash as `0x${string}`
    );

    // If bookingId provided, also verify off-chain data
    let booking = null;
    if (bookingId) {
      booking = await getBooking(bookingId);
    }

    return NextResponse.json({
      verified: existsOnChain,
      providerAddress,
      bookingHash,
      booking: booking
        ? {
            id: booking.id,
            status: booking.status,
            startTime: booking.startTime.toISOString(),
            endTime: booking.endTime.toISOString(),
          }
        : null,
    });
  } catch (error) {
    logger.error("Failed to verify booking", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to verify booking",
      },
      { status: 500 }
    );
  }
}
