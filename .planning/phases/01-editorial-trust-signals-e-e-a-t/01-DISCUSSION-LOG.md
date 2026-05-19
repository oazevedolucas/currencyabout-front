# Phase 1: Editorial trust signals (E-E-A-T) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-19
**Phase:** 1-editorial-trust-signals-e-e-a-t
**Areas discussed:** Byline identity & bio, Author hub placement, Pair-page editorial uniqueness, Schema + dates + AI-disclosure surface

---

## Byline identity & bio

### Q1 — Public byline name

| Option | Description | Selected |
|--------|-------------|----------|
| Use the project owner's full real name | Reviewer's gold standard for YMYL finance. Strongest reviewer signal. | ✓ |
| First name + initial (e.g., "Caio M.") | Softer privacy posture; less indexable. May be discounted by strict reviewers. | |
| Full real name + team supporting byline | Primary byline + "Reviewed by editorial" line. Useful if more reviewers join later. | |

**User's choice:** Full real name. Exact string deferred to plan-phase (user will edit `authors.js` directly).
**Notes:** No invented persona; no group "Editorial Desk".

### Q2 — Bio link target

| Option | Description | Selected |
|--------|-------------|----------|
| Author block on /about (extension of existing page) | Lowest-risk during review; no new route or sitemap change. | ✓ |
| External profile (LinkedIn / personal site / GitHub) | Strongest "real person" signal but introduces external dependency. | |
| Both — internal /about block + external `sameAs` in JSON-LD | Strongest combined signal. Slightly more effort. | |

**User's choice:** Internal `/about` only.
**Notes:** External `sameAs` deferred — can be added later without restructuring.

### Q3 — Bio depth

| Option | Description | Selected |
|--------|-------------|----------|
| Short bio (~80–120 words) + expertise statement + 1 link | Calibrated for the sprint timeline; matches existing /about voice. | ✓ |
| Medium bio (~200–300 words) + 2–3 links + role | Stronger signal; longer write. | |
| Full author-hub style (~400+ words) | Investopedia-style depth; high authoring effort, risk of overclaim. | |

**User's choice:** Short bio.

### Q4 — Portrait

| Option | Description | Selected |
|--------|-------------|----------|
| No portrait — text byline only | Simplest; valid Person JSON-LD without `image`. | ✓ |
| Yes — small portrait + Person JSON-LD `image` | Real-person visual signal; needs a real photo. | |
| Defer to a later phase | Drop a file in public/ and update authors.js later. | |

**User's choice:** No portrait.

---

## Author hub placement

### Q5 — Block placement within /about

| Option | Description | Selected |
|--------|-------------|----------|
| Replace existing "Who We Are" section with named-author block | Avoids contradiction with the new named byline. | ✓ |
| Add new section, keep "Who We Are" | Additive but risks reviewer noticing "small team" vs single named owner contradiction. | |
| Rewrite "Who We Are" as "About the author" with owner as the lead | Most coherent narrative; slightly more rewriting. | |

**User's choice:** Replace "Who We Are".

### Q6 — Anchor target

| Option | Description | Selected |
|--------|-------------|----------|
| Hash anchor: /about#author | Standard pattern; no new route; browser scrolls to heading. | ✓ |
| Plain /about page (no anchor) | Reader scrolls manually; weaker structured-data url. | |
| Dedicated /about/author or similar sub-route | Adds a new route — contradicts the no-new-routes decision. | |

**User's choice:** `/about#author` for both visible link and Person JSON-LD `url`.

### Q7 — Byline reach

| Option | Description | Selected |
|--------|-------------|----------|
| Guides only | Cleanest scope; matches roadmap default. | ✓ |
| Guides + /methodology | Reinforces named accountability on standards page. | |
| Guides + /methodology + indexable pair pages | Most reviewer-visible signal; risks reading as inflated. | |

**User's choice:** Guides only.

### Q8 — Author field shape in guides.js

| Option | Description | Selected |
|--------|-------------|----------|
| Per-guide `authorSlug` field referencing authors.js | Future-proof: guest contributors add a row. | ✓ |
| Global default, no per-guide field | Simpler but fragile if a co-author/guest ever joins. | |
| Per-guide inline `author` object | Maximally flexible but duplicates the same record 16 times. | |

**User's choice:** `authorSlug` field with lookup into `authors.js`.

---

## Pair-page editorial uniqueness

### Q9 — Delivery approach for ≥150 pair-specific words

| Option | Description | Selected |
|--------|-------------|----------|
| Per-pair intro in new src/content/pairProfiles.js, rendered above templated block | Most leverage per hour; templated copy stays. | ✓ |
| Tighten the indexed set first — noindex everything except popular pairs | Smaller surface; faster write; loses long-tail SEO. | |
| Both — tighten the index AND write per-pair intros | Most aggressive; risk of structural change mid-review (Pitfall 2). | |

**User's choice:** New `pairProfiles.js`.

### Q10 — Entry shape

