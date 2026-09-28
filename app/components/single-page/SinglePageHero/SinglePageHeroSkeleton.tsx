import React from "react";
import { cn } from "@/lib/utils";

export interface SinglePageHeroSkeletonProps {
  className?: string;
}

export function SinglePageHeroSkeleton({
  className = "",
}: SinglePageHeroSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      aria-label="Loading single page hero"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-border/40 bg-background animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="h-6 w-48 rounded-md bg-muted" />
            <div className="h-14 w-3/4 rounded-lg bg-muted" />
            <div className="h-6 w-1/2 rounded bg-muted" />
            <div className="h-20 w-full rounded-lg bg-muted/60" />
            <div className="h-16 w-full rounded bg-muted/40" />
            <div className="flex gap-4 pt-2">
              <div className="h-11 w-36 rounded-lg bg-muted" />
              <div className="h-11 w-36 rounded-lg bg-muted" />
            </div>
            <div className="h-6 w-full pt-4 border-t border-border/40 bg-muted/30" />
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="size-64 sm:size-80 rounded-full bg-muted/50" />
            <div className="h-4 w-32 rounded bg-muted/40" />
            <div className="h-12 w-64 rounded-xl bg-muted/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePageHeroSkeleton;
