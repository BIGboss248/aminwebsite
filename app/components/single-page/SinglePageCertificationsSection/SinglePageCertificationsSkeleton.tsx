import React from "react";
import { cn } from "@/lib/utils";
import type { SinglePageCertificationsSkeletonProps } from "./SinglePageCertificationsSection.types";

/**
 * SinglePageCertificationsSkeleton Component.
 *
 * Streaming Suspense skeleton fallback mirroring the exact layout and geometry
 * of the Top 4 Certifications section and LinkedIn Showcase banner.
 */
export function SinglePageCertificationsSkeleton({
  className = "",
}: SinglePageCertificationsSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-label="Loading certifications and credentials"
      aria-busy="true"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <div className="h-4 w-44 bg-muted/70 rounded mb-3 animate-pulse" />
          <div className="h-10 w-3/4 sm:w-2/3 bg-muted/80 rounded mb-4 animate-pulse" />
          <div className="h-5 w-full bg-muted/60 rounded mb-2 animate-pulse" />
          <div className="h-5 w-4/5 bg-muted/60 rounded animate-pulse" />
        </div>

        {/* 4 Certification Cards Grid Skeleton (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="h-4 w-32 bg-muted/70 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-muted/60 rounded-full animate-pulse" />
                </div>

                {/* Title */}
                <div className="h-6 w-5/6 bg-muted/80 rounded mb-2 animate-pulse" />
                <div className="h-6 w-2/3 bg-muted/80 rounded mb-3 animate-pulse" />

                {/* Issuer */}
                <div className="h-4 w-40 bg-muted/60 rounded mb-4 animate-pulse" />

                {/* Summary */}
                <div className="space-y-2 mb-5">
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-muted/50 rounded animate-pulse" />
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <div className="h-5 w-20 bg-muted/50 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-muted/50 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-muted/50 rounded animate-pulse" />
                  <div className="h-5 w-28 bg-muted/50 rounded animate-pulse" />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4 mt-auto">
                <div className="h-4 w-36 bg-muted/60 rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted/60 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn Profile Banner Skeleton */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-5 w-36 bg-muted/70 rounded-full animate-pulse" />
              <div className="h-4 w-44 bg-muted/50 rounded animate-pulse" />
            </div>
            <div className="h-7 w-2/3 bg-muted/80 rounded mb-2 animate-pulse" />
            <div className="h-4 w-full bg-muted/50 rounded mb-1 animate-pulse" />
            <div className="h-4 w-4/5 bg-muted/50 rounded animate-pulse" />
          </div>

          <div className="shrink-0">
            <div className="h-11 w-44 bg-muted/70 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePageCertificationsSkeleton;
