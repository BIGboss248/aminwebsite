import React from "react";
import { cn } from "@/lib/utils";

/**
 * Properties for FeaturedProjectsGridSkeleton.
 */
export interface FeaturedProjectsGridSkeletonProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Suspense Skeleton for FeaturedProjectsGrid.
 *
 * Mirrors the exact 3-column layout geometry, header typography dimensions,
 * and 16:10 card aspect ratios to eliminate Cumulative Layout Shift (CLS).
 *
 * @param props - Configuration properties for the skeleton.
 * @returns A JSX element rendering the animated skeleton placeholders.
 */
export function FeaturedProjectsGridSkeleton({
  className = "",
}: FeaturedProjectsGridSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl w-full">
            {/* Eyebrow placeholder */}
            <div className="h-4 w-44 rounded bg-muted animate-pulse mb-3" />
            {/* Title placeholder */}
            <div className="h-8 sm:h-10 w-3/4 rounded bg-muted animate-pulse mb-4" />
            {/* Description placeholder */}
            <div className="h-4 w-full rounded bg-muted animate-pulse mb-2" />
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
          </div>

          {/* Desktop Button Placeholder */}
          <div className="hidden md:block shrink-0">
            <div className="h-10 w-44 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>

        {/* 3-Column Spec Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs"
            >
              <div>
                {/* Header: Tag + Icon */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3.5 mb-5">
                  <div className="h-4 w-36 rounded bg-muted animate-pulse" />
                  <div className="size-4 rounded bg-muted animate-pulse" />
                </div>

                {/* Title & Role */}
                <div className="h-6 w-3/4 rounded bg-muted animate-pulse mb-2" />
                <div className="h-4 w-1/2 rounded bg-muted animate-pulse mb-4" />

                {/* Summary Lines */}
                <div className="h-3.5 w-full rounded bg-muted animate-pulse mb-1.5" />
                <div className="h-3.5 w-5/6 rounded bg-muted animate-pulse mb-5" />

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <div className="h-5 w-14 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-16 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-12 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-14 rounded-md bg-muted animate-pulse" />
                </div>

                {/* 16:10 Frame Preview */}
                <div className="relative aspect-[16/10] w-full rounded-lg border border-border/60 bg-muted/30 mb-6 flex flex-col overflow-hidden">
                  <div className="h-6 w-full border-b border-border/40 bg-muted/50 px-3 flex items-center">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-border" />
                      <div className="size-2 rounded-full bg-border" />
                      <div className="size-2 rounded-full bg-border" />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="size-6 rounded-full bg-muted animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-2 border-t border-border/40 flex items-center gap-2">
                <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                <div className="size-4 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjectsGridSkeleton;

