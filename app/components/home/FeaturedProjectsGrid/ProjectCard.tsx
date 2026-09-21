import React from "react";
import { ArrowUpRight, ArrowRight, Smartphone, Globe } from "lucide-react";
import { Link } from "@/app/components/Link";
import { cn } from "@/lib/utils";
import type { ProjectCardProps } from "./FeaturedProjectsGrid.types";

/**
 * Individual Project Dossier Card Component.
 *
 * Renders a single project case study in a high-density, typography-forward
 * engineering spec layout with 16:10 preview frame, tech stack chips, and
 * animated interactive states.
 *
 * @param props - Properties for the ProjectCard.
 * @returns A JSX element representing the project dossier card.
 */
export function ProjectCard({
  project,
  locale = "en",
  className = "",
  ...rest
}: ProjectCardProps): React.JSX.Element {
  const {
    id,
    tag,
    title,
    role,
    summary,
    techStack,
    href,
    frameType = "browser",
    actionLabel = "View Case Study",
  } = project;

  const isRtl = locale === "fa";

  return (
    <article
      aria-labelledby={`project-title-${id}`}
      aria-describedby={`project-summary-${id}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all duration-300",
        "hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_24px_-4px_rgba(6,182,212,0.18)]",
        className,
      )}
      {...rest}
    >
      <div>
        {/* Spec Header: Index Tag & Status Indicator */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3.5 mb-5">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-medium text-cyan-600 dark:text-cyan-400 tracking-wider">
            <span
              className="size-2 rounded-full bg-cyan-500 animate-pulse"
              aria-hidden="true"
            />
            <span>{tag}</span>
          </div>
          {frameType === "mobile" ? (
            <Smartphone
              className="size-4 text-muted-foreground group-hover:text-cyan-500 transition-colors"
              aria-hidden="true"
            />
          ) : (
            <Globe
              className="size-4 text-muted-foreground group-hover:text-cyan-500 transition-colors"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Project Title & Engineering Role */}
        <div className="mb-3">
          <h3
            id={`project-title-${id}`}
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
            {role}
          </p>
        </div>

        {/* Architecture Summary */}
        <p
          id={`project-summary-${id}`}
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5"
        >
          {summary}
        </p>

        {/* Categorized Tech Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-muted text-foreground/90 border border-border/80"
              dir="ltr"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 16:10 Micro-Preview Viewport Frame */}
        <div className="relative aspect-[16/10] w-full rounded-lg border border-border/80 bg-background/80 overflow-hidden mb-6 flex flex-col transition-colors group-hover:border-cyan-500/30">
          {/* Frame Chrome Header */}
          <div className="h-6 w-full border-b border-border/60 bg-muted/50 px-3 flex items-center justify-between select-none">
            {frameType === "mobile" ? (
              <div className="flex items-center gap-1.5 mx-auto">
                <div className="size-1.5 rounded-full bg-border" />
                <div className="w-8 h-1 rounded-full bg-border" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-border" />
                <div className="size-2 rounded-full bg-border" />
                <div className="size-2 rounded-full bg-border" />
              </div>
            )}
            <span className="text-[10px] font-mono text-muted-foreground/70 truncate max-w-[120px]" dir="ltr">
              {id}.sys
            </span>
          </div>

          {/* Frame Inner Mockup Canvas */}
          <div className="flex-1 p-3 flex flex-col justify-center items-center text-center bg-gradient-to-b from-card/40 to-background">
            <div className="p-2.5 rounded-full border border-border/60 bg-muted/40 mb-2 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5 transition-colors">
              {frameType === "mobile" ? (
                <Smartphone className="size-5 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <Globe className="size-5 text-cyan-600 dark:text-cyan-400" />
              )}
            </div>
            <span className="text-[11px] font-mono text-muted-foreground font-medium">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Case Study Link */}
      <div className="pt-2 border-t border-border/40">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
        >
          <span>{actionLabel}</span>
          <ArrowRight
            className={cn(
              "size-4 transition-transform duration-200 group-hover:translate-x-1",
              isRtl && "rotate-180 group-hover:-translate-x-1",
            )}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;

