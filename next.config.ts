import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // bütün domain-lərə icazə
      },
    ],
  },
};



export default nextConfig;
