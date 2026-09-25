import type { HTMLAttributes } from "react";
import type { LabToolItem, ToolCategory } from "../LabToolCard/LabToolCard.types";

export type FilterOption = "all" | ToolCategory;

export interface LabToolGridProps extends HTMLAttributes<HTMLElement> {
  locale?: "en" | "fa";
  eyebrow?: string;
  title?: string;
  description?: string;
  tools?: LabToolItem[];
}
