import type { NextConfig } from "next";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://backend-ma1y.onrender.com";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${BACKEND_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;