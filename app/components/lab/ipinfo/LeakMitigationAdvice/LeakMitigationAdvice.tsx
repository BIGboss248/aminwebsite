"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Lock, Globe, Clock, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeakMitigationAdviceProps } from "./LeakMitigationAdvice.types";

/**
 * Actionable Identity Hardening & Leak Mitigation Guidance (`LeakMitigationAdvice`).
 */
export function LeakMitigationAdvice({
  locale = "en",
  className = "",
  ...rest
}: LeakMitigationAdviceProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.mitigation");

  const mitigationItems = [
    {
      icon: <Lock className="size-5 text-primary shrink-0" aria-hidden="true" />,
      title: t("item1_title"),
      desc: t("item1_desc"),
    },
    {
      icon: <Globe className="size-5 text-primary shrink-0" aria-hidden="true" />,
      title: t("item2_title"),
      desc: t("item2_desc"),
    },
    {
      icon: <Clock className="size-5 text-primary shrink-0" aria-hidden="true" />,
      title: t("item3_title"),
      desc: t("item3_desc"),
    },
    {
      icon: <Network className="size-5 text-primary shrink-0" aria-hidden="true" />,
      title: t("item4_title"),
      desc: t("item4_desc"),
    },
  ];

  return (
    <section
      aria-labelledby="mitigation-guidance-heading"
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/50 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-1">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            <span>// DEFENSE IN DEPTH</span>
          </div>
          <h2
            id="mitigation-guidance-heading"
            className="text-lg sm:text-xl font-bold text-foreground tracking-tight"
          >
            {t("title")}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mitigationItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-muted/30 border border-border/60 hover:border-border transition-colors flex gap-3.5 items-start"
          >
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
              {item.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeakMitigationAdvice;
