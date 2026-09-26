import React from "react";
import { render, screen } from "@testing-library/react";
import { LeakMitigationAdvice } from "./LeakMitigationAdvice";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.mitigation as Record<string, string>)[key] ?? key;
  },
}));

describe("LeakMitigationAdvice Component", () => {
  it("renders hardening tips and recommendations", () => {
    render(<LeakMitigationAdvice />);

    expect(screen.getByText(enMessages.lab.ipinfo.mitigation.title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.lab.ipinfo.mitigation.item1_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.lab.ipinfo.mitigation.item2_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.lab.ipinfo.mitigation.item3_title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.lab.ipinfo.mitigation.item4_title)).toBeInTheDocument();
  });
});
