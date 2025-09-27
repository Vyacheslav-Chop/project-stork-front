import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ftp.goit.study", "res.cloudinary.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
