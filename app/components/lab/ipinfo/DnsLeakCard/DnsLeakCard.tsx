"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Globe, ShieldCheck, ShieldAlert, AlertTriangle, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DnsLeakCardProps } from "./DnsLeakCard.types";

/**
 * Transparent DNS Resolver Leak Detector Card (`DnsLeakCard`).
 */
export function DnsLeakCard({
  locale = "en",
  result,
  isLoading = false,
  className = "",
  ...rest
}: DnsLeakCardProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.dns");

  const {
    status,
    resolverIp = "1.1.1.1",
    resolverAsn = "AS13335",
    resolverIsp = "Cloudflare, Inc.",
  } = result;

  const getStatusBadge = () => {
    switch (status) {
      case "transparent_detected":
        return {
          label: t("badge_transparent"),
          desc: t("desc_mismatch"),
          badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
          dotClass: "bg-destructive",
          icon: <ShieldAlert className="size-4 text-destructive" aria-hidden="true" />,
        };
      case "mismatch":
        return {
          label: t("badge_mismatch"),
          desc: t("desc_mismatch"),
          badgeClass: "bg-status-warning/10 text-status-warning border-status-warning/20",
          dotClass: "bg-status-warning",
          icon: <AlertTriangle className="size-4 text-status-warning" aria-hidden="true" />,
        };
      case "secure":
      default:
        return {
          label: t("badge_secure"),
          desc: t("desc_secure"),
          badgeClass: "bg-status-success/10 text-status-success border-status-success/20",
          dotClass: "bg-status-success",
          icon: <ShieldCheck className="size-4 text-status-success" aria-hidden="true" />,
        };
    }
  };

  const badgeInfo = getStatusBadge();

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
            <Globe className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-foreground tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
            badgeInfo.badgeClass,
          )}
          dir="ltr"
        >
          <span className={cn("size-1.5 rounded-full animate-pulse", badgeInfo.dotClass)} />
          <span>{badgeInfo.label}</span>
        </div>
      </div>

      {/* Description Explainer */}
      <p className="py-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {badgeInfo.desc}
      </p>

      {/* Resolver Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 mt-auto">
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">
            {t("resolver_label")}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
            {resolverIp}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">
            {t("asn_label")}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
            {resolverAsn}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Network className="size-3.5 text-primary" aria-hidden="true" />
            <span>{t("isp_label")}</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
            {resolverIsp}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DnsLeakCard;
