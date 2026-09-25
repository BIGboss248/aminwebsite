"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Lock, Radio, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PrivacyGuaranteeBannerProps } from "./LabHero.types";

/**
 * Privacy Guarantee Callout Banner (`PrivacyGuaranteeBanner`).
 *
 * Highlights the zero-telemetry, direct browser-to-resolver architecture of the
 * interactive lab diagnostics suite.
 */
export function PrivacyGuaranteeBanner({
  locale = "en",
  badge,
  title,
  description,
  className = "",
  ...rest
}: PrivacyGuaranteeBannerProps): React.JSX.Element {
  const t = useTranslations("lab.privacy_banner");

  const resolvedBadge = badge ?? t("badge");
  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");

  return (
    <div
      role="region"
      aria-label={resolvedTitle}
      className={cn(
        "relative mt-8 rounded-2xl border border-border/80 bg-card/90 p-6 sm:p-8 backdrop-blur-md shadow-sm transition-all duration-300",
        "hover:border-primary/40",
        className,
      )}
      {...rest}
    >
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-status-success/10 text-status-success border border-status-success/20 shrink-0">
            <ShieldCheck className="size-5.5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              {resolvedTitle}
            </h3>
            <span
              className="inline-flex items-center gap-1.5 mt-0.5 text-xs font-mono font-medium text-status-success"
              dir="ltr"
            >
              <span className="size-1.5 rounded-full bg-status-success animate-pulse" />
              {resolvedBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Main Privacy Explanation */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {resolvedDescription}
      </p>

      {/* 3-Point Guarantee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Point 1: Direct Browser Fetch */}
        <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors hover:border-primary/30">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Radio className="size-4 shrink-0" aria-hidden="true" />
            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
              {t("point1_title")}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("point1_desc")}
          </p>
        </div>

        {/* Point 2: Zero Proxy Intermediaries */}
        <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors hover:border-primary/30">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Lock className="size-4 shrink-0" aria-hidden="true" />
            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
              {t("point2_title")}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("point2_desc")}
          </p>
        </div>

        {/* Point 3: Local-Only Hashing */}
        <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors hover:border-primary/30">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Cpu className="size-4 shrink-0" aria-hidden="true" />
            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
              {t("point3_title")}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("point3_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyGuaranteeBanner;
