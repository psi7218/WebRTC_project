import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ifh.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 린트 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 타입스크립트 에러 무시
  },
};

export default nextConfig;
