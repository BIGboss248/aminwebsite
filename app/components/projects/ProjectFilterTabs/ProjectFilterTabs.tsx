"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type {
  ProjectCategory,
  ProjectFilterTabsProps,
} from "./ProjectFilterTabs.types";

const CATEGORIES: ProjectCategory[] = [
  "all",
  "fullstack",
  "systems",
  "ai_finance",
  "research",
];

/**
 * ProjectFilterTabs Component
 *
 * Interactive category tabs with keyboard navigation and count badges.
 */
export function ProjectFilterTabs({
  activeCategory,
  onSelectCategory,
  counts,
  className = "",
}: ProjectFilterTabsProps): React.JSX.Element {
  const t = useTranslations("projects.filter");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextCategory = CATEGORIES[nextIndex];
    if (nextCategory) {
      onSelectCategory(nextCategory);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={t("search_aria_label")}
      className={cn(
        "flex flex-wrap items-center gap-2 select-none",
        className,
      )}
    >
      {CATEGORIES.map((category, index) => {
        const isActive = activeCategory === category;
        const count = counts?.[category];

        return (
          <button
            key={category}
            role="tab"
            type="button"
            id={`tab-${category}`}
            aria-selected={isActive}
            aria-controls={`panel-${category}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectCategory(category)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary border",
              isActive
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-primary/40",
            )}
          >
            <span>{t(category)}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "font-mono text-[11px] px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ProjectFilterTabs;
