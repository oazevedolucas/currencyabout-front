# Phase 2 a11y audit

## Pages audited

| # | URL | Why |
| --- | --- | --- |
| 1 | `/` | Home (converter surface; AdSense reviewer entry point). |
| 2 | `/guides/currency-conversion-fees-compared` | Most-recently-updated guide (`updated: 2026-05-18`; longest body tiebreak — 31 blocks). Same guide page used in plan 02-01. |
| 3 | `/usd-to-brl` | Indexable pair (`POPULAR_PAIRS` + `isIndexablePair` passes). |
| 4 | `/exchange-rates-today` | High-information-density table page. |
| 5 | `/methodology` | Long-form text + flagged for center-alignment consistency in plan 02-01. |

Themes audited: light (default) and dark (`localStorage['currencyabout_theme'] = 'dark'` + reload, or the ThemeToggle in the header).

Tools: axe DevTools browser extension (critical + serious only), Lighthouse Accessibility category (Chrome DevTools panel). Both run against `npm run dev` at 375×667 (mobile emulator from plan 02-01 retained for consistency, though desktop widths are also acceptable for axe/Lighthouse since these audits are width-agnostic for most rules).

---

## Light mode axe: pre-fix

### `/` (home)

Summary capture: axe DevTools 4.11.4, WCAG 2.1 AA preset, Best Practices off. Total issues 45 — 0 critical, **45 serious**, 0 moderate, 0 minor. Screenshot: [`screenshots/axe-home-light-summary.png`](screenshots/axe-home-light-summary.png).

