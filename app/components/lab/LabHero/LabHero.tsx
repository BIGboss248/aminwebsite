import React from "react";
import { useTranslations } from "next-intl";
import { Terminal, Shield, Activity, HardDriveDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrivacyGuaranteeBanner } from "./PrivacyGuaranteeBanner";
import type { LabHeroProps } from "./LabHero.types";

/**
 * Lab Hub Header & Observatory Introduction Section (`LabHero`).
 *
 * Welcomes users to the client-side diagnostic suite, introduces the systems
 * engineering philosophy behind the browser-native probers, and embeds the
 * privacy guarantee banner.
 */
export function LabHero({
  locale = "en",
  eyebrow,
  badge,
  title,
  description,
  statToolsLabel,
  statToolsVal,
  statClientLabel,
  statClientVal,
  statPrivacyLabel,
  statPrivacyVal,
  className = "",
  ...rest
}: LabHeroProps): React.JSX.Element {
  const t = useTranslations("lab.hero");

  const resolvedEyebrow = eyebrow ?? t("eyebrow");
  const resolvedBadge = badge ?? t("badge");
  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");

  const resolvedStatToolsLabel = statToolsLabel ?? t("stat_tools_label");
  const resolvedStatToolsVal = statToolsVal ?? t("stat_tools_val");
  const resolvedStatClientLabel = statClientLabel ?? t("stat_client_label");
  const resolvedStatClientVal = statClientVal ?? t("stat_client_val");
  const resolvedStatPrivacyLabel = statPrivacyLabel ?? t("stat_privacy_label");
  const resolvedStatPrivacyVal = statPrivacyVal ?? t("stat_privacy_val");

  return (
    <section
      aria-labelledby="lab-hero-heading"
      className={cn(
        "relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-border/60 bg-background text-foreground transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Eyebrow & Live Telemetry Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2">
            <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              <Terminal className="size-4" aria-hidden="true" />
            </span>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              {resolvedEyebrow}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
            dir="ltr"
          >
            <span className="size-2 rounded-full bg-status-success shadow-xs shadow-status-success/50 animate-pulse" />
            <span>{resolvedBadge}</span>
          </div>
        </div>

        {/* Hero Title & Lead Description */}
        <div className="max-w-4xl">
          <h1
            id="lab-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]"
          >
            {resolvedTitle}
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
            {resolvedDescription}
          </p>
        </div>

        {/* 3 Metric Stat Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {/* Stat 1: Active Probers */}
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
              <Activity className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                {resolvedStatToolsLabel}
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono text-foreground mt-0.5">
                {resolvedStatToolsVal}
              </p>
            </div>
          </div>

          {/* Stat 2: Execution Model */}
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
              <HardDriveDownload className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                {resolvedStatClientLabel}
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono text-foreground mt-0.5">
                {resolvedStatClientVal}
              </p>
            </div>
          </div>

          {/* Stat 3: Server Logging */}
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
            <div className="flex size-11 items-center justify-center rounded-lg bg-status-success/10 text-status-success border border-status-success/20 shrink-0">
              <Shield className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                {resolvedStatPrivacyLabel}
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono text-foreground mt-0.5">
                {resolvedStatPrivacyVal}
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Privacy Guarantee Banner */}
        <PrivacyGuaranteeBanner locale={locale} />
      </div>
    </section>
  );
}

export default LabHero;
