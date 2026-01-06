/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Prevent accidental exposure of environment variables
  // Only variables prefixed with NEXT_PUBLIC_ are exposed to the client
  env: {
    // Explicitly control which env vars are available
    // Add only safe, public variables here if needed
  },

  // Security: Disable source maps in production
  productionBrowserSourceMaps: false,

  // Security: Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
