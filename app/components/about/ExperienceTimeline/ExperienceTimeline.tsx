import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ExperienceTimelineProps } from "./ExperienceTimeline.types";

/**
 * ExperienceTimeline Component.
 */
export function ExperienceTimeline({
  locale = "en",
  className = "",
}: ExperienceTimelineProps): React.JSX.Element {
  const t = useTranslations("about.experience");

  const experiences = [
    {
      period: t("role1_period"),
      role: t("role1_role"),
      company: t("role1_company"),
      badge: t("role1_badge"),
      summary: t("role1_summary"),
      deliverables: [
        t("role1_impact1"),
        t("role1_impact2"),
        t("role1_impact3"),
      ],
      type: "work",
    },
    {
      period: t("role2_period"),
      role: t("role2_role"),
      company: t("role2_company"),
      badge: t("role2_badge"),
      summary: t("role2_summary"),
      deliverables: [
        t("role2_impact1"),
        t("role2_impact2"),
        t("role2_impact3"),
      ],
      type: "work",
    },
    {
      period: t("edu1_period"),
      role: t("edu1_degree"),
      company: t("edu1_school"),
      badge: t("edu1_badge"),
      summary: t("edu1_desc"),
      deliverables: [],
      type: "education",
    },
    {
      period: t("edu2_period"),
      role: t("edu2_degree"),
      company: t("edu2_school"),
      badge: t("edu2_badge"),
      summary: t("edu2_desc"),
      deliverables: [],
      type: "education",
    },
  ];

  return (
    <section
      aria-labelledby="experience-heading"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl mb-12 lg:mb-16 text-start">
          <p className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider mb-2">
            {t("eyebrow")}
          </p>
          <h2
            id="experience-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="relative border-s-2 border-border/80 ms-4 sm:ms-6 space-y-12">
          {experiences.map((item, idx) => (
            <div key={idx} className="relative ps-6 sm:ps-8 group">
              <div
                aria-hidden="true"
                className="absolute -start-[9px] top-1.5 size-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors"
              />

              <div className="p-6 sm:p-8 rounded-xl bg-card border border-border transition-all duration-200 shadow-xs hover:border-border/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-primary font-bold tracking-wider">
                    {item.period}
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded text-[11px] font-mono font-medium border select-none",
                      item.type === "work"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-secondary/10 text-foreground border-border",
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {item.role}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {item.company}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>

                {item.deliverables.length > 0 && (
                  <ul className="mt-4 pt-4 border-t border-border/60 space-y-2 text-xs text-foreground/85">
                    {item.deliverables.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="text-primary font-bold select-none"
                        >
                          ▹
                        </span>
                        <span className="leading-normal">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceTimeline;
