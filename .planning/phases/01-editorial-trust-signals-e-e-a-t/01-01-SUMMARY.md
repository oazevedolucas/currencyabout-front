---
phase: 01-editorial-trust-signals-e-e-a-t
plan: 01
subsystem: content-and-seo

tags: [authors, byline, person-jsonld, i18n, e-e-a-t, adsense]

# Dependency graph
requires: []
provides:
  - src/content/authors.js (AUTHORS + getAuthor — Person record keyed by 'lucas-azevedo-souza')
  - src/components/BylineMeta/BylineMeta.jsx (presentational byline strip)
  - i18n keys bylineBy / bylineLastReviewed / bylineMinRead in all 7 locales
  - /about#author anchor with substantive named-author block
affects: [01-02-structured-data, 01-03-editorial-uniformity]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Plain-JS data module + finder function (AUTHORS object + getAuthor) mirroring src/content/guides.js"
    - "Presentational i18n: lang and label strings passed as props instead of useI18n inside the component"
    - "BEM kebab-case CSS co-located with component, reusing existing CSS tokens"

key-files:
  created:
    - src/content/authors.js
    - src/components/BylineMeta/BylineMeta.jsx
    - src/components/BylineMeta/BylineMeta.css
  modified:
    - src/pages/legal/AboutPage.jsx
    - src/i18n/locales/en.js
    - src/i18n/locales/pt.js
    - src/i18n/locales/es.js
    - src/i18n/locales/fr.js
    - src/i18n/locales/de.js
    - src/i18n/locales/zh.js
    - src/i18n/locales/ja.js

key-decisions:
  - "Author slug = 'lucas-azevedo-souza' (orchestrator-supplied). Plan template used 'owner' as illustrative; downstream consumers (plan 01-02, 01-03) must reference AUTHORS['lucas-azevedo-souza'] or getAuthor('lucas-azevedo-souza')."
  - "About-page heading reads 'About the author' (Claude's discretion per Task 5) — section-style heading rather than personal byline-style, keeping the page semantically scannable."
  - "knowsAbout includes Foreign exchange, Currency markets, International payments, Consumer finance, Software engineering — supported by the user-supplied bio."
  - "BylineMeta receives byLabel/reviewedLabel/readingLabel as props (added beyond the minimum spec) so no English literals leak into the component — fully i18n-driven."

patterns-established:
  - "Author records: keyed by stable hyphenated slug, '@type' literal Person, expertise statement in description, prose paragraph in bio, single external link with rel-safe markup."
  - "Locale string contract: new user-facing labels added to all 7 locales together in the same commit, grouped above the currencies block."

requirements-completed:
  - EEAT-01
  - EEAT-03
---

# Phase 01-01: Named-author data model, BylineMeta component, and /about#author block

**Author record keyed by lucas-azevedo-souza now drives a presentational BylineMeta strip and a substantive /about#author block that replaces the contradictory "Who We Are" copy.**

## Performance

- **Tasks:** 5 (Task 1 resolved out-of-band by the orchestrator; Tasks 2–5 executed here)
- **Commits:** 4 atomic + this SUMMARY commit
- **Files created:** 3 (authors.js, BylineMeta.jsx, BylineMeta.css)
- **Files modified:** 8 (AboutPage.jsx + 7 locale files)
- **npm run build:** PASSED on every commit

## Accomplishments

- Canonical `AUTHORS` Person record at `src/content/authors.js` keyed by `lucas-azevedo-souza`, with `@type`, `name`, `jobTitle`, `url` (= `https://currencyabout.com/about#author`), `description`, `bio`, `knowsAbout` (5 topics), and `external` link — no `image`, no `sameAs` (D-02, D-04 enforced).
- `<BylineMeta>` flat-strip component, fully presentational: name links to `/about#author`, lang + label strings (`byLabel`, `reviewedLabel`, `readingLabel`) passed as props, graceful `null` return when `getAuthor` misses. BEM CSS with `:focus-visible` ring on the link.
- `bylineBy`, `bylineLastReviewed`, `bylineMinRead` keys added to all 7 locale files (en, pt, es, fr, de, zh, ja) — plan 01-03 can wire `GuidePage.jsx` without a missing-key window.
- `/about` "Who We Are" section replaced with a named-author block anchored at `id="author"`: bio paragraph, expertise statement + external LinkedIn link (rel="noopener noreferrer"), and the preserved contact path. Other /about sections untouched.

