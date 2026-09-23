import React from "react";
import { cn } from "@/lib/utils";

export interface TrustSignalsSectionSkeletonProps {
  /**
   * Optional additional CSS classes to append to the skeleton container.
   * @defaultValue ""
   */
  className?: string;
}

/**
 * Suspense Skeleton Fallback for TrustSignalsSection.
 *
 * Precisely mirrors the 12-column Bento Grid layout geometry and dimensions
 * to eliminate Cumulative Layout Shift (CLS) during server hydration.
 *
 * @param props - Configuration properties for the skeleton.
 * @returns A loading skeleton representation of the Trust Signals section.
 */
export function TrustSignalsSectionSkeleton({
  className = "",
}: TrustSignalsSectionSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-label="Loading trust signals and credentials"
      aria-busy="true"
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="h-4 w-48 rounded-md bg-skeleton mb-3" />
          <div className="h-8 sm:h-10 w-3/4 rounded-md bg-skeleton mb-4" />
          <div className="h-4 w-full max-w-xl rounded-md bg-skeleton/80" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Cell 1: Web Vitals Skeleton (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 min-h-80">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="h-6 w-36 rounded-full bg-skeleton" />
                <div className="size-5 rounded bg-skeleton" />
              </div>
              <div className="h-5 w-44 rounded-md bg-skeleton mb-2" />
              <div className="h-4 w-64 rounded-md bg-skeleton/70 mb-6" />

              {/* 3 Metric columns */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-lg border border-border/60 bg-muted/20">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-16 rounded bg-skeleton" />
                  <div className="h-3 w-14 rounded bg-skeleton/60" />
                </div>
                <div className="flex flex-col items-center gap-2 border-s border-e border-border/40">
                  <div className="h-7 w-12 rounded bg-skeleton" />
                  <div className="h-3 w-14 rounded bg-skeleton/60" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-12 rounded bg-skeleton" />
                  <div className="h-3 w-14 rounded bg-skeleton/60" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <div className="h-3 w-3/4 rounded bg-skeleton/60" />
            </div>
          </div>

          {/* Cell 2: Dual Degrees Skeleton (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 min-h-80">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="h-6 w-36 rounded-full bg-skeleton" />
              </div>
              <div className="h-5 w-48 rounded-md bg-skeleton mb-4" />

              <div className="space-y-4">
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-2">
                  <div className="h-4 w-44 rounded bg-skeleton" />
                  <div className="h-3 w-56 rounded bg-skeleton/60" />
                </div>
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-2">
                  <div className="h-4 w-44 rounded bg-skeleton" />
                  <div className="h-3 w-56 rounded bg-skeleton/60" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <div className="h-6 w-52 rounded-full bg-skeleton" />
            </div>
          </div>

          {/* Cell 3: Professional Certifications Skeleton (7 Cols) */}
          <div className="md:col-span-2 lg:col-span-7 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 min-h-65">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="h-6 w-44 rounded-full bg-skeleton" />
              </div>
              <div className="h-5 w-44 rounded-md bg-skeleton mb-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-skeleton" />
                  <div className="h-3 w-20 rounded bg-skeleton/60" />
                </div>
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-skeleton" />
                  <div className="h-3 w-20 rounded bg-skeleton/60" />
                </div>
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-skeleton" />
                  <div className="h-3 w-20 rounded bg-skeleton/60" />
                </div>
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-skeleton" />
                  <div className="h-3 w-20 rounded bg-skeleton/60" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40">
              <div className="h-4 w-40 rounded bg-skeleton" />
            </div>
          </div>

          {/* Cell 4: Bilingual Fluency Skeleton (5 Cols) */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 min-h-65">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <div className="h-6 w-36 rounded-full bg-skeleton" />
              </div>
              <div className="h-5 w-48 rounded-md bg-skeleton mb-4" />

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3.5 w-24 rounded bg-skeleton" />
                    <div className="h-3 w-16 rounded bg-skeleton/60" />
                  </div>
                  <div className="h-3 w-40 rounded bg-skeleton/50" />
                </div>
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3.5 w-20 rounded bg-skeleton" />
                    <div className="h-3 w-16 rounded bg-skeleton/60" />
                  </div>
                  <div className="h-3 w-40 rounded bg-skeleton/50" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40">
              <div className="h-6 w-48 rounded-full bg-skeleton" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSignalsSectionSkeleton;
