# Phase 3: Performance + Core Web Vitals - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Bring the now-heavier (post-Phase 1) currencyabout.com bundle into the "Good" Core Web Vitals band on mobile, by code-splitting the route table with `React.lazy` so the editorial guide content stops shipping in the home payload, by grouping `node_modules` into a single long-cacheable vendor chunk, and by reserving vertical space for every `<AdSlot />` from first paint so post-consent ad injection never produces layout shift. Scope is **bundle + CLS hygiene, not a rewrite** — the converter, i18n provider, theme provider, AdSense consent gate, `useAdSenseLoader` script-injection logic, and Phase 1 editorial surfaces are byte-for-byte preserved.

Five requirements anchor this phase:
- **PERF-01:** Home initial JS payload < 200 KB gzipped after `vite build`.
- **PERF-02:** `src/content/guides.js` loads only on `/guides` and `/guides/:slug`.
- **PERF-03:** `<AdSlot />` reserves vertical space from first paint via a per-slot `min-height` map.
- **PERF-04:** Mobile LCP < 2.5s, CLS < 0.1, INP < 200ms on home / one guide / one pair, measured under Lighthouse "Slow 4G + 4x CPU throttle".
- **PERF-05:** AdSense loader script remains `async` + consent-gated; `useAdSenseLoader` behaviour unchanged from commit `5f46310`.

</domain>

<decisions>
## Implementation Decisions

### Route lazy-loading scope (PERF-01, PERF-02)

- **D-01: Lazy = heavy routes only.** Convert these routes in `src/App.jsx` to `React.lazy(() => import('...'))`:
  - `GuidesIndexPage` (`src/pages/guides/GuidesIndexPage.jsx`)
  - `GuidePage` (`src/pages/guides/GuidePage.jsx`)
  - `AboutPage` (`src/pages/legal/AboutPage.jsx`)
  - `PrivacyPage` (`src/pages/legal/PrivacyPage.jsx`)
  - `TermsPage` (`src/pages/legal/TermsPage.jsx`)
  - `ContactPage` (`src/pages/legal/ContactPage.jsx`)
  - `MethodologyPage` (`src/pages/legal/MethodologyPage.jsx`)
  Stays eager: `Layout`, `HomePage`, `CurrencyPairPage`, `ExchangeRatesTodayPage`, `NotFoundPage`. Rationale: home + pair + exchange-rates-today are the AdSense reviewer's entry-point flow (and the most-trafficked surfaces); they need to render without a chunk-fetch round-trip on slow 4G. Heavy routes (guides + legal) get the navigation latency, which is acceptable because users only reach them via an explicit click.

- **D-02: Lazy GuidesIndexPage + GuidePage transitively satisfies PERF-02.** Both modules statically import `GUIDES` from `src/content/guides.js`; once they are in their own chunks, Rollup will hoist `guides.js` into those chunks (or into a shared `guides` chunk if it deduplicates). Confirm via the build output that no chunk reachable from `/` (home) or `/:pair` references `guides.js`. No additional refactor of `guides.js` itself.

### Vendor chunking (PERF-01)

- **D-03: Single vendor chunk.** Add a `build.rollupOptions.output.manualChunks` rule in `vite.config.js` that groups everything under `node_modules` into one `vendor.js` chunk (react + react-dom + react-router-dom + react-helmet-async + any internal cloudflare runtime). Rationale: the four runtime packages are co-versioned with the app and update together on most deploys; a single vendor chunk maximises HTTP/2 multiplex on first paint and minimises the manifest count. If long-term cache analysis post-deploy shows react/react-dom churning more than the router/helmet pair, we can split in a follow-up — not in this phase.

### AdSlot vertical-space reservation (PERF-03)

- **D-04: Per-slot `SLOT_RESERVATIONS` map lives in `src/constants/adsense.js`.** Add a new exported object keyed by slotId, with px values per placement. `AdSlot.jsx` reads the value via `SLOT_RESERVATIONS[slotId]` and applies `style={{ minHeight: ... }}` on the outer `.adslot` wrapper div. Single source of truth co-located with `AD_SLOTS`. Greppable from any usage site.

