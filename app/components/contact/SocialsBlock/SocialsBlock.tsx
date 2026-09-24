import React from "react";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SocialsBlockProps } from "./SocialsBlock.types";

export async function SocialsBlock({
  locale = "en",
  className = "",
}: SocialsBlockProps): Promise<React.JSX.Element> {
  const t = await getTranslations({ locale, namespace: "contact.socials" });

  const socialLinks = [
    {
      id: "linkedin",
      name: t("linkedin_name"),
      handle: t("linkedin_handle"),
      description: t("linkedin_desc"),
      href: SITE_CONFIG.social.linkedin,
      icon: (
        <svg
          className="size-6"
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
      accentBorder: "hover:border-blue-500/50 hover:bg-blue-500/5 dark:hover:bg-blue-500/10",
      accentBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      id: "github",
      name: t("github_name"),
      handle: t("github_handle"),
      description: t("github_desc"),
      href: SITE_CONFIG.social.github,
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      accentBorder: "hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10",
      accentBadge: "bg-primary/10 text-primary border-primary/20",
    },
    {
      id: "orcid",
      name: t("orcid_name"),
      handle: t("orcid_handle"),
      description: t("orcid_desc"),
      href: SITE_CONFIG.social.orcid,
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.966-1.572 3.966-3.722 0-2.016-1.509-3.722-3.891-3.722h-2.372z" />
        </svg>
      ),
      accentBorder: "hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10",
      accentBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8 text-card-foreground shadow-sm flex flex-col justify-between transition-colors",
        className,
      )}
    >
      <div>
        <div className="mb-6">
          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-1">
            {t("eyebrow")}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="space-y-3.5">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-start gap-4 p-4 rounded-xl border border-border bg-background/50 hover:bg-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs",
                social.accentBorder,
              )}
            >
              <div className="shrink-0 p-2.5 rounded-lg bg-card border border-border/80 text-foreground group-hover:text-primary transition-colors">
                {social.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                    {social.name}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px] px-2 py-0.5 rounded-md border font-medium shrink-0",
                      social.accentBadge,
                    )}
                    dir="ltr"
                  >
                    {social.handle}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {social.description}
                </p>
              </div>

              <div className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors self-center">
                <svg
                  className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
                <span className="sr-only">{t("external_link")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocialsBlock;
