import React from "react";
import { cn } from "@/lib/utils";
import type { SinglePageNavbarSkeletonProps } from "./SinglePageNavbar.types";

/**
 * Skeleton placeholder matching the exact layout and dimensions of SinglePageNavbar (`h-14` / 56px)
 * to eliminate cumulative layout shift (CLS) during streaming and initial mount.
 *
 * @param props - Configuration properties for the skeleton.
 * @returns A landmark skeleton header element.
 */
export function SinglePageNavbarSkeleton({
  className = "",
}: SinglePageNavbarSkeletonProps): React.JSX.Element {
  return (
    <header
      role="banner"
      aria-hidden="true"
      className={cn(
        "sticky top-0 z-40 w-full h-14 border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors",
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 1. Start Cluster: Brand placeholder */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-muted/60 animate-pulse" />
          <div className="h-4 w-28 rounded-md bg-muted/60 animate-pulse" />
        </div>

        {/* 2. Center Cluster: Nav items placeholder (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-16 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-4 w-20 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-4 w-24 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-4 w-16 rounded-md bg-muted/50 animate-pulse" />
        </div>

        {/* 3. End Cluster: Locale, theme & mobile toggle placeholders */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 rounded-full bg-muted/60 animate-pulse" />
          <div className="h-8 w-8 rounded-lg bg-muted/60 animate-pulse" />
          <div className="flex md:hidden h-8 w-8 rounded-md bg-muted/60 animate-pulse" />
        </div>
      </div>
    </header>
  );
}

export default SinglePageNavbarSkeleton;
