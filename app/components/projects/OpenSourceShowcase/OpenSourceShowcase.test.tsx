import React from "react";
import { render, screen } from "@testing-library/react";
import { OpenSourceShowcase } from "./OpenSourceShowcase";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const parts = key.split(".");
    if (parts.length === 2 && parts[0] && parts[1]) {
      const item = (enMessages.projects.open_source as Record<string, unknown>)[parts[0]] as Record<string, string> | undefined;
      return item?.[parts[1]] ?? key;
    }
    return (enMessages.projects.open_source as unknown as Record<string, string>)[key] ?? key;
  },
}));

describe("OpenSourceShowcase Component", () => {
  it("renders section header, github profile CTA, and all repository cards", () => {
    render(<OpenSourceShowcase locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Public Tooling, Labs & System Repositories/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /View GitHub Profile \(@BIGboss248\)/i }),
    ).toHaveAttribute("href", "https://github.com/BIGboss248");

    expect(screen.getByText("BIGboss248/aminwebsite")).toBeInTheDocument();
    expect(
      screen.getByText("BIGboss248/dns-over-https-tester"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("BIGboss248/webrtc-leak-detector"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("BIGboss248/parsbert-ime-sentiment"),
    ).toBeInTheDocument();
  });
});
