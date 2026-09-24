import React from "react";
import { render, screen } from "@testing-library/react";
import AboutLoading from "./loading";

jest.mock("@/app/components/about/AboutHero", () => ({
  AboutHeroSkeleton: () => <div data-testid="about-hero-skeleton">AboutHeroSkeleton</div>,
}));

jest.mock("@/app/components/about/PhilosophySection", () => ({
  PhilosophySectionSkeleton: () => (
    <div data-testid="philosophy-skeleton">PhilosophySkeleton</div>
  ),
}));

jest.mock("@/app/components/about/ExperienceTimeline", () => ({
  ExperienceTimelineSkeleton: () => (
    <div data-testid="experience-skeleton">ExperienceSkeleton</div>
  ),
}));

jest.mock("@/app/components/about/AcademicResearchSection", () => ({
  AcademicResearchSectionSkeleton: () => (
    <div data-testid="academic-skeleton">AcademicSkeleton</div>
  ),
}));

jest.mock("@/app/components/about/BeyondCodeSection", () => ({
  BeyondCodeSectionSkeleton: () => (
    <div data-testid="beyond-skeleton">BeyondSkeleton</div>
  ),
}));

describe("About Loading Skeleton Component", () => {
  it("renders the loading skeleton container and all section skeletons", () => {
    render(<AboutLoading />);

    expect(screen.getByTestId("about-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("about-hero-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("philosophy-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("experience-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("academic-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("beyond-skeleton")).toBeInTheDocument();
  });
});
