import type { NextConfig } from "next";

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
};

export default nextConfig;
