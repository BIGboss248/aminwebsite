import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { HeroSectionProps } from "./HeroSection.types";

/**
 * Editorial Minimalist Hero Section for the Home Page.
 *
 * Articulates Amin Jamali's competence as a Pro Frontend Developer & Solutions
 * Architect across interface engineering, CI/CD pipelines, networking, and infrastructure.
 *
 * @param props - Configuration properties for the HeroSection.
 * @returns A React Server Component rendering the Hero Section.
 */
export function HeroSection({
  locale = "en",
  availabilityText,
  availabilityStatus = "available",
  title,
  description,
  primaryCtaText,
  primaryCtaHref = ROUTES.contact,
  secondaryCtaText,
  secondaryCtaHref = ROUTES.projects.root,
  labCtaText,
  labCtaHref = ROUTES.lab.root,
  className = "",
}: HeroSectionProps): React.JSX.Element {
  const t = useTranslations("home.hero");
  const tHero = (key: string) => t(key as never);

  const resolvedAvailability = availabilityText ?? tHero("availability_text");
  const resolvedTitle = title ?? tHero("title");
  const resolvedDescription = description ?? tHero("description");
  const resolvedPrimaryCta = primaryCtaText ?? tHero("primary_cta");
  const resolvedSecondaryCta = secondaryCtaText ?? tHero("secondary_cta");
  const resolvedLabCta = labCtaText ?? tHero("lab_cta");

  // Status indicator colors
  const statusColorMap = {
    available:
      "bg-status-success/10 text-status-success border-status-success/30",
    busy: "bg-status-warning/10 text-status-warning border-status-warning/30",
    offline: "bg-muted text-muted-foreground border-border",
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      {/* Background Subtle Topology Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20 mask-radial-hero"
      >
        <svg
          className="h-full w-full stroke-border"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
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
            fill="url(#hero-grid)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Start Column: Narrative & Action Triggers (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Availability Status Pill */}
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium tracking-wider mb-6 select-none",
                statusColorMap[availabilityStatus],
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full animate-pulse",
                  availabilityStatus === "available"
                    ? "bg-status-success"
                    : availabilityStatus === "busy"
                      ? "bg-status-warning"
                      : "bg-muted-foreground",
                )}
                aria-hidden="true"
              />
              <span>{resolvedAvailability}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight max-w-2xl"
            >
              {resolvedTitle}
            </h1>

            {/* Narrative Value Proposition */}
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {resolvedDescription}
            </p>

            {/* Dual CTA Triggers */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href={primaryCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-xs transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-11 min-w-35"
              >
                <span>{resolvedPrimaryCta}</span>
                <span aria-hidden="true" className="ms-1 rtl:rotate-180">
                  →
                </span>
              </Link>

              <Link
                href={secondaryCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium text-sm transition-all hover:bg-muted hover:border-border/80 focus-visible:ring-2 focus-visible:ring-primary min-h-11"
              >
                <span>{resolvedSecondaryCta}</span>
              </Link>

              <Link
                href={labCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors min-h-11"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                <span>{resolvedLabCta}</span>
              </Link>
            </div>
          </div>

          {/* End Column: Interactive Telemetry HUD Card (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm dark:shadow-md dark:shadow-primary/10 transition-all"
              tabIndex={0}
              aria-label={tHero("telemetry_card_label")}
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                    {tHero("telemetry_title")}
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                  {tHero("telemetry_live")}
                </span>
              </div>

              {/* Telemetry Metrics Grid (Always strictly LTR for code & values) */}
              <div
                dir="ltr"
                className="grid grid-cols-2 gap-4 font-mono text-xs text-start"
              >
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">
                    {tHero("latency_label")}
                  </p>
                  <p className="text-base font-bold text-primary">
                    {tHero("latency_value")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">
                    {tHero("pipeline_label")}
                  </p>
                  <p className="text-base font-bold text-status-success">
                    {tHero("pipeline_value")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">
                    {tHero("doh_label")}
                  </p>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {tHero("doh_value")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">
                    {tHero("infra_label")}
                  </p>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {tHero("infra_value")}
                  </p>
                </div>
              </div>

              {/* Telemetry Status Bar */}
              <div
                dir="ltr"
                className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground"
              >
                <span>
                  {tHero("telemetry_locale")}: {locale.toUpperCase()}
                </span>
                <span>{tHero("telemetry_status")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
