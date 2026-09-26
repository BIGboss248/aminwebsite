import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IpScanHeader } from "./IpScanHeader";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => {
    return (key: string) => {
      if (ns === "lab.ipinfo.header") {
        return (enMessages.lab.ipinfo.header as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.methodology") {
        return (enMessages.lab.ipinfo.methodology as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  },
}));

jest.mock("@/app/components/Link", () => ({
  __esModule: true,
  Link: ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  default: ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
}));

describe("IpScanHeader Component", () => {
  it("renders title, description, and protocol badge properly", () => {
    render(<IpScanHeader locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      enMessages.lab.ipinfo.header.title,
    );
    expect(
      screen.getByText(enMessages.lab.ipinfo.header.badge),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.lab.ipinfo.header.back_to_lab),
    ).toBeInTheDocument();
  });

  it("toggles methodology accordion on click", () => {
    render(<IpScanHeader locale="en" />);

    const accordionBtn = screen.getByRole("button", {
      name: new RegExp(enMessages.lab.ipinfo.methodology.title, "i"),
    });
    expect(accordionBtn).toBeInTheDocument();
    expect(accordionBtn).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(enMessages.lab.ipinfo.methodology.webrtc_title),
    ).toBeInTheDocument();

    // Click to close
    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute("aria-expanded", "false");
  });
});
