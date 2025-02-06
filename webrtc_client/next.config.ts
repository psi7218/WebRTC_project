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
};

export default nextConfig;
