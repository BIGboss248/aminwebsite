# Next.js 16 Caching & Revalidation Architecture

Deep engineering reference for Next.js 16 cache directives (`'use cache'`), cache lifetime policies (`cacheLife`), cache tagging (`cacheTag`), and mutation revalidation semantics (`updateTag`, `revalidateTag`, `revalidatePath`).

> [!NOTE]
> **Local Next.js Documentation Reference:**
> Consult `node_modules/next/dist/docs/01-app/01-getting-started/09-caching.md` and `node_modules/next/dist/docs/01-app/04-api-reference/03-directives/use-cache.md`.

---

## 1. The `'use cache'` Directive

In Next.js 16 (with `cacheComponents: true` enabled in `next.config.ts`), the `'use cache'` directive enables automatic compilation caching for functions, components, or entire files.

### A. Function-Level Caching (Data Layer)
```tsx
import { cacheLife, cacheTag } from "next/cache";

export async function getProductCatalog() {
  "use cache";
  cacheLife("hours"); // Built-in profiles: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'max'
  cacheTag("product-catalog");

  return await db.query("SELECT * FROM products WHERE active = true");
}
```

### B. Component-Level Caching (UI Layer)
```tsx
import { cacheLife, cacheTag } from "next/cache";

export async function FeaturedProductsGrid() {
  "use cache";
  cacheLife("days");
  cacheTag("featured-products");

  const products = await getFeaturedProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

---

## 2. Granular Lifetime Control (`cacheLife`)

You can pass custom stale-while-revalidate configurations to `cacheLife()`:

```tsx
cacheLife({
  stale: 3600,     // 1 hour: served fresh without revalidation
  revalidate: 7200, // 2 hours: triggers background revalidation on next request
  expire: 86400,   // 24 hours: cache entry evicted if un-revalidated
});
```

---

## 3. Revalidation & Mutation Discipline

When mutating data via **Server Actions**, choose the correct revalidation function based on user intent:

| Function | Execution Context | Mechanism | Ideal Use Case |
| :--- | :--- | :--- | :--- |
| **`updateTag(tag)`** | Server Actions only | Immediate read-your-own-writes expiration | Form submissions, profile edits, user carts (user sees immediate change) |
| **`revalidateTag(tag, 'max')`** | Server Actions / Webhooks | Stale-while-revalidate background refresh | Content updates, blog publishing, global catalog refreshes |
| **`revalidatePath(path)`** | Server Actions / Route Handlers | Purges all cached segments for a route | Layout reorganizations, multi-component page invalidation |

### Example Server Action Mutation:
```tsx
"use server";

import { updateTag } from "next/cache";
import { revalidateTag } from "next/cache";

export async function updateProductPrice(productId: string, newPrice: number) {
  await db.updatePrice(productId, newPrice);

  // Immediate expiration for caller
  updateTag("product-catalog");
}
```
