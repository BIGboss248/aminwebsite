import React from "react";
import { render, screen } from "@testing-library/react";
import IpInfoLoading from "./loading";

jest.mock("@/app/components/lab/ipinfo/IpScanHeader", () => ({
  IpScanHeaderSkeleton: () => (
    <div data-testid="ip-header-skeleton">IpScanHeaderSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/ipinfo/IpScannerClient", () => ({
  IpScannerClientSkeleton: () => (
    <div data-testid="ip-scanner-skeleton">IpScannerClientSkeleton</div>
  ),
}));

describe("IpInfoLoading Skeleton Component", () => {
  it("renders both header and scanner skeletons", () => {
    render(<IpInfoLoading />);

    expect(screen.getByTestId("ipinfo-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("ip-header-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("ip-scanner-skeleton")).toBeInTheDocument();
  });
});
