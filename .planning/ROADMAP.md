# Roadmap: currencyabout.com Sprint 1 — AdSense Approval Reinforcement

## Overview

Five-phase Vertical MVP sprint to reinforce the existing currencyabout.com site for Google AdSense approval while the application is mid-review. Each phase delivers an end-to-end user-visible improvement and ends in a deployable state — no half-shipped features in production at any commit. The phase order is research-validated (`.planning/research/SUMMARY.md`): content-first (Phase 1), then UX polish (Phase 2), then performance optimisation over the heavier content surface (Phase 3), then glossary against a known-good performance baseline (Phase 4), then favorites last (Phase 5, smallest reviewer impact). Each phase carries 1–3 plans, sized for a 1–2 week part-time sprint.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Editorial trust signals (E-E-A-T)** — Real bylines, last-reviewed dates, author hub, expanded methodology, structured-data depth, pair-page editorial audit
- [ ] **Phase 2: UX polish — mobile, a11y, cookie banner** — Fix mobile breakpoints, accessibility issues, cookie banner UX, link rot
- [ ] **Phase 3: Performance + Core Web Vitals** — Code-split bundle, reserve ad-slot space, validate LCP/CLS/INP in the "Good" range
- [ ] **Phase 4: Glossary popovers** — Click-triggered native-popover definitions on ~10–15 finance terms, cross-linked to guides
- [ ] **Phase 5: Favorites / recently used pairs** — Versioned localStorage favorites strip on home and exchange-rates-today

## Phase Details

### Phase 1: Editorial trust signals (E-E-A-T)

**Goal:** Push the site from "competent utility" to "real publisher with named accountability" — the bar a 2026 YMYL-finance AdSense reviewer applies.
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** EEAT-01, EEAT-02, EEAT-03, EEAT-04, EEAT-05, EEAT-06, EEAT-07
**Success Criteria** (what must be TRUE):

  1. A visitor reading any guide sees the project owner's real name as the author, with a link to a substantive author bio page (extension of `/about` or a new author route)
  2. Every guide page shows a "Last reviewed: YYYY-MM-DD" date that matches the existing `updated` field in `src/content/guides.js`
  3. The `/methodology` page contains new sections covering editorial process, corrections policy, and an honest "AI-assisted, human-reviewed" disclosure
  4. JSON-LD on guides emits `author` (Person), `datePublished`, `dateModified`, and `publisher`; home and indexable pair pages emit `FinancialProduct` or `CurrencyConversionService`
  5. Every indexable pair page (per `isIndexablePair()`) carries ≥150 words of pair-specific editorial; thin pairs remain `noindex`

**Plans:** 3 plans

Plans:
**Wave 1**

- [ ] 01-01: Build author data model + components — `src/content/authors.js`, `<BylineMeta>`, author hub destination (extension of `/about`)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 01-02: Structured-data depth — extend `ArticleSchema` with author/dates/publisher, add `FinancialProduct`/`CurrencyConversionService` to home + indexable pair pages

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 01-03: Editorial uniformity — render "Last reviewed" dates on guides, extend `/methodology` with editorial-standards/corrections/AI-disclosure, audit pair-page editorial uniqueness

**Cross-cutting constraints:**

- npm run build exits 0 with no Vite/Rollup error.

### Phase 2: UX polish — mobile, a11y, cookie banner

**Goal:** Eliminate reviewer-visible UX friction on the mobile viewport (the surface a 2026 AdSense reviewer simulates first) and confirm cookie/a11y/link health.
**Mode:** mvp
**Depends on:** Phase 1 (so the link/a11y audit catches any new bylines or methodology sections introduced)
**Requirements:** UX-01, UX-02, UX-03, UX-04, UX-05, UX-06
**Success Criteria** (what must be TRUE):

  1. Home, guide, pair, exchange-rates-today, and methodology pages render correctly at 375×667 with no overflow, overlap, or cut-off CTAs
  2. Cookie consent banner is non-blocking at the bottom corner, has equal-weight Accept/Reject buttons, never overlaps the converter on mobile, and is keyboard-dismissible
  3. axe DevTools + Lighthouse accessibility scans on home, one guide, one pair, exchange-rates-today, and methodology show zero critical or serious violations
  4. All text on light and dark themes meets WCAG 2.2 AA contrast minimums (4.5:1 normal, 3:1 large)
  5. Production link check finds zero 404s and zero redirect chains longer than 1 hop on internal navigation
  6. Zero ads render in the first viewport at 375×667 on the home page, confirmed by emulator screenshot

**Plans:** 2 plans

Plans:

- [ ] 02-01: Mobile breakpoint audit + fixes — verify and tighten home/guide/pair/exchange-rates-today/methodology at 375×667; verify above-the-fold ad-density rule
- [ ] 02-02: A11y + cookie banner + link rot — axe/Lighthouse pass, contrast fixes, cookie banner UX corrections, production link checker

### Phase 3: Performance + Core Web Vitals

