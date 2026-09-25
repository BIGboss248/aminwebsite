import React from "react";
import { cn } from "@/lib/utils";

export interface ProjectsHeroSkeletonProps {
  className?: string;
}

export function ProjectsHeroSkeleton({
  className = "",
}: ProjectsHeroSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-border/40 bg-background transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Eyebrow badge skeleton */}
          <div className="h-6 w-36 rounded-md bg-muted animate-pulse mb-6" />

          {/* Title skeleton */}
          <div className="h-10 sm:h-12 w-full max-w-2xl rounded-md bg-muted animate-pulse mb-4" />

          {/* Description skeleton */}
          <div className="h-5 w-full rounded-md bg-muted/80 animate-pulse mb-2" />
          <div className="h-5 w-4/5 rounded-md bg-muted/80 animate-pulse mb-8" />

          {/* Metrics / Stats strip skeleton */}
          <div className="w-full pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-12 rounded-lg bg-card border border-border/60 p-3 flex items-center justify-between animate-pulse">
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
            <div className="h-12 rounded-lg bg-card border border-border/60 p-3 flex items-center justify-between animate-pulse">
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
            <div className="h-12 rounded-lg bg-card border border-border/60 p-3 flex items-center justify-between animate-pulse">
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsHeroSkeleton;
