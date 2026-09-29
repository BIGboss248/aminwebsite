# Phase 6: Server Functions & Global SEO Metadata

---

## Deliverables & Status

- [ ] **6.1 Server Actions & API Routes**
  - [ ] Implement Server Action mutation handlers for contact form submission (`app/actions/contact.ts`)
  - [ ] Configure dynamic rate-limiting and server-side Zod validation
- [x] **6.2 File-Based Metadata & Social Previews**
  - [x] Configure App Icons: `app/favicon.ico`, `app/icon.png` (using `logo.png`), and `app/apple-icon.png`
  - [x] Configure root layout `generateMetadata` programmatic `icons` fallback
  - [x] Add default OpenGraph and Twitter cards (`app/opengraph-image.tsx`, `app/twitter-image.tsx`)
  - [x] Configure global search engine instructions in `app/robots.ts`
  - [x] Generate dynamic XML sitemap in `app/sitemap.ts`
  - [x] Inject global structured data (`JSON-LD` for `Person`, `WebSite`, and `ContactPage`) in `app/[locale]/page.tsx`
