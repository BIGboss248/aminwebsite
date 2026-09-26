"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Globe2, Server, MapPin, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PublicIpCardProps } from "./PublicIpCard.types";

/**
 * Public IP and ASN Diagnostic Card (`PublicIpCard`).
 */
export function PublicIpCard({
  locale = "en",
  data,
  isLoading = false,
  className = "",
  ...rest
}: PublicIpCardProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.public_ip");

  const ip = data?.ip ?? t("not_detected");
  const version = data?.version ?? "IPv4";
  const isp = data?.isp ?? t("not_detected");
  const asn = data?.asn ?? t("not_detected");
  const country = data?.country ?? t("not_detected");
  const city = data?.city ?? t("not_detected");
  const region = data?.region ?? "";
  const isHosting = data?.isHosting ?? false;
  const isVpn = data?.isVpn || data?.isProxy || false;

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-colors",
        className,
      )}
      {...rest}
    >
      {/* Header Container Row with flex-wrap */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Globe2 className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-foreground tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-status-success/10 text-status-success border border-status-success/20"
          dir="ltr"
        >
          <span className="size-1.5 rounded-full bg-status-success animate-pulse" />
          <span>{t("secure_badge")}</span>
        </div>
      </div>

      {/* Main IP Highlight */}
      <div className="py-4">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
          {version === "IPv6" ? t("ipv6_label") : t("ipv4_label")}
        </span>
        <div className="flex flex-wrap items-baseline gap-3">
          <span
            className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-tight select-all"
            dir="ltr"
          >
            {ip}
          </span>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase bg-muted border border-border text-muted-foreground"
            dir="ltr"
          >
            {version}
          </span>
        </div>
      </div>

      {/* Grid of Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 mt-auto">
        {/* ASN & Organization */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Server className="size-3.5 text-primary" aria-hidden="true" />
            <span>{t("asn_label")}</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
            {asn}
          </span>
        </div>

        {/* ISP */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Cpu className="size-3.5 text-primary" aria-hidden="true" />
            <span>{t("isp_label")}</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-foreground truncate" title={isp}>
            {isp}
          </span>
        </div>

        {/* Location */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <MapPin className="size-3.5 text-primary" aria-hidden="true" />
            <span>{t("location_label")}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {city}, {region ? `${region}, ` : ""}{country}
            </span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border",
                isHosting || isVpn
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border",
              )}
            >
              {isHosting || isVpn ? t("datacenter_vpn_tag") : t("residential_tag")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicIpCard;