## Task Commits

1. **Task 2: authors.js Person record** — `f2c24cc` (feat)
2. **Task 3: BylineMeta component + CSS** — `adfad29` (feat)
3. **Task 4: bylineBy/bylineLastReviewed/bylineMinRead in 7 locales** — `7eb1bb8` (i18n)
4. **Task 5: replace Who We Are with #author block** — `a9f9aaf` (refactor)

## Files Created/Modified

- `src/content/authors.js` — canonical Person record + `getAuthor` finder (new)
- `src/components/BylineMeta/BylineMeta.jsx` — flat byline strip, presentational (new)
- `src/components/BylineMeta/BylineMeta.css` — BEM CSS with focus-visible state (new)
- `src/pages/legal/AboutPage.jsx` — Who-We-Are section replaced with named-author block at `id="author"`
- `src/i18n/locales/{en,pt,es,fr,de,zh,ja}.js` — three new top-level i18n keys

## Decisions Made

- **Author slug = `lucas-azevedo-souza`** (orchestrator-supplied, not `owner` as the plan template illustrated). This is the stable export key downstream plans must reference.
- **/about heading: "About the author"** — Claude's discretion per Task 5; section-name heading keeps the page semantically scannable. Plan offered "{name}" as an alternative; the section-name option was chosen.
- **BylineMeta receives `byLabel` as a prop**, not as a hardcoded "By " literal — strengthens the i18n contract beyond the minimum and lets the component render correctly under all 7 locales without modification.
- **knowsAbout topics**: included `Consumer finance` and `Software engineering` (Task 2 allowed 1–2 additions beyond the 3 minimums) because the user-supplied bio explicitly supports both: NBC/C6 Bank billing pipelines (consumer finance) and Equifax APIs / AWS / GCP (software engineering).

## Deviations from Plan

1. **Author key is `lucas-azevedo-souza`, not `owner`.** The plan's acceptance criteria use `AUTHORS.owner.bio` etc.; this was rewritten in the actual code as `AUTHORS['lucas-azevedo-souza'].bio` per orchestrator instruction. All acceptance-criterion intent is satisfied — the named-author lookup, the JSON-LD-ready record, and the /about block all use the orchestrator-mandated key. Plans 01-02 and 01-03 must import `AUTHORS['lucas-azevedo-souza']` or call `getAuthor('lucas-azevedo-souza')` rather than `AUTHORS.owner`.
2. **Bio word count is 96 (orchestrator said 95)** and **expertise statement is 23 words (orchestrator said 24)** — exact text was kept verbatim per the resume input; the differences come from word-split conventions (hyphens, abbreviations). Both stay well within D-03's 80–120 word bio target and Task 1's <40 word expertise constraint.

**Total deviations:** 2 — both required by the orchestrator's resume payload; neither changes plan semantics or any visible contract.

## Issues Encountered

None. Each task built clean on the first attempt.

## User Setup Required

None.

## Next Phase Readiness

- **Plan 01-02 (structured data)** can now import `AUTHORS['lucas-azevedo-souza']` (or `getAuthor('lucas-azevedo-souza')`) for the `ArticleSchema` Person author and emit `url = 'https://currencyabout.com/about#author'`. The record already carries `@type: 'Person'` so the JSON-LD emitter does not need to invent it.
- **Plan 01-03 (editorial uniformity)** can now mount `<BylineMeta>` inside `GuidePage.jsx` with `byLabel={t.bylineBy} reviewedLabel={t.bylineLastReviewed} readingLabel={t.bylineMinRead}` — all three keys exist in every locale. Per-guide `authorSlug` field in `guides.js` (D-08) is still TODO in plan 01-03 itself.
- **/about#author target exists** — the visible byline link in plan 01-03 will not point to a 404.

---
*Phase: 01-editorial-trust-signals-e-e-a-t*
*Plan: 01-01*
*Completed: 2026-05-19*
