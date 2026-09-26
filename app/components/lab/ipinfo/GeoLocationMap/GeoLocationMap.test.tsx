import React from "react";
import { render, screen } from "@testing-library/react";
import { GeoLocationMap } from "./GeoLocationMap";
import type { PublicIpData } from "../ipinfo-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.map as Record<string, string>)[key] ?? key;
  },
}));

const mockData: PublicIpData = {
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
};

describe("GeoLocationMap Component", () => {
  it("renders map HUD and coordinate displays", () => {
    render(<GeoLocationMap data={mockData} />);

    expect(screen.getByText(enMessages.lab.ipinfo.map.title)).toBeInTheDocument();
    expect(screen.getByText(/50.1109°, 8.6821°/i)).toBeInTheDocument();
    expect(screen.getByText(/Frankfurt, Germany/i)).toBeInTheDocument();
  });
});
