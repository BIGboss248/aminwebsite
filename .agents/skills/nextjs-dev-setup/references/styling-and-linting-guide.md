# Styling and Design System Linting Guide (`@shadcn/lint`)

`@shadcn/lint` is an agent-first linter for Tailwind CSS (v4) design systems. It enables teams to define component styling boundaries and design token constraints that AI coding agents can automatically verify, understand, and fix in a single round.

---

## 1. ESLint Flat Config Setup

ESLint flat configuration setup integrating Next.js core web vitals, Storybook, and `@shadcn/lint`:

- Template: [`eslint.config.mjs.template`](../resources/templates/eslint.config.mjs.template)

---

## 2. Core Rules & Policy Specification

| Rule                         | What it Checks                                          | Agent Guidance                                                                                                                                                                                |
| :--------------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shadcn/no-restyle`          | Component style overrides passed via `className`        | Forbids changing internal component geometry (padding, radius, typography). Directs the agent to use predefined component variants (`variant`, `size`) or container layout (`gap`, `margin`). |
| `shadcn/no-arbitrary-values` | Arbitrary bracket values (e.g. `p-[13px]`, `w-[320px]`) | Forces agents to use standard spacing/sizing theme scales. Suggests nearest standard theme scale tokens.                                                                                      |
| `shadcn/no-raw-colors`       | Raw palette colors (`bg-zinc-100`) & undeclared tokens  | Enforces declared CSS variable tokens (`bg-primary`, `text-muted-foreground`) from `globals.css` `@theme`.                                                                                    |
| `shadcn/no-inline-styles`    | `style={{ ... }}` props and `<style>` blocks            | Flags inline style leaks and guides agents back to Tailwind utility classes.                                                                                                                  |
| `shadcn/no-unknown-classes`  | Invalid or typo Tailwind classes                        | Uses Tailwind v4 loader to verify classes and catches typos (e.g. `hovr:flex`).                                                                                                               |

---

## 3. Component Contracts Configuration

Use contracts to define granular styling permissions for specific components:

```javascript
"shadcn/no-restyle": ["error", {
  allow: ["layout"],
  contracts: [
    { pattern: "^Button$", allow: ["w-full", "mt-*", "mb-*"] },
    { pattern: "^CardTitle$", allow: ["layout", "typography"], deny: ["font-*"] },
    { pattern: "^CardContent$", allow: ["layout", "spacing"] },
  ],
}]
```

---

## 4. Primitive Directory Overrides

Turn off restyle and arbitrary value rules in primitive UI directories (`app/components/ui/**`, `components/ui/**`) so base components can style themselves:

```javascript
{
  files: ["app/components/ui/**", "components/ui/**", "src/components/ui/**"],
  rules: {
    "shadcn/no-restyle": "off",
    "shadcn/no-arbitrary-values": "off",
  },
}
```
