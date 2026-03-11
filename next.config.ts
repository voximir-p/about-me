import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  env: {
    NEXT_PUBLIC_COMMIT_HASH: process.env.VERCEL_GIT_COMMIT_SHA,
  },
};

export default nextConfig;
