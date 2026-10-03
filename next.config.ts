import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import pkg from "./package.json";
import { SITE_CONFIG } from "./lib/site-config";

const withNextIntl = createNextIntlPlugin();

const siteHost = new URL(SITE_CONFIG.baseUrl).host;

const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: pkg.version,
  experimental: {
    serverActions: {
      allowedOrigins: [
        siteHost,
        `*.${siteHost}`,
        "localhost:3000",
        "127.0.0.1:3000",
      ],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./node_modules/@swc/helpers/**/*"],
  },
};

export default withNextIntl(nextConfig);
