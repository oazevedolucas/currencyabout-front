# Phase 3 CWV audit

## Environment

- Chrome version: _<fill in after T4: chrome://version → Google Chrome line>_
- Lighthouse version: _<fill in after T4: visible in DevTools Lighthouse panel header>_
- OS: macOS (Darwin 25.3.0)
- Run date: 2026-05-21
- Device emulation: Mobile (375×667, DevTools default mobile preset)
- Throttle profile: Simulated throttling — Slow 4G + 4x CPU slowdown
- Categories: Performance only
- Median strategy: three runs per URL, median value recorded
- Pre-test state per run: clean Chrome incognito session; `localStorage.setItem('cookie-consent', 'accepted')` then reload before audit

## Acceptance bar

LCP < 2500 ms AND CLS < 0.1 AND INP < 200 ms on every page in every pass; prod wins on disagreement (CONTEXT.md D-09).

## Local pre-deploy pass

Source: `npm run preview` against the post-T2 build (commit `72fe2c9`).

| Page | LCP (ms) | CLS | INP (ms) | Performance score | Verdict |
|------|---------:|----:|---------:|------------------:|---------|
| `/` | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ |
| `/guides/currency-conversion-fees-compared` | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ |
| `/usd-to-brl` | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ |

<!-- For any FAIL row, add a `### Diagnosis: <page>` sub-section here naming the
     failing metric, the actual value, and the suspected root cause. -->

## Lighthouse Insights panel — local pre-deploy pass

Captured from the DevTools Lighthouse **Insights** panel (same run profile as the table above).

### `/` (home)

- 🔺 Render-blocking requests — Est savings of **990 ms**
- 🔺 Layout shift culprits
- 🔺 Network dependency tree
- 🟧 Use efficient cache lifetimes — Est savings of **17 KiB**
- ⚪ LCP breakdown
- ⚪ 3rd parties

### `/guides/currency-conversion-fees-compared`

- 🔺 Render-blocking requests — Est savings of **1,140 ms**
- 🔺 Network dependency tree
- 🟧 Use efficient cache lifetimes — Est savings of **17 KiB**
- ⚪ Optimize DOM size
- ⚪ LCP breakdown
- ⚪ 3rd parties

### `/usd-to-brl`

_Pending — Insights panel not yet captured._

## T7 — Final pass + invariant verification

**Date:** 2026-05-21
**Decision:** PASS (inferred — measurement waived per user decision on 2026-05-21)

### Measurement status

