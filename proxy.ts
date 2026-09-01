import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleRequest = createMiddleware(routing);

/**
 * Next.js 16+ proxy interceptor for locale negotiation and redirects.
 */
export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export default proxy;

export const config = {
  // Match all pathnames except for:
  // - API routes (/api, /trpc)
  // - Next.js and Vercel internals (/_next, /_vercel)
  // - Static files containing a dot (e.g. favicon.ico, logo.svg, images)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
