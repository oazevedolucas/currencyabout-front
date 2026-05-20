# Phase 2: UX polish — mobile, a11y, cookie banner - Context

**Gathered:** 2026-05-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Tighten the user-facing layer so a 2026 AdSense reviewer scanning the site on a phone, with a keyboard, with dark mode on, lands on zero broken pages and zero a11y blockers. Scope is **polish, not redesign**: fix concrete WCAG and mobile-layout gaps, redesign the cookie banner to a floating bottom-corner card that no longer overlaps the converter on small screens, add the dark-mode token overrides that don't exist today, and verify zero link rot on production. No new palette, no typography rebrand, no converter or i18n changes.

Six requirements anchor this phase: UX-01 (mobile baseline 375×667), UX-02 (cookie banner UX), UX-03 (axe + Lighthouse — no critical/serious violations on 4 indexed page types), UX-04 (WCAG 2.2 AA contrast on both themes), UX-05 (zero 404s + ≤1-hop redirects on internal navigation), UX-06 (zero ads in first viewport at 375×667 on home).

</domain>

<decisions>
## Implementation Decisions

### Dark mode (UX-04)
- **D-01:** **Minimal contrast patch.** Add overrides for the `--color-*` tokens in `html[data-theme='dark']` (located in `src/index.css`) **only** for the tokens that fail WCAG 2.2 AA on the indexed pages (home, guide, pair, methodology). Estimated 8–15 tokens. Driven by axe DevTools + Lighthouse output during the audit step. Full dark-mode polish — gradient inversions, shadow re-tuning, glow recoloring — is explicitly deferred to a future phase.
- **D-02:** **`ThemeToggle` stays functional.** No removal, no hiding. The button continues to flip between light and dark; dark just becomes legible after this phase.

### Cookie banner (UX-02)
- **D-03:** **Redesign from bottom-strip to floating bottom-right card.** `position: fixed; right: 16px; bottom: 16px; max-width: ~380px`. Buttons stack vertically below 480px viewport width with equal width and height for visual parity. The current animation (`cookie-consent-in`) and `role="dialog" / aria-labelledby / aria-describedby` markup are preserved.
- **D-04:** **Button copy:** `Reject all` (was `Reject non-essential`) and `Accept all`. Equal visual weight (same height, same width, same border-radius — the two only differ in fill/outline state).
- **D-05:** **Keyboard dismiss:** pressing `Escape` while the dialog is visible fires `decide('rejected')` and dispatches the existing `cookie-consent-changed` event. No new event wiring beyond the existing `useEffect`.
- **D-06:** **No hardcoded colors.** Replace the literal `#0a1f0a` and `#fff` in `CookieConsent.css` with `var(--color-text-primary)` / `var(--color-on-primary)` (or equivalent existing tokens), so the banner respects the dark-mode patch from D-01.
- **D-07:** **Scope exception, deliberate.** CLAUDE.md says "No visual rebrand — Polish-only. Existing palette, typography, and overall layout stay." The strip→card transition is a structural change to one component, not a rebrand. Treating it as the "tightening, not reinvention" carve-out the same CLAUDE.md sentence allows.

### Mobile audit + ad-in-viewport (UX-01 + UX-06)
- **D-08:** **Single mobile baseline: 375×667** (iPhone 12/13/14 portrait). Do not audit 320×568 (iPhone SE 1st gen) or 768 tablet portrait in this phase. The 5 pages in scope are home, guide, pair, exchange-rates-today, methodology.
- **D-09:** **UX-06 verification before remediation.** Open the home page at 375×667 in Chrome DevTools mobile emulator. Measure where `AD_SLOTS.homeEditorial` (line 293 of `HomePage.jsx`) lands relative to the 667px fold. Scout inspection suggests the slot sits well below the first viewport (after converter card, results section, and FAQ-prequel). **If measurement confirms zero ads in the first viewport, the requirement is satisfied — produce a screenshot artifact and no code change.** If it violates, push the slot below the `<FAQ>` mount, not above.

### Link rot (UX-05)
- **D-10:** **New script `scripts/link-check.mjs`** (Node ESM, no new deps). The script (a) parses URLs from `public/sitemap.xml`, (b) discovers internal `<Link to="..."` and `<a href="https://currencyabout.com/...">` references by grepping the `src/` tree, (c) hits each URL with `curl -ILso /dev/null -w '%{http_code} %{redirect_url}\n'` (or the Node `fetch` equivalent with `redirect: 'manual'`), (d) emits a report listing any non-2xx responses and any redirect chain longer than 1 hop.
- **D-11:** **Run against both production and dev local.** Production target is `https://currencyabout.com`; local target is whatever `npm run dev` boots. Final report goes into the plan's SUMMARY.md as evidence for UX-05. Re-run during deploy of Phase 2 to confirm no regressions introduced by the cookie banner / dark-token changes.

