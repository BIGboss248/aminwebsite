export interface RepoItem {
  name: string;
  desc: string;
  lang: string;
  stars: string;
  tag: string;
  url: string;
}

export interface GithubRepoCardProps {
  repo: RepoItem;
  className?: string;
}
