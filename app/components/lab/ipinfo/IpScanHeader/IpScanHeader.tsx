"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { IpMethodologyTooltip } from "./IpMethodologyTooltip";
import type { IpScanHeaderProps } from "./IpScanHeader.types";

/**
 * Header Section for IP & Identity Leak Scanner (`IpScanHeader`).
 */
export function IpScanHeader({
  locale = "en",
  eyebrow,
  badge,
  title,
  description,
  className = "",
  ...rest
}: IpScanHeaderProps): React.JSX.Element {
  const tHeader = useTranslations("lab.ipinfo.header");

  const resolvedEyebrow = eyebrow ?? tHeader("eyebrow");
  const resolvedBadge = badge ?? tHeader("badge");
  const resolvedTitle = title ?? tHeader("title");
  const resolvedDescription = description ?? tHeader("description");

  const isRtl = locale === "fa";

  return (
    <header
      aria-labelledby="ip-scanner-heading"
      className={cn(
        "pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-border/60 bg-background text-foreground transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Link to Lab Hub */}
        <div className="mb-6">
          <Link
            href={ROUTES.lab.root}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft
              className={cn("size-4", isRtl && "rotate-180")}
              aria-hidden="true"
            />
            <span>{tHeader("back_to_lab")}</span>
          </Link>
        </div>

        {/* Eyebrow and Protocol Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2">
            <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              <Shield className="size-3.5" aria-hidden="true" />
            </span>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              {resolvedEyebrow}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
            dir="ltr"
          >
            <span className="size-2 rounded-full bg-status-success animate-pulse" />
            <span>{resolvedBadge}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="max-w-4xl">
          <h1
            id="ip-scanner-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {resolvedTitle}
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            {resolvedDescription}
          </p>
        </div>

        {/* Methodology Explainer Section */}
        <IpMethodologyTooltip locale={locale} />
      </div>
    </header>
  );
}

export default IpScanHeader;
