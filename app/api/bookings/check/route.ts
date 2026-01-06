import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isTimeSlotAvailable } from "@/services/contract";
import { logger } from "@/lib/logger";

const checkAvailabilitySchema = z.object({
  providerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

/**
 * POST /api/bookings/check
 * Check if a time slot is available for a provider
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkAvailabilitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { providerAddress, startTime, endTime } = parsed.data;

    const available = await isTimeSlotAvailable(
      providerAddress as `0x${string}`,
      BigInt(Math.floor(new Date(startTime).getTime() / 1000)),
      BigInt(Math.floor(new Date(endTime).getTime() / 1000))
    );

    return NextResponse.json({
      available,
      providerAddress,
      startTime,
      endTime,
    });
  } catch (error) {
    logger.error("Failed to check availability", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to check availability",
      },
      { status: 500 }
    );
  }
}
