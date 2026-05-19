---
phase: 01-editorial-trust-signals-e-e-a-t
plan: 02
subsystem: seo-structured-data

tags: [json-ld, schema-org, person, financial-product, service, e-e-a-t, adsense]

# Dependency graph
requires:
  - phase: 01-01
    provides: AUTHORS['lucas-azevedo-souza'] Person record + getAuthor finder in src/content/authors.js
provides:
  - ArticleSchema upgraded to Person author with separated datePublished/dateModified wiring
  - FinancialProductSchema named export (no props, static schema for the home page)
  - CurrencyConversionServiceSchema named export (4 props; Service + serviceType 'CurrencyConversion')
  - 16 guides each carry published + authorSlug fields (published <= updated invariant)
  - Home page emits FinancialProduct JSON-LD via Helmet
  - Indexable pair pages emit Service JSON-LD via Helmet (non-indexable emit neither)
affects: [01-03-editorial-uniformity]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Per-schema named-export functions in StructuredData.jsx (extends the existing 4-emitter pattern with 2 new emitters)"
    - "Legacy prop preserved + ignored — extending ArticleSchema with authorSlug while keeping the legacy `author` string prop in the signature (no-op) so 01-03's GuidePage call site can migrate in its own wave without a mid-wave breakage window"
    - "Schema duplication tolerated by Google: static index.html JSON-LD (WebSite/Organization/WebApplication) coexists with the new Helmet-injected FinancialProduct (four different @type values)"

key-files:
  created: []
  modified:
    - src/seo/StructuredData.jsx
    - src/content/guides.js
    - src/pages/HomePage.jsx
    - src/pages/CurrencyPairPage.jsx

key-decisions:
  - "authorSlug default in ArticleSchema = 'lucas-azevedo-souza' (matches 01-01 SUMMARY's locked slug, not the plan template's illustrative 'owner')"
  - "Legacy `author` string prop kept in ArticleSchema signature but ignored — guarantees no compile/runtime break for the pre-01-03 GuidePage.jsx call site"
  - "All 16 guides default published = updated per orchestrator's resolved Task 1 input ('Default: published = updated'). No invented earlier history."
  - "FinancialProductSchema and CurrencyConversionServiceSchema both include termsOfService and availableLanguage (the recommended additions from RESEARCH.md §1C/§1D) — confirms 7-language i18n investment to crawlers"

patterns-established:
  - "Schema enrichment without GuidePage churn: extend ArticleSchema with new optional props (default-filled) so the call site can migrate in a later wave without a mid-flight breakage window"
  - "Indexable-gated schemas: both CurrencyPairSchema and CurrencyConversionServiceSchema share the same `indexable && ...` guard — keeps the SEO surface consistent and ensures Service does not leak onto non-indexable pair pages"

requirements-completed:
  - EEAT-05
  - EEAT-06

# Metrics
duration: ~20min
completed: 2026-05-19
---

# Phase 01-02: Structured-data depth (Person author + FinancialProduct + Service)

**Guide ArticleSchema now emits a named Person author with split datePublished/dateModified; home page emits FinancialProduct JSON-LD; indexable pair pages emit Service (serviceType CurrencyConversion) JSON-LD — all via additive Helmet injection, zero visible UX change.**

## Performance

- **Tasks:** 5 (Task 1 was a checkpoint resolved out-of-band by orchestrator; Tasks 2–5 executed here)
- **Commits:** 5 atomic feature commits + this SUMMARY commit
- **Files modified:** 4 (StructuredData.jsx, guides.js, HomePage.jsx, CurrencyPairPage.jsx)
- **Files created:** 0
- **npm run build:** PASSED after every commit
- **No new dependencies**

## Accomplishments

