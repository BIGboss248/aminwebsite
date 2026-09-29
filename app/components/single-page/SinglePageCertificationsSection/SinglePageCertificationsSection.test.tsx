import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SinglePageCertificationsSection } from "./SinglePageCertificationsSection";
import { SinglePageCertificationsSkeleton } from "./SinglePageCertificationsSkeleton";
import { LinkedInProfileBanner } from "./LinkedInProfileBanner";
import enMessages from "@/messages/en.json";
import { SITE_CONFIG } from "@/lib/site-config";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const fn = (key: string, params?: Record<string, unknown>) => {
      const fullPath = namespace ? `${namespace}.${key}` : key;
      const pathParts = fullPath.split(".");
      let current: unknown = enMessages;
      for (const part of pathParts) {
        if (current && typeof current === "object" && part in current) {
          current = (current as Record<string, unknown>)[part];
        } else {
          return key;
        }
      }
      if (typeof current === "string") {
        if (params) {
          let str = current;
          Object.entries(params).forEach(([pKey, pVal]) => {
            str = str.replace(`{${pKey}}`, String(pVal));
          });
          return str;
        }
        return current;
      }
      return key;
    };

    fn.raw = (key: string) => {
      const fullPath = namespace ? `${namespace}.${key}` : key;
      const pathParts = fullPath.split(".");
      let current: unknown = enMessages;
      for (const part of pathParts) {
        if (current && typeof current === "object" && part in current) {
          current = (current as Record<string, unknown>)[part];
        } else {
          return undefined;
        }
      }
      return current;
    };

    return fn;
  },
}));

describe("SinglePageCertificationsSection", () => {
  it("renders the section landmark with correct ID and heading", () => {
    const { container } = render(<SinglePageCertificationsSection locale="en" />);

    const section = container.querySelector("#certifications");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "certifications-heading");

    expect(
      screen.getByRole("heading", {
        name: enMessages.single_page.certifications.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.single_page.certifications.eyebrow),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.single_page.certifications.description),
    ).toBeInTheDocument();
  });

  it("renders top 4 certifications: Google IT Support, IBM DevOps, Google AI, and AWS Solutions Architect", () => {
    render(<SinglePageCertificationsSection locale="en" />);

    const certs = enMessages.single_page.certifications.items;

    // 1. Google IT Support
    expect(screen.getByText(certs.google_it_support.title)).toBeInTheDocument();
    expect(screen.getByText(certs.google_it_support.credential_id)).toBeInTheDocument();

    // 2. IBM DevOps
    expect(screen.getByText(certs.ibm_devops.title)).toBeInTheDocument();
    expect(screen.getByText(certs.ibm_devops.credential_id)).toBeInTheDocument();

    // 3. Google AI
    expect(screen.getByText(certs.google_ai.title)).toBeInTheDocument();
    expect(screen.getByText(certs.google_ai.credential_id)).toBeInTheDocument();

    // 4. AWS Solutions Architect
    expect(screen.getByText(certs.aws_solutions_architect.title)).toBeInTheDocument();
    expect(screen.getByText(certs.aws_solutions_architect.issuer)).toBeInTheDocument();
    expect(screen.getByText(certs.aws_solutions_architect.credential_id)).toBeInTheDocument();
  });

  it("renders credential verification links with valid URLs from resume.html", () => {
    render(<SinglePageCertificationsSection locale="en" />);

    const certs = enMessages.single_page.certifications.items;

    const awsLink = screen.getByRole("link", {
      name: new RegExp(certs.aws_solutions_architect.title, "i"),
    });
    expect(awsLink).toHaveAttribute("href", certs.aws_solutions_architect.credential_url);
    expect(awsLink).toHaveAttribute("target", "_blank");
    expect(awsLink).toHaveAttribute("rel", "noopener noreferrer");

    const googleItLink = screen.getByRole("link", {
      name: new RegExp(certs.google_it_support.title, "i"),
    });
    expect(googleItLink).toHaveAttribute("href", certs.google_it_support.credential_url);
  });

  it("expands to reveal additional certifications and allows searching", () => {
    render(<SinglePageCertificationsSection locale="en" />);

    // Initially collapsed
    expect(screen.queryByPlaceholderText(/Search certifications/i)).not.toBeInTheDocument();

    // Click expand button
    const expandBtn = screen.getByRole("button", { name: /Show All Certifications/i });
    fireEvent.click(expandBtn);

    // Collapsible panel is now visible
    expect(screen.getByPlaceholderText(/Search certifications/i)).toBeInTheDocument();
    expect(
      screen.getByText("Generative AI Content and Prompt Optimization"),
    ).toBeInTheDocument();

    // Filter by query
    const searchInput = screen.getByPlaceholderText(/Search certifications/i);
    fireEvent.change(searchInput, { target: { value: "Docker" } });

    expect(
      screen.getByText("Introduction to Containers w/ Docker, Kubernetes & OpenShift"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Generative AI Content and Prompt Optimization"),
    ).not.toBeInTheDocument();

    // Click collapse button
    const collapseBtn = screen.getByRole("button", { name: /Show Less/i });
    fireEvent.click(collapseBtn);

    expect(screen.queryByPlaceholderText(/Search certifications/i)).not.toBeInTheDocument();
  });

  it("renders LinkedInProfileBanner with verified badge, handle, and target link", () => {
    render(<LinkedInProfileBanner locale="en" />);

    const bannerConfig = enMessages.single_page.certifications.linkedin_banner;

    expect(screen.getByText(bannerConfig.headline)).toBeInTheDocument();
    expect(screen.getByText(bannerConfig.description)).toBeInTheDocument();
    expect(screen.getByText(bannerConfig.badge)).toBeInTheDocument();
    expect(screen.getByText(`(${bannerConfig.profile_handle})`)).toBeInTheDocument();

    const connectLink = screen.getByRole("link", {
      name: /Connect with Amin Jamali on LinkedIn/i,
    });
    expect(connectLink).toHaveAttribute("href", SITE_CONFIG.social.linkedin);
    expect(connectLink).toHaveAttribute("target", "_blank");
    expect(connectLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders SinglePageCertificationsSkeleton with accessible loading aria-busy state", () => {
    const { container } = render(<SinglePageCertificationsSkeleton />);

    const skeletonSection = container.querySelector("section");
    expect(skeletonSection).toHaveAttribute("aria-busy", "true");
    expect(skeletonSection).toHaveAttribute(
      "aria-label",
      "Loading certifications and credentials",
    );
  });
});
