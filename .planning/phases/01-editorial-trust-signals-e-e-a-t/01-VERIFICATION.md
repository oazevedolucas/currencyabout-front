---
status: passed
phase: 01-editorial-trust-signals-e-e-a-t
verified_at: 2026-05-19T00:00:00Z
must_haves_total: 7
must_haves_passed: 7
gaps: 0
human_verification_items: 5
---

# Phase 1 Verification — Editorial Trust Signals (E-E-A-T)

## Verdict

Phase 1 passes all seven EEAT requirements at the code-truth level. Every requirement is observable in the source: a real human byline (Lucas Azevedo Souza) renders on guides, links to `/about#author`, the `/about` author block is substantive, `/methodology` carries an honest AI-use disclosure, JSON-LD ArticleSchema emits Person author with split datePublished/dateModified, HomePage and indexable pair pages emit FinancialProduct and Service (serviceType CurrencyConversion) JSON-LD respectively, and 38 hand-written 150-200 word pair intros render on Wave 1 indexable pairs. The two REVIEW.md warnings (em-dash on `AboutPage.jsx:99` and inside `FinancialProductSchema.name`) have already been corrected in-place. `npm run build` exits 0. The remaining human-verification items are the standard live-render checks (Rich Results Test, hash-anchor scroll behavior in react-router v7, manual visual sweep).

## Requirement traceability

| ID | Status | Evidence (file:line) | Notes |
|----|--------|----------------------|-------|
| EEAT-01 | pass | `src/pages/guides/GuidePage.jsx:111-119` (BylineMeta mounted in `<header>`); `src/components/BylineMeta/BylineMeta.jsx:23` (`<Link to="/about#author">{author.name}</Link>`); `src/content/authors.js:6` (`name: 'Lucas Azevedo Souza'`) | Real-name byline links to `/about#author` on every guide. |
| EEAT-02 | pass | `src/pages/guides/GuidePage.jsx:114-115` (`reviewedDate={guide.updated} reviewedLabel={t.bylineLastReviewed}`); `src/components/BylineMeta/BylineMeta.jsx:34` (renders `{reviewedLabel} {formatDate(reviewedDate, lang)}`); `src/i18n/locales/en.js` (`bylineLastReviewed: 'Last reviewed:'`) | Visible "Last reviewed:" label sourced from `guide.updated`; localized via `lang` prop. |
| EEAT-03 | pass | `src/pages/legal/AboutPage.jsx:96-109` (`<section id="author">` with bio, expertise, external link, and `<Link to="/contact">` path) | Substantive author hub on `/about#author`; bio comes from `AUTHORS['lucas-azevedo-souza'].bio` (96 words). |
| EEAT-04 | pass | `src/pages/legal/MethodologyPage.jsx:186-199` (new §8 "Use of AI tools in content creation"); section names AI drafting, human review, accountable editor, and clarifies AI is not used for rates | 122-word disclosure honoring D-18, D-19. Sections §8/§9/§10/§11 renumbered correctly. |
| EEAT-05 | pass | `src/seo/StructuredData.jsx:44-75` (ArticleSchema with `author: {'@type': 'Person', name, url}`, separate `datePublished`/`dateModified`, `publisher: {'@type': 'Organization', ...}`); `src/pages/guides/GuidePage.jsx:93-100` (passes `guide.published`, `guide.updated`, `guide.authorSlug`) | Person author + split dates + Organization publisher emitted on every guide. |
| EEAT-06 | pass | `src/seo/StructuredData.jsx:98-122` (FinancialProductSchema); `src/seo/StructuredData.jsx:124-148` (CurrencyConversionServiceSchema with `serviceType: 'CurrencyConversion'`); `src/pages/HomePage.jsx:137` (`<FinancialProductSchema />`); `src/pages/CurrencyPairPage.jsx:122` (`{indexable && <CurrencyConversionServiceSchema ... />}`) | Home emits FinancialProduct; indexable pair pages emit Service; non-indexable emit neither (gated on the same `indexable` boolean as `CurrencyPairSchema`). |
| EEAT-07 | pass | `src/content/pairProfiles.js` (38 entries, every entry 151-164 words); `src/pages/CurrencyPairPage.jsx:85,211` (`const pairIntro = getPairIntro(fromCode, toCode)` then conditional `{pairIntro && <p className="seo-content__intro">...}`) | 38 Wave 1 intros are unique strings (38 unique / 38 total), all on indexable pairs (verified against `isIndexablePair`); non-Wave-1 pages render the prior templated DOM unchanged because `getPairIntro` returns `null`. `noindex` is still applied to non-curated pairs via `SeoHead noindex={!indexable}`. |

