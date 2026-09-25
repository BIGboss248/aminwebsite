/**
 * Centralized Site Configuration & Client Profile
 *
 * Single source of truth for site-wide metadata, contact details,
 * verified credentials, and social links consumed by layouts,
 * metadata generators, sitemaps, JSON-LD, and UI components.
 */

export const SITE_CONFIG = {
  name: "Amin Jamali",
  title: "Amin Jamali | Full-Stack Engineer & Architect",
  description:
    "Personal portfolio, interactive engineering lab, and digital credentials platform of Amin Jamali.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://meetjamali.com",
  author: {
    name: "Amin Jamali",
    role: "Full-Stack Engineer & Systems Architect",
    location: "Tehran, Iran",
    timezone: "Asia/Tehran (UTC+3:30)",
  },
  contact: {
    email: "contact@meetjamali.com",
    availability: "Open to select consulting and full-time opportunities",
  },
  social: {
    github: "https://github.com/BIGboss248",
    linkedin: "https://linkedin.com/in/amin-jamali",
    orcid: "https://orcid.org/0009-0004-9921-7273",
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

