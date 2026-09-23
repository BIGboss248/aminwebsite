import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import { ProgressBarProvider } from "react-transition-progress";
import { HeroSection } from "./HeroSection";
import { HeroSectionSkeleton } from "./HeroSectionSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

const meta: Meta<typeof HeroSection> = {
  title: "Home/HeroSection",
  component: HeroSection,
  tags: ["autodocs", "ai-generated"],
  decorators: [
    (Story, context) => {
      const locale =
        (context.args?.locale as string) ||
        (context.globals?.locale as string) ||
        "en";
      const messages = locale === "fa" ? faMessages : enMessages;

      return (
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProgressBarProvider>
            <Story />
          </ProgressBarProvider>
        </NextIntlClientProvider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component: `
### Overview & Purpose
The **HeroSection** serves as the flagship opening section of the portfolio home page. It establishes Amin Jamali's positioning as a **Pro Frontend Developer & Solutions Architect**, proving end-to-end competence across frontend craftsmanship, CI/CD pipelines, networking, and cloud infrastructure.

### Architecture & Boundaries
- **Server-First (RSC):** Rendered as a React Server Component with zero client-side JavaScript overhead.
- **Multilingual (i18n):** Native support for English (\`en\`, LTR) and Persian (\`fa\`, RTL) with bidirectional layout mirroring.
- **Production Design Tokens:** Uses semantic classes (\`bg-background\`, \`text-foreground\`, \`border-border\`, \`bg-card\`, \`text-primary\`) with zero hardcoded palette colors.

### Key Interactions
- **Primary CTA:** Navigates to direct booking / contact channel.
- **Secondary CTA:** Navigates to technical case studies.
- **Lab CTA:** Launches interactive browser diagnostic tools (DoH Prober, IP Leak Scanner).
- **Telemetry HUD:** Live systems preview displaying edge latency, pipeline health, and infrastructure type.

### Accessibility & Motion
- Single semantic \`<h1>\` for primary headline.
- \`aria-labelledby="hero-heading"\` section landmark.
- Interactive targets meet or exceed $\\ge 44\\text{px} \\times 44\\text{px}$.
- Motion reduction (\`prefers-reduced-motion\`) supported on pulse indicators.
`,
      },
    },
  },
  argTypes: {
    locale: {
      control: "select",
      options: ["en", "fa"],
      description:
        "Active locale determining text language and layout direction",
    },
    availabilityStatus: {
      control: "select",
      options: ["available", "busy", "offline"],
      description: "Availability indicator state",
    },
    availabilityText: {
      control: "text",
      description: "Availability pill label override",
    },
    title: {
      control: "text",
      description: "Main editorial headline override",
    },
    description: {
      control: "text",
      description: "Narrative value proposition override",
    },
    primaryCtaText: {
      control: "text",
      description: "Primary CTA button text",
    },
    secondaryCtaText: {
      control: "text",
      description: "Secondary CTA button text",
    },
    labCtaText: {
      control: "text",
      description: "Lab tool CTA text",
    },
  },
  args: {
    locale: "en",
    availabilityStatus: "available",
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

/**
 * HeroSection rendered in Light Mode with high-contrast container.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme preview demonstrating crisp borders, high-contrast typography, and cyan primary accents.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Light Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * HeroSection rendered in Dark Mode with deep obsidian surfaces and ambient cyan glow.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme preview showing obsidian canvas (#050505), ambient neon glow, and high-visibility status indicators.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Dark Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Suspense Skeleton Fallback rendered in Light Mode.
 */
export const SkeletonLight: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light mode skeleton loading state matching layout geometry to prevent Cumulative Layout Shift (CLS).",
      },
    },
  },
  render: () => <HeroSectionSkeleton />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Skeleton (Light)
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * Suspense Skeleton Fallback rendered in Dark Mode.
 */
export const SkeletonDark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark mode skeleton loading state matching layout geometry to prevent Cumulative Layout Shift (CLS).",
      },
    },
  },
  render: () => <HeroSectionSkeleton />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Skeleton (Dark)
        </span>
        <Story />
      </div>
    ),
  ],
};
