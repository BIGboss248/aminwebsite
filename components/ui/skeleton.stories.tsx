import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### Overview
\`Skeleton\` is a high-precision, accessible loading placeholder primitive that consumes the central \`--skeleton\` design tokens across both light and dark themes.

### Key Capabilities
- **Central Design Tokens**: Leverages \`bg-skeleton\` calibrated for non-text contrast against both canvas and elevated cards.
- **WCAG 2.1 Non-text Contrast (1.4.11)**: Subtle structural boundary delineation ensures placeholder shape is discernible.
- **Vestibular & Motion Safety (WCAG 2.2.2)**: Pulse animation halts automatically under \`prefers-reduced-motion: reduce\`.
- **Windows High Contrast Mode**: Transparent outline fallbacks prevent placeholders from disappearing in \`forced-colors: active\`.
- **Screen Reader Semantics**: Default \`aria-hidden="true"\` with optional \`accessibleLabel\` and \`role="status"\`.
`,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS class names to apply sizing, radius, or layout styling",
    },
    accessibleLabel: {
      control: "text",
      description: "Optional accessible label when skeleton acts as a standalone status announcer",
    },
  },
  args: {
    className: "h-6 w-48",
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * Composite skeleton layout previewed in **Light Mode**.
 * Uses production semantic tokens and authentic light container.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Accessible skeleton card layout displayed on light background container.",
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-3 w-64">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[280px]">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Light Mode
        </span>
        <Story />
      </div>
    ),
  ],
}

/**
 * Composite skeleton layout previewed in **Dark Mode**.
 * Uses production semantic tokens and authentic dark obsidian container.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Accessible skeleton card layout displayed on dark obsidian background container.",
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-3 w-64">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[280px]">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Dark Mode
        </span>
        <Story />
      </div>
    ),
  ],
}

/**
 * Single skeleton placeholder block in **Light Mode**.
 */
export const SkeletonLight: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Single skeleton loading placeholder in Light Mode.",
      },
    },
  },
  render: () => <Skeleton className="h-8 w-36 rounded-md" />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Light)
        </span>
        <Story />
      </div>
    ),
  ],
}

/**
 * Single skeleton placeholder block in **Dark Mode**.
 */
export const SkeletonDark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Single skeleton loading placeholder in Dark Mode.",
      },
    },
  },
  render: () => <Skeleton className="h-8 w-36 rounded-md" />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Dark)
        </span>
        <Story />
      </div>
    ),
  ],
}

