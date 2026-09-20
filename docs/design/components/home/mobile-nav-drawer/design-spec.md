# MobileNavDrawer Design Specification

A comprehensive UX/UI design specification for the responsive Developer Cockpit Navigation Drawer for Amin Jamali's Systems Portfolio and Engineering Laboratory platform.

---

## 1. Executive Summary & Story

- **Component Identifier**: `MobileNavDrawer`
- **Section / Location**: Global Header & Navigation Overlay (`home` / root layout)
- **Target Persona**: Systems engineering hiring managers, technical recruiters, distributed systems peers, and cybersecurity researchers accessing the platform on mobile and tablet devices.
- **Emotional & Visual Message**: High-precision engineered minimalism, calm authority, deep obsidian surfaces with crisp structural borders and electric telemetry accents communicating real-time systems competence.
- **Design Philosophy**: Rather than a standard generic consumer mobile menu, the drawer functions as a high-density "Systems Cockpit Topography". It delivers clear, instant routing with index counters (`01`, `02`, `03`...), active status indicators, and live telemetry badges.

---

## 2. Google Stitch Layout Architecture & Screen Benchmarks

- **Stitch Project ID**: `5861112417017823447`
- **Stitch Baseline Screen ID**: `75b3dd5fd410463d827e21f77c7274a6`
- **Screen Title**: Mobile Navigation Cockpit Drawer - Amin Jamali Systems Lab
- **Layout Composition Rationale**:
  - **Edge Slide-Over Panel**: Anchored to the trailing edge (right in LTR, left in RTL), occupying 320px width (capped at 85vw on ultra-narrow viewports) to preserve orientation context with the darkened underlying canvas.
  - **Backdrop Overlay**: Dark translucent scrim (`rgba(0, 0, 0, 0.65)`) with a `6px` backdrop blur to prevent background distraction while maintaining layered spatial depth.
  - **Modular Three-Tier Structure**:
    1. *Top Header Lockup*: Monospace identity emblem and title, accompanied by an explicit, accessible dismiss button.
    2. *Scrollable Route Topology Body*: Tactile route nodes featuring monospace sequence numbers, primary destination titles, explanatory subtitles, and status beacons.
    3. *Pinned Bottom Telemetry Dock*: System uptime / latency heartbeat, locale selection, and theme controls.

---

## 3. Visual Hierarchy & Spatial Flow

1. **Primary Focal Point (1st)**: The active navigation node (e.g., `[ 01 // HOME ]` or `[ 04 // LAB HUB ]`), highlighted with an electric cyan border, subtle neon cyan glow (`rgba(6, 182, 212, 0.25)`), and contrasting active typography.
2. **Secondary Focal Point (2nd)**: The monospace brand lockup in the header (`AMIN JAMALI // LAB`) paired with the circuit lattice emblem.
3. **Tertiary Focal Point (3rd)**: The telemetry status indicators (e.g., `99.9%` uptime pill badge on Lab Hub and the `ONLINE // 9.4ms` status in the bottom utility dock).
3. **Tertiary Focal Point (3rd)**: The telemetry status indicators (e.g., the `ONLINE // 9.4ms` status in the bottom utility dock).

---

## 4. Layout Grid & Breakpoints

| Viewport | Container Width | Stacking Behavior & Placement |
| :--- | :--- | :--- |
| **Mobile (< 768px)** | `320px` (max `85vw`) | Active sliding drawer panel anchored to the trailing viewport edge. Triggered by header hamburger icon. |
| **Tablet (768px - 1024px)** | `320px` | Drawer available for compact tablet portrait mode; desktop nav links remain hidden or condensed. |
| **Desktop (≥ 1024px)** | Hidden (`display: none`) | Drawer is completely hidden on large viewports where full horizontal desktop navbar links are rendered. |

---

## 5. Design Tokens & Color Mapping

All colors map directly to the canonical tokens established in `docs/project.json`:

### Dark Theme (Default Telemetry Mode)
- **Canvas / Page Background**: `#050505`
- **Drawer Surface Card**: `#111115`
- **Alternate Surface / Hover Fill**: `#18181B`
- **Structural Borders**: `#27272A`
- **Primary Text (Headings/Labels)**: `#FAFAFA`
- **Muted Text (Subtitles/Metadata)**: `#94A3B8`
- **Primary Telemetry Accent**: `#06B6D4` (Electric Cyan)
- **Accent Glow**: `rgba(6, 182, 212, 0.25)`
- **Secondary Accent**: `#8B5CF6` (Vibrant Violet)
- **Status Success**: `#10B981` (Emerald Green)

