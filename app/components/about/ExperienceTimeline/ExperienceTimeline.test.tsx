import React from "react";
import { render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ExperienceTimelineSkeleton } from "./ExperienceTimelineSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "about.experience") {
      return (dict.about.experience as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("ExperienceTimeline Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders experience items and academic degrees in English", () => {
    mockLocale = "en";
    render(<ExperienceTimeline locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Experience & Academic Milestones/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Full-Stack Web Developer & Technical SEO Specialist/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/IT & Infrastructure Automation Specialist/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. in Computer Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. in Financial Management/i)).toBeInTheDocument();
  });

  it("renders experience items in Persian", () => {
    mockLocale = "fa";
    render(<ExperienceTimeline locale="fa" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /نقاط عطف تجربی و دانشگاهی/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/توسعه‌دهنده نرم‌افزارهای تحت وب و متخصص SEO/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/کارشناسی مهندسی کامپیوتر/i),
    ).toBeInTheDocument();
  });

  it("renders skeleton fallback correctly", () => {
    const { container } = render(<ExperienceTimelineSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