- **ArticleSchema upgraded**: author flips from Organization to Person via `getAuthor(authorSlug)` lookup; fallback chain `getAuthor(authorSlug) ?? getAuthor('lucas-azevedo-souza')` guarantees a valid Person record always serializes. Publisher stays Organization. datePublished and dateModified remain separate props — the 01-03 GuidePage migration will supply guide.published vs guide.updated.
- **FinancialProductSchema (new export)**: static, no-prop schema for the home page. Includes provider, category, feesAndCommissionsSpecification, areaServed, termsOfService, and availableLanguage (7 locales).
- **CurrencyConversionServiceSchema (new export)**: `@type: 'Service'` + `serviceType: 'CurrencyConversion'` (the schema.org-valid representation — CurrencyConversionService is not a top-level type). Takes fromCode, toCode, fromName, toName props.
- **All 16 guides** carry `published: '<YYYY-MM-DD>'` (= existing updated value per orchestrator's resolved Task 1 default) and `authorSlug: 'lucas-azevedo-souza'`. The 'how-exchange-rates-work' entry carries the enforcement comment for D-15. Pitfall C invariant verified by an inline node check: every guide has `published <= updated`.
- **HomePage.jsx** imports + mounts `<FinancialProductSchema />` exactly once, adjacent to the existing BreadcrumbSchema.
- **CurrencyPairPage.jsx** imports + mounts `<CurrencyConversionServiceSchema>` gated on `indexable`, immediately after the existing `<CurrencyPairSchema>` (same guard) — non-indexable pair pages render neither.

## Task Commits

Task 1 was a human-input checkpoint; the orchestrator resolved it with "Default: published = updated" and merged it with the field write as a single commit:

1. **Task 1: add published date floor to all 16 guides (= updated)** — `30c7c56` (feat)
2. **Task 2: StructuredData.jsx — Person + FinancialProduct + Service emitters** — `5f70a14` (feat)
3. **Task 3: add authorSlug to all 16 guides** — `32e2789` (feat)
4. **Task 4: mount FinancialProductSchema on HomePage** — `3cad2d8` (feat)
5. **Task 5: mount Service schema on indexable pair pages** — `67a569f` (feat)

## Files Created/Modified

- `src/seo/StructuredData.jsx` — ArticleSchema upgraded (Person author + getAuthor import); new FinancialProductSchema + CurrencyConversionServiceSchema named exports
- `src/content/guides.js` — every one of the 16 guide entries gained `published` (= updated) and `authorSlug: 'lucas-azevedo-souza'`; enforcement comment added above the first guide's published field
- `src/pages/HomePage.jsx` — import extended to include FinancialProductSchema; one-line mount adjacent to BreadcrumbSchema
- `src/pages/CurrencyPairPage.jsx` — import extended to include CurrencyConversionServiceSchema; indexable-gated mount adjacent to CurrencyPairSchema

## Decisions Made

- **authorSlug default in ArticleSchema = `'lucas-azevedo-souza'`** (not the plan template's illustrative `'owner'`). Matches the locked slug from 01-01 SUMMARY. The `getAuthor()` fallback chain references the same slug.
- **Legacy `author` string prop kept (but ignored)**: ArticleSchema's signature still accepts `author = 'About Currency Editorial Team'` so the current GuidePage.jsx call site does not break — but the prop is consumed by a `void author` no-op statement and never serialized. The proper migration (passing `authorSlug={guide.authorSlug}`) ships in plan 01-03.
- **All 16 guides default published = updated**: per orchestrator's resolved Task 1 input. No invented earlier history. Pitfall C is automatically satisfied (`published == updated` ≤ `updated`).
- **Schema 'recommended additions' included**: both FinancialProductSchema and CurrencyConversionServiceSchema emit `termsOfService: 'https://currencyabout.com/terms'` and `availableLanguage: ['en','pt','es','fr','de','zh','ja']` per RESEARCH.md §1C/§1D's recommended additions. These confirm the i18n investment to crawlers.

## Deviations from Plan

1. **authorSlug literal is `'lucas-azevedo-souza'`, not `'owner'`** (everywhere — in guides.js entries, in ArticleSchema default, in getAuthor fallback). Required by 01-01 SUMMARY's locked slug decision. Acceptance grep adjusted from `^    authorSlug: 'owner',` to `^    authorSlug: 'lucas-azevedo-souza',` — count still 16.
2. **Task 1 (checkpoint) collapsed into a single feature commit** by the orchestrator's resume payload: "Default: published = updated for every guide" was applied as the Task 1 commit before Task 3 added authorSlug. This matches the orchestrator's instruction; the plan's literal Task 3 (which originally combined published + authorSlug) was reduced to only adding authorSlug.

**Total deviations:** 2 — both orchestrator-mandated; neither changes plan semantics nor any visible contract.

## Issues Encountered

None. Every task built clean on the first attempt.

## User Setup Required

None.

## Next Phase Readiness

- **Plan 01-03 (editorial uniformity)** can now:
  - Update GuidePage.jsx ArticleSchema call site to `<ArticleSchema ... datePublished={guide.published} dateModified={guide.updated} authorSlug={guide.authorSlug} />` — every guide already has all three fields.
  - Mount `<BylineMeta authorSlug={guide.authorSlug} reviewedDate={guide.updated} ... />` in GuidePage's `<header>` — authorSlug is present on every guide; getAuthor resolves it via the same record ArticleSchema uses, so both consumers share one source of truth.
  - The legacy `author` string prop in ArticleSchema's signature can be removed safely once GuidePage.jsx is migrated.
- **Rich Results Test (post-deploy)**: home page + any guide URL + any indexable pair page (e.g., /usd-to-brl) should now report Person + FinancialProduct + Service entity types respectively.
- **No outstanding TODOs** from this plan. Pitfall C invariant (`published <= updated`) is verified by inline check; future `updated` edits must keep this true.

---
*Phase: 01-editorial-trust-signals-e-e-a-t*
*Plan: 01-02*
*Completed: 2026-05-19*
