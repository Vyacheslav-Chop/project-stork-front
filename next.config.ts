import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ftp.goit.study"],
  },

  //TODO додав конфіг щоб можна було обробляти фото через <Image>
};

export default nextConfig;
