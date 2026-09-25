import type { ProjectCategory } from "../ProjectFilterTabs/ProjectFilterTabs.types";

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyItem {
  id: string;
  category: ProjectCategory;
  tag: string;
  status: string;
  title: string;
  role: string;
  client: string;
  summary: string;
  metrics: CaseStudyMetric[];
  techStack: string[];
  href: string;
  doi?: string;
  liveUrl?: string;
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
  locale?: "en" | "fa";
  className?: string;
}
