# currencyabout.com Sprint 1 — AdSense Approval Reinforcement

## What This Is

**currencyabout.com** is a free, independent currency converter at https://currencyabout.com that lets users convert between 21 major world currencies using daily-refreshed mid-market reference rates. The site is built as a React 19 + Vite SPA hosted on Cloudflare Workers, with 16 long-form editorial guides, dedicated pages for each indexable currency pair, methodology and legal pages, and a consent-gated Google AdSense integration that is currently in active review for re-approval.

**This initiative** is a 1–2 week sprint to strengthen the site's AdSense approval signals while the review is in flight, without introducing visible breakage that a returning reviewer could see mid-revision.

## Core Value

**Maximize AdSense approval odds during the active review window.** Every change in this sprint is judged by whether it strengthens the reviewer's perception of editorial depth, professional polish, and technical quality — without risking visible regressions that could harm the in-flight review.

## Requirements

### Validated

<!-- Inferred from the codebase map produced by /gsd:map-codebase. These are
working, in-production capabilities that this sprint must NOT break. -->

- ✓ Live currency converter for 21 currencies with mid-market reference rates — existing (`src/pages/HomePage.jsx`, `src/hooks/useCurrencyConverter.js`)
- ✓ Daily-refreshed exchange-rate fetch from `open.er-api.com` with localStorage cache — existing (`src/hooks/useExchangeRates.js`)
- ✓ 16 long-form editorial guides at `/guides/:slug` with `ArticleSchema` JSON-LD — existing (`src/content/guides.js`, `src/pages/guides/GuidePage.jsx`)
- ✓ Per-pair pages at `/:pair` with full editorial blocks, `BreadcrumbSchema` and `CurrencyPairSchema` for indexable pairs, and `noindex` for thin variants — existing (`src/pages/CurrencyPairPage.jsx`, `src/seo/seoContent.js`)
- ✓ Exchange Rates Today landing at `/exchange-rates-today` with rates table and editorial section — existing (`src/pages/ExchangeRatesTodayPage.jsx`)
- ✓ Methodology, About, Contact, Privacy Policy, Terms of Service pages, all linked from the footer — existing (`src/pages/legal/`)
- ✓ Cookie consent banner with accept/reject + `cookie-consent-changed` event + `hasMarketingConsent()` helper — existing (`src/components/CookieConsent/CookieConsent.jsx`)
- ✓ Consent-gated AdSense loader and double-gated `<AdSlot />` component with IntersectionObserver lazy load — existing (`src/hooks/useAdSenseLoader.js`, `src/components/AdSlot/`)
- ✓ AdSense slot placements: 1 on home, 2 on guide pages, 2 on pair pages; zero on legal/contact/methodology/about/404 — existing (commit `5f46310`)
- ✓ `<RateDisclaimer />` mounted on home, pair, and exchange-rates-today pages — existing (`src/components/RateDisclaimer/`)
- ✓ Custom 404 page with `noindex` meta — existing (`src/pages/NotFoundPage.jsx`)
- ✓ React Helmet-based SEO head with canonical URLs, OG/Twitter tags, hreflang for 7 languages — existing (`src/seo/SeoHead.jsx`)
- ✓ Static sitemap covering 27+ URLs and noscript fallback in `index.html` — existing (`public/sitemap.xml`)
- ✓ Custom i18n with 7 languages (EN/PT/ES/FR/DE/ZH/JA) served from a single URL with hreflang — existing (`src/i18n/I18nContext.jsx`)
- ✓ `ads.txt` with correct publisher line — existing (`public/ads.txt`)
- ✓ AdSense application re-submitted to Google for review (less than 7 days old as of project init) with real slot ids replacing placeholders
- ✓ Editorial trust signals (E-E-A-T) — real-name byline on every guide, "Last reviewed:" dates, `/about#author` hub with bio + expertise statement + LinkedIn link, AI-assistance disclosure on `/methodology`, Person + FinancialProduct + Service JSON-LD, and 38 hand-written intros on the indexable currency-pair pages — validated in Phase 1

### Active

<!-- The 5 phases this sprint will deliver. Each is a hypothesis that ships
during this 1–2 week window. -->

- [ ] **UX polish across home, guide, pair, and legal pages:** Mobile breakpoint audit, accessibility pass (contrast, keyboard nav, focus states, `aria-*` correctness), visual consistency tightening (spacing, hierarchy, dark-mode quality) — no rebrand
- [ ] **Performance + Core Web Vitals:** Code-split the >500 KB single JS bundle (`vite build` warning), defer non-critical CSS/JS, lazy-load below-the-fold imagery, validate LCP/CLS/INP fall in the "Good" range on a mid-tier mobile device
- [ ] **Feature — Glossary popovers:** Lightweight inline definitions for ~10–15 finance terms (mid-market, bid-ask, spread, REER, DXY, peg, float, etc.) that appear contextually across guides, methodology, and pair pages; click/tap reveals a short definition with a "Read more" link to the relevant guide
- [ ] **Feature — Favorites / recently used pairs:** localStorage-backed "Your pairs" strip on home page and on `/exchange-rates-today` that surfaces the user's recent or pinned conversions; one-tap access, no auth needed, no server-side persistence

### Out of Scope

<!-- Explicit deferrals. Reasoning prevents re-adding mid-sprint. -->

