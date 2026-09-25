import React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Loader Fallback for `LabToolCard`.
 */
export function LabToolCardSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="lab-tool-card-skeleton"
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-6 sm:p-7 shadow-xs",
        className,
      )}
      role="status"
      aria-label="Loading diagnostic tool card"
    >
      <div>
        {/* Header Row Skeleton */}
        <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-3.5 mb-5">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-5 w-24 rounded-full bg-muted animate-pulse" />
        </div>

        {/* Glyph & Title Skeleton */}
        <div className="flex items-start gap-4 mb-4">
          <div className="size-12 rounded-xl bg-muted animate-pulse shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-3.5 w-1/3 rounded bg-muted/80 animate-pulse" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-3.5 w-full rounded bg-muted/80 animate-pulse" />
          <div className="h-3.5 w-5/6 rounded bg-muted/80 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-muted/80 animate-pulse" />
        </div>

        {/* Capabilities Checklist Skeleton */}
        <div className="mb-6 space-y-2">
          <div className="h-3 w-28 rounded bg-muted animate-pulse mb-3" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-3.5 rounded-full bg-muted/80 animate-pulse shrink-0" />
              <div className="h-3 w-4/5 rounded bg-muted/60 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Chips Skeleton */}
        <div className="flex gap-2 mb-6 pt-3 border-t border-border/40">
          <div className="h-6 w-28 rounded-md bg-muted/60 animate-pulse" />
          <div className="h-6 w-32 rounded-md bg-muted/60 animate-pulse" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="pt-4 border-t border-border/60">
        <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default LabToolCardSkeleton;
