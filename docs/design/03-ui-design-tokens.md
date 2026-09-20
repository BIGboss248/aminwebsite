# Visual Identity, Typography & UI Design Tokens

**Document Version:** 1.0  
**Status:** Approved  
**Companion Stylesheet:** [`app/globals.css`](file:///d:/Scripts/aminwebsite/app/globals.css)

---

## 1. Brand Narrative & Visual Philosophy

- **Emotional Tone**: Technical precision, calm authority, high-performance infrastructure, deep focus.
- **Visual Aesthetic**: Engineered minimalism. High-contrast typography, deep slate/neutral surfaces, crisp 1px borders, subtle glassmorphic elevation, and deliberate high-emphasis accent colors (emerald/cyan) reserved for status indicators and active states.
- **Design Metaphor**: The developer cockpit / observatory. Interface elements feel like precision instruments—clean lines, zero gratuitous decoration, instant feedback.

---

## 2. Typography & Font System

The application leverages `next/font` for zero-layout-shift font delivery. It supports bidirectional typography across English (LTR) and Persian (RTL).

| Role                       | Font Family  | Variable Name       | Weights            | Character Set           |
| :------------------------- | :----------- | :------------------ | :----------------- | :---------------------- |
| **Primary Sans (Latin)**   | `Geist Sans` | `--font-geist-sans` | 400, 500, 600, 700 | Latin, Latin-Extended   |
| **Primary Sans (Persian)** | `Vazirmatn`  | `--font-vazirmatn`  | 400, 500, 600, 700 | Arabic / Persian / RTL  |
| **Monospace (Code / Lab)** | `Geist Mono` | `--font-geist-mono` | 400, 500, 600      | Latin, Numbers, Symbols |

### Typography Scale & Hierarchy

```css
/* Responsive typographic hierarchy */
.text-display {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.text-h1 {
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
}
.text-h2 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
}
.text-h3 {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.4;
}
.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}
.text-small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}
.text-mono {
  font-family: var(--font-geist-mono);
  font-size: 0.8125rem;
}
```

---

## 3. Semantic Color Token Matrix (OKLCH)

The color palette is built using modern **OKLCH color space** in `app/globals.css`, guaranteeing perceptual uniformity and accessible contrast ratios across both light and dark modes.

| Semantic Token         | Light Mode Value                   | Dark Mode Value                     | Usage Context                                |
| :--------------------- | :--------------------------------- | :---------------------------------- | :------------------------------------------- |
| `--background`         | `oklch(1 0 0)` (Pure White)        | `oklch(0.145 0 0)` (Obsidian Black) | Viewport and root canvas                     |
| `--foreground`         | `oklch(0.145 0 0)` (Dark Charcoal) | `oklch(0.985 0 0)` (Off White)      | Primary text and headings                    |
| `--card`               | `oklch(1 0 0)` (White)             | `oklch(0.205 0 0)` (Subtle Slate)   | Elevated surfaces and containers             |
| `--card-foreground`    | `oklch(0.145 0 0)`                 | `oklch(0.985 0 0)`                  | Card titles and body text                    |
| `--primary`            | `oklch(0.205 0 0)`                 | `oklch(0.985 0 0)`                  | Primary buttons and key interactive elements |
| `--primary-foreground` | `oklch(0.985 0 0)`                 | `oklch(0.205 0 0)`                  | Text inside primary buttons                  |
| `--secondary`          | `oklch(0.97 0 0)`                  | `oklch(0.269 0 0)`                  | Secondary buttons, filter chips              |
| `--muted`              | `oklch(0.97 0 0)`                  | `oklch(0.269 0 0)`                  | Background for subtle cards and tags         |
| `--muted-foreground`   | `oklch(0.556 0 0)`                 | `oklch(0.708 0 0)`                  | Secondary text, captions, timestamps         |
| `--border`             | `oklch(0.922 0 0)`                 | `oklch(0.269 0 0)`                  | Structural dividers and card outlines        |
| `--input`              | `oklch(0.922 0 0)`                 | `oklch(0.269 0 0)`                  | Input field boundaries                       |
| `--ring`               | `oklch(0.708 0 0)`                 | `oklch(0.439 0 0)`                  | Accessibility focus ring                     |
| `--destructive`        | `oklch(0.577 0.245 27.325)`        | `oklch(0.577 0.245 27.325)`         | Errors, leak warnings, alerts                |
| `--status-success`     | `oklch(0.65 0.18 145)` (Emerald)   | `oklch(0.72 0.18 145)` (Emerald)    | Secure probe, healthy container              |
| `--status-warning`     | `oklch(0.75 0.16 75)` (Amber)      | `oklch(0.78 0.16 75)` (Amber)       | Warning, degraded latency                    |
| `--skeleton`           | `oklch(0.922 0 0)` (Zinc-200)      | `oklch(0.240 0 0)` (Obsidian Slate) | Base loading placeholder background          |
| `--skeleton-shimmer`   | `oklch(0.870 0 0)` (Zinc-300)      | `oklch(0.320 0 0)` (Elevated Tint)  | Pulse / shimmer animation highlight          |
| `--skeleton-border`    | `oklch(0.880 0 0)`                 | `oklch(0.320 0 0 / 60%)`            | Accessible non-text contrast outline/border  |

### Accessible Loading States & WCAG Compliance
- **Non-Text Contrast (WCAG 2.1 SC 1.4.11)**: Skeletons feature calibrated OKLCH lightness values and subtle boundary delineation (`--skeleton-border`) ensuring loading placeholders are distinguishable from both viewport canvas and elevated card surfaces across themes.
- **Motion & Vestibular Safety (WCAG 2.1 SC 2.2.2)**: Pulse animations strictly respect `@media (prefers-reduced-motion: reduce)`. When enabled, animations are halted to prevent nausea or distraction, falling back to static placeholders with high clarity.
- **High Contrast / Forced Colors**: Supports Windows High Contrast Mode (`@media (forced-colors: active)`) using fallback system outlines (`outline: 1px solid transparent` / `outline-current`) preventing invisible elements when custom backgrounds are stripped.
- **Screen Reader Semantics**: By default, skeletons are marked with `aria-hidden="true"` so assistive technologies focus on semantic content, while supporting optional standalone `role="status"` and accessible labels when appropriate.

---

## 4. Spacing, Elevation & Radius Tokens

```css
:root {
  --radius: 0.625rem; /* 10px base corner radius */
  --radius-sm: calc(var(--radius) * 0.6); /* 6px */
  --radius-md: calc(var(--radius) * 0.8); /* 8px */
  --radius-lg: var(--radius); /* 10px */
  --radius-xl: calc(var(--radius) * 1.4); /* 14px */
  --radius-2xl: calc(var(--radius) * 1.8); /* 18px */
}
```

- **Elevation**:
  - `card-flat`: 1px solid `var(--border)` with zero shadow (engineered precision).
  - `card-hover`: 1px solid `var(--border)` with subtle translate-y `(-2px)` and low-opacity ambient blur (`shadow-sm`).
  - `modal-floating`: Deep backdrop blur (`backdrop-blur-md`) with 1px border.

---

## 5. Iconography & Visual Assets

- **Icon Set**: `lucide-react`.
- **Icon Sizing & Weight**:
  - Regular UI icons: `size-4` (16px) or `size-5` (20px).
  - Stroke width: Fixed `1.75px` stroke across all instances for visual consistency.
- **RTL Icon Flipping**:
  - Directional navigation icons (arrows, chevrons) dynamically flip horizontally in RTL context (`rtl:rotate-180`).

---

## 6. Motion & Micro-Interactions

- **Philosophy**: Functional, fast, never performative. Animations must respect `prefers-reduced-motion`.
- **Hover Transitions**: `transition-all duration-150 ease-out`.
- **Page Transitions**: Content fades in with subtle 4px vertical glide (`fade-in-up duration-200`).
- **Lab Visualizers**: Real-time diagnostic bars animate dynamically with GSAP or Tailwind CSS animations (`tw-animate-css`).
