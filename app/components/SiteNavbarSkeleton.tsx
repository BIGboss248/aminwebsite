import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for configuring the SiteNavbarSkeleton loading placeholder.
 */
export interface SiteNavbarSkeletonProps {
  /**
   * Optional custom CSS class names to merge with the outer container.
   * @defaultValue `""`
   */
  className?: string;
}

/**
 * Loading skeleton fallback for `SiteNavbar`.
 *
 * Replicates the exact `h-14` (56px) sticky layout geometry, padding, and responsive
 * breakpoints of the main navbar to eliminate Cumulative Layout Shift (CLS) during
 * initial page mount and streaming Suspense transitions.
 *
 * @param props - Configuration properties for the skeleton.
 * @returns An accessible pulse-animated placeholder landmark.
 */
export function SiteNavbarSkeleton({
  className = "",
}: SiteNavbarSkeletonProps): React.JSX.Element {
  return (
    <header
      aria-hidden="true"
      className={cn(
        "sticky top-0 z-40 w-full h-14 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity skeleton */}
        <div className="flex items-center gap-3">
          {/* Emblem placeholder */}
          <div className="h-8 w-8 rounded-md bg-muted/60 animate-pulse" />
          {/* Brand title */}
          <div className="hidden sm:block">
            <div className="h-3.5 w-28 rounded bg-muted/60 animate-pulse" />
          </div>
        </div>

        {/* Center route links skeleton (desktop only) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="h-7 w-16 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-7 w-16 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-7 w-18 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-7 w-20 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-7 w-16 rounded-md bg-muted/50 animate-pulse" />
        </div>

        {/* Utility cluster skeleton */}
        <div className="flex items-center gap-2">
          {/* LocaleSwitcher skeleton placeholder */}
          <div className="h-8 w-20 sm:w-28 rounded-md bg-muted/50 animate-pulse" />
          {/* ThemeToggle skeleton placeholder */}
          <div className="h-8 w-8 rounded-lg bg-muted/50 animate-pulse" />
          {/* Mobile hamburger placeholder (mobile only) */}
          <div className="flex md:hidden h-8 w-8 rounded-md bg-muted/50 animate-pulse" />
        </div>
      </div>
    </header>
  );
}

export default SiteNavbarSkeleton;
