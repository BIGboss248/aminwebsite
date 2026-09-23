import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { ProgressBarProvider } from "react-transition-progress";
import { SiteNavbar, SiteNavbarSkeleton } from "./SiteNavbar";
import { ROUTES } from "@/lib/routes";

const mockMessages = {
  common: {
    brand: "Amin Jamali",
    switch_language: "Language",
    theme_toggle: "Toggle Theme",
  },
  navigation: {
    home: "Home",
    about: "About",
    projects: "Projects",
    lab: "Lab Hub",
    contact: "Contact",
  },
};

const meta: Meta<typeof SiteNavbar> = {
  title: "Navigation/SiteNavbar",
  component: SiteNavbar,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
### Overview
\`SiteNavbar\` is the primary systems cockpit navigation landmark for Amin Jamali's developer portfolio and engineering observatory platform.
Fixed at \`h-14\` (56px) height with glassmorphism and subtle structural borders, it establishes an atmosphere of high-precision engineered minimalism, calm authority, and real-time systems competence.

### Architectural Placement & Design Standards
- **Tripartite Architecture**: Brand Identity & Live Status Beacon (Start) -> Centered Route Links with Bracket Micro-Interactions (Center) -> Segmented Locale Switcher & Theme Toggle (End).
- **RSC & Client Boundaries**: Client Component (\`"use client"\`) managing mobile hamburger open/close states, active pathname tracking via \`usePathname()\`, and keyboard Escape accessibility.
- **Type-Safe Navigation**: All internal destinations are bound to centralized \`ROUTES\` from \`@/lib/routes\`, avoiding hardcoded route strings.
- **BiDi / RTL Support**: Seamless bidirectional mirroring between English (LTR) and Persian (RTL) using Tailwind logical properties and native Vazirmatn typography.
- **Zero Layout Shift (CLS)**: Sized symmetrically at \`h-14\` (56px) with an exact companion loading fallback \`SiteNavbarSkeleton\`.
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <NextIntlClientProvider locale="en" messages={mockMessages}>
          <ProgressBarProvider>
            <Story />
          </ProgressBarProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    brandName: {
      control: "text",
      description:
        "Brand name displayed in the cockpit identity lockup. Defaults to SITE_CONFIG.author.name.",
    },
    currentPath: {
      control: "text",
      description:
        "Active route pathname override for visual state testing ('/', '/about', '/projects', '/lab', '/contact').",
    },
    activeLocale: {
      control: "select",
      options: ["en", "fa"],
      description: "Active locale override ('en' | 'fa').",
    },
    showUptimeBadge: {
      control: "boolean",
      description:
        "Whether to render the '99.9%' telemetry uptime tag on the Lab Hub route link.",
    },
    className: {
      control: "text",
      description:
        "Optional custom CSS class name applied to outer header landmark.",
    },
    onLocaleChange: {
      description:
        "Action spy triggered when locale switcher segment is clicked.",
    },
    onThemeToggle: {
      description: "Action spy triggered when theme toggle button is clicked.",
    },
  },
  args: {
    brandName: "Amin Jamali",
    currentPath: ROUTES.home,
    activeLocale: "en",
    showUptimeBadge: true,
    className: "",
    onLocaleChange: fn(),
    onThemeToggle: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SiteNavbar>;

/**
 * Interactive preview of SiteNavbar in **Light Mode**.
 * Displays high-contrast typography and subtle structural borders on a light laboratory surface.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme presentation demonstrating high contrast, crisp 1px borders, and clear telemetry status.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground min-h-[160px] w-full flex flex-col border border-border">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Light Mode
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive preview of SiteNavbar in **Dark Mode**.
 * Displays the signature systems cockpit aesthetic with Electric Cyan telemetry accents on deep slate void.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme presentation highlighting glowing emerald telemetry beacon and cyan bracket hover states.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground min-h-[160px] w-full flex flex-col border border-border">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Dark Mode
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading skeleton placeholder in **Light Mode** matching the exact h-14 dimensions to eliminate CLS.
 */
export const SkeletonLight: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Skeleton placeholder previewed in Light Mode.",
      },
    },
  },
  render: () => <SiteNavbarSkeleton />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground min-h-[160px] w-full flex flex-col border border-border">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Skeleton (Light)
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading skeleton placeholder in **Dark Mode** matching the exact h-14 dimensions to eliminate CLS.
 */
export const SkeletonDark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Skeleton placeholder previewed in Dark Mode.",
      },
    },
  },
  render: () => <SiteNavbarSkeleton />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground min-h-[160px] w-full flex flex-col border border-border">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Skeleton (Dark)
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
};
