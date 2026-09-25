import React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Loader Fallback for `LabHero`.
 * Accurately mirrors header typography, metric cards, and privacy banner geometry.
 */
export function LabHeroSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="lab-hero-skeleton"
      className={cn(
        "relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-border/60 bg-background text-foreground",
        className,
      )}
      role="status"
      aria-label="Loading interactive lab header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Eyebrow and Badge Skeleton */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="h-5 w-44 rounded-md bg-muted animate-pulse" />
          <div className="h-6 w-36 rounded-full bg-muted animate-pulse" />
        </div>

        {/* Title and Description Skeleton */}
        <div className="max-w-4xl space-y-4">
          <div className="h-10 sm:h-12 md:h-14 w-4/5 rounded-lg bg-muted animate-pulse" />
          <div className="space-y-2 pt-2">
            <div className="h-4 sm:h-5 w-full rounded bg-muted/80 animate-pulse" />
            <div className="h-4 sm:h-5 w-3/4 rounded bg-muted/80 animate-pulse" />
          </div>
        </div>

        {/* 3 Metric Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-4 sm:p-5"
            >
              <div className="size-11 rounded-lg bg-muted animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-20 rounded bg-muted/80 animate-pulse" />
                <div className="h-5 w-28 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Banner Skeleton */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card/60 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-border/40 pb-5">
            <div className="size-10 rounded-xl bg-muted animate-pulse shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-5 w-48 rounded bg-muted animate-pulse" />
              <div className="h-3 w-32 rounded bg-muted/80 animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-full rounded bg-muted/80 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="h-24 rounded-xl border border-border/40 bg-muted/20 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabHeroSkeleton;
