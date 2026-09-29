import React from "react";
import { render, screen } from "@testing-library/react";
import { CertificationCard } from "./CertificationCard";
import type { CertificationItem } from "./SinglePageCertificationsSection.types";
import enMessages from "@/messages/en.json";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    return (key: string) => {
      const fullPath = namespace ? `${namespace}.${key}` : key;
      const pathParts = fullPath.split(".");
      let current: unknown = enMessages;
      for (const part of pathParts) {
        if (current && typeof current === "object" && part in current) {
          current = (current as Record<string, unknown>)[part];
        } else {
          return key;
        }
      }
      return typeof current === "string" ? current : key;
    };
  },
}));

describe("SinglePageCertificationsSection Adversarial Edge Cases", () => {
  it("handles certification items with missing optional credentialId and credentialUrl without errors", () => {
    const minimalCert: CertificationItem = {
      id: "minimal_cert",
      tag: "CORE_SKILLS",
      badge: "VERIFIED",
      title: "Self-Directed Systems Engineering",
      issuer: "Independent Research",
      summary: "Autonomous deep-dive into POSIX kernel and memory layout architectures.",
      skills: ["Linux", "C", "Assembly"],
    };

    render(<CertificationCard certification={minimalCert} locale="en" />);

    expect(screen.getByText("Self-Directed Systems Engineering")).toBeInTheDocument();
    expect(screen.getByText("Independent Research")).toBeInTheDocument();
    expect(screen.getByText("CORE_SKILLS")).toBeInTheDocument();
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();

    // Verify link is not rendered when credentialUrl is undefined
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles empty skills array gracefully", () => {
    const noSkillsCert: CertificationItem = {
      id: "no_skills_cert",
      tag: "STANDARDS",
      badge: "OFFICIAL",
      title: "RFC Protocol Adherence Audit",
      issuer: "Standards Working Group",
      summary: "Audit certification on RFC 8484 and RFC 5389 compliance.",
      skills: [],
    };

    const { container } = render(<CertificationCard certification={noSkillsCert} locale="en" />);

    expect(screen.getByText("RFC Protocol Adherence Audit")).toBeInTheDocument();
    // Container should not fail or throw
    expect(container).toBeInTheDocument();
  });

  it("handles extremely long title and skill chips without layout breakage", () => {
    const longCert: CertificationItem = {
      id: "long_cert",
      tag: "EXTREMELY_LONG_CATEGORY_HEADER_SPECIALIZATION_SYSTEMS_TRACK",
      badge: "ULTRA_MAX_CREDENTIAL_SPECIALIZATION_BADGE",
      title:
        "Advanced Enterprise Microservices Distributed Event-Driven Architecture, High-Availability Cloud Native Resilient Infrastructure Design, and Automated Multi-Region Disaster Recovery",
      issuer: "International Consortium of Distributed Computing & Systems Architecture",
      summary:
        "In-depth comprehensive curriculum evaluating high-scale partition tolerance, consensus protocols, zero-downtime database migrations, and complex multi-cloud hybrid topology failovers.",
      credentialId: "ENTERPRISE-SPEC-ID-99999-88888-77777-66666-55555",
      credentialUrl: "https://example.com/verify/long-credential",
      skills: [
        "Distributed Systems Consensus Protocols",
        "High-Throughput Partition Tolerance",
        "Zero-Downtime Multi-Region Database Migrations",
      ],
    };

    render(<CertificationCard certification={longCert} locale="en" />);

    expect(
      screen.getByText(/Advanced Enterprise Microservices Distributed Event-Driven Architecture/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("ENTERPRISE-SPEC-ID-99999-88888-77777-66666-55555"),
    ).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/verify/long-credential");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
