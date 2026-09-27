"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, BookOpen, Layers } from "lucide-react";
import { SinglePageProjectCard } from "./SinglePageProjectCard";
import { cn } from "@/lib/utils";
import type {
  SinglePageProjectsSectionProps,
  ProjectCategory,
  SinglePageProjectItem,
} from "./SinglePageProjectsSection.types";

/**
 * SinglePageProjectsSection Component.
 *
 * Responsive, interactive projects grid container highlighting authentic engineering systems
 * and peer-reviewed ORCID research publications (with verified DOIs).
 */
export function SinglePageProjectsSection({
  locale = "en",
  className = "",
  initialCategory = "all",
}: SinglePageProjectsSectionProps): React.JSX.Element {
  const t = useTranslations("single_page.projects");
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>(initialCategory);

  // Construct typed project items from dictionary keys
  const projects: SinglePageProjectItem[] = useMemo(() => {
    return [
      {
        id: "setayesh_parts",
        category: "production",
        tag: t("items.setayesh_parts.tag"),
        status: t("items.setayesh_parts.status"),
        title: t("items.setayesh_parts.title"),
        role: t("items.setayesh_parts.role"),
        clientOrVenue: t("items.setayesh_parts.client"),
        summary: t("items.setayesh_parts.summary"),
        metrics: [
          {
            value: t("items.setayesh_parts.metric1_val"),
            label: t("items.setayesh_parts.metric1_lbl"),
          },
          {
            value: t("items.setayesh_parts.metric2_val"),
            label: t("items.setayesh_parts.metric2_lbl"),
          },
          {
            value: t("items.setayesh_parts.metric3_val"),
            label: t("items.setayesh_parts.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.setayesh_parts.tech1"),
          t("items.setayesh_parts.tech2"),
          t("items.setayesh_parts.tech3"),
          t("items.setayesh_parts.tech4"),
          t("items.setayesh_parts.tech5"),
        ],
        liveUrl: "https://setayeshparts.com",
        href: "/projects/setayesh-parts",
      },
      {
        id: "bahar_trade_web",
        category: "production",
        tag: t("items.bahar_trade_web.tag"),
        status: t("items.bahar_trade_web.status"),
        title: t("items.bahar_trade_web.title"),
        role: t("items.bahar_trade_web.role"),
        clientOrVenue: t("items.bahar_trade_web.client"),
        summary: t("items.bahar_trade_web.summary"),
        metrics: [
          {
            value: t("items.bahar_trade_web.metric1_val"),
            label: t("items.bahar_trade_web.metric1_lbl"),
          },
          {
            value: t("items.bahar_trade_web.metric2_val"),
            label: t("items.bahar_trade_web.metric2_lbl"),
          },
          {
            value: t("items.bahar_trade_web.metric3_val"),
            label: t("items.bahar_trade_web.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.bahar_trade_web.tech1"),
          t("items.bahar_trade_web.tech2"),
          t("items.bahar_trade_web.tech3"),
          t("items.bahar_trade_web.tech4"),
          t("items.bahar_trade_web.tech5"),
        ],
        liveUrl: "https://bahartrade.com",
        href: "/projects/bahar-trade-web",
      },
      {
        id: "bahar_trade_automation",
        category: "production",
        tag: t("items.bahar_trade_automation.tag"),
        status: t("items.bahar_trade_automation.status"),
        title: t("items.bahar_trade_automation.title"),
        role: t("items.bahar_trade_automation.role"),
        clientOrVenue: t("items.bahar_trade_automation.client"),
        summary: t("items.bahar_trade_automation.summary"),
        metrics: [
          {
            value: t("items.bahar_trade_automation.metric1_val"),
            label: t("items.bahar_trade_automation.metric1_lbl"),
          },
          {
            value: t("items.bahar_trade_automation.metric2_val"),
            label: t("items.bahar_trade_automation.metric2_lbl"),
          },
          {
            value: t("items.bahar_trade_automation.metric3_val"),
            label: t("items.bahar_trade_automation.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.bahar_trade_automation.tech1"),
          t("items.bahar_trade_automation.tech2"),
          t("items.bahar_trade_automation.tech3"),
          t("items.bahar_trade_automation.tech4"),
          t("items.bahar_trade_automation.tech5"),
        ],
        href: "/projects/bahar-trade-it-automation",
      },
      {
        id: "parsbert_ime_forecasting",
        category: "research",
        tag: t("items.parsbert_ime_forecasting.tag"),
        status: t("items.parsbert_ime_forecasting.status"),
        title: t("items.parsbert_ime_forecasting.title"),
        role: t("items.parsbert_ime_forecasting.role"),
        clientOrVenue: t("items.parsbert_ime_forecasting.venue"),
        summary: t("items.parsbert_ime_forecasting.summary"),
        metrics: [
          {
            value: t("items.parsbert_ime_forecasting.metric1_val"),
            label: t("items.parsbert_ime_forecasting.metric1_lbl"),
          },
          {
            value: t("items.parsbert_ime_forecasting.metric2_val"),
            label: t("items.parsbert_ime_forecasting.metric2_lbl"),
          },
          {
            value: t("items.parsbert_ime_forecasting.metric3_val"),
            label: t("items.parsbert_ime_forecasting.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.parsbert_ime_forecasting.tech1"),
          t("items.parsbert_ime_forecasting.tech2"),
          t("items.parsbert_ime_forecasting.tech3"),
          t("items.parsbert_ime_forecasting.tech4"),
          t("items.parsbert_ime_forecasting.tech5"),
        ],
        doi: "10.61838/jafci.485",
        href: "/projects/parsbert-ime-forecasting",
      },
      {
        id: "dqn_commodity_forex_analysis",
        category: "research",
        tag: t("items.dqn_commodity_forex_analysis.tag"),
        status: t("items.dqn_commodity_forex_analysis.status"),
        title: t("items.dqn_commodity_forex_analysis.title"),
        role: t("items.dqn_commodity_forex_analysis.role"),
        clientOrVenue: t("items.dqn_commodity_forex_analysis.venue"),
        summary: t("items.dqn_commodity_forex_analysis.summary"),
        metrics: [
          {
            value: t("items.dqn_commodity_forex_analysis.metric1_val"),
            label: t("items.dqn_commodity_forex_analysis.metric1_lbl"),
          },
          {
            value: t("items.dqn_commodity_forex_analysis.metric2_val"),
            label: t("items.dqn_commodity_forex_analysis.metric2_lbl"),
          },
          {
            value: t("items.dqn_commodity_forex_analysis.metric3_val"),
            label: t("items.dqn_commodity_forex_analysis.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.dqn_commodity_forex_analysis.tech1"),
          t("items.dqn_commodity_forex_analysis.tech2"),
          t("items.dqn_commodity_forex_analysis.tech3"),
          t("items.dqn_commodity_forex_analysis.tech4"),
          t("items.dqn_commodity_forex_analysis.tech5"),
        ],
        doi: "10.61838/bmfopen.545",
        href: "/projects/dqn-commodity-forex-analysis",
      },
      {
        id: "mses_it_automation_optimization",
        category: "research",
        tag: t("items.mses_it_automation_optimization.tag"),
        status: t("items.mses_it_automation_optimization.status"),
        title: t("items.mses_it_automation_optimization.title"),
        role: t("items.mses_it_automation_optimization.role"),
        clientOrVenue: t("items.mses_it_automation_optimization.venue"),
        summary: t("items.mses_it_automation_optimization.summary"),
        metrics: [
          {
            value: t("items.mses_it_automation_optimization.metric1_val"),
            label: t("items.mses_it_automation_optimization.metric1_lbl"),
          },
          {
            value: t("items.mses_it_automation_optimization.metric2_val"),
            label: t("items.mses_it_automation_optimization.metric2_lbl"),
          },
          {
            value: t("items.mses_it_automation_optimization.metric3_val"),
            label: t("items.mses_it_automation_optimization.metric3_lbl"),
          },
        ],
        techStack: [
          t("items.mses_it_automation_optimization.tech1"),
          t("items.mses_it_automation_optimization.tech2"),
          t("items.mses_it_automation_optimization.tech3"),
          t("items.mses_it_automation_optimization.tech4"),
          t("items.mses_it_automation_optimization.tech5"),
        ],
        doi: "10.61838/msesj.477",
        href: "https://doi.org/10.61838/msesj.477",
      },
    ];
  }, [t]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section
      id="projects"
      aria-labelledby="single-page-projects-heading"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
            {t("eyebrow")}
          </span>
          <h2
            id="single-page-projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Category Tabs Filter Controls */}
        <div
          role="tablist"
          aria-label={t("title")}
          className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/40"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
            )}
          >
            <Layers className="size-4" aria-hidden="true" />
            <span>{t("tab_all")}</span>
            <span
              className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                activeCategory === "all"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "production"}
            onClick={() => setActiveCategory("production")}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
              activeCategory === "production"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
            )}
          >
            <Sparkles className="size-4" aria-hidden="true" />
            <span>{t("tab_production")}</span>
            <span
              className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                activeCategory === "production"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {projects.filter((p) => p.category === "production").length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "research"}
            onClick={() => setActiveCategory("research")}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
              activeCategory === "research"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
            )}
          >
            <BookOpen className="size-4" aria-hidden="true" />
            <span>{t("tab_research")}</span>
            <span
              className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                activeCategory === "research"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {projects.filter((p) => p.category === "research").length}
            </span>
          </button>
        </div>

        {/* Primary Projects & Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SinglePageProjectCard
              key={project.id}
              project={project}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SinglePageProjectsSection;
