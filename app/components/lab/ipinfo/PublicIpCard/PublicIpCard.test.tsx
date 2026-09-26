import React from "react";
import { render, screen } from "@testing-library/react";
import { PublicIpCard } from "./PublicIpCard";
import type { PublicIpData } from "../ipinfo-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.public_ip as Record<string, string>)[key] ?? key;
  },
}));

const mockIpData: PublicIpData = {
  ip: "203.0.113.195",
  version: "IPv4",
  country: "Germany",
  countryCode: "DE",
  region: "Hesse",
  city: "Frankfurt",
  latitude: 50.1109,
  longitude: 8.6821,
  timezone: "Europe/Berlin",
  utcOffset: "+02:00",
  asn: "AS24940",
  org: "Hetzner Online GmbH",
  isp: "Hetzner Online GmbH",
  isProxy: false,
  isVpn: true,
  isTor: false,
  isHosting: true,
};

describe("PublicIpCard Component", () => {
  it("renders IP, ASN, ISP, and location details accurately", () => {
    render(<PublicIpCard data={mockIpData} />);

    expect(screen.getByText("203.0.113.195")).toBeInTheDocument();
    expect(screen.getByText("AS24940")).toBeInTheDocument();
    expect(screen.getByText("Hetzner Online GmbH")).toBeInTheDocument();
    expect(screen.getByText(/Frankfurt/i)).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.lab.ipinfo.public_ip.datacenter_vpn_tag),
    ).toBeInTheDocument();
  });

  it("handles null/fallback data gracefully", () => {
    render(<PublicIpCard data={null} />);
    const notDetectedTexts = screen.getAllByText(
      enMessages.lab.ipinfo.public_ip.not_detected,
    );
    expect(notDetectedTexts.length).toBeGreaterThan(0);
  });
});
