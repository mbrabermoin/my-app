import type { NextConfig } from "next";

// When NEXT_PUBLIC_API_URL is set (local dev), proxy to that URL.
// When not set (Vercel production), route internally to the Next.js API handler.
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: BACKEND_API_URL
          ? `${BACKEND_API_URL}/:path*`
          : "/api/backend/:path*",
      },
    ];
  },
};

export default nextConfig;