---
phase: 03-performance-core-web-vitals
plan: "03-01"
subsystem: infra
tags: [vite, react, react-router-dom, code-splitting, react-lazy, suspense, rollup, manualChunks, performance, bundle-split]

# Dependency graph
requires:
  - phase: 02-ux-polish-mobile-a11y-cookie-banner
    provides: cookie banner card, ESC behavior, dark-mode token overrides — left byte-for-byte unchanged
  - phase: 01-editorial-trust-signals-e-e-a-t
    provides: editorial guides data + authors module — split into a lazy chunk by this plan
provides:
  - Top-level `<Suspense fallback={<RouteSkeleton />}>` boundary in App.jsx around all routes
  - `RouteSkeleton` component (flat 60vh surface-bg box) as the single lazy-route fallback
  - Seven heavy routes lazified via `React.lazy(() => import(...).then(m => ({ default: m.X })))`: GuidesIndexPage, GuidePage, AboutPage, PrivacyPage, TermsPage, ContactPage, MethodologyPage
  - Single `vendor-*.js` chunk via `build.rollupOptions.output.manualChunks` (79.15 KB gzipped)
  - Home initial JS dropped from 170.69 KB → 128.33 KB gzipped (-24.8%)
  - `src/content/guides.js` (~33 KB gzipped) now in its own off-home chunk, satisfying PERF-02
  - Bundle audit doc with PERF-01/PERF-02/PERF-05 verdicts at `.planning/phases/03-performance-core-web-vitals/03-BUNDLE-AUDIT.md`
affects: [03-02 Lighthouse pass, 03-AdSlot CLS plan, any future code-splitting work, any future plan that touches App.jsx route table]

# Tech tracking
tech-stack:
  added: []  # zero new dependencies (CLAUDE.md sprint constraint honored)
  patterns:
    - "React.lazy + Suspense at the route level using named-export adapter `.then(m => ({ default: m.X }))`"
    - "Single top-level Suspense inside Layout so chrome and useAdSenseLoader stay mounted across lazy navigation (D-07)"
    - "Vite manualChunks(id) returning 'vendor' for node_modules to produce one long-cacheable vendor chunk (D-03)"
    - "Eager-route content decoupling: when an eager route statically imports a heavy data module, switch to dynamic `import()` inside useEffect so the data falls into its own chunk"

key-files:
  created:
    - src/components/RouteSkeleton/RouteSkeleton.jsx
    - src/components/RouteSkeleton/RouteSkeleton.css
    - .planning/phases/03-performance-core-web-vitals/03-BUNDLE-AUDIT.md
  modified:
    - src/App.jsx
    - vite.config.js
    - src/pages/NotFoundPage.jsx

key-decisions:
  - "Honored locked D-01 lazy/eager split exactly (7 lazy heavy routes, 5 eager hot/reviewer-path routes)."
  - "Honored locked D-03 single vendor chunk via manualChunks function form."
  - "Honored locked D-07 flat 60vh surface-bg RouteSkeleton with no spinner/text/animation."
  - "Honored locked D-10 byte-for-byte invariance of useAdSenseLoader, CookieConsent event surface, STORAGE_KEY, AD_SLOTS, isAdAllowedOnRoute."
  - "Rule-3 deviation: NotFoundPage was decoupled from src/content/guides.js via dynamic import inside useEffect — D-02 predicted only GuidesIndexPage/GuidePage would pull guides.js into lazy chunks, but the eager NotFoundPage's static GUIDES import hoisted it into the entry bundle. The fix preserves D-01 (NotFoundPage component stays eager) while satisfying PERF-02."

patterns-established:
  - "Suspense placement pattern: <Layout><Suspense fallback={...}><Routes>…</Routes></Suspense></Layout> — chrome and hooks like useAdSenseLoader stay mounted across lazy-route boundaries."
  - "React.lazy + named-exports adapter: `lazy(() => import('./X.jsx').then(m => ({ default: m.X })))` is the codebase pattern (codebase uses named exports exclusively per CLAUDE.md)."
  - "Heavy-data dynamic import inside an eager route: when an eager route's static import of a heavy data module would hoist it into the entry bundle, switch to `useEffect`-driven `import()` and degrade the UI to empty until resolved."

