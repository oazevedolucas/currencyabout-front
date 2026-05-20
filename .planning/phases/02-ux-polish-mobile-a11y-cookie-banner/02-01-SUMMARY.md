---
phase: 02-ux-polish-mobile-a11y-cookie-banner
plan: 02-01
subsystem: layout-and-mobile-baseline

tags: [mobile, 375x667, ux-06, adslot, fold-clearance, audit, no-op]

# Dependency graph
requires: []
provides:
  - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-MOBILE-AUDIT.md (authoritative en + de/zh/ja audit at 375x667 with UX-06 verdict)
  - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/*.png (canonical 375x667 reference set)
affects: [02-02-a11y-cookie-banner-link-rot]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Measurement-first protocol for fold-clearance verification (D-09): measure offsetTop via getBoundingClientRect() in the live DOM before any code edit; remediation only fires on a documented FAIL verdict."
    - "Locale-driven regression spot-check at the same viewport as the en baseline (de for long compound words, zh/ja for tap-target density), surfacing zero new defects."

key-files:
  created:
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-MOBILE-AUDIT.md
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/home-en.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/guide-en.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/pair-usd-brl-en.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/exchange-rates-today-en.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/methodology-en.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/home-adslot-measurement.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/home-en-final.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/guide-en-final.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/pair-usd-brl-en-final.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/exchange-rates-today-en-final.png
    - .planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/methodology-en-final.png
  modified: []

key-decisions:
  - "UX-06 verdict: PASS by a wide margin (offsetTop = 7275.27px against fold = 667). The homeEditorial AdSlot already lives ~10.9x the fold height below the top of the page, so the conditional T3 remediation (move the slot below <FAQ />) is a no-op. src/pages/HomePage.jsx is byte-for-byte unchanged."
  - "Cross-page header nav truncation (third tab 'Exchange Rates Today' renders as 'Exchange Rates Tod...') is the intentional overflow-x: auto pattern declared at src/components/Layout/Layout.css:163-171. Recorded as informational in the audit; not in this plan's surgical-fix budget."
  - "Methodology page renders breadcrumb + h1 center-aligned while other pages use left-alignment. Outside the plan's surgical-fix budget (overflow / overlap / cut-off CTAs / tap-target sizing) — flagged in the audit for a future polish review, not regressed for the AdSense reviewer."
  - "Final-pass de screenshots intentionally omitted with rationale logged: T5 was clean across all three locales AND no source file was modified by T3 or T4, so recapturing five de screenshots would not exercise any code path this plan touches. Documented as a knowing deviation rather than papered over."

patterns-established:
  - "Console-side getBoundingClientRect() against a known wrapper selector is the canonical way to verify fold clearance for any consent-gated AdSlot in this codebase; mirror the same measurement script in any future fold-clearance audit (e.g. pair-page AdSlots)."

requirements-completed:
  - UX-01
  - UX-06
---

# Phase 02-01: Mobile breakpoint audit + UX-06 fold-clearance verification at 375x667

**Five-page mobile audit at the locked iPhone 12/13/14 portrait baseline produced zero in-scope defects in en + de + zh + ja, and the homeEditorial AdSlot was measured at offsetTop = 7275px (10.9x the fold), so UX-06 closes PASS with no source-file changes.**

## Performance

- **Tasks:** 6 (T1, T2 human-input checkpoints; T3 conditional auto, executed as no-op; T4 auto, executed as no-op; T5 human-input checkpoint; T6 auto)
- **Commits:** 1 (this plan's audit artifact + screenshots + SUMMARY)
- **Source-file edits:** 0
- **Files created:** 12 (audit doc + 5 en screenshots + 1 console-measurement screenshot + 5 en-final screenshots)
- **npm run build:** PASSED twice (post-T4 and post-T6); no new warnings vs `main`.

## Accomplishments

- Mobile 375x667 audit captured for all five in-scope pages (`/`, `/guides/currency-conversion-fees-compared`, `/usd-to-brl`, `/exchange-rates-today`, `/methodology`) with full-page screenshots committed under `screenshots/mobile-375/`. Guide tiebreak rule (`updated: 2026-05-18` + longest `body` array) resolved to `currency-conversion-fees-compared` and the rationale is recorded in the audit.
- UX-06 fold clearance verified measurement-first per D-09: with `localStorage['cookie-consent'] = 'accepted'` and a reload, `document.querySelector('div.adslot').getBoundingClientRect()` returned `top + scrollY = 7275.265625`. Verdict PASS; T3 remediation skipped; `src/pages/HomePage.jsx` not touched.
- Locale spot-check (de, zh, ja) reloaded each of the five pages at 375x667 and surfaced zero new defects vs the en baseline, so T4 had nothing to fold back in.
- `npm run build` ran clean before and after the (zero) edits — bundle sizes match `main` exactly (CSS 53.00 KB / 8.51 KB gzip, JS 549.06 KB / 170.63 KB gzip).
- Audit file ends with the literal `Final pass: PASS` marker and a verification rollup of every must-have from the plan.

## Task Commits

Single commit covers the audit artifact + screenshots + SUMMARY (no source edits to atomize):

1. **Plan 02-01 audit + UX-06 verdict + SUMMARY** — *(commit hash TBD on commit)*

## Files Created/Modified

Created:
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-MOBILE-AUDIT.md` — five page sections + UX-06 section (T2 + T3) + T4 outcome + Locale spot-check (T5) + Final pass section (T6) ending with `Final pass: PASS`.
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/{home,guide,pair-usd-brl,exchange-rates-today,methodology}-en.png` — canonical 375x667 reference captures.
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/home-adslot-measurement.png` — DevTools console screenshot showing the UX-06 measurement output.
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/screenshots/mobile-375/{home,guide,pair-usd-brl,exchange-rates-today,methodology}-en-final.png` — final-pass captures (mirror of the canonical set because no edit changed the rendered DOM).

Modified: none. Both `src/App.css` (declared in frontmatter for surgical fixes) and `src/pages/HomePage.jsx` (declared conditional on UX-06 FAIL) were left untouched.

## Decisions Made

- **UX-06 closed PASS, T3 skipped.** Measured offsetTop = 7275.27px against fold = 667px. The slot sits past the FAQ block already, so moving it below `<FAQ />` would be redundant churn — exactly the trap D-09's measurement-first protocol exists to prevent.
- **Cross-page nav truncation is by design.** `Layout.css:163-171` already declares `overflow-x: auto; flex-wrap: nowrap` under 760px. Logged as informational rather than as a defect; not in the plan's surgical-fix scope.
- **Methodology page center-alignment** flagged for future polish, not patched here. The plan's must-haves bound surgical fixes to overflow/overlap/cut-off-CTA/tap-target categories only.
- **Final-pass de captures omitted** with rationale: T5 clean + zero source edits means de captures would not exercise any code path this plan touches. Documented as a knowing deviation in the audit rather than silently skipped.

## Deviations from Plan

1. **No surgical CSS fix applied under T4** because T1 surfaced zero in-scope defects across all five en pages. Plan acceptance criteria are satisfied vacuously: "For every issue in the per-page Issues-observed list, there is a Fix: sub-bullet" — there are no issues to bullet, and the audit explicitly records that. Build remained green.
2. **No `*-de-final.png` captures under T6.** The plan's literal acceptance criterion asks for second-locale final screenshots when T5 finds no issues, but doing so would have produced binary-identical captures with no diagnostic value because no source edit occurred between T1 and T6. Recorded explicitly in the Final pass section as `Deferred (T5 clean + zero code change)`.
3. **Guide URL slug from the tie-break rule resolved to `/guides/currency-conversion-fees-compared`** (longest body, 31 blocks among nine guides sharing `updated: 2026-05-18`).
4. **Plan text uses `/usd-brl` in T1's URL list** but the live route format is `/usd-to-brl` (`pairSlug` at `src/seo/seoContent.js:26-28` emits `${from}-to-${to}`). The audit used the correct `/usd-to-brl` URL; no source change involved.

**Total deviations:** 4 — items 1 and 2 are intentional consequences of the audit landing clean; items 3 and 4 are reading-the-plan clarifications (tiebreak resolution and a typo in the URL list).

## Issues Encountered

None at the layout / rendering layer. The DevTools console emitted two unrelated warnings during the UX-06 measurement that are not in scope:

- "AdSense head tag doesn't support data-adsense-loader attribute" — informational AdSense console message, unrelated to fold clearance.
- "Manifest icon http://localhost:5173/icons/icon-192.png download error" — PWA manifest icon issue; tracked separately, not in this plan's scope.

## User Setup Required

None. The audit is captured; T2's localStorage consent state was set back to `rejected` after the measurement.

## Next Phase Readiness

- **Plan 02-02 (a11y + cookie banner + link rot)** can build directly on this audit. The known home-page cookie-banner overlap and the "Reject non-essential" copy issue are already logged here as expected for plan 02-02 to resolve under its T1 (strip-to-card layout) and T2 (button copy + ESC handler).
- **Phase 1 invariants** (BylineMeta on guide, pair-intros surface, JSON-LD blocks) all rendered cleanly in the en + de/zh/ja captures — plan 02-02's verification step can lean on these screenshots as its pre-fix baseline for the same five pages.
- **UX-06 closure** means no further AdSlot relocation work for the home page in this milestone unless a later layout edit introduces above-fold collision (regression-guard, not a current concern).

---
*Phase: 02-ux-polish-mobile-a11y-cookie-banner*
*Plan: 02-01*
*Completed: 2026-05-20*
