import React from "react";
import { cn } from "@/lib/utils";

/**
 * Properties for LabLauncherSectionSkeleton.
 */
export interface LabLauncherSectionSkeletonProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Suspense Skeleton for LabLauncherSection.
 *
 * Mirrors the exact 3-column layout geometry, header typography dimensions,
 * and card bounding boxes to eliminate Cumulative Layout Shift (CLS).
 *
 * @param props - Configuration properties for the skeleton.
 * @returns A JSX element rendering animated skeleton placeholders.
 */
export function LabLauncherSectionSkeleton({
  className = "",
}: LabLauncherSectionSkeletonProps): React.JSX.Element {
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
            <div className="h-4 w-48 rounded bg-muted animate-pulse mb-3" />
            {/* Title placeholder */}
            <div className="h-8 sm:h-10 w-3/4 rounded bg-muted animate-pulse mb-4" />
            {/* Description placeholder */}
            <div className="h-4 w-full rounded bg-muted animate-pulse mb-2" />
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
          </div>

          {/* Desktop Badge & Button Placeholder */}
          <div className="hidden md:flex flex-col lg:flex-row items-end lg:items-center gap-3 shrink-0">
            <div className="h-7 w-64 rounded-full bg-muted animate-pulse" />
            <div className="h-10 w-44 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>

        {/* 3-Column Diagnostic Matrix Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs"
            >
              <div>
                {/* Header: Protocol Tag + Privacy Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/60 pb-3.5 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-muted animate-pulse" />
                    <div className="h-4 w-36 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="h-4 w-24 rounded-full bg-muted animate-pulse" />
                </div>

                {/* Glyph & Title Lockup */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="size-12 rounded-lg bg-muted animate-pulse shrink-0" />
                  <div className="flex-1">
                    <div className="h-6 w-5/6 rounded bg-muted animate-pulse mb-2" />
                  </div>
                </div>

                {/* Value Pitch Lines */}
                <div className="h-3.5 w-full rounded bg-muted animate-pulse mb-1.5" />
                <div className="h-3.5 w-4/5 rounded bg-muted animate-pulse mb-6" />

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <div className="h-5 w-24 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-20 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-16 rounded-md bg-muted animate-pulse" />
                  <div className="h-5 w-28 rounded-md bg-muted animate-pulse" />
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="pt-2 border-t border-border/40">
                <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LabLauncherSectionSkeleton;
