import React from "react";
import { render, screen } from "@testing-library/react";
import LabLoading from "./loading";

jest.mock("@/app/components/lab/LabHero", () => ({
  LabHeroSkeleton: () => (
    <div data-testid="lab-hero-skeleton">LabHeroSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/LabToolGrid", () => ({
  LabToolGridSkeleton: () => (
    <div data-testid="lab-tool-grid-skeleton">LabToolGridSkeleton</div>
  ),
}));

describe("Lab Loading Skeleton Component", () => {
  it("renders loading skeleton container with hero and grid skeletons", () => {
    render(<LabLoading />);

    expect(screen.getByTestId("lab-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("lab-hero-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("lab-tool-grid-skeleton")).toBeInTheDocument();
  });
});
