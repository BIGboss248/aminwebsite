import React from "react";
import { render, screen } from "@testing-library/react";
import { LabLauncherSection } from "./LabLauncherSection";
import { ToolQuickCard } from "./ToolQuickCard";
import { LabLauncherSectionSkeleton } from "./LabLauncherSectionSkeleton";
import { ROUTES } from "@/lib/routes";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "home.lab_launcher") {
      return (dict.home.lab_launcher as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

// Mock Link from @/app/components/Link
jest.mock("@/app/components/Link", () => {
  return {
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
  };
});

describe("LabLauncherSection (Baseline TDD)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders default English section headers, privacy badges, and 3 diagnostic tool cards", () => {
    mockLocale = "en";
    render(<LabLauncherSection locale="en" />);

    // Section Eyebrow & Main Heading
    expect(
      screen.getByText(/\/\/ INTERACTIVE SYSTEMS LAB/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Live Client-Side Diagnostic Tools/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /100% direct browser-to-target execution with zero server telemetry/i,
      ),
    ).toBeInTheDocument();

    // Privacy & Security Pill
    expect(
      screen.getByText(/ZERO BACKEND LOGGING \/\/ 100% CLIENT FETCH/i),
    ).toBeInTheDocument();

    // Explore Hub Link (Desktop + Mobile)
    const exploreHubLinks = screen.getAllByRole("link", {
      name: /Explore Full Lab Hub/i,
    });
    expect(exploreHubLinks.length).toBeGreaterThanOrEqual(1);
    expect(exploreHubLinks[0]).toHaveAttribute("href", ROUTES.lab.root);

    // Card 01: DoH Prober
    expect(screen.getByText(/PROBE_01 \/\/ RFC 8484 DOH/i)).toBeInTheDocument();
    expect(screen.getByText(/CLIENT-SIDE PROBE/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /DNS over HTTPS \(DoH\) Prober/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/cloudflare-dns\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/dns\.google/i)).toBeInTheDocument();
    expect(screen.getByText(/quad9\.net/i)).toBeInTheDocument();

    const dohLink = screen.getByRole("link", {
      name: /Launch DoH Prober/i,
    });
    expect(dohLink).toHaveAttribute("href", ROUTES.lab.doh);

    // Card 02: IP & Identity Leak Scanner
    expect(screen.getByText(/PROBE_02 \/\/ STUN & IP AUDIT/i)).toBeInTheDocument();
    expect(screen.getByText(/ZERO SERVER LOGGING/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /IP & Identity Leak Scanner/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/WebRTC STUN \(RFC 5389\)/i)).toBeInTheDocument();
    expect(screen.getByText(/IPv4 \/ IPv6 Dual-Stack/i)).toBeInTheDocument();

    const ipLink = screen.getByRole("link", {
      name: /Launch Identity Scanner/i,
    });
    expect(ipLink).toHaveAttribute("href", ROUTES.lab.ipInfo);

    // Card 03: Client Device Fingerprint Inspector
    expect(
      screen.getByText(/PROBE_03 \/\/ ENTROPY & HARDWARE/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/LOCAL COMPUTATION/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Client Device Fingerprint Inspector/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/HTML5 2D Canvas/i)).toBeInTheDocument();
    expect(screen.getByText(/WebGL Unmasked Renderer/i)).toBeInTheDocument();

    const fpLink = screen.getByRole("link", {
      name: /Launch Fingerprint Lab/i,
    });
    expect(fpLink).toHaveAttribute("href", ROUTES.lab.fingerprint);
  });

  it("renders authentic Persian translations when locale is 'fa'", () => {
    mockLocale = "fa";
    render(<LabLauncherSection locale="fa" />);

    expect(
      screen.getByText(/\/\/ آزمایشگاه تعاملی سیستم‌ها/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ابزارهای برخط تحلیل و عیب‌یابی کلاینت/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/بدون ذخیره لاگ در سرور \/\/ فراخوانی ۱۰۰٪ کلاینت/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /کاوشگر پروتکل DNS امن \(DoH\)/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /اسکنر نشت هویت و آدرس IP/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /بازرس ردپای دیجیتال و مشخصات سخت‌افزار/i,
      }),
    ).toBeInTheDocument();
  });

  it("accepts and renders custom prop overrides for header and tools", () => {
    const customTools = [
      {
        id: "custom-probe",
        headerTag: "PROBE_CUSTOM // TLS AUDIT",
        privacyMode: "ISOLATED WORKER",
        title: "TLS Handshake Inspector",
        pitch: "Analyze TLS cipher suite negotiation and ALPN parameters.",
        chips: ["TLS 1.3", "ALPN h2", "Cipher Suite"],
        href: "/lab/tls",
        ctaLabel: "Launch TLS Lab",
      },
    ];

    render(
      <LabLauncherSection
        locale="en"
        eyebrow="// CUSTOM LAB EYEBROW"
        title="Custom Diagnostic Suite"
        description="Custom client diagnostic description."
        zeroLoggingBadge="ZERO TELEMETRY GUARANTEE"
        exploreHubHref="/custom-lab-hub"
        tools={customTools}
      />,
    );

    expect(screen.getByText(/\/\/ CUSTOM LAB EYEBROW/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Diagnostic Suite/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Custom client diagnostic description\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ZERO TELEMETRY GUARANTEE/i),
    ).toBeInTheDocument();

    const customHubLinks = screen.getAllByRole("link", {
      name: /Explore Full Lab Hub/i,
    });
    expect(customHubLinks[0]).toHaveAttribute("href", "/custom-lab-hub");

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /TLS Handshake Inspector/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("TLS 1.3")).toBeInTheDocument();
  });

  it("renders individual ToolQuickCard with correct semantic elements and ARIA bindings", () => {
    const tool = {
      id: "test-tool",
      headerTag: "PROBE_99 // WEBGPU",
      privacyMode: "GPU SHADER",
      title: "WebGPU Matrix Compute",
      pitch: "Measure floating-point shader execution speed in client GPU.",
      chips: ["WebGPU", "WGSL", "Compute Shader"],
      href: "/lab/webgpu",
      ctaLabel: "Launch Shader Test",
    };

    render(<ToolQuickCard tool={tool} locale="en" />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /WebGPU Matrix Compute/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/PROBE_99 \/\/ WEBGPU/i)).toBeInTheDocument();
    expect(screen.getByText(/GPU SHADER/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Measure floating-point shader execution speed in client GPU\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("WGSL")).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: /Launch Shader Test/i,
    });
    expect(link).toHaveAttribute("href", "/lab/webgpu");
  });
});

describe("LabLauncherSectionSkeleton", () => {
  it("renders skeleton layout and placeholders without crashing", () => {
    const { container } = render(<LabLauncherSectionSkeleton />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-hidden", "true");

    const pulseElements = container.querySelectorAll(".animate-pulse");
    expect(pulseElements.length).toBeGreaterThan(5);
  });
});
