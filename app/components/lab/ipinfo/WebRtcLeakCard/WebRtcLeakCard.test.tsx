import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WebRtcLeakCard } from "./WebRtcLeakCard";
import type { WebRtcLeakResult } from "../ipinfo-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.webrtc as Record<string, string>)[key] ?? key;
  },
}));

const mockSecureResult: WebRtcLeakResult = {
  status: "secure",
  localIps: [],
  publicIps: ["203.0.113.195"],
  candidates: [
    {
      candidate: "candidate:1 1 udp 2130706431 203.0.113.195 54321 typ srflx",
      type: "srflx",
      ip: "203.0.113.195",
      port: 54321,
      protocol: "udp",
      isPrivate: false,
      isIpv6: false,
    },
  ],
  leakDetected: false,
  stunLatencyMs: 45,
};

const mockLeakedResult: WebRtcLeakResult = {
  status: "leaked",
  localIps: ["192.168.1.55"],
  publicIps: ["198.51.100.1"],
  candidates: [
    {
      candidate: "candidate:1 1 udp 2130706431 198.51.100.1 54321 typ srflx",
      type: "srflx",
      ip: "198.51.100.1",
      port: 54321,
      protocol: "udp",
      isPrivate: false,
      isIpv6: false,
    },
  ],
  leakDetected: true,
  stunLatencyMs: 60,
};

describe("WebRtcLeakCard Component", () => {
  it("renders secure status badge when no leaks are found", () => {
    render(<WebRtcLeakCard result={mockSecureResult} />);

    expect(
      screen.getByText(enMessages.lab.ipinfo.webrtc.badge_secure),
    ).toBeInTheDocument();
    expect(screen.getByText("203.0.113.195")).toBeInTheDocument();
  });

  it("renders alert warning when leak is detected", () => {
    render(<WebRtcLeakCard result={mockLeakedResult} />);

    expect(
      screen.getByText(enMessages.lab.ipinfo.webrtc.badge_leaked),
    ).toBeInTheDocument();
    expect(screen.getByText("192.168.1.55")).toBeInTheDocument();
  });

  it("toggles candidates list on click", () => {
    render(<WebRtcLeakCard result={mockSecureResult} />);

    const toggleBtn = screen.getByRole("button", { name: /Discovered ICE Candidates/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByText(/\[srflx\]/i)).toBeInTheDocument();
  });
});
