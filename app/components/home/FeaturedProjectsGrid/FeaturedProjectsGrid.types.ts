import type { ComponentPropsWithoutRef } from "react";

/**
 * Individual Project Dossier Data Structure.
 */
export interface ProjectItem {
  /** Unique project identifier key */
  id: string;
  /** Monospace classification tag (e.g. "CASE_01 // WEB_PLATFORM") */
  tag: string;
  /** Project title */
  title: string;
  /** Delivered engineering role */
  role: string;
  /** Concise architecture summary */
  summary: string;
  /** List of technology tags */
  techStack: string[];
  /** Destination route or external URL */
  href: string;
  /** Visual frame type for the 16:10 micro-preview */
  frameType?: "browser" | "mobile";
  /** Optional image preview path */
  imageSrc?: string;
  /** Localized action link label override */
  actionLabel?: string;
}

/**
 * Properties for the ProjectCard Component.
 */
export interface ProjectCardProps extends ComponentPropsWithoutRef<"article"> {
  /** Project data payload */
  project: ProjectItem;
  /** Active language locale */
  locale?: "en" | "fa";
  /** Additional CSS class names */
  className?: string;
}

/**
 * Properties for the FeaturedProjectsGrid Section.
 */
export interface FeaturedProjectsGridProps
  extends ComponentPropsWithoutRef<"section"> {
  /** Active language locale */
  locale?: "en" | "fa";
  /** Optional section eyebrow text override */
  eyebrow?: string;
  /** Optional main section heading override */
  title?: string;
  /** Optional section description override */
  description?: string;
  /** Optional custom projects array override */
  projects?: ProjectItem[];
  /** Optional "View All" link destination override */
  viewAllHref?: string;
  /** Additional CSS class names */
  className?: string;
}

