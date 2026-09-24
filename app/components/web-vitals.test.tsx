import React from "react";
import { render } from "@testing-library/react";
import { WebVitals } from "./web-vitals";
import { useReportWebVitals } from "next/web-vitals";

jest.mock("next/web-vitals", () => ({
  useReportWebVitals: jest.fn(),
}));

describe("WebVitals Component", () => {
  const originalEnv = process.env;
  const mockSendBeacon = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    Object.defineProperty(navigator, "sendBeacon", {
      value: mockSendBeacon,
      writable: true,
      configurable: true,
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("renders null and registers useReportWebVitals callback", () => {
    const { container } = render(<WebVitals />);
    expect(container.firstChild).toBeNull();
    expect(useReportWebVitals).toHaveBeenCalledTimes(1);
    expect(typeof (useReportWebVitals as unknown as jest.Mock).mock.calls[0][0]).toBe("function");
  });

  it("sends beacon if endpoint configured and metric received", () => {
    process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS = "true";
    process.env.NEXT_PUBLIC_VITALS_ENDPOINT = "/api/telemetry/vitals";

    render(<WebVitals />);

    const callback = (useReportWebVitals as unknown as jest.Mock).mock.calls[0][0];
    const metric = {
      id: "v1-123",
      name: "FCP",
      startTime: 100,
      value: 250,
      label: "web-vital",
      rating: "good",
    };

    callback(metric);

    expect(mockSendBeacon).toHaveBeenCalledWith(
      "/api/telemetry/vitals",
      JSON.stringify(metric),
    );
  });
});
