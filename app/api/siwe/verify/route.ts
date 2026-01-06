import { NextRequest, NextResponse } from "next/server";
import { verifySiweSignature } from "@/services/siwe";
import { createSessionToken, getSessionCookieOptions } from "@/lib/session";
import { logger } from "@/lib/logger";
import { z } from "zod";

const verifyRequestSchema = z.object({
  message: z.string().min(1),
  signature: z.string().regex(/^0x[a-fA-F0-9]{130}$/), // 0x + 130 hex chars
});

/**
 * POST /api/siwe/verify
 * 
 * Verify a SIWE signature and create a session.
 * 
 * Body:
 * - message: The SIWE message that was signed
 * - signature: The signature from the wallet
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

    // Verify signature server-side
    const result = await verifySiweSignature(message, signature);

    if (!result.valid || !result.userId) {
      return NextResponse.json(
        { error: result.error ?? "Verification failed" },
        { status: 401 }
      );
    }

    // Create secure session token
    const sessionToken = createSessionToken(result.userId);

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      userId: result.userId,
    });

    response.cookies.set("session", sessionToken, getSessionCookieOptions());

    logger.info("Session created", { userId: result.userId });

    return response;
  } catch (error) {
    logger.error("Failed to verify SIWE signature", error);
    return NextResponse.json(
      { error: "Failed to verify signature" },
      { status: 500 }
    );
  }
}
