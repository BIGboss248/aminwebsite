import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectsLoading from "./loading";

jest.mock("@/app/components/projects/ProjectsHero", () => ({
  ProjectsHeroSkeleton: () => (
    <div data-testid="projects-hero-skeleton">ProjectsHeroSkeleton</div>
  ),
}));

jest.mock("@/app/components/projects/ProjectArchiveGrid", () => ({
  ProjectArchiveGridSkeleton: () => (
    <div data-testid="projects-archive-skeleton">ProjectArchiveGridSkeleton</div>
  ),
}));

jest.mock("@/app/components/projects/OpenSourceShowcase", () => ({
  OpenSourceShowcaseSkeleton: () => (
    <div data-testid="open-source-skeleton">OpenSourceShowcaseSkeleton</div>
  ),
}));

describe("Projects Loading Skeleton Component", () => {
  it("renders the loading skeleton container and all section skeletons", () => {
    render(<ProjectsLoading />);

    expect(screen.getByTestId("projects-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("projects-hero-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("projects-archive-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("open-source-skeleton")).toBeInTheDocument();
  });
});
