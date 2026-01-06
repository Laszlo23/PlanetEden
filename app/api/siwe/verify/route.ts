import { NextRequest, NextResponse } from "next/server";
import { verifySiweSignature } from "@/services/siwe";
import { logger } from "@/lib/logger";
import { z } from "zod";

const verifyRequestSchema = z.object({
  message: z.string().min(1),
  signature: z.string().regex(/^0x[a-fA-F0-9]{130}$/), // 0x + 130 hex chars
});

/**
 * POST /api/siwe/verify
 * Verify a SIWE signature and create/update wallet identity
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifyRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { message, signature } = parsed.data;

    const result = await verifySiweSignature(message, signature);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error ?? "Verification failed" },
        { status: 401 }
      );
    }

    // Set session cookie (you can enhance this with httpOnly, secure, etc.)
    const response = NextResponse.json({
      success: true,
      address: result.address,
    });

    // Set a simple session cookie (in production, use httpOnly, secure, sameSite)
    if (result.address) {
      response.cookies.set("wallet-address", result.address, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    logger.error("Failed to verify SIWE signature", error);
    return NextResponse.json(
      { error: "Failed to verify signature" },
      { status: 500 }
    );
  }
}
