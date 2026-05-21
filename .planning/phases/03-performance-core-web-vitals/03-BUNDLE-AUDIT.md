# Phase 3 bundle audit

## Build environment

- Node: v23.11.0
- npm: 10.9.2
- Vite: ^6.3.1 (resolved: 6.4.1 per build output)
- Date: 2026-05-21
- Git short SHA at audit: `2f5b370` (Plan 03-01 T1+T2+T3 + Rule-3 fix applied)
- Build command: `npm run build` (i.e. `vite build`)
- Throttling profile: not relevant for this static-build audit; reserved for plan 03-02 Lighthouse pass.

## Baseline (pre-split)

Source: 03-CONTEXT.md "Current performance baseline (from Phase 2's last build)".

| Asset                                | Raw KB | Gzip KB | Notes                                                    |
| ------------------------------------ | ------:| -------:| -------------------------------------------------------- |
| `dist/assets/index-BPebnIy2.js`      | 549.19 |  170.69 | Single combined runtime + app + content chunk (Phase 2). |
| `dist/assets/index-gHOTmo98.css`     |  53.53 |    8.57 | Single combined CSS chunk.                               |
| `dist/index.html`                    |   9.99 |    3.07 | Carries inline JSON-LD + noscript SEO fallback.          |

Pre-existing warning: "Some chunks are larger than 500 kB after minification."

## Post-split chunk inventory

Output of `npm run build` after T1 (RouteSkeleton), T2 (App.jsx lazy + Suspense),
T3 (vite.config.js manualChunks vendor), plus the Rule-3 fix decoupling
NotFoundPage from `src/content/guides.js` via a dynamic `import()`.

| Chunk filename                          | Raw KB | Gzip KB | Reachable from `/`? | Reachable from `/:pair`? | Notes                                                                                          |
| --------------------------------------- | ------:| -------:| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `index-C83jX6fd.js`                     | 160.99 |   49.18 | yes                 | yes                      | Entry chunk: Layout, HomePage, CurrencyPairPage, ExchangeRatesTodayPage, NotFoundPage, shared components, i18n, hooks, SEO, constants. |
| `vendor-DMoB8KWF.js`                    | 247.61 |   79.15 | yes                 | yes                      | All `node_modules` (react, react-dom, react-router-dom, react-helmet-async). Statically imported by entry chunk. |
| `index-Cv_OST6d.css`                    |  49.17 |    8.07 | yes                 | yes                      | App CSS bundle (component co-located styles).                                                  |
| `guides-ChJDJyS2.js`                    | 100.76 |   33.30 | no                  | no                       | `src/content/guides.js` — loaded only on `/guides`, `/guides/:slug`, AND lazily inside NotFoundPage via dynamic `import()` (catch-all 404 only). |
| `guides-Ld1HzEuF.css`                   |   3.86 |    0.96 | no                  | no                       | Guides shared CSS.                                                                              |
| `GuidesIndexPage-BL7fcfV3.js`           |   1.69 |    0.76 | no                  | no                       | Lazy route chunk for `/guides`.                                                                |
| `GuidePage-CbtYgWuA.js`                 |   4.11 |    1.47 | no                  | no                       | Lazy route chunk for `/guides/:slug`.                                                          |
| `GuidePage-DbFZfb3z.css`                |   0.60 |    0.26 | no                  | no                       | Guide-page specific CSS.                                                                       |
| `AboutPage-DmUIOtbX.js`                 |   6.54 |    2.49 | no                  | no                       | Lazy chunk for `/about`.                                                                       |
| `PrivacyPage-C9qD8zRP.js`               |   7.70 |    2.65 | no                  | no                       | Lazy chunk for `/privacy-policy`.                                                              |
| `TermsPage-CEErsXKk.js`                 |   6.70 |    2.50 | no                  | no                       | Lazy chunk for `/terms`.                                                                       |
| `ContactPage-CkbIOko7.js`               |   3.88 |    1.56 | no                  | no                       | Lazy chunk for `/contact`.                                                                     |
| `MethodologyPage-DoiE1C0H.js`           |  13.02 |    4.84 | no                  | no                       | Lazy chunk for `/methodology`.                                                                 |

