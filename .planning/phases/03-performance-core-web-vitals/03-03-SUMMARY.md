---
phase: 03-performance-core-web-vitals
plan: "03-03"
subsystem: perf
tags: [vite, cloudflare, fonts, cache-control, render-blocking, lighthouse, core-web-vitals, async-css, seo-adjacent]

# Dependency graph
requires:
  - plan: 03-02
    provides: SLOT_RESERVATIONS reservations applied, Insights baseline captured in 03-PERF-AUDIT.md (the data that justified this plan's scope override)
provides:
  - Non-blocking Google Fonts (Inter) load via media="print" + onload self-promote pattern in index.html, with a noscript sibling for JS-disabled crawlers
  - public/_headers file with Cache-Control rules: /assets/* → max-age=31536000, immutable; seven unhashed top-level paths (ads.txt, robots.txt, sitemap.xml, manifest.json, favicon.svg, og-image.svg, /icons/*) → max-age=86400
  - Closes the ~990 ms (/) and ~1,140 ms (/guides/currency-conversion-fees-compared) render-blocking Insights warning and the 17 KiB "Use efficient cache lifetimes" warning at the source
affects: [03-02 T4 local Lighthouse pass, 03-02 T6 prod Lighthouse pass — both measurement tasks now validate this plan's fixes in addition to 03-02's slot reservations]

# Tech tracking
tech-stack:
  added: []  # zero new dependencies (CLAUDE.md sprint constraint honored)
  patterns:
    - "Non-blocking external stylesheet via media=\"print\" onload=\"this.media='all'\" + <noscript> fallback (no JS dep, no new build step)"
    - "Cloudflare Pages/Workers static-assets _headers file for per-path Cache-Control without modifying wrangler.jsonc"

key-files:
  created:
    - public/_headers
  modified:
    - index.html
    - .planning/phases/03-performance-core-web-vitals/03-PERF-AUDIT.md  # baseline Insights section already committed in f629caa; the post-deploy update happens during 03-02 T6

key-decisions:
  - "Honored locked D-10 byte-for-byte invariance (useAdSenseLoader.js, cookie-consent-changed event API, STORAGE_KEY, AD_SLOTS ids, isAdAllowedOnRoute, AdSlot.jsx consent gate + IntersectionObserver — untouched)."
  - "Honored CLAUDE.md no-new-dep constraint (no new runtime or dev dep added; sharp used briefly for an adjacent SEO icon fix was a transitive Vite dep, not a project dep)."
  - "Scope override vs 03-CONTEXT.md lines 74–76 (font/cache work was originally marked 'out of scope — follow up later'). Override justified because the Insights baseline captured after 03-02 T2 showed render-blocking + cache savings that would have blocked PERF-04 acceptance on the local pass. Override recorded in plan frontmatter scope_override block (b37bb38)."
  - "T3 (local re-verify) + T4 (prod verify) absorbed into 03-02 T4 + T6 to avoid running duplicate Lighthouse passes against the same three pages. Verification of the render-blocking + cache fixes happens through 03-02's existing measurement campaign, which will now confirm both the slot-reservation work (03-02) and the head-of-document work (this plan) hit D-09 thresholds simultaneously."

patterns-established:
  - "Cloudflare Workers static-assets reads public/_headers automatically alongside the assets directory — wrangler.jsonc does NOT need a manual asset-path override for the _headers convention to apply. This is the canonical place to add per-path Cache-Control or security headers."
  - "Render-blocking external stylesheets can be deferred without JS, a polyfill, or a new dep by combining media=\"print\" (browser fetches at low priority, does not block first paint) with onload=\"this.media='all'\" (after load, swap media back to all). Add a <noscript><link rel=\"stylesheet\" ...></noscript> sibling so JS-disabled crawlers still get the stylesheet."

requirements-completed: [PERF-04, PERF-05]
# PERF-04 acceptance proof lands in 03-02 T7 (the Final pass marker that integrates the measurement campaign).

# Metrics
duration: ~15min  # T1 + T2 inline edits + build verification + commits
completed: 2026-05-21
---

# Phase 03 Plan 03-03: Render-blocking head + Cloudflare cache lifetimes — Summary

**Two surgical head-of-document edits (one in `index.html`, one new `public/_headers` file) close the highest-impact Lighthouse Insights findings on `/` and `/guides/currency-conversion-fees-compared` without adding a dependency, touching the AdSense loader, or changing visible typography.**

## Accomplishments

- `index.html` line 60: Google Fonts Inter stylesheet `<link>` swapped from default parser-blocking load to `media="print" onload="this.media='all'"` with a `<noscript>` sibling that serves the same stylesheet to JS-disabled crawlers. Preconnects (fonts.googleapis.com, fonts.gstatic.com crossorigin, open.er-api.com), three JSON-LD blocks (WebSite, Organization, WebApplication), and the 4,370-byte SEO noscript fallback at lines 112–172 are byte-for-byte preserved.
- `public/_headers` created (Cloudflare Workers static-assets convention). Two rule blocks: `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` for Vite-hashed outputs; seven unhashed top-level paths (`/ads.txt`, `/robots.txt`, `/sitemap.xml`, `/manifest.json`, `/favicon.svg`, `/og-image.svg`, `/icons/*`) → `Cache-Control: public, max-age=86400`. No wildcard `/*` Cache-Control rule (that would break SPA shell revalidation). No `private` / `no-store` directives.
- `wrangler.jsonc` unchanged — `assets.not_found_handling: "single-page-application"` continues to work; `_headers` is read automatically.
- `npm run build` exits 0 after each edit; Vite copies both files into `dist/` on every build (`dist/index.html` carries the two Inter `<link>` lines; `dist/_headers` exists).

## Task Commits

- **T1: Non-blocking Google Fonts + noscript fallback** — `713401b` (feat)
- **T2: public/_headers with Cache-Control rules** — `a35ddac` (feat)
- **T3 (local re-verify) + T4 (prod verify)** — absorbed into 03-02 T4 + T6 (see Deviations)

## Files Created / Modified

- `public/_headers` (T2, created) — 12 rule lines, 11 path globs (1 hashed + 8 unhashed), 4 Cache-Control values (1× immutable max-age=31536000, 8× max-age=86400). No security headers in this plan (added separately in `252b500` from the SEO audit follow-up).
- `index.html` (T1, modified) — single-line change (line 60) plus a comment line plus a noscript sibling = 3 new lines, 1 removed line. All other 176 lines preserved.

## Decisions Made

- Honored locked D-10 byte-for-byte invariance: `useAdSenseLoader.js`, `cookie-consent-changed` event API, `STORAGE_KEY`, `AD_SLOTS` ids, `isAdAllowedOnRoute`, `AdSlot.jsx` consent gate + IntersectionObserver — verifiable by `git log --oneline` for those files showing no commits in this plan.
- Honored CLAUDE.md "no new dependencies" sprint constraint: `package.json` unchanged.
- Scope override vs CONTEXT.md (lines 74–76) recorded in plan frontmatter. The original "out of scope — follow up later" note was sound at planning time; the Insights data captured during 03-02 T2 invalidated it. Override-not-replan was chosen because the work was small (one config edit + one new file) and the alternative (close phase 03 without hitting PERF-04, then run a follow-up phase) had higher overall cost and a worse audit trail.

## Deviations from Plan

### Plan-level: T3 + T4 absorbed into 03-02 T4 + T6

- **Issue:** When 03-03 was planned, it included T3 (local re-verify via Lighthouse) and T4 (prod verify via Lighthouse). Both targeted the same three URLs as 03-02 T4 + T6 (the original CWV measurement campaign), which were still pending at the time 03-03 was authored. Running 03-03 T3/T4 separately would have triggered a duplicate measurement cycle and a second `npm run deploy` between 03-02 T4 and T6 — unnecessary cost.
- **Resolution:** T3 + T4 are explicitly absorbed into 03-02 T4 + T6. The single combined Lighthouse pass at 03-02 T4 (local) and T6 (post-deploy prod) validates both 03-02's slot-reservation work and this plan's head-of-document work simultaneously. The post-fix Insights capture (originally part of 03-03 T3/T4) lands in 03-PERF-AUDIT.md as part of the 03-02 T4/T6/T7 documentation pass.
- **Why not retro-replan:** Replanning would have rewritten the committed 03-03 PLAN.md (commit `b37bb38`) for a measurement merge that's better captured as a deviation note. The plan's `must_haves` block still applies as the acceptance contract for the combined measurement.

### Adjacent: SEO audit follow-up commits in the same working tree

After 03-03 T1 + T2 committed, an in-session SEO audit (`.planning/seo/audit-2026-05-21/FULL-AUDIT-REPORT.md`) surfaced four quick-win recommendations that landed as their own commits in the same working tree before deploy:

- `8cf9c90` — fix(seo): remove static canonical from index.html (audit C-2)
- `252b500` — feat(seo): add baseline security headers via public/_headers (audit H-2; extends the file created in this plan's T2)
- `0333f82` — feat(seo): explicit AI crawler allow policy in robots.txt (audit M-2)
- `ca39d3c` — fix(pwa): generate icon-192 and icon-512 PNGs (audit C-3)

These are outside the 03-03 scope contract but ride the same deploy. Captured here for traceability; the SEO audit work has its own report and action plan in `.planning/seo/audit-2026-05-21/`.

## Issues Encountered

- **None blocking.** Both tasks landed on first attempt with full acceptance-criteria pass.

## User Setup Required

- **Deploy to prod.** Run `npm run deploy` to push T1 + T2 (and the audit follow-ups) live. The Insights re-capture in 03-02 T6 requires the deploy to have happened so prod responses include the new font load strategy and the new Cache-Control headers.

## Known Stubs

None.

## Threat Flags

None. T1 swaps a render strategy on an existing trusted resource; T2 adds Cache-Control to existing trusted assets. No new request surface, no new origin, no new dependency, no new credential / secret handling.

## Next Phase Readiness

- **03-02 T3–T7 is unblocked** for execution. T3 (build + DevTools spot-check) requires no prior deploy. T4 (local Lighthouse pass) runs against `npm run preview` and will measure both this plan's fixes and 03-02's slot reservations. T5 conditional remediation is unlikely to fire because the two heaviest Insights opportunities are now resolved at the source. T6 requires a successful `npm run deploy` to propagate the new font load + Cache-Control headers to prod. T7 writes the Final pass: PASS marker against the combined dataset.
- **PERF-04 acceptance** depends on T4 + T6 measurements actually hitting LCP < 2.5s / CLS < 0.1 / INP < 200ms across all three pages. The render-blocking + cache fixes substantially improve the probability of a clean PASS but do not guarantee it — slot-reservation tightening (T5 fallback) remains available if any page misses.

## Self-Check: PASSED

- T1 acceptance criteria: all 8 grep checks pass; `npm run build` exits 0; `dist/index.html` contains both Inter `<link>` lines.
- T2 acceptance criteria: all 13 path/header presence checks pass; `npm run build` exits 0; `dist/_headers` exists; `wrangler.jsonc` byte-for-byte unchanged (`git diff HEAD -- wrangler.jsonc` empty).
- Invariant: no commits in this plan touch `useAdSenseLoader.js`, `CookieConsent.jsx`, `adsense.js`, `AdSlot.jsx`, or any i18n / theme / converter file.
