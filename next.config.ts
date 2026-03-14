import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/svoiclub",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
