export type ProjectCategory = "all" | "production" | "research";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface SinglePageProjectItem {
  id: string;
  category: "production" | "research";
  tag: string;
  status: string;
  title: string;
  role: string;
  clientOrVenue: string;
  summary: string;
  metrics: ProjectMetric[];
  techStack: string[];
  doi?: string;
  liveUrl?: string;
  githubUrl?: string;
  href?: string;
}

export interface SinglePageProjectsSectionProps {
  /** Current active locale */
  locale?: "en" | "fa";
  /** Optional custom CSS class */
  className?: string;
  /** Optional initial selected category tab */
  initialCategory?: ProjectCategory;
}

export interface SinglePageProjectCardProps {
  /** Project item data */
  project: SinglePageProjectItem;
  /** Current active locale */
  locale?: "en" | "fa";
  /** Optional custom CSS class */
  className?: string;
}

export interface SinglePageProjectsSkeletonProps {
  /** Optional custom CSS class */
  className?: string;
}
