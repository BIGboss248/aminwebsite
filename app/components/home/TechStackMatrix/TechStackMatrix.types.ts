import type { LucideIcon } from "lucide-react";

/**
 * Architectural domain identifier for classifying technical competencies.
 */
export type DomainCategory = "frontend" | "systems" | "devops" | "security";

/**
 * Individual skill competency data model.
 */
export interface SkillItem {
  /** Unique key identifier for the technology */
  id: string;
  /** Display name translation key or string */
  nameKey: string;
  /** Short competency tag or specialisation translation key */
  tagKey: string;
  /** Production experience metric translation key */
  expKey: string;
  /** Core architectural use case description translation key */
  usecaseKey: string;
  /** Lucide icon identifier key */
  iconName: string;
  /** Optional direct Lucide icon component */
  icon?: LucideIcon;
  /** Domain category */
  domain: DomainCategory;
}

/**
 * Architectural domain section containing multiple grouped skill competencies.
 */
export interface TechDomain {
  /** Domain identifier */
  id: DomainCategory;
  /** Domain heading translation key */
  titleKey: string;
  /** Domain summary / capability highlight translation key */
  summaryKey: string;
  /** Domain badge count translation key */
  badgeCountKey: string;
  /** Domain geometric accent icon */
  icon: LucideIcon;
  /** Domain accent color key: cyan, violet, emerald, amber */
  accentColor: "cyan" | "violet" | "emerald" | "amber";
  /** List of grouped skill items within this domain */
  skills: SkillItem[];
}

/**
 * Props for the interactive SkillBadge client leaf component.
 */
export interface SkillBadgeProps {
  /** Skill competency data item */
  skill: SkillItem;
  /** Domain accent theme */
  accentColor: "cyan" | "violet" | "emerald" | "amber";
  /** Optional custom CSS class overrides */
  className?: string;
}

/**
 * Props for the root TechStackMatrix Server Component.
 */
export interface TechStackMatrixProps {
  /** Active user locale for next-intl server translation resolution */
  locale: "en" | "fa";
  /** Optional custom CSS class overrides */
  className?: string;
}

