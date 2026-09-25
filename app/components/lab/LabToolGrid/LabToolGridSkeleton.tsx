import React from "react";
import { cn } from "@/lib/utils";
import { LabToolCardSkeleton } from "../LabToolCard/LabToolCardSkeleton";

/**
 * Skeleton Loader Fallback for `LabToolGrid`.
 */
export function LabToolGridSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="lab-tool-grid-skeleton"
      className={cn("py-16 sm:py-24 bg-background text-foreground", className)}
      role="status"
      aria-label="Loading diagnostic tools catalog"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="h-4 w-40 rounded bg-muted animate-pulse" />
          <div className="h-8 sm:h-10 w-3/4 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted/80 animate-pulse" />
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 p-1.5 rounded-xl border border-border/60 bg-card/40 max-w-max mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>

        {/* 3 Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((j) => (
            <LabToolCardSkeleton key={j} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LabToolGridSkeleton;
