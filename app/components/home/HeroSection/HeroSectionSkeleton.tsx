import React from "react";
import { cn } from "@/lib/utils";

interface HeroSectionSkeletonProps {
  className?: string;
}

/**
 * Suspense skeleton fallback matching HeroSection layout geometry to eliminate CLS.
 */
export function HeroSectionSkeleton({
  className = "",
}: HeroSectionSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-label="Loading hero section"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-border/40 bg-background animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Start Column Skeleton */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill Skeleton */}
            <div className="h-6 w-48 rounded-full bg-muted mb-6" />

            {/* Headline Skeleton (3 lines) */}
            <div className="h-12 sm:h-14 lg:h-16 w-full max-w-2xl rounded-md bg-muted mb-3" />
            <div className="h-12 sm:h-14 lg:h-16 w-3/4 max-w-xl rounded-md bg-muted mb-6" />

            {/* Narrative Skeleton (2 lines) */}
            <div className="h-5 w-full max-w-xl rounded bg-muted/80 mb-2" />
            <div className="h-5 w-2/3 max-w-md rounded bg-muted/80 mb-8" />

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-wrap gap-4">
              <div className="h-11 w-36 rounded-lg bg-muted" />
              <div className="h-11 w-36 rounded-lg bg-muted" />
              <div className="h-11 w-32 rounded-lg bg-muted/60" />
            </div>
          </div>

          {/* End Column Skeleton (Telemetry Card) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl border border-border bg-card/60 p-6 shadow-xs">
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-border/40">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-4 w-12 rounded bg-muted" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 rounded-lg bg-muted/40" />
                <div className="h-16 rounded-lg bg-muted/40" />
                <div className="h-16 rounded-lg bg-muted/40" />
                <div className="h-16 rounded-lg bg-muted/40" />
              </div>
              <div className="mt-4 pt-3 border-t border-border/40 flex justify-between">
                <div className="h-3 w-20 rounded bg-muted/60" />
                <div className="h-3 w-28 rounded bg-muted/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionSkeleton;

