"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/app/components/Link";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SinglePageNavbarSkeleton } from "./SinglePageNavbarSkeleton";
import { SinglePageMobileNav } from "./SinglePageMobileNav";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type {
  SinglePageNavbarProps,
  SinglePageNavItem,
} from "./SinglePageNavbar.types";

export { SinglePageNavbarSkeleton, SinglePageMobileNav };
export type {
  SinglePageNavbarProps,
  SinglePageNavbarSkeletonProps,
  SinglePageMobileNavProps,
  SinglePageNavItem,
} from "./SinglePageNavbar.types";

const SECTION_IDS = ["hero", "projects", "certifications", "contact"];

/**
 * Viewport Scroll-Spy Sticky Navigation Bar (`SinglePageNavbar`).
 *
 * Fixed-height (`h-14` / 56px) sticky glass header designed for the Single-Page Website experience.
 *
 * Features:
 * - **Viewport Scroll-Spy Engine**: Tracks section visibility via `IntersectionObserver` with responsive thresholding to highlight the in-view section.
 * - **Smooth Anchor Navigation**: Intercepts anchor clicks and performs hardware-accelerated smooth scrolling to `#hero`, `#projects`, `#certifications`, and `#contact`.
 * - **Full RTL / LTR Parity**: Native Persian and English typography with dynamic bidirectional alignment.
 * - **Integrated Utility Cluster**: Seamless language switcher (`LocaleSwitcher`) and dark/light mode toggle (`ThemeToggle`).
 * - **Responsive Mobile Drawer**: Accessible collapsible menu sheet (`SinglePageMobileNav`) with ARIA modal semantics.
 *
 * @param props - Configuration options for the SinglePageNavbar component.
 * @returns A client-rendered sticky navigation header.
 */
export function SinglePageNavbar({
  className = "",
  brandName = SITE_CONFIG.author.name,
  activeLocale,
  activeSectionOverride,
  onLocaleChange,
  onThemeToggle,
}: SinglePageNavbarProps): React.JSX.Element {
  const contextLocale = useLocale() as "en" | "fa";
  const effectiveLocale = activeLocale ?? contextLocale;

  const t = useTranslations("single_page.nav");
  const tCommon = useTranslations("common");

  const [activeSection, setActiveSection] = useState<string>(
    activeSectionOverride ?? "hero",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronize activeSectionOverride when provided
  useEffect(() => {
    if (activeSectionOverride) {
      setActiveSection(activeSectionOverride);
    }
  }, [activeSectionOverride]);

  const navItems: SinglePageNavItem[] = useMemo(
    () => [
      {
        id: "hero",
        label: t("hero"),
        href: "#hero",
      },
      {
        id: "projects",
        label: t("projects"),
        href: "#projects",
      },
      {
        id: "certifications",
        label: t("certifications"),
        href: "#certifications",
      },
      {
        id: "contact",
        label: t("contact"),
        href: "#contact",
      },
    ],
    [t],
  );

  // Smooth scroll handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      try {
        window.history.pushState(null, "", `#${sectionId}`);
      } catch {
        // Fallback if pushState is restricted
      }
    }
  }, []);

  // Viewport Scroll-Spy setup via IntersectionObserver
  useEffect(() => {
    if (activeSectionOverride || typeof window === "undefined") return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find intersecting entries
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio or proximity to viewport top
        visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        );
        const topEntry = visibleEntries[0];
        if (topEntry?.target?.id) {
          setActiveSection(topEntry.target.id);
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-15% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(observerCallback, observerOptions);
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && observer) {
          observer.observe(el);
        }
      });
    } catch {
      // Graceful fallback for non-supporting test environments
    }

    // Scroll listener fallback for top/bottom boundary detection
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSectionOverride]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-40 w-full h-14 border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200",
          className,
        )}
      >
        <nav
          role="navigation"
          aria-label={t("main_nav")}
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* 1. Start Cluster: Brand & Cockpit Identity */}
          <Link
            href={`#hero`}
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("hero");
            }}
            className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label={brandName}
          >
            {/* Circuit Lattice Emblem */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-xs transition-all duration-200 group-hover:border-primary group-hover:shadow-md group-hover:shadow-primary/20 group-hover:rotate-6">
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
                  className="stroke-status-success"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* Monospace Brand Name */}
            <div className="font-mono text-xs font-bold tracking-wider text-foreground">
              <span>{brandName.toUpperCase()}</span>
            </div>
          </Link>

          {/* 2. Center Cluster: Scroll-Spy Section Links (Desktop/Tablet) */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection(item.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    )}
                  >
                    {/* Hover & Active Bracket Indicator */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-xs text-primary transition-opacity duration-150",
                        isActive
                          ? "opacity-100 font-bold"
                          : "opacity-0 group-hover:opacity-100",
                      )}
                    >
                      [
                    </span>
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-xs text-primary transition-opacity duration-150",
                        isActive
                          ? "opacity-100 font-bold"
                          : "opacity-0 group-hover:opacity-100",
                      )}
                    >
                      ]
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 3. End Cluster: Locale Switcher, Theme Toggle & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher
              currentLocale={effectiveLocale}
              onLocaleChange={onLocaleChange}
              showAutonyms={false}
              className="h-8 text-xs"
            />

            <ThemeToggle onToggle={onThemeToggle} className="h-8 w-8" />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t("toggle_menu")}
              aria-expanded={mobileMenuOpen}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* 4. Responsive Mobile Navigation Drawer */}
      <SinglePageMobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems}
        activeSection={activeSection}
        onSelectSection={handleScrollToSection}
        brandName={brandName}
        activeLocale={effectiveLocale}
        onLocaleChange={onLocaleChange}
        onThemeToggle={onThemeToggle}
      />
    </>
  );
}

export default SinglePageNavbar;
