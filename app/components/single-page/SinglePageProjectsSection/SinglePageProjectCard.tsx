import React from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, FileText, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SinglePageProjectCardProps } from "./SinglePageProjectsSection.types";

/**
 * SinglePageProjectCard Component.
 *
 * High-density modular project card rendering engineering deliverables and published research papers with
 * tech stack tags, verified DOI links, GitHub repositories, and live production URLs.
 */
export function SinglePageProjectCard({
  project,
  className = "",
}: SinglePageProjectCardProps): React.JSX.Element {
  const t = useTranslations("single_page.projects");

  const isResearch = project.category === "research";

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary",
        className,
      )}
    >
      <div>
        {/* Card Header Row with flex-wrap according to Rule 32 */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="font-mono text-xs text-primary font-semibold tracking-wider">
            {project.tag}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border",
              isResearch
                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                : "bg-primary/10 text-primary border-primary/20",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isResearch ? "bg-purple-500" : "bg-primary",
              )}
            />
            <span>{project.status}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-hidden inline-flex items-center gap-1.5"
            >
              <span>{project.title}</span>
              <ExternalLink className="size-4 opacity-70" aria-hidden="true" />
            </a>
          ) : (
            <span>{project.title}</span>
          )}
        </h3>

        {/* Role & Client / Venue Context */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground mb-4 font-mono">
          <span className="text-foreground/90 font-medium">{project.role}</span>
          <span className="text-border hidden sm:inline">•</span>
          <span className="text-primary/90">{project.clientOrVenue}</span>
        </div>

        {/* Summary Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Architecture & Tech Stack Badges */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              {t("tech_label")}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation & External Links */}
      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-end gap-3">
        {project.doi && (
          <a
            href={`https://doi.org/${project.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            title={t("doi_label")}
          >
            <FileText className="size-3.5" aria-hidden="true" />
            <span>DOI: {project.doi}</span>
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-card text-foreground hover:bg-muted border border-border/80 transition-colors"
            title={t("github_label")}
          >
            <FolderGit2 className="size-3.5 text-primary" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            title={t("live_label")}
          >
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span>{t("live_label")}</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default SinglePageProjectCard;

