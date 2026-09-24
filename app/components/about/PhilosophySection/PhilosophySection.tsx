import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { PhilosophySectionProps } from "./PhilosophySection.types";

/**
 * PhilosophySection Component.
 */
export function PhilosophySection({
  locale = "en",
  className = "",
}: PhilosophySectionProps): React.JSX.Element {
  const t = useTranslations("about.philosophy");

  const pillars = [
    {
      badge: t("pillar1_badge"),
      title: t("pillar1_title"),
      description: t("pillar1_desc"),
      items: [t("pillar1_item1"), t("pillar1_item2"), t("pillar1_item3")],
      accentBorder: "hover:border-primary/60",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
    },
    {
      badge: t("pillar2_badge"),
      title: t("pillar2_title"),
      description: t("pillar2_desc"),
      items: [t("pillar2_item1"), t("pillar2_item2"), t("pillar2_item3")],
      accentBorder: "hover:border-status-success/60",
      badgeColor: "bg-status-success/10 text-status-success border-status-success/20",
    },
    {
      badge: t("pillar3_badge"),
      title: t("pillar3_title"),
      description: t("pillar3_desc"),
      items: [t("pillar3_item1"), t("pillar3_item2"), t("pillar3_item3")],
      accentBorder: "hover:border-status-info/60",
      badgeColor: "bg-status-info/10 text-status-info border-status-info/20",
    },
  ];

  return (
    <section
      aria-labelledby="philosophy-heading"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-section-alternate text-section-alternate-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl mb-12 lg:mb-16 text-start">
          <p className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider mb-2">
            {t("eyebrow")}
          </p>
          <h2
            id="philosophy-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-card border border-border transition-all duration-200 shadow-xs",
                pillar.accentBorder,
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded text-xs font-mono font-semibold border select-none",
                      pillar.badgeColor,
                    )}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-border/60 text-xs text-foreground/80">
                {pillar.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="text-primary font-bold mt-0.5 select-none"
                    >
                      ▹
                    </span>
                    <span className="leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
