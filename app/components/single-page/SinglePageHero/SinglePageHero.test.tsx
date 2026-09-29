import React from "react";
import { render, screen } from "@testing-library/react";
import { SinglePageHero } from "./SinglePageHero";
import { SinglePageHeroSkeleton } from "./SinglePageHeroSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "single_page.hero") {
      return (dict.single_page.hero as Record<string, string>)[key] ?? key;
    }
    if (namespace === "common") {
      return (dict.common as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("SinglePageHero Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders 2-column hero with logo placeholder, big bold name, role, bio, and pill buttons", () => {
    mockLocale = "en";
    render(<SinglePageHero locale="en" />);

    // Website Brand Logo
    expect(
      screen.getByLabelText(/Amin Jamali brand logo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Amin Jamali Logo/i),
    ).toBeInTheDocument();

    // Name and Role
    expect(
      screen.getByRole("heading", { level: 1, name: /Amin Jamali/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Full-Stack Web Developer & IT Specialist/i,
      }),
    ).toBeInTheDocument();

    // Bio text
    expect(
      screen.getByText(
        /I am a full-stack web developer and IT specialist specializing in high-performance Next\.js and TypeScript architectures/i,
      ),
    ).toBeInTheDocument();

    // Pill-shaped Social Links & Mailto
    const githubLink = screen.getByRole("link", {
      name: /Visit GitHub profile of Amin Jamali/i,
    });
    expect(githubLink).toHaveAttribute("href", "https://github.com/BIGboss248");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = screen.getByRole("link", {
      name: /Visit LinkedIn profile of Amin Jamali/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/amin-jamali2000",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");

    const orcidLink = screen.getByRole("link", {
      name: /View ORCID researcher record of Amin Jamali/i,
    });
    expect(orcidLink).toHaveAttribute(
      "href",
      "https://orcid.org/0009-0004-9921-7273",
    );
    expect(orcidLink).toHaveAttribute("target", "_blank");

    const mailtoLink = screen.getByRole("link", {
      name: /Send an email directly to Amin Jamali/i,
    });
    expect(mailtoLink).toHaveAttribute("href", "mailto:contact@meetjamali.com");

    // Right Column Full-size Portrait Image
    const portraitImg = screen.getByAltText(
      /Amin Jamali — Full-Stack Web Developer and IT Specialist/i,
    );
    expect(portraitImg).toBeInTheDocument();
  });

  it("renders Persian translations when locale='fa'", () => {
    mockLocale = "fa";
    render(<SinglePageHero locale="fa" />);

    expect(
      screen.getByLabelText(/لوگوی رسمی امین جمالی/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/لوگوی امین جمالی/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 1, name: /امین جمالی/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /توسعه‌دهنده فول‌استک وب و متخصص فناوری اطلاعات \(IT\)/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /توسعه‌دهنده فول‌استک وب و متخصص فناوری اطلاعات \(IT\) با تمرکز بر معماری‌های مدرن و پرسرعت Next\.js و TypeScript/i,
      ),
    ).toBeInTheDocument();

    const mailtoLink = screen.getByRole("link", {
      name: /ارسال مستقیم ایمیل به امین جمالی/i,
    });
    expect(mailtoLink).toHaveAttribute("href", "mailto:contact@meetjamali.com");
  });

  it("renders SinglePageHeroSkeleton fallback with pulse animation", () => {
    const { container } = render(<SinglePageHeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
