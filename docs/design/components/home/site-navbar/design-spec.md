# Design Specification: SiteNavbar (Systems Cockpit Navigation Bar)

**Component Name**: `SiteNavbar`  
**Page**: Home (`/`) & Global Layout Landmark  
**Target Directory**: `docs/design/components/home/site-navbar/`  
**Design Phase**: Phase 1 (Pure UX/UI Design & Verification)  
**Status**: DESIGN COMPLETE — AUDITED

---

## 1. Overview & Visual Architecture

The `SiteNavbar` serves as the primary navigation landmark and identity beacon for Amin Jamali's developer portfolio and systems observatory platform. Positioned fixed at the top of the viewport (`h-14` / 56px), it establishes an immediate atmosphere of **high-precision engineered minimalism, calm authority, and real-time systems competence**.

### Visual Composition: Balanced Tripartite Architecture

```
+---------------------------------------------------------------------------------------------------------+
| [EMBLEM] AMIN JAMALI // LAB                 |  [Home] [About] [Projects] [Lab Hub 99.9%] [Contact]  | [EN] [Theme] [=] |
| [EMBLEM] AMIN JAMALI // LAB                 |  [Home] [About] [Projects] [Lab Hub] [Contact]        | [EN] [Theme] [=] |
+---------------------------------------------------------------------------------------------------------+
  ^ Left Cluster (Brand Identity)               ^ Center Cluster (Route Links with Brackets)          ^ Right (Utilities)
```

1. **Brand Identity Cluster (Start / Leading)**:
   - **Vector Emblem**: Geometric circuit lattice brand mark with subtle 45° hover rotation.
   - **Monospace Identity**: `AMIN JAMALI // LAB` set in `JetBrains Mono` with high-contrast text.
   - **Engineered Minimalism**: Clean lockup without distracting status beacons or version noise.
2. **Route Navigation Cluster (Center)**:
   - Balanced route navigation pill links: **Home**, **About**, **Projects**, **Lab Hub** (with cyan `99.9%` uptime micro-badge), and **Contact**.
   - Balanced route navigation pill links: **Home**, **About**, **Projects**, **Lab Hub**, and **Contact**.
   - **Bracket Micro-Interactions**: Hovering or focusing reveals subtle cyan monospace indicator brackets (`[ ]`).
3. **Utility Cluster (End / Trailing)**:
   - **Locale Switcher**: Compact trigger displaying active locale (`EN` / `FA`) with globe icon.
   - **Theme Toggle**: Fast, accessible switch between deep dark obsidian void (`#050505`) and crisp light mode (`#FAFAFA`).
   - **Mobile Hamburger**: Responsive menu trigger appearing on screens < 860px to deploy the mobile drawer sheet.

---

## 2. Token Mapping (Light vs. Dark Mode)

