import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AcademicResearchSection } from "./AcademicResearchSection";
import { AcademicResearchSectionSkeleton } from "./AcademicResearchSectionSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "about.research") {
      return (dict.about.research as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("AcademicResearchSection Component", () => {
  beforeEach(() => {
    mockLocale = "en";
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders publication, DOI, and certifications in English", () => {
    mockLocale = "en";
    render(<AcademicResearchSection locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Academic Publications & Certifications/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Designing and Evaluating a Hybrid NLP and Machine Learning Model in Financial News Sentiment Analysis/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("10.61838/jafci.485")).toBeInTheDocument();
    expect(screen.getByText("ORCID Researcher Identity")).toBeInTheDocument();
    expect(
      screen.getByText("Google AI & Generative AI Content and Prompt Optimization"),
    ).toBeInTheDocument();
  });

  it("copies BibTeX citation when copy button is clicked", async () => {
    render(<AcademicResearchSection locale="en" />);

    const copyBtn = screen.getByRole("button", {
      name: /Copy BibTeX Citation/i,
    });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen.getByText(/BibTeX Copied to Clipboard!/i),
      ).toBeInTheDocument();
    });
  });

  it("renders skeleton fallback correctly", () => {
    const { container } = render(<AcademicResearchSectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