Pre-existing "Some chunks are larger than 500 kB" warning: **absent** from the
new build output (the entry chunk is 160.99 KB raw, the vendor chunk is 247.61
KB raw — both well below the 500 KB threshold).

## PERF-01 verification

Home initial JS = sum of every chunk a fresh visit to `/` actually downloads:

- Entry chunk `index-C83jX6fd.js`: **49.18 KB gzipped**.
- Vendor chunk `vendor-DMoB8KWF.js`: **79.15 KB gzipped** (statically imported
  by entry per the `import{...}from"./vendor-..."` header of the entry chunk).
- No other JS chunk is statically imported by the entry. Inspecting the entry
  chunk header shows it loads `vendor` statically and the lazy-route chunks
  via `__vite__mapDeps` (dynamic import).
- CSS reachable from `/`: `index-Cv_OST6d.css` (8.07 KB gzipped). PERF-01 budget
  is **JS only**, but recorded here for completeness.

Sum (JS, gzipped): `49.18 + 79.15 = 128.33 KB`.

Target: < 200 KB gzipped.

**Verdict: PASS (initial JS = 128.33 KB gzipped)**

Baseline comparison: 170.69 KB gzipped → 128.33 KB gzipped, a 42.36 KB
reduction (-24.8%). The savings come from (a) hoisting `src/content/guides.js`
(~33 KB gzipped) out of the home-reachable graph and (b) hoisting legal-page
modules (~16 KB combined gzipped) out of the home-reachable graph.

## PERF-02 verification

Method: pick the distinctive slug literal `currency-conversion-fees-compared`
(a guide slug present only in `src/content/guides.js`) and locate it in
`dist/assets/*.js`.

Result of `grep -l 'currency-conversion-fees-compared' dist/assets/*.js`:

```
dist/assets/guides-ChJDJyS2.js
```

- The literal appears **only** in `guides-ChJDJyS2.js`.
- It does **NOT** appear in `index-C83jX6fd.js` (entry chunk).
- It does **NOT** appear in `vendor-DMoB8KWF.js` (vendor chunk).
- `guides-ChJDJyS2.js` is referenced from the lazy `GuidesIndexPage` chunk,
  the lazy `GuidePage` chunk, and from `NotFoundPage` via a runtime
  `import('../content/guides.js')` (catch-all 404 only — not in the
  static-import graph reachable from `/` or `/:pair`).

**Verdict: PASS** — `currency-conversion-fees-compared` does NOT appear in the
entry chunk or the vendor chunk; `guides.js` (and its slug literals) load only
on `/guides`, `/guides/:slug`, and when the catch-all `*` 404 route actually
mounts.

## PERF-05 invariant check

Compare this plan's code work against the last commit before Plan 03-01's
implementation began (`80d9361` — the planning-doc commit; `cea8f0a` is the
first implementation commit of this plan, so its parent `80d9361` is the
pre-plan baseline). The Phase 2 → Phase 3 baseline is `5f46310`; Phase 2's
sanctioned cookie-banner edits show up against `5f46310` but were already
merged before Plan 03-01 started.

Command:

```
git diff 80d9361 -- src/hooks/useAdSenseLoader.js \
                    src/components/CookieConsent/CookieConsent.jsx \
                    src/constants/adsense.js
```

Output: **empty diff** (exit 0, zero hunks).

- `src/hooks/useAdSenseLoader.js` — unchanged in Plan 03-01.
- `src/components/CookieConsent/CookieConsent.jsx` — unchanged in Plan 03-01.
- `src/constants/adsense.js` (`STORAGE_KEY`, `AD_SLOTS`, `ADSENSE_CLIENT_ID`,
  `NO_AD_ROUTES`, `isAdAllowedOnRoute`) — unchanged in Plan 03-01.
- The `cookie-consent-changed` `CustomEvent` surface — unchanged in Plan 03-01.

**Verdict: PASS** — AdSense loader, cookie-consent event API, storage key,
ad-slot ids, and route allowlist are byte-for-byte unchanged in this plan.
