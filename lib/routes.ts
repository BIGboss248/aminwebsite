/**
 * Centralized Application Route Registry
 *
 * Single source of truth for all navigation paths, section anchors,
 * and API endpoints. Update paths here to propagate across UI components,
 * navigation bars, metadata, and sitemaps.
 */

export const ROUTES = {
  home: "/",
  singlePage: "/single-page",
  sections: {
    hero: "#hero",
    projects: "#projects",
    certifications: "#certifications",
    contact: "#contact",
  },
  api: {
    health: "/api/health",
    telemetry: "/api/telemetry/vitals",
    contact: "/api/contact",
  },
} as const;

export type AppRoutes = typeof ROUTES;
