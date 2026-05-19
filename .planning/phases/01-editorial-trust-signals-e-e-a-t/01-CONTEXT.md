# Phase 1: Editorial trust signals (E-E-A-T) - Context

**Gathered:** 2026-05-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Push currencyabout.com from "competent utility" to "real publisher with named accountability" — the bar a 2026 YMYL-finance AdSense reviewer applies. Three plans cover (a) named author data model and visible byline, (b) structured-data depth, (c) editorial uniformity (last-reviewed dates, methodology extension, pair-page editorial audit). Pure content + small additive components. Zero performance impact. Zero structural risk during the active review window.

**Out of scope this phase** (belongs in other phases, do not pull in): mobile/a11y/cookie audit (Phase 2), code-splitting and CWV work (Phase 3), glossary popovers (Phase 4), favorites/storage (Phase 5).

</domain>

<decisions>
## Implementation Decisions

### Byline identity & bio
- **D-01:** Byline is the project owner's full real name. The exact name string is captured in `src/content/authors.js` during plan-phase; planning must request it from the user if not yet supplied. No invented persona, no group "Editorial Desk" byline.
- **D-02:** Visible byline links to the internal `/about#author` hash anchor — not an external profile. No `sameAs` external profile array in Person JSON-LD this phase.
- **D-03:** Bio depth: ~80–120 word paragraph + a short expertise statement + 1 external link. Matches the existing `/about` voice; no overclaiming.
- **D-04:** No portrait/avatar. Person JSON-LD ships without an `image` property. Text byline only.

### Author hub placement
- **D-05:** Author block lives inside `/about`, replacing the existing "Who We Are" section (so the page no longer claims a "small team of web engineers and writers" while another part shows a single named owner). No new route; no `/authors/<slug>`; no sitemap or nav change.
- **D-06:** Anchor target is `/about#author`. The visible byline link and the Person JSON-LD `url` property both point to it.
- **D-07:** `<BylineMeta>` renders on `/guides/:slug` only. `/methodology` and pair pages stay byline-free this phase.
- **D-08:** `src/content/guides.js` gains a per-guide `authorSlug: string` field. Lookup goes through `src/content/authors.js` (new), which holds the canonical Person record(s). One author this sprint, future-proofed for guest contributors.

### Pair-page editorial uniqueness (EEAT-07)
- **D-09:** A new `src/content/pairProfiles.js` holds per-pair intros, keyed by canonical `${FROM}-${TO}`. Each entry is a single ~150–200 word hand-written prose intro. `CurrencyPairPage.jsx` renders the intro **above** the existing templated `seo-content` block; the templated section stays.
- **D-10:** Ship in waves. **Wave 1 = the 20 `POPULAR_PAIRS` in `src/seo/seoContent.js` plus their reverses (~40 pairs).** Remaining indexable major-major crosses (~30) are covered in later waves.
- **D-11 (known tradeoff):** During the wave-gap, the ~30 indexable major-major crosses (USD↔CHF, EUR↔JPY, etc.) still render only templated copy + per-currency `getProfile()` content. This is accepted in exchange for sprint speed. Planning must explicitly decide whether wave 2 ships inside Phase 1 (delays merge) or as a follow-up Phase 1.5 (merge wave 1, queue wave 2). Recommended: ship wave 1 in Phase 1, treat waves 2+ as backlog the moment AdSense approval lands.

### Structured-data depth (EEAT-05, EEAT-06)
- **D-12:** `ArticleSchema.author` changes from `Organization` to `Person { name, url: SITE_URL + '/about#author' }`. `publisher` stays as the existing Organization block. Single shared Person record across all 16 guides for now.
- **D-13:** Home page adds a new `FinancialProduct` JSON-LD block alongside the existing `WebApplication` JSON-LD already inlined in `index.html`. The new emission goes through the React `<Helmet>` stack so it can reference live i18n strings if needed.
- **D-14:** Indexable pair pages add a `Service` JSON-LD with `serviceType: 'CurrencyConversion'` (since `CurrencyConversionService` is not a top-level schema.org type), alongside the existing `ExchangeRateSpecification` and `BreadcrumbSchema`. Non-indexable pair pages emit neither.

