# Requirements: currencyabout.com Sprint 1 — AdSense Approval Reinforcement

**Defined:** 2026-05-19
**Core Value:** Maximize AdSense approval odds during the active review window without introducing visible breakage

## v1 Requirements

Sprint scope. Each maps to exactly one roadmap phase. All requirements are written user-centric, testable, and atomic.

### Trust signals (E-E-A-T) — Phase 1

- [x] **EEAT-01**: User sees a real author byline (project owner's real name) on every guide page, linked to a verifiable author bio
- [x] **EEAT-02**: User sees a visible "Last reviewed: YYYY-MM-DD" date on every guide page, sourced from the existing `updated` field in `src/content/guides.js`
- [x] **EEAT-03**: User reaches a substantive author hub (extension of `/about` or a new `/authors/<slug>` route) showing the author's bio, expertise statement, and contact path
- [x] **EEAT-04**: User reading `/methodology` finds new sections covering editorial process, corrections policy, and an honest AI-use disclosure ("AI-assisted, human-reviewed")
- [x] **EEAT-05**: Search engines and AdSense crawler see `author` (Person), `datePublished`, `dateModified`, and `publisher` properties on `ArticleSchema` JSON-LD for every guide
- [x] **EEAT-06**: Search engines see `FinancialProduct` or `CurrencyConversionService` JSON-LD on the home page and every indexable pair page
- [x] **EEAT-07**: Every indexable currency pair page carries at least 150 words of pair-specific editorial that is not templated across pairs; thin pairs remain `noindex`

### UX polish — Phase 2

- [ ] **UX-01**: Home, guide, pair, exchange-rates-today, and methodology pages render correctly at 375×667 (smallest common mobile viewport) with no horizontal scroll, overlapping elements, or cut-off CTAs
- [ ] **UX-02**: Cookie consent banner renders at the bottom corner only, never overlaps the converter on mobile, and is dismissible with keyboard alone; "Reject all" button has equal visual weight to "Accept all"
- [ ] **UX-03**: All interactive elements (links, buttons, inputs, focus rings) pass axe DevTools + Lighthouse accessibility audits with no critical or serious violations on home, guide, pair, and exchange-rates-today pages
- [ ] **UX-04**: All text on light and dark themes meets WCAG 2.2 AA contrast minimums (4.5:1 normal, 3:1 large), verified via Lighthouse and axe
- [ ] **UX-05**: A production link check on https://currencyabout.com finds zero 404 responses and zero redirect chains longer than 1 hop on internal navigation
- [ ] **UX-06**: Zero ads render in the first viewport at 375×667 on the home page; verified by manual emulator screenshot

### Performance — Phase 3

- [ ] **PERF-01**: `vite build` produces vendor chunks (react / react-router / helmet) and route-level chunks via `React.lazy` such that the initial JS payload for the home route is under 200 KB gzipped
- [ ] **PERF-02**: `src/content/guides.js` is loaded only on `/guides` and `/guides/:slug` routes, not on the home page or pair pages
- [ ] **PERF-03**: `<AdSlot />` reserves vertical space from first paint (before consent decision) via a per-slot `min-height` map, eliminating layout shift when consent is granted and ads inject
- [ ] **PERF-04**: Mobile LCP < 2.5s, CLS < 0.1, INP < 200ms on home, guide, and pair pages, measured via Chrome DevTools Lighthouse on a Mid-tier (Slow 4G + 4x CPU throttle) profile
- [ ] **PERF-05**: AdSense loader script (`adsbygoogle.js`) continues to load `async` and is not gated behind user interaction or `requestIdleCallback`; consent-gating from commit `5f46310` is preserved unchanged

### Glossary popovers — Phase 4

- [ ] **GLOSS-01**: User sees inline term triggers (visually distinct from regular text, e.g., dotted underline) on ~10–15 finance terms across guide bodies and methodology page
- [ ] **GLOSS-02**: User clicking or pressing Enter/Space on a term trigger opens a popover with a short definition (~50–100 words) and a "Read more" link to the relevant guide section
- [ ] **GLOSS-03**: The popover dismisses via Escape, light-dismiss (clicking outside), or another term trigger; never via hover-out alone
- [ ] **GLOSS-04**: Popover has `role="dialog"` with `aria-labelledby` pointing at the term name, follows WCAG 2.2 SC 1.4.13 (Content on Hover or Focus), and does not introduce layout shift (CLS unchanged)
- [ ] **GLOSS-05**: Glossary terms data lives in `src/content/glossary.js` as a structured array (`{term, short, longGuideSlug}`); a single `<GlossaryPopover />` instance is mounted in `Layout` (not one per term)
- [ ] **GLOSS-06**: All 10–15 entries are fully written (no placeholder definitions) before the phase merges to main

### Favorites / recently used — Phase 5

- [ ] **FAV-01**: Site supports a versioned localStorage utility (`src/services/storage.js`) exposing `readVersioned(key, defaultValue)` and `writeVersioned(key, value)` with a `{v, data}` envelope, addressing the schema-versioning gap in `.planning/codebase/CONCERNS.md`
- [ ] **FAV-02**: User can mark any currency pair as a favorite via a star button on the home page and on `/exchange-rates-today`; star button has an `aria-label` describing the action and state
- [ ] **FAV-03**: User sees a "Your saved pairs" strip on the home page and `/exchange-rates-today` showing their saved pairs as clickable cards linking to the pair page; strip is hidden when empty
- [ ] **FAV-04**: When the user has no favorites yet, the favorites surface displays a content-rich empty state (paragraph explaining the feature + 3 suggested popular pairs with editorial blurb) rather than a blank box that could read as a missing ad
- [ ] **FAV-05**: The favorites strip is visually distinct from `<AdSlot />` cards — different border, background, header text "Your saved pairs", and dimensions that do not match common AdSense card sizes (300×250, 336×280, 320×100)
- [ ] **FAV-06**: Favorites data is stored under key `currencyabout_pairs_v1` with schema `{ v: 1, data: { pairs: [{from, to, addedAt}], pinned: [...] } }`; no backend, no auth, no server-side persistence

## v2 Requirements

Deferred to future sprints. Tracked but not in this roadmap.

### Future features

- **CHART-01**: Historical rate mini-chart on indexable pair pages (30-, 90-, 365-day) — needs API extension for historical series; ~5–7 days alone
- **SRCH-01**: Type-ahead currency search / quick-picker on the converter input — overlaps with existing picker; marginal AdSense impact
- **ALERT-01**: Rate alerts (email or push) when a pair hits a user-set threshold
- **AUTH-01**: Optional account sign-up for cross-device favorites sync — explicitly *not* added in v1 (FEATURES.md anti-feature: localStorage is the AdSense-safer choice)
- **PT-01**: Portuguese-language route tree (`/pt/...`) with hreflang refactor — multi-day rebuild; deferred per single-URL i18n decision
- **404-01**: Cloudflare Worker entrypoint for true HTTP 404 status on unknown routes — `noindex` mitigation accepted for now
- **LINT-01**: ESLint configuration + `eslint-plugin-jsx-a11y` + `npm run lint` script
- **TEST-01**: Test framework setup (Vitest or Playwright) with smoke tests on critical user flows

## Out of Scope

Explicit exclusions for this sprint. Documented to prevent scope creep mid-execution.

| Feature | Reason |
|---------|--------|
| Sticky mobile bottom ad bar | Explicit 2026 AdSense policy violation; direct rejection trigger (PITFALLS.md Pitfall 8) |
| AI chatbot for currency questions | Generates unverifiable YMYL claims; direct E-E-A-T penalty (FEATURES.md anti-feature) |
| Auto-refreshing rates polling | View-fraud signal + contradicts the "refreshed once per calendar day" disclaimer (FEATURES.md anti-feature) |
| Money-transfer comparison / affiliate widgets | Reads as "Made for AdSense"; also unlicensed financial promotion (FEATURES.md anti-feature) |
| Interstitial / vignette ads / sponsored "best broker" lists | Deceptive-layout / MFA flags (PITFALLS.md) |
| Currency news ticker scraped from external feeds | Duplicate content; not original editorial (PITFALLS.md anti-feature) |
| Service-worker offline mode for rates | Stale-rate exposure on a YMYL surface; harm risk outweighs benefit |
| Full visual rebrand (palette, typography, hero) | User explicitly chose "Polish the current look"; rebrand during active review is high risk |
| SSR or prerender adoption (vite-plugin-prerender, Vike, migration to Astro) | Phase 0 verified Googlebot sees real content via noscript; rebuild risk during active review not justified |
| Sentry / Datadog RUM / GA4 RUM beacons | Adds runtime dependency; not needed for sprint scope; CWV measurement uses Chrome DevTools + PageSpeed Insights |
| Any new runtime dependency | PROJECT.md constraint: zero net new runtime deps; `web-vitals@^5.2.0` allowed as `devDependency` only if Phase 3 needs INP attribution |

## Traceability

Populated when ROADMAP.md is created.

| Requirement | Phase | Status |
|-------------|-------|--------|
| EEAT-01 | Phase 1 | Complete |
| EEAT-02 | Phase 1 | Complete |
| EEAT-03 | Phase 1 | Complete |
| EEAT-04 | Phase 1 | Complete |
| EEAT-05 | Phase 1 | Complete |
| EEAT-06 | Phase 1 | Complete |
| EEAT-07 | Phase 1 | Complete |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |
| UX-03 | Phase 2 | Pending |
| UX-04 | Phase 2 | Pending |
| UX-05 | Phase 2 | Pending |
| UX-06 | Phase 2 | Pending |
| PERF-01 | Phase 3 | Pending |
| PERF-02 | Phase 3 | Pending |
| PERF-03 | Phase 3 | Pending |
| PERF-04 | Phase 3 | Pending |
| PERF-05 | Phase 3 | Pending |
| GLOSS-01 | Phase 4 | Pending |
| GLOSS-02 | Phase 4 | Pending |
| GLOSS-03 | Phase 4 | Pending |
| GLOSS-04 | Phase 4 | Pending |
| GLOSS-05 | Phase 4 | Pending |
| GLOSS-06 | Phase 4 | Pending |
| FAV-01 | Phase 5 | Pending |
| FAV-02 | Phase 5 | Pending |
| FAV-03 | Phase 5 | Pending |
| FAV-04 | Phase 5 | Pending |
| FAV-05 | Phase 5 | Pending |
| FAV-06 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0

## Pre-flight verification (done before sprint kickoff)

Not a phase, not a requirement — a one-time check completed on 2026-05-19 before requirements were drafted.

- ✓ **Phase 0**: Googlebot sees real editorial content on home (`39` matches for convert/currency/rate), pair pages (`15` matches for euro/dollar), and guide pages (`19` matches for exchange/rate) via the `<noscript>` fallback in `index.html`. SPA crawler-blindness (PITFALLS Pitfall 3) is mitigated. Roadmap structure as researched is valid.

## Key user decisions captured during requirements

- **Byline:** Project owner's real name with linkable bio (LinkedIn / personal site / prior publication). Exact name and bio link to be provided during Phase 1 planning.
- **AI disclosure copy:** "AI-assisted, human-reviewed" — the editorial process drafts content with AI assistance and reviews/edits with a human for accuracy and voice.
- **Editorial-standards page location:** Extend `/methodology` (no new route, no nav change, no sitemap entry — lowest risk during active AdSense review).

---
*Requirements defined: 2026-05-19*
*Last updated: 2026-05-19 after initialization*
