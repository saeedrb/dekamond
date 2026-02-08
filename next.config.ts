import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // گاهی برای static بهتره
};

export default nextConfig;
