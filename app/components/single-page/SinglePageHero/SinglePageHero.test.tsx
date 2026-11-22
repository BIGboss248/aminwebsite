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
        name: /Websites and online shops that bring you customers/i,
      }),
    ).toBeInTheDocument();

    // Bio text
    expect(
      screen.getByText(
        /For six years I have built sites and online shops for small businesses/i,
      ),
    ).toBeInTheDocument();

    // Pill-shaped Social Links & Mailto
    const githubLink = screen.getByRole("link", {
      name: /View code samples and projects by Amin Jamali on GitHub/i,
    });
    expect(githubLink).toHaveAttribute("href", "https://github.com/BIGboss248");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = screen.getByRole("link", {
      name: /View the LinkedIn profile of Amin Jamali/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/amin-jamali2000",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");

    const orcidLink = screen.getByRole("link", {
      name: /View the research paper and researcher record of Amin Jamali/i,
    });
    expect(orcidLink).toHaveAttribute(
      "href",
      "https://orcid.org/0009-0004-9921-7273",
    );
    expect(orcidLink).toHaveAttribute("target", "_blank");

    const mailtoLink = screen.getByRole("link", {
      name: /Email Amin Jamali to start a conversation about your project/i,
    });
    expect(mailtoLink).toHaveAttribute("href", "mailto:contact@meetjamali.com");

    // Right Column Full-size Portrait Image
    const portraitImg = screen.getByAltText(
      /Amin Jamali, web developer in Isfahan/i,
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
        name: /سایت و فروشگاه اینترنتی که برایتان مشتری می‌آورد/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /شش سال است برای کسب‌وکارهای ایرانی سایت و فروشگاه اینترنتی می‌سازم/i,
      ),
    ).toBeInTheDocument();

    const mailtoLink = screen.getByRole("link", {
      name: /ارسال ایمیل به امین جمالی برای شروع گفتگو درباره پروژه/i,
    });
    expect(mailtoLink).toHaveAttribute("href", "mailto:contact@meetjamali.com");
  });

  it("renders SinglePageHeroSkeleton fallback with pulse animation", () => {
    const { container } = render(<SinglePageHeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
