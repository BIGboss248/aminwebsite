import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { ProgressBarProvider } from "react-transition-progress";
import { MobileNavDrawer, MobileNavDrawerSkeleton } from "./MobileNavDrawer";
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
    sys_online: "ONLINE // 9.4ms",
    route_topology: "ROUTE_TOPOLOGY",
    system_telemetry: "SYSTEM_TELEMETRY",
  },
};

const meta: Meta<typeof MobileNavDrawer> = {
  title: "Navigation/MobileNavDrawer",
  component: MobileNavDrawer,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
### Overview
\`MobileNavDrawer\` is the dedicated responsive Systems Cockpit Navigation Drawer for Amin Jamali's developer portfolio and engineering laboratory platform.
It slides in from the trailing edge (right in LTR, left in RTL) on mobile and tablet viewports (< 1024px), providing direct access to the platform's core route topology, live system telemetry, and embedded utility switchers.

### Architectural Placement & Boundaries
- **RSC & Client Boundaries**: Client Component (\`"use client"\`) with ARIA modal dialog semantics, keyboard Escape listener, and body scroll locking.
- **Strict Theme Tokens**: Uses production semantic tokens from \`app/globals.css\` (\`bg-card\`, \`text-foreground\`, \`border-border\`, \`text-primary\`) with high-contrast dual-theme isolation.
- **BiDi RTL/LTR Parity**: Native bidirectional support with mirror sliding axes, logical directional padding (\`ms-\`, \`pe-\`), and directional chevron adaptation.
- **Ergonomics & Touch**: All interactive touch targets meet or exceed 44px × 44px.
- **Zero Layout Shift (CLS)**: Sized symmetrically with companion loading fallback \`MobileNavDrawerSkeleton\`.
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
    isOpen: {
      control: "boolean",
      description: "Controls whether the navigation drawer is visibly open.",
    },
    brandName: {
      control: "text",
      description: "Brand name in the cockpit identity lockup. Defaults to SITE_CONFIG.author.name.",
    },
    currentPath: {
      control: "text",
      description: "Active route pathname override for visual testing ('/', '/about', '/projects', '/lab', '/contact').",
    },
    activeLocale: {
      control: "select",
      options: ["en", "fa"],
      description: "Active locale override ('en' | 'fa').",
    },
    showUptimeBadge: {
      control: "boolean",
      description: "Controls visibility of the 99.9% telemetry uptime badge on the Lab Hub node.",
    },
    onClose: {
      action: "close",
      description: "Callback fired when the drawer requests dismissal.",
    },
    onNavigate: {
      action: "navigate",
      description: "Callback fired when a route node link is clicked.",
    },
    onLocaleChange: {
      action: "localeChange",
      description: "Callback fired when the locale toggle is clicked.",
    },
    onThemeToggle: {
      action: "themeToggle",
      description: "Callback fired when the theme toggle is clicked.",
    },
  },
  args: {
    isOpen: true,
    brandName: "Amin Jamali",
    currentPath: ROUTES.home,
    activeLocale: "en",
    showUptimeBadge: true,
    onClose: fn(),
    onNavigate: fn(),
    onLocaleChange: fn(),
    onThemeToggle: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof MobileNavDrawer>;

/**
 * Primary Light Mode variant displayed in a dedicated light canvas card
 * with high-contrast production semantic tokens.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "MobileNavDrawer previewed in Light Mode with high-contrast slate surfaces and semantic borders.",
      },
    },
  },
  render: (args) => (
    <div className="light bg-background text-foreground p-6 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full min-h-[640px] relative overflow-hidden">
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
        Light Mode
      </span>
      <div className="relative w-full h-[580px] overflow-hidden rounded-lg border border-border bg-muted/20">
        <MobileNavDrawer {...args} className="absolute inset-y-0 end-0" />
      </div>
    </div>
  ),
};

/**
 * Primary Dark Mode variant displayed in a dedicated dark canvas card
 * with deep obsidian surfaces, structural borders, and electric cyan accents.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "MobileNavDrawer previewed in Dark Mode with telemetry indicators and electric cyan borders.",
      },
    },
  },
  render: (args) => (
    <div className="dark bg-background text-foreground p-6 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full min-h-[640px] relative overflow-hidden">
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
        Dark Mode
      </span>
      <div className="relative w-full h-[580px] overflow-hidden rounded-lg border border-border bg-muted/20">
        <MobileNavDrawer {...args} className="absolute inset-y-0 end-0" />
      </div>
    </div>
  ),
};

/**
 * Skeleton loading fallback in Light Mode matching the exact drawer geometry to prevent CLS.
 */
export const SkeletonLight: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "MobileNavDrawerSkeleton loading fallback previewed in Light Mode with subtle shimmer pulses.",
      },
    },
  },
  render: () => (
    <div className="light bg-background text-foreground p-6 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full min-h-[640px] relative overflow-hidden">
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
        Skeleton (Light)
      </span>
      <div className="relative w-full h-[580px] overflow-hidden rounded-lg border border-border bg-muted/20 flex justify-end">
        <MobileNavDrawerSkeleton className="h-full" />
      </div>
    </div>
  ),
};

/**
 * Skeleton loading fallback in Dark Mode matching the exact drawer geometry to prevent CLS.
 */
export const SkeletonDark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "MobileNavDrawerSkeleton loading fallback previewed in Dark Mode with dark obsidian pulses.",
      },
    },
  },
  render: () => (
    <div className="dark bg-background text-foreground p-6 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full min-h-[640px] relative overflow-hidden">
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
        Skeleton (Dark)
      </span>
      <div className="relative w-full h-[580px] overflow-hidden rounded-lg border border-border bg-muted/20 flex justify-end">
        <MobileNavDrawerSkeleton className="h-full" />
      </div>
    </div>
  ),
};