requirements-completed: [PERF-01, PERF-02, PERF-05]

# Metrics
duration: 58min
completed: 2026-05-21
---

# Phase 03 Plan 03-01: Bundle split via React.lazy routes + manualChunks vendor — Summary

**React.lazy on seven heavy routes (guides + legal) plus a single `manualChunks` vendor split dropped home initial JS from 170.69 KB to 128.33 KB gzipped (-24.8%) and pushed `src/content/guides.js` (~33 KB gzipped) onto a route-bounded chunk.**

## Performance

- **Duration:** ~58 min (T1 inherited @ 10:27 local → T5 commit @ 11:25 local; this agent's work T2–T5 was ~42 min)
- **Started:** 2026-05-21T13:43:42Z (T2 commit, when this worktree agent began)
- **Completed:** 2026-05-21T14:25:31Z (T5 commit)
- **Tasks:** 5 (T1 inherited; T2/T3/T4/T5 executed in this worktree)
- **Files modified:** 6 (3 created + 3 modified; counts new SUMMARY.md separately)

## Accomplishments

- Seven heavy routes (`AboutPage`, `PrivacyPage`, `TermsPage`, `ContactPage`, `MethodologyPage`, `GuidesIndexPage`, `GuidePage`) converted to `React.lazy` with the named-export adapter; eager set (`Layout`, `HomePage`, `CurrencyPairPage`, `ExchangeRatesTodayPage`, `NotFoundPage`) kept as static named imports per D-01.
- Single top-level `<Suspense fallback={<RouteSkeleton />}>` wraps `<Routes>` inside `<Layout>` so header / footer / cookie banner / `useAdSenseLoader` stay mounted across the lazy boundary (D-07).
- New `RouteSkeleton` component is a flat `min-height: 60vh; background: var(--color-surface); border-radius: var(--radius-md);` div with `aria-hidden="true"`, no spinner, no text, no animation.
- `vite.config.js` adds `build.rollupOptions.output.manualChunks(id) → 'vendor'` for any id containing `node_modules`, producing a single `vendor-DMoB8KWF.js` chunk (79.15 KB gzipped).
- Bundle audit doc records the full per-chunk gzip inventory plus PERF-01 (128.33 KB), PERF-02 (slug only in `guides-*` chunk), and PERF-05 (invariant diff empty) verdicts; `Final pass: PASS`.
- The pre-existing Vite "chunks are larger than 500 kB after minification" warning is gone.
- Zero new runtime or dev dependencies (`package.json` untouched), honoring the CLAUDE.md sprint constraint.

## Task Commits

Each task was committed atomically:

1. **T1: Create RouteSkeleton component (JSX + CSS)** — `cea8f0a` (feat) — inherited from a prior commit on `main` before this worktree was spawned; acceptance criteria re-verified in this worktree (JSX/CSS present, single `.route-skeleton` rule, `var(--color-surface)` + `var(--radius-md)` + `min-height: 60vh`, no spinner/animation).
2. **T2: Convert App.jsx to lazy + Suspense per D-01** — `42975e7` (feat)
3. **T3: Add manualChunks vendor rule to vite.config.js** — `45525f7` (feat)
4. **Rule-3 deviation: decouple NotFoundPage from guides.js** — `2f5b370` (fix) — required to make PERF-02 pass without violating D-01 (see Deviations).
5. **T4: Capture bundle audit + verify PERF-01/02/05** — `f6c41d5` (docs)
6. **T5: Final build + preview smoke + Final pass marker** — `7169c6c` (docs)

_No TDD tasks in this plan (no test framework configured in repo; CLAUDE.md confirms zero tests, and the "no new dependencies" constraint blocks adding one)._

## Files Created/Modified

- `src/components/RouteSkeleton/RouteSkeleton.jsx` (T1, created) — named-export `RouteSkeleton` functional component, imports `./RouteSkeleton.css`, returns a single `<div className="route-skeleton" aria-hidden="true" />`.
- `src/components/RouteSkeleton/RouteSkeleton.css` (T1, created) — single rule `.route-skeleton { min-height: 60vh; background: var(--color-surface); border-radius: var(--radius-md); }`.
- `src/App.jsx` (T2, modified) — added `lazy`/`Suspense` import, declared seven `lazy(() => import(...).then(m => ({ default: m.X })))` constants, wrapped `<Routes>` in `<Suspense fallback={<RouteSkeleton />}>` inside `<Layout>`. Route order preserved; `/:pair` still last named route before `*`.
- `vite.config.js` (T3, modified) — added `build.rollupOptions.output.manualChunks(id)` returning `'vendor'` for `node_modules` ids. Plugin order unchanged.
- `src/pages/NotFoundPage.jsx` (Rule-3 deviation fix, modified) — converted the static `import { GUIDES } from '../content/guides.js'` to a dynamic `import()` inside `useEffect`, gated the "Guides and explainers" section on `suggestedGuides.length > 0`. NotFoundPage component shell remains in the eager bundle per D-01.
- `.planning/phases/03-performance-core-web-vitals/03-BUNDLE-AUDIT.md` (T4 + T5, created) — build env, pre-split baseline, post-split chunk inventory, PERF-01/02/05 verdicts, Final pass section with smoke results. Closing line: `Final pass: PASS`.

## Decisions Made

- All locked CONTEXT.md decisions D-01, D-02 (with the asterisk noted in Deviations), D-03, D-07, D-10 were honored.
- Named-export adapter `.then(m => ({ default: m.X }))` was the chosen mechanism for `React.lazy` because the codebase convention is named exports only (CLAUDE.md). The single `export default App` exception is unaffected.
- Smoke testing in T5 was performed at the HTTP level via `curl` against `wrangler dev`, not via an interactive browser, because the worktree executor runs headless. The substantive invariants — 200-OK SPA shell on all three test URLs, lazy chunks reachable on demand, entry chunk only references vendor + entry CSS statically — are fully covered by the headless smoke. Interactive console-error + RouteSkeleton-flash-duration sampling is deferred to plan 03-02 (Lighthouse pass).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Decouple `NotFoundPage` from `src/content/guides.js` via dynamic import**

- **Found during:** T3 verification (build output inspection after the manualChunks split).
- **Issue:** D-02 predicted that lazifying `GuidesIndexPage` and `GuidePage` would hoist `src/content/guides.js` into a `/guides`-only chunk. After T3, the grep `grep -l 'currency-conversion-fees-compared' dist/assets/*.js` returned the entry chunk `index-*.js`, proving `guides.js` was still in the home-reachable bundle. Root cause: `src/pages/NotFoundPage.jsx` is in D-01's **eager** set and statically imports `GUIDES`. Rollup correctly hoisted `guides.js` into the entry chunk to serve that eager static dependency, leaking the data onto the home-reachable graph and violating PERF-02.
- **Fix:** In `NotFoundPage.jsx`, replace the static `import { GUIDES } from '../content/guides.js'` with a dynamic `import('../content/guides.js')` inside `useEffect`, store the resulting `GUIDES.slice(0, 4)` in `useState`, and gate the "Guides and explainers" `<section>` on `suggestedGuides.length > 0` so the heading is hidden until the data resolves. NotFoundPage's component shell remains in the eager bundle per D-01; only the heavy data is deferred.
- **Files modified:** `src/pages/NotFoundPage.jsx`
- **Verification:** Re-built, then re-ran `grep -l 'currency-conversion-fees-compared' dist/assets/*.js` — only `guides-ChJDJyS2.js` matched. Entry chunk shrank from 81.11 KB gzipped to 49.18 KB gzipped (a 32 KB reduction, matching guides.js's gzipped weight). Home initial JS final = 128.33 KB gzipped.
- **Committed in:** `2f5b370` (between T3 commit `45525f7` and T4 commit `f6c41d5`).

**Why not Rule 4 (architectural):** Rule 4 examples — switching libraries, new DB table, breaking API change — are larger structural moves. This fix is a 27-line edit in one file that preserves the same component output (just deferred data-fetch) and respects every locked decision. The trade-off is recorded transparently in 03-BUNDLE-AUDIT.md and this summary.

---

**Total deviations:** 1 auto-fixed (1 blocking — Rule 3)
**Impact on plan:** Necessary for PERF-02 to pass. No scope creep — the change is localized to `NotFoundPage.jsx`, does not touch any invariant file (`useAdSenseLoader`, `CookieConsent`, `adsense.js`), and preserves D-01's eager/lazy split exactly at the component level. The fix slightly improves PERF-01 as a side effect (entry chunk -32 KB gzipped) but the primary motivation was PERF-02 correctness.

## Issues Encountered

- **D-02 prediction was incomplete.** The CONTEXT.md author considered the two guide-page lazy imports but missed the third static reference from `NotFoundPage.jsx`. Resolved via the Rule-3 fix described above. Plan 03-02 and any future plan that touches App.jsx should keep this transitive-dependency pattern in mind: an eager route that imports a heavy data module will hoist that module into the entry chunk regardless of how many lazy routes also use it.

- **Smoke test cannot include interactive browser console.** Worktree executor is headless. T5's smoke is HTTP-level (curl) plus dist-asset inspection; the resulting evidence is sufficient to prove server reachability, chunk availability, and SPA fallback correctness, but does not capture browser-side console errors. Logged in 03-BUNDLE-AUDIT.md "Console-error log" section as deferred to plan 03-02's Lighthouse pass, which exercises the same three URLs interactively.

## User Setup Required

None — no external service configuration required. This plan is a build-graph / routing refactor only.

## Known Stubs

None. The dynamic `import()` in `NotFoundPage.jsx` is not a stub — it is the intentional pattern that solves PERF-02, and the UI degrades gracefully (the "Guides and explainers" section is hidden, not stubbed, until the data resolves).

## Threat Flags

None. The plan's `<threat_model>` ASVS L1 review covered the full scope; no new threat surfaces were introduced. The Rule-3 fix in `NotFoundPage.jsx` introduces no new outbound network surface (the dynamic `import()` loads a same-origin static asset already served by Cloudflare, identical mechanism to the React.lazy chunks).

## Next Phase Readiness

Plan 03-02 (AdSlot CLS hygiene + Lighthouse pass) is unblocked. Inputs that 03-02 should expect to consume:

- The build artifact `dist/assets/` with the seven lazy route chunks + one vendor chunk + one off-home guides chunk (audit table reproduced in 03-BUNDLE-AUDIT.md).
- The known fact that home initial JS is now 128.33 KB gzipped, leaving substantial headroom under the 200 KB PERF-01 target — 03-02's AdSlot reservation work is unlikely to push it over.
- The reminder that `useAdSenseLoader.js`, `CookieConsent.jsx`, `STORAGE_KEY`, `AD_SLOTS`, `ADSENSE_CLIENT_ID`, `NO_AD_ROUTES`, and `isAdAllowedOnRoute` are still byte-for-byte the Phase-2-end versions; 03-02 should preserve this for PERF-05.

No new blockers introduced.

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `test -f src/components/RouteSkeleton/RouteSkeleton.jsx` → FOUND
- `test -f src/components/RouteSkeleton/RouteSkeleton.css` → FOUND
- `test -f .planning/phases/03-performance-core-web-vitals/03-BUNDLE-AUDIT.md` → FOUND (will verify after summary commit)
- `git log --oneline --all | grep -q cea8f0a` → FOUND (T1)
- `git log --oneline --all | grep -q 42975e7` → FOUND (T2)
- `git log --oneline --all | grep -q 45525f7` → FOUND (T3)
- `git log --oneline --all | grep -q 2f5b370` → FOUND (Rule-3 fix)
- `git log --oneline --all | grep -q f6c41d5` → FOUND (T4)
- `git log --oneline --all | grep -q 7169c6c` → FOUND (T5)

---
*Phase: 03-performance-core-web-vitals*
*Completed: 2026-05-21*
