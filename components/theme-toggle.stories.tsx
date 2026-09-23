import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { ThemeToggle, ThemeToggleSkeleton } from "./theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Navigation/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### Overview
\`ThemeToggle\` is a high-precision, interactive client-side theme switcher designed for Next.js App Router applications.

### Key Capabilities
- **Theme Orchestration**: Seamlessly transitions between \`light\` and \`dark\` modes via \`next-themes\`.
- **View Transitions API**: Triggers a circular expanding clip-path animation anchored at the user's click coordinates when supported by the browser.
- **Accessibility & Motion**: Automatically respects \`prefers-reduced-motion: reduce\` by bypassing animations and directly updating the theme.
- **Hydration Safe**: Utilizes \`React.useSyncExternalStore\` to eliminate layout shift or flash of incorrect theme (FOIT) during initial mount.
- **BiDi / RTL Ready**: Full support for bidirectional layouts using logical CSS properties.
`,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "Optional custom CSS class names to apply to the toggle button",
    },
    onToggle: {
      description:
        "Callback invoked when theme is toggled with next theme string ('light' | 'dark')",
    },
  },
  args: {
    className: "",
    onToggle: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

/**
 * Interactive preview of ThemeToggle in **Light Mode**.
 * Displayed on an authentic light canvas with crisp contrast.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme state displaying the Sun icon against a light surface background.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Light Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive preview of ThemeToggle in **Dark Mode**.
 * Displayed on an obsidian dark surface with crisp contrast.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme state displaying the Moon icon against a deep obsidian background.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Dark Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Skeleton loading placeholder in **Light Mode** matching the component's geometry to eliminate CLS.
 */
export const SkeletonLight: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Skeleton loading placeholder previewed in Light Mode.",
      },
    },
  },
  render: () => <ThemeToggleSkeleton />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Light)
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Skeleton loading placeholder in **Dark Mode** matching the component's geometry to eliminate CLS.
 */
export const SkeletonDark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Skeleton loading placeholder previewed in Dark Mode.",
      },
    },
  },
  render: () => <ThemeToggleSkeleton />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 min-w-[220px]">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
          Skeleton (Dark)
        </span>
        <Story />
      </div>
    ),
  ],
};
