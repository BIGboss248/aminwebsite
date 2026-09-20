import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Props for configuring the MobileNavDrawerSkeleton component.
 */
export interface MobileNavDrawerSkeletonProps {
  /**
   * Optional custom CSS class names to merge onto the skeleton container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Number of navigation item skeleton placeholders to render.
   * @defaultValue `5`
   */
  itemCount?: number;
}

/**
 * Loading skeleton fallback for the Mobile Navigation Cockpit Drawer (`MobileNavDrawer`).
 *
 * Mimics the exact geometry of the open drawer panel, including the brand lockup,
 * route topology node cards, and pinned utility dock, eliminating Cumulative Layout Shift (CLS)
 * during code splitting or route transitions.
 *
 * @param props - Configuration properties for the drawer skeleton.
 * @returns An accessible loading presentation element.
 */
export function MobileNavDrawerSkeleton({
  className = "",
  itemCount = 5,
}: MobileNavDrawerSkeletonProps): React.JSX.Element {
  return (
    <div
      data-testid="mobile-nav-drawer-skeleton"
      aria-busy="true"
      aria-label="Loading mobile navigation drawer"
      className={cn(
        "flex flex-col w-[320px] max-w-[85vw] h-full bg-card border-s border-border shadow-2xl p-4 gap-4 animate-in fade-in duration-150",
        className,
      )}
    >
      {/* 1. Header Skeleton Lockup */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-28 rounded-xs" />
            <Skeleton className="h-2.5 w-20 rounded-xs" />
          </div>
        </div>
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>

      {/* 2. Topology Label Skeleton */}
      {/* 2. Route Node Skeletons */}
      <div className="pt-1">
        <Skeleton className="h-2.5 w-24 rounded-xs mb-3" />

        {/* Route Node Card Skeletons */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-8 rounded-xs" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-20 rounded-xs" />
                  <Skeleton className="h-2.5 w-32 rounded-xs" />
                </div>
              </div>
              {index === 3 && <Skeleton className="h-4 w-10 rounded-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bottom Utility Dock Skeleton */}
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
        <Skeleton className="h-3 w-24 rounded-xs" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export default MobileNavDrawerSkeleton;

