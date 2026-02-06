import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/eslint-config",
    "@repo/hooks",
    "@repo/prettier-config",
    "@repo/tailwind-config",
    "@repo/types",
    "@repo/typescript-config",
    "@repo/ui",
    "@repo/utils",
    "@repo/validators",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kpaxpgjghrhklfmfbhay.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
