import React from "react";
import { SinglePageHeroSkeleton } from "@/app/components/single-page/SinglePageHero";

export default function SinglePageLoading(): React.JSX.Element {
  return (
    <div
      data-testid="single-page-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <SinglePageHeroSkeleton />
    </div>
  );
}
