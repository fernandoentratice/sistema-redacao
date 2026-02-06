import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "eslint-config",
    "hooks",
    "prettier-config",
    "tailwind-config",
    "types",
    "typescript-config",
    "ui",
    "utils",
    "validators",
  ],
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
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
