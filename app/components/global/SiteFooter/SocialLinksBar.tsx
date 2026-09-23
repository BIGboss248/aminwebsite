"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SocialLinksBarProps } from "./SiteFooter.types";

/**
 * SocialLinksBar renders an interactive bar of verified social, code repository,
 * and academic researcher identity channels.
 */
export function SocialLinksBar({
  className,
  githubUrl = SITE_CONFIG.social.github,
  linkedinUrl = SITE_CONFIG.social.linkedin,
  orcidUrl = SITE_CONFIG.social.orcid,
  twitterUrl = SITE_CONFIG.social.twitter,
  ...props
}: SocialLinksBarProps): React.JSX.Element {
  const t = useTranslations("footer");

  const links = [
    {
      id: "github",
      label: t("social_github"),
      href: githubUrl,
      icon: (
        <svg
          className="w-4 h-4"
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
      href: linkedinUrl,
      icon: (
        <svg
          className="w-4 h-4"
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
      href: orcidUrl,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.434h2.238c2.644 0 3.737-1.744 3.737-3.712 0-2.147-1.34-3.722-3.737-3.722h-2.238z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      label: t("social_twitter"),
      href: twitterUrl,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label={t("social_github")}
      {...props}
    >
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group inline-flex items-center justify-center min-w-11 min-h-11 w-11 h-11 rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="sr-only">{link.label}</span>
          <span className="transition-transform duration-200 group-hover:scale-110">
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
