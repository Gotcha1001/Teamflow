/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextConfig } from "next";
/* @ts-ignore*/
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "ib5nsds8qs.ufs.sh", // UploadThing UFS URL
        pathname: "/f/**", // allow all files under /f/
      },
      {
        protocol: "https",
        hostname: "utfs.io", // the shortener domain if you use it
        pathname: "/f/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default nextConfig;
