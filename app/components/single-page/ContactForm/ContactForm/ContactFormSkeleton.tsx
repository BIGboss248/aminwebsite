import React from "react";
import { cn } from "@/lib/utils";

export interface ContactFormSkeletonProps {
  className?: string;
}

export function ContactFormSkeleton({
  className = "",
}: ContactFormSkeletonProps): React.JSX.Element {
  return (
    <div
      data-testid="contact-form-skeleton"
      aria-hidden="true"
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 animate-pulse",
        className,
      )}
    >
      <div className="h-7 w-48 bg-muted rounded-md" />

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-11 w-full bg-muted/60 rounded-lg" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-11 w-full bg-muted/60 rounded-lg" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-11 w-full bg-muted/60 rounded-lg" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-28 w-full bg-muted/60 rounded-lg" />
        </div>

        <div className="h-12 w-full bg-muted rounded-lg pt-2" />
      </div>
    </div>
  );
}

export default ContactFormSkeleton;
