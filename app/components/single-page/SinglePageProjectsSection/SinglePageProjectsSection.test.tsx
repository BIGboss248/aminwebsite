import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SinglePageProjectsSection } from "./SinglePageProjectsSection";
import { SinglePageProjectsSkeleton } from "./SinglePageProjectsSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "single_page.projects") {
      const keys = key.split(".");
      let val: any = dict.single_page.projects;
      for (const k of keys) {
        val = val?.[k];
      }
      return typeof val === "string" ? val : key;
    }
    return key;
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

describe("SinglePageProjectsSection Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders section heading, description, and default all category cards in English", () => {
    mockLocale = "en";
    render(<SinglePageProjectsSection locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Delivered Systems & Peer-Reviewed Research/i,
      }),
    ).toBeInTheDocument();

    // Check authentic production items
    expect(
      screen.getByText(/Setayesh Parts \| Specialized Tuning & Performance Parts/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bahar Trade Co\. \| Premium Iron Ore & Steel Supply/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Flutter Currency & Note App/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/IT & Infrastructure Tool-box/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bahar Trade IT Automation & Database Tuning/i),
    ).toBeInTheDocument();

    // Check authentic peer-reviewed research items with DOIs
    expect(
      screen.getByText(/ParsBERT-XGBoost Commodity Volatility Model/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/DQN & LSTM Market Volatility Forecasting/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Empirical Study on IT Automation & Next\.js SSR Web Optimization/i),
    ).toBeInTheDocument();

    // Check DOI link elements
    const doiLinks = screen.getAllByTitle(/DOI Publication/i);
    expect(doiLinks.length).toBe(3);
    expect(doiLinks[0]).toHaveAttribute("href", "https://doi.org/10.61838/jafci.485");

    // Check GitHub link elements
    const githubLinks = screen.getAllByTitle(/GitHub Repository/i);
    expect(githubLinks.length).toBe(3); // Setayesh parts, Flutter currency, Tool-box
    expect(githubLinks.some((l) => l.getAttribute("href") === "https://github.com/BIGboss248/setayeshparts")).toBe(true);
    expect(githubLinks.some((l) => l.getAttribute("href") === "https://github.com/BIGboss248/flutter-currency-project")).toBe(true);
    expect(githubLinks.some((l) => l.getAttribute("href") === "https://github.com/BIGboss248/Tool-box")).toBe(true);

    // Check Live link elements
    const liveLinks = screen.getAllByTitle(/Live Site/i);
    expect(liveLinks.length).toBe(2); // Setayesh parts & Bahar trade co
    expect(liveLinks.some((l) => l.getAttribute("href") === "https://setayesh.aminjamali.site/")).toBe(true);
    expect(liveLinks.some((l) => l.getAttribute("href") === "https://bahartradeco.com/en")).toBe(true);
  });

  it("filters items when clicking category tabs", () => {
    mockLocale = "en";
    render(<SinglePageProjectsSection locale="en" />);

    const researchTab = screen.getByRole("tab", {
      name: /ORCID Research \(DOIs\)/i,
    });
    fireEvent.click(researchTab);

    // Research items should be visible
    expect(
      screen.getByText(/ParsBERT-XGBoost Commodity Volatility Model/i),
    ).toBeInTheDocument();

    // Production item should not be in the filtered list
    expect(
      screen.queryByText(/Setayesh Parts \| Specialized Tuning & Performance Parts/i),
    ).not.toBeInTheDocument();

    const productionTab = screen.getByRole("tab", {
      name: /Production Systems/i,
    });
    fireEvent.click(productionTab);

    expect(
      screen.getByText(/Setayesh Parts \| Specialized Tuning & Performance Parts/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/ParsBERT-XGBoost Commodity Volatility Model/i),
    ).not.toBeInTheDocument();
  });

  it("renders Persian translations when locale='fa'", () => {
    mockLocale = "fa";
    render(<SinglePageProjectsSection locale="fa" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /سامانه‌های عملیاتی و پژوهش‌های داوری‌شده/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/ستایش پارتس \| قطعات تخصصی تیونینگ و عملکرد خودرو/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/شرکت بهار تجارت \| تأمین سنگ آهن و محصولات فولادی/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/اپلیکیشن مدیریت ارز و یادداشت فلاتر/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/جعبه‌ابزار و ابزارهای زیرساخت IT و شبکه/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/اتوماسیون زیرساخت IT و بهینه‌سازی دیتابیس بهار تجارت/i),
    ).toBeInTheDocument();
  });

  it("renders SinglePageProjectsSkeleton fallback with pulse animation", () => {
    const { container } = render(<SinglePageProjectsSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
