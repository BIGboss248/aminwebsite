import React from "react";
import { LabHeroSkeleton } from "@/app/components/lab/LabHero";
import { LabToolGridSkeleton } from "@/app/components/lab/LabToolGrid";

export default function LabLoading(): React.JSX.Element {
  return (
    <div
      data-testid="lab-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <LabHeroSkeleton />
      <LabToolGridSkeleton />
    </div>
  );
}
