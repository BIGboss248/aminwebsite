import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProjectsHeroProps } from "./ProjectsHero.types";

/**
 * ProjectsHero Component
 *
 * Renders the top-level systems archive header and metrics banner for the projects page.
 */
export function ProjectsHero({
  locale = "en",
  className = "",
}: ProjectsHeroProps): React.JSX.Element {
  const t = useTranslations("projects.hero");

  return (
    <section
      aria-labelledby="projects-hero-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-15"
      >
        <svg
          className="h-full w-full stroke-border"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="projects-hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.75" />
              <circle cx="48" cy="48" r="1" className="fill-border" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#projects-hero-grid)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-start max-w-4xl text-start">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-card border border-border/80 text-muted-foreground font-mono text-xs tracking-wider mb-6 select-none shadow-xs">
            <span className="size-2 rounded-full bg-primary animate-ping" />
            <span className="text-primary font-bold">{t("badge")}</span>
          </div>

          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-3">
            {t("eyebrow")}
          </p>

          <h1
            id="projects-hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-4"
          >
            {t("title")}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {t("description")}
          </p>

          {/* Quick Metrics Bar */}
          <div
            dir="ltr"
            className="w-full pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs"
          >
            <div className="p-3.5 rounded-lg bg-card/60 border border-border flex items-center justify-between shadow-xs">
              <span className="text-muted-foreground">
                {t("stat_cases_label")}
              </span>
              <span className="text-foreground font-bold tracking-wide">
                {t("stat_cases_val")}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-card/60 border border-border flex items-center justify-between shadow-xs">
              <span className="text-muted-foreground">
                {t("stat_repos_label")}
              </span>
              <span className="text-primary font-bold tracking-wide">
                {t("stat_repos_val")}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-card/60 border border-border flex items-center justify-between shadow-xs">
              <span className="text-muted-foreground">
                {t("stat_metrics_label")}
              </span>
              <span className="text-status-success font-bold tracking-wide">
                {t("stat_metrics_val")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsHero;
