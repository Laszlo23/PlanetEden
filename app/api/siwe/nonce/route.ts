import { NextRequest, NextResponse } from "next/server";
import { generateSiweMessage } from "@/services/siwe";
import { logger } from "@/lib/logger";
import { isAddress } from "viem";

/**
 * GET /api/siwe/nonce
 * 
 * Generate a SIWE message and nonce for the user to sign.
 * 
 * Query Parameters:
 * - address: Ethereum address to generate message for
 */
export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 }
      );
    }

    if (!isAddress(address)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address" },
        { status: 400 }
      );
    }

    // Get domain and origin from request headers
    const domain =
      request.headers.get("host")?.split(":")[0] ?? "localhost";
    const origin =
      request.headers.get("origin") ??
      request.nextUrl.origin ??
      "http://localhost:3000";

    const { message, nonce } = await generateSiweMessage(
      address,
      domain,
      origin
    );

    return NextResponse.json({ message, nonce });
  } catch (error) {
    logger.error("Failed to generate SIWE message", error);
    return NextResponse.json(
      { error: "Failed to generate SIWE message" },
      { status: 500 }
    );
  }
}
