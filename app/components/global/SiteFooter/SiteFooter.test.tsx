import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SiteFooter } from "./SiteFooter";
import { SiteFooterSkeleton } from "./SiteFooterSkeleton";
import { SocialLinksBar } from "./SocialLinksBar";
import { SITE_CONFIG } from "@/lib/site-config";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockCurrentLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockCurrentLocale,
  useTranslations: (namespace?: string) => (key: string, values?: Record<string, any>) => {
    const dict = mockCurrentLocale === "fa" ? faMessages : enMessages;
    if (namespace === "footer") {
      let val = (dict.footer as Record<string, string>)[key] ?? key;
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

jest.mock("@/app/components/Link", () => {
  const React = require("react");
  const MockLink = React.forwardRef(
    ({ href, children, ...props }: any, ref: any) => (
      <a
        ref={ref}
        href={typeof href === "string" ? href : (href?.pathname ?? "#")}
        {...props}
      >
        {children}
      </a>
    ),
  );
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    Link: MockLink,
    default: MockLink,
  };
});

describe("SiteFooter & SocialLinksBar", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    mockCurrentLocale = "en";
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  afterAll(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  it("renders semantic footer landmark with accessible label", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders the top Action-First contact banner by default", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(enMessages.footer.headline),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.footer.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.footer.status_available),
    ).toBeInTheDocument();
  });

  it("allows hiding the Action-First contact banner when showActionBanner is false", () => {
    render(<SiteFooter showActionBanner={false} />);
    expect(
      screen.queryByText(enMessages.footer.headline),
    ).not.toBeInTheDocument();
  });

  it("copies email to clipboard and displays feedback state upon clicking copy button", async () => {
    render(<SiteFooter />);
    const copyButton = screen.getByRole("button", {
      name: new RegExp(enMessages.footer.copy_email, "i"),
    });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      SITE_CONFIG.contact.email,
    );

    await waitFor(() => {
      expect(
        screen.getByText(enMessages.footer.email_copied),
      ).toBeInTheDocument();
    });
  });

  it("renders all 4 navigation columns with correct links", () => {
    render(<SiteFooter />);
    expect(screen.getByText(enMessages.footer.col_explore_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.col_lab_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.col_research_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.col_platform_title)).toBeInTheDocument();

    expect(screen.getByText(enMessages.footer.link_case_studies)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.link_doh)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.link_publications)).toBeInTheDocument();
    expect(screen.getByText(enMessages.footer.link_health)).toBeInTheDocument();
  });

  it("renders SocialLinksBar with verified channels and accessible labels", () => {
    render(<SocialLinksBar />);
    const githubLink = screen.getByRole("link", {
      name: new RegExp(enMessages.footer.social_github, "i"),
    });
    const linkedinLink = screen.getByRole("link", {
      name: new RegExp(enMessages.footer.social_linkedin, "i"),
    });
    const orcidLink = screen.getByRole("link", {
      name: new RegExp(enMessages.footer.social_orcid, "i"),
    });
    const twitterLink = screen.getByRole("link", {
      name: new RegExp(enMessages.footer.social_twitter, "i"),
    });

    expect(githubLink).toHaveAttribute("href", SITE_CONFIG.social.github);
    expect(linkedinLink).toHaveAttribute("href", SITE_CONFIG.social.linkedin);
    expect(orcidLink).toHaveAttribute("href", SITE_CONFIG.social.orcid);
    expect(twitterLink).toHaveAttribute("href", SITE_CONFIG.social.twitter);

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders custom currentYear in the copyright notice", () => {
    render(<SiteFooter currentYear={2028} />);
    expect(screen.getByText(/2028/)).toBeInTheDocument();
  });

  it("renders Persian translations seamlessly in fa locale", () => {
    mockCurrentLocale = "fa";
    render(<SiteFooter />);
    expect(
      screen.getByText(faMessages.footer.headline),
    ).toBeInTheDocument();
    expect(
      screen.getByText(faMessages.footer.col_explore_title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(faMessages.footer.col_lab_title),
    ).toBeInTheDocument();
  });

  it("renders SiteFooterSkeleton with matching layout structure", () => {
    render(<SiteFooterSkeleton data-testid="footer-skeleton" />);
    const skeleton = screen.getByTestId("footer-skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.tagName.toLowerCase()).toBe("footer");
  });
});

