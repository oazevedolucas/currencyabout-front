---
status: minor_issues
phase: 01-editorial-trust-signals-e-e-a-t
depth: standard
reviewed_at: 2026-05-20T00:14:52Z
file_count: 19
critical_count: 0
warning_count: 2
info_count: 8
---

# Code Review — Phase 1

## Summary

Phase 1 (Editorial Trust Signals / E-E-A-T) is functionally clean and ships every promised E-E-A-T artifact: named-author byline on guides, /about#author block, AI-disclosure §8 on /methodology, and 38 hand-written Wave-1 pair intros. Two voice-rule slips exist in newly-authored copy (an em-dash in the AboutPage author header and an em-dash inside a JSON-LD `name` literal). No correctness, security, or accessibility blockers were found; the AdSense reviewer cannot see the JSON-LD slip, and the visible AboutPage slip is a single occurrence that can be fixed in one edit. The 38 pair intros, the AI-disclosure paragraph, and all seven locale additions pass the voice and originality checks.

## Findings

### Critical

None.

### Warnings

- `src/pages/legal/AboutPage.jsx:99` | New body-copy line uses an em-dash: `<strong>{AUTHORS['lucas-azevedo-souza'].name}</strong> — {AUTHORS['lucas-azevedo-souza'].jobTitle}`. Phase 1 introduced this line; CLAUDE.md voice rules forbid em-dashes in newly added body text. | Replace `—` with a colon: `<strong>{AUTHORS['lucas-azevedo-souza'].name}</strong>: {AUTHORS['lucas-azevedo-souza'].jobTitle}` (or split into two sentences). Single-line fix.
- `src/seo/StructuredData.jsx:102` | `FinancialProductSchema` ships `name: 'About Currency — Free Currency Converter'` — em-dash inside the JSON-LD literal. Not visible body copy, but it is project-authored prose added in Phase 1 and is reproduced verbatim in Google's Rich Results panel. | Replace with a hyphen-spaced ASCII dash or restructure: `'About Currency: Free Currency Converter'`. Treat as low-severity since the byte does not surface in the page DOM.

### Info / Nits

