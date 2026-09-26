"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ShieldAlert, Radio, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface IpMethodologyTooltipProps {
  locale?: "en" | "fa";
  className?: string;
}

export function IpMethodologyTooltip({
  locale = "en",
  className = "",
}: IpMethodologyTooltipProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("lab.ipinfo.methodology");

  return (
    <div className={cn("mt-6 border border-border/70 rounded-xl bg-card/60 p-4 sm:p-5 shadow-xs", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="methodology-breakdown-ip"
        className="flex w-full items-center justify-between gap-3 text-start focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <ShieldAlert className="size-4" aria-hidden="true" />
          </span>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary block">
              {t("badge")}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              {t("title")}
            </h2>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "size-5 text-muted-foreground transition-transform duration-200 shrink-0",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="methodology-breakdown-ip"
          className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground space-y-4 animate-in fade-in-50 duration-150"
        >
          <p className="leading-relaxed">{t("description")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {/* Vector 1: WebRTC STUN */}
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border/60 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                <Radio className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span>{t("webrtc_title")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("webrtc_desc")}
              </p>
            </div>

            {/* Vector 2: Transparent DNS */}
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border/60 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                <Globe className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span>{t("dns_title")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("dns_desc")}
              </p>
            </div>

            {/* Vector 3: Timezone Drift */}
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border/60 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                <Clock className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span>{t("tz_title")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("tz_desc")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
