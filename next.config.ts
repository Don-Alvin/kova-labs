import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @sanity/workbench ships raw .ts source, which Turbopack refuses to load in
  // dev ("Unknown module type"). Transpiling it lets /studio compile.
  transpilePackages: ["@sanity/workbench", "@sanity/sdk-react"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
