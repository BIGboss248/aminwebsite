import React from "react";
import { ProjectsHeroSkeleton } from "@/app/components/projects/ProjectsHero";
import { ProjectArchiveGridSkeleton } from "@/app/components/projects/ProjectArchiveGrid";
import { OpenSourceShowcaseSkeleton } from "@/app/components/projects/OpenSourceShowcase";

export default function ProjectsLoading(): React.JSX.Element {
  return (
    <div
      data-testid="projects-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <ProjectsHeroSkeleton />
      <ProjectArchiveGridSkeleton />
      <OpenSourceShowcaseSkeleton />
    </div>
  );
}
