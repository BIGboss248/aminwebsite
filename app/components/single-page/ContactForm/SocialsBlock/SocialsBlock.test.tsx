import React from "react";
import { render, screen } from "@testing-library/react";
import { SocialsBlock } from "./SocialsBlock";
import { SITE_CONFIG } from "@/lib/site-config";
import enMessages from "@/messages/en.json";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn().mockImplementation(async ({ namespace }) => {
    return (key: string) => {
      if (namespace === "contact.socials") {
        return (enMessages.contact.socials as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

describe("SocialsBlock Component", () => {
  it("renders all social links including LinkedIn, GitHub, and ORCID", async () => {
    const component = await SocialsBlock({ locale: "en" });
    render(component);

    expect(screen.getByText(enMessages.contact.socials.title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.socials.linkedin_name)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.socials.github_name)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.socials.orcid_name)).toBeInTheDocument();

    const linkedinLink = screen.getByRole("link", {
      name: new RegExp(enMessages.contact.socials.linkedin_name, "i"),
    });
    expect(linkedinLink).toHaveAttribute("href", SITE_CONFIG.social.linkedin);
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = screen.getByRole("link", {
      name: new RegExp(enMessages.contact.socials.github_name, "i"),
    });
    expect(githubLink).toHaveAttribute("href", SITE_CONFIG.social.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const orcidLink = screen.getByRole("link", {
      name: new RegExp(enMessages.contact.socials.orcid_name, "i"),
    });
    expect(orcidLink).toHaveAttribute("href", SITE_CONFIG.social.orcid);
    expect(orcidLink).toHaveAttribute("target", "_blank");
    expect(orcidLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
