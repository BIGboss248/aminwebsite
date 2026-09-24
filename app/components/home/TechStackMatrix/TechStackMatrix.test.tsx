import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TechStackMatrix } from "./TechStackMatrix";
import { TechStackMatrixSkeleton } from "./TechStackMatrixSkeleton";
import { SkillBadge } from "./SkillBadge";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";
import { Code2 } from "lucide-react";
import type { SkillItem } from "./TechStackMatrix.types";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "home.tech_matrix") {
      return (dict.home.tech_matrix as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("TechStackMatrix (Baseline TDD Suite)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  describe("Section & Header Rendering", () => {
    it("renders section eyebrow, heading, and description in English", () => {
      render(<TechStackMatrix locale="en" />);

      expect(
        screen.getByText("// 04. COMPETENCIES & SYSTEMS TECH MATRIX"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: "Engineered Systems Architecture & Stack",
          level: 2,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Categorized technical capabilities across client architecture/i),
      ).toBeInTheDocument();
    });

    it("renders section telemetry summary stats", () => {
      render(<TechStackMatrix locale="en" />);

      expect(screen.getByText("YEARS IN PRODUCTION")).toBeInTheDocument();
      expect(screen.getByText("6+ YRS")).toBeInTheDocument();
      expect(screen.getByText("CORE TECHNOLOGIES")).toBeInTheDocument();
      expect(screen.getByText("20+ TOOLS")).toBeInTheDocument();
      expect(screen.getByText("RFC PROTOCOLS")).toBeInTheDocument();
      expect(screen.getByText("100% AUDITED")).toBeInTheDocument();
    });

    it("renders section correctly with Persian locale", () => {
      mockLocale = "fa";
      render(<TechStackMatrix locale="fa" />);

      expect(
        screen.getByText("// ۰۴. ماتریس مهارت‌ها و معماری سیستم"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: "معماری مهندسی سیستم‌ها و پشته فناوری",
          level: 2,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("+۶ سال")).toBeInTheDocument();
      expect(screen.getByText("+۲۰ ابزار")).toBeInTheDocument();
    });
  });

  describe("Architectural Domains Bento Grid", () => {
    it("renders all four domain titles and summaries", () => {
      render(<TechStackMatrix locale="en" />);

      // Frontend
      expect(screen.getByText("Frontend & Client Architecture")).toBeInTheDocument();
      expect(
        screen.getByText(/Zero-CLS architectures, sub-800ms LCP/i),
      ).toBeInTheDocument();
      expect(screen.getAllByText("5 Core Systems")).toHaveLength(2);

      // Systems / Backend
      expect(screen.getByText("Systems & Distributed Backend")).toBeInTheDocument();
      expect(
        screen.getByText(/High-throughput concurrent microservices/i),
      ).toBeInTheDocument();
      expect(screen.getByText("6 Core Systems")).toBeInTheDocument();

      // Cloud / DevOps
      expect(screen.getByText("Cloud, DevOps & Infrastructure")).toBeInTheDocument();
      expect(
        screen.getByText(/Multi-arch OCI containerization/i),
      ).toBeInTheDocument();

      // Security / Protocols
      expect(screen.getByText("Security & Network Protocols")).toBeInTheDocument();
      expect(
        screen.getByText(/Zero backend logging, client-side cryptographic hashing/i),
      ).toBeInTheDocument();
      expect(screen.getByText("4 Core Protocols")).toBeInTheDocument();
    });

    it("renders core skill badges across all domains", () => {
      render(<TechStackMatrix locale="en" />);

      // Frontend skills
      expect(screen.getByText("Next.js 15")).toBeInTheDocument();
      expect(screen.getByText("TypeScript 5")).toBeInTheDocument();
      expect(screen.getByText("React 19")).toBeInTheDocument();
      expect(screen.getByText("Tailwind CSS v4")).toBeInTheDocument();
      expect(screen.getByText("Framer Motion")).toBeInTheDocument();

      // Backend skills
      expect(screen.getByText("Go (Golang)")).toBeInTheDocument();
      expect(screen.getByText("Python 3.12+")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
      expect(screen.getByText("Redis")).toBeInTheDocument();
      expect(screen.getByText("gRPC / Protobuf")).toBeInTheDocument();

      // DevOps skills
      expect(screen.getByText("Docker")).toBeInTheDocument();
      expect(screen.getByText("Kubernetes")).toBeInTheDocument();
      expect(screen.getByText("GitHub Actions")).toBeInTheDocument();
      expect(screen.getByText("Linux Systems")).toBeInTheDocument();

      // Security skills
      expect(screen.getByText("DNS over HTTPS")).toBeInTheDocument();
      expect(screen.getByText("TLS 1.3 / Crypto")).toBeInTheDocument();
      expect(screen.getByText("STUN / WebRTC")).toBeInTheDocument();
      expect(screen.getByText("Hardware Entropy")).toBeInTheDocument();
    });
  });

  describe("SkillBadge Interactive Behavior & Micro-Popover", () => {
    const mockSkill: SkillItem = {
      id: "nextjs",
      nameKey: "skill_nextjs_name",
      tagKey: "skill_nextjs_tag",
      expKey: "skill_nextjs_exp",
      usecaseKey: "skill_nextjs_usecase",
      icon: Code2,
      domain: "frontend",
    };

    it("renders badge with icon, name, and tag", () => {
      render(<SkillBadge skill={mockSkill} accentColor="cyan" />);

      expect(screen.getByText("Next.js 15")).toBeInTheDocument();
      expect(screen.getByText("App Router / RSC")).toBeInTheDocument();
    });

    it("reveals micro-popover on hover or focus", () => {
      render(<SkillBadge skill={mockSkill} accentColor="cyan" />);

      const badge = screen.getByRole("button", { name: /Next.js 15/i });
      expect(badge).toBeInTheDocument();

      // Hover
      fireEvent.mouseEnter(badge);
      expect(screen.getByText("4+ Years Production")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Server Components, Streaming SSR & Edge Runtime optimizations/i,
        ),
      ).toBeInTheDocument();

      // Mouse leave
      fireEvent.mouseLeave(badge);
      expect(screen.queryByText("4+ Years Production")).not.toBeInTheDocument();
    });

    it("has accessible keyboard navigation and ARIA attributes", () => {
      render(<SkillBadge skill={mockSkill} accentColor="cyan" />);

      const badge = screen.getByRole("button", { name: /Next.js 15/i });
      expect(badge).toHaveAttribute("tabIndex", "0");

      fireEvent.focus(badge);
      expect(screen.getByText("4+ Years Production")).toBeInTheDocument();

      fireEvent.blur(badge);
      expect(screen.queryByText("4+ Years Production")).not.toBeInTheDocument();
    });
  });

  describe("TechStackMatrixSkeleton", () => {
    it("renders accessible loading skeleton with aria-busy", () => {
      render(<TechStackMatrixSkeleton />);

      const section = screen.getByRole("region", {
        name: /Loading competencies and tech matrix/i,
      });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute("aria-busy", "true");
    });
  });
});

