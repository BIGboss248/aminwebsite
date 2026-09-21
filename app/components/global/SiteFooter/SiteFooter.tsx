"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/components/Link";
import { ContactActionBanner } from "./ContactActionBanner";
import { SocialLinksBar } from "./SocialLinksBar";
import { ROUTES } from "@/lib/routes";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SiteFooterProps } from "./SiteFooter.types";

/**
 * SiteFooter is the global application footer anchoring all pages.
 * Features an Action-First contact callout, a 4-column structured navigation directory,
 * verified researcher & social links, and an engineering colophon.
 */
export function SiteFooter({
  className,
  currentYear = new Date().getFullYear(),
  contactEmail = SITE_CONFIG.contact.email,
  showActionBanner = true,
  ...props
}: SiteFooterProps): React.JSX.Element {
  const t = useTranslations("footer");

  const navigationColumns = [
    {
      id: "explore",
      title: t("col_explore_title"),
      links: [
        { label: t("link_case_studies"), href: ROUTES.projects.root, isExternal: false },
        { label: t("link_about"), href: ROUTES.about, isExternal: false },
        { label: t("link_architecture"), href: ROUTES.about, isExternal: false },
        { label: t("link_performance"), href: ROUTES.home, isExternal: false },
      ],
    },
    {
      id: "lab",
      title: t("col_lab_title"),
      links: [
        { label: t("link_lab_hub"), href: ROUTES.lab.root, isExternal: false },
        { label: t("link_doh"), href: ROUTES.lab.doh, isExternal: false },
        { label: t("link_ipinfo"), href: ROUTES.lab.ipInfo, isExternal: false },
        { label: t("link_fingerprint"), href: ROUTES.lab.fingerprint, isExternal: false },
      ],
    },
    {
      id: "research",
      title: t("col_research_title"),
      links: [
        { label: t("link_publications"), href: ROUTES.about, isExternal: false },
        { label: t("link_orcid"), href: SITE_CONFIG.social.orcid, isExternal: true },
        { label: t("link_certifications"), href: ROUTES.home, isExternal: false },
        { label: t("link_resume"), href: ROUTES.resume, isExternal: false },
      ],
    },
    {
      id: "platform",
      title: t("col_platform_title"),
      links: [
        { label: t("link_health"), href: ROUTES.api.health, isExternal: true },
        { label: t("link_source"), href: SITE_CONFIG.social.github, isExternal: true },
        { label: t("link_changelog"), href: `${SITE_CONFIG.social.github}/releases`, isExternal: true },
        { label: t("link_rss"), href: "/rss.xml", isExternal: true },
      ],
    },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Global Footer"
      className={cn(
        "w-full border-t border-border bg-background/95 backdrop-blur-sm pt-16 pb-12 transition-colors",
        className,
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Action-First Consultation Banner */}
        {showActionBanner && (
          <ContactActionBanner email={contactEmail} />
        )}

        {/* 4-Column Navigation Matrix */}
        <nav
          aria-label="Footer Navigation Matrix"
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4"
        >
          {navigationColumns.map((col) => (
            <div key={col.id} className="space-y-4">
              <h3 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover:translate-x-0.5 rtl:hover:-translate-x-0.5 duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover:translate-x-0.5 rtl:hover:-translate-x-0.5 duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sub-Footer Colophon & Social Links Dock */}
        <div className="border-t border-border/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 text-center sm:text-start">
            <p className="text-xs text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
            <span className="hidden sm:inline text-xs text-muted-foreground/40">•</span>
            <p className="text-xs text-muted-foreground/80">
              {t("built_with")}
            </p>
          </div>

          <SocialLinksBar />
        </div>
      </div>
    </footer>
  );
}

