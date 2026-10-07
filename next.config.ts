import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { execSync } from "node:child_process";
import pkg from "./package.json";
import { SITE_CONFIG } from "./lib/site-config";

const withNextIntl = createNextIntlPlugin();

const siteHost = new URL(SITE_CONFIG.baseUrl).host;

// Resolve 7-character Git commit hash automatically
const getGitCommitHash = (): string => {
  try {
    return (
      process.env.GITHUB_SHA?.slice(0, 7) ||
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
      execSync("git rev-parse --short HEAD").toString().trim()
    );
  } catch {
    return "dev";
  }
};

const gitHash = getGitCommitHash();

const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: `${pkg.version.replace(/[^a-zA-Z0-9_-]/g, "-")}-${gitHash}`,
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_GIT_COMMIT_HASH: gitHash,
  },
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
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/en#projects",
        permanent: true,
      },
      {
        source: "/:locale(en|fa)/projects",
        destination: "/:locale#projects",
        permanent: true,
      },
      {
        source: "/lab/:path*",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/:locale(en|fa)/lab/:path*",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|fa)/single-page",
        destination: "/:locale",
        permanent: true,
      },
    ];
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

