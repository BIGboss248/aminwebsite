"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";

/**
 * Localized 404 Not Found View
 *
 * Rendered when a route segment within the active locale is unresolved.
 * Provides intuitive return actions and jump anchors to single-page sections.
 */
export default function NotFound(): React.JSX.Element {
  const t = useTranslations("not_found");

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[70vh] px-4 py-16 text-center">
      <div className="max-w-lg w-full p-8 sm:p-10 rounded-2xl border border-border bg-card text-card-foreground shadow-lg backdrop-blur-sm">
        {/* Visual Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <span className="font-mono text-xl font-extrabold tracking-wider">404</span>
        </div>

        {/* Eyebrow & Title */}
        <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
          {t("eyebrow")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-3">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
          {t("description")}
        </p>

        {/* Primary Action */}
        <div className="mb-6">
          <Link
            href={ROUTES.home}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{t("return_home")}</span>
          </Link>
        </div>

        {/* Single Page Section Shortcuts */}
        <div className="pt-6 border-t border-border/60">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href={`${ROUTES.home}#hero`}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("section_hero")}
            </Link>
            <Link
              href={`${ROUTES.home}#projects`}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("section_projects")}
            </Link>
            <Link
              href={`${ROUTES.home}#certifications`}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("section_certifications")}
            </Link>
            <Link
              href={`${ROUTES.home}#contact`}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("section_contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
