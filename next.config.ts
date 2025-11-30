import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    // Bypass Next.js image optimization so the browser requests files directly
    // from the backend.
    unoptimized: true,
    remotePatterns: [
      {
        hostname: process.env.PAINTING_IMAGE_HOST || 'localhost',
      },
    ],
  },
};

export default nextConfig;
