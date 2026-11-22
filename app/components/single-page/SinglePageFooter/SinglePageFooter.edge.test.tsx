import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SinglePageFooter } from "./SinglePageFooter";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace?: string) => (key: string, values?: Record<string, any>) => {
    if (namespace === "single_page.footer") {
      let val = (enMessages.single_page.footer as Record<string, string>)[key] ?? key;
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

describe("SinglePageFooter Edge Cases & Defensive Resilience", () => {
  const originalClipboard = navigator.clipboard;
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    window.scrollTo = jest.fn();
    document.body.innerHTML = "";
  });

  afterAll(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
    window.scrollTo = originalScrollTo;
    document.body.innerHTML = "";
  });

  it("handles navigation anchor click gracefully when target DOM element does not exist", () => {
    render(<SinglePageFooter />);
    const contactLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.nav_contact, "i"),
    });

    expect(() => fireEvent.click(contactLink)).not.toThrow();
  });

  it("handles clipboard writeText rejection without crashing", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error("Clipboard permission denied")),
      },
    });

    render(<SinglePageFooter />);
    const copyButton = screen.getByRole("button", {
      name: new RegExp(enMessages.single_page.footer.copy_email, "i"),
    });

    expect(() => fireEvent.click(copyButton)).not.toThrow();
  });

  it("handles pushState throwing an exception in restricted sandbox environments", () => {
    const originalPushState = window.history.pushState;
    window.history.pushState = jest.fn().mockImplementation(() => {
      throw new Error("SecurityError: Access denied in sandbox");
    });

    const heroElement = document.createElement("div");
    heroElement.id = "hero";
    heroElement.scrollIntoView = jest.fn();
    document.body.appendChild(heroElement);

    render(<SinglePageFooter />);
    const heroLink = screen.getByRole("link", {
      name: new RegExp(enMessages.single_page.footer.nav_hero, "i"),
    });

    expect(() => fireEvent.click(heroLink)).not.toThrow();
    expect(heroElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    window.history.pushState = originalPushState;
  });

  it("supports custom brandName, contactEmail, and social URL overrides", () => {
    render(
      <SinglePageFooter
        brandName="Test Architect"
        contactEmail="custom@test.internal"
        githubUrl="https://github.com/custom-profile"
        linkedinUrl="https://linkedin.com/in/custom-profile"
        orcidUrl="https://orcid.org/0000-0000-0000-0000"
      />,
    );

    expect(screen.getByText(/TEST ARCHITECT/i)).toBeInTheDocument();

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

    expect(githubLink).toHaveAttribute("href", "https://github.com/custom-profile");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/custom-profile");
    expect(orcidLink).toHaveAttribute("href", "https://orcid.org/0000-0000-0000-0000");
    expect(emailLink).toHaveAttribute("href", "mailto:custom@test.internal");
  });
});
