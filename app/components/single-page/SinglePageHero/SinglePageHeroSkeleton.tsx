import React from "react";
import { cn } from "@/lib/utils";

export interface SinglePageHeroSkeletonPropsInternal {
  className?: string;
}

export function SinglePageHeroSkeleton({
  className = "",
}: SinglePageHeroSkeletonPropsInternal): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      aria-label="Loading single page hero"
      className={cn(
        "relative overflow-hidden py-10 sm:py-14 lg:py-20 border-b border-border/40 bg-background animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column Skeleton */}
          <div className="md:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Logo placeholder skeleton */}
            <div className="flex items-center gap-3 mb-2">
              <div className="size-11 sm:size-13 rounded-2xl bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-muted/70" />
                <div className="h-3.5 w-20 rounded bg-muted/90" />
              </div>
            </div>

            {/* Big name skeleton */}
            <div className="h-12 sm:h-16 w-3/4 max-w-md rounded-2xl bg-muted" />

            {/* Role subtitle skeleton */}
            <div className="h-6 sm:h-7 w-2/3 max-w-sm rounded-lg bg-muted/80" />

            {/* Bio text skeleton */}
            <div className="w-full max-w-2xl space-y-2.5 pt-1">
              <div className="h-4 w-full rounded bg-muted/60" />
              <div className="h-4 w-5/6 rounded bg-muted/60" />
              <div className="h-4 w-4/6 rounded bg-muted/60" />
            </div>

            {/* Pill buttons skeleton */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
              <div className="h-9 sm:h-10 w-24 sm:w-28 rounded-full bg-muted/70" />
              <div className="h-9 sm:h-10 w-28 sm:w-32 rounded-full bg-muted/70" />
              <div className="h-9 sm:h-10 w-24 sm:w-28 rounded-full bg-muted/70" />
              <div className="h-9 sm:h-10 w-28 sm:w-32 rounded-full bg-muted" />
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="md:col-span-5 flex items-center justify-center relative w-full">
            <div className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md md:max-w-none rounded-2xl sm:rounded-3xl bg-muted/60 border border-border/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePageHeroSkeleton;
