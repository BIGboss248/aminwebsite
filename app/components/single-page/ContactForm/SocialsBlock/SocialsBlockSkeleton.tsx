import React from "react";
import { cn } from "@/lib/utils";

export interface SocialsBlockSkeletonProps {
  className?: string;
}

export function SocialsBlockSkeleton({
  className = "",
}: SocialsBlockSkeletonProps): React.JSX.Element {
  return (
    <div
      data-testid="socials-block-skeleton"
      aria-hidden="true"
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 animate-pulse",
        className,
      )}
    >
      <div className="space-y-2">
        <div className="h-3 w-28 bg-muted rounded" />
        <div className="h-7 w-48 bg-muted rounded-md" />
        <div className="h-4 w-full bg-muted/60 rounded" />
      </div>

      <div className="space-y-3.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-background/50"
          >
            <div className="size-11 rounded-lg bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted/80 rounded" />
              </div>
              <div className="h-3 w-40 bg-muted/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialsBlockSkeleton;
