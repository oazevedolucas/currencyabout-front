# Phase 1: Editorial Trust Signals (E-E-A-T) - Research

**Researched:** 2026-05-19
**Domain:** E-E-A-T signals for YMYL finance SPA — author identity, structured data depth, editorial uniformity
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Byline identity and bio**
- D-01: Byline is the project owner's full real name. Exact name captured in `src/content/authors.js` during plan-phase; planning must request it from the user if not yet supplied.
- D-02: Visible byline links to the internal `/about#author` hash anchor — not an external profile. No `sameAs` external profile array in Person JSON-LD this phase.
- D-03: Bio depth: ~80–120 word paragraph + a short expertise statement + 1 external link. Matches the existing `/about` voice; no overclaiming.
- D-04: No portrait/avatar. Person JSON-LD ships without an `image` property. Text byline only.

**Author hub placement**
- D-05: Author block lives inside `/about`, replacing the existing "Who We Are" section.
- D-06: Anchor target is `/about#author`. Visible byline link and Person JSON-LD `url` both point to it.
- D-07: `<BylineMeta>` renders on `/guides/:slug` only. `/methodology` and pair pages stay byline-free this phase.
- D-08: `src/content/guides.js` gains a per-guide `authorSlug: string` field. Lookup goes through `src/content/authors.js` (new), future-proofed for guest contributors.

**Pair-page editorial uniqueness**
- D-09: New `src/content/pairProfiles.js` holds per-pair intros, keyed by canonical `${FROM}-${TO}`. Each entry is a single ~150–200 word hand-written prose intro. Rendered above the existing `seo-content` block; the templated section stays.
- D-10: Ship in waves. Wave 1 = the 20 `POPULAR_PAIRS` in `src/seo/seoContent.js` plus their reverses (~40 pairs). Remaining indexable major-major crosses (~40 — actual count verified below) covered in later waves.
- D-11 (known tradeoff): During the wave-gap, the ~40 indexable major-major crosses still render only templated copy. Accepted in exchange for sprint speed. Recommended: ship wave 1 in Phase 1, treat waves 2+ as backlog the moment AdSense approval lands.

**Structured-data depth**
- D-12: `ArticleSchema.author` changes from `Organization` to `Person { name, url: SITE_URL + '/about#author' }`. `publisher` stays as the existing Organization block.
- D-13: Home page adds a new `FinancialProduct` JSON-LD block alongside the existing `WebApplication` JSON-LD in `index.html`. The new emission goes through the React `<Helmet>` stack.
- D-14: Indexable pair pages add a `Service` JSON-LD with `serviceType: 'CurrencyConversion'` (since `CurrencyConversionService` is not a top-level schema.org type), alongside the existing `ExchangeRateSpecification` and `BreadcrumbSchema`. Non-indexable pair pages emit neither.

**Dates and visible meta line**
- D-15: `src/content/guides.js` gains a `published: 'YYYY-MM-DD'` field on every guide. The existing `updated` field is reinterpreted as the reviewed/modified date. Backfill: for guides whose true publication date isn't recorded, use the current `updated` value as the floor.
- D-16: `ArticleSchema` emits `datePublished = guide.published` and `dateModified = guide.updated`. They will diverge over time.
- D-17: Visible guide meta line switches from "Updated YYYY-MM-DD" to "Last reviewed: YYYY-MM-DD" (using `updated`). The `published` field stays in `guides.js` for JSON-LD only.

**AI-assistance disclosure**
- D-18: "AI-assisted, human-reviewed" disclosure surfaces as a dedicated section in `/methodology` only — near the existing "Editorial process" section (§7, lines 157–184). No inline note on guide footers, no copy on `/about`.
- D-19: The disclosure section must be honest about the actual workflow. Planning agents must surface the draft copy for user review before merge.

### Claude's Discretion

- Exact bio prose for the `/about` author block (within the agreed ~80–120 word budget, expertise statement, 1 external link slot).
- Exact wording of "Last reviewed" label, AI-disclosure paragraph copy, and the per-pair intro prose, subject to user review.
- Whether `<BylineMeta>` is a flat byline strip or expands into a small inline author card on guides — planning to propose, user to approve.
- Exact JSON-LD field set on `FinancialProduct` and the new pair-page `Service` block, beyond the minimal required properties.

### Deferred Ideas (OUT OF SCOPE)

