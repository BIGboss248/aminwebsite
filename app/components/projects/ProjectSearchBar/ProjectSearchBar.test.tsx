import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectSearchBar } from "./ProjectSearchBar";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: { count?: number }) => {
    if (key === "results_count" && params?.count !== undefined) {
      return `${params.count} case studies found`;
    }
    return (enMessages.projects.filter as Record<string, string>)[key] ?? key;
  },
}));

describe("ProjectSearchBar Component", () => {
  it("renders search input, calls onQueryChange on type, and handles clear button", () => {
    const handleQueryChange = jest.fn();

    const { rerender } = render(
      <ProjectSearchBar
        query=""
        onQueryChange={handleQueryChange}
        resultCount={5}
      />,
    );

    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "Next.js" } });
    expect(handleQueryChange).toHaveBeenCalledWith("Next.js");

    rerender(
      <ProjectSearchBar
        query="Next.js"
        onQueryChange={handleQueryChange}
        resultCount={2}
      />,
    );

    const clearBtn = screen.getByRole("button", { name: /Clear search query/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(handleQueryChange).toHaveBeenCalledWith("");
  });
});
