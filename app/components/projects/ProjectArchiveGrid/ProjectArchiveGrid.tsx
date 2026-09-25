"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { FilterX } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ProjectFilterTabs } from "../ProjectFilterTabs/ProjectFilterTabs";
import type { ProjectCategory } from "../ProjectFilterTabs/ProjectFilterTabs.types";
import { ProjectSearchBar } from "../ProjectSearchBar/ProjectSearchBar";
import { CaseStudyCard } from "../CaseStudyCard/CaseStudyCard";
import type { CaseStudyItem } from "../CaseStudyCard/CaseStudyCard.types";
import type { ProjectArchiveGridProps } from "./ProjectArchiveGrid.types";

/**
 * ProjectArchiveGrid Component
 *
 * Interactive case studies showcase section with category filter tabs and real-time search.
 */
export function ProjectArchiveGrid({
  initialCategory = "all",
  caseStudies,
  locale = "en",
  className = "",
}: ProjectArchiveGridProps): React.JSX.Element {
  const tFilter = useTranslations("projects.filter");
  const tCase = useTranslations("projects.case_studies");

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Build default 5 case studies from translations if not passed via props
  const allCaseStudies: CaseStudyItem[] = useMemo(() => {
    if (caseStudies && caseStudies.length > 0) {
      return caseStudies;
    }

    return [
      {
        id: "setayesh-parts",
        category: "fullstack",
        tag: tCase("setayesh_parts.tag"),
        status: tCase("setayesh_parts.status"),
        title: tCase("setayesh_parts.title"),
        role: tCase("setayesh_parts.role"),
        client: tCase("setayesh_parts.client"),
        summary: tCase("setayesh_parts.summary"),
        metrics: [
          {
            value: tCase("setayesh_parts.metric1_val"),
            label: tCase("setayesh_parts.metric1_lbl"),
          },
          {
            value: tCase("setayesh_parts.metric2_val"),
            label: tCase("setayesh_parts.metric2_lbl"),
          },
          {
            value: tCase("setayesh_parts.metric3_val"),
            label: tCase("setayesh_parts.metric3_lbl"),
          },
        ],
        techStack: [
          tCase("setayesh_parts.tech1"),
          tCase("setayesh_parts.tech2"),
          tCase("setayesh_parts.tech3"),
          tCase("setayesh_parts.tech4"),
          tCase("setayesh_parts.tech5"),
        ],
        href: ROUTES.projects.detail("setayesh-parts"),
        liveUrl: "https://setayeshparts.com",
      },
      {
        id: "bahar-trade-web",
        category: "fullstack",
        tag: tCase("bahar_trade_web.tag"),
        status: tCase("bahar_trade_web.status"),
        title: tCase("bahar_trade_web.title"),
        role: tCase("bahar_trade_web.role"),
        client: tCase("bahar_trade_web.client"),
        summary: tCase("bahar_trade_web.summary"),
        metrics: [
          {
            value: tCase("bahar_trade_web.metric1_val"),
            label: tCase("bahar_trade_web.metric1_lbl"),
          },
          {
            value: tCase("bahar_trade_web.metric2_val"),
            label: tCase("bahar_trade_web.metric2_lbl"),
          },
          {
            value: tCase("bahar_trade_web.metric3_val"),
            label: tCase("bahar_trade_web.metric3_lbl"),
          },
        ],
        techStack: [
          tCase("bahar_trade_web.tech1"),
          tCase("bahar_trade_web.tech2"),
          tCase("bahar_trade_web.tech3"),
          tCase("bahar_trade_web.tech4"),
          tCase("bahar_trade_web.tech5"),
        ],
        href: ROUTES.projects.detail("bahar-trade-web"),
        liveUrl: "https://bahartrade.com",
      },
      {
        id: "parsbert-ime-forecasting",
        category: "ai_finance",
        tag: tCase("parsbert_ime_forecasting.tag"),
        status: tCase("parsbert_ime_forecasting.status"),
        title: tCase("parsbert_ime_forecasting.title"),
        role: tCase("parsbert_ime_forecasting.role"),
        client: tCase("parsbert_ime_forecasting.client"),
        summary: tCase("parsbert_ime_forecasting.summary"),
        metrics: [
          {
            value: tCase("parsbert_ime_forecasting.metric1_val"),
            label: tCase("parsbert_ime_forecasting.metric1_lbl"),
          },
          {
            value: tCase("parsbert_ime_forecasting.metric2_val"),
            label: tCase("parsbert_ime_forecasting.metric2_lbl"),
          },
          {
            value: tCase("parsbert_ime_forecasting.metric3_val"),
            label: tCase("parsbert_ime_forecasting.metric3_lbl"),
          },
        ],
        techStack: [
          tCase("parsbert_ime_forecasting.tech1"),
          tCase("parsbert_ime_forecasting.tech2"),
          tCase("parsbert_ime_forecasting.tech3"),
          tCase("parsbert_ime_forecasting.tech4"),
          tCase("parsbert_ime_forecasting.tech5"),
        ],
        href: ROUTES.projects.detail("parsbert-ime-forecasting"),
        doi: "10.61838/jafci.485",
      },
      {
        id: "dqn-commodity-forex-analysis",
        category: "ai_finance",
        tag: tCase("dqn_commodity_forex_analysis.tag"),
        status: tCase("dqn_commodity_forex_analysis.status"),
        title: tCase("dqn_commodity_forex_analysis.title"),
        role: tCase("dqn_commodity_forex_analysis.role"),
        client: tCase("dqn_commodity_forex_analysis.client"),
        summary: tCase("dqn_commodity_forex_analysis.summary"),
        metrics: [
          {
            value: tCase("dqn_commodity_forex_analysis.metric1_val"),
            label: tCase("dqn_commodity_forex_analysis.metric1_lbl"),
          },
          {
            value: tCase("dqn_commodity_forex_analysis.metric2_val"),
            label: tCase("dqn_commodity_forex_analysis.metric2_lbl"),
          },
          {
            value: tCase("dqn_commodity_forex_analysis.metric3_val"),
            label: tCase("dqn_commodity_forex_analysis.metric3_lbl"),
          },
        ],
        techStack: [
          tCase("dqn_commodity_forex_analysis.tech1"),
          tCase("dqn_commodity_forex_analysis.tech2"),
          tCase("dqn_commodity_forex_analysis.tech3"),
          tCase("dqn_commodity_forex_analysis.tech4"),
          tCase("dqn_commodity_forex_analysis.tech5"),
        ],
        href: ROUTES.projects.detail("dqn-commodity-forex-analysis"),
        doi: "10.61838/bmfopen.545",
      },
      {
        id: "bahar-trade-it-automation",
        category: "systems",
        tag: tCase("bahar_trade_it_automation.tag"),
        status: tCase("bahar_trade_it_automation.status"),
        title: tCase("bahar_trade_it_automation.title"),
        role: tCase("bahar_trade_it_automation.role"),
        client: tCase("bahar_trade_it_automation.client"),
        summary: tCase("bahar_trade_it_automation.summary"),
        metrics: [
          {
            value: tCase("bahar_trade_it_automation.metric1_val"),
            label: tCase("bahar_trade_it_automation.metric1_lbl"),
          },
          {
            value: tCase("bahar_trade_it_automation.metric2_val"),
            label: tCase("bahar_trade_it_automation.metric2_lbl"),
          },
          {
            value: tCase("bahar_trade_it_automation.metric3_val"),
            label: tCase("bahar_trade_it_automation.metric3_lbl"),
          },
        ],
        techStack: [
          tCase("bahar_trade_it_automation.tech1"),
          tCase("bahar_trade_it_automation.tech2"),
          tCase("bahar_trade_it_automation.tech3"),
          tCase("bahar_trade_it_automation.tech4"),
          tCase("bahar_trade_it_automation.tech5"),
        ],
        href: ROUTES.projects.detail("bahar-trade-it-automation"),
        doi: "10.61838/msesj.477",
      },
    ];
  }, [tCase, caseStudies]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      all: allCaseStudies.length,
      fullstack: 0,
      systems: 0,
      ai_finance: 0,
      research: 0,
    };

    allCaseStudies.forEach((cs) => {
      if (cs.category === "fullstack") counts.fullstack++;
      if (cs.category === "systems") counts.systems++;
      if (cs.category === "ai_finance") counts.ai_finance++;
      if (cs.doi) counts.research++;
    });

    return counts;
  }, [allCaseStudies]);

  // Filter case studies by active category and search query
  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter((cs) => {
      // Category check
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "research" ? Boolean(cs.doi) : cs.category === activeCategory);

      if (!matchesCategory) return false;

      // Query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        cs.title.toLowerCase().includes(q) ||
        cs.summary.toLowerCase().includes(q) ||
        cs.role.toLowerCase().includes(q) ||
        cs.client.toLowerCase().includes(q) ||
        cs.tag.toLowerCase().includes(q) ||
        cs.techStack.some((tech) => tech.toLowerCase().includes(q))
      );
    });
  }, [allCaseStudies, activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      id="projects-archive-grid"
      aria-label={tCase("loading")}
      className={cn(
        "py-12 sm:py-16 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Controls: Filter Tabs + Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          <ProjectFilterTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />

          <div className="w-full md:w-80 lg:w-96">
            <ProjectSearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={filteredCaseStudies.length}
            />
          </div>
        </div>

        {/* Case Studies Grid or Empty State */}
        {filteredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border bg-card/50">
            <div className="p-3 rounded-full bg-muted text-muted-foreground mb-4">
              <FilterX className="size-6" aria-hidden="true" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">
              {tFilter("no_results_title")}
            </h4>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              {tFilter("no_results_desc")}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{tFilter("reset_filter")}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectArchiveGrid;