### Light Theme
- **Canvas / Page Background**: `#FAFAFA`
- **Drawer Surface Card**: `#FFFFFF`
- **Alternate Surface / Hover Fill**: `#F4F4F5`
- **Structural Borders**: `#E4E4E7`
- **Primary Text**: `#0A0A0A`
- **Muted Text**: `#71717A`
- **Primary Telemetry Accent**: `#0891B2` (Deep Cyan)
- **Accent Glow**: `rgba(8, 145, 178, 0.15)`
- **Secondary Accent**: `#7C3AED`
- **Status Success**: `#10B981`

---

## 6. Typography Scale (Per Locale)

### English (LTR)
- **Heading / Primary Font**: `Geist Sans`, `Inter`, sans-serif
- **Monospace Telemetry Font**: `Geist Mono`, `JetBrains Mono`, monospace
- **Header Brand Title**: `13px` / `0.8125rem`, Weight `700`, Letter spacing `+0.05em`, Uppercase
- **Section Label (`// ROUTE_TOPOLOGY`)**: `10px` / `0.625rem`, Weight `600`, Monospace, Uppercase, Tracking `+0.1em`
- **Route Node Index (`[ 01 ]`)**: `12px` / `0.75rem`, Weight `600`, Monospace
- **Route Node Label**: `14px` / `0.875rem`, Weight `600`
- **Route Node Subtext**: `11px` / `0.6875rem`, Weight `400`, Color Muted

### Persian / فارسی (RTL)
- **Heading / Body Font**: `Vazirmatn`, sans-serif
- **Monospace Font**: `Geist Mono`, monospace
- **Route Node Label**: `14px` / `0.875rem`, Weight `600`, Font `Vazirmatn`
- **Route Node Subtext**: `11px` / `0.6875rem`, Weight `400`, Line height `1.6`

---

## 7. Interaction States Matrix

| Element | Default State | Hover State | Active / Selected State | Focus Visible |
| :--- | :--- | :--- | :--- | :--- |
| **Drawer Backdrop** | `opacity: 0`, `pointer-events: none` | N/A | `opacity: 1`, `pointer-events: auto`, transition `250ms` | N/A |
| **Drawer Panel** | `translateX(100%)` (LTR) / `translateX(-100%)` (RTL) | N/A | `translateX(0)`, transition `300ms cubic-bezier(0.16, 1, 0.3, 1)` | Outlined with primary ring |
| **Route Node Card** | Transparent bg, muted text, transparent border | Surface hover (`#18181b`), foreground text, subtle border | Tinted cyan bg (`rgba(6, 182, 212, 0.08)`), cyan border (`#06B6D4`), inner glow | `2px` focus ring, `2px` offset |
| **Close Trigger** | Card bg, muted icon | Border accent cyan, icon foreground | Scale `0.96`, active border | `2px` focus ring |
| **Uptime Badge** | Pill, `10%` cyan bg, cyan border, glowing pip | Slightly elevated border | Full glow | High contrast outline |

---

## 8. Bidirectional (RTL) Adaptations

1. **Slide-In Axis Mirroring**:
   - In LTR (`dir="ltr"`), the drawer slides in from the **right** edge (`transform: translateX(100%)` -> `translateX(0)`).
   - In RTL (`dir="fa"` / `dir="rtl"`), the drawer slides in from the **left** edge (`transform: translateX(-100%)` -> `translateX(0)`).
2. **Structural Border Placement**:
   - In LTR, the drawer features a `border-left`.
   - In RTL, the drawer features a `border-right`.
3. **Telemetry Numbers & Monospace Preservation**:
   - Telemetry tokens, status pips, indices (`[ 01 ]`), and version numbers (`v4.28`) remain strictly LTR-formatted for code readability and technical precision.
4. **Directional Arrow & Icon Reversal**:
   - Forward link indicators flip from right chevron `→` in LTR to left chevron `←` in RTL.

---

## 9. Accessibility & Ergonomics

- **Touch Target Sizing**: All interactive touch targets (route cards, close button, language switches) meet or exceed the **44px × 44px** minimum ergonomic standard (minimum route node height is `48px`).
- **Contrast Ratios**:
  - Primary text on dark surface (`#FAFAFA` on `#111115`): **16.5:1** (exceeds WCAG AAA).
  - Primary accent on dark surface (`#06B6D4` on `#111115`): **8.2:1** (exceeds WCAG AAA).
  - Muted subtext on dark surface (`#94A3B8` on `#111115`): **6.2:1** (exceeds WCAG AA).
- **Keyboard Dismiss & Focus Trapping**:
  - Pressing `Escape` closes the drawer immediately.
  - Clicking outside on the backdrop scrim closes the drawer.
  - Focus is trapped within the drawer dialog when open, and restored to the hamburger trigger button upon closing.
- **ARIA Landmark & Roles**:
  - Container marked with `role="dialog"`, `aria-modal="true"`, and `aria-label="Mobile Navigation"`.
  - Close button labelled with explicit `aria-label="Close navigation drawer"`.
  - Active route marked with `aria-current="page"`.

