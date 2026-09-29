"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { LinkedInProfileBannerProps } from "./SinglePageCertificationsSection.types";

/**
 * LinkedInProfileBanner Component.
 *
 * Prominent callout card linking directly to Amin Jamali's LinkedIn profile,
 * highlighting verified professional standing, endorsements, and direct connection.
 */
export function LinkedInProfileBanner({
  locale = "en",
  className = "",
}: LinkedInProfileBannerProps): React.JSX.Element {
  const t = useTranslations("single_page.certifications");

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs transition-all duration-200 hover:border-primary/40 flex flex-col md:flex-row md:items-center justify-between gap-6",
        className,
      )}
    >
      <div className="max-w-2xl">
        {/* Badge Row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono font-medium tracking-wide select-none">
            <svg
              className="size-3.5 text-primary shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>{t("linkedin_banner.badge")}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-status-success animate-pulse" aria-hidden="true" />
            <span>{t("linkedin_banner.verified_profile")}</span>
            <span className="text-primary font-semibold">({t("linkedin_banner.profile_handle")})</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
          {t("linkedin_banner.headline")}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("linkedin_banner.description")}
        </p>
      </div>

      {/* Action Button */}
      <div className="shrink-0 flex items-center">
        <a
          href={SITE_CONFIG.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedin_banner.cta_aria")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-xs hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer min-h-11"
        >
          <svg
            className="size-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span>{t("linkedin_banner.cta_connect")}</span>
          <ExternalLink className="size-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default LinkedInProfileBanner;
