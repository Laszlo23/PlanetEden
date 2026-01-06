import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/services/booking";
import { commitBookingOnChain } from "@/services/contract";
import { logger } from "@/lib/logger";

const createBookingSchema = z.object({
  providerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  clientAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

/**
 * POST /api/bookings/create
 * Create a new booking and commit it on-chain
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { startTime, endTime, ...rest } = parsed.data;

    // Create booking off-chain
    const booking = await createBooking({
      ...rest,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    // Commit booking hash on-chain
    try {
      const txHash = await commitBookingOnChain(
        booking.providerAddress as `0x${string}`,
        BigInt(Math.floor(booking.startTime.getTime() / 1000)),
        BigInt(Math.floor(booking.endTime.getTime() / 1000)),
        booking.bookingHash as `0x${string}`
      );

      // Update booking status
      booking.status = "committed";

      return NextResponse.json({
        success: true,
        booking: {
          id: booking.id,
          providerAddress: booking.providerAddress,
          startTime: booking.startTime.toISOString(),
          endTime: booking.endTime.toISOString(),
          status: booking.status,
          bookingHash: booking.bookingHash,
        },
        txHash,
      });
    } catch (error) {
      // Booking created off-chain but on-chain commit failed
      logger.error("On-chain commit failed", error);
      return NextResponse.json(
        {
          success: false,
          booking: {
            id: booking.id,
            status: booking.status, // Still "pending"
          },
          error: "Booking created but on-chain commit failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error("Failed to create booking", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create booking",
      },
      { status: 500 }
    );
  }
}
