export interface ProjectSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount?: number;
  className?: string;
}
