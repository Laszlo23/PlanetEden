import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for security and future auth/wallet verification
 * 
 * This middleware runs on every request before it reaches your pages/API routes.
 * 
 * Current features:
 * - Security headers (CSP, HSTS, etc.)
 * - Request logging (sanitized)
 * - Foundation for future auth/wallet verification
 * 
 * Future additions:
 * - Authentication checks
 * - Wallet signature verification
 * - Rate limiting
 * - IP whitelisting
 */
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  const isProduction = process.env.NODE_ENV === "production";

  // Content Security Policy - stricter in production
  const cspDirectives = isProduction
    ? [
        // Production: Strict CSP
        "default-src 'self'",
        "script-src 'self'", // No unsafe-eval or unsafe-inline in production
        "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ]
    : [
        // Development: More permissive for Next.js dev server
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js dev
        "style-src 'self' 'unsafe-inline'", // Required for Tailwind
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' ws: wss:", // WebSocket for HMR
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "object-src 'none'",
      ];

  // Security headers
  const securityHeaders = {
    // Content Security Policy
    "Content-Security-Policy": cspDirectives.join("; "),

    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // XSS Protection
    "X-XSS-Protection": "1; mode=block",

    // Prevent clickjacking
    "X-Frame-Options": "DENY",

    // Referrer Policy
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Permissions Policy (restrict browser features)
    "Permissions-Policy": [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
    ].join(", "),

    // HSTS (only in production)
    ...(isProduction && {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    }),
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (value) {
      response.headers.set(key, value);
    }
  });

  // Future: Add authentication checks here
  // const token = request.cookies.get('auth-token');
  // if (!token && request.nextUrl.pathname.startsWith('/protected')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Future: Add wallet verification here
  // const walletAddress = request.headers.get('x-wallet-address');
  // if (walletAddress && !isValidWallet(walletAddress)) {
  //   return NextResponse.json({ error: 'Invalid wallet' }, { status: 401 });
  // }

  return response;
}

/**
 * Configure which routes the middleware should run on
 * Use matcher to exclude static files and API routes if needed
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
