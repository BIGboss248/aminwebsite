# Phase 4: Core Foundations & Runtime Configuration

---

## Deliverables & Status

- [ ] **4.1 Environment Variables Configuration**
  - [x] Setup `.env.local` template for development
  - [ ] Explicitly prefix client-exposed variables with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_BASE_URL`)
  - [ ] Add Resend API key and PostHog environment configuration
- [ ] **4.2 Multilanguage Support (i18n)**
  - [x] Configure request negotiation and routing with `proxy.ts`
  - [x] Setup root translation dictionaries in `messages/` (`messages/en.json`, `messages/fa.json`)
  - [x] Implement bidirectional layout support (LTR for English, RTL for Persian) and Vazirmatn font
  - [ ] Expand translation catalogs to support full case study content, contact forms, and lab utilities
  - [ ] Build interactive language switcher component for site header
- [x] **4.3 Theme & Color Palette**
  - [x] Define color palette and semantic theme tokens in `app/globals.css` for both light and dark themes
  - [x] Implement theme provider with system preference support and local storage persistence (`ThemeProvider` from `next-themes`)
  - [x] Build theme switcher toggle component using Shadcn primitives (`components/theme-toggle.tsx`)
- [ ] **4.4 Website Layout Shell**
  - [x] Build root website layout shell (`app/[locale]/layout.tsx`) with dynamic `lang`, `dir`, and font classes
  - [x] Wrap application with global context providers in layout (`ThemeProvider`, `RouteProgressBar`)
  - [ ] Build responsive `SiteHeader` with desktop navigation and mobile drawer
  - [ ] Build `SiteFooter` with brand details, trust signals, and quick navigation
- [ ] **4.5 Health & Telemetry (OpenTelemetry)**
  - [ ] Setup server telemetry and distributed tracing via OpenTelemetry (`instrumentation.ts` / `@vercel/otel`)
  - [ ] Setup Core Web Vitals (RUM) monitoring component (`useReportWebVitals` / beacon dispatcher)
