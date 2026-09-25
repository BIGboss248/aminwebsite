import React from "react";
import { cn } from "@/lib/utils";

export interface CaseStudyCardSkeletonProps {
  className?: string;
}

export function CaseStudyCardSkeleton({
  className = "",
}: CaseStudyCardSkeletonProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-border bg-card p-6 flex flex-col justify-between animate-pulse shadow-xs",
        className,
      )}
    >
      <div>
        {/* Header tag & status badge skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-5 w-20 bg-muted rounded-full" />
        </div>

        {/* Title skeleton */}
        <div className="h-7 w-4/5 bg-muted rounded mb-2" />

        {/* Role & Client skeleton */}
        <div className="h-4 w-3/5 bg-muted/80 rounded mb-4" />

        {/* Summary skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-muted/70 rounded" />
          <div className="h-4 w-5/6 bg-muted/70 rounded" />
          <div className="h-4 w-4/6 bg-muted/70 rounded" />
        </div>

        {/* Metrics Pill Row skeleton */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-lg bg-muted/30 border border-border/60 mb-6">
          <div className="h-8 bg-muted/50 rounded" />
          <div className="h-8 bg-muted/50 rounded" />
          <div className="h-8 bg-muted/50 rounded" />
        </div>

        {/* Tech stack pills skeleton */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <div className="h-5 w-14 bg-muted rounded" />
          <div className="h-5 w-18 bg-muted rounded" />
          <div className="h-5 w-16 bg-muted rounded" />
          <div className="h-5 w-20 bg-muted rounded" />
        </div>
      </div>

      {/* Footer link skeleton */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <div className="h-5 w-36 bg-muted rounded" />
        <div className="h-5 w-5 bg-muted rounded" />
      </div>
    </div>
  );
}

export default CaseStudyCardSkeleton;