### Dates and visible meta line (EEAT-02, EEAT-05)
- **D-15:** `src/content/guides.js` gains a `published: 'YYYY-MM-DD'` field on every guide. The existing `updated` field is reinterpreted as the reviewed/modified date. Backfill: for guides whose true publication date isn't recorded, use the current `updated` value as the floor.
- **D-16:** `ArticleSchema` emits `datePublished = guide.published` and `dateModified = guide.updated`. They will diverge over time as guides get reviewed without rewrite.
- **D-17:** Visible guide meta line switches from "Updated YYYY-MM-DD" to **"Last reviewed: YYYY-MM-DD"** (using `updated`). The `published` field stays in `guides.js` for JSON-LD only — not surfaced in the meta line.

### AI-assistance disclosure (EEAT-04)
- **D-18:** "AI-assisted, human-reviewed" disclosure surfaces as a dedicated section in `/methodology` only — near the existing "Editorial process" section. No inline note on guide footers, no copy on `/about`, no banner anywhere else.
- **D-19:** The disclosure section must be honest about the actual workflow (drafting with AI assistance, human review for accuracy and voice). Planning agents must surface the draft copy for user review before merge — do not invent specifics the user has not confirmed.

### Claude's Discretion
- Exact bio prose for the `/about` author block (within the agreed ~80–120 word budget, expertise statement, 1 external link slot).
- Exact wording of "Last reviewed" label, AI-disclosure paragraph copy, and the per-pair intro prose, subject to user review.
- Whether `<BylineMeta>` is a flat byline strip or expands into a small inline author card on guides — planning to propose, user to approve.
- Exact JSON-LD field set on `FinancialProduct` and the new pair-page `Service` block, beyond the minimal required properties.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements
- `.planning/ROADMAP.md` §"Phase 1: Editorial trust signals (E-E-A-T)" — goal, success criteria, three plans (01-01 author components, 01-02 structured data, 01-03 editorial uniformity)
- `.planning/REQUIREMENTS.md` §"Trust signals (E-E-A-T) — Phase 1" — EEAT-01 through EEAT-07, atomic and testable
- `.planning/PROJECT.md` §"Key Decisions" — real-name byline, AI-disclosure copy, editorial-standards lives inside /methodology (all locked)

### Research (drives this phase's design)
- `.planning/research/SUMMARY.md` §"Phase 1" — phase rationale, P1 squeeze-ins, asymmetric risks
- `.planning/research/FEATURES.md` — table stakes (byline, last-reviewed, editorial standards), anti-features that MUST NOT be added during review
- `.planning/research/PITFALLS.md` — Pitfall 1 (thin pair editorial), Pitfall 2 (additive-only mid-review), Pitfall 7 (E-E-A-T signal gaps)
- `.planning/research/ARCHITECTURE.md` Pattern 6 — JSON-LD depth recipe; Build Order — Phase 1 ships first

### Codebase
- `.planning/codebase/STRUCTURE.md` — where new files go (`src/content/authors.js`, `src/content/pairProfiles.js`)
- `.planning/codebase/CONVENTIONS.md` — naming, named exports only, plain-CSS co-located
- `.planning/codebase/ARCHITECTURE.md` — provider stack, SEO layer responsibilities
- `.planning/codebase/CONCERNS.md` — sitemap drift (relevant because we are NOT adding new routes this phase)

