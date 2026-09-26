"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, ShieldCheck, AlertTriangle, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimezoneMismatchCardProps } from "./TimezoneMismatchCard.types";

/**
 * Timezone & Clock Drift Inspector Card (`TimezoneMismatchCard`).
 */
export function TimezoneMismatchCard({
  locale = "en",
  result,
  isLoading = false,
  className = "",
  ...rest
}: TimezoneMismatchCardProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.timezone");

  const {
    status,
    systemTimezone,
    geoTimezone,
    offsetDifferenceMinutes,
    localFormattedTime,
  } = result;

  const isMatch = status === "match";

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-colors",
        className,
      )}
      {...rest}
    >
      {/* Header Row with flex-wrap */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Clock className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-foreground tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
            isMatch
              ? "bg-status-success/10 text-status-success border-status-success/20"
              : "bg-status-warning/10 text-status-warning border-status-warning/20",
          )}
          dir="ltr"
        >
          <span
            className={cn(
              "size-1.5 rounded-full animate-pulse",
              isMatch ? "bg-status-success" : "bg-status-warning",
            )}
          />
          <span>{isMatch ? t("badge_match") : t("badge_mismatch")}</span>
        </div>
      </div>

      {/* Description Explainer */}
      <p className="py-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {isMatch ? t("desc_match") : t("desc_mismatch")}
      </p>

      {/* Timezone Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 mt-auto">
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">
            {t("system_tz_label")}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
            {systemTimezone}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">
            {t("geo_tz_label")}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
            {geoTimezone}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1 sm:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Compass className="size-3.5 text-primary" aria-hidden="true" />
              <span>{t("local_time_label")}</span>
            </div>
            <span className="text-xs font-mono text-foreground" dir="ltr">
              {localFormattedTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
            <span className="text-muted-foreground">{t("offset_diff_label")}:</span>
            <span
              className={cn(
                "font-mono font-semibold",
                offsetDifferenceMinutes === 0 ? "text-status-success" : "text-status-warning",
              )}
              dir="ltr"
            >
              {offsetDifferenceMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimezoneMismatchCard;
