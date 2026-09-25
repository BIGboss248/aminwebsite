"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectSearchBarProps } from "./ProjectSearchBar.types";

/**
 * ProjectSearchBar Component
 *
 * Real-time filter input for case studies and repositories with clear button.
 */
export function ProjectSearchBar({
  query,
  onQueryChange,
  resultCount,
  className = "",
}: ProjectSearchBarProps): React.JSX.Element {
  const t = useTranslations("projects.filter");

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="project-search-input" className="sr-only">
        {t("search_aria_label")}
      </label>

      <div className="relative flex items-center">
        <div className="absolute start-3.5 pointer-events-none text-muted-foreground">
          <Search className="size-4" aria-hidden="true" />
        </div>

        <input
          id="project-search-input"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full ps-10 pe-10 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary shadow-xs"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label={t("clear_search")}
            className="absolute end-3 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {resultCount !== undefined && (
        <div aria-live="polite" className="sr-only">
          {t("results_count", { count: resultCount })}
        </div>
      )}
    </div>
  );
}

export default ProjectSearchBar;
