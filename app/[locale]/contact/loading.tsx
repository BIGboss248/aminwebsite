import React from "react";
import { ContactFormSkeleton } from "@/app/components/contact/ContactForm/ContactFormSkeleton";
import { SocialsBlockSkeleton } from "@/app/components/contact/SocialsBlock/SocialsBlockSkeleton";

export default function ContactLoading(): React.JSX.Element {
  return (
    <div
      data-testid="contact-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl animate-pulse">
        <div className="mb-10 sm:mb-12 max-w-2xl space-y-3">
          <div className="h-3.5 w-28 bg-muted rounded" />
          <div className="h-9 sm:h-12 w-3/4 bg-muted rounded-md" />
          <div className="h-4 w-full bg-muted/60 rounded" />
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
  );
}
