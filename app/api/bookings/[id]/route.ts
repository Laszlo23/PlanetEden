import { NextRequest, NextResponse } from "next/server";
import { getBooking, cancelBooking } from "@/services/booking";
import { cancelBookingOnChain } from "@/services/contract";
import { logger } from "@/lib/logger";

/**
 * GET /api/bookings/[id]
 * Get booking by ID
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await getBooking(params.id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: booking.id,
      providerAddress: booking.providerAddress,
      clientAddress: booking.clientAddress,
      startTime: booking.startTime.toISOString(),
      endTime: booking.endTime.toISOString(),
      status: booking.status,
      bookingHash: booking.bookingHash,
      metadata: booking.metadata,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    });
  } catch (error) {
    logger.error("Failed to get booking", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to get booking",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Cancel a booking (off-chain and on-chain)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await getBooking(params.id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Cancel on-chain
    try {
      const txHash = await cancelBookingOnChain(
        booking.providerAddress as `0x${string}`,
        BigInt(Math.floor(booking.startTime.getTime() / 1000)),
        BigInt(Math.floor(booking.endTime.getTime() / 1000)),
        booking.bookingHash as `0x${string}`
      );

      // Cancel off-chain
      const cancelledBooking = await cancelBooking(params.id);

      return NextResponse.json({
        success: true,
        booking: {
          id: cancelledBooking.id,
          status: cancelledBooking.status,
        },
        txHash,
      });
    } catch (error) {
      logger.error("On-chain cancellation failed", error);
      // Still cancel off-chain
      const cancelledBooking = await cancelBooking(params.id);

      return NextResponse.json(
        {
          success: false,
          booking: {
            id: cancelledBooking.id,
            status: cancelledBooking.status,
          },
          error: "Booking cancelled off-chain but on-chain cancellation failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error("Failed to cancel booking", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to cancel booking",
      },
      { status: 500 }
    );
  }
}
