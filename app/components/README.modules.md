# Component Modules Directory (`app/components`)

This directory houses reusable client and server components for the Amin Jamali Systems Portfolio & Lab.

---

## 1. Module Index

| Component            | Type                              | Responsibility                                                                                                             | Primary Consumer                | Skeletons / Fallbacks    |
| :------------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :----------------------- |
| **`LocaleSwitcher`** | Client Component (`"use client"`) | High-precision segmented pill switcher toggling English (`en` - LTR) and Persian (`fa` - RTL) with progress bar telemetry. | `SiteHeader`, `MobileNavDrawer` | `LocaleSwitcherSkeleton` |
| **`Link`**           | Client Component (`"use client"`) | Progress-aware Next.js Link wrapper integrating `next-intl` navigation and `react-transition-progress`.                    | Global navigation, CTA buttons  | N/A                      |
| **`LocaleSwitcher`**   | Client Component (`"use client"`) | High-precision segmented pill switcher toggling English (`en` - LTR) and Persian (`fa` - RTL) with progress bar telemetry. | `SiteNavbar`, `MobileNavDrawer` | `LocaleSwitcherSkeleton`   |
| **`Link`**             | Client Component (`"use client"`) | Progress-aware Next.js Link wrapper integrating `next-intl` navigation and `react-transition-progress`.                    | Global navigation, CTA buttons  | N/A                        |
| **`SiteNavbar`**       | Client Component (`"use client"`) | Primary systems cockpit header landmark with desktop route topology, brand identity emblem, and utility controls.            | Root layout (`layout.tsx`)      | `SiteNavbarSkeleton`       |
| **`MobileNavDrawer`**  | Client Component (`"use client"`) | Responsive slide-over cockpit drawer for mobile/tablet viewports (< 1024px) with telemetry route nodes and utility dock.    | `SiteNavbar`                    | `MobileNavDrawerSkeleton`  |

---

## 2. Component Architecture: `LocaleSwitcher`

### Algorithmic Breakdown & Flow

```mermaid
flowchart TD
    User([User Click / Keyboard Action]) --> Check{Is Target Locale Active?}
    Check -->|Yes| Ignore[No-op / Ignore Redundant Action]
    Check -->|No| Transition[React startTransition]
    Transition --> Progress[Trigger useProgress Top Bar]
    Transition --> Callback[Execute optional onLocaleChange callback]
    Transition --> Router[router.replace pathname with next locale]
    Router --> NextIntl[next-intl Updates Document dir & lang]
```

### Bidirectional Layout Sorting

- **LTR (`dir="ltr"`)**: Flex order displays `Globe (order-0) -> EN (order-1) -> FA (order-2)`.
- **RTL (`dir="rtl"`)**: Flex order displays `Globe (order-0) -> FA (order-1) -> EN (order-2)`, allowing Persian readers to visually encounter their native script first.
- **Cartographic Orientation**: The geometric globe icon explicitly maintains `[transform:none]` and `shrink-0` to safeguard real-world orientation against RTL mirroring.

### Accessibility (A11y)

- **Container**: `role="radiogroup"` with localized `aria-label="Language selection / انتخاب زبان"`.
- **Segments**: `role="radio"` with dynamic `aria-checked="true|false"` and roving `tabIndex` (`0` for active, `-1` for inactive).
- **Keyboard Controls**: `ArrowRight` / `ArrowLeft` cycles focus between segments; `Enter` / `Space` activates the focused radio.

### Storybook Integration

 
- Storybook Story: `app/components/LocaleSwitcher.stories.tsx`
- Stories exported:
  1. `Light`: Previewed in light mode container with production semantic tokens.
  2. `Dark`: Signature systems cockpit preview with Electric Cyan telemetry glow.
  3. `SkeletonLight`: Loading placeholder previewed in light mode.
  4. `SkeletonDark`: Loading placeholder previewed in dark mode.

---

## 3. Component Architecture: `MobileNavDrawer`

### Algorithmic Breakdown & Flow

```mermaid
flowchart TD
    Trigger([User Clicks Hamburger / Open Trigger]) --> Open[Set isOpen = true]
    Open --> Lock[Lock Body Scroll: style.overflow = hidden]
    Open --> Scrim[Render Scrim Backdrop with Blur]
    Open --> Slide[Slide Drawer from Trailing Edge: LTR Right / RTL Left]
    
    Slide --> Action{User Action}
    Action -->|Press Escape| Dismiss[Trigger onClose & Unlock Scroll]
    Action -->|Click Backdrop| Dismiss
    Action -->|Click Close Button| Dismiss
    Action -->|Click Route Node| Nav[Trigger onNavigate, onClose, & Route Progress Link]
```

### Accessibility & Ergonomics

- **ARIA Landmarks**: `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile Navigation"`.
- **Keyboard Dismissal**: Global `Escape` listener dismisses drawer and restores focus.
- **Scroll Containment**: Dynamically locks `document.body.style.overflow = "hidden"` while open, with reliable cleanup on dismiss and unmount.
- **Ergonomic Standards**: All interactive elements (close button, route nodes, switchers) satisfy the $\ge 44\text{px} \times 44\text{px}$ touch target requirement.

### Storybook Integration

- Storybook Story: `app/components/MobileNavDrawer.stories.tsx`
- Stories exported:
  1. `Light`: Light Mode preview in dedicated card container with production semantic tokens.
  2. `Dark`: Dark Mode systems cockpit preview with electric cyan telemetry glow.
  3. `SkeletonLight`: Loading placeholder preview in Light Mode.
  4. `SkeletonDark`: Loading placeholder preview in Dark Mode.
