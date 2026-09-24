import React from "react";
import { render, screen } from "@testing-library/react";
import { BeyondCodeSection } from "./BeyondCodeSection";
import { BeyondCodeSectionSkeleton } from "./BeyondCodeSectionSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "about.beyond") {
      return (dict.about.beyond as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("BeyondCodeSection Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders 4 open source / community cards in English", () => {
    mockLocale = "en";
    render(<BeyondCodeSection locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Open Source & Systems Tinkering/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Privacy-Preserving Diagnostic Tools"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Home Lab & Autonomous Edge Nodes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("RFC Deep-Dives & Architecture RFCs"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mentorship & Code Reviews"),
    ).toBeInTheDocument();
  });

  it("renders skeleton fallback correctly", () => {
    const { container } = render(<BeyondCodeSectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
