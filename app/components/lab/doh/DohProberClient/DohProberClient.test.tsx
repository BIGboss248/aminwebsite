import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DohProberClient } from "./DohProberClient";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "lab.doh_prober.controller") {
      return (enMessages.lab.doh_prober.controller as Record<string, string>)[key] ?? key;
    }
    if (namespace === "lab.doh_prober.console") {
      return (enMessages.lab.doh_prober.console as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("DohProberClient Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            Status: 0,
            Answer: [{ name: "google.com", type: 1, TTL: 300, data: "142.250.190.46" }],
          }),
      }),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders query controller and empty console initially", () => {
    render(<DohProberClient locale="en" />);

    expect(screen.getByDisplayValue("google.com")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Diagnostic Console Ready/i,
      }),
    ).toBeInTheDocument();
  });

  it("fetches DNS answers and updates diagnostic console when executed", async () => {
    render(<DohProberClient locale="en" />);

    const executeBtn = screen.getByRole("button", {
      name: /Query Selected Resolver/i,
    });
    fireEvent.click(executeBtn);

    await waitFor(() => {
      expect(screen.getByText("Cloudflare (1.1.1.1)")).toBeInTheDocument();
      expect(screen.getByText("142.250.190.46")).toBeInTheDocument();
    });
  });
});
