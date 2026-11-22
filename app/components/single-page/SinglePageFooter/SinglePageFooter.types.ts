import type { HTMLAttributes } from "react";

/**
 * Props for configuring the SinglePageFooter component.
 */
export interface SinglePageFooterProps extends HTMLAttributes<HTMLElement> {
  /**
   * Active locale ('en' | 'fa') override for isolated previews and deterministic rendering.
   * When omitted, resolved dynamically via next-intl `useLocale()`.
   */
  locale?: "en" | "fa";

  /**
   * Optional custom CSS class names to merge onto the outer `<footer>` container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Brand name override. When omitted, defaults to `SITE_CONFIG.author.name` ("Amin Jamali").
   * @defaultValue `SITE_CONFIG.author.name`
   */
  brandName?: string;

  /**
   * Optional current year override for testing and deterministic rendering.
   * When omitted, defaults to the current UTC calendar year.
   * @defaultValue `new Date().getFullYear()`
   */
  currentYear?: number;

  /**
   * Optional direct email address override.
   * When omitted, defaults to `SITE_CONFIG.contact.email`.
   * @defaultValue `SITE_CONFIG.contact.email`
   */
  contactEmail?: string;

  /**
   * Optional GitHub profile URL override.
   * @defaultValue `SITE_CONFIG.social.github`
   */
  githubUrl?: string;

  /**
   * Optional LinkedIn profile URL override.
   * @defaultValue `SITE_CONFIG.social.linkedin`
   */
  linkedinUrl?: string;

  /**
   * Optional ORCID profile URL override.
   * @defaultValue `SITE_CONFIG.social.orcid`
   */
  orcidUrl?: string;
}

/**
 * Props for configuring the SinglePageFooterSkeleton component.
 */
export interface SinglePageFooterSkeletonProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional custom CSS class names to merge onto the skeleton `<footer>` container.
   * @defaultValue `""`
   */
  className?: string;
}
