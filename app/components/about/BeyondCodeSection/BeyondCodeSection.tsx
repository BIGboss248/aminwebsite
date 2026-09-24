import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { BeyondCodeSectionProps } from "./BeyondCodeSection.types";

/**
 * BeyondCodeSection Component.
 */
export function BeyondCodeSection({
  locale = "en",
  className = "",
}: BeyondCodeSectionProps): React.JSX.Element {
  const t = useTranslations("about.beyond");

  const items = [
    {
      badge: t("item1_badge"),
      title: t("item1_title"),
      description: t("item1_desc"),
    },
    {
      badge: t("item2_badge"),
      title: t("item2_title"),
      description: t("item2_desc"),
    },
    {
      badge: t("item3_badge"),
      title: t("item3_title"),
      description: t("item3_desc"),
    },
    {
      badge: t("item4_badge"),
      title: t("item4_title"),
      description: t("item4_desc"),
    },
  ];

  return (
    <section
      aria-labelledby="beyond-heading"
      className={cn(
        "py-16 sm:py-24 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl mb-12 lg:mb-16 text-start">
          <p className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider mb-2">
            {t("eyebrow")}
          </p>
          <h2
            id="beyond-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-xl bg-card border border-border shadow-xs hover:border-primary/40 transition-all duration-200"
            >
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 select-none">
                {item.badge}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeyondCodeSection;
