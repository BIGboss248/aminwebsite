"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Link } from "@/app/components/Link";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteNavbarSkeleton } from "@/app/components/SiteNavbarSkeleton";
import { ROUTES } from "@/lib/routes";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export { SiteNavbarSkeleton };
export type { SiteNavbarSkeletonProps } from "@/app/components/SiteNavbarSkeleton";

/**
 * Props for configuring the SiteNavbar component.
 */
export interface SiteNavbarProps {
  /**
   * Optional custom CSS class names to merge onto the outer `<header>` container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Brand name displayed in the monospace cockpit identity lockup.
   * When omitted, defaults to `SITE_CONFIG.author.name` ("Amin Jamali").
   * @defaultValue `SITE_CONFIG.author.name`
   */
  brandName?: string;

  /**
   * Active route pathname override for testing and isolated preview environments.
   * When omitted, the active path is automatically resolved via `usePathname()`.
   * @defaultValue `undefined`
   */
  currentPath?: string;

  /**
   * Active locale override ('en' | 'fa') for isolated previews.
   * When omitted, resolved via next-intl `useLocale()`.
   * @defaultValue `undefined`
   */
  activeLocale?: "en" | "fa";

  /**
   * Controls visibility of the `99.9%` telemetry uptime badge on the Lab Hub link.
   * @defaultValue `true`
   */
  showUptimeBadge?: boolean;

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
 * Primary Systems Cockpit Navigation Bar (`SiteNavbar`).
 *
 * Fixed-height (`h-14` / 56px) floating glass header delivering high-precision systems
 * telemetry, route navigation, and utility controls for Amin Jamali's developer portfolio
 * and engineering laboratory platform.
 *
 * Features:
 * - **Tripartite Architecture**: Brand & Live Status Beacon (Start) -> Centered Route Links with Bracket Hover (Center) -> Locale & Theme Utilities (End).
 * - **Full RTL / LTR Parity**: Dynamic bidirectional layout adjustment and native Persian typography via Vazirmatn.
 * - **Progress-Aware Navigation**: Composes progress-aware `<Link>` for instant visual transition feedback.
 * - **Responsive Cockpit Drawer**: Accessible collapsible menu sheet for tablet and mobile viewports (< 768px).
 *
 * @param props - Configuration properties for the navigation bar.
 * @returns An accessible landmark header element.
 */
export function SiteNavbar({
  className = "",
  brandName = SITE_CONFIG.author.name,
  currentPath,
  activeLocale,
  showUptimeBadge = true,
  onLocaleChange,
  onThemeToggle,
}: SiteNavbarProps): React.JSX.Element {
  const routerPathname = usePathname();
  const contextLocale = useLocale() as "en" | "fa";
  const effectivePathname = currentPath ?? routerPathname;
  const effectiveLocale = activeLocale ?? contextLocale;

  let tNav: (key: string) => string;
  try {
    tNav = useTranslations("navigation");
  } catch {
    tNav = (key: string) => key;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, handleKeyDown]);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [effectivePathname]);

  const navItems = [
    {
      id: "home",
      label: tNav("home") || "Home",
      href: ROUTES.home,
      badge: null,
    },
    {
      id: "about",
      label: tNav("about") || "About",
      href: ROUTES.about,
      badge: null,
    },
    {
      id: "projects",
      label: tNav("projects") || "Projects",
      href: ROUTES.projects.root,
      badge: null,
    },
    {
      id: "lab",
      label: tNav("lab") || "Lab Hub",
      href: ROUTES.lab.root,
      badge: showUptimeBadge ? "99.9%" : null,
    },
    {
      id: "contact",
      label: tNav("contact") || "Contact",
      href: ROUTES.contact,
      badge: null,
    },
  ];

  // Helper to determine if a route is currently active
  const isRouteActive = (href: string) => {
    if (href === ROUTES.home) {
      return effectivePathname === "/" || effectivePathname === "";
    }
    return effectivePathname.startsWith(href);
  };

  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-40 w-full h-14 border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200",
        className,
      )}
    >
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* 1. Start Cluster: Brand & Live Telemetry Beacon */}
        <Link
          href={ROUTES.home}
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
          aria-label={`${brandName} Home`}
        >
          {/* Circuit Lattice SVG Vector Emblem */}
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-xs transition-all duration-200 group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] group-hover:rotate-6">
            <svg
              className="h-4.5 w-4.5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <circle cx="12" cy="12" r="3" className="fill-primary/20" />
              <line
                x1="12"
                y1="2"
                x2="12"
                y2="22"
                className="stroke-emerald-500"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            </svg>
          </div>

          {/* Monospace Cockpit Brand Title */}
          <div className="flex items-center gap-1 font-mono text-[13px] font-bold tracking-wider text-foreground">
            <span>{brandName.toUpperCase()}</span>
            <span className="text-primary">//</span>
            <span className="text-[11px] font-semibold text-primary">LAB</span>
          </div>
        </Link>

        {/* 2. Center Cluster: Balanced Route Navigation Links (Desktop/Tablet) */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    active
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )}
                >
                  {/* Subtle hover bracket indicators */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-xs text-primary transition-opacity duration-150",
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    [
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      aria-hidden="true"
                      className="ms-1 font-mono text-[9px] font-medium px-1.5 py-0.2 rounded-full border border-primary/40 bg-primary/15 text-primary"
                    >
                      {item.badge}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-xs text-primary transition-opacity duration-150",
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    ]
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. End Cluster: Utility Controls (Locale, Theme & Mobile Toggle) */}
        <div className="flex items-center gap-2">
          {/* Segmented Cockpit LocaleSwitcher */}
          <LocaleSwitcher
            currentLocale={effectiveLocale}
            onLocaleChange={onLocaleChange}
            showAutonyms={false}
            className="h-8 text-xs"
          />

          {/* Interactive Light/Dark ThemeToggle */}
          <ThemeToggle onToggle={onThemeToggle} className="h-8 w-8" />

          {/* Mobile Viewport Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* 4. Responsive Mobile Cockpit Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="region"
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs text-primary">
                      {">"}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="font-mono text-[9px] font-medium px-1.5 py-0.2 rounded-full border border-primary/40 bg-primary/15 text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNavbar;
