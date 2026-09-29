import React from "react";
import { cn } from "@/lib/utils";
import type { SinglePageFooterSkeletonProps } from "./SinglePageFooter.types";

/**
 * Loading skeleton fallback for SinglePageFooter.
 * Renders pulse placeholders maintaining exact dimensions and spatial balance.
 */
export function SinglePageFooterSkeleton({
  className,
  ...props
}: SinglePageFooterSkeletonProps): React.JSX.Element {
  return (
    <footer
      role="contentinfo"
      aria-hidden="true"
      className={cn(
        "w-full border-t border-border/80 bg-background/95 backdrop-blur-sm pt-14 pb-10 transition-colors",
        className,
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Tier: Brand, Navigation Matrix & Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Systems Bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-4 w-48 rounded bg-muted/80 animate-pulse" />
            <div className="space-y-1.5 pt-1">
              <div className="h-3.5 w-full max-w-sm rounded bg-muted/60 animate-pulse" />
              <div className="h-3.5 w-3/4 rounded bg-muted/60 animate-pulse" />
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="space-y-2 pt-1">
              <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
              <div className="h-4 w-32 rounded bg-muted/60 animate-pulse" />
              <div className="h-4 w-28 rounded bg-muted/60 animate-pulse" />
              <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
            </div>
          </div>

          {/* Channels & Back to Top */}
          <div className="md:col-span-4 space-y-3">
            <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="h-8 w-20 rounded-md bg-muted/60 animate-pulse" />
              <div className="h-8 w-20 rounded-md bg-muted/60 animate-pulse" />
              <div className="h-8 w-20 rounded-md bg-muted/60 animate-pulse" />
              <div className="h-8 w-28 rounded-md bg-muted/60 animate-pulse" />
            </div>
            <div className="pt-2">
              <div className="h-8 w-32 rounded-md bg-muted/40 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Colophon Sub-footer */}
        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-3.5 w-48 rounded bg-muted/50 animate-pulse" />
          <div className="h-3.5 w-64 rounded bg-muted/50 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}

export default SinglePageFooterSkeleton;
