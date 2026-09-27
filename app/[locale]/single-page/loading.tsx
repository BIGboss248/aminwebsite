import React from "react";
import { SinglePageHeroSkeleton } from "@/app/components/single-page/SinglePageHero/SinglePageHeroSkeleton";
import { ContactFormSkeleton } from "@/app/components/single-page/ContactForm/ContactForm/ContactFormSkeleton";
import { SocialsBlockSkeleton } from "@/app/components/single-page/ContactForm/SocialsBlock/SocialsBlockSkeleton";

export default function SinglePageLoading(): React.JSX.Element {
  return (
    <div
      data-testid="single-page-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <SinglePageHeroSkeleton />
      <div className="py-16 sm:py-24 border-b border-border/40 bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl animate-pulse">
          <div className="mb-10 sm:mb-12 max-w-2xl space-y-3">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-10 w-3/4 bg-muted rounded-lg" />
            <div className="h-5 w-full bg-muted/60 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ContactFormSkeleton />
            </div>
            <div className="lg:col-span-5">
              <SocialsBlockSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
