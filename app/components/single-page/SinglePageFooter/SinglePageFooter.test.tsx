import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SinglePageFooter } from "./SinglePageFooter";
import { SinglePageFooterSkeleton } from "./SinglePageFooterSkeleton";
import { SITE_CONFIG } from "@/lib/site-config";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string, values?: Record<string, any>) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "single_page.footer") {
      let val = (dict.single_page.footer as Record<string, string>)[key] ?? key;
      if (values) {
        Object.entries(values).forEach(([k, v]) => {
          val = val.replace(`{${k}}`, String(v));
        });
      }
      return val;
    }
    return key;
  },
}));

describe("SinglePageFooter Component", () => {
  const originalClipboard = navigator.clipboard;
  const originalScrollTo = window.scrollTo;
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;

  beforeEach(() => {
    mockLocale = "en";
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    window.scrollTo = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    document.body.innerHTML = "";
  });

  afterAll(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
    window.scrollTo = originalScrollTo;
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    document.body.innerHTML = "";
  });

  it("renders a semantic footer landmark with accessible label", () => {
    render(<SinglePageFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders brand identity and role description", () => {
    render(<SinglePageFooter />);
    expect(screen.getByText("AMIN JAMALI")).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.single_page.footer.brand_role),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.single_page.footer.brand_tagline),
    ).toBeInTheDocument();
  });

  it("renders all 4 single-page quick navigation anchors", () => {
    render(<SinglePageFooter />);
    expect(
      screen.getByRole("link", {
        name: new RegExp(enMessages.single_page.footer.nav_hero, "i"),
      }),
    ).toHaveAttribute("href", "#hero");
    expect(
      screen.getByRole("link", {
        name: new RegExp(enMessages.single_page.footer.nav_projects, "i"),
      }),
    ).toHaveAttribute("href", "#projects");
    expect(
      screen.getByRole("link", {
        name: new RegExp(enMessages.single_page.footer.nav_certifications, "i"),
      }),
    ).toHaveAttribute("href", "#certifications");
    expect(
      screen.getByRole("link", {
        name: new RegExp(enMessages.single_page.footer.nav_contact, "i"),
      }),
    ).toHaveAttribute("href", "#contact");
  });

  it("triggers smooth scrolling when a quick navigation anchor is clicked", () => {
    const heroElement = document.createElement("div");
    heroElement.id = "hero";
    document.body.appendChild(heroElement);

    render(<SinglePageFooter />);
    const heroLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.nav_hero, "i"),
    });
    fireEvent.click(heroLink);

    expect(heroElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("triggers window.scrollTo when Back to Top button is clicked", () => {
    render(<SinglePageFooter />);
    const backToTopBtn = screen.getByRole("button", {
      name: new RegExp(enMessages.single_page.footer.back_to_top_aria, "i"),
    });
    expect(backToTopBtn).toBeInTheDocument();

    fireEvent.click(backToTopBtn);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("copies email to clipboard and provides accessible feedback", async () => {
    render(<SinglePageFooter />);
    const copyButton = screen.getByRole("button", {
      name: new RegExp(enMessages.single_page.footer.copy_email, "i"),
    });

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      SITE_CONFIG.contact.email,
    );

    await waitFor(() => {
      expect(
        screen.getByText(enMessages.single_page.footer.email_copied),
      ).toBeInTheDocument();
    });
  });

  it("renders verified social channels with secure target and rel attributes", () => {
    render(<SinglePageFooter />);
    const githubLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.social_github, "i"),
    });
    const linkedinLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.social_linkedin, "i"),
    });
    const orcidLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.social_orcid, "i"),
    });
    const emailLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.social_email, "i"),
    });

    expect(githubLink).toHaveAttribute("href", SITE_CONFIG.social.github);
    expect(linkedinLink).toHaveAttribute("href", SITE_CONFIG.social.linkedin);
    expect(orcidLink).toHaveAttribute("href", SITE_CONFIG.social.orcid);
    expect(emailLink).toHaveAttribute("href", `mailto:${SITE_CONFIG.contact.email}`);

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(orcidLink).toHaveAttribute("target", "_blank");
    expect(orcidLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders custom currentYear in the copyright notice", () => {
    render(<SinglePageFooter currentYear={2030} />);
    expect(screen.getByText(/2030/)).toBeInTheDocument();
  });

  it("renders Persian translations when locale='fa'", () => {
    mockLocale = "fa";
    render(<SinglePageFooter locale="fa" />);
    expect(
      screen.getByText(faMessages.single_page.footer.brand_role),
    ).toBeInTheDocument();
    expect(
      screen.getByText(faMessages.single_page.footer.brand_tagline),
    ).toBeInTheDocument();
    expect(
      screen.getByText(faMessages.single_page.footer.nav_hero),
    ).toBeInTheDocument();
  });

  it("renders SinglePageFooterSkeleton with matching layout structure", () => {
    render(<SinglePageFooterSkeleton data-testid="single-page-footer-skeleton" />);
    const skeleton = screen.getByTestId("single-page-footer-skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton.tagName.toLowerCase()).toBe("footer");
  });
});
