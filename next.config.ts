import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Emi_site" : "",
  assetPrefix: isProd ? "/Emi_site/" : "",
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
