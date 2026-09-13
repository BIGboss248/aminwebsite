/**
 * Centralized Application Route Registry
 *
 * Single source of truth for all navigation paths, dynamic route builders,
 * and API endpoints. Update paths here to propagate across UI components,
 * navigation bars, metadata, and sitemaps.
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  projects: {
    root: "/projects",
    detail: (slug: string) => `/projects/${slug}` as const,
  },
  resume: "/resume",
  lab: {
    root: "/lab",
    doh: "/lab/doh",
    ipInfo: "/lab/ipinfo",
    fingerprint: "/lab/fingerprint",
  },
  contact: "/contact",
  api: {
    health: "/api/health",
    telemetry: "/api/telemetry/vitals",
    contact: "/api/contact",
  },
} as const;

export type AppRoutes = typeof ROUTES;

