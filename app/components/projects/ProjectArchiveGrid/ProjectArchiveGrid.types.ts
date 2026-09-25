import type { ProjectCategory } from "../ProjectFilterTabs/ProjectFilterTabs.types";
import type { CaseStudyItem } from "../CaseStudyCard/CaseStudyCard.types";

export interface ProjectArchiveGridProps {
  initialCategory?: ProjectCategory;
  caseStudies?: CaseStudyItem[];
  locale?: "en" | "fa";
  className?: string;
}
