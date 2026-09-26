import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { IpScannerClient } from "./IpScannerClient";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => {
    return (key: string) => {
      if (ns === "lab.ipinfo.controller") {
        return (enMessages.lab.ipinfo.controller as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.public_ip") {
        return (enMessages.lab.ipinfo.public_ip as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.webrtc") {
        return (enMessages.lab.ipinfo.webrtc as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.dns") {
        return (enMessages.lab.ipinfo.dns as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.timezone") {
        return (enMessages.lab.ipinfo.timezone as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.map") {
        return (enMessages.lab.ipinfo.map as Record<string, string>)[key] ?? key;
      }
      if (ns === "lab.ipinfo.mitigation") {
        return (enMessages.lab.ipinfo.mitigation as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  },
}));

jest.mock("../ipinfo-utils", () => ({
  ...jest.requireActual("../ipinfo-utils"),
  fetchPublicIpInfo: jest.fn().mockResolvedValue({
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
    isVpn: false,
    isTor: false,
    isHosting: true,
  }),
  gatherWebRtcCandidates: jest.fn().mockResolvedValue({
    status: "secure",
    localIps: [],
    publicIps: ["203.0.113.195"],
    candidates: [],
    leakDetected: false,
    stunLatencyMs: 30,
  }),
  checkTimezoneMismatch: jest.fn().mockReturnValue({
    status: "match",
    systemTimezone: "Europe/Berlin",
    systemOffsetMinutes: 120,
    geoTimezone: "Europe/Berlin",
    geoOffsetMinutes: 120,
    offsetDifferenceMinutes: 0,
    localFormattedTime: "12:00:00 PM",
  }),
}));

describe("IpScannerClient Component", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders privacy score gauge and completes scan", async () => {
    await act(async () => {
      render(<IpScannerClient locale="en" />);
    });

    expect(
      screen.getByText(enMessages.lab.ipinfo.controller.score_label),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: new RegExp(enMessages.lab.ipinfo.controller.scan_now, "i"),
        }),
      ).toBeInTheDocument();
    });
  });

  it("handles copy json click", async () => {
    await act(async () => {
      render(<IpScannerClient locale="en" />);
    });

    const copyBtn = screen.getByRole("button", {
      name: new RegExp(enMessages.lab.ipinfo.controller.copy_json, "i"),
    });

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
