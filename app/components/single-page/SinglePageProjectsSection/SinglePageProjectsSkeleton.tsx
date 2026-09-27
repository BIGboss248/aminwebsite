import React from "react";
import { cn } from "@/lib/utils";
import type { SinglePageProjectsSkeletonProps } from "./SinglePageProjectsSection.types";

/**
 * SinglePageProjectsSkeleton Component.
 *
 * Streaming Suspense skeleton fallback for the Single-Page Projects & Research Showcase section.
 */
export function SinglePageProjectsSkeleton({
  className = "",
}: SinglePageProjectsSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <div className="h-4 w-44 bg-muted rounded mb-3" />
          <div className="h-9 sm:h-12 w-3/4 bg-muted rounded mb-4" />
          <div className="h-5 w-full bg-muted/70 rounded mb-2" />
          <div className="h-5 w-2/3 bg-muted/60 rounded" />
        </div>

        {/* Tab Filters Skeleton */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/40">
          <div className="h-9 w-32 bg-muted rounded-lg" />
          <div className="h-9 w-36 bg-muted/70 rounded-lg" />
          <div className="h-9 w-40 bg-muted/70 rounded-lg" />
          <div className="h-9 w-36 bg-muted/70 rounded-lg" />
        </div>

        {/* Grid Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="h-4 w-28 bg-muted rounded" />
                  <div className="h-5 w-20 bg-muted/80 rounded-full" />
                </div>
                <div className="h-6 w-4/5 bg-muted rounded mb-3" />
                <div className="h-4 w-1/2 bg-muted/70 rounded mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3.5 w-full bg-muted/60 rounded" />
                  <div className="h-3.5 w-5/6 bg-muted/50 rounded" />
                  <div className="h-3.5 w-4/6 bg-muted/40 rounded" />
                </div>
                {/* Metric Strip Skeleton */}
                <div className="h-16 w-full bg-muted/40 rounded-lg mb-6" />
                {/* Stack Badges Skeleton */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <div className="h-5 w-16 bg-muted/50 rounded" />
                  <div className="h-5 w-20 bg-muted/50 rounded" />
                  <div className="h-5 w-14 bg-muted/50 rounded" />
                </div>
              </div>
              <div className="pt-4 border-t border-border/60 flex justify-between items-center">
                <div className="h-4 w-28 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SinglePageProjectsSkeleton;
