---
name: frontend-guidance
description: Canonical UI/UX rules for this project. Consult before writing or editing any frontend code — components, CSS, layouts, forms, accessibility, color, typography, spacing, dark mode, or interaction states. Sourced from Nielsen Norman Group, W3C WCAG 2.2, Material Design 3, Apple HIG, Laws of UX, and Luke Wroblewski's form research.
---

# Frontend Guidance — About Currency

This project follows the canonical UI/UX knowledge base at:

**`~/Projects/Obsidian/documentation-claude/frontend-skills/`**

It compiles hard rules (MUST / MUST NOT) and guidelines (SHOULD / AVOID) from authoritative sources. When a rule and a guideline conflict, the rule wins.

## When to consult the vault

Read the relevant file **before** writing code, not after:

| Task | File to read first |
|------|-------------------|
| New component / layout | `00-principles/gestalt-principles.md`, `02-visual-design/spacing-and-layout.md` |
| Interactive element (button, link, form field) | `01-accessibility/wcag-rules.md`, `01-accessibility/keyboard-and-aria.md` |
| Forms (inputs, validation, errors) | `03-interaction/forms.md` |
| Navigation, menus, breadcrumbs | `03-interaction/navigation.md` |
| Color, tokens, theming | `02-visual-design/color-systems.md`, `01-accessibility/color-contrast.md` |
| Typography, type scale | `02-visual-design/typography.md` |
| Dark mode | `02-visual-design/dark-mode.md` |
| Visual hierarchy, attention | `02-visual-design/visual-hierarchy.md` |
| Heuristic review of any screen | `00-principles/nielsen-10-heuristics.md` |
| Cognitive load, Fitts, Hicks, Miller | `00-principles/laws-of-ux.md` |
| Design-system tenets (Apple HIG + Material 3) | `00-principles/design-system-principles.md` |

Start with the vault README: `~/Projects/Obsidian/documentation-claude/frontend-skills/README.md`.

## Priority order when rules conflict

1. **Accessibility (WCAG 2.2 AA)** — legal and ethical floor.
2. **User control and error prevention** — Nielsen heuristics #3, #5.
3. **Platform conventions** — Jakob's Law; prefer platform-native patterns.
4. **Visual hierarchy** — clarity over aesthetic preference.
5. **Brand / aesthetics** — last, never first.

## How to use guidance in this project

- When adding a component or touching existing UI/CSS, read the 1–2 most relevant vault files first.
- Cite the rule you are applying in commit messages or inline comments **only if non-obvious** (e.g., "focus ring 3px per `01-accessibility/wcag-rules.md § 2.4.11`").
- If a vault file is missing (some are planned but not yet written per the README index), fall back to the README's authoritative sources: NN/g, W3C WAI, Material 3, Apple HIG, Laws of UX.
- Do not duplicate rules into this SKILL file — the vault is the single source of truth.

## Project-specific context

About Currency is a React 19 + Vite SPA with:

- CSS variables for theming (light + dark), defined in `src/index.css`.
- Custom i18n (7 languages) — **every user-facing string added to a component MUST have keys added to all 7 locale files** in `src/i18n/locales/`.
- No CSS framework — vanilla CSS modules with BEM-ish class names.
- `react-helmet-async` for per-route SEO.
- Design-token names to reuse (do not invent parallel tokens):
  - Colors: `--color-primary`, `--color-primary-dark`, `--color-primary-glow`, `--color-surface`, `--color-surface-elevated`, `--color-bg`, `--color-border`, `--color-border-strong`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-danger`, `--color-danger-soft`
  - Radii: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
  - Motion: `--ease-out`
  - Focus: `--focus-ring` (global `:focus-visible` already applied)

When applying vault rules here, map them to these existing tokens instead of introducing new ones.
