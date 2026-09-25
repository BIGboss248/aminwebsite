import React from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { GithubRepoCard } from "../GithubRepoCard/GithubRepoCard";
import type { RepoItem } from "../GithubRepoCard/GithubRepoCard.types";
import type { OpenSourceShowcaseProps } from "./OpenSourceShowcase.types";

/**
 * OpenSourceShowcase Component
 *
 * Highlights public GitHub repositories, open-source diagnostic utilities, and tooling.
 */
export function OpenSourceShowcase({
  repos,
  className = "",
}: OpenSourceShowcaseProps): React.JSX.Element {
  const t = useTranslations("projects.open_source");

  const defaultRepos: RepoItem[] = [
    {
      name: t("repo1.name"),
      desc: t("repo1.desc"),
      lang: t("repo1.lang"),
      stars: t("repo1.stars"),
      tag: t("repo1.tag"),
      url: "https://github.com/BIGboss248/aminwebsite",
    },
    {
      name: t("repo2.name"),
      desc: t("repo2.desc"),
      lang: t("repo2.lang"),
      stars: t("repo2.stars"),
      tag: t("repo2.tag"),
      url: "https://github.com/BIGboss248/dns-over-https-tester",
    },
    {
      name: t("repo3.name"),
      desc: t("repo3.desc"),
      lang: t("repo3.lang"),
      stars: t("repo3.stars"),
      tag: t("repo3.tag"),
      url: "https://github.com/BIGboss248/webrtc-leak-detector",
    },
    {
      name: t("repo4.name"),
      desc: t("repo4.desc"),
      lang: t("repo4.lang"),
      stars: t("repo4.stars"),
      tag: t("repo4.tag"),
      url: "https://github.com/BIGboss248/parsbert-ime-sentiment",
    },
  ];

  const resolvedRepos = repos ?? defaultRepos;

  return (
    <section
      aria-labelledby="open-source-showcase-heading"
      className={cn(
        "py-16 sm:py-20 lg:py-24 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-3">
              {t("eyebrow")}
            </p>
            <h2
              id="open-source-showcase-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("title")}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary shadow-xs shrink-0"
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
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>{t("github_cta")}</span>
            <ArrowUpRight
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {resolvedRepos.map((repo) => (
            <GithubRepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OpenSourceShowcase;