All color tokens, surfaces, borders, and typography directly reflect the canonical design tokens established in [`docs/project.json`](file:///d:/Scripts/aminwebsite/docs/project.json):

| Design Token Name     | Light Mode Value          | Dark Mode Value           | Usage in SiteNavbar                                          |
| :-------------------- | :------------------------ | :------------------------ | :----------------------------------------------------------- |
| `canvas_background`   | `#FAFAFA`                 | `#050505`                 | Sticky navbar backdrop background (at 85% opacity with blur) |
| `canvas_foreground`   | `#0A0A0A`                 | `#FAFAFA`                 | Primary brand title and active navigation text               |
| `surface_elevated`    | `#FFFFFF`                 | `#111115`                 | Emblem background container, utility buttons, mobile drawer  |
| `border`              | `#E4E4E7`                 | `#27272A`                 | 1px bottom navbar border, divider ticks, button perimeters   |
| `text_muted`          | `#71717A`                 | `#94A3B8`                 | Inactive nav links, version label, telemetry details         |
| `primary_accent`      | `#0891B2`                 | `#06B6D4`                 | Hover brackets `[ ]`, active link highlights, lab badge      |
| `primary_accent_glow` | `rgba(8, 145, 178, 0.15)` | `rgba(6, 182, 212, 0.25)` | Brand mark hover glow, active link background pill           |
| `status_success`      | `#10B981`                 | `#10B981`                 | Pulsing telemetry beacon dot (`SYS_ONLINE`)                  |
| `border_radius_base`  | `0.25rem` (4px)           | `0.25rem` (4px)           | Brand emblem wrap, utility buttons, active link pill         |
| `border_radius_pill`  | `9999px`                  | `9999px`                  | Status beacon capsule, uptime telemetry tag                  |

---

## 3. Google Stitch Layout Benchmarks & Variants

Generated and maintained within the unified Stitch project **`5861112417017823447`** (_Amin Jamali Systems Portfolio & Lab_):

1. **Baseline Scaffolded Screen**:
   - **ID**: `a956f6b3c4ee4157b507c91d99994d6e`
   - **Title**: _SiteNavbar - Systems Cockpit Navigation Header_
   - **Architecture**: Tripartite layout with fixed 56px height, glassmorphic backdrop blur, and bracket micro-states.
2. **Variant 1 (Segmented Console)**:
   - **ID**: `c0a45bdb82424aa6a82af079bfb9676e`
   - **Title**: _SiteNavbar - Segmented Console Architecture_
   - **Architecture**: Precision modular instrument deck featuring 1px vertical borders separating identity, navigation, telemetry, and utilities.
3. **Variant 2 (Minimalist Telemetry Bar)**:
   - **ID**: `b54c61e006404772b2d9791a84bc9738`
   - **Title**: _SiteNavbar - Minimalist Telemetry Bar & Command Badge_
   - **Architecture**: Ultra-sleek single-height stream bar with an inline command shortcut pill (`⌘K Quick Actions`).
4. **Bespoke Visual Asset**:
   - **File**: `docs/design/components/home/site-navbar/brand-mark.jpg`
   - **Asset Description**: High-tech vector geometric circuit lattice emblem generated via `generate_image`, capturing the systems observatory aesthetic.

---

## 4. Spatial Geometry & Sizing

### Sizing Scale

- **Navbar Height**: Fixed `56px` (`h-14`), maintaining low vertical footprint to maximize screen real estate.
- **Max Content Width**: `1200px` (`max-w-7xl`), centered with responsive horizontal margins (`px-4 sm:px-6 lg:px-8`).
- **Inner Padding**: `0 1.25rem` (20px).
- **Z-Index Layer**: `z-40` or `z-50`, ensuring floating persistence above hero graphics and below modal dialogs (`z-50+`).

### Responsive Layout Breakpoints

1. **Desktop Viewport (≥ 1024px)**:
   - All 3 clusters fully visible: Brand + Status Beacon, 5 Route Links with hover brackets, Utility Cluster.
   - Lab Hub displays the `99.9%` uptime micro-badge.
2. **Tablet Viewport (768px – 1023px)**:
   - Navigation links remain visible with condensed padding (`px-2`).
   - Lab Hub micro-badge gracefully collapses to save space.
   - Brand subtitle collapses to compact `SYS_ONLINE` beacon.
3. **Mobile Viewport (< 768px)**:
   - Center navigation link list is hidden (`display: none`).
   - Mobile hamburger button emerges in the utility cluster.
   - Tapping the hamburger deploys the smooth slide-down mobile navigation sheet (`mobile-nav-drawer`).

---

## 5. Typography Hierarchy (LTR vs. RTL)

The application mandates complete bidirectional parity between English (LTR) and Persian (RTL):

| Element                      | English (LTR) Font             | Persian (RTL) Font          | Size & Weight                                  |
| :--------------------------- | :----------------------------- | :-------------------------- | :--------------------------------------------- |
| **Brand Identity**           | `JetBrains Mono`, monospace    | `Vazirmatn`, sans-serif     | 13px (`text-[13px]`), Bold (`font-bold`)       |
| **Telemetry Status**         | `JetBrains Mono`, tabular-nums | `Vazirmatn`, monospace      | 9px (`text-[9px]`), SemiBold (`font-semibold`) |
| **Navigation Links**         | `Geist`, sans-serif            | `Vazirmatn`, sans-serif     | 13px (`text-[13px]`), Medium (`font-medium`)   |
| **Hover Indicator Brackets** | `JetBrains Mono`, monospace    | `JetBrains Mono`, monospace | 12px (`text-xs`), Regular (`font-normal`)      |
| **Utility Badges / Tags**    | `JetBrains Mono`, tabular-nums | `Vazirmatn`, tabular-nums   | 10px (`text-[10px]`), Medium (`font-medium`)   |

### Bidirectional Layout Rules:

- When `dir="rtl"`, the flex container naturally mirrors: Brand Identity anchors to the right, Route Links stay centered, and Utility Cluster anchors to the left.
- Margin/padding utilities must use logical directional properties (`ps-`, `pe-`, `ms-`, `me-`).
- Navigation links render native localized strings:
  - Home -> `صفحه اصلی`
  - About -> `درباره من`
  - Projects -> `پروژه‌ها`
  - Lab Hub -> `آزمایشگاه`
  - Contact -> `تماس`

---

## 6. Interactive States & Micro-interactions

1. **Brand Mark Hover**:
   - Subtle 4° clockwise rotation on the emblem wrap.
   - Primary cyan glow expands (`box-shadow: 0 0 16px rgba(6, 182, 212, 0.35)`).
2. **Telemetry Beacon Pulse**:
   - 2-second continuous CSS pulse (`opacity: 1 -> 0.4 -> 1`, `scale: 1 -> 0.85 -> 1`).
3. **Route Link Hover & Focus**:
   - Foreground color transitions from `text-muted` to `text-foreground` (or `text-primary`).
   - Indicator brackets `[` and `]` fade in smoothly (`opacity-0` to `opacity-100`, duration 150ms).
4. **Active Route State**:
   - `color: var(--primary-accent)`.
   - Indicator brackets persistently visible.
   - Subtle background tint `rgba(6, 182, 212, 0.08)`.
5. **Mobile Drawer Animation**:
   - Smooth slide-down reveal (`transform: translateY(-8px) -> translateY(0)` with opacity fade in 200ms).

---

## 7. Accessibility (A11y) & WCAG 2.1 AA Compliance

- **Semantic Landmarks**: Wrapped in `<header>` containing `<nav aria-label="Main Navigation">`.
- **Contrast Compliance**:
  - Text-to-background contrast ratio exceeds `4.5:1` in both Dark and Light modes.
  - Active and accent highlights achieve `> 3:1` graphical element contrast.
- **Keyboard Operability**:
  - Full keyboard tab navigation sequence: Brand -> Nav Links -> Locale Switcher -> Theme Toggle -> Mobile Menu.
  - Clear, high-contrast focus rings (`outline: 2px solid #06B6D4`, `outline-offset: 2px`).
- **Screen Reader Support**:
  - Active page marked with `aria-current="page"`.
  - Icon-only buttons equipped with descriptive `aria-label` attributes (`aria-label="Toggle Theme"`, `aria-label="Switch Language"`).
  - Mobile hamburger button includes `aria-expanded="false|true"` and `aria-controls="mobile-nav-drawer"`.
- **Motion Reduction**:
  - Respects `@media (prefers-reduced-motion: reduce)` by disabling the telemetry pulse and emblem rotation.

---

## 8. Adversarial Edge Cases & Failure Modes

1. **Extreme Viewport Zoom (up to 400%)**:
   - Flex wrap and container constraints prevent horizontal scrollbars; layout cleanly shifts to mobile hamburger mode early.
2. **Locale String Expansion**:
   - Persian translated labels are longer than English strings; layout provides ample flex room and utilizes `truncate` with ellipsis if viewport constraints are reached.
3. **Telemetry Service Disconnection**:
   - If real-time telemetry drops or is unavailable, the beacon transitions to neutral gray or amber (`SYS_STANDBY`) without breaking navbar layout.
4. **Sticky Overlay on Focus**:
   - Skip-to-content links (`#main-content`) must have appropriate scroll-margin-top (`scroll-mt-16`) so focused headings are not obscured by the fixed navbar.

---

## 9. Zero-Coding Guardrail Verification

- [x] **No React JSX/TSX Code**: This specification contains zero component implementations, React hooks, or TSX props.
- [x] **No Package Installations**: No `pnpm add` or shadcn CLI commands are present.
- [x] **Pure Design Tokens**: All referenced styles correspond directly to verified tokens in `docs/project.json`.
- [x] **Visual Deliverables Complete**: Responsive iframe preview shell created at `preview.html`, Stitch screens recorded at `stitch/screens.json`, and visual brand mark asset preserved.
