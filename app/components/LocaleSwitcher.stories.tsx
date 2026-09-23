import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { NextIntlClientProvider } from "next-intl";
import { ProgressBarProvider } from "react-transition-progress";
import { LocaleSwitcher, LocaleSwitcherSkeleton } from "./LocaleSwitcher";

const mockMessages = {
  common: {
    switch_language: "Language",
    english: "English",
    persian: "فارسی",
  },
};

const meta: Meta<typeof LocaleSwitcher> = {
  title: "Navigation/LocaleSwitcher",
  component: LocaleSwitcher,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### Overview
\`LocaleSwitcher\` is a segmented cockpit utility control enabling instant, seamless switching between English (\`en\` - LTR) and Persian (\`fa\` - RTL).

### Architectural Placement & Design Standards
- **Segmented Pill Pattern**: Avoids hidden dropdown menus by providing instant tactile feedback with visual active state telemetry.
- **RSC & Client Boundaries**: Push-down leaf Client Component (\`"use client"\`) coordinating with Next.js App Router routing.
- **Navigation & Progress**: Integrated with \`next-intl\` localized routing and \`react-transition-progress\` top bar animation.
- **Bidirectional Parity**: Enforces flexbox logical sorting where Persian readers encounter \`Globe -> FA (فارسی) -> EN\` in RTL mode.
- **Icon Integrity**: Leading geometric wireframe globe icon retains physical real-world orientation without horizontal mirroring in RTL.
- **Zero Layout Shift (CLS)**: Sized symmetrically at 36px visual height with matching \`LocaleSwitcherSkeleton\` fallback.
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <ProgressBarProvider>
          <Story />
        </ProgressBarProvider>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    currentLocale: {
      control: "select",
      options: ["en", "fa"],
      description:
        "Override the currently active locale ('en' | 'fa'). Defaults to detected locale via next-intl.",
    },
    showAutonyms: {
      control: "boolean",
      description:
        "Whether to render native script autonyms alongside uppercase locale codes.",
    },
    className: {
      control: "text",
      description:
        "Optional custom CSS classes applied to the outer pill container.",
    },
    onLocaleChange: {
      description:
        "Action callback triggered when a locale segment is clicked.",
    },
  },
  args: {
    currentLocale: "en",
    showAutonyms: true,
    className: "",
    onLocaleChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof LocaleSwitcher>;

/**
 * Interactive preview of LocaleSwitcher in **Light Mode**.
 * Displays crisp high-contrast typography and subtle borders on a light laboratory surface.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme presentation showing the active English locale segment with clean elevated surfaces.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[260px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Light Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive preview of LocaleSwitcher in **Dark Mode**.
 * Displays the signature systems cockpit aesthetic with Electric Cyan telemetry accents on deep slate.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme presentation displaying active segment luminescence and subtle cyan telemetry dot.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[260px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Dark Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Skeleton loading placeholder in **Light Mode** matching the exact component dimensions to eliminate CLS.
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
  render: () => <LocaleSwitcherSkeleton />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[260px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Light)
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Skeleton loading placeholder in **Dark Mode** matching the exact component dimensions to eliminate CLS.
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
  render: () => <LocaleSwitcherSkeleton />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[260px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Dark)
        </span>
        <Story />
      </div>
    ),
  ],
};
