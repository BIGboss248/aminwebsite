import React from "react";
import { cn } from "@/lib/utils";

export interface ExperienceTimelineSkeletonProps {
  className?: string;
}

export function ExperienceTimelineSkeleton({
  className = "",
}: ExperienceTimelineSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      aria-label="Loading experience timeline"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="h-10 w-3/4 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted/60" />
        </div>

        <div className="relative border-s-2 border-border/40 ms-4 sm:ms-6 space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative ps-6 sm:ps-8">
              <div className="p-6 sm:p-8 rounded-xl bg-card border border-border space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-4 w-24 rounded bg-muted" />
                </div>
                <div className="h-6 w-1/2 rounded bg-muted" />
                <div className="h-4 w-1/3 rounded bg-muted/60" />
                <div className="h-12 w-full rounded bg-muted/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceTimelineSkeleton;
