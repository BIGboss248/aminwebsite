import React from "react";
import { AboutHeroSkeleton } from "@/app/components/about/AboutHero";
import { PhilosophySectionSkeleton } from "@/app/components/about/PhilosophySection";
import { ExperienceTimelineSkeleton } from "@/app/components/about/ExperienceTimeline";
import { AcademicResearchSectionSkeleton } from "@/app/components/about/AcademicResearchSection";
import { BeyondCodeSectionSkeleton } from "@/app/components/about/BeyondCodeSection";

export default function AboutLoading(): React.JSX.Element {
  return (
    <div
      data-testid="about-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <AboutHeroSkeleton />
      <PhilosophySectionSkeleton />
      <ExperienceTimelineSkeleton />
      <AcademicResearchSectionSkeleton />
      <BeyondCodeSectionSkeleton />
    </div>
  );
}
