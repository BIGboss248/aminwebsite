import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectFilterTabs } from "./ProjectFilterTabs";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.projects.filter as Record<string, string>)[key] ?? key;
  },
}));

describe("ProjectFilterTabs Component", () => {
  it("renders all category tabs with correct active state and counts", () => {
    const handleSelect = jest.fn();
    const counts = {
      all: 5,
      fullstack: 2,
      systems: 1,
      ai_finance: 2,
      research: 3,
    };

    render(
      <ProjectFilterTabs
        activeCategory="all"
        onSelectCategory={handleSelect}
        counts={counts}
      />,
    );

    const allTab = screen.getByRole("tab", { name: /All Case Studies/i });
    expect(allTab).toHaveAttribute("aria-selected", "true");
    expect(allTab).toHaveTextContent("5");

    const fullstackTab = screen.getByRole("tab", {
      name: /Full-Stack & E-Commerce/i,
    });
    expect(fullstackTab).toHaveAttribute("aria-selected", "false");
    expect(fullstackTab).toHaveTextContent("2");

    fireEvent.click(fullstackTab);
    expect(handleSelect).toHaveBeenCalledWith("fullstack");
  });

  it("handles keyboard navigation across tabs", () => {
    const handleSelect = jest.fn();

    render(
      <ProjectFilterTabs
        activeCategory="all"
        onSelectCategory={handleSelect}
      />,
    );

    const allTab = screen.getByRole("tab", { name: /All Case Studies/i });
    fireEvent.keyDown(allTab, { key: "ArrowRight" });
    expect(handleSelect).toHaveBeenCalledWith("fullstack");

    fireEvent.keyDown(allTab, { key: "End" });
    expect(handleSelect).toHaveBeenCalledWith("research");

    fireEvent.keyDown(allTab, { key: "Home" });
    expect(handleSelect).toHaveBeenCalledWith("all");
  });
});
