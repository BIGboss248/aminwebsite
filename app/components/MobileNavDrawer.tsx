"use client";

import React, { useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/app/components/Link";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNavDrawerSkeleton } from "@/app/components/MobileNavDrawerSkeleton";
import { ROUTES } from "@/lib/routes";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export { MobileNavDrawerSkeleton };
export type { MobileNavDrawerSkeletonProps } from "@/app/components/MobileNavDrawerSkeleton";

/**
 * Props for configuring the MobileNavDrawer component.
 */
export interface MobileNavDrawerProps {
  /**
   * Whether the mobile navigation drawer is currently open.
   */
  isOpen: boolean;

  /**
   * Callback fired when the drawer requests to be closed (via close button, Escape key, or backdrop click).
   */
  onClose: () => void;

  /**
   * Optional brand name displayed in the monospace cockpit identity lockup.
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
   * Active locale override ('en' | 'fa') for isolated previews and testing.
   * When omitted, resolved via next-intl `useLocale()`.
   * @defaultValue `undefined`
   */
  activeLocale?: "en" | "fa";

  /**
   * Controls visibility of the `99.9%` telemetry uptime badge on the Lab Hub route node.
   * @defaultValue `true`
   */
  showUptimeBadge?: boolean;

  /**
   * Optional callback fired when the locale is switched inside the utility dock.
   * @param locale - The newly selected locale ('en' | 'fa').
   */
  onLocaleChange?: (locale: "en" | "fa") => void;

  /**
   * Optional callback fired when the theme toggle is clicked.
   * @param theme - The newly selected theme ('light' | 'dark').
   */
  onThemeToggle?: (theme: "light" | "dark") => void;

  /**
   * Optional callback fired when a navigation route node is clicked.
   * @param href - The target route URL string.
   */
  onNavigate?: (href: string) => void;

  /**
   * Optional custom CSS class names to merge onto the sliding drawer panel.
   * @defaultValue `""`
   */
  className?: string;
}

/**
 * Responsive Mobile Cockpit Navigation Drawer (`MobileNavDrawer`).
 *
 * Edge slide-over panel delivering high-precision developer cockpit routing,
 * real-time systems telemetry, and embedded utility controls for mobile and tablet viewports (< 1024px).
 *
 * Features:
 * - **Accessible Dialog Landmarks**: Full ARIA modal semantics (`role="dialog"`, `aria-modal="true"`), Escape key dismiss, and backdrop scrim interaction.
 * - **Telemetry-Badged Route Nodes**: Monospace index counters (`01`, `02`...), route descriptions, active indicator glow, and `99.9%` uptime badge.
 * - **Bidirectional (RTL/LTR) Parity**: Automatically mirrors slide-in direction (trailing edge), structural borders, and directional indicator arrows.
 * - **Ergonomic Touch Targets**: Meets or exceeds the WCAG minimum 44px × 44px touch target specification.
 * - **Progress-Aware Navigation**: Composes progress-aware `<Link>` for visual feedback during route transitions.
 *
 * @param props - Configuration properties for the navigation drawer.
 * @returns An accessible modal navigation drawer element, or `null` when closed.
 */
export function MobileNavDrawer({
  isOpen,
  onClose,
  brandName = SITE_CONFIG.author.name,
  currentPath,
  activeLocale,
  showUptimeBadge = true,
  onLocaleChange,
  onThemeToggle,
  onNavigate,
  className = "",
}: MobileNavDrawerProps): React.JSX.Element | null {
  const routerPathname = usePathname();
  const contextLocale = useLocale() as "en" | "fa";
  const effectivePathname = currentPath ?? routerPathname;
  const effectiveLocale = activeLocale ?? contextLocale;
  const isRtl = effectiveLocale === "fa";

  let tNav: (key: string) => string;
  try {
    tNav = useTranslations("navigation");
  } catch {
    tNav = (key: string) => key;
  }

  // Handle Escape key dismissal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling while open
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  const navItems = [
    {
      id: "home",
      index: "01",
      label: tNav("home") || "Home",
      desc: isRtl ? "رصدخانه مرکزی سامانه‌ها" : "Root Systems Observatory",
      href: ROUTES.home,
      badge: null,
    },
    {
      id: "about",
      index: "02",
      label: tNav("about") || "About",
      desc: isRtl ? "بیوگرافی و فلسفه معماری" : "Biography & Architecture Philosophy",
      href: ROUTES.about,
      badge: null,
    },
    {
      id: "projects",
      index: "03",
      label: tNav("projects") || "Projects",
      desc: isRtl ? "مطالعات موردی مقیاس‌بالا" : "High-Scale Case Studies",
      href: ROUTES.projects.root,
      badge: null,
    },
    {
      id: "lab",
      index: "04",
      label: tNav("lab") || "Lab Hub",
      desc: isRtl ? "ابزارهای برخط تحلیل شبکه" : "Real-Time Network Diagnostics",
      href: ROUTES.lab.root,
      badge: showUptimeBadge ? "99.9%" : null,
      badge: null,
    },
    {
      id: "contact",
      index: "05",
      label: tNav("contact") || "Contact",
      desc: isRtl ? "ارتباط مستقیم و مشاوره" : "Direct Inquiry & Consulting",
      href: ROUTES.contact,
      badge: null,
    },
  ];

  const isRouteActive = (href: string) => {
    if (href === ROUTES.home) {
      return effectivePathname === "/" || effectivePathname === "";
    }
    return effectivePathname.startsWith(href);
  };

  const handleNodeClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="presentation"
    >
      {/* 1. Backdrop Scrim Overlay */}
      <div
        data-testid="mobile-nav-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
        aria-hidden="true"
      />

      {/* 2. Sliding Drawer Panel (Anchored to trailing edge) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          "relative ms-auto flex flex-col h-full w-[320px] max-w-[85vw] bg-card text-card-foreground border-s border-border shadow-2xl z-10 transition-transform duration-300 ease-out animate-in",
          isRtl ? "slide-in-from-left" : "slide-in-from-right",
          className,
        )}
      >
        {/* Header: Brand Identity Lockup & Close Trigger */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <Link
            href={ROUTES.home}
            onClick={() => handleNodeClick(ROUTES.home)}
            className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label={`${brandName} Home`}
          >
            {/* Hexagon Lattice Vector Emblem */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background shadow-xs transition-all duration-200 group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <svg
                className="h-5 w-5 text-primary"
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

            {/* Brand Title */}
            <div className="flex items-center gap-1 font-mono text-xs font-bold tracking-wider text-foreground">
              <span>{brandName.toUpperCase()}</span>
              <span className="text-primary">//</span>
              <span className="text-[11px] font-semibold text-primary">LAB</span>
            </div>
          </Link>

          {/* Close Button (44px x 44px Ergonomic Touch Target) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation drawer"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body: Route Navigation Nodes */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <nav role="navigation" aria-label="Mobile Route Nodes" className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNodeClick(item.href)}
                  className={cn(
                    "group flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    active
                      ? "border-primary/40 bg-primary/10 text-primary font-semibold shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]"
                      : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground hover:border-border",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-primary opacity-80">
                      [ {item.index} ]
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-full border border-primary/40 bg-primary/15 text-primary shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      >
                        {item.badge}
                      </span>
                    )}
                    {active ? (
                      isRtl ? (
                        <ArrowLeft className="h-4 w-4 text-primary" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                      )
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer: Utilities and Live Telemetry Dock */}
        <div className="p-4 border-t border-border bg-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">
              // {tNav("system_telemetry") || "SYSTEM_TELEMETRY"}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span>{tNav("sys_online") || "ONLINE // 9.4ms"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <LocaleSwitcher
              currentLocale={effectiveLocale}
              onLocaleChange={onLocaleChange}
              showAutonyms={true}
              className="h-9 text-xs"
            />
            <ThemeToggle onToggle={onThemeToggle} className="h-9 w-9" />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileNavDrawer;

