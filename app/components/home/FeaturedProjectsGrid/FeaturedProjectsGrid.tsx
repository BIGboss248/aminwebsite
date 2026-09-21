import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Layers } from "lucide-react";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";
import { ProjectCard } from "./ProjectCard";
import type {
  FeaturedProjectsGridProps,
  ProjectItem,
} from "./FeaturedProjectsGrid.types";

/**
 * Featured Engineering Case Studies Spec Grid Section.
 *
 * Displays a 3-column modular dossier matrix on the home page highlighting
 * key delivered systems: Enterprise Corporate Website, High-Throughput E-Commerce Platform,
 * and Cross-Platform Note-Taking Application.
 *
 * @param props - Configuration properties for FeaturedProjectsGrid.
 * @returns A React Component rendering the Featured Case Studies Section.
 */
export function FeaturedProjectsGrid({
  locale = "en",
  eyebrow,
  title,
  description,
  projects,
  viewAllHref = ROUTES.projects.root,
  className = "",
  ...rest
}: FeaturedProjectsGridProps): React.JSX.Element {
  let tProj: (key: string) => string;
  try {
    const t = useTranslations("home.featured_projects");
    tProj = (key: string) => t(key as never);
  } catch {
    const dict =
      locale === "fa"
        ? faMessages.home.featured_projects
        : enMessages.home.featured_projects;
    tProj = (key: string) => (dict as Record<string, string>)[key] ?? key;
  }

  const resolvedEyebrow = eyebrow ?? tProj("eyebrow");
  const resolvedTitle = title ?? tProj("title");
  const resolvedDescription = description ?? tProj("description");
  const resolvedViewAll = tProj("view_all");
  const resolvedViewSpec = tProj("view_spec");
  const isRtl = locale === "fa";

  // Build default 3 case studies from dictionary
  const defaultProjects: ProjectItem[] = [
    {
      id: "corporate-platform",
      tag: tProj("case1_tag"),
      title: tProj("case1_title"),
      role: tProj("case1_role"),
      summary: tProj("case1_summary"),
      techStack: [
        tProj("case1_tech1"),
        tProj("case1_tech2"),
        tProj("case1_tech3"),
        tProj("case1_tech4"),
      ],
      href: ROUTES.projects.detail("corporate-platform"),
      frameType: "browser",
      actionLabel: resolvedViewSpec,
    },
    {
      id: "ecommerce-platform",
      tag: tProj("case2_tag"),
      title: tProj("case2_title"),
      role: tProj("case2_role"),
      summary: tProj("case2_summary"),
      techStack: [
        tProj("case2_tech1"),
        tProj("case2_tech2"),
        tProj("case2_tech3"),
        tProj("case2_tech4"),
      ],
      href: ROUTES.projects.detail("ecommerce-platform"),
      frameType: "browser",
      actionLabel: resolvedViewSpec,
    },
    {
      id: "flutter-notes-app",
      tag: tProj("case3_tag"),
      title: tProj("case3_title"),
      role: tProj("case3_role"),
      summary: tProj("case3_summary"),
      techStack: [
        tProj("case3_tech1"),
        tProj("case3_tech2"),
        tProj("case3_tech3"),
        tProj("case3_tech4"),
      ],
      href: ROUTES.projects.detail("flutter-notes-app"),
      frameType: "mobile",
      actionLabel: resolvedViewSpec,
    },
  ];

  const resolvedProjects = projects ?? defaultProjects;

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
              {resolvedEyebrow}
            </p>
            <h2
              id="featured-projects-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
            >
              {resolvedTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Desktop "Explore All Case Studies" Button */}
          <div className="hidden md:flex shrink-0">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-muted hover:border-cyan-500/40 text-foreground transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span>{resolvedViewAll}</span>
              <ArrowRight
                className={cn(
                  "size-4 text-cyan-600 dark:text-cyan-400 transition-transform",
                  isRtl && "rotate-180",
                )}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* 3-Column Responsive Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {resolvedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
            />
          ))}
        </div>

        {/* Mobile "Explore All Case Studies" Full-Width Link */}
        <div className="mt-8 flex md:hidden">
          <Link
            href={viewAllHref}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all"
          >
            <span>{resolvedViewAll}</span>
            <ArrowRight
              className={cn(
                "size-4 text-cyan-600 dark:text-cyan-400",
                isRtl && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjectsGrid;

