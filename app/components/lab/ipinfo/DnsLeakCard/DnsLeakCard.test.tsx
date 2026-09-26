import React from "react";
import { render, screen } from "@testing-library/react";
import { DnsLeakCard } from "./DnsLeakCard";
import type { DnsLeakResult } from "../ipinfo-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.ipinfo.dns as Record<string, string>)[key] ?? key;
  },
}));

const mockDnsResult: DnsLeakResult = {
  status: "secure",
  resolverIp: "1.1.1.1",
  resolverAsn: "AS13335",
  resolverIsp: "Cloudflare, Inc.",
  isMatchingPublicIpAsn: true,
  latencyMs: 12,
};

describe("DnsLeakCard Component", () => {
  it("renders secure resolver details and ASN", () => {
    render(<DnsLeakCard result={mockDnsResult} />);

    expect(
      screen.getByText(enMessages.lab.ipinfo.dns.badge_secure),
    ).toBeInTheDocument();
    expect(screen.getByText("1.1.1.1")).toBeInTheDocument();
    expect(screen.getByText("AS13335")).toBeInTheDocument();
  });
});