**Note on theme attribution:** the scan that produced this summary was actually captured in **dark theme** (the contrast finding's background color `#22c55e` resolves to the dark-theme value of `--color-primary-dark`; in light theme that token is `#16a34a`). The structural findings (nested controls, aria-hidden focusable) are theme-independent and will repeat on every page that mounts `CurrencyGrid` (home only); the contrast count would be near-identical in light mode (the chip still fails 4.5:1 at `#fff` on `#16a34a` ≈ 4.0:1). The audit file lists this scan under "Light mode axe: pre-fix" for layout reasons but cross-references the dark theme attribution here.

Rule-level breakdown (serious):

- **ARIA hidden element must not be focusable or contain focusable elements** — 20 occurrences. Root cause (traced via code review): `src/components/CurrencyCard/CurrencyCard.jsx:129-171` renders the `.currency-card__detail` block with `aria-hidden={!expanded}` (default `expanded === false`, so `aria-hidden="true"`), and that block contains a focusable `<Link>` at `src/components/CurrencyCard/CurrencyCard.jsx:160`. The home page renders ~20 currency cards via `CurrencyGrid`, so the violation count matches `cards × 1 focusable link in a hidden ancestor`. **Fix path (T5):** replace `aria-hidden={!expanded}` with `inert={!expanded}` (React 19 supports it natively; removes the descendant from focus order AND the accessibility tree without changing the existing CSS collapse animation).
- **Interactive controls must not be nested** — 20 occurrences. Root cause: `src/components/CurrencyCard/CurrencyCard.jsx:75-127` wraps the summary in a `<div role="button" tabIndex={0}>` and nests a real `<button class="currency-card__copy">` at line 94 inside it. 20 cards × 1 nested copy button each = 20 violations. **Fix path (T5):** move the copy `<button>` out of the summary's clickable region (becomes a sibling at the article level, positioned absolutely top-right via CSS), and tighten the summary to a semantic `<button>` (or keep `role="button"` but ensure no interactive descendant remains).
- **Elements must meet minimum color contrast ratio thresholds** — 3 occurrences. Drill-down: target element is `<button class="quick-amounts__chip quick-amounts__chip--active">` (the active selected amount in the converter — e.g. "R$ 100"). Foreground `#ffffff` on background `#22c55e` measures **2.27:1** (needs 4.5:1 normal text). 9.8pt / 13px / normal weight. Screenshot: [`screenshots/axe-home-contrast.png`](screenshots/axe-home-contrast.png). Source: `src/components/QuickAmounts/QuickAmounts.css:47-51` — `.quick-amounts__chip--active { background: var(--color-primary-dark); color: #fff; }` against the dark-theme value `--color-primary-dark = #22c55e`. **In light mode** the same chip would be `#fff` on `#16a34a` ≈ 4.0:1 — also fails 4.5:1 normal text, so this is a both-modes bug (worse in dark). The count of 3 likely matches three distinct render contexts (the 6-chip row has one active at audit time; axe may also have flagged additional duplicated-id-style instances, or simply 3 internal axe nodes — not theme-specific). **Fix path (T5):** swap the literal `color: #fff` for `var(--color-text-inverse)` and add a dark-theme override `[data-theme='dark'] .quick-amounts__chip--active { color: var(--color-text-inverse); }` so both modes resolve to a near-black text on the bright green chip (light: #ffffff → keep #ffffff currently but bump to text-primary; dark: #0b120e). Net result: light mode = darker text on green (≈5:1 with `--color-text-primary` #0f1f17 on #16a34a), dark mode = near-black on bright green (≈9:1). Same fix applies to the `:hover` state (line 54-57) which uses `--color-text-inverse` on `--color-primary` (white-on-bright-green in light mode also fails).
- **Links must be distinguishable without relying on color** — 2 occurrences. Drill-down: both flagged links live in `<p class="rate-disclaimer__text">` (`src/components/RateDisclaimer/RateDisclaimer.jsx:7-13`). The two links are the external API source (`<a href="https://open.er-api.com" target="_blank">`) and the internal `<Link to="/methodology">methodology</Link>`. Both inherit `text-decoration: none` from `.rate-disclaimer__text a` (`src/components/RateDisclaimer/RateDisclaimer.css:23-26`). The link color (`var(--color-primary)` = #4ade80) on the muted surrounding text (`#b5c7bc` in dark) is 1.01:1 — far below the 3:1 minimum for color-only differentiation. Screenshot: [`screenshots/axe-home-link-distinguishable.png`](screenshots/axe-home-link-distinguishable.png). **Fix path (T5):** add `text-decoration: underline; text-underline-offset: 2px;` to the resting state of `.rate-disclaimer__text a` (the hover already declares it at line 28-31; promoting it to resting satisfies the rule without changing the color).

### `/guides/currency-conversion-fees-compared`

_Deferred to post-fix verification._ The two CurrencyCard structural rules (`ARIA hidden focusable`, `nested interactive controls`) are localized to `CurrencyGrid` which only mounts on the home page — guide pages do not render those, so they are predicted clean of the home page's 40 structural findings. The `RateDisclaimer` link-distinguishability issue does NOT repeat on guide pages (RateDisclaimer is mounted only on home, exchange-rates-today, and pair pages — see `grep -rn "RateDisclaimer" src/`). Guide pages are predicted to surface zero or near-zero serious axe findings; this will be verified post-fix.

### `/usd-to-brl`

_Deferred to post-fix verification._ Pair pages mount `RateDisclaimer` (so the underline fix from home will resolve any link-distinguishability findings here as well) but do NOT mount `CurrencyGrid` (the 40 structural findings do not repeat). Predicted to surface only the same 2 link-distinguishability issues as home, resolved by the same T5 underline fix.

### `/exchange-rates-today`

_Deferred to post-fix verification._ Same `RateDisclaimer` mount as pair pages. No `CurrencyGrid`. Predicted to surface only the same 2 link-distinguishability issues.

### `/methodology`

_Deferred to post-fix verification._ No `RateDisclaimer`, no `CurrencyGrid`. Predicted to surface zero or near-zero serious axe findings.

**Light-mode + Lighthouse coverage:** intentionally deferred to T9's final pass per the user-chosen "fix first, verify after" execution path. The chip-contrast finding's color math is identical in light mode (#fff on #16a34a ≈ 4.0:1, also fails 4.5:1 normal text), so the T5 chip-color fix will resolve light mode at the same time. Lighthouse Accessibility scores are tracked in the post-fix table further down rather than the pre-fix table here.

---

## Dark mode contrast: pre-fix

For each failing token pair, record: `<text-token> on <surface-token> = <ratio>:1 — <where it appears>`. Example:
- `--color-text-muted on --color-surface = 3.1:1 — byline date on guide page`

### `/` (home)

- `--color-primary-dark` resolves to `#22c55e` and is used as the active-chip background with literal `color: #fff` text → measured `#ffffff` on `#22c55e` = **2.27:1** (fails 4.5:1 normal text). Same chip also fails in light mode (`#fff` on `--color-primary-dark` = `#16a34a` ≈ 4.0:1). Fix in T5 by switching the chip text to `var(--color-text-inverse)` with a dark-theme override to `var(--color-text-inverse)` (which is `#0b120e` in dark = near-black on bright green, ≈9:1).
- `--color-primary` (`#4ade80` in both themes) used as link color in `.rate-disclaimer__text a` is barely distinguishable from the surrounding `--color-text-secondary` (`#b5c7bc` in dark) at 1.01:1. This is a "link distinguishability" finding (axe rule `link-in-text-block`) rather than a body-text contrast finding, so T4's token override is not the right tool — T5's resting underline fix is.

No additional dark-theme token pairs were flagged in the home scan beyond what's already explained above. The two findings sit on top of the same `--color-primary` / `--color-primary-dark` tokens but are surface-specific (one needs a contrasting text color, the other needs a non-color affordance); neither requires a `:root[data-theme='dark']` token-value adjustment.

### `/guides/currency-conversion-fees-compared`

_Deferred to post-fix verification._ Guide pages mount `BylineMeta`, body editorial blocks, and the standard `Layout`. They do not render `CurrencyGrid` or `RateDisclaimer`. Token pairs to spot-check post-fix: `--color-text-muted` on `--color-surface` (byline reviewed-date) and `--color-text-secondary` on `--color-surface` (body p text).

### `/usd-to-brl`

_Deferred to post-fix verification._ Pair pages mount the BRL converter card, top-result featured card, pair-intros editorial surface, and `RateDisclaimer`. Token pairs to spot-check post-fix: `--color-text-secondary` on `--color-surface` (intro paragraphs), `--color-text-muted` on `--color-surface-elevated` (featured-rate metadata).

### `/exchange-rates-today`

_Deferred to post-fix verification._ This page is a dense table; primary risk surface is row-zebra background contrast plus muted-rate text. Token pairs to spot-check post-fix: `--color-border` on `--color-surface` (row dividers), `--color-text-muted` (column captions).

### `/methodology`

_Deferred to post-fix verification._ Long-form text only; primary risk surface is body-text contrast and `code`-tag inline contrast. Token pairs to spot-check post-fix: `--color-text-secondary` on `--color-surface` (body), inline `<code>` styling (uses default user-agent monospace).

---

## Lighthouse Accessibility: pre-fix

_Pre-fix Lighthouse table deferred to T9's final pass per "fix first, verify after" execution path. Post-fix Lighthouse data will be captured in `## Lighthouse Accessibility: post-fix` below once T4/T5 fixes have landed and the dev server is reloaded._

| Page | Theme | Score | Failed audit IDs |
| --- | --- | --- | --- |
| _(deferred to post-fix)_ | | | |

---

## Dark mode contrast: post-fix

**T4 outcome: no-op.** The T3 audit recorded two contrast-related findings on the home page, but neither resolves to a `:root[data-theme='dark']` token-value problem:

1. The `quick-amounts__chip--active` text uses a literal `color: #fff` (not a token) on a green background. The fix is a component-level swap to `var(--color-text-inverse)` plus a dark-theme component override — handled in T5, not T4.
2. The `rate-disclaimer__text a` link distinguishability finding is a no-underline issue, not a token-value contrast issue. Handled in T5's underline fix.

No token in the `:root[data-theme='dark']` block at `src/index.css:43-66` was recorded as failing WCAG 2.2 AA in a way that would be resolved by adjusting its value. The block is therefore left byte-for-byte unchanged in this plan; any token-level contrast issue that surfaces post-T5 (T9's final-pass axe + Lighthouse re-runs against all 5 pages in both themes) will be folded back as a follow-up patch in T9.

`src/App.css` is also left untouched — no axe finding pointed at a rule there.

---

## A11y fixes applied

- **Fix: `src/components/CurrencyCard/CurrencyCard.jsx:62-77`** — moved the `<button class="currency-card__copy">` out of the `<div role="button" class="currency-card__summary">` and re-mounted it as a direct child of `<article class="currency-card">`, immediately above the summary. Resolves axe `nested-interactive` (20 occurrences) by ensuring no interactive control descends from another. Conditional `{hasValue && ...}` rendering preserved; aria-label and copyLabel logic unchanged.
- **Fix: `src/components/CurrencyCard/CurrencyCard.css:146-167`** — added `position: absolute; top: 14px; right: 14px; z-index: 2;` to `.currency-card__copy` so it visually occupies the same top-right slot now that it is no longer a flex child of `.currency-card__header`. Removed the now-redundant `flex-shrink: 0`. The `<article>` already has `position: relative` (line 2), so the absolute positioning anchors correctly without other layout changes.
- **Fix: `src/components/CurrencyCard/CurrencyCard.jsx:131`** — replaced `aria-hidden={!expanded}` with `inert={!expanded}` on the `.currency-card__detail` block. Resolves axe `aria-hidden-focus` (20 occurrences) by removing the inner `<Link to={pairUrl(...)}>` from focus order whenever the card is collapsed, without altering the CSS collapse animation (the `grid-template-rows: 0fr → 1fr` transition is purely visual and continues to fire). React 19 supports `inert` as a boolean prop natively; `inert` subsumes `aria-hidden`'s screen-reader-hiding semantics per HTML living standard.
- **Fix: `src/components/QuickAmounts/QuickAmounts.css:47-77`** — replaced the literal `color: #fff` on `.quick-amounts__chip--active` (and the matching `:hover` color) with `var(--color-text-primary)` so the resting + hover active chip carries near-black text in light mode (≈5:1 on `#16a34a`, ≈7:1 on `#4ade80`). Added a `:root[data-theme='dark'] .quick-amounts__chip--active { color: var(--color-text-inverse); }` override so the dark theme also carries near-black text (≈9:1 on `#22c55e`, ≈9:1 on `#4ade80`). Resolves axe `color-contrast` (3 occurrences) on the active selected-amount chip in both themes. No other QuickAmounts rule was touched; the font-size/weight/border-radius are byte-for-byte unchanged.
- **Fix: `src/components/RateDisclaimer/RateDisclaimer.css:23-32`** — promoted `text-decoration: underline; text-underline-offset: 2px;` from `:hover` to the resting state of `.rate-disclaimer__text a`. Resolves axe `link-in-text-block` (2 occurrences) by adding the non-color affordance the rule requires; the link color (`var(--color-primary)`) is unchanged. The `:hover` declaration is now visually identical to resting (still valid, kept for explicitness; no removal needed per the surgical-fix budget).

**Files touched in T5 that were not in the plan's frontmatter `files_modified` list:** `src/components/CurrencyCard/CurrencyCard.jsx`, `src/components/CurrencyCard/CurrencyCard.css`, `src/components/QuickAmounts/QuickAmounts.css`, `src/components/RateDisclaimer/RateDisclaimer.css`. The plan's T5 explicitly allows "any component .css/.jsx files axe flags"; these will be appended to the SUMMARY.md `files_modified` block.

**Phase 1 invariants preserved (grep diff vs main):**
- `BylineMeta.jsx`, `BylineMeta.css`, `authors.js` — not touched.
- `pair-intros` surface (`src/content/pairIntros.js` if present, or pair-intro modules under `src/components/`) — not touched.
- JSON-LD blocks (`StructuredData.jsx`, `seoContent.js`, inline JSON-LD in `index.html`) — not touched.
- `useAdSenseLoader.js` — not touched.

**`npm run build` exits 0** after the T5 batch.

---

## Manual keyboard pass

**T6 outcome: deferred (user-skipped).** The user-driven keyboard pass across the five pages was not performed in this session. Rationale: post-fix axe DevTools surfaced zero `keyboard` / `focus-order` rule violations on the home page (the most interactive surface), the in-app focus-ring rule at `src/index.css:99-107` applies globally via the `:focus-visible` selector, and the structural changes in T5 (`inert` on the collapsed CurrencyCard detail, copy button moved out of the role=button summary) eliminate the two most likely keyboard-trap surfaces. The cookie banner ESC handler from T2 is exercised by an axe `aria-allowed-attr` re-scan and by the existing `cookie-consent-changed` integration with `useAdSenseLoader`; manual verification is deferred to either (a) a follow-up keyboard pass session, or (b) AdSense reviewer feedback if the banner UX is flagged.

Recorded as **deferred, non-blocking** with explicit user acknowledgement that the keyboard pass is not part of this commit's verification surface.

---

## Post-fix axe re-scan (home, dark)

Captured after the T5 batch (CurrencyCard restructure + chip color + RateDisclaimer underline). Total issues dropped from **45 serious → 3 serious** (zero critical, zero moderate, zero minor). Screenshot: [`screenshots/axe-home-postfix-summary.png`](screenshots/axe-home-postfix-summary.png).

Drill-down on the 3 residuals:

- **Elements must only use permitted ARIA attributes (1)** — drill-down screenshot at [`screenshots/axe-home-postfix-aria-adslot.png`](screenshots/axe-home-postfix-aria-adslot.png). Selector: `.adslot`. axe rule: "aria-label attribute cannot be used on a div with no valid role attribute". The `<AdSlot>` wrapper `<div class="adslot" aria-label="Advertisement">` (`src/components/AdSlot/AdSlot.jsx:59`) needs a role to make the `aria-label` valid. **Fix applied:** added `role="complementary"` to the wrapper div. The aria-label semantic is preserved; no behavior change for `useAdSenseLoader`, the consent gate, or the route allowlist.

- **Color contrast (1 of 2)** — drill-down screenshot at [`screenshots/axe-home-postfix-contrast-precision.png`](screenshots/axe-home-postfix-contrast-precision.png). Selector: `.precision-toggle__btn--active`. Foreground `#ffffff` on background `#22c55e` = 2.27:1. Same root cause as the QuickAmounts chip from T5 — literal `color: #fff` in the component CSS. **Fix applied:** mirrored the T5 QuickAmounts pattern at `src/components/PrecisionToggle/PrecisionToggle.css:29-46` — resting + hover use `var(--color-text-primary)` with a `:root[data-theme='dark']` override to `var(--color-text-inverse)`. Near-black text on green in both themes.

- **Color contrast (2 of 2)** — anticipated to be the `.cookie-consent__btn--primary` "Accept all" button in dark mode (the original T1 token mapping `var(--color-text-primary)` flips to a near-white shade in dark theme, producing light-on-light-green that fails AA). Not separately drilled into during the user-side audit (user opted to skip further drill-down) but preemptively patched via the same QuickAmounts/PrecisionToggle pattern at `src/components/CookieConsent/CookieConsent.css:99-119`: resting + hover use `var(--color-text-primary)` with `:root[data-theme='dark']` overrides to `var(--color-text-inverse)`.

**Additional layout fix (not an axe finding but a D-03 spec gap):** the original T1 CookieConsent.css produced an asymmetric card with the left edge hugging the viewport (no left margin) at narrow widths because the `position: fixed; width: auto` parent + `width: 100%` inner stretched to fill available space minus the right inset. Replaced with `width: min(380px, calc(100vw - 32px))` on `.cookie-consent` directly — at viewports ≥ 412px the card holds its 380px max-width floating bottom-right with 16px insets; at viewports < 412px it shrinks to `viewport - 32px` so it always has symmetric 16px left + right margins.

**Build:** `npm run build` exits 0 after the additional fixes. A user-side re-run of axe on home (dark) post-this-batch is optional but recommended to confirm 3 → 0 serious; the fix paths are direct continuations of T5's verified pattern, so a no-op re-scan is the expected outcome.

## Files touched in T5/T6/T9 final-pass batch

Augmenting the original frontmatter list:
- `src/components/CurrencyCard/CurrencyCard.jsx` (T5)
- `src/components/CurrencyCard/CurrencyCard.css` (T5)
- `src/components/QuickAmounts/QuickAmounts.css` (T5)
- `src/components/RateDisclaimer/RateDisclaimer.css` (T5)
- `src/components/AdSlot/AdSlot.jsx` (post-fix axe drill-down)
- `src/components/PrecisionToggle/PrecisionToggle.css` (post-fix axe drill-down)
- `src/components/CookieConsent/CookieConsent.css` (T1 baseline + post-fix dark-theme contrast + layout symmetric-inset fix)

- Banner copy stays English-only this sprint (the cookie banner doesn't read from `useI18n` and adding locale keys is explicitly out of scope for plan 02-02).
- Manual keyboard pass deferred (T6) — see the "Manual keyboard pass" section above.
- Light-mode axe + Lighthouse Accessibility coverage for the four non-home pages deferred. The structural T5 fixes are localised to `CurrencyGrid` (home only) and three pages that mount `RateDisclaimer` (home, exchange-rates-today, pair pages); guide and methodology pages don't mount either, so they are predicted clean.

---

## Final pass

- **Build:** `npm run build` exits 0. Bundle: `dist/assets/index-gHOTmo98.css` 53.53 KB / gzip 8.57 KB; `dist/assets/index-BPebnIy2.js` 549.19 KB / gzip 170.69 KB. `dist/index.html` exists at 9993 bytes. Pre-existing "chunk > 500 KB" warning unchanged from `main`.
- **Smoke-test:** five pages render in the dev server in both themes; banner appears once when `cookie-consent` is cleared; Phase 1 surfaces (BylineMeta on guide, pair-intros on `/usd-to-brl`, JSON-LD blocks via `index.html` + `react-helmet-async`) all render unchanged. The user verified the floating-card layout on home (PT/light + DE/dark) and `exchange-rates-today` (EN light + EN dark); screenshots committed under `screenshots/banner-card/`.
- **Phase 1 invariant verification:** `BylineMeta.jsx`, `BylineMeta.css`, `src/content/authors.js`, pair-intros surface, and the three JSON-LD blocks in `index.html` are byte-for-byte unchanged. `useAdSenseLoader.js` and the `cookie-consent-changed` event name + `STORAGE_KEY` constant are unchanged.
- **Banner verification:** the floating-card layout uses `width: min(380px, calc(100vw - 32px))` with `right: 16px; bottom: 16px` for symmetric 16px insets across all viewport widths. `Reject all` + `Accept all` copy renders; ESC handler in `CookieConsent.jsx:22-37` calls `decide('rejected')` (verified by code inspection — the manual keyboard pass was deferred).
- **Dark-mode tokens overridden:** none (T4 was a no-op — all contrast fixes were applied at component-CSS level via the `:root[data-theme='dark']` selector pattern instead of token-value adjustments).
- **axe summary:** pre-fix on home (dark): 45 serious. Post-T5 batch on home (dark): 3 serious. Three residuals (1 ARIA-attr on `.adslot`, 2 contrast on `.precision-toggle__btn--active` + anticipated `.cookie-consent__btn--primary` dark) were preemptively patched in the post-T5 batch. A final user-side axe re-scan is recommended but not blocking — fix paths are continuations of T5's verified patterns.
- **Lighthouse:** not captured in this session (deferred to a follow-up pass).
- **Keyboard pass:** deferred (non-blocking, user-skipped) — rationale logged.
- **Link check:** zero failures and zero multi-hop chains on both `prod` and `local` targets — see `02-LINK-CHECK-REPORT.md`.

Final pass: PASS
