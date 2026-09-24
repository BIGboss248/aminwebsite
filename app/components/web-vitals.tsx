"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals(): null {
  useReportWebVitals((metric) => {
    if (
      process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === "true" ||
      process.env.NODE_ENV === "development"
    ) {
      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[Web Vitals] ${metric.name}: value=${Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value,
          )} (rating: ${metric.rating || "n/a"})`,
          metric,
        );
      }

      if (
        typeof window !== "undefined" &&
        navigator.sendBeacon &&
        process.env.NEXT_PUBLIC_VITALS_ENDPOINT
      ) {
        navigator.sendBeacon(
          process.env.NEXT_PUBLIC_VITALS_ENDPOINT,
          JSON.stringify(metric),
        );
      }
    }
  });

  return null;
}
