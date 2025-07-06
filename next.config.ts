import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: process.env.PAINTING_IMAGE_HOST || 'localhost',
      },
    ],
  },
};

export default nextConfig;
