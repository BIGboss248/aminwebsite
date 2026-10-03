# Next.js Instant Navigation, Prefetching & Granular Caching Architecture

This guide details the core principles, patterns, and validation workflows for building React components and routes that navigate instantly in Next.js App Router applications.

---

## 1. What "Instant Navigation" Means

A navigation is **instant** when the browser starts rendering the new page the moment the user clicks, with static, cached, and fallback skeleton content displaying immediately, while the server streams dynamic content into its fallbacks in the background.

```
User Click / Navigation
 │
 ├──▶ [Instant UI Phase (0ms)]
 │     ├── Static Layout Shell
 │     ├── Cached Sub-components ('use cache' / Warm Cache)
 │     ├── Granular <Suspense> Skeleton Fallbacks
 │     └── Prefetched Per-link URL Data (params & searchParams)
 │
 └──▶ [Streaming Phase (Async)]
       └── Server resolves dynamic DB/API fetches -> Streams into Suspense slots
```

### Direct Page Loads vs. Client Navigations

| Dimension | Direct Visit (Hard Page Load) | Client Navigation (Soft Navigation via `<Link>`) |
| :--- | :--- | :--- |
| **Render Root** | Entire tree renders from the document root. | Only re-renders components **below the shared layout**. |
| **Shell Source** | Static shell served as initial HTML (e.g. from CDN). | App Shell prefetched in background by `<Link>`. |
| **`<Suspense>` Boundary Scope** | Caught by the nearest `<Suspense>` anywhere in the full tree (including root layout). | `<Suspense>` boundaries **above** the shared layout do NOT trigger; only boundaries below the shared layout take effect. |
| **`useSearchParams()`** | Suspends during SSR (search params not available at build time). | Resolves **synchronously** (router already has URL params from link). |

---

## 2. The Three Levers for Instant Components

When designing components and pages, reach for these three levers:

### Lever 1: Push Down Async I/O
Extract dynamic, uncached, or request-specific work (`await params`, `await searchParams`, `cookies()`, `headers()`, uncached `fetch()`) into leaf sub-components wrapped in `<Suspense>`.

- **Result**: The parent container and static siblings lift into the **Static Shell** and render immediately on navigation.

```tsx
// ✅ GOOD: Static parent lifts into shell; dynamic work pushed down
export default function ProductPage({ params }: PageProps<'/store/[slug]'>) {
  return (
    <div className="container mx-auto p-6">
      {/* 1. Cached Product Details: Renders immediately */}
      <Suspense fallback={<ProductInfoSkeleton />}>
        <ProductInfo params={params} />
      </Suspense>

      {/* 2. Live Inventory: Streams in without blocking the page */}
      <Suspense fallback={<InventorySkeleton />}>
        <LiveInventory params={params} />
      </Suspense>
    </div>
  );
}
```

### Lever 2: Granular Caching (`'use cache'`)
Pair `'use cache'` with `cacheLife` and `cacheTag` to cache data at function or component level so it is packaged directly into the App Shell.

- **Standard Server Caching**:
  ```tsx
  import { cacheLife, cacheTag } from "next/cache";

  async function getProduct(slug: string) {
    "use cache";
    cacheLife("hours");
    cacheTag(`product-${slug}`);
    return db.products.findBySlug(slug);
  }
  ```

- **Browser-Only Session Caching (`"use cache: private"`)**:
  When caching data that reads runtime headers or cookies (e.g., user greeting, cart badge) without storing it on the public CDN server, use `"use cache: private"`. As long as its `stale` time is $\ge 5\text{ minutes}$, the client App Shell carries it ahead of the click.

- **Remote Persistent Caching (`"use cache: remote"`)**:
  In serverless multi-instance environments, ensures cache consistency across distributed lambdas.

### Lever 3: Per-Link Prefetching (`<Link prefetch>`)
Under Partial Prefetching, visible `<Link>` elements prefetch the destination's App Shell by default.
Setting `prefetch={true}` (or `<Link href="..." prefetch>`) opts the link into **per-link prefetching**, resolving per-link URL data (`params`, `searchParams`, dynamic path) before the user clicks.

```tsx
// Prefetches destination App Shell + resolves per-link params ahead of click
<Link href={`/store/${product.slug}`} prefetch>
  {product.name}
</Link>
```

---

## 3. Granular Loading States vs. Monolithic Skeletons

> [!WARNING]
> **Avoid Monolithic Full-Page Skeletons:**
> Wrapping an entire page in a single top-level `<Suspense>` or relying exclusively on a blank `loading.tsx` causes the entire page to disappear and flash a skeleton on every navigation.

### Best Practice:
1. Keep the page layout, navigation header, breadcrumbs, titles, and cached product information visible **immediately**.
2. Place `<Suspense>` boundaries strictly around the specific UI slots where live data is in flight (e.g. price, stock badge, recommended items).
3. Ensure skeleton fallbacks strictly mirror the geometry and layout classes of the resolved component to prevent Cumulative Layout Shift (CLS).

---

## 4. Development Diagnostics & Next DevTools Navigation Inspector

1. **Navigation Inspector ("Pause on Navigations")**:
   - Open Next.js DevTools (`next-devtools`).
   - Toggle **Pause on navigations**.
   - Navigate or refresh: the browser freezes the page at its initial loading state, allowing you to inspect the exact static shell (on direct visit) or prefetched App Shell (on client navigation).
   - Verify that meaningful cached content renders and fallbacks appear only where necessary.
   - Click **Resume** to stream in remaining content.

2. **Blocking-Route Validation Insights**:
   Next.js validates route instantness in development, surfacing three fix cards for blockers:
   - **Stream**: Extract async work into a child subcomponent wrapped in `<Suspense>`.
   - **Cache**: Add `'use cache'` and `cacheLife` to cache the data access.
   - **Block (`export const instant = false`)**: Intentionally opt out the segment from validation feedback when instant navigation is not applicable.

---

## 5. Automated E2E Regression Guards (`@next/playwright`)

Lock in instant navigation behavior using `@next/playwright`:

```ts
import { test, expect } from "@playwright/test";
import { instant } from "@next/playwright";

test.describe("Product Component Instant Navigation", () => {
  test("direct visit renders static shell instantly", async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto("/en/store/hats");
        await expect(page.locator("h1")).toContainText("Baseball Cap");
        await expect(page.getByTestId("stock-count")).toHaveCount(0);
      },
      { baseURL }
    );
    await expect(page.getByTestId("stock-count")).toBeVisible();
  });

  test("client navigation renders prefetched App Shell instantly", async ({ page }) => {
    await page.goto("/en/store/shoes");
    await instant(page, async () => {
      await page.click('a[href="/en/store/hats"]');
      await page.waitForURL((url) => url.pathname.includes("/store/hats"));
      await expect(page.locator("h1")).toContainText("Baseball Cap");
      await expect(page.getByTestId("stock-count")).toHaveCount(0);
    });
    await expect(page.getByTestId("stock-count")).toBeVisible();
  });
});
```
