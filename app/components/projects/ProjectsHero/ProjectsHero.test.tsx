import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectsHero } from "./ProjectsHero";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.projects.hero as Record<string, string>)[key] ?? key;
  },
}));

describe("ProjectsHero Component", () => {
  it("renders heading, eyebrow, description, and stats correctly", () => {
    render(<ProjectsHero locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Delivered Systems, Architecture & Repositories/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("// CASE STUDIES & SYSTEMS ARCHIVE"),
    ).toBeInTheDocument();

    expect(screen.getByText("5 Systems")).toBeInTheDocument();
    expect(screen.getByText("4 Projects")).toBeInTheDocument();
    expect(screen.getByText("100% Verified")).toBeInTheDocument();
  });
});
