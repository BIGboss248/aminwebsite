import React from "react";
import { cn } from "@/lib/utils";

export interface GithubRepoCardSkeletonProps {
  className?: string;
}

export function GithubRepoCardSkeleton({
  className = "",
}: GithubRepoCardSkeletonProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-border bg-card p-5 flex flex-col justify-between animate-pulse shadow-xs",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded-full" />
        </div>
        <div className="h-5 w-48 bg-muted rounded mb-2" />
        <div className="space-y-2 mb-4">
          <div className="h-3.5 w-full bg-muted/70 rounded" />
          <div className="h-3.5 w-4/5 bg-muted/70 rounded" />
        </div>
      </div>
      <div className="pt-3 border-t border-border/60 flex items-center justify-between">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-4 bg-muted rounded" />
      </div>
    </div>
  );
}

export default GithubRepoCardSkeleton;
