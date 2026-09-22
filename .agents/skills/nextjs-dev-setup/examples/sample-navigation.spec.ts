import { test, expect } from "@playwright/test";

test("should navigate across pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});

