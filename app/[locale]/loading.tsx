import React from "react";
import { HeroSectionSkeleton } from "@/app/components/home/HeroSection/HeroSectionSkeleton";
import { TrustSignalsSectionSkeleton } from "@/app/components/home/TrustSignalsSection/TrustSignalsSectionSkeleton";
import { FeaturedProjectsGridSkeleton } from "@/app/components/home/FeaturedProjectsGrid/FeaturedProjectsGridSkeleton";
import { LabLauncherSectionSkeleton } from "@/app/components/home/LabLauncherSection/LabLauncherSectionSkeleton";
import { TechStackMatrixSkeleton } from "@/app/components/home/TechStackMatrix/TechStackMatrixSkeleton";

export default function Loading(): React.JSX.Element {
  return (
    <div
      data-testid="home-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <HeroSectionSkeleton />
      <TrustSignalsSectionSkeleton />
      <FeaturedProjectsGridSkeleton />
      <LabLauncherSectionSkeleton />
      <TechStackMatrixSkeleton />
    </div>
  );
}
