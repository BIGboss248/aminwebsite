import React from "react";
import { cn } from "@/lib/utils";
import type { SiteFooterSkeletonProps } from "./SiteFooter.types";

/**
 * SiteFooterSkeleton provides a geometry-accurate Suspense fallback for the global footer,
 * preventing layout shift during client-side hydration or page navigation.
 */
export function SiteFooterSkeleton({
  className,
  showActionBanner = true,
  ...props
}: SiteFooterSkeletonProps): React.JSX.Element {
  return (
    <footer
      role="contentinfo"
      aria-label="Loading footer"
      className={cn("w-full border-t border-border bg-background pt-16 pb-12", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Action Banner Skeleton */}
        {showActionBanner && (
          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 sm:p-8 lg:p-10 animate-pulse">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-8 w-72 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <div className="h-11 w-44 bg-muted rounded-lg" />
                <div className="h-11 w-48 bg-muted rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* 4-Column Navigation Matrix Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4 animate-pulse">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="space-y-3">
              <div className="h-4 w-28 bg-muted rounded" />
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-32 bg-muted/60 rounded" />
                <div className="h-3.5 w-36 bg-muted/60 rounded" />
                <div className="h-3.5 w-28 bg-muted/60 rounded" />
                <div className="h-3.5 w-24 bg-muted/60 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Sub-Footer Colophon Skeleton */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="h-4 w-64 bg-muted/60 rounded" />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-11 w-11 bg-muted/60 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

