# Phase 4: Core Foundations & Runtime Configuration

---

## Deliverables & Status

- [x] **4.1 Environment Variables Configuration**
  - [x] Setup `.env.local` template for development and container runtime
- [x] **4.2 Multilanguage Support (i18n)**
  - [x] Configure request negotiation and routing with `proxy.ts`
  - [x] Setup root translation dictionaries in `messages/` (`messages/en.json`, `messages/fa.json`)
  - [x] Implement bidirectional layout support (LTR for English, RTL for Persian) and Vazirmatn font
  - [x] Build localized navigation wrapper and language switcher component
- [x] **4.3 Theme & Color Palette**
  - [x] Define color palette and semantic theme tokens in `app/globals.css` for both light and dark themes
  - [x] Implement theme provider with system preference support and local storage persistence (`ThemeProvider` from `next-themes`)
  - [x] Build theme switcher toggle component using Shadcn primitives (`components/theme-toggle.tsx`)
- [x] **4.4 Website Layout Shell**
  - [x] Build root website layout shell (`app/[locale]/layout.tsx`) with dynamic `lang`, `dir`, and font classes
  - [x] Wrap application with global context providers in layout (`ThemeProvider`, `RouteProgressBar`)
  - [x] Design and develop `SiteHeader`
  - [x] Design and develop `SiteFooter`
  - [x] Optimize web fonts using `next/font` with zero layout shift (CLS)
- [x] **4.5 Health & Telemetry (OpenTelemetry)**
  - [x] Setup server telemetry and distributed tracing via OpenTelemetry (`instrumentation.ts` / `@vercel/otel`)
  - [x] Setup Core Web Vitals (RUM) monitoring component (`useReportWebVitals` / beacon dispatcher)
