import React from "react";
import { render, screen } from "@testing-library/react";
import { TimezoneMismatchCard } from "./TimezoneMismatchCard";
import type { TimezoneCheckResult } from "../ipinfo-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.timezone as Record<string, string>)[key] ?? key;
  },
}));

const mockMatchResult: TimezoneCheckResult = {
  status: "match",
  systemTimezone: "Europe/Berlin",
  systemOffsetMinutes: 120,
  geoTimezone: "Europe/Berlin",
  geoOffsetMinutes: 120,
  offsetDifferenceMinutes: 0,
  localFormattedTime: "12:00:00 PM",
};

const mockMismatchResult: TimezoneCheckResult = {
  status: "mismatch",
  systemTimezone: "Asia/Tehran",
  systemOffsetMinutes: 210,
  geoTimezone: "America/New_York",
  geoOffsetMinutes: -240,
  offsetDifferenceMinutes: 450,
  localFormattedTime: "01:30:00 PM",
};

describe("TimezoneMismatchCard Component", () => {
  it("renders synchronized badge when timezones align", () => {
    render(<TimezoneMismatchCard result={mockMatchResult} />);

    expect(
      screen.getByText(enMessages.lab.ipinfo.timezone.badge_match),
    ).toBeInTheDocument();
    expect(screen.getByText("0 min")).toBeInTheDocument();
  });

  it("renders mismatch badge and drift disparity when timezones differ", () => {
    render(<TimezoneMismatchCard result={mockMismatchResult} />);

    expect(
      screen.getByText(enMessages.lab.ipinfo.timezone.badge_mismatch),
    ).toBeInTheDocument();
    expect(screen.getByText("450 min")).toBeInTheDocument();
  });
});
