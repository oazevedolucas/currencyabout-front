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