### a11y audit (UX-03)
- **D-12:** **Automated tools + one manual keyboard pass.** Run axe DevTools and Lighthouse against home, guide (one), pair (one indexable), exchange-rates-today. The user (Lucas) performs one ~10-minute keyboard-only pass per page type: Tab/Shift+Tab through every interactive element, verify focus ring is visible on each, verify Esc dismisses the cookie banner, verify dropdowns/selects are reachable and operable without mouse. **Screen-reader testing (VoiceOver, NVDA) is explicitly out of scope** for this phase — it's not on the AdSense reviewer's checklist.

### Claude's Discretion
- **Focus ring strategy:** use `:focus-visible` with a `box-shadow: 0 0 0 3px var(--color-primary-glow)` pattern (matching `BylineMeta.css` from Phase 1) rather than the browser default outline, for visual consistency. If any element already has a custom focus state, do not override.
- **Locale-width testing:** spot-check layout at 375 in `de` (longest strings) and `zh` / `ja` (highest information density) on top of the default `en`. Pt/es/fr inherit roughly the same widths as en.
- **Banner mobile breakpoint:** the 480px threshold for stacking buttons is Claude's pick — adjust if a real-device test shows a different obvious break.
- **Tokens to inspect first in the dark patch:** start with `--color-surface`, `--color-surface-elevated`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`, `--color-primary`, `--color-primary-dark`, `--color-primary-glow`. Expand only if axe reports more.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements
- `.planning/ROADMAP.md` — Phase 2 entry, success criteria, mode
- `.planning/REQUIREMENTS.md` — UX-01 through UX-06 truth conditions
- `.planning/PROJECT.md` — sprint constraints (no new deps, no visual rebrand, polish-only)

### Prior-phase decisions (do not contradict)
- `.planning/phases/01-editorial-trust-signals-e-e-a-t/01-CONTEXT.md` — Phase 1 locked decisions; the BylineMeta component, authors module, pair-intros module, and JSON-LD changes from Phase 1 must not be regressed
- `.planning/phases/01-editorial-trust-signals-e-e-a-t/01-VERIFICATION.md` — Phase 1 acceptance checks; the UX changes here must not break any of these
- `.planning/phases/01-editorial-trust-signals-e-e-a-t/01-REVIEW.md` — flagged the react-router-dom v7 hash-anchor scroll issue as info-only; Phase 2 is a good moment to address it if it actually regresses

### Project conventions (load before any code change)
- `./CLAUDE.md` — "No new dependencies", "No visual rebrand", "Active review" merge rule, editorial-voice rules
- `.claude/skills/frontend-guidance/SKILL.md` — canonical UI/UX rules sourced from NN/g, WCAG 2.2, Material 3, Apple HIG, Laws of UX, Luke W's form research. Consult before any CSS or component edit.

### Files this phase modifies (read before editing)
- `src/components/CookieConsent/CookieConsent.jsx` — banner component (D-03..D-07)
- `src/components/CookieConsent/CookieConsent.css` — strip→card layout migration (D-03), token migration (D-06)
- `src/index.css` — add `html[data-theme='dark']` token overrides (D-01)
- `src/pages/HomePage.jsx` — measure for UX-06, possibly shift `AdSlot` mount (D-09)
- `src/App.css` and any component-level `.css` that axe flags for contrast — surgical fixes only (D-01)
- `src/i18n/locales/{en,pt,es,fr,de,zh,ja}.js` — only if "Reject all" wording needs a localized key

### Files this phase introduces (new — names locked)
- `scripts/link-check.mjs` — Node ESM script, no deps, runs against prod + local (D-10, D-11)
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-LINK-CHECK-REPORT.md` — output of D-11, lives in phase dir
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-A11Y-AUDIT.md` — axe + Lighthouse output snapshot + manual-keyboard-pass notes (D-12)

### External standards
- WCAG 2.2 AA — contrast ratios 4.5:1 (normal text) and 3:1 (large text). Reference: https://www.w3.org/WAI/WCAG22/quickref/
- axe-core rule descriptions — for understanding "critical / serious" classifications
- Google AdSense program policies — the implicit baseline for "no reviewer-visible blocker"

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `--color-*` CSS custom properties in `src/App.css` / `src/index.css` — already token-driven, so the dark patch is additive (no rewrites)
- `BylineMeta.css` focus-ring pattern (`:focus-visible` + `box-shadow`) — re-use across the cookie banner buttons and any focus state that axe flags
- `useEffect` keyboard-event pattern in existing components — re-use for the ESC handler in the banner
- The existing `cookie-consent-changed` `CustomEvent` is already consumed by `useAdSenseLoader.js` — D-05's ESC path goes through `decide('rejected')`, which already dispatches that event, so no wiring change is needed downstream

### Established Patterns
- `aria-labelledby` / `aria-describedby` on dialogs (already in `CookieConsent.jsx`) — keep this pattern; do not strip
- CSS BEM-with-two-underscores (`__inner`, `__btn`, `--ghost`, `--primary`) — follow this in any new class on the card
- `localStorage` access wrapped in `try/catch` (existing in the banner) — preserve
- Component-co-located `.css` next to `.jsx` — keep; do not extract banner styles to a global file
- React Helmet for per-page head — already used; no change needed for this phase

### Integration Points
- `ThemeProvider` in `src/theme/ThemeContext.jsx` sets `data-theme` on `<html>` — D-01's token overrides will be scoped under `html[data-theme='dark']` to inherit automatically
- `useAdSenseLoader` (in `Layout`) listens for `cookie-consent-changed` — banner ESC path must still go through `decide('rejected')` (D-05) so the loader sees the event
- `Layout` mounts the cookie banner conditionally on consent absence — no change to mount logic
- The 7 i18n locale files all expose flat key dictionaries — if D-04's "Reject all" needs translating, the key naming convention to follow is `cookieRejectAll` etc.

### Things NOT to touch (constraint reminders)
- `useExchangeRates`, `useCurrencyConverter`, `fetchRates` — converter pipeline is off-limits per CLAUDE.md
- `useI18n` and the locale dictionaries' existing keys — additive changes only
- `getStoredConsent()` / `hasMarketingConsent()` API surface — used by `useAdSenseLoader`; signature must stay identical
- The existing `customEvent('cookie-consent-changed')` event name — used by other modules; do not rename
- The JSON-LD blocks added in Phase 1 — must continue to render correctly with the new banner z-index / token overrides

</code_context>

<specifics>
## Specific Ideas

- **Banner placement:** floating card, bottom-right, 16px from each edge, ~380px max-width, vertical stack of buttons below 480px (Lucas explicitly chose this layout — D-03, D-04).
- **ESC dismissal = "rejected":** the keyboard dismissal must record a `rejected` choice, not silently hide the banner — otherwise the next visit would re-show it (D-05).
- **Dark-token patch starts with axe-driven list:** do not invent a full dark palette upfront. Run axe first, fix the tokens it flags, re-run.
- **Mobile baseline locked at 375:** do not bring 320 or 768 into scope without re-opening this CONTEXT.md.

</specifics>

<deferred>
## Deferred Ideas

- **Full dark-mode polish** — gradients, glows, shadow re-tuning, hand-tuned dark variants of the BylineMeta and pair-intro surfaces. Out of scope this sprint; revisit after AdSense approval lands.
- **iPhone SE 1st-gen (320×568) baseline** — small-share legacy device. Revisit if real user reports come in.
- **Tablet (768) layout** — site currently has no tablet-specific layout. Could be its own phase if reviewer screenshots come back flagged.
- **VoiceOver / NVDA screen-reader pass** — not on the AdSense reviewer's checklist; can be a future a11y deep-dive.
- **Lychee CLI** for link checking — would be cleaner but requires a new dev dependency, which violates the sprint constraint. Revisit post-sprint.
- **Cookie banner i18n** — current copy is English-only; if D-04 keeps the wording English-only that's fine for now, but a future i18n pass should localize the banner alongside the seven locale files.
- **react-router-dom v7 hash-anchor scroll fix** — flagged info-only in Phase 1's REVIEW.md. If it shows up during the a11y keyboard pass, fold into a plan in this phase; otherwise queue for Phase 3 or later.

</deferred>

---

*Phase: 2-ux-polish-mobile-a11y-cookie-banner*
*Context gathered: 2026-05-20*
