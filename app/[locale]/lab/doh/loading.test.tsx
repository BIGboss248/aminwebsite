import React from "react";
import { render, screen } from "@testing-library/react";
import DohLoading from "./loading";

jest.mock("@/app/components/lab/doh/DohToolHeader", () => ({
  DohToolHeaderSkeleton: () => (
    <div data-testid="doh-header-skeleton">DohToolHeaderSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/doh/DohProberClient", () => ({
  DohProberClientSkeleton: () => (
    <div data-testid="doh-prober-skeleton">DohProberClientSkeleton</div>
  ),
}));

describe("DoH Loading Skeleton Component", () => {
  it("renders loading skeleton container with header and prober skeletons", () => {
    render(<DohLoading />);

    expect(screen.getByTestId("doh-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("doh-header-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("doh-prober-skeleton")).toBeInTheDocument();
  });
});