### Files this phase modifies (read before editing)
- `src/seo/StructuredData.jsx` — `ArticleSchema` extension target; add new `FinancialProductSchema` + service-block emitter
- `src/content/guides.js` — add `authorSlug` + `published` fields to all 16 entries; do NOT touch body content
- `src/seo/seoContent.js` — `isIndexablePair()` decides which pair pages get the new `Service` JSON-LD and the per-pair intro
- `src/pages/guides/GuidePage.jsx` — `<BylineMeta>` insertion point, meta line relabel from "Updated" to "Last reviewed"
- `src/pages/legal/AboutPage.jsx` — replace "Who We Are" section with named-author block at `#author` anchor
- `src/pages/legal/MethodologyPage.jsx` — extend with AI-assistance disclosure section near §7 "Editorial process"
- `src/pages/CurrencyPairPage.jsx` — render `pairProfiles` intro above existing `seo-content`; add `Service` schema gated on `isIndexablePair()`

### Files this phase introduces (new — names locked)
- `src/content/authors.js` — canonical Person record(s) for `authorSlug` lookup
- `src/content/pairProfiles.js` — keyed `${FROM}-${TO}` map of hand-written intros (wave 1: POPULAR_PAIRS + reverses)
- `src/components/BylineMeta/BylineMeta.jsx` + `.css` — visible byline strip rendered on `/guides/:slug`

### External standards (HIGH-trust references downstream prose can cite)
- Google Search Central — Article structured data, E-E-A-T guidance, page experience
- schema.org — Person, FinancialProduct, Service, Article, ExchangeRateSpecification

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BreadcrumbSchema`, `ArticleSchema`, `FAQSchema`, `CurrencyPairSchema` in `src/seo/StructuredData.jsx` — existing pattern is one named export per schema type, each wrapped in `<Helmet>` with `<script type="application/ld+json">`. New `FinancialProductSchema` and `CurrencyConversionServiceSchema` (or a single `ServiceSchema` with serviceType) follow the same shape.
- `getProfile(code)` in `src/content/currencyProfiles.js` — gives per-currency data already rendered on pair pages. The new pairProfiles is per-*pair* and complements (does not replace) this.
- `isIndexablePair(from, to)` in `src/seo/seoContent.js:57` — single source of truth for whether a pair page is reviewer-visible to Google. New service-schema emission and the pairProfiles intro both gate on this function.
- `<Breadcrumbs>` in `src/components/Breadcrumbs/` — usable model for `<BylineMeta>` (small co-located component + CSS, named export, no context dependencies).
- `<RateDisclaimer>` mounted on home / pair / exchange-rates-today — proves the "rendered everywhere relevant" pattern without a Layout-level mount.

### Established Patterns
- **Editorial content as code:** `guides.js` is a structured JS array of blocks. Adding `authorSlug` and `published` fields is additive and matches the existing schema-shape style.
- **JSON-LD via react-helmet-async:** Pages compose multiple `<Helmet>` blocks; each schema component pushes its own `<script>` tag. Adding new schemas does not require centralization.
- **Plain JS, no TypeScript, no JSDoc typing.** Hand-enforce shape correctness; no schema validators introduced.
- **kebab-case BEM CSS** co-located with the component (e.g., `guide-article__meta` in `guides.css`). `<BylineMeta>` keeps to this.
- **named exports only** for everything except `src/App.jsx` (the single tolerated default).

### Integration Points
- `<BylineMeta>` mounts inside `<header className="guide-article__header">` in `GuidePage.jsx:104-114`. Replaces the static "By the About Currency editorial team" span. The existing reading-minutes + meta line stays.
- The `published` field flows into `<ArticleSchema datePublished={guide.published} dateModified={guide.updated} />` (replaces the current `guide.updated` for both fields at `GuidePage.jsx:94-95`).
- The visible meta-line relabel happens at `GuidePage.jsx:112` (`Updated {guide.updated}` → `Last reviewed {guide.updated}`).
- The pair-page intro renders at the top of the `seo-content` section in `CurrencyPairPage.jsx:207-302`, immediately after `<section className="seo-content">` opens. The existing `<h2>Converting {fromName} ({fromCode}) to {toName} ({toCode})</h2>` and templated paragraphs stay, but the intro precedes them so the unique content sits closer to the top of the rendered DOM.
- The new `Service` schema mounts adjacent to `<CurrencyPairSchema>` at `CurrencyPairPage.jsx:119`, gated on the same `indexable` boolean.
- The new `FinancialProduct` schema mounts inside `<HomePage>` SEO block (path: `src/pages/HomePage.jsx`, alongside existing `<SeoHead>`).
- The `/about` author block lives between the existing "What Makes Us Different" section and the (now-removed) "Who We Are" section in `AboutPage.jsx`, anchored by `<h2 id="author">` so `/about#author` works without React Router intervention.
- The `/methodology` AI-disclosure goes between §7 (Editorial process) and §8 (Known limitations) at `MethodologyPage.jsx:159-184`.

