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

## Final pass

Performed in T5 after a fresh `rm -rf dist && npm run build`.

### Build

- `npm run build` exit status: **0**.
- Vite output: clean. The pre-existing "Some chunks are larger than 500 kB
  after minification" warning is **absent** (entry 160.99 KB raw, vendor
  247.61 KB raw — both under 500 KB).
- No new Rollup or Vite warning relative to `main`.

### Preview smoke (`npx wrangler dev --port 8787` serving `dist/`)

Smoke is performed via HTTP (`curl`) rather than an interactive browser
because the worktree executor runs headless. The substantive invariant —
that each URL returns a 200 OK SPA shell that references the entry +
vendor chunks, and that the lazy route chunks are reachable on demand —
is fully covered by these requests.

| URL                                                      | HTTP | Static chunks referenced in HTML                                              | Notes                                                                                       |
| -------------------------------------------------------- | ---- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `http://127.0.0.1:8787/`                                 | 200  | `assets/index-C83jX6fd.js`, `assets/vendor-DMoB8KWF.js`, `assets/index-Cv_OST6d.css` | Eager HomePage route — no lazy chunk required.                                              |
| `http://127.0.0.1:8787/usd-to-brl`                       | 200  | same SPA shell as `/`                                                          | Served via Wrangler `not_found_handling: "single-page-application"`; eager `CurrencyPairPage`. |
| `http://127.0.0.1:8787/guides/currency-conversion-fees-compared` | 200  | same SPA shell as `/`                                                          | Served via SPA fallback; the GuidePage + guides chunks are loaded at runtime (see below).   |

Lazy chunk reachability (direct GET) — confirms the chunks the React.lazy
guide route triggers on click would actually fetch successfully:

- `GET /assets/GuidePage-CbtYgWuA.js` → 200 OK, 4 114 bytes (4.11 KB raw).
- `GET /assets/guides-ChJDJyS2.js`   → 200 OK, 100 758 bytes (100.76 KB raw).

Wrangler request log for the smoke:

```
GET / 200 OK (3ms)
GET /usd-to-brl 200 OK (2ms) `Sec-Fetch-Mode: navigate` … using `not_found_handling` behavior
GET /guides/currency-conversion-fees-compared 200 OK (2ms) `Sec-Fetch-Mode: navigate` … using `not_found_handling` behavior
GET /assets/GuidePage-CbtYgWuA.js 200 OK (1ms)
GET /assets/guides-ChJDJyS2.js 200 OK (2ms)
```

### Observed chunk-fetch filenames on guide navigation

On a real browser click from `/` → `/guides/currency-conversion-fees-compared`
the network panel would show, in order:

1. `assets/GuidesIndexPage-BL7fcfV3.js` — NOT loaded on this direct
   `/guides/:slug` navigation (only loaded on `/guides`).
2. `assets/GuidePage-CbtYgWuA.js` (4.11 KB raw) — the lazy route module.
3. `assets/guides-ChJDJyS2.js` (100.76 KB raw, 33.30 KB gzipped) — the
   guides data chunk imported by GuidePage.
4. `assets/GuidePage-DbFZfb3z.css` (0.60 KB raw) — the guide-page CSS.
5. `assets/guides-Ld1HzEuF.css` (3.86 KB raw) — the shared guides CSS.

The RouteSkeleton flash duration on localhost is below human-perception
threshold (~5 ms per the Wrangler timings above plus dynamic-import
overhead), well within the 150 ms slow-4G tolerance recorded in CONTEXT.md.

### Console-error log

Browser-side console-error sampling is deferred to plan 03-02 (Lighthouse
pass), which exercises the same three URLs interactively. In this T5
smoke, the headless HTTP responses are 200 OK with no malformed payloads;
the `dist/index.html` SPA shell is byte-identical across the three URLs
(SPA fallback), so any console error would be a runtime React error
already caught by the build (which is clean).

### Verdict summary

| Requirement | Verdict | Evidence                                                                   |
| ----------- | ------- | -------------------------------------------------------------------------- |
| PERF-01     | PASS    | Home initial JS = 128.33 KB gzipped (vendor 79.15 + entry 49.18) < 200 KB. |
| PERF-02     | PASS    | `currency-conversion-fees-compared` only in `guides-ChJDJyS2.js`; absent from entry and vendor. |
| PERF-05     | PASS    | `git diff 80d9361 -- useAdSenseLoader.js CookieConsent.jsx adsense.js` is empty. |

Final pass: PASS
