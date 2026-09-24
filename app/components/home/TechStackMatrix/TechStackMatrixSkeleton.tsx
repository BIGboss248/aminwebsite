import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Suspense Fallback Skeleton for TechStackMatrix.
 *
 * Mirrors the exact 2x2 Bento Matrix spatial geometry, card padding,
 * and pill shapes to prevent Cumulative Layout Shift (CLS) during streaming SSR.
 *
 * @returns A loading skeleton component.
 */
export function TechStackMatrixSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  const t = useTranslations("home.tech_matrix");

  return (
    <section
      role="region"
      aria-busy="true"
      aria-label={t("loading_tech_matrix" as never)}
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="h-3.5 w-48 bg-muted rounded-full" />
            <div className="h-8 sm:h-10 w-3/4 bg-muted rounded-lg" />
            <div className="h-4 w-full bg-muted/70 rounded" />
            <div className="h-4 w-5/6 bg-muted/60 rounded" />
          </div>

          {/* Stat Boxes Skeleton */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="h-16 w-28 bg-muted/40 rounded-xl border border-border/40" />
            <div className="h-16 w-28 bg-muted/40 rounded-xl border border-border/40" />
            <div className="h-16 w-28 bg-muted/40 rounded-xl border border-border/40" />
          </div>
        </div>

        {/* 4-Quadrant Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-6"
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted/60" />
                  <div className="h-6 w-40 bg-muted rounded-lg" />
                </div>
                <div className="h-5 w-20 rounded-full bg-muted/50" />
              </div>

              {/* Summary line */}
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-muted/50 rounded" />
                <div className="h-3.5 w-4/5 bg-muted/40 rounded" />
              </div>

              {/* Badge Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <div className="h-10 w-28 rounded-lg bg-muted/50 border border-border/40" />
                <div className="h-10 w-32 rounded-lg bg-muted/50 border border-border/40" />
                <div className="h-10 w-24 rounded-lg bg-muted/50 border border-border/40" />
                <div className="h-10 w-36 rounded-lg bg-muted/50 border border-border/40" />
                <div className="h-10 w-28 rounded-lg bg-muted/50 border border-border/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