| Option | Description | Selected |
|--------|-------------|----------|
| Single ~150–200 word intro paragraph per pair | Minimum to clear EEAT-07; lowest authoring effort. | ✓ |
| Structured fields {intro, dominantFlow, rateDrivers, historicalNote} | Easier to vary across pairs; slightly more effort. | |
| Full per-pair short article (~300–400 words) | Most authoritative; ~25k words across the indexed set; too heavy for this sprint. | |

**User's choice:** Single 150–200 word intro paragraph.

### Q11 — Coverage strategy

| Option | Description | Selected |
|--------|-------------|----------|
| noindex any indexable pair without a written intro | Safest reviewer signal; possibly delays phase merge. | |
| Ship in waves — top ~20 first, remaining waves after | Faster initial ship; wave-gap leaves some pairs thin. | ✓ |
| Auto-fallback — assembled mix of fromProfile + toProfile + rate context | Avoids noindex churn but may still read as templated. | |

**User's choice:** Ship in waves.
**Notes:** Tradeoff explicitly accepted and flagged for planning (D-11 in CONTEXT.md). Planning must decide whether wave 2 ships inside Phase 1 or as Phase 1.5.

### Q12 — Wave 1 scope

| Option | Description | Selected |
|--------|-------------|----------|
| POPULAR_PAIRS (20) + their reverses ≈ 40 pairs | Matches existing curated list; reverses written together. | ✓ |
| POPULAR_PAIRS only (20 pairs) | Half the surface; reverses thin until wave 2. | |
| Hand-picked top-10 highest-traffic list | Smallest wave 1; riskiest for EEAT-07. | |

**User's choice:** POPULAR_PAIRS + reverses.

---

## Schema + dates + AI-disclosure surface

### Q13 — ArticleSchema author shape

| Option | Description | Selected |
|--------|-------------|----------|
| author = Person {name, url: /about#author}; publisher stays Organization | Matches byline + hub decisions; minimum reviewer-acceptable Person record. | ✓ |
| author = Person + sameAs array referencing external profile | Strongest signal; conflicts with "no external profile this phase" choice. | |
| author = array of [Person (writer), Person (reviewer)] | Premature with one named person. | |

**User's choice:** Person with internal `/about#author` url; no sameAs.

### Q14 — Service schema on home and indexable pairs (EEAT-06)

| Option | Description | Selected |
|--------|-------------|----------|
| Home: WebApplication (existing) + new FinancialProduct; Pairs: keep ExchangeRateSpecification + add Service serviceType=CurrencyConversion | Cleanest mapping to schema.org; two distinct emissions. | ✓ |
| FinancialProduct on both home and pairs | Single schema type; less precise. | |
| CurrencyConversionService on both | Most specific use-case but not a top-level schema.org type. | |

**User's choice:** Split — FinancialProduct on home, Service(serviceType=CurrencyConversion) on indexable pairs.

### Q15 — Dates on guides

| Option | Description | Selected |
|--------|-------------|----------|
| Add `published` field; existing `updated` is reviewed/modified; visible meta = "Last reviewed: YYYY-MM-DD" only | Clean reviewer signal; backfill `published` once. | ✓ |
| Add `published`; visible meta shows both Published and Last reviewed | Maximum transparency; heavier meta line. | |
| Keep single `updated`; schema sets datePublished=dateModified=updated; visible "Updated X" stays | Smallest change; weakest signal (dates identical). | |

**User's choice:** Add `published`; visible label switches to "Last reviewed".

### Q16 — AI-disclosure surface

| Option | Description | Selected |
|--------|-------------|----------|
| /methodology only — dedicated section near editorial-process block | One canonical location; standard publisher pattern. | ✓ |
| /methodology + small one-liner in guide footer | Doubles touchpoint; risks misreading as "AI-generated content". | |
| /methodology + /about + guide footer | Three surfaces; risks reading as performative. | |

**User's choice:** `/methodology` only.

---

## Claude's Discretion

- Exact bio prose for the `/about` author block (within ~80–120 word budget, expertise statement, 1 external link slot).
- Exact wording of the AI-disclosure paragraph in `/methodology` (subject to user review before merge).
- Per-pair intro prose for the ~40 wave-1 pairs (subject to user review before merge).
- Whether `<BylineMeta>` is a flat byline strip or expands into a small inline author card on guides — planning to propose, user to approve.
- Minimal-vs-extended JSON-LD field set on `FinancialProduct` and the new pair-page `Service` block, beyond the required properties.

## Deferred Ideas

- External `sameAs` URLs in Person JSON-LD (LinkedIn / personal site / prior pubs).
- Author portrait + Person JSON-LD `image`.
- `reviewedBy` field on guides (P2 from research SUMMARY).
- `FAQPage` JSON-LD where the `<FAQ>` component already mounts (P2 from research SUMMARY).
- Internal linking audit — every page links to ≥2 contextual guides/pair pages (P2).
- Pair-page editorial wave 2+ for the ~30 major-major crosses (Phase 1.5 vs in-Phase-1 — planning to decide).
- Byline on `/methodology` or on pair pages (declined this phase).