- **Historical rate charts** — ~5–7 days of work alone, needs API extension for historical series, highest risk of leaving half-built during active AdSense review. Deferred to v2.
- **Currency search / quick picker overhaul** — current dropdown picker works; UX win exists but marginal for AdSense reviewer specifically. Deferred to v2.
- **Full visual rebrand (palette, typography, hero redesign)** — user picked "Polish the current look". Rebranding during active review is high-risk. Deferred indefinitely unless a future review explicitly flags the visual presentation.
- **PT / EN parallel route trees and Brazil-specific topics** — single-URL i18n is the documented architecture (see `src/seo/SeoHead.jsx` comment on hreflang). Multi-day refactor, not justified by AdSense approval. Out of scope for this and any near-term sprint.
- **ESLint config and test framework setup** — intentionally skipped earlier (see `CONCERNS.md`); not a signal Google AdSense reviewers care about. Out of scope until a future "tech-debt sprint".
- **Cloudflare Worker for true HTTP 404 status** — `noindex` meta is sufficient signal for Googlebot per prior decision (see `POST-DEPLOY-CHECKLIST.md`). Out of scope unless a future indexing problem surfaces.

## Context

- **Recent shipping history.** Commit `5f46310` (May 18, 2026) added 9 new English guides (taking total to 16), a `<RateDisclaimer />` component, and the consent-gated AdSense scaffolding (`useAdSenseLoader`, `<AdSlot />`, `src/constants/adsense.js`). Commit `2bbef70` (same day) added this `.planning/codebase/` map. AdSense was re-submitted shortly after `5f46310` with real slot ids substituted for the placeholders.
- **Codebase map available.** `.planning/codebase/` has 7 documents (STACK, INTEGRATIONS, ARCHITECTURE, STRUCTURE, CONVENTIONS, TESTING, CONCERNS) describing the React 19 + Vite + Cloudflare Workers SPA, conventions, and known concerns. Planning agents should read these for prescriptive guidance.
- **Known concerns from `CONCERNS.md`** that are in-scope for this sprint:
  - >500 KB single JS bundle warning from `vite build` (Phase 3)
  - Sitemap drift risk (hand-maintained `public/sitemap.xml`) — Phase 1 may auto-fix via build-time script if quick
  - localStorage usage has no schema versioning — Phase 5 must avoid introducing a sixth localStorage key without thinking about migration
- **Editorial voice.** 16 guides already share a distinct voice (concrete, no AI-tells, no em-dashes in body, sentence-case headings). Any new copy must match. See `src/content/guides.js` for canonical examples; sprint planning must preserve this voice when adding bylines, dates, or glossary definitions.
- **AdSense review pressure.** Application is fresh (<7 days). The review window can close at any time. Phases should be sequenced so each phase ships independently — no half-finished features in production at any commit.

## Constraints

- **Timeline:** 1–2 weeks part-time (evenings/weekends) — bounds the depth of each phase. Use existing components and patterns; avoid greenfield rewrites.
- **No visual rebrand:** Polish-only. Existing palette, typography, and overall layout stay. Visual changes are tightening, not reinvention.
- **No new dependencies:** Anything that adds a build-time or runtime package must be named, justified, and approved before merging. Goal: zero net new dependencies for the sprint.
- **No converter / i18n / cookie-consent changes:** These are validated systems. Read them, don't modify them, unless a phase explicitly requires it and a rollback is trivial.
- **Tech stack:** React 19 + Vite 6 + react-router-dom v7 + react-helmet-async, plain JS (not TS), plain CSS co-located with components, Cloudflare Workers static assets. Stay inside this stack.
- **Active review:** Each merge must keep `npm run build` passing and not break visible UX on home, guide, or pair pages. No long-lived feature branches.
- **Editorial content:** Any new prose must match the existing guide voice — no em-dashes in body, no "in today's fast-paced world" AI-tells, no "in conclusion" closers, sentence-case headings, ranges only for rates, no invented historical numbers.
- **Originality:** New copy is hand-written and original. No paraphrasing from sources. Cite, link, don't repeat sentences.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Sprint scope locked to 5 phases (E-E-A-T, UX polish, perf, glossary, favorites). Historical charts and currency search deferred to v2. | User picked the 1–2 week sprint option; honest scope/timeline reconciliation. Charts and search overhaul are each 1+ week alone. | — Pending |
| Visual direction: polish only, no rebrand. | User picked "Polish the current look"; rebranding during an active AdSense review is high-risk for the in-flight application. | — Pending |
| All 4 AdSense pillars (E-E-A-T, UX, performance, features) included in scope despite tight timeline; only the feature axis is contracted. | User flagged all four as important. Trust signals, UX, and performance are higher leverage per hour than additional features for a reviewer's perception. | — Pending |
| Stay on single-URL i18n strategy with hreflang. No PT/EN parallel routes. | Existing documented architecture; per-language routes would invalidate hreflang and break Google's bidirectional return-tag check. | ✓ Good (locked in earlier work) |
| AdSense loader stays consent-gated; static `<script>` in `index.html` stays commented out. | Re-adding the static script would defeat the consent gate built in commit `5f46310`. | ✓ Good (locked in earlier work) |
| Slot ids in `src/constants/adsense.js` already replaced with real values before this sprint. | Confirmed by user during questioning. Sprint planning assumes real ids are in place; no further action on this front. | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-20 after Phase 1 (Editorial trust signals / E-E-A-T) completed*
