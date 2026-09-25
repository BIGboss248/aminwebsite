import React from "react";
import { render, screen } from "@testing-library/react";
import { GithubRepoCard } from "./GithubRepoCard";
import type { RepoItem } from "./GithubRepoCard.types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.projects.open_source as unknown as Record<string, string>)[key] ?? key;
  },
}));

describe("GithubRepoCard Component", () => {
  const mockRepo: RepoItem = {
    name: "BIGboss248/aminwebsite",
    desc: "Developer Cockpit & Systems Observatory portfolio built with Next.js 15 App Router.",
    lang: "TypeScript",
    stars: "⭐ 12",
    tag: "Full-Stack Portfolio",
    url: "https://github.com/BIGboss248/aminwebsite",
  };

  it("renders repository details, stars, and external link", () => {
    render(<GithubRepoCard repo={mockRepo} />);

    expect(screen.getByText("BIGboss248/aminwebsite")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Portfolio")).toBeInTheDocument();
    expect(screen.getByText("⭐ 12")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/BIGboss248/aminwebsite",
    );
  });
});
