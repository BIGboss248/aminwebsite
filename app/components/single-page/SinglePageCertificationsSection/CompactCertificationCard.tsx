"use client";

import React from "react";
import { ExternalLink, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompactCertificationCardProps } from "./SinglePageCertificationsSection.types";

/**
 * CompactCertificationCard Component.
 *
 * Renders a lightweight, high-density credential card for the expanded certifications list,
 * linking directly to its official certificate validation record.
 */
export function CompactCertificationCard({
  certification,
  locale = "en",
  className = "",
}: CompactCertificationCardProps): React.JSX.Element {
  return (
    <a
      href={certification.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col justify-between p-3.5 rounded-lg border border-border/70 bg-card hover:bg-muted/30 hover:border-primary/40 shadow-2xs transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      aria-label={`${certification.title} (${certification.issuer})`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 text-start">
            {certification.title}
          </span>
          <ExternalLink
            className="size-3.5 text-muted-foreground/60 group-hover:text-primary shrink-0 mt-0.5 rtl:rotate-180 transition-colors"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 pt-2 border-t border-border/40 mt-auto text-[11px] font-mono text-muted-foreground">
        <Award className="size-3 text-primary shrink-0" aria-hidden="true" />
        <span className="truncate">{certification.issuer}</span>
      </div>
    </a>
  );
}

export default CompactCertificationCard;
