import type React from "react";

/**
 * Represents a single scroll-spy navigation section item.
 */
export interface SinglePageNavItem {
  /**
   * Unique anchor ID matching the corresponding section on the page (e.g., 'hero', 'projects').
   */
  id: string;

  /**
   * Localized display label.
   */
  label: string;

  /**
   * Anchor href target (e.g., '#hero', '#projects').
   */
  href: string;
}

/**
 * Props for configuring the SinglePageNavbar component.
 */
export interface SinglePageNavbarProps {
  /**
   * Optional custom CSS class names to merge onto the outer `<header>` container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Brand name displayed in the monospace identity lockup.
   * When omitted, defaults to `SITE_CONFIG.author.name` ("Amin Jamali").
   */
  brandName?: string;

  /**
   * Active locale override ('en' | 'fa') for isolated previews and testing.
   * When omitted, derived via next-intl `useLocale()`.
   */
  activeLocale?: "en" | "fa";

  /**
   * Optional manual active section override for testing or story previews.
   */
  activeSectionOverride?: string;

  /**
   * Optional callback fired when the locale is changed.
   * @param locale - The newly selected locale ('en' | 'fa').
   */
  onLocaleChange?: (locale: "en" | "fa") => void;

  /**
   * Optional callback fired when the theme toggle is clicked.
   * @param theme - The newly selected theme ('light' | 'dark').
   */
  onThemeToggle?: (theme: "light" | "dark") => void;
}

/**
 * Props for the SinglePageNavbarSkeleton fallback component.
 */
export interface SinglePageNavbarSkeletonProps {
  /**
   * Optional custom CSS class names to merge onto the skeleton container.
   * @defaultValue `""`
   */
  className?: string;
}

/**
 * Props for the SinglePageMobileNav drawer component.
 */
export interface SinglePageMobileNavProps {
  /**
   * Controls open/closed visibility state of the mobile drawer.
   */
  isOpen: boolean;

  /**
   * Callback fired to close the drawer.
   */
  onClose: () => void;

  /**
   * Array of navigation section items.
   */
  items: SinglePageNavItem[];

  /**
   * Currently active section ID.
   */
  activeSection: string;

  /**
   * Callback fired when a section item is clicked.
   * @param id - The clicked section ID.
   */
  onSelectSection: (id: string) => void;

  /**
   * Brand name displayed in the drawer header.
   */
  brandName?: string;

  /**
   * Active locale ('en' | 'fa').
   */
  activeLocale?: "en" | "fa";

  /**
   * Optional callback fired when the locale is changed.
   */
  onLocaleChange?: (locale: "en" | "fa") => void;

  /**
   * Optional callback fired when the theme toggle is clicked.
   */
  onThemeToggle?: (theme: "light" | "dark") => void;
}