## Locked-decision audit (D-01..D-19 spot-checks)

| Decision | Status | Evidence |
|----------|--------|----------|
| D-01 (real-name byline) | honored | `AUTHORS['lucas-azevedo-souza'].name = 'Lucas Azevedo Souza'` (authors.js:6); no invented persona. |
| D-02 (no sameAs; `/about#author` anchor) | honored | authors.js carries no `sameAs` key; `url: 'https://currencyabout.com/about#author'` is the only external destination. |
| D-04 (no Person.image) | honored | authors.js carries no `image` key; Person JSON-LD has no `image` field. |
| D-05 (`/about` hub, not new `/authors/<slug>` route) | honored | AboutPage.jsx replaces "Who We Are" with `id="author"` section; no new route added to `App.jsx`; sitemap unchanged. |
| D-06 (name links to `/about#author`) | honored | BylineMeta.jsx:23 `<Link to="/about#author">`; authors.js url string also `.../about#author`. |
| D-07 (BylineMeta on guides only) | honored | BylineMeta rendered only in GuidePage.jsx; not present in CurrencyPairPage.jsx or MethodologyPage.jsx. |
| D-08 (per-guide authorSlug + authors.js lookup) | honored | All 16 guides carry `authorSlug: 'lucas-azevedo-souza'`; BylineMeta + ArticleSchema both go through `getAuthor()`. |
| D-09 (pairProfiles.js intros above templated seo-content) | honored | CurrencyPairPage.jsx:211 renders intro inside `<section className="seo-content">` immediately before the existing `<h2>Converting...` heading. |
| D-10 (Wave 1 = POPULAR_PAIRS + reverses) | honored | All 38 expected keys present; no extras. Set matches POPULAR_PAIRS (20 forward) plus reverses (18 unique additional, since some forwards already match reverses). |
| D-11 (Wave 2 deferred) | honored | `getPairIntro` returns null for non-Wave-1 pairs; `EUR-CHF` (Wave 2 example) verified null. |
| D-12 (Person author, Organization publisher) | honored | StructuredData.jsx:57-66 shows `author: {'@type': 'Person', ...}` and `publisher: {'@type': 'Organization', ...}`. |
| D-13 (FinancialProduct on home via Helmet) | honored | HomePage.jsx:137 mounts `<FinancialProductSchema />` exactly once; emitted via `<Helmet>` in StructuredData.jsx:117-121. |
| D-14 (Service with serviceType CurrencyConversion; indexable-gated) | honored | StructuredData.jsx:128 (`serviceType: 'CurrencyConversion'`); CurrencyPairPage.jsx:122 (`{indexable && <CurrencyConversionServiceSchema ... />}`); the invalid top-level `CurrencyConversionService` `@type` is not used anywhere. |
| D-15 (published <= updated) | honored | All 16 guides have `published == updated` at the floor (verified by node script; zero violations). |
| D-17 ("Last reviewed:" label, not "Updated") | honored | Locale dictionaries carry `bylineLastReviewed: 'Last reviewed:'` (en); BylineMeta renders `reviewedLabel` literally; no remaining "Updated {guide.updated}" line in GuidePage.jsx. |
| D-18 (AI disclosure in /methodology only) | honored | New §8 in MethodologyPage.jsx; no AI-disclosure copy in AboutPage.jsx, GuidePage.jsx, Layout.jsx, or other pages. |
| D-19 (honest disclosure framing) | honored | §8 paragraph names AI drafting, the human review step, the accountable editor by name (Lucas Azevedo Souza), and clarifies AI is not used for rates or conversion math. |

## Edge-case spot-checks