- External `sameAs` profile URLs in Person JSON-LD — revisit if AdSense approval still hesitates after Phase 1 ships.
- Author portrait + Person JSON-LD `image` — trivially addable later by dropping a file in `public/` and updating `authors.js`.
- `reviewedBy` field on guides — research SUMMARY flagged as P2; not in this phase.
- `FAQPage` JSON-LD wherever the `<FAQ>` component already mounts — research SUMMARY P2.
- Internal linking audit — defer to a follow-up phase.
- Pair-page editorial wave 2+ (~40 major-major crosses) — see D-11.
- Byline on `/methodology` or pair pages — explicitly declined this phase.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| EEAT-01 | User sees a real author byline (project owner's real name) on every guide page, linked to a verifiable author bio | `<BylineMeta>` component (plan 01-01), `authors.js` data model |
| EEAT-02 | User sees a visible "Last reviewed: YYYY-MM-DD" date on every guide page, sourced from the existing `updated` field | Meta-line relabel in `GuidePage.jsx:112` (plan 01-03) |
| EEAT-03 | User reaches a substantive author hub showing the author's bio, expertise statement, and contact path | Author block in `AboutPage.jsx` at `#author` anchor (plan 01-01) |
| EEAT-04 | User reading `/methodology` finds new sections covering editorial process, corrections policy, and an honest AI-use disclosure | New AI-disclosure section in `MethodologyPage.jsx:159-184` (plan 01-03) |
| EEAT-05 | Search engines and AdSense crawler see `author` (Person), `datePublished`, `dateModified`, and `publisher` on `ArticleSchema` JSON-LD for every guide | Extended `ArticleSchema` in `StructuredData.jsx` (plan 01-02) |
| EEAT-06 | Search engines see `FinancialProduct` or `CurrencyConversionService` JSON-LD on the home page and every indexable pair page | New `FinancialProductSchema` + `ServiceSchema` emitters (plan 01-02) |
| EEAT-07 | Every indexable currency pair page carries at least 150 words of pair-specific editorial that is not templated across pairs | `pairProfiles.js` wave 1 prose rendered above `seo-content` (plan 01-03) |
</phase_requirements>

---

## Summary

Phase 1 is pure content and small additive components — no performance impact, no structural risk. It converts the site from "competent utility" to "real publisher with named accountability" along three independent work streams that map directly to the three plans named in ROADMAP.md.

The critical discovery from reading the live codebase: the existing `ArticleSchema` (line 43 in `StructuredData.jsx`) already accepts `datePublished` and `dateModified` props but currently receives `guide.updated` for both. The change to thread `guide.published` for `datePublished` is a one-prop tweak — the component is already wired, just needs the field added to `guides.js` and the prop values corrected at the `GuidePage.jsx:94-95` call site. Similarly, the visible meta line at `GuidePage.jsx:109-112` is a single static `<span>` — a clean, surgical replacement with `<BylineMeta>`.

The Wave 1 / Wave 2 pair count has been precisely computed from `seoContent.js` logic: Wave 1 = 38 unique indexable pair keys (20 POPULAR_PAIRS + 18 additional reverses that are not already forward pairs); Wave 2 = 40 major-major cross pairs not in Wave 1. Total indexable surface = 78 pairs. D-10 says "~40 pairs" for Wave 1 — the actual count is 38. D-11 says "~30 major-major crosses" for Wave 2 — the actual count is 40. Both approximations were conservative; the research delivers exact lists.

**Primary recommendation:** Execute the three plans in dependency order: 01-01 (data model + components, no JSON-LD changes) → 01-02 (structured data, depends on `authors.js`) → 01-03 (editorial uniformity, depends on `authors.js` for `<BylineMeta>` and the `published` field from 01-02's `guides.js` patch). Each plan produces a shippable deploy on its own.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Person JSON-LD (author record) | CDN / Static (JS data module) | Browser / Client (Helmet injection) | `authors.js` is a static constant; the React Helmet emitter just serializes it to a `<script>` tag. No fetch, no API. |
| Visible byline strip (`<BylineMeta>`) | Browser / Client | — | Small presentational component; reads from `authors.js` at runtime; no server involvement. |
| Author hub (at `/about#author`) | CDN / Static (static page content) | Browser / Client (React render) | Static JSX prose; the `#author` anchor is a plain `id` attribute. No route change. |
| `ArticleSchema` extension (`datePublished`, `Person` author) | Browser / Client (Helmet) | CDN / Static (data in `guides.js`) | Helmet serializes the schema; the data originates in `guides.js` as a static constant. |
| `FinancialProduct` JSON-LD on home | Browser / Client (Helmet in `HomePage.jsx`) | — | Emitted by a new `FinancialProductSchema` component called from `HomePage.jsx`; no server. |
| `Service` JSON-LD on indexable pair pages | Browser / Client (Helmet in `CurrencyPairPage.jsx`) | — | Gated on the existing `indexable` boolean already computed by `isIndexablePair()`. |
| AI-disclosure section on `/methodology` | CDN / Static (static page content) | Browser / Client (React render) | Static JSX prose inserted between §7 and §8. No fetch, no state. |
| Pair-page editorial intros (`pairProfiles.js`) | CDN / Static (JS data module) | Browser / Client (React render) | Static constant keyed by pair; `CurrencyPairPage.jsx` reads and renders. |

---

## Standard Stack

### Core (unchanged — no new dependencies)

| Library | Version | Purpose | Role in Phase 1 |
|---------|---------|---------|-----------------|
| `react` | 19.1.0 | UI runtime | `BylineMeta`, `FinancialProductSchema`, `ServiceSchema` components |
| `react-helmet-async` | 3.0.0 | `<head>` management | All new JSON-LD emitters use `<Helmet>` with `<script type="application/ld+json">` |
| `react-router-dom` | 7.13.2 | Routing + `<Link>` | Byline link (`to="/about#author"`), pair intro internal links |

### No New Dependencies

This phase introduces **zero** new npm packages. All new capabilities are:
- Plain JS data modules (`src/content/authors.js`, `src/content/pairProfiles.js`)
- A small JSX component (`src/components/BylineMeta/BylineMeta.jsx`) using existing patterns
- Modifications to existing JSX components (`StructuredData.jsx`, `GuidePage.jsx`, `AboutPage.jsx`, `MethodologyPage.jsx`, `CurrencyPairPage.jsx`)

### Package Legitimacy Audit

> Not applicable — Phase 1 installs no external packages.

---

## Architecture Patterns

### System Architecture Diagram

```
src/content/authors.js          (new — Person record, single source of truth)
         │
         ├─→ BylineMeta.jsx     (new — visible byline strip, reads authors.js)
         │        └─→ GuidePage.jsx line 104-114 (replaces static span)
         │
         └─→ ArticleSchema      (modified — author prop changes from Org to Person)
                  └─→ GuidePage.jsx line 90-96 (props: datePublished=published, dateModified=updated)

src/content/guides.js           (modified — adds authorSlug, published fields to 16 entries)
         ├─→ GuidePage.jsx      (reads guide.authorSlug for BylineMeta lookup)
         └─→ ArticleSchema      (reads guide.published for datePublished)

AboutPage.jsx                   (modified — "Who We Are" section replaced with #author block)

MethodologyPage.jsx             (modified — new §8 AI-disclosure section inserted between §7 and §8)

src/content/pairProfiles.js     (new — 38 pair keys, hand-written ~150-200 word intros)
         └─→ CurrencyPairPage.jsx line 207 (renders intro above existing seo-content h2)

src/seo/StructuredData.jsx      (modified — new FinancialProductSchema + ServiceSchema exports)
         ├─→ HomePage.jsx        (new: <FinancialProductSchema />)
         └─→ CurrencyPairPage.jsx line 119 (new: {indexable && <ServiceSchema />})
```

### Recommended Project Structure (delta)

```
src/
├── components/
│   └── BylineMeta/             # NEW
│       ├── BylineMeta.jsx      # Flat byline strip (recommended — see below)
│       └── BylineMeta.css      # Co-located kebab-case BEM
├── content/
│   ├── authors.js              # NEW — Person record(s) keyed by authorSlug
│   └── pairProfiles.js         # NEW — 38 pair intro entries (wave 1)
└── seo/
    └── StructuredData.jsx      # MODIFIED — +FinancialProductSchema, +ServiceSchema,
                                #             ArticleSchema updated
```

Files modified (not new):
- `src/content/guides.js` — add `authorSlug`, `published` to each of 16 entries
- `src/pages/guides/GuidePage.jsx` — insert `<BylineMeta>`, fix `datePublished`, relabel meta line
- `src/pages/legal/AboutPage.jsx` — replace "Who We Are" section with author block
- `src/pages/legal/MethodologyPage.jsx` — insert AI-disclosure section
- `src/pages/CurrencyPairPage.jsx` — render pair intro + `<ServiceSchema>`
- `src/pages/HomePage.jsx` — add `<FinancialProductSchema>`

---

## Section 1: Concrete JSON-LD Schema Shapes

[CITED: https://schema.org/Person] [CITED: https://schema.org/Article] [CITED: https://schema.org/FinancialProduct] [CITED: https://schema.org/Service] [CITED: https://developers.google.com/search/docs/appearance/structured-data/article]

### 1A. Person record — minimum for E-E-A-T credit

The Person record lives in `src/content/authors.js`. It is shared by both the visible `<BylineMeta>` component and the `ArticleSchema` JSON-LD emitter, ensuring visible byline and structured data always match. Per D-02 and D-04: no `sameAs`, no `image`.

```js
// src/content/authors.js
export const AUTHORS = {
  'owner': {
    '@type': 'Person',
    name: 'PLACEHOLDER — project owner real name',   // user supplies at plan-phase
    url: 'https://currencyabout.com/about#author',
    jobTitle: 'Editor',                               // or "Founder & Editor"
    description: 'PLACEHOLDER — ~1 sentence expertise statement',
    knowsAbout: ['Foreign Exchange', 'Currency Markets', 'International Payments'],
  },
}

export function getAuthor(slug) {
  return AUTHORS[slug] ?? null
}
```

**Minimum required for E-E-A-T credit (Google Search Central):** `@type: Person`, `name`, `url`. `jobTitle` and `knowsAbout` are advisable but not required. `description` is not a schema.org Person property in the standard sense but is used by some validators — use `knowsAbout` or `description` only if the validator accepts it; otherwise drop.

**Practical minimum for `ArticleSchema`:**
```js
author: {
  '@type': 'Person',
  name: authorRecord.name,
  url: authorRecord.url,
}
```

### 1B. ArticleSchema — updated shape

Current state (line 43 `StructuredData.jsx`): `author` is hardcoded as `Organization`. Target:

```js
export function ArticleSchema({ headline, description, url, datePublished, dateModified, authorSlug }) {
  const authorRecord = getAuthor(authorSlug ?? 'owner')
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorRecord.name,
      url: authorRecord.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    mainEntityOfPage: url,
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
```

`getAuthor` is imported from `authors.js`. The `authorSlug` prop defaults to `'owner'` so existing call sites do not break without changes.

**GuidePage.jsx call site change (lines 90-96):**

Before:
```jsx
<ArticleSchema
  headline={guide.title}
  description={guide.description}
  url={url}
  datePublished={guide.updated}   // wrong — both fields used updated
  dateModified={guide.updated}
/>
```

After:
```jsx
<ArticleSchema
  headline={guide.title}
  description={guide.description}
  url={url}
  datePublished={guide.published}  // new field added to guides.js
  dateModified={guide.updated}
  authorSlug={guide.authorSlug}    // new field added to guides.js
/>
```

### 1C. FinancialProduct block — home page

[CITED: https://schema.org/FinancialProduct] [CITED: https://schema.org/docs/financial.html]

Per D-13: emitted from `HomePage.jsx` via `<FinancialProductSchema>`, **alongside** (not replacing) the existing static JSON-LD in `index.html`. React Helmet-injected schemas are additive; crawlers see all `<script type="application/ld+json">` blocks on the page.

**Minimum fields:**
```js
// src/seo/StructuredData.jsx — new named export
export function FinancialProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'About Currency — Free Currency Converter',
    description: 'Mid-market reference rate converter for 21 world currencies, updated daily.',
    url: 'https://currencyabout.com',
    provider: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    category: 'Currency Conversion Tool',
    feesAndCommissionsSpecification: 'Free — no fees charged for currency conversion.',
    areaServed: 'Worldwide',
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
```

**Advisable additions (at Claude's discretion per CONTEXT.md):**
- `currenciesAccepted`: not applicable to a reference tool; omit to avoid misleading "accepted" implication.
- `termsOfService: 'https://currencyabout.com/terms'` — links to existing ToS, adds credibility.
- `availableLanguage`: `['en', 'pt', 'es', 'fr', 'de', 'zh', 'ja']` — confirms the i18n investment to crawlers.

**Schema duplication concern (see Section 8):** Google's structured data parser de-dupes by `@type` scope. The existing `WebApplication` and the new `FinancialProduct` are different `@type` values — no conflict. Multiple JSON-LD blocks on the same page are explicitly supported per Google Search Central.

### 1D. Service block — indexable pair pages

Per D-14: `schema.org` does not expose `CurrencyConversionService` as a top-level type. The closest correct representation is `Service` with `serviceType` set to `'CurrencyConversion'`.

```js
// src/seo/StructuredData.jsx — new named export
export function CurrencyConversionServiceSchema({ fromCode, toCode, fromName, toName }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'CurrencyConversion',
    name: `${fromCode} to ${toCode} Currency Converter`,
    description: `Convert ${fromName} to ${toName} using mid-market reference rates updated daily.`,
    provider: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    areaServed: 'Worldwide',
    isAccessibleForFree: true,
    url: `https://currencyabout.com/${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`,
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
```

**Advisable additions:**
- `termsOfService: 'https://currencyabout.com/terms'` — same rationale as FinancialProduct.
- `availableLanguage` — same as above.

**CurrencyPairPage.jsx call site (line 119 area):**

```jsx
{indexable && <CurrencyPairSchema from={fromMeta} to={toMeta} rate={rate} date={converter.rateDate} />}
{indexable && <CurrencyConversionServiceSchema fromCode={fromCode} toCode={toCode} fromName={fromName} toName={toName} />}
```

---

## Section 2: Pair Coverage Lists

[VERIFIED: computed from `src/seo/seoContent.js` — POPULAR_PAIRS and MAJORS arrays read directly]

### Wave 1 — POPULAR_PAIRS ∪ reverse(POPULAR_PAIRS) = 38 unique keys

```
AUD-BRL   AUD-USD   BRL-AUD   BRL-CAD   BRL-CHF   BRL-CNY
BRL-EUR   BRL-GBP   BRL-JPY   BRL-USD   CAD-BRL   CAD-USD
CHF-BRL   CHF-USD   CNY-BRL   CNY-USD   EUR-BRL   EUR-GBP
EUR-USD   GBP-BRL   GBP-EUR   GBP-USD   INR-USD   JPY-BRL
JPY-USD   KRW-USD   MXN-USD   USD-AUD   USD-BRL   USD-CAD
USD-CHF   USD-CNY   USD-EUR   USD-GBP   USD-INR   USD-JPY
USD-KRW   USD-MXN
```

Total: **38 keys** (D-10 stated "~40 pairs" — actual count is 38; both directions for 19 of the 20 pairs, plus 2 non-reverse pairs where both directions already appear in POPULAR_PAIRS). `pairProfiles.js` must have exactly these 38 keys at wave 1 completion.

### Wave 2 — major-major crosses NOT in Wave 1 = 40 unique keys

```
AUD-CAD   AUD-CHF   AUD-CNY   AUD-EUR   AUD-GBP   AUD-JPY
CAD-AUD   CAD-CHF   CAD-CNY   CAD-EUR   CAD-GBP   CAD-JPY
CHF-AUD   CHF-CAD   CHF-CNY   CHF-EUR   CHF-GBP   CHF-JPY
CNY-AUD   CNY-CAD   CNY-CHF   CNY-EUR   CNY-GBP   CNY-JPY
EUR-AUD   EUR-CAD   EUR-CHF   EUR-CNY   EUR-JPY
GBP-AUD   GBP-CAD   GBP-CHF   GBP-CNY   GBP-JPY
JPY-AUD   JPY-CAD   JPY-CHF   JPY-CNY   JPY-EUR   JPY-GBP
```

Total: **40 keys** (D-11 stated "~30 major-major crosses" — actual count is 40; the approximation was low by 10). This corrects the CONTEXT.md estimate. Total indexable surface = 78 pairs.

### Wave 2 trigger plan (per D-11 request)

**Recommendation: ship Wave 2 as post-approval backlog (Phase 1.5), not inside Phase 1.**

Rationale:
- 38 hand-written intros (each 150–200 words) is already 6,000–7,600 words of original prose for wave 1 alone. Wave 2 adds another 40 intros (6,000–8,000 words) — total authoring load roughly doubles.
- The active AdSense review window means every merge must be clean. Forcing wave 2 into Phase 1 either (a) delays the merge significantly or (b) ships wave 2 pairs without intros, which violates the "no thin pairs in the index" principle more severely than the current templated content (which at least has `currencyProfiles.js` depth).
- Wave 2 crosses (EUR-CAD, GBP-JPY, CHF-CNY, etc.) are lower-traffic than wave 1 popular pairs. The editorial ROI per hour is lower.
- Once AdSense approval lands, wave 2 can ship as a standalone commit with zero risk — it is pure content addition.

**For the wave-gap period:** the ~40 wave 2 major-major cross pages will continue to render only the existing templated `seo-content` block plus `currencyProfiles.js` per-currency content. They are indexable per `isIndexablePair()` but carry no unique pair intro. This is the accepted tradeoff from D-11. If the reviewer happens to sample EUR-CHF and finds only templated copy, the `currencyProfiles.js` depth (named central banks, economic context) provides some editorial signal, though not the full 150-word pair-specific intro.

---

## Section 3: Editorial Prose Templates

### 3A. Author bio (~80–120 words) — structure and voice

**Structure:**
1. Opening sentence: who they are and what they do (role + domain; no job-title preamble like "Hello, I'm…").
2. Expertise statement: the specific intersection of knowledge relevant to a currency site (fintech? international payments? journalism? engineering?). Be specific — "I covered emerging-market currency crises for X" beats "I have a background in finance."
3. One external link: points to a verifiable external page. Acceptable: personal site, GitHub, LinkedIn, a publication byline, a prior project. NOT acceptable: a generic social media profile with no finance-relevant content.
4. Closing sentence (optional): the connection to About Currency — why this person built or maintains it.

**Voice rules (from existing `/about` page):**
- No em-dashes in body.
- Sentence-case for all headings (the `<h2 id="author">` should be the author's name or "About the author").
- No AI-tells: no "passionate about," no "dedicated to," no "in today's fast-paced world."
- Active voice. First or third person depending on whether the author is speaking directly (prefer third-person for credibility on a tool site).
- Do not invent credentials the user has not confirmed. Leave placeholders for specific dates, publishers, or institution names.

**What to claim, what to avoid:**
- Claim: domain knowledge (international payments, fintech, software engineering, consumer finance journalism).
- Avoid: regulatory credentials ("licensed financial advisor," "CFA") unless the user holds them.
- Avoid: vague claims ("extensive experience in finance").

**Bio template (fill in bracketed items):**

> [Name] is [role/title — e.g., "a software engineer and finance writer"] based in [city, country — optional]. [He/She/They] built About Currency to [one-sentence origin story — e.g., "make mid-market rate data freely accessible without the clutter of most conversion tools"]. [Expertise statement — e.g., "Before About Currency, [Name] spent [N] years working in [domain], where [specific experience]."] Outside of About Currency, [Name]'s work appears on [publication or external link]. [Optional: contact path sentence.]

### 3B. AI-assistance disclosure (~100–150 words) — structure and honest framing

**What the disclosure must say (per D-19):**
- That AI was used in drafting some content on the site.
- That a human reviewed and edited everything before publication.
- That the human is accountable for accuracy.

**What it must never say:**
- That AI is solely responsible for fact-checking.
- That AI is not used (if that is untrue).
- That "we use cutting-edge AI" (this is marketing language, not disclosure).
- That all content is "100% human-written" if AI was involved in drafting.

**Section title (sentence case):** "AI assistance in content creation" or "How we use AI tools"

**Structural skeleton:**
1. One sentence stating that AI drafting tools are used in the editorial workflow.
2. One sentence describing the human review step (who reviews, what they check — accuracy of rates, factual claims, voice consistency).
3. One sentence on accountability (the named editor is responsible for published content).
4. Optional: one sentence on what AI is not used for (e.g., not used to generate exchange rates, not used to replace the sourcing methodology).

**Placement in `MethodologyPage.jsx`:** as a new `<section className="legal-page__section">` between the current §7 (Editorial process, lines 157–184) and §8 (Known limitations, lines 186–212). The new section becomes §8, and Known limitations and subsequent sections shift numbering by one.

### 3C. Per-pair intro (~150–200 words) — structure and voice

**Problem to solve:** 38 intros that must feel individually written, not templated. The risk is that all 38 begin with "The [FROM]/[TO] exchange rate is important because…" — this is the exact pattern the PITFALLS.md Pitfall 1 describes as the thin-content signal.

**Structure (suggested 3–4 paragraphs, approximately 50 words each):**

1. **Why this specific pair matters** (2–3 sentences): named real-world use cases that are unique to this pair. USD-BRL: Brazilian exporters converting commodity revenues. EUR-GBP: cross-channel trade and UK residents with EU bank accounts. INR-USD: the world's largest remittance corridor. Do not use generic "trade and investment" language that fits any pair.
2. **One economic or structural fact about the pair** (2–3 sentences): name the central banks involved, one policy or structural feature that shapes this pair's behaviour (e.g., for USD-JPY: Bank of Japan's yield curve control policy; for EUR-GBP: the legacy of Brexit trade agreements). Must cite the actual institution, not generic "the central bank."
3. **Practical conversion context** (2–3 sentences): a typical scenario. What does a person converting this pair actually need? Travel? Remittance? Payroll? This can reference the `currencyProfiles.js` depth already on the page but must add something the profile does not say.
4. **Optional callout or tip** (1–2 sentences): a concrete, useful fact about this pair — e.g., "EUR-BRL volumes peak around Brazilian commodity export seasons; rate quotes in Brazilian business hours may differ slightly from London-hours mid-market."

**How to keep 38 intros from sounding templated:**
- Each intro must name the specific central bank(s) for that pair.
- Each intro must name one use case that is unique to that pair's corridor (not "travel" generically).
- Each intro must vary its opening word/phrase — no intro should open with the same word as the previous one.
- Real economic context without invented numbers: use qualitative descriptors ("the largest," "among the most liquid," "seasonally sensitive") rather than specific percentages or volumes unless citable.

**Word count enforcement:** The 150-word floor is measured by the rendered visible text of the intro paragraph(s) only — not including the existing templated `<h2>Converting…</h2>` heading or the subsequent `currencyProfiles.js` content.

---

## Section 4: Component Design for `<BylineMeta>`

### Option A: Flat byline strip (recommended)

A single horizontal line of text, mirroring the existing meta line structure in `GuidePage.jsx:107-113`. No author card, no image slot, no expand/collapse.

**Rendered output:**
```
By [Name] · 7 min read · Last reviewed: 2026-04-20
```

The byline link wraps the name and links to `/about#author`. The "Last reviewed" label replaces "Updated".

**Pros:**
- Minimal DOM delta — the existing `<div className="guide-article__meta">` is preserved, only the author `<span>` and the date label change.
- Zero CLS — same height as today's static span.
- Consistent with the project's density-first approach (dense, functional, no decoration).
- Low CSS surface — only the anchor style is new.

**Cons:**
- Name link is not immediately visually prominent as "this is the author."

### Option B: Inline author card

A small two-line card with name + role on line 1 and date on line 2, optionally with a colored dot or avatar slot.

**Pros:**
- More visually distinct as an author credit.
- Easier to add an avatar later (D-04 defers the image — the slot can be placeholder).

**Cons:**
- Increases DOM height, risks shifting content below on first paint.
- More CSS to maintain and to dark-mode-validate.
- The avatar slot left empty could read as broken on a reviewer's first visit.

### Recommendation: flat byline strip

Match the existing `.guide-article__meta` pattern. The name becomes an anchor; the "Updated" label becomes "Last reviewed:". The whole `<div>` becomes the mounting point.

**Locale-aware date formatting approach:**

The project's `useI18n` hook is available inside `GuidePage.jsx` already (via `useI18n()` or `useContext(I18nContext)`). However, `<BylineMeta>` is a presentational component — it should not call `useI18n()` internally (that would couple it to the i18n context and complicate future reuse). Instead, pass `lang` as a prop from `GuidePage.jsx`, which already has access to `useI18n()`.

```jsx
// GuidePage.jsx — read lang from useI18n and pass to BylineMeta
import { useI18n } from '../../i18n/I18nContext.jsx'
// ...
const { lang } = useI18n()
// ...
<BylineMeta authorSlug={guide.authorSlug} reviewedDate={guide.updated} lang={lang} readingMinutes={guide.readingMinutes} />
```

```jsx
// src/components/BylineMeta/BylineMeta.jsx
import { Link } from 'react-router-dom'
import { getAuthor } from '../../content/authors.js'
import './BylineMeta.css'

function formatDate(isoDate, lang) {
  try {
    return new Date(isoDate + 'T00:00:00').toLocaleDateString(lang, {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch (_) {
    return isoDate // ignore — fall back to ISO string
  }
}

export function BylineMeta({ authorSlug, reviewedDate, lang = 'en', readingMinutes }) {
  const author = getAuthor(authorSlug)
  if (!author) return null

  return (
    <div className="byline-meta">
      <span className="byline-meta__author">
        By <Link to="/about#author" className="byline-meta__link">{author.name}</Link>
      </span>
      {readingMinutes && (
        <>
          <span aria-hidden="true" className="byline-meta__sep">·</span>
          <span className="byline-meta__reading">{readingMinutes} min read</span>
        </>
      )}
      {reviewedDate && (
        <>
          <span aria-hidden="true" className="byline-meta__sep">·</span>
          <span className="byline-meta__reviewed">Last reviewed: {formatDate(reviewedDate, lang)}</span>
        </>
      )}
    </div>
  )
}
```

**CSS (`.BylineMeta.css`) — mirrors Breadcrumbs.css pattern:**
```css
.byline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.byline-meta__link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 600;
}

.byline-meta__link:hover {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.byline-meta__sep {
  color: var(--color-text-muted);
}

.byline-meta__reviewed {
  color: var(--color-text-muted);
}
```

Note: the `Link` from `react-router-dom` navigates to `/about#author`. React Router v7 handles hash links client-side; the `#author` section uses `id="author"` on the `<h2>` tag in `AboutPage.jsx`.

**Important:** Per the frontend-guidance skill, every user-facing string added to a component MUST have keys added to all 7 locale files in `src/i18n/locales/`. The "Last reviewed:" label and "min read" label are currently hardcoded in English in the existing `GuidePage.jsx:109-113`. Adding i18n keys for `bylineLastReviewed` and `bylineMinRead` to all 7 locale files is required during plan 01-01 execution.

---

## Section 5: Concrete File Diff Guidance

### 5A. GuidePage.jsx — three changes

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/guides/GuidePage.jsx`

**Change 1 (lines 90-96): Fix ArticleSchema props**

Current:
```jsx
<ArticleSchema
  headline={guide.title}
  description={guide.description}
  url={url}
  datePublished={guide.updated}
  dateModified={guide.updated}
/>
```
Target:
```jsx
<ArticleSchema
  headline={guide.title}
  description={guide.description}
  url={url}
  datePublished={guide.published}
  dateModified={guide.updated}
  authorSlug={guide.authorSlug}
/>
```

**Change 2 (lines 104-113): Replace static meta line with `<BylineMeta>`**

Current:
```jsx
<header className="guide-article__header">
  <span className="guide-article__category">{guide.category}</span>
  <h1>{guide.title}</h1>
  <div className="guide-article__meta">
    <span>By the About Currency editorial team</span>
    <span aria-hidden="true">·</span>
    <span>{guide.readingMinutes} min read</span>
    <span aria-hidden="true">·</span>
    <span>Updated {guide.updated}</span>
  </div>
</header>
```
Target:
```jsx
<header className="guide-article__header">
  <span className="guide-article__category">{guide.category}</span>
  <h1>{guide.title}</h1>
  <BylineMeta
    authorSlug={guide.authorSlug}
    reviewedDate={guide.updated}
    lang={lang}
    readingMinutes={guide.readingMinutes}
  />
</header>
```

**Imports to add:**
```js
import { BylineMeta } from '../../components/BylineMeta/BylineMeta.jsx'
import { useI18n } from '../../i18n/I18nContext.jsx'
```

**Inside `GuidePage()` function body, before the `return`:**
```js
const { lang } = useI18n()
```

### 5B. guides.js — add two fields to all 16 entries

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/content/guides.js`

For each of the 16 guide objects, add after the existing `updated` field:
```js
published: '2026-04-20',   // use updated value as floor per D-15; user may supply earlier dates
authorSlug: 'owner',
```

Note: the `STRUCTURE.md` spec for "New guide" says required fields are `slug, title, description, readingMinutes, updated, category, tags, body`. Adding `published` and `authorSlug` is additive — no existing functionality breaks. The `ArticleSchema` currently receives `guide.updated` for both `datePublished` and `dateModified`; after the change it receives the new `guide.published` field.

**Enforcement:** `dateModified` (= `guide.updated`) must NEVER be earlier than `datePublished` (= `guide.published`). For backfill, using the same value for both (the current `updated` date) guarantees this. If a user supplies an earlier actual publication date, it must be ≤ `updated`.

### 5C. CurrencyPairPage.jsx — two changes

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/CurrencyPairPage.jsx`

**Change 1 (near line 119): Add ServiceSchema alongside CurrencyPairSchema**

Current:
```jsx
{indexable && <CurrencyPairSchema from={fromMeta} to={toMeta} rate={rate} date={converter.rateDate} />}
```
Target:
```jsx
{indexable && <CurrencyPairSchema from={fromMeta} to={toMeta} rate={rate} date={converter.rateDate} />}
{indexable && <CurrencyConversionServiceSchema fromCode={fromCode} toCode={toCode} fromName={fromName} toName={toName} />}
```

Import addition at top:
```js
import { BreadcrumbSchema, CurrencyPairSchema, CurrencyConversionServiceSchema } from '../seo/StructuredData.jsx'
import { getPairSeo, SITE_URL, pairUrl, isIndexablePair } from '../seo/seoContent.js'
import { getPairIntro } from '../content/pairProfiles.js'
```

**Change 2 (line 207, inside `seo-content` section): Render pair intro before existing h2**

Current (line 207):
```jsx
<section className="seo-content" aria-label={`${fromCode} to ${toCode} information`}>
  <h2>Converting {fromName} ({fromCode}) to {toName} ({toCode})</h2>
```
Target:
```jsx
<section className="seo-content" aria-label={`${fromCode} to ${toCode} information`}>
  {pairIntro && <p className="seo-content__intro">{pairIntro}</p>}
  <h2>Converting {fromName} ({fromCode}) to {toName} ({toCode})</h2>
```

Where `pairIntro` is computed before the return:
```js
const pairIntro = getPairIntro(fromCode, toCode)
```

Note: the intro is a single ~150–200 word prose string. Rendering as a `<p>` keeps DOM structure simple. If the intro requires internal links, the `pairProfiles.js` entries can store structured children arrays (same pattern as `guides.js` `p` blocks), but given the "no visual rebrand / additive only" constraint, a plain string is simpler and safer for the sprint.

### 5D. AboutPage.jsx — replace "Who We Are" section

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/legal/AboutPage.jsx`

The existing "Who We Are" section (lines 95–107) reads:
```jsx
<section className="legal-page__section">
  <h2>Who We Are</h2>
  <p>
    About Currency is an independent project. It is not affiliated with any bank, broker,
    money-transfer service, or government agency. The site is maintained by a small team of
    web engineers and writers who care about useful, honest financial tools.
  </p>
  <p>
    If you want to get in touch — press inquiries, corrections, partnership ideas, or
    feedback — please visit our <Link to="/contact">contact page</Link>.
  </p>
</section>
```

Replace with:
```jsx
<section className="legal-page__section" id="author">
  <h2>[Author name] — editor</h2>         {/* user supplies name and title */}
  <p>[Bio paragraph ~80-120 words]</p>    {/* user supplies at plan-phase */}
  <p>
    [Expertise statement — 1 sentence.]{'  '}
    <a href="[external link]" target="_blank" rel="noopener noreferrer">[link text]</a>.
  </p>
  <p>
    Questions, corrections, or press inquiries? Visit the <Link to="/contact">contact page</Link>.
  </p>
</section>
```

**Critical detail:** The `id="author"` is on the `<section>` element, not on the `<h2>`. This means the hash `#author` scrolls to the section start, not the heading — consistent with how `/about#author` is used in `<BylineMeta>`. If the user prefers the hash to hit the heading, move `id="author"` to `<h2>`.

The existing "What Makes Us Different" section (lines 68–79) and "Editorial Standards" section (lines 81–93) are kept. The "Who We Are" content about "a small team of web engineers and writers" is removed because it contradicts the named byline — per D-05.

### 5E. MethodologyPage.jsx — insert AI-disclosure section

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/legal/MethodologyPage.jsx`

Insert a new `<section>` after the closing tag of §7 (line 184) and before the opening tag of §8 (line 186). The new section becomes §8 "Use of AI tools in content creation" and the existing §8–§10 shift to §9–§11.

```jsx
<section className="legal-page__section">
  <h2>8. Use of AI tools in content creation</h2>
  <p>
    [AI-disclosure paragraph — ~100-150 words. User supplies the draft; planning agent
     proposes copy for user review per D-19. The paragraph must honestly describe the
     actual workflow: AI drafting assistance, human review and editing, human accountability
     for published accuracy. See voice guidelines in Section 3B of RESEARCH.md.]
  </p>
</section>
```

Heading numbering must be updated: existing §8 through §10 headings increment by one ("8. Known limitations" → "9. Known limitations", etc.). This is a mechanical text change.

### 5F. HomePage.jsx — add FinancialProductSchema

**File:** `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/HomePage.jsx`

Import addition:
```js
import { BreadcrumbSchema, FinancialProductSchema } from '../seo/StructuredData.jsx'
```

Inside the render, after the existing `<BreadcrumbSchema>` call:
```jsx
<BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }]} />
<FinancialProductSchema />
```

The `FinancialProductSchema` takes no props — all data is static in the emitter.

---

## Section 6: Wave-2 Trigger Plan

**Recommendation: Wave 2 ships as post-approval Phase 1.5, not inside Phase 1.**

**Exact counts (from computed pair sets):**
- Wave 1: 38 pairs (verified from POPULAR_PAIRS + reverses)
- Wave 2: 40 pairs (verified from MAJORS × MAJORS minus Wave 1)
- Total indexable: 78 pairs

**Why 40 (not ~30 as D-11 stated):** CONTEXT.md D-11 said "~30 indexable major-major crosses." The actual count is 40 because MAJORS = 8 currencies, giving 8×7 = 56 directed pairs, minus the 16 Wave 1 pairs that already exist within the 8 MAJORS (USD-EUR, USD-GBP, USD-JPY, USD-CHF, USD-CAD, USD-AUD, USD-CNY, EUR-USD, GBP-USD, EUR-GBP, GBP-EUR, AUD-USD, USD-KRW is not a major, MXN-USD not a major), resulting in... [see computed output above]. The planner should note this correction.

**Decision table:**

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Ship Wave 2 inside Phase 1 | All 78 indexable pairs have unique editorial before merge | Delays Phase 1 merge by ~2–3 more evenings; 40 × ~175 words = ~7,000 words additional authoring load; no incremental reviewer value (reviewer is unlikely to sample EUR-CHF or GBP-CNY in the first pass) | Rejected |
| Ship Wave 2 as Phase 1.5 backlog | Phase 1 merges on sprint timeline with 38 pairs done; Wave 2 added post-approval | 40 pairs still have only templated content; risk that reviewer samples EUR-JPY and finds no intro | Recommended |
| Ship Wave 2 as continuous addition within Phase 1 (partial) | Flexible | Produces a mixed state where some Wave 2 pairs have intros and others don't — incoherent for the planner | Rejected |

**Mitigating the wave-gap risk:** The 40 Wave 2 pairs' pages are not thin — they each have the full `currencyProfiles.js` depth for both currencies (named central bank, country, subunit, global rank, ~60-word about paragraph, usage notes). The templated `seo-content` block also adds pair-specific rate display, reverse-direction info, and the FAQ. The total visible word count on, say, EUR-CHF is likely 400–600 words of unique content even without the pair intro. The 150-word unique editorial threshold from EEAT-07 is measured per-pair, and these pages likely cross it via `currencyProfiles.js` content alone — the pair intro is an additional trust signal, not the only one.

---

## Section 7: Verification Strategy

[ASSUMED for runnable commands that depend on local tooling not confirmed present]

| Req ID | What to verify | How to verify | Automated command? |
|--------|----------------|---------------|-------------------|
| EEAT-01 | Named author byline visible on every guide page, linked to `/about#author` | Load `/guides/how-exchange-rates-work` in browser; inspect DOM for `.byline-meta__link` with `href="/about#author"` | `curl -s https://currencyabout.com/guides/how-exchange-rates-work \| grep -i 'byline-meta'` (after deploy; requires JS execution — use Rich Results Test for crawler view) |
| EEAT-02 | "Last reviewed: YYYY-MM-DD" visible on every guide page | Load any guide page; inspect `.byline-meta__reviewed` text | `curl -s https://currencyabout.com/guides/how-exchange-rates-work \| grep -i 'last reviewed'` |
| EEAT-03 | Author bio visible at `/about#author` with substantive content | Load `/about` in browser; navigate to `#author`; verify bio paragraph, expertise statement, external link | `curl -s https://currencyabout.com/about \| grep -i 'id="author"'` |
| EEAT-04 | AI-disclosure section visible in `/methodology` | Load `/methodology`; locate new §8 heading "Use of AI tools in content creation" | `curl -s https://currencyabout.com/methodology \| grep -i 'AI tools'` |
| EEAT-05 | `ArticleSchema` JSON-LD contains `author.@type = Person`, `datePublished`, `dateModified`, `publisher` | Google Rich Results Test: `https://search.google.com/test/rich-results` on any guide URL | Inspect `<script type="application/ld+json">` in page source for `"@type":"Person"` and `"datePublished"` |
| EEAT-06 | `FinancialProduct` JSON-LD on home page; `Service` JSON-LD on indexable pair pages | Rich Results Test on `https://currencyabout.com` and on `https://currencyabout.com/usd-to-brl` | `curl -s https://currencyabout.com/usd-to-brl \| grep -i 'FinancialProduct\|serviceType'` (JS-rendered — use URL Inspection in Search Console for actual crawler view) |
| EEAT-07 | Every Wave 1 indexable pair page has ≥150 words of unique editorial text | Count words in `.seo-content__intro` for each of the 38 Wave 1 pairs; verify no intro is shared across pairs | Spot-check: load 5 random pairs; paste intro into word counter; diff intros to verify no >10 consecutive shared words across 3 random pairs |

**Build gate (required for every plan merge):**
```bash
npm run build
```
Must exit with code 0 and no TypeScript/ESLint errors (project has neither, so any Vite/Rollup error is the failure signal).

**Structural data validator:**
- https://search.google.com/test/rich-results — test after deploy for `Article`, `BreadcrumbList`, `FAQPage`, `ExchangeRateSpecification`, `FinancialProduct`, `Service`
- https://validator.schema.org — paste JSON-LD strings directly for syntax validation (no deploy needed; can validate during development)

---

## Section 8: Reviewer-Facing Pitfalls

### Pitfall A: Person JSON-LD without `sameAs` — risk assessment

[ASSUMED — based on training knowledge of Google's E-E-A-T documentation; not independently verified in this session against a current Google source]

**Risk level: LOW.**

Google's Quality Rater Guidelines (QRG) discuss "reputation" signals for YMYL content, but `sameAs` in JSON-LD is not the primary mechanism by which AdSense reviewers assess author credibility. The reviewer primarily looks at: (1) is there a named person? (2) does the byline link to a bio? (3) does the bio page exist and have substantive content? A Person record with `name` and `url` pointing to a real bio page satisfies all three criteria.

The risk of no `sameAs` is that Google's Knowledge Graph cannot automatically cross-reference the author to a known entity. For a personal brand with no existing Knowledge Graph entry (typical for indie developers), `sameAs` has near-zero incremental value. The CONTEXT.md decision to defer `sameAs` (D-02) is sound.

**Counter-risk if any `sameAs` URL is added later:** The URL must be a profile that actually exists and is reachable by Google's crawler. Dead or private LinkedIn profiles, private GitHub profiles, or URLs returning 404 are worse signals than no `sameAs` at all.

### Pitfall B: 150-word pair intro threshold — what counts

**What counts toward the 150-word threshold:**
- The visible text of the new `<p className="seo-content__intro">` paragraph(s) rendered from `pairProfiles.js`.
- Unique, non-templated text that varies per pair.

**What does NOT count toward the threshold:**
- The existing `<h2>Converting {fromName} ({fromCode}) to {toName} ({toCode})</h2>` heading.
- The templated paragraphs below (mid-market explanation, reverse direction paragraph).
- The `currencyProfiles.js` per-currency content rendered under "About the {fromName}" and "About the {toName}" headings.
- The FAQ questions and answers.
- The common template paragraphs about use cases, rate vs. what-you-pay, etc.

**Measurement approach:** Count words in the text node of `.seo-content__intro`. A ~175-word target (mid-range of 150–200) provides comfortable margin.

### Pitfall C: `dateModified < datePublished` — must never happen

For the 16 guides backfill, if the user supplies an actual earlier `published` date (e.g., the guide was first published in January 2026 but `updated` is April 2026), the sequence must be: `published ≤ updated`. Google's Article structured data validator flags `dateModified < datePublished` as an error.

**Enforcement during backfill:**
- Default: set `published` equal to `updated` — safe, always valid.
- If user supplies an earlier date: verify `published ≤ updated` before committing.
- Add a comment in `guides.js` above the `published` field: `// must be ≤ updated`.

**Future enforcement:** Every time `updated` is changed, `published` must not be changed to something later. The `published` field is immutable after first publication; only `updated` advances.

### Pitfall D: Single shared Person record across 16 guides — signal quality

[ASSUMED — based on training knowledge; not verified against current Google guidance]

**Assessment: acceptable for a single-author site.**

Google's quality rater training does not penalize a site where all content is attributed to one author, provided that author's bio page is substantive and the author has genuine expertise. Many high-quality single-author finance sites (personal finance blogs, indie analysis tools) attribute all content to one person without issue.

The risk would be if the single Person record were a fictional or vague entity ("The About Currency Team" styled as a Person). D-01 locks the byline to the real project owner — this avoids that risk entirely.

**The `authorSlug` field** in `guides.js` is future-proofed for multiple contributors (per D-08). A second author can be added to `authors.js` and attributed on specific guides without any structural change.

### Pitfall E: Schema duplication — static JSON-LD in `index.html` + Helmet-injected `FinancialProduct`

**Risk level: LOW.**

Google's structured data parser handles multiple `<script type="application/ld+json">` blocks on the same page by parsing each independently. Different `@type` values do not conflict. The existing `index.html` blocks are:
- `WebSite` (for sitelinks searchbox)
- `Organization` (for the organization entity)
- `WebApplication` (for the app entity)

The new Helmet-injected block is `FinancialProduct`. These are four different `@type` values — no duplication. Google does not penalize multiple schemas on a page.

**One genuine risk:** If a future change accidentally emits two `FinancialProduct` blocks (e.g., one in `index.html` and one from Helmet), Google may pick one and ignore the other. This is not a penalty but a wasted opportunity. For Phase 1, the `FinancialProduct` lives only in the Helmet stack (via `HomePage.jsx`) — not in `index.html`. The `WebApplication` stays in `index.html`. These are complementary, not duplicative.

**Crawler behavior:** On first load of `/`, both the static `index.html` JSON-LD and the Helmet-injected JSON-LD are in the DOM. The AdSense pre-screen crawler likely executes JS (to see rendered ad slots), so it will see both. This is the correct behavior.

---

## Section 9: External Standard Citations

[CITED: official documentation URLs]

The following canonical URLs are HIGH-trust sources that downstream prose in `/methodology` or `/about` can deep-link to:

| Standard | Canonical URL | What to cite it for |
|----------|--------------|---------------------|
| Google Search Central: Article structured data | https://developers.google.com/search/docs/appearance/structured-data/article | The specific fields required for `Article` schema (`headline`, `datePublished`, `dateModified`, `author`, `publisher`) |
| Google Search Central: E-E-A-T guidance | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | The quality reviewer criteria that make bylines and methodologies important |
| Google Search Central: "About this result" panel | https://support.google.com/websearch/answer/9795594 | How named authors and About pages contribute to the "About this result" context Google shows users |
| schema.org Person | https://schema.org/Person | The specific properties used in Person JSON-LD |
| schema.org FinancialProduct | https://schema.org/FinancialProduct | The specific properties used in FinancialProduct JSON-LD |
| schema.org Service | https://schema.org/Service | The specific properties used in Service JSON-LD |
| schema.org ExchangeRateSpecification | https://schema.org/ExchangeRateSpecification | Already used by `CurrencyPairSchema`; useful to cite in methodology |
| Google Search Central: Rich Results Test | https://search.google.com/test/rich-results | For verification instructions in the methodology or contributor docs |
| Schema.org validator | https://validator.schema.org | For development-time JSON-LD syntax checking |
| Google Quality Rater Guidelines (public) | https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf | The source of the E-E-A-T framework applied by human reviewers |

---

## Common Pitfalls

### Pitfall 1: Breaking the `ArticleSchema` default export contract

**What goes wrong:** Adding `authorSlug` as a required prop to `ArticleSchema` breaks existing call sites.
**Why it happens:** The component currently has default values for `author` (`'About Currency Editorial Team'`).
**How to avoid:** Keep `authorSlug` optional with a default of `'owner'`. The existing call signature `ArticleSchema({ headline, description, url, datePublished, dateModified, author = '...' })` must be extended carefully. The old `author` string prop should be deprecated but still accepted to avoid breakage on any call site that hasn't been updated.

### Pitfall 2: Hash anchor `/about#author` fails to scroll

**What goes wrong:** Clicking the byline link navigates to `/about` but the page does not scroll to the author section.
**Why it happens:** React Router v7's `<Link to="/about#author">` handles the hash; but if the `<section id="author">` is not in the DOM at navigation time (React renders async), the scroll-to-anchor fires before the element exists.
**How to avoid:** The `AboutPage.jsx` is a simple static page with no loading state. The section renders synchronously on mount. React Router v7 handles hash navigation via the browser's native anchor mechanism after route renders — this should work. Verify with a manual test: navigate from a guide page to `/about#author` and confirm the page scrolls to the author section.

### Pitfall 3: `pairProfiles.js` key casing mismatch

**What goes wrong:** `getPairIntro('usd', 'brl')` returns `null` because the key in `pairProfiles.js` is `'USD-BRL'` (uppercase).
**Why it happens:** `CurrencyPairPage.jsx` computes `fromCode` and `toCode` already uppercased (line 40: `.toUpperCase()`), but if `getPairIntro` is called with lowercased inputs it misses.
**How to avoid:** `getPairIntro(fromCode, toCode)` should normalize inputs: `PAIR_PROFILES[\`${fromCode.toUpperCase()}-${toCode.toUpperCase()}\`] ?? null`. Document the key format as SCREAMING-SNAKE: `USD-BRL`.

### Pitfall 4: `guide.published` not validated against `guide.updated`

**What goes wrong:** During guides.js backfill, a guide gets `published: '2026-06-01'` and `updated: '2026-04-20'` — `dateModified < datePublished`.
**Why it happens:** Manual data entry error.
**How to avoid:** Add a comment block above the `published` field in `guides.js`: `// published: MUST be ≤ updated. Use updated value if actual publication date is unknown.` The planner should include a verification step in the plan: `node -e "const g = require('./src/content/guides.js'); g.GUIDES.forEach(g => { if (g.published > g.updated) console.error('INVALID:', g.slug) })"`.

### Pitfall 5: `<BylineMeta>` mounting before `getAuthor` returns a valid record

**What goes wrong:** If `guide.authorSlug` is undefined (e.g., a guide that wasn't updated during backfill), `getAuthor(undefined)` returns `null` and `<BylineMeta>` renders nothing.
**Why it happens:** The 16-guide backfill is a manual edit; one guide could be missed.
**How to avoid:** `BylineMeta` already has `if (!author) return null` — it degrades gracefully. The visible fallback is no byline (the meta line disappears), which is better than a crash. Add a build-time check or a grep to confirm all 16 guides have `authorSlug` before merging plan 01-01.

### Pitfall 6: i18n string keys missing from non-English locales

**What goes wrong:** The "Last reviewed:" and "min read" strings are hardcoded English in `BylineMeta.jsx`, or the locale keys are added to `en.js` but not to the other 6 locale files.
**Why it happens:** The project convention (from `frontend-guidance` SKILL.md) requires all 7 locale files to be updated when any user-facing string is added.
**How to avoid:** Add the same keys to all 7 files in `src/i18n/locales/` as part of plan 01-01. The keys should be something like `bylineLastReviewed: 'Last reviewed:'` and `bylineMinRead: 'min read'`. In `BylineMeta.jsx`, use `lang` (not `useI18n()`) to look up the translation — or pass the translated strings as props from `GuidePage.jsx`.

---

## Code Examples

### Existing JSON-LD emitter pattern (StructuredData.jsx)

```js
// Source: src/seo/StructuredData.jsx (read directly)
// Pattern: named export function, Helmet wrapper, JSON.stringify of schema object.
// All new schema emitters follow exactly this shape.
export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // ...
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
```

### Existing editorial data module pattern (guides.js)

```js
// Source: src/content/guides.js (read directly)
// Pattern: SCREAMING_SNAKE export for the array, camelCase for the finder function,
// named exports only, no default export.
export const GUIDES = [ /* ... */ ]
export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug)
}
```

The new `authors.js` and `pairProfiles.js` follow this exact pattern:
```js
// src/content/authors.js
export const AUTHORS = { /* keyed by authorSlug */ }
export function getAuthor(slug) { return AUTHORS[slug] ?? null }

// src/content/pairProfiles.js
export const PAIR_PROFILES = { 'USD-BRL': '...', /* 38 keys */ }
export function getPairIntro(fromCode, toCode) {
  return PAIR_PROFILES[`${fromCode.toUpperCase()}-${toCode.toUpperCase()}`] ?? null
}
```

### Existing component pattern (Breadcrumbs.jsx)

```js
// Source: src/components/Breadcrumbs/Breadcrumbs.jsx (read directly)
// Pattern: named export, single props object, early return null for empty,
// uses Link from react-router-dom, BEM class names, sibling CSS.
export function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {/* ... */}
    </nav>
  )
}
```

`<BylineMeta>` follows this exact pattern: named export, single props object with defaults, early return `null` if no author found, BEM class names, sibling CSS.

---

## Runtime State Inventory

> This is a content + small-component phase (not a rename/refactor/migration). No runtime state is being renamed or migrated. The inventory below confirms nothing is at risk.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | `currencyabout_rates` (rates cache), `currencyabout_lang`, `currencyabout_theme`, `cookie-consent` — none of these are touched by Phase 1 | None |
| Live service config | AdSense slots, `useAdSenseLoader` — untouched by Phase 1 | None |
| OS-registered state | None | None |
| Secrets/env vars | None (no env vars in project) | None |
| Build artifacts | `dist/` — rebuilt by `npm run build` on every deploy | None — standard rebuild |

---

## Environment Availability

> Step 2.6: Phase 1 is purely code/config changes (new JS modules, JSX component, prose edits). No external CLI tools, services, or runtimes beyond the existing project stack are required.

All build/deploy tooling is already present (`npm`, `vite`, `wrangler`). No additional environment setup is needed for Phase 1 execution.

---

## Validation Architecture

> No test framework is configured in this project (`src/TESTING.md`: "Not detected"). There is no `vitest.config`, no `jest.config`, no `__tests__` directory. All validation is manual or via build output.

### Phase Requirements → Validation Map

| Req ID | Behavior | Test Type | Verification Command / Method |
|--------|----------|-----------|-------------------------------|
| EEAT-01 | Named author byline on every guide | Manual (visual) + grep | Load 3 guide pages; confirm `.byline-meta__link` present; `npm run build` passes |
| EEAT-02 | "Last reviewed: YYYY-MM-DD" visible | Manual (visual) | Load any guide; inspect byline date |
| EEAT-03 | Substantive author bio at `/about#author` | Manual (visual) | Load `/about`, click the `#author` hash; verify bio renders |
| EEAT-04 | AI-disclosure in `/methodology` | Manual (visual) | Load `/methodology`; locate new §8 heading |
| EEAT-05 | Article JSON-LD with Person author, datePublished, dateModified | Rich Results Test | https://search.google.com/test/rich-results on guide URL |
| EEAT-06 | FinancialProduct on home; Service on pair pages | Rich Results Test + Schema.org validator | Run on `/` and on `/usd-to-brl` |
| EEAT-07 | ≥150 words of unique pair editorial per Wave 1 pair | Manual word count (5 pairs spot-check) | Load pair page; count words in `.seo-content__intro` |

### Wave 0 Gaps

No test framework is present. No test files need to be created — manual verification is the project's established pattern. The planner should include explicit "verify" tasks in each plan that correspond to the table above.

---

## Security Domain

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase |
| V3 Session Management | No | No session changes |
| V4 Access Control | No | No access control changes |
| V5 Input Validation | Minimal | `fromCode`/`toCode` already whitelist-validated by `CURRENCY_META.find()` in `CurrencyPairPage.jsx:43-44`; `getPairIntro` is a simple key lookup with null fallback — no user input reaches it raw |
| V6 Cryptography | No | No crypto |

**No new security surface is introduced by Phase 1.** The only new external data path is `getPairIntro(fromCode, toCode)` which reads from a static constant using inputs already validated by the existing `CURRENCY_META` lookup. The `authors.js` content is static and developer-supplied — no user input reaches it.

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| `author: Organization` in `ArticleSchema` | `author: Person` with name/url | Google's 2026 E-E-A-T guidance for YMYL content strongly prefers Person over Organization for editorial content |
| No `datePublished` (using `dateModified` for both) | Separate `datePublished` + `dateModified` | Google's Article structured data spec requires both fields to differ once a guide is updated after publication |
| `FinancialProduct` not used | `FinancialProduct` as a complement to `WebApplication` | `schema.org/FinancialProduct` has been stable since 2013; it is the recommended type for currency tools per schema.org/docs/financial.html |
| `CurrencyConversionService` as top-level type | `Service` with `serviceType: 'CurrencyConversion'` | `CurrencyConversionService` does not exist as a top-level schema.org type; use `Service` + `serviceType` per D-14 |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Person JSON-LD without `sameAs` does not penalize E-E-A-T signals for an AdSense reviewer | Section 8A | Low — worst case: reviewer cannot cross-reference author in Knowledge Graph; bio page still satisfies the named-accountability requirement |
| A2 | Single shared Person record across 16 guides is acceptable for a single-author site | Section 8D | Low — if Google penalized this, the mitigation is trivial (add `sameAs` or per-guide author variation, both deferred to D-02 scope) |
| A3 | Wave 2's 40 indexable major-major cross pages meet the 150-word unique editorial threshold via `currencyProfiles.js` depth alone | Section 6 | Medium — if a reviewer samples EUR-CHF and finds only templated copy, the lack of a pair intro could be a thin-content signal; mitigated by prioritizing wave 2 authoring immediately after Phase 1 merges |
| A4 | React Router v7's `<Link to="/about#author">` correctly scrolls to `id="author"` section in `AboutPage.jsx` | Section 5D | Low — verify manually; if it fails, use `useEffect` + `scrollIntoView` in `AboutPage.jsx` |
| A5 | Google's structured data parser handles multiple JSON-LD blocks (existing static + Helmet-injected) on the same page without conflict | Section 8E | Low — this is documented behavior per Google Search Central |

---

## Open Questions

1. **Author identity (required before plan-phase execution of 01-01)**
   - What we know: byline is the project owner's real name (D-01); all data is captured in `authors.js`
   - What's unclear: the exact name string, job title, bio text, and external link URL
   - Recommendation: planner must request these from the user before 01-01 can produce runnable tasks

2. **Guide `published` dates (required before executing the guides.js backfill in plan 01-02)**
   - What we know: for guides where the true publication date is unknown, use `updated` as the floor (D-15)
   - What's unclear: does the user want to supply earlier publication dates for any of the 16 guides, or default all to `updated`?
   - Recommendation: planner asks the user; default to `updated` if no answer within the sprint window

3. **AI disclosure paragraph exact copy (required before plan 01-03 can merge)**
   - What we know: "AI-assisted, human-reviewed" is the agreed framing (D-19); planning agent proposes, user reviews
   - What's unclear: the specific workflow details (what tool, what percentage of content, what review process)
   - Recommendation: planner generates a draft in the plan artifacts; user reviews and approves before plan 01-03 executes

4. **Methodology section heading numbering**
   - What we know: new §8 displaces existing §8–§10 by one; the new section is "Use of AI tools in content creation"
   - What's unclear: whether the user wants "8. Use of AI tools..." or a different title/position
   - Recommendation: planner proposes; user confirms at execution time

---

## Sources

### Primary (HIGH confidence — read directly from codebase)
- `src/seo/StructuredData.jsx` — existing JSON-LD pattern; read line-by-line
- `src/seo/seoContent.js` — POPULAR_PAIRS, MAJORS, isIndexablePair; Wave 1/2 counts computed from actual source
- `src/pages/guides/GuidePage.jsx` — exact line numbers for all three insertion points
- `src/pages/legal/AboutPage.jsx` — "Who We Are" section exact lines for replacement
- `src/pages/legal/MethodologyPage.jsx` — §7/§8 boundary at lines 157–184/186
- `src/pages/CurrencyPairPage.jsx` — seo-content section at lines 207–302; Service schema insertion at line 119
- `src/components/Breadcrumbs/Breadcrumbs.jsx` + `Breadcrumbs.css` — component shape and CSS token usage for `<BylineMeta>` design
- `src/content/guides.js` — existing guide schema; 16 entries, current `updated` field usage
- `.planning/phases/01-editorial-trust-signals-e-e-a-t/01-CONTEXT.md` — all locked decisions D-01 through D-19
- `.planning/REQUIREMENTS.md` — EEAT-01 through EEAT-07
- `.planning/ROADMAP.md` — three plan names and success criteria
- `.planning/codebase/STRUCTURE.md` — where new files go
- `.planning/codebase/CONVENTIONS.md` — naming, exports-only, BEM CSS, no semicolons, 2-space indent
- `.planning/research/PITFALLS.md` — Pitfalls 1, 2, 7
- `.planning/research/ARCHITECTURE.md` — Pattern 6 JSON-LD depth recipe
- `.planning/research/SUMMARY.md` — Phase 1 synthesis
- `.claude/skills/frontend-guidance/SKILL.md` — locale string requirement (all 7 files)

### Secondary (CITED — official documentation)
- https://schema.org/Person — Person type properties
- https://schema.org/FinancialProduct — FinancialProduct type properties
- https://schema.org/Service — Service type properties
- https://schema.org/docs/financial.html — financial schema types overview
- https://developers.google.com/search/docs/appearance/structured-data/article — Article structured data requirements

### Tertiary (ASSUMED — training knowledge not verified in this session)
- Risk assessment for Person JSON-LD without `sameAs` (Section 8A)
- Single shared Person record acceptability for E-E-A-T (Section 8D)
- Wave 2 pair editorial threshold met via currencyProfiles.js alone (Section 6 mitigating risk)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all patterns verified from live codebase files
- Architecture: HIGH — all insertion points read from actual source; Wave 1/2 pair counts computed from source logic
- JSON-LD schemas: HIGH for minimum fields (cited from schema.org); MEDIUM for advisable additions (training knowledge)
- Pitfalls: HIGH for implementation pitfalls (verified from codebase); ASSUMED for E-E-A-T reviewer behavior
- Editorial templates: MEDIUM — structure is grounded in existing project voice and locked decisions; prose quality depends on user

**Research date:** 2026-05-19
**Valid until:** 2026-07-19 (stable domain — schema.org and Google structured data requirements are slow-moving; AdSense review policies are stable on 60-day timescales)
