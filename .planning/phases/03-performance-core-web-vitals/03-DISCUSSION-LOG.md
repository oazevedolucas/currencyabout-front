# Phase 3 — Discussion Log

**Date:** 2026-05-21
**Phase:** 03-performance-core-web-vitals
**Mode:** discuss (default)
**Workflow:** `/gsd-discuss-phase 3`

This log is for human reference only — audits, retrospectives, "why did we decide X" recall. Downstream agents (researcher, planner, executor) read `03-CONTEXT.md` instead.

---

## Pre-flight scout

Before the gray-area selection, Claude grounded the discussion in repo state:

- `App.jsx` confirmed as fully-eager (11 static imports). No `React.lazy` anywhere today.
- `src/content/guides.js` is statically imported by `GuidesIndexPage` + `GuidePage` (both eager today) → lands in the home bundle.
- `vite.config.js` minimal — no `manualChunks` config.
- Last build (Phase 2): 549 KB JS / 170 KB gzipped; 53 KB CSS / 8.5 KB gzipped. Pre-existing "chunks > 500 kB" warning.
- `AdSlot.jsx` has consent gate + IntersectionObserver, no `min-height` reservation today.
- 5 ad slots in `src/constants/adsense.js`: `homeEditorial`, `guideMid`, `guideEnd`, `pairBelowConversion`, `pairEnd`.
- 5 legal pages (`/about`, `/privacy-policy`, `/terms`, `/contact`, `/methodology`) all eager imports.

Phase 1 (already shipped) is the source of the added `guides.js` weight (byline metadata + reviewed dates), which is why Phase 3 was sequenced after it.

---

## Gray areas presented (batch 1 — 4 questions)

### Q1: Which routes go through React.lazy?

| Option | Description |
|---|---|
| **A — Heavy routes only (Recommended)** | Lazy: guides + 5 legal pages. Eager: Layout, HomePage, CurrencyPairPage, ExchangeRatesTodayPage, NotFoundPage. |
| B — Everything except Home + Layout | Lazy 10 routes. Most aggressive split. |
| C — Only guides routes | Lazy only guides. Smallest PR. |

**User selected:** **A — Heavy routes only.** → D-01.

### Q2: How to chunk node_modules?

| Option | Description |
|---|---|
| A — Single vendor chunk | One `vendor.js` for react + react-dom + react-router + helmet. Maximises HTTP/2 multiplexing on first paint. |
| **B — Split by package (Recommended)** | Three groups for independent caching. |
| C — Let Rollup decide | No manualChunks config. |

**User selected:** **A — Single vendor chunk.** (Overrode the "Recommended" pick.) → D-03. Rationale (Claude's inference, recorded in CONTEXT.md): the four runtime packages co-version with the app and rarely diverge between deploys; a single chunk is simpler and HTTP/2-multiplex friendly. If post-deploy cache analytics suggest splitting, revisit in a follow-up phase.

### Q3: Where do AdSlot per-slot min-heights live?

| Option | Description |
|---|---|
| **A — Constants + inline style (Recommended)** | `SLOT_RESERVATIONS` map in `src/constants/adsense.js`; `AdSlot.jsx` reads + inlines style. |
| B — CSS attribute selector per slotId | `data-slot` attr + per-slot CSS rule. |
| C — Single conservative height for all slots | Hardcode 280 px on `.adslot`. |

**User selected:** **A — Constants + inline style.** → D-04.

### Q4: How is PERF-04 verified (LCP/CLS/INP)?

| Option | Description |
|---|---|
| **A — Lighthouse local + prod post-deploy (Recommended)** | Pre-deploy on `npm run preview`; post-deploy against currencyabout.com. |
| B — Lighthouse local only | Faster cycle, riskier (no prod-reality check). |
| C — PageSpeed Insights only (prod) | Single source of truth, slower fix loop. |

**User selected:** **A — Lighthouse local + prod post-deploy.** → D-08, D-09.

---

## Gray areas presented (batch 2 — 2 questions)

### Q5: Suspense fallback while lazy chunks load — what shows?

| Option | Description |
|---|---|
| A — null (Layout persists, content flashes blank) | Cleanest, no spinner. |
| **B — Minimal skeleton box (Recommended)** | Flat min-height: 60vh skeleton, no spinner. |
| C — Spinner / 'Loading...' text | Heavier visual; risks janky flashes. |

**User selected:** **B — Minimal skeleton box.** → D-07.

### Q6: How aggressive should the per-slot min-height reservation be?

| Option | Description |
|---|---|
| **A — Match expected ad sizes (Recommended)** | 280 / 250 / 250 / 280 / 250 per the five slots; matches AdSense docs ranges. |
| B — Conservative uniform 300 px | Simpler; wastes whitespace on smaller slots. |
| C — Match ad-format constraints exactly | Most complex; needs per-placement doc lookup. |

**User selected:** **A — Match expected ad sizes.** → D-05.

---

## Scope-creep redirections

None during this discussion. The user stayed inside the phase scope; only locked decisions were captured.

## Deferred ideas captured

Logged in `03-CONTEXT.md` `<deferred>` block:

1. **Pre-consent AdSlot placeholder (inert reservation)** — revisit only if post-deploy CrUX shows CLS > 0.1 on first-visit users.
2. **Split react / react-router / helmet into separate vendor chunks** — revisit if cache analytics show divergent update cadence.
3. **Cloudflare cache rule tightening / asset-versioning headers** — revisit if prod LCP misses target and bundle is not the culprit.
4. **Image / font optimisation** — not applicable today; revisit if future phases add raster images.
5. **`rollup-plugin-visualizer` for bundle analysis** — blocked by sprint "no new deps" constraint.

## Claude's Discretion items (no user vote)

These were not asked because they don't materially change the implementation surface:

- Bundle-size verification uses Vite's per-chunk gzip output from `npm run build` (no analyzer dep).
- Lighthouse profile: Chrome DevTools panel, device "Mobile", throttling "Slow 4G + 4x CPU slowdown", standard config; record Lighthouse + Chrome version.
- Test pages for measurement: home `/`, `/guides/currency-conversion-fees-compared` (same guide selected in Phase 2 — most-recently-updated + longest body), `/usd-to-brl` (popular pair, already-verified Phase 1 surfaces).
- Cloudflare cache configuration not touched in this phase.
- Image / font optimisation not in scope.

## Outcome

`03-CONTEXT.md` written with 10 implementation decisions across 7 categories. Ready for `/gsd-plan-phase 3`.
