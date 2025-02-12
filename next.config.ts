import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // WARNING: This allows production builds to successfully complete even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
