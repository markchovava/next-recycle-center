import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint:{ 
        ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  images: {
    domains: ['127.0.0.1', 'www.fldesigners.xyz', 'fldesigners.xyz'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
