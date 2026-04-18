import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  compiler: {
    relay: {
      src: "./",
      artifactDirectory: "./__generated__",
      language: "typescript",
      eagerEsModules: true,
    },
  },
};

export default nextConfig;