- **D-05: Initial reservation values (Claude's initial pick — tune post-deploy if AdSense returns systematically smaller/larger units).** Use:
  - `homeEditorial`: **280 px** (large rectangle range / responsive auto on mobile)
  - `guideMid`: **250 px** (medium rectangle, mid-article placement)
  - `guideEnd`: **250 px** (medium rectangle, end-of-article placement)
  - `pairBelowConversion`: **280 px** (large rectangle, prime above-fold-after-converter slot)
  - `pairEnd`: **250 px** (medium rectangle, end of pair page)
  Match expected ad sizes per AdSense docs so the reservation does not introduce visible pre-consent whitespace beyond what the actual ad will fill. The reservation persists even when the user has not granted consent (i.e. the empty placeholder div is rendered with min-height); accepted as a deliberate trade-off because the alternative (no reservation → CLS when ad arrives) costs more in the AdSense reviewer's eyes than a small empty area on the page.

- **D-06: Reservation policy when consent is NOT granted.** `AdSlot` currently returns `null` when consent is missing OR when the route is in `NO_AD_ROUTES`. **For this phase, keep that behaviour byte-for-byte unchanged** — the reservation only applies once consent is `accepted` and the route is allowed. Rationale: rendering a permanent empty box on every page for users who never consent is worse UX than the brief CLS-on-consent we're solving for. If post-deploy CrUX data shows the consent path still produces CLS > 0.1, a follow-up phase can render an inert placeholder regardless of consent. (Logged as deferred follow-up.)

### Suspense fallback (PERF-01)

- **D-07: Minimal skeleton box.** Wrap the route table in a single top-level `<Suspense fallback={<RouteSkeleton />}>` whose fallback is a flat div with `min-height: 60vh; background: var(--color-surface); border-radius: var(--radius-md);` and no spinner / no text. Lives at `src/components/RouteSkeleton/RouteSkeleton.jsx` + co-located CSS. Same component for every lazy route. Layout (header / footer / cookie banner mount) stays mounted across the navigation, so the user sees the persistent chrome while only the route content fades to the skeleton briefly.

### CWV measurement methodology (PERF-04)

- **D-08: Two-pass measurement.** Pre-deploy: run Lighthouse against `npm run preview` (production build served by Wrangler dev) at the "Slow 4G + 4x CPU throttle" profile, mobile device emulation, on home `/`, the most-recently-updated guide `/guides/currency-conversion-fees-compared` (same guide picked in Phase 2 — longest body among 2026-05-18 entries), and one indexable pair `/usd-to-brl`. Post-deploy: re-run the same three URLs against `https://currencyabout.com`. Both passes recorded in the plan's `03-PERF-AUDIT.md` artifact.

- **D-09: Acceptance bar.** Each of the three test pages must meet **LCP < 2.5s, CLS < 0.1, INP < 200ms** in BOTH passes (local + prod). Lighthouse Performance score itself is a secondary signal; the three CWV metrics are the hard gate. If prod values exceed local thresholds, prod wins (it's the real reviewer experience), and we re-tune.

### AdSense behaviour preservation (PERF-05)

- **D-10: No changes to `useAdSenseLoader.js`, `cookie-consent-changed` event API, `STORAGE_KEY` constant, `isAdAllowedOnRoute`, or the `AD_SLOTS` ids.** The phase touches `AdSlot.jsx` to add the `min-height` style and `src/constants/adsense.js` to add `SLOT_RESERVATIONS`, but the consent gate, IntersectionObserver lazy-mount, and `adsbygoogle.push` flow are byte-for-byte preserved. Grep diff vs `main` confirms.

### Claude's Discretion

- **Bundle-size verification tooling:** No new dep. Use `npm run build` output (Vite prints per-chunk gzip sizes) for the PERF-01 < 200 KB check. Capture the chunk-size table in `03-PERF-AUDIT.md` for both the pre-split baseline and the post-split delta.
- **Lighthouse "Slow 4G + 4x CPU" profile:** Chrome DevTools → Lighthouse panel → device "Mobile" → throttling "Simulated throttling" with custom "Slow 4G" + 4x CPU slowdown. Standard config; no custom flags. Record the exact Lighthouse version + Chrome version used.
- **Lazy-route navigation latency tolerance:** Accept up to ~150 ms of chunk-fetch latency on a slow-4G click into a guide — Lighthouse INP measures interaction, not navigation, so this does not block PERF-04.
- **Cloudflare cache configuration:** Out of scope for this phase. The default static-asset caching via `wrangler.jsonc` is sufficient; if prod LCP > 2.5s and the diagnosis points at network rather than bundle, we patch in a follow-up.
- **Image / font optimisation:** Out of scope. The site has no raster images on home/guide/pair (only inline SVGs + emoji flags); Google Fonts is preconnect'd and uses a `display=swap` subset already (per `index.html`). Skip.
- **Bundle analyzer dep (`rollup-plugin-visualizer`):** Out of scope (CLAUDE.md "no new dependencies" sprint constraint). Eyeball the Vite chunk-size table instead.

</decisions>

<canonical_refs>
## Canonical References

Downstream agents (researcher, planner, executor) MUST read these:

- `.planning/ROADMAP.md` — Phase 3 entry (lines 84–98) for Goal, Mode, Depends-on, Success Criteria.
- `.planning/REQUIREMENTS.md` — PERF-01 through PERF-05 (lines 31–35) and Traceability table (lines 107–111).
- `.planning/PROJECT.md` — overall sprint scope + Key Decisions table (palette / typography / converter invariants).
- `CLAUDE.md` (project root) — sprint constraints: 1–2 week timeline, no new dependencies, no visual rebrand, no converter/i18n changes.
- `.planning/codebase/STACK.md`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md` — codebase map.
- `.planning/phases/01-editorial-trust-signals-e-e-a-t/01-CONTEXT.md` — Phase 1 decisions affecting `guides.js` size (BylineMeta + author metadata).
- `.planning/phases/02-ux-polish-mobile-a11y-cookie-banner/02-CONTEXT.md` — Phase 2 decisions (cookie banner card, dark-token overrides, AdSlot stays gated).
- `src/App.jsx` — current eager route table (will be split here).
- `src/components/AdSlot/AdSlot.jsx` — current AdSlot component (no min-height today; will add reservation).
- `src/constants/adsense.js` — `AD_SLOTS` map and `isAdAllowedOnRoute` (will add `SLOT_RESERVATIONS` here).
- `src/hooks/useAdSenseLoader.js` — consent-gated script loader (invariant; do not modify).
- `src/components/CookieConsent/CookieConsent.jsx` — `cookie-consent-changed` event source (invariant).
- `vite.config.js` — current minimal config (will add `manualChunks` here).

External docs:
- AdSense responsive display ad sizes — https://support.google.com/adsense/answer/9183549 (referenced when picking SLOT_RESERVATIONS heights).
- Core Web Vitals thresholds — https://web.dev/articles/vitals (LCP 2.5s, CLS 0.1, INP 200ms reference).

</canonical_refs>

<code_context>
## Reusable Assets + Patterns

### Already in place (do not rebuild)

- **`AdSlot` consent gate + IntersectionObserver** (`src/components/AdSlot/AdSlot.jsx:36-52`). The component already returns `null` until consent fires and only pushes to `adsbygoogle` once the slot intersects (200 px root margin). This phase only adds the `min-height` reservation; the gate/observer logic is invariant.

- **`useAdSenseLoader` script injection** (`src/hooks/useAdSenseLoader.js`). Consent-gated `<script async>` injection at mount of `Layout`. Idempotent. Listens to `cookie-consent-changed`. **Do not touch.**

- **Day-keyed rate cache** (`src/services/exchangeRate.js`). One outbound call per day per device. Already aggressive caching; no further perf work here.

- **Component CSS co-location pattern** (every component folder has `<Name>.jsx` + `<Name>.css`). Add `RouteSkeleton/RouteSkeleton.jsx` + `RouteSkeleton.css` following the same pattern.

### Current performance baseline (from Phase 2's last build)

- Single JS chunk: `dist/assets/index-BPebnIy2.js` — **549.19 KB / 170.69 KB gzipped**.
- Single CSS chunk: `dist/assets/index-gHOTmo98.css` — 53.53 KB / 8.57 KB gzipped.
- `dist/index.html` — 9.99 KB / 3.07 KB gzipped (carries inline JSON-LD blocks + noscript SEO fallback).
- Pre-existing Vite warning: "Some chunks are larger than 500 kB after minification" — this phase resolves it.

### Bundle composition signals (eyeball estimates from the build)

- React + React-DOM + React-Router + Helmet-Async runtime is ~140 KB minified (~45 KB gzipped) — the floor.
- `src/content/guides.js` is ~977 lines of structured editorial data → estimate ~70–90 KB minified (~20–25 KB gzipped). Splitting it out is the biggest single win.
- Page modules (11 pages) + components (17) + i18n locales (7) + content/{authors, currencyProfiles, pairIntros, guides} make up the rest.
- Target: home initial chunk < 200 KB gzipped = vendor (~45 KB) + Layout + HomePage + components reachable from HomePage (~155 KB gzipped budget). Comfortable headroom once `guides.js` and the legal pages leave the home reachability set.

</code_context>

<deferred>
## Deferred Ideas

- **Pre-consent AdSlot placeholder (inert reservation).** If post-Phase-3 CrUX or Lighthouse on prod still shows CLS > 0.1 because of the consent → ad injection sequence on first-visit users, a follow-up phase could render a non-interactive placeholder div even when consent is missing, so the reserved height exists from the very first paint. Trade-off vs the current `return null` behaviour (which keeps the page visually clean for non-consenters) is currently judged not worth it; revisit only if data demands.

- **Split react / react-router / helmet into separate vendor chunks.** Currently bundled as one chunk per D-03. If cache analytics post-deploy shows react updating much more often than react-router/helmet, separating them would improve long-term cache hit rate. Out of scope for this phase.

- **Cloudflare cache rule tightening / asset-versioning headers.** Default config is fine for this phase's CWV targets. Revisit if prod LCP doesn't hit < 2.5 s and the diagnosis points to network rather than bundle.

- **Image / font optimisation.** Not applicable to the current asset surface (no raster images, Google Fonts already preconnect + display=swap). If a future phase introduces raster images (e.g. og:image upgrades), revisit.

- **`rollup-plugin-visualizer` for bundle analysis.** New dev dep — blocked by CLAUDE.md sprint constraint. Eyeball Vite build output instead. Revisit in a future sprint.

</deferred>

---

*Created from `/gsd-discuss-phase 3`. Six gray areas resolved across two question batches (route lazy scope, vendor chunking, slot reservation map, CWV measurement, Suspense fallback, slot height policy). Next: `/gsd-plan-phase 3`.*