### Things NOT to touch (constraint reminders)
- `useCurrencyConverter`, `useExchangeRates`, `fetchRates`, `services/exchangeRate.js` — converter system, validated, untouched.
- `useAdSenseLoader`, `<AdSlot>`, `src/constants/adsense.js`, `isAdAllowedOnRoute` — AdSense scaffolding, do not modify.
- `I18nProvider`, `ThemeProvider`, `CookieConsent` — validated systems; untouched this phase.
- `index.html` JSON-LD blocks (WebSite, Organization, WebApplication) stay as-is. The new `FinancialProduct` is in addition, not a replacement.
- `public/sitemap.xml` — no new routes this phase, so no sitemap change is required.

</code_context>

<specifics>
## Specific Ideas

- Person JSON-LD `url` MUST resolve to `https://currencyabout.com/about#author`. The hash anchor matters for both the visible byline link and the structured data — both point to the same place.
- Visible meta line on guides becomes literally "Last reviewed: YYYY-MM-DD" (with "Last reviewed" prefix, ISO date suffix). The `published` field is JSON-LD-only.
- `pairProfiles.js` entries are keyed as `'USD-BRL'`, `'BRL-USD'`, etc. — uppercase, hyphen-separated, both directions stored independently (since intros differ by direction even when the rate is reciprocal).
- The AI-disclosure section in `/methodology` is honest about the actual workflow ("drafted with AI assistance, reviewed and edited by a human") — planning agents propose copy; user reviews before merge.
- "Who We Are" section in `/about` is **replaced** (not extended) so the page does not contradict the named byline.

</specifics>

<deferred>
## Deferred Ideas

- **External `sameAs` profile URLs in Person JSON-LD** — explicitly skipped this phase per the locked decision to keep bio destinations internal. Revisit if AdSense approval still hesitates after Phase 1 ships.
- **Author portrait + Person JSON-LD `image`** — deferred; trivially addable later by dropping a file in `public/` and updating `authors.js`.
- **`reviewedBy` field on guides** — research SUMMARY flagged as P2; not in this phase. Could be added later if reviewer adds a second human.
- **`FAQPage` JSON-LD** wherever the `<FAQ>` component already mounts — research SUMMARY P2. Not in scope this phase but a 1-line addition when revisited.
- **Internal linking audit** — every page links to ≥2 contextual guides/pair pages. Research SUMMARY P2. Defer to a follow-up phase.
- **Pair-page editorial wave 2+** (~30 major-major crosses) — see D-11. Planning decides whether wave 2 fits inside Phase 1 or queues as Phase 1.5.
- **Byline on `/methodology`** ("Maintained by [name]") — considered, declined. Could revisit if a future reviewer pass wants named accountability on the standards page itself.
- **Byline / author block on pair pages** — considered, declined to avoid the "inflated byline" anti-signal on reference pages.

</deferred>

---

*Phase: 1-editorial-trust-signals-e-e-a-t*
*Context gathered: 2026-05-19*
