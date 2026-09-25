import React from "react";
import { cn } from "@/lib/utils";
import { ProjectFilterTabsSkeleton } from "../ProjectFilterTabs/ProjectFilterTabsSkeleton";
import { ProjectSearchBarSkeleton } from "../ProjectSearchBar/ProjectSearchBarSkeleton";
import { CaseStudyCardSkeleton } from "../CaseStudyCard/CaseStudyCardSkeleton";

export interface ProjectArchiveGridSkeletonProps {
  className?: string;
}

export function ProjectArchiveGridSkeleton({
  className = "",
}: ProjectArchiveGridSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      className={cn("py-12 sm:py-16 bg-background transition-colors", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Controls Row Skeleton */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <ProjectFilterTabsSkeleton className="w-full md:w-auto" />
          <div className="w-full md:w-80">
            <ProjectSearchBarSkeleton />
          </div>
        </div>

        {/* 2-Column Responsive Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <CaseStudyCardSkeleton />
          <CaseStudyCardSkeleton />
          <CaseStudyCardSkeleton />
          <CaseStudyCardSkeleton />
        </div>
      </div>
    </section>
  );
}

export default ProjectArchiveGridSkeleton;
