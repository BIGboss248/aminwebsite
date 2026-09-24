import React from "react";
import { render, screen } from "@testing-library/react";
import { PhilosophySection } from "./PhilosophySection";
import { PhilosophySectionSkeleton } from "./PhilosophySectionSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "about.philosophy") {
      return (dict.about.philosophy as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("PhilosophySection Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders 3 architectural pillars in English", () => {
    mockLocale = "en";
    render(<PhilosophySection locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Core Architectural Pillars/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Obsidian Reliability")).toBeInTheDocument();
    expect(screen.getByText("Zero-Compromise Performance")).toBeInTheDocument();
    expect(screen.getByText("Deep Systems Competence")).toBeInTheDocument();
  });

  it("renders 3 architectural pillars in Persian", () => {
    mockLocale = "fa";
    render(<PhilosophySection locale="fa" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ستون‌های بنیادین معماری/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/پایداری ابسیدین \(Obsidian Reliability\)/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/عملکرد بدون مصالحه \(Zero-Compromise\)/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/صلاحیت عمیق سیستمی \(Deep Competence\)/i),
    ).toBeInTheDocument();
  });

  it("renders skeleton fallback correctly", () => {
    const { container } = render(<PhilosophySectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
