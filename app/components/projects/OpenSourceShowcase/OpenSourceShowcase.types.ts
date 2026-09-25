import type { RepoItem } from "../GithubRepoCard/GithubRepoCard.types";

export interface OpenSourceShowcaseProps {
  repos?: RepoItem[];
  locale?: "en" | "fa";
  className?: string;
}
