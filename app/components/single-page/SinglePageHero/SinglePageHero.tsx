import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import portraitImage from "@/public/images/about/portrait.jpg";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SinglePageHeroProps } from "./SinglePageHero.types";

/**
 * SinglePageHero Component.
 *
 * An editorial 2-column hero section featuring:
 * - Left column: Brand logo placeholder, big bold name, short role & bio introduction,
 *   and pill-shaped buttons for GitHub, LinkedIn, ORCID, and Mailto inquiry.
 * - Right column: Full-size portrait photograph with responsive framing and ambient lighting.
 */
export function SinglePageHero({
  locale = "en",
  className = "",
}: SinglePageHeroProps): React.JSX.Element {
  const t = useTranslations("single_page.hero");
  const tCommon = useTranslations("common");

  const socialPills = [
    {
      id: "github",
      label: t("social_github"),
      ariaLabel: t("social_github_aria"),
      href: SITE_CONFIG.social.github,
      isExternal: true,
      variant: "outline" as const,
      icon: (
        <svg
          className="size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      label: t("social_linkedin"),
      ariaLabel: t("social_linkedin_aria"),
      href: SITE_CONFIG.social.linkedin,
      isExternal: true,
      variant: "outline" as const,
      icon: (
        <svg
          className="size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      id: "orcid",
      label: t("social_orcid"),
      ariaLabel: t("social_orcid_aria"),
      href: SITE_CONFIG.social.orcid,
      isExternal: true,
      variant: "outline" as const,
      icon: (
        <svg
          className="size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.434h2.238c2.644 0 3.737-1.744 3.737-3.712 0-2.147-1.34-3.722-3.737-3.722h-2.238z" />
        </svg>
      ),
    },
    {
      id: "email",
      label: t("social_email"),
      ariaLabel: t("social_email_aria"),
      href: `mailto:${SITE_CONFIG.contact.email}`,
      isExternal: false,
      variant: "primary" as const,
      icon: (
        <svg
          className="size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="single-page-hero-heading"
      className={cn(
        "relative overflow-hidden py-10 sm:py-14 lg:py-20 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      {/* Subtle Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 dark:opacity-10"
      >
        <svg
          className="h-full w-full stroke-border"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="single-page-hero-grid"
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
            fill="url(#single-page-hero-grid)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Text & Pill-shaped Socials */}
          <div className="md:col-span-7 flex flex-col items-start text-start">
            {/* Logo Placeholder */}
            <div
              className="group flex items-center gap-3 mb-5 sm:mb-6 select-none"
              aria-label={t("logo_placeholder_aria")}
            >
              <div className="size-11 sm:size-13 rounded-2xl border border-border bg-card/90 shadow-xs flex items-center justify-center p-2 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-sm">
                <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-primary">
                  {t("logo_initials")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {t("logo_placeholder_title")}
                </span>
                <span className="text-xs text-foreground/80 font-medium">
                  {tCommon("brand")}
                </span>
              </div>
            </div>

            {/* Big Bold Name */}
            <h1
              id="single-page-hero-heading"
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-3"
            >
              {tCommon("brand")}
            </h1>

            {/* Role Title */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary/90 tracking-tight mb-4 sm:mb-5">
              {t("role_title")}
            </h2>

            {/* Short Bio Description */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-7 sm:mb-8">
              {t("bio_lead")}
            </p>

            {/* Pill-shaped Buttons (Socials & Direct Mailto) */}
            <div
              className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1"
              role="group"
              aria-label={t("role_title")}
            >
              {socialPills.map((pill) => (
                <a
                  key={pill.id}
                  href={pill.href}
                  target={pill.isExternal ? "_blank" : undefined}
                  rel={pill.isExternal ? "noopener noreferrer" : undefined}
                  aria-label={pill.ariaLabel}
                  className={cn(
                    "group inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-xs hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    pill.variant === "primary"
                      ? "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm"
                      : "border border-border bg-card/80 text-foreground hover:bg-card hover:border-primary/60 hover:text-primary",
                  )}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {pill.icon}
                  </span>
                  <span>{pill.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Full-size Portrait Image */}
          <div className="md:col-span-5 flex items-center justify-center relative w-full">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 via-transparent to-primary/5 blur-2xl pointer-events-none -z-10"
            />

            {/* Full-size Portrait Container */}
            <div className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md md:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl group">
              <Image
                src={portraitImage}
                alt={t("portrait_alt")}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                priority
                placeholder="blur"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Subtle Gradient Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60"
              />

              {/* Status Badge floating tag */}
              <div className="absolute bottom-3 start-3 z-20 px-3.5 py-1.5 bg-background/90 backdrop-blur-md border border-border rounded-full flex items-center gap-2 shadow-xs">
                <span className="size-2 rounded-full bg-status-success animate-pulse" />
                <span className="font-mono text-[11px] text-foreground font-medium tracking-wide">
                  {t("status_badge")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePageHero;
