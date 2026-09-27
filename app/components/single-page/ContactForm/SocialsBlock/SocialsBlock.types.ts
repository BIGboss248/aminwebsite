export interface SocialsBlockProps {
  className?: string;
  locale?: "en" | "fa";
}

export interface SocialProfileItem {
  id: "linkedin" | "github" | "orcid";
  name: string;
  handle: string;
  desc: string;
  href: string;
  iconType: "linkedin" | "github" | "orcid";
  highlightColor?: string;
}