- **BylineMeta i18n-driven, not hardcoded English**: `BylineMeta.jsx` imports no `useI18n`; `byLabel`/`reviewedLabel`/`readingLabel`/`lang` are all props. The "By" prefix is rendered via `{byLabel}` at line 22, never as a literal. All 7 locales carry `bylineBy` (`By`/`Por`/`Por`/`Par`/`Von`/`作者`/`著者`).
- **BylineMeta graceful degrade**: `BylineMeta.jsx:16-17` calls `getAuthor(authorSlug)` and `return null` if it misses. Confirmed.
- **Byline name link target**: `BylineMeta.jsx:23` uses `<Link to="/about#author">` so the name navigates to the author block. (Note: react-router v7 may not auto-scroll to the hash; flagged as info in REVIEW.md, listed in human-verification items below.)
- **FinancialProduct schema only on home, not duplicated on /about**: `grep "FinancialProductSchema"` in `src/pages/` matches only `HomePage.jsx:5` (import) and `HomePage.jsx:137` (mount). AboutPage.jsx and other pages do not emit it.
- **CurrencyConversionServiceSchema gated on `isIndexablePair === true`**: `CurrencyPairPage.jsx:122` reads `{indexable && <CurrencyConversionServiceSchema ... />}`; `indexable = isIndexablePair(fromCode, toCode)` at line 62. Non-indexable pair pages emit neither CurrencyPairSchema nor the new Service block.
- **published <= updated for all 16 guides**: verified by node script; 0 violations. Every guide has `published == updated` (orchestrator chose the safe floor per D-15).
- **All 38 entries in PAIR_PROFILES are on indexable pairs**: verified by node script that walks every key through `isIndexablePair(from, to)`; zero non-indexable leaks.
- **All 38 intros are distinct strings**: Set size of values = 38; zero duplicates. Spot-check confirms hand-written prose with named central banks and distinct openings ("For Brazilian importers...", "Cross-channel trade...", "Reflecting the deep ties...", "Tourists from São Paulo...", "Reflecting one of the deepest...").
- **Zero em-dashes in pairProfiles.js**: node grep returns 0 matches.
- **AI-tell scan on new prose**: zero matches for `passionate`, `fast-paced`, `today's fast`, `in conclusion`, `cutting-edge` in pairProfiles.js / MethodologyPage.jsx §8 / authors.js bio.
- **REVIEW.md warnings remediated**:
  - `AboutPage.jsx:99` no longer carries an em-dash. Line now reads `<strong>{...name}</strong>, {...jobTitle}` (comma replacement). Confirmed by direct read of the file.
  - `StructuredData.jsx` `FinancialProductSchema.name` now reads `'About Currency: Free Currency Converter'` (colon replacement). Confirmed.
- **`feesAndCommissionsSpecification` voice cleanup**: also tightened from `'Free — no fees charged...'` to `'Free. No fees charged...'` (StructuredData.jsx:111). Em-dash removed in the same pass.
- **Build passes**: `npm run build` exits 0 (664ms, 549 KB JS, 53 KB CSS).

## Gaps

None — all 7 EEAT requirements pass at the code-truth level, all locked decisions are honored, REVIEW.md warnings have been remediated, and the build is green.

## Human verification items (manual testing recommended)

These items require a live browser, deployed environment, or third-party validators and cannot be confirmed from source alone:

1. **Rich Results Test on a guide URL** (https://search.google.com/test/rich-results) — confirm Google parses the new Person author, datePublished, dateModified, and publisher Organization on the Article block.
2. **Rich Results Test / schema.org validator on home** — confirm the new FinancialProduct JSON-LD validates with zero errors and coexists with the existing static `index.html` blocks (WebSite, Organization, WebApplication).
3. **Rich Results Test on an indexable pair (e.g. `/usd-to-brl`)** — confirm Service block with `serviceType: 'CurrencyConversion'` validates; spot-check a non-indexable pair (e.g. `/krw-to-jpy`) emits neither schema.
4. **Hash-anchor scroll behavior on `/about#author`** — REVIEW.md info item flagged that react-router-dom v7's `<Link to="/about#author">` may not auto-scroll on in-app navigation (only on full-document loads). Manual check: clicking a guide byline name should scroll to the author section, OR a tiny follow-up effect can be added on `AboutPage` (deferred to a later phase per REVIEW.md; not a Phase 1 gap).
5. **Localized date rendering** — switch the site to pt/es/fr/de/zh/ja via the LanguageSelector and confirm the byline strip renders the localized "By" prefix, "Last reviewed:" label, "min read" label, and `toLocaleDateString` output for each locale.

## Conclusion

Phase 1 is complete and merge-ready. Every EEAT requirement is implemented, every locked decision from CONTEXT.md (D-01 through D-19, where applicable to this phase) is honored, every plan SUMMARY claim is observable in the actual code, and the two voice-rule slips flagged in REVIEW.md have been fixed. `npm run build` passes. The remaining items are external-validator confirmations and a known react-router-v7 hash-scroll behavior that REVIEW.md flagged as info-only and deferred. No structural risk to the in-flight AdSense review window: all changes are additive, the visible regression surface is limited to the named-author block on `/about` (which is intended, per D-05), and non-Wave-1 pair pages render byte-identical DOM to pre-phase.
