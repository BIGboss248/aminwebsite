import React from "react";
import { cn } from "@/lib/utils";

export interface PhilosophySectionSkeletonProps {
  className?: string;
}

export function PhilosophySectionSkeleton({
  className = "",
}: PhilosophySectionSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      aria-label="Loading philosophy section"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-section-alternate animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="h-10 w-3/4 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-xl bg-card border border-border space-y-4"
            >
              <div className="h-5 w-24 rounded bg-muted" />
              <div className="h-7 w-3/4 rounded bg-muted" />
              <div className="h-16 w-full rounded bg-muted/40" />
              <div className="pt-4 border-t border-border/60 space-y-2">
                <div className="h-4 w-full rounded bg-muted/40" />
                <div className="h-4 w-5/6 rounded bg-muted/40" />
                <div className="h-4 w-4/6 rounded bg-muted/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhilosophySectionSkeleton;
