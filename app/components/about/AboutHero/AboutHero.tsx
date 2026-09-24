import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { AboutHeroProps } from "./AboutHero.types";

/**
 * AboutHero Component.
 */
export function AboutHero({
  locale = "en",
  className = "",
}: AboutHeroProps): React.JSX.Element {
  const t = useTranslations("about.hero");
  const tCommon = useTranslations("common");

  return (
    <section
      aria-labelledby="about-hero-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
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
              id="about-hero-grid"
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
            fill="url(#about-hero-grid)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-card border border-border/80 text-muted-foreground font-mono text-xs tracking-wider mb-6 select-none shadow-xs">
              <span className="size-2 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-bold">
                {t("system_profile_badge")}
              </span>
            </div>

            <h1
              id="about-hero-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-tight mb-3"
            >
              {tCommon("brand")}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl text-foreground/90 font-medium mb-6">
              <span>{t("role_title")}</span>
              <span className="text-border hidden sm:inline">/</span>
              <span className="text-xs sm:text-sm font-mono text-primary font-normal tracking-wide hidden sm:inline">
                {t("role_kernel")}
              </span>
            </div>

            <div className="w-full my-4 p-4 sm:p-5 bg-primary/5 border-s-4 border-primary rounded-e-lg backdrop-blur-xs">
              <p className="text-base sm:text-lg font-mono text-primary font-medium tracking-tight">
                {t("philosophy_quote")}
              </p>
            </div>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              {t("bio_lead")}
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href={ROUTES.projects.root}
                locale={locale}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-sm transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary min-h-11"
              >
                <span>{t("cta_projects")}</span>
                <span aria-hidden="true" className="ms-1 rtl:rotate-180">
                  →
                </span>
              </Link>

              <Link
                href={ROUTES.lab.root}
                locale={locale}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-card text-foreground font-medium text-sm transition-all hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary min-h-11"
              >
                <span className="size-2 rounded-full bg-primary" />
                <span>{t("cta_lab")}</span>
              </Link>
            </div>

            <div
              dir="ltr"
              className="w-full pt-6 border-t border-border/60 flex flex-wrap items-center gap-y-3 gap-x-6 text-muted-foreground font-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/80">
                  {t("uptime_label")}:
                </span>
                <span className="text-status-success font-bold tracking-wider">
                  {t("uptime_val")}
                </span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/80">
                  {t("latency_label")}:
                </span>
                <span className="text-primary font-bold tracking-wider">
                  {t("latency_val")}
                </span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/80">
                  {t("concurrency_label")}:
                </span>
                <span className="text-foreground font-bold tracking-wider">
                  {t("concurrency_val")}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-radial from-primary/20 via-transparent to-primary/5 blur-2xl pointer-events-none"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-border border-dashed animate-[spin_60s_linear_infinite]"
              />

              <div
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground px-1 bg-background select-none"
              >
                000° N
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground px-1 bg-background select-none"
              >
                180° S
              </div>
              <div
                aria-hidden="true"
                className="absolute -left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground px-1 bg-background select-none"
              >
                270° W
              </div>
              <div
                aria-hidden="true"
                className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground px-1 bg-background select-none"
              >
                090° E
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-3 sm:inset-4 rounded-full border border-border/60"
              />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-tr from-primary via-border to-primary/40 shadow-lg overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-card relative">
                  <Image
                    src="/images/about/portrait.jpg"
                    alt={t("portrait_alt")}
                    fill
                    sizes="(max-width: 768px) 224px, 288px"
                    priority
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100 object-top"
                  />
                </div>
              </div>

              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-background/90 backdrop-blur-md border border-border rounded-full flex items-center gap-2 shadow-xs">
                <span className="size-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="font-mono text-[11px] text-foreground font-semibold tracking-wider">
                  {t("identity_verified")}
                </span>
              </div>

              <div className="absolute bottom-4 left-0 z-20 px-2.5 py-1 bg-background/90 border border-border rounded font-mono text-[10px] text-primary shadow-xs hidden sm:flex items-center gap-1.5">
                <span>{t("architect_key")}</span>
              </div>
            </div>

            <div
              dir="ltr"
              className="w-full max-w-sm mt-8 p-4 bg-card border border-border rounded-lg shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2.5">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold tracking-wider">
                  <span>{t("spec_title")}</span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t("spec_arch")}
                </span>
              </div>
              <div className="font-mono text-xs text-foreground flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("runtime_label")}
                </span>
                <span className="text-primary font-semibold">
                  {t("runtime_val")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
