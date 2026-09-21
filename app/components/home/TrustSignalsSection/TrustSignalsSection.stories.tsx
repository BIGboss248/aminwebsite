import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { ProgressBarProvider } from "react-transition-progress";
import { TrustSignalsSection } from "./TrustSignalsSection";
import { TrustSignalsSectionSkeleton } from "./TrustSignalsSectionSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

const meta: Meta<typeof TrustSignalsSection> = {
  title: "Home/TrustSignalsSection",
  component: TrustSignalsSection,
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
The **TrustSignalsSection** serves as the empirical credibility and verification anchor placed directly beneath the hero section. It organizes verified proof into an asymmetrical **12-Column Bento Grid Matrix** highlighting production Web Vitals from deployed enterprise platforms, a dual academic foundation in Computer Science & Financial Management, verified professional certifications, and global bilingual fluency.

### Architecture & Boundaries
- **Server-First (RSC):** Rendered as an asynchronous React Server Component with zero client bundle weight.
- **Multilingual (i18n):** Fully localized for English (\`en\`, LTR) and Persian (\`fa\`, RTL) with natural bidirectional reading order.
- **Production Design Tokens:** Built strictly with semantic theme tokens (\`bg-background\`, \`text-foreground\`, \`border-border\`, \`bg-card\`, \`bg-muted\`). Zero hardcoded hex colors.
- **Suspense Companion Skeleton:** Accompanied by \`TrustSignalsSectionSkeleton\` matching exact layout geometry to prevent CLS.

### Four Bento Cells
1. **Production Web Vitals:** Live verifiable metrics from deployed production systems (<0.8s LCP, 99+ Lighthouse, 0.00 CLS).
2. **Dual Academic Foundation:** B.S. in Computer Science & B.S. in Financial Management.
3. **Professional Certifications:** Meta/Coursera Full-Stack, DeepLearning.AI, Cloud & TypeScript specializations.
4. **Global Bilingual Fluency:** Native Persian (RTL) & Professional English (LTR) with 100% BiDi architecture readiness.
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
    eyebrow: {
      control: "text",
      description: "Section eyebrow label override",
    },
    title: {
      control: "text",
      description: "Main section headline override",
    },
    description: {
      control: "text",
      description: "Narrative subtitle / description override",
    },
    actionHref: {
      control: "text",
      description: "Credentials action link navigation target URL",
    },
  },
  args: {
    locale: "en",
  },
};

export default meta;
type Story = StoryObj<typeof TrustSignalsSection>;

/**
 * TrustSignalsSection rendered in Light Mode with crisp borders and high-contrast typography.
 */
export const Light: Story = {
  parameters: {
    themes: { themeOverride: "light" },
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme preview demonstrating semantic cards, high-contrast typography, and emerald/cyan status indicators.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Light Mode
        </span>
        <Story />
      </div>
    ),
  ],
};

/**
 * TrustSignalsSection rendered in Dark Mode with deep obsidian surfaces and ambient cyan glow.
 */
export const Dark: Story = {
  parameters: {
    themes: { themeOverride: "dark" },
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme preview showing obsidian canvas, subtle telemetry glows, and high-visibility status badges.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
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
          "Light mode skeleton loading state matching Bento layout geometry to eliminate Cumulative Layout Shift (CLS).",
      },
    },
  },
  render: () => <TrustSignalsSectionSkeleton />,
  decorators: [
    (Story) => (
      <div className="light bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
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
          "Dark mode skeleton loading state matching Bento layout geometry to eliminate Cumulative Layout Shift (CLS).",
      },
    },
  },
  render: () => <TrustSignalsSectionSkeleton />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-8 rounded-xl border border-border shadow-xs flex flex-col items-center justify-center gap-3 w-full">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground self-start">
          Skeleton (Dark)
        </span>
        <Story />
      </div>
    ),
  ],
};