**Goal:** Bring the now-heavier (post-Phase 1) content surface into the "Good" Core Web Vitals band on mobile and shrink the initial JS payload via route-level lazy loading and vendor chunking.
**Mode:** mvp
**Depends on:** Phase 1 (so the code split captures the heavier `guides.js` carrying byline metadata)
**Requirements:** PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):

  1. The home route's initial JS payload (eager chunks only) is under 200 KB gzipped after `vite build`
  2. `src/content/guides.js` loads only on `/guides` and `/guides/:slug` routes, not on the home page or pair pages
  3. `<AdSlot />` reserves vertical space from first paint via a per-slot `min-height` map, eliminating layout shift when consent is granted and ads inject
  4. Mobile LCP < 2.5s, CLS < 0.1, INP < 200ms on home, one guide, and one indexable pair page (Chrome DevTools Lighthouse, "Slow 4G + 4x CPU throttle")
  5. AdSense loader script remains `async` and consent-gated; no regression to the existing `useAdSenseLoader` behavior

**Plans:** 2 plans

Plans:

- [ ] 03-01: Bundle split — `React.lazy` per route in `App.jsx` (keep `HomePage`/`Layout` eager), `manualChunks` in `vite.config.js` for react/react-router/helmet vendor splits, lazy `guides.js`
- [ ] 03-02: AdSlot reserved-height + CWV validation — `AD_SLOTS_HEIGHTS` map on `<AdSlot />`, Lighthouse + PageSpeed Insights pass at mobile profile, no regression to AdSense loader

### Phase 4: Glossary popovers

**Goal:** Deepen the editorial signal with click-triggered native popovers explaining ~10–15 finance terms, cross-linked to guides — without introducing layout shift or new dependencies.
**Mode:** mvp
**Depends on:** Phase 3 (so the impact of mounting a popover in `Layout` is measured against a known-good performance baseline)
**Requirements:** GLOSS-01, GLOSS-02, GLOSS-03, GLOSS-04, GLOSS-05, GLOSS-06
**Success Criteria** (what must be TRUE):

  1. Inline term triggers (visually distinct dotted underline) render on ~10–15 finance terms across guide bodies and methodology page
  2. Click or Enter/Space on a term trigger opens a popover with a short definition (~50–100 words) and a "Read more" link to the relevant guide
  3. Popover dismisses via Escape, light-dismiss, or another term trigger — never via hover-out alone
  4. Popover has `role="dialog"` + `aria-labelledby`, follows WCAG 2.2 SC 1.4.13, and introduces no measurable CLS regression
  5. Glossary data lives in `src/content/glossary.js`; a single `<GlossaryPopover />` instance is mounted in `Layout` (not one per term)
  6. All 10–15 entries are fully written (no placeholder definitions) before the phase merges

**Plans:** 2 plans

Plans:

- [ ] 04-01: Glossary data + components — write `src/content/glossary.js` with 10–15 finished entries; build `<GlossaryTerm>` trigger and singleton `<GlossaryPopover>` (native HTML Popover API, role=dialog, CSS Anchor Positioning with fallback)
- [ ] 04-02: Integration + a11y — wire glossary terms into guides and methodology page; manual keyboard + VoiceOver verification; Lighthouse CLS regression check

### Phase 5: Favorites / recently used pairs

**Goal:** Add a localStorage-backed favorites strip on the home page and exchange-rates-today that improves returning-user UX, addresses the schema-versioning gap from `CONCERNS.md`, and is visually distinct from ad cards.
**Mode:** mvp
**Depends on:** Phase 4 (last phase ordering — smallest reviewer impact, no functional dependency)
**Requirements:** FAV-01, FAV-02, FAV-03, FAV-04, FAV-05, FAV-06
**Success Criteria** (what must be TRUE):

  1. `src/services/storage.js` exposes `readVersioned(key, defaultValue)` / `writeVersioned(key, value)` with a `{v, data}` envelope; favorites stored under key `currencyabout_pairs_v1`
  2. User can star/unstar any currency pair from the home page and `/exchange-rates-today`; star button has `aria-label` describing action and state
  3. A "Your saved pairs" strip appears on home and `/exchange-rates-today` showing saved pairs as clickable cards; strip is hidden when empty
  4. Empty state shows a content-rich CTA paragraph plus 3 suggested popular pairs with editorial blurb — never a blank box
  5. Favorites strip is visually distinct from `<AdSlot />` (different border/background/header) and does not use common AdSense card dimensions (300×250, 336×280, 320×100)

**Plans:** 2 plans

Plans:

- [ ] 05-01: Storage util + favorites hook + star buttons — `src/services/storage.js`, `useFavorites()` hook with `currencyabout_pairs_v1` key, star buttons on home and exchange-rates-today rows
- [ ] 05-02: Favorites strip component + empty state — `<FavoritesStrip>` on home and `/exchange-rates-today`, content-rich empty state with 3 suggested pairs, visual distinction from ad slots

## Definition of Done (sprint)

- All 5 phases shipped to `main` and deployed to https://currencyabout.com
- `npm run build` passing at the end of every phase
- All 30 v1 requirements marked Complete in `REQUIREMENTS.md` traceability
- No regression in Core Web Vitals (LCP/CLS/INP all within Phase 3 success criteria)
- No visible UX breakage on home, guide, pair, exchange-rates-today, methodology pages
- No new runtime dependencies added; `web-vitals@^5.2.0` only as a `devDependency` if INP attribution required
- AdSense `useAdSenseLoader` consent gate preserved unchanged

---
*Created: 2026-05-19 after research synthesis*
