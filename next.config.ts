import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "iccllbccnnxnjrzooloh.supabase.co" }],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};
export default nextConfig;
