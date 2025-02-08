import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  server: {
    hostname: "0.0.0.0",
    port: 5442,
  },

  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 린트 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 타입스크립트 에러 무시
  },
};

export default nextConfig;
