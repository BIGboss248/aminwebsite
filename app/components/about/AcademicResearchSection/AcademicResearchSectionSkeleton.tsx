import React from "react";
import { cn } from "@/lib/utils";

export interface AcademicResearchSectionSkeletonProps {
  className?: string;
}

export function AcademicResearchSectionSkeleton({
  className = "",
}: AcademicResearchSectionSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      aria-label="Loading research and credentials"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-card border border-border space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-28 rounded bg-muted" />
                <div className="h-4 w-16 rounded bg-muted" />
              </div>
              <div className="h-7 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/3 rounded bg-muted/60" />
              <div className="h-16 w-full rounded bg-muted/40" />
            </div>
            <div className="p-6 rounded-xl bg-card border border-border h-20" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-card border border-border space-y-4">
            <div className="h-6 w-1/2 rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted/60" />
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-muted/30" />
              <div className="h-16 rounded-lg bg-muted/30" />
              <div className="h-16 rounded-lg bg-muted/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicResearchSectionSkeleton;
