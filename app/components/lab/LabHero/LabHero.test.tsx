import React from "react";
import { render, screen } from "@testing-library/react";
import { LabHero } from "./LabHero";
import { PrivacyGuaranteeBanner } from "./PrivacyGuaranteeBanner";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "lab.hero") {
      return (enMessages.lab.hero as Record<string, string>)[key] ?? key;
    }
    if (namespace === "lab.privacy_banner") {
      return (enMessages.lab.privacy_banner as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("LabHero & PrivacyGuaranteeBanner Components", () => {
  it("renders LabHero with heading, metric cards, and badge", () => {
    render(<LabHero locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Browser-Native Systems & Network Diagnostics/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("3 Utilities")).toBeInTheDocument();
    expect(screen.getByText("100% Client-Side")).toBeInTheDocument();
    expect(screen.getByText("0 Bytes Retained")).toBeInTheDocument();
  });

  it("renders PrivacyGuaranteeBanner with security points", () => {
    render(<PrivacyGuaranteeBanner locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Client-Side Execution & Privacy Guarantee/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Direct Browser Fetch")).toBeInTheDocument();
    expect(screen.getByText("Zero Proxy Intermediaries")).toBeInTheDocument();
    expect(screen.getByText("Local-Only Hashing")).toBeInTheDocument();
  });
});