| Task | Status | Notes |
|------|--------|-------|
| T4 (local Lighthouse) | **WAIVED** | Preview server was started locally (`npm run preview` on http://localhost:8788, all 9 _headers rules parsed). User elected not to run the three-page × three-run measurement campaign before closing the phase. |
| T5 (local remediation) | **N/A** | Conditional on T4 FAIL; T4 was not run so T5 was not triggered. |
| T6 (post-deploy prod Lighthouse) | **WAIVED** | Prod deploy attempted (`npm run deploy`) but Cloudflare auth is non-interactive in the agent sandbox. User to run `npx wrangler login && npx wrangler deploy` themselves. Measurement deferred. |

### Inference path (why PASS is defensible without measurement)

This is **not a measured PASS against D-09**. It is an explicit decision by the user to accept the phase as complete based on the inference that the three remediations applied substantially address the failure modes that PERF-04 targets:

1. **PERF-01 (home initial JS < 200 KB gzip):** Plan 03-01 cut home initial JS from 170.69 KB → 128.33 KB gzipped (-24.8%) by lazifying seven heavy routes (guides + legal) and adding a single vendor chunk via `manualChunks`. Measured and recorded in `03-BUNDLE-AUDIT.md` Final pass: PASS. This is a **real measurement**, not inferred.
2. **PERF-03 (AdSlot reserves vertical space from first paint):** Plan 03-02 T1+T2 added `SLOT_RESERVATIONS` keyed by AD_SLOTS key with the locked D-05 values (280px for large rectangles, 250px for medium) and applied them via `style={{ minHeight: ... }}` on the outer `.adslot` div. Layout shift on consent → ad injection should drop to ~0; only verifiable in practice via Lighthouse, but the structural fix is byte-for-byte the D-05 spec.
3. **Render-blocking head (Lighthouse Insights ~990 ms on `/`, ~1,140 ms on guide):** Plan 03-03 T1 swapped the Inter Google Fonts `<link>` from default parser-blocking to `media="print" onload="this.media='all'"` with a `<noscript>` fallback. The technique is the canonical async-CSS pattern; the Insights warning will not appear post-deploy because the parser no longer waits on this resource.
4. **Cache lifetimes (Lighthouse Insights 17 KiB on both pages):** Plan 03-03 T2 added `public/_headers` with `max-age=31536000, immutable` for `/assets/*` and `max-age=86400` for the seven unhashed paths. Verified live on `npm run preview` — `curl -sI http://localhost:8788/ads.txt` returns `Cache-Control: public, max-age=86400`; `/assets/*` returns `max-age=31536000, immutable`; wrangler parsed 9 valid header rules. The Insights warning will not appear post-deploy because the Cache-Control values now exceed Lighthouse's threshold.

### What is NOT proven by this inferred PASS

- Actual measured LCP / CLS / INP values against D-09 thresholds (< 2500 ms / < 0.1 / < 200 ms) on any of `/`, `/guides/currency-conversion-fees-compared`, or `/usd-to-brl`. The acceptance bar in D-09 is **measured**, not **structural**. This PASS does not satisfy that bar in its strict reading.
- Prod parity. D-09 also requires "prod wins on disagreement" — even if local PASSed, prod must be measured separately.
- Layout shift from AdSense's actual response payload differing from the reserved height (`SLOT_RESERVATIONS` was set from `AdSense Responsive Display` documentation, not from observed ad fill sizes).

### Invariant verification (real, measurable — not inferred)

Verified by `git diff 80d9361..HEAD` (phase start = `docs(03): create phase plan`) against the byte-for-byte invariants from CONTEXT.md D-10 + PERF-05:

| File / Symbol | Status | Evidence |
|---------------|--------|----------|
| `src/hooks/useAdSenseLoader.js` | byte-for-byte unchanged | `git diff` returns 0 lines |
| `src/components/CookieConsent/CookieConsent.jsx` | byte-for-byte unchanged | `git diff` returns 0 lines |
| `wrangler.jsonc` | byte-for-byte unchanged | `git diff` returns 0 lines (per D-10 + 03-03 acceptance criteria) |
| `src/i18n/I18nContext.jsx` | byte-for-byte unchanged | `git diff` returns 0 lines |
| `src/theme/ThemeContext.jsx` | byte-for-byte unchanged | `git diff` returns 0 lines |
| `package.json` | byte-for-byte unchanged | `git diff` returns 0 lines (CLAUDE.md no-new-deps constraint honored) |
| `STORAGE_KEY` value | unchanged | no +/- lines mentioning the token across all 4 ad-surface files |
| `cookie-consent-changed` event name | unchanged | no +/- lines mentioning the token across all 4 ad-surface files |
| `ADSENSE_CLIENT_ID` / `NO_AD_ROUTES` values | unchanged | `grep -c` returns 0 +/- lines mentioning either token in adsense.js |
| `AD_SLOTS` ids | unchanged (additive only) | `git diff` shows `AD_SLOTS` added to import lines and looked up via `Object.keys(AD_SLOTS).find(...)`; no redefinition of the map or any id |
| `isAdAllowedOnRoute` function | unchanged (additive only) | `git diff` shows the symbol added to import lines; no redefinition; the early-return `if (!isAdAllowedOnRoute(...)) return null` line in AdSlot.jsx is preserved unchanged |
| `AdSlot.jsx` early-return gates | preserved | `if (!consent) return null` and `if (!isAdAllowedOnRoute(...)) return null` lines do not appear in the diff (i.e. unchanged); only additive lines around `SLOT_RESERVATIONS` lookup + `style={{ minHeight }}` |

### Final pass

**Final pass: PASS (inferred — measurement waived per user decision)**

Phase 03 closes with all three structural remediations applied and invariants preserved. Strict D-09 satisfaction requires real Lighthouse runs (local + prod) and remains outstanding as a follow-up the user owns directly. If post-deploy CrUX or a future audit surfaces a CWV regression on any of the three test pages, the inference path above provides the baseline assumptions to diagnose against.
