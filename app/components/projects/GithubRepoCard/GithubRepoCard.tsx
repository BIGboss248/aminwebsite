import React from "react";
import { useTranslations } from "next-intl";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubRepoCardProps } from "./GithubRepoCard.types";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178c6]",
  JavaScript: "bg-[#f7df1e]",
  Python: "bg-[#3572A5]",
  Rust: "bg-[#dea584]",
  Go: "bg-[#00ADD8]",
  Shell: "bg-[#89e051]",
};

/**
 * GithubRepoCard Component
 *
 * Renders an open-source repository card with language tags and direct links.
 */
export function GithubRepoCard({
  repo,
  className = "",
}: GithubRepoCardProps): React.JSX.Element {
  const t = useTranslations("projects.open_source");
  const langColor = LANG_COLORS[repo.lang] || "bg-primary";

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
    >
      <div>
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <FolderGit2 className="size-4 text-primary" aria-hidden="true" />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {repo.name}
            </span>
          </div>

          <span className="text-xs font-mono text-muted-foreground">
            {repo.stars}
          </span>
        </div>

        {/* Tag badge */}
        <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2.5">
          {repo.tag}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
          {repo.desc}
        </p>
      </div>

      {/* Footer info: Language dot & External link */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", langColor)} />
          <span>{repo.lang}</span>
        </div>

        <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline">
          <span>{t("repo_link")}</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export default GithubRepoCard;
