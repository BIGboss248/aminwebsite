import type { HTMLAttributes } from "react";

/**
 * Props for configuring the SiteFooter component.
 */
export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional custom CSS class names to merge onto the outer `<footer>` container.
   * @defaultValue `""`
   */
  className?: string;

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
   * Controls whether the top action-first contact banner is displayed.
   * @defaultValue `true`
   */
  showActionBanner?: boolean;
}

/**
 * Props for configuring the SocialLinksBar component.
 */
export interface SocialLinksBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom CSS class names to merge onto the container `<div>`.
   * @defaultValue `""`
   */
  className?: string;

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

  /**
   * Optional Twitter / X profile URL override.
   * @defaultValue `SITE_CONFIG.social.twitter`
   */
  twitterUrl?: string;
}

/**
 * Props for configuring the SiteFooterSkeleton component.
 */
export interface SiteFooterSkeletonProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional custom CSS class names to merge onto the skeleton `<footer>` container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Controls whether the top action-first contact banner skeleton is displayed.
   * @defaultValue `true`
   */
  showActionBanner?: boolean;
}

