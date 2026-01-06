import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";
import { logger } from "@/lib/logger";

/**
 * GET /api/auth/session
 * 
 * Check if the current session is valid and return user info.
 * This endpoint can be used to verify authentication status.
 */
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const userId = verifySessionToken(sessionToken);

    if (!userId) {
      // Invalid or expired session - clear cookie
      const response = NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
      response.cookies.delete("session");
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      userId,
    });
  } catch (error) {
    logger.error("Failed to verify session", error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/session
 * 
 * Log out by clearing the session cookie.
 */
export async function DELETE(_request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("session");
  return response;
}
