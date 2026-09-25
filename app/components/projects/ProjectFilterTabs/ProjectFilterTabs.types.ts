export type ProjectCategory =
  | "all"
  | "fullstack"
  | "systems"
  | "ai_finance"
  | "research";

export interface ProjectFilterTabsProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  counts?: Partial<Record<ProjectCategory, number>>;
  className?: string;
}