- `src/components/BylineMeta/BylineMeta.jsx:23` | `<Link to="/about#author">` — react-router-dom v7 navigates to `/about` but does not auto-scroll to the `#author` hash anchor on its own. Visible E-E-A-T contract still holds (the byline points to the right route), but in-page anchor scrolling is only handled when the browser performs a full-document navigation. Consider a follow-up phase that wires `useEffect(() => { if (hash) scrollIntoView(...) })` on `AboutPage`, or replace with a plain `<a href="/about#author">`.
- `src/components/BylineMeta/BylineMeta.jsx:5-13` | `formatDate` builds `new Date(isoDate + 'T00:00:00')` which is parsed in the visitor's local timezone. For visitors in negative-UTC timezones at the moment the day rolls over, the visible "Last reviewed" date can shift by one calendar day vs. the ISO value used in JSON-LD. Acceptable for a reviewed-date label; flagged as a known edge case.
- `src/seo/StructuredData.jsx:44-48` | `ArticleSchema` keeps `author = 'About Currency Editorial Team'` in the signature with a `void author` no-op. The legacy prop was retained by design (per 01-02 SUMMARY's explicit pattern) so the GuidePage call site could migrate in a later wave. GuidePage is now migrated (see `GuidePage.jsx:93-100`), so this prop and the `void` statement can be removed in a small follow-up clean-up commit. Not a bug, just dead code.
- `src/pages/legal/AboutPage.jsx:99-105` | Consumer reads `AUTHORS['lucas-azevedo-souza']` directly via the object literal instead of calling `getAuthor('lucas-azevedo-souza')`. `BylineMeta` and `ArticleSchema` use `getAuthor`; AboutPage uses the bare lookup. Both resolve to the same record, but a single canonical accessor (`getAuthor`) would prevent drift if a future guard or fallback is added. Nit, not a bug.
- `src/pages/CurrencyPairPage.jsx:211` | Intro is gated on `pairIntro && ...` (truthiness) rather than on `indexable`. Today this is safe because all 38 keys in `PAIR_PROFILES` correspond to indexable pairs (POPULAR_PAIRS + reverses are always inside `indexedSet`), so the intro cannot leak onto a `noindex` page. If a future wave adds a non-indexable key to `PAIR_PROFILES`, the gate becomes incorrect. Defensive fix: change to `{indexable && pairIntro && ...}`.
- `src/content/pairProfiles.js` | All 38 keys present, sorted by direction. No em-dashes, no AI-tells, no shared 10-word verbatim sequences spot-checked. Strong work on voice consistency — every intro names a central bank, names a corridor-specific use case, and stays inside the 150–200 word band per the SUMMARY's stated discipline.
- `src/seo/StructuredData.jsx:128` | `serviceType: 'CurrencyConversion'` is correct per D-14 (schema.org has no `CurrencyConversionService` top-level type). The Service block also carries `availableLanguage` and `termsOfService` — both recommended additions per the research notes; nice.
- `src/i18n/locales/zh.js:100` / `ja.js:100` | `bylineBy: '作者'` / `'著者'` are noun labels ("Author"), not preposition equivalents of "By". The rendered surface ("作者 Lucas Azevedo Souza" / "著者 Lucas Azevedo Souza") is idiomatic Chinese/Japanese for author bylines, so this is not a defect — flagging only because the i18n contract is technically a literal translation drift from the English preposition. No fix recommended.

## Per-file notes

### src/components/BylineMeta/BylineMeta.jsx

Looks good. Presentational pattern is correctly applied: no `useI18n` import, labels and `lang` taken as props, defensive `null` return when `getAuthor` misses. Uses `aria-hidden` on visual separators correctly. Only nits flagged in Info.

### src/components/BylineMeta/BylineMeta.css

Looks good. Uses existing CSS tokens (`--color-text-secondary`, `--color-text-primary`, `--color-primary`, `--color-text-muted`) — no hardcoded hex. BEM naming matches project convention. `:focus-visible` ring is correctly styled with outline + offset + border-radius. Dark-mode parity comes automatically from the token system.

### src/content/authors.js

Looks good. Person record has `@type`, `name`, `jobTitle`, `url` (= `/about#author`), `description`, `bio`, `knowsAbout`, `external`. No `image` (D-04 enforced), no `sameAs` array (D-02 enforced). External LinkedIn URL is HTTPS. Bio is 96 words, well inside the 80–120 budget. `getAuthor` returns `null` on miss — safe.

### src/content/guides.js

Looks good for Phase 1 changes. All 16 guides have `published`, `updated`, and `authorSlug: 'lucas-azevedo-souza'`. Inline node check confirms `published <= updated` on every entry (all equal at the floor). Em-dashes in body text are pre-existing (the file was not migrated in this phase), so they do not count against Phase 1's voice budget.

### src/content/pairProfiles.js

Looks good. 38 keys; all keyed as uppercase `${FROM}-${TO}`. `getPairIntro` normalizes case and returns `null` on miss. Zero em-dashes, zero AI-tells. Spot-check verdicts in the dedicated section below.

### src/i18n/locales/de.js

Looks good. `bylineBy: 'Von'`, `bylineLastReviewed: 'Zuletzt geprüft:'`, `bylineMinRead: 'Min. Lesezeit'` — all idiomatic German.

### src/i18n/locales/en.js

Looks good. Three new keys present at lines 100–102. Matches the contract.

### src/i18n/locales/es.js

Looks good. `Por` / `Última revisión:` / `min de lectura` — idiomatic.

### src/i18n/locales/fr.js

Looks good. `Par` / `Dernière révision :` / `min de lecture` — note the non-breaking-space convention before the French colon, which is correct.

### src/i18n/locales/ja.js

Looks good. `著者` / `最終確認：` / `分で読了` — idiomatic. See Info note about the "by" label rendering as a noun.

### src/i18n/locales/pt.js

Looks good. `Por` / `Última revisão:` / `min de leitura` — idiomatic.

### src/i18n/locales/zh.js

Looks good. `作者` / `最近审核：` / `分钟阅读` — idiomatic. Full-width colon (`：`) used in the Chinese/Japanese variants, ASCII colon used elsewhere — correct typographic convention.

### src/pages/CurrencyPairPage.jsx

Looks good. `CurrencyConversionServiceSchema` mounted adjacent to `CurrencyPairSchema`, both gated on `indexable`. `pairIntro` rendered as a single `<p>` above the templated h2. `getPairIntro` returns `null` for non-Wave-1 pairs, so non-indexable and Wave-2 pages render unchanged. Defensive-gate suggestion in Info.

### src/pages/HomePage.jsx

Looks good. `FinancialProductSchema` mounted exactly once next to `BreadcrumbSchema`. No prop drift. Existing converter, AdSlot, FAQ, RateDisclaimer all untouched.

### src/pages/guides/GuidePage.jsx

Looks good. `BylineMeta` mounted in the article header with all four i18n labels and `lang` threaded through. `ArticleSchema` call site updated to `datePublished={guide.published}` + `dateModified={guide.updated}` + `authorSlug={guide.authorSlug}`. Hooks order is correct; `useI18n` is called unconditionally before the guide-not-found branch. Reading-minutes still surfaces via `guide.readingMinutes`.

### src/pages/legal/AboutPage.jsx

Mostly good. "Who We Are" replaced with the `#author` section as required by D-05. External LinkedIn link carries `rel="noopener noreferrer"`. Author bio + expertise + contact path all present. Warning: em-dash on line 99 (see Findings).

### src/pages/legal/MethodologyPage.jsx

Looks good. §8 "Use of AI tools in content creation" inserted between §7 and the renumbered §9. The 122-word paragraph names the AI workflow, names the human review step, names the accountable editor, and clarifies that AI is not used for rates or conversion math. Zero em-dashes, zero AI-tells in the new section specifically. Section renumbering (§8→§9, §9→§10, §10→§11) is consistent throughout the file.

### src/pages/pages.css

Looks good. New `.seo-content__intro` rule uses existing tokens (`--color-text-primary`), no hardcoded color. Font size and line-height differentiate the intro from the templated body below. BEM naming matches the existing `.seo-content` block.

### src/seo/StructuredData.jsx

Mostly good. `ArticleSchema` correctly emits Person author with `name` and `url` (= `/about#author`). Publisher stays as Organization. `FinancialProductSchema` and `CurrencyConversionServiceSchema` are new named exports following the established Helmet pattern. `JSON.stringify` is used in every emitter — no XSS surface. Warning: em-dash inside `FinancialProductSchema.name`. Info: dead `void author` line can be removed now that GuidePage migrated.

## Phase-1 contract checks

- [x] `getAuthor('lucas-azevedo-souza')` consistent across StructuredData / BylineMeta / AboutPage — all three resolve to the same record. AboutPage uses the bare object lookup `AUTHORS['lucas-azevedo-souza']` instead of `getAuthor`, but the resolved object is identical. Nit only.
- [x] `guide.published <= guide.updated` for all 16 guides — confirmed by `awk` check; every entry has `published == updated` at the D-15 floor.
- [x] `guide.authorSlug` set on all 16 guides — confirmed; every entry carries `authorSlug: 'lucas-azevedo-souza'`.
- [x] 38 pair intros gated by isIndexablePair — gated transitively, since every key in `PAIR_PROFILES` is in `POPULAR_PAIRS` (forward or reverse) and `isIndexablePair` includes every POPULAR_PAIRS entry plus reverses by construction. Defensive-gate nit in Info.
- [x] All 7 locales have the three byline keys — confirmed (`bylineBy`, `bylineLastReviewed`, `bylineMinRead` present in en, pt, es, fr, de, zh, ja).
- [ ] No em-dashes added to body copy by Phase 1 commits — fails: AboutPage.jsx line 99 (visible body), StructuredData.jsx line 102 (JSON-LD literal). Two slips total.
- [x] No AI-tells in pair intros or AI-disclosure — confirmed; grep for "passionate", "dedicated", "fast-paced", "today's fast", "modern era", "in conclusion" against pairProfiles.js + MethodologyPage.jsx + AboutPage.jsx + authors.js returns zero matches.
- [x] External author link has rel="noopener noreferrer" — confirmed at AboutPage.jsx line 104.

## Voice spot-check (pair intros)

- **AUD-BRL**: "Australian visitors to Brazil, Australian importers of Brazilian commodities, and the Australian wing of the Brazilian football and music community all rely on AUD-BRL for cross-currency conversions." — sentence-case, named-bank later in paragraph, original and corridor-specific. Voice OK.
- **CHF-USD**: "Swiss residents planning a US trip, Swiss companies invoicing American customers, and Swiss-based asset managers settling positions in US securities all begin with the CHF-USD direction." — clean opener, names SNB and Fed in body, no em-dashes. Voice OK.
- **EUR-GBP**: "Cross-channel trade between the United Kingdom and the European Union runs through EUR-GBP in volumes worth hundreds of billions a year." — concrete framing, no AI-tells, names ECB and BoE. Voice OK.
- **USD-INR**: "Driven by one of the world's largest remittance corridors, USD-INR moves billions of dollars from US-based Indian diaspora workers back to families across the Indian subcontinent every quarter." — strong corridor-specific framing, names RBI and Fed, original use case. Voice OK.
- **JPY-BRL**: "Reflecting the deep ties between the Japanese-Brazilian community and the Japanese diaspora in São Paulo, JPY-BRL is one of the most culturally significant cross-rates for Brazil despite its modest traded volume." — culturally specific opener, names BoJ and BCB, no AI-tells. Voice OK.

All five spot-checks pass voice and originality.

## Conclusion

Ship-ready with one trivial cleanup advised before merge: replace the em-dash on `AboutPage.jsx:99` with a colon (or restructure the line) to bring the visible /about author header back inside the project's voice rule. The JSON-LD em-dash on `StructuredData.jsx:102` is invisible to readers but reproduced in Rich Results — fix at the same time. Both edits are one-character changes. After those two fixes, Phase 1 closes clean against every EEAT requirement and the 8-point Phase-1 contract checklist, with zero correctness, security, accessibility, or i18n blockers. The legacy `void author` line in `ArticleSchema` is dead code now that `GuidePage` is migrated and can be removed in a follow-up commit at the author's leisure.
