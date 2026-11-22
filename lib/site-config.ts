/**
 * Centralized Site Configuration & Client Profile
 *
 * Single source of truth for site-wide metadata, contact details,
 * verified credentials, and social links consumed by layouts,
 * metadata generators, sitemaps, JSON-LD, and UI components.
 */

export const SITE_CONFIG = {
  name: "Amin Jamali",
  title: "Amin Jamali | Websites and online shops for small businesses",
  description:
    "Fast websites and online shops that get found on Google, with a fixed price and a fixed delivery date. Built in Isfahan, working remotely.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://meetjamali.com",
  version: process.env.NEXT_PUBLIC_APP_VERSION || "2.1.0",
  commitHash: process.env.NEXT_PUBLIC_GIT_COMMIT_HASH || "dev",
  commitUrl: `https://github.com/BIGboss248/aminwebsite/commit/${process.env.NEXT_PUBLIC_GIT_COMMIT_HASH || "main"}`,
  author: {
    name: "Amin Jamali",
    role: "Web developer for small businesses",
    location: "Tehran, Iran",
    timezone: "Asia/Tehran (UTC+3:30)",
  },
  contact: {
    email: "contact@meetjamali.com",
    availability: "Accepting new website and online shop projects",
  },
  social: {
    github: "https://github.com/BIGboss248",
    linkedin: "https://www.linkedin.com/in/amin-jamali2000",
    orcid: "https://orcid.org/0009-0004-9921-7273",
    xerj: "https://hub.xerj.org/contributors/BIGboss248",
    twitter: "https://x.com/",
  },
  credentials: {
    orcidId: "0009-0004-9921-7273",
    publications: [
      // Research publications with DOIs defined in CONTEXT.md
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;

