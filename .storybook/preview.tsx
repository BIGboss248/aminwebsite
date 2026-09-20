import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { NextIntlClientProvider } from "next-intl";
import { ProgressBarProvider } from "react-transition-progress";
import enMessages from "../messages/en.json";
import faMessages from "../messages/fa.json";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      // axe-core configuration and options
      config: {
        rules: [],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "var(--background)" },
        { name: "light", value: "var(--background)" },
      ],
    },
  },
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
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
};

export default preview;
