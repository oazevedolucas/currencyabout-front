# ADSENSE-EXECUTION.md — Final Plan for Claude Code

Plan from `ADSENSE-PLAN.md` reviewed and approved. This document consolidates:
- Answers to the five open questions in §8
- Additional requirements derived from AdSense policy research (E-E-A-T signals, sensitive-vertical disclaimers, AI-content compliance)
- Execution rules and stop points

Proceed with phases A → E once you've read this in full.

---

## 1. Answers to §8 open questions

### 1.1 Architectural decisions (§5) — all three confirmed

- **i18n stays single-URL.** Do not introduce `/pt` `/en` route trees. The existing strategy is correct for hreflang and was documented in `SeoHead.jsx` for a reason. The AdSense reviewer evaluates the English default.
- **Editorial expands `/guides`, not `/blog`.** Splitting content paths dilutes topical authority.
- **New articles use the same JS-object body shape** as `src/content/guides.js`. No MDX, no Contentlayer, no new content pipeline.

### 1.2 Scope: English only

The five Brazil-specific topics in the original brief (IOF, PTAX, Plano Real, etc.) are out of scope. They only make sense with PT routes, which we're not adding.

### 1.3 ESLint: skip

No lint config or script added in this pass. Do not let lint absence block completion.

### 1.4 Topic list — 9 new guides, English

Drop "Best practices for sending money internationally" (overlaps with existing `sending-money-abroad`).

Confirmed list of 7 from §4 of the plan, plus 2 swaps:

1. How exchange rates are determined: a complete guide
2. Floating vs fixed exchange rate systems explained
3. Top factors that move currency markets
4. Currency conversion fees: how banks and apps compare
5. Understanding bid-ask spread in forex
6. How central banks intervene in currency markets
7. Hedge basics for individuals and small businesses
8. Spot vs forward vs swap explained
9. **Currency volatility: why some currencies move more than others** *(replaces the dropped topic)*

Before authoring, propose **2 alternative titles** in case any of these duplicates existing guide angles too closely. Show me the list, then wait for confirmation before writing.

### 1.5 `ads.txt`

Leave as-is. The real publisher line (`pub-3917556333305409`) is already there.

---

## 2. Additional requirements from AdSense research

These were not in the original brief but matter for approval. Sources: Google AdSense Program Policies, Google publisher documentation, and 2026 approval analyses for utility-tool sites.

### 2.1 Sensitive-vertical disclaimers (currency = finance)

AdSense holds finance, health, and legal tools to higher trust standards. To pre-empt rejection on this axis:

**a)** On every page that displays a rate or conversion (HomePage converter, CurrencyPairPage, ExchangeRatesTodayPage), add a visible footer line:

> *Rates shown are indicative, sourced from [provider], and updated approximately every [interval]. This site does not provide financial advice. Consult a licensed professional before making currency-based decisions.*

Implement as a small `<RateDisclaimer />` component, referenced from the three pages above. Read `MethodologyPage` first to mirror the exact wording it already uses about sources and refresh cadence — do not contradict it.

**b)** In each new guide that discusses rates, instruments, or strategies, include a one-line italicized note at the end:

> *This article is educational. It is not financial, tax, or investment advice.*

### 2.2 E-E-A-T signals in new guides

Generic AI-feel content is the #1 rejection reason for utility sites in 2026 reviews. Each new guide must include at least **two** of the following three signal types — not all three on every guide, but no guide without at least two:

1. **A "Common mistakes" or "What to watch for" section** with a concrete numeric example (e.g., "A buyer converting $10,000 with a 2.5% spread loses ~$250 versus the mid-market rate"). Use ranges only — never invent specific historical rates.
2. **A cited source** in the body — Bank for International Settlements, a central bank publication, IMF working paper, or a major bank's published methodology. Link out. One citation per guide minimum.
3. **A practical recommendation framed as expertise**, not as filler. Example: not "consider your options carefully" but "for transfers under $5,000, app-based providers usually beat bank wires once the spread is factored in." Specificity is the signal.

These are not decorative. The reviewer is scanning for evidence that a real publisher with domain knowledge is behind the site.

### 2.3 Voice and AI-tell avoidance

Mirror the existing 6 guides in `src/content/guides.js`. Hard prohibitions for all new copy:

- No "in today's fast-paced world", "navigating the complexities", "unlock the potential", "ever-evolving landscape"
- No em-dashes in body copy (the project's existing guides avoid them; match that)
- No rule-of-three lists used decoratively ("clear, concise, and compelling")
- No empty intros that restate the title before reaching content
- No "in conclusion" or "in summary" closers — end with a useful pointer (CTA to converter, link to related guide)
- Plain US English, sentence-case headings if the existing guides use sentence case (verify before writing)

### 2.4 Indexability safeguards

The Cloudflare Workers SPA setup means client-side rendering. Verify:

- Each new guide route returns the correct `<title>` and `<meta description>` in the **initial HTML response**, not just after JS hydration. Check by `curl -A "Googlebot" https://currencyabout.com/guides/<slug>` and confirming the head is populated. If the noscript SEO fallback in `index.html` is the path used, add the new slugs there too (the plan already notes this).
- The new 404 page must return a real 404 status, not 200. Cloudflare Workers SPA fallback can mask this — confirm the response code with `curl -I` against a junk URL.

### 2.5 Ad-placement compliance (Phase C)

Reinforcing the plan's §4 item 4. AdSense policy explicit prohibitions to honor in `<AdSlot />`:

- Zero ads on `/privacy-policy`, `/terms`, `/about`, `/contact`, `/methodology`, `/404`
- No ads in floating containers, no ads styled to look like navigation, no ads above the converter input on the home (would push the tool below the fold on mobile)
- Maximum 2 ad slots per content page (guide or pair page), 1 on the home
- Ads must not load until cookie consent is granted (gating via `hasMarketingConsent()` + `cookie-consent-changed` listener, as already planned)

---

## 3. Execution order with stop points

### Phase A — quick wins + audit (one commit, ~1h)

1. `NotFoundPage` + catch-all route after `:pair`; guard `CurrencyPairPage` against invalid slugs (redirect to 404). Confirm 404 returns real 404 status from Cloudflare Worker.
2. Audit `ArticleSchema` emission in `GuidePage`. Audit `FAQSchema` emission in HomePage. Wire any missing.
3. Audit pair pages for thin content gaps not caught by commit `7e45b0a`. Grep for empty body sections.
4. Build `<RateDisclaimer />` component and mount on HomePage, CurrencyPairPage, ExchangeRatesTodayPage. Read `MethodologyPage` wording first.

**STOP. Report findings before Phase B:**
- What was missing in JSON-LD wiring?
- Any remaining thin pair pages?
- The 2 alternative guide titles in case any conflict with existing angles.
- The exact wording chosen for `<RateDisclaimer />`.

Wait for my go-ahead.

### Phase B — 9 new guides (the bulk of the work)

5. Read all 6 existing guides in `src/content/guides.js` end-to-end. Note: heading case convention, average length, internal-link density, callout/list usage.
6. Author **guide #1** ("How exchange rates are determined: a complete guide"). Include the educational disclaimer (§2.1.b) and at least 2 of the 3 E-E-A-T signals (§2.2).

**STOP. Show me the diff for guide #1.**

Once I confirm the pattern, batch the remaining 8 without further interruption.

7. Author guides #2–#9. Each ≥800 words, ≥2 internal links to other guides, ≥1 link to the converter, schema-tagged, educational disclaimer included.
8. Update `public/sitemap.xml` with the 9 new slugs.
9. Update the noscript fallback block in `index.html` with the 9 new slugs.

### Phase C — AdSense scaffolding (one commit)

10. Read `src/components/CookieConsent/CookieConsent.jsx` end-to-end. Note the `hasMarketingConsent()` export and the `cookie-consent-changed` event payload.
11. Build `useAdSenseLoader` hook: injects the AdSense `<script>` tag into `<head>` the first time consent is granted; listens to `cookie-consent-changed` to react in-session. Idempotent (does not double-inject).
12. Build `<AdSlot slotId={...} />`. Returns `null` if: consent not granted, OR current route is in the legal-pages list (§2.5). Lazy-load via `loading="lazy"` or IntersectionObserver.
13. Place ad slots:
    - HomePage: 1 slot, below the editorial section, above the FAQ
    - GuidePage: 1 slot mid-article (after ~50% of body blocks), 1 slot at end
    - CurrencyPairPage: 1 slot below the rate display, 1 slot at end of body
    - Zero on legal pages, /about, /contact, /methodology, /404

For each placement, justify it in the commit body (why this page, why this position).

### Phase D — verification

14. Run `npm run build`. Must pass. (No `tsc --noEmit`, no `npm run lint` — neither applies to this stack.)
15. Manual checklist:
    - [ ] `dist/sitemap.xml` includes all 9 new slugs
    - [ ] `curl -A "Googlebot" https://localhost:.../guides/<new-slug>` returns populated `<head>` and visible content in initial HTML
    - [ ] Each new guide page in DevTools → Elements → `<head>` shows `ArticleSchema` JSON-LD
    - [ ] HomePage `<head>` shows `FAQSchema` JSON-LD
    - [ ] CurrencyPairPage shows `BreadcrumbSchema` + `CurrencyPairSchema` JSON-LD
    - [ ] `curl -I https://localhost:.../this-route-does-not-exist` returns HTTP 404
    - [ ] CurrencyPairPage with invalid slug (e.g., `/xyz-to-abc`) redirects or 404s, does not render an empty pair page
    - [ ] Cookie banner: refuse cookies → no AdSense script in `<head>`, no `<AdSlot />` renders. Accept → script injected, slots render. Refresh → state persists.
    - [ ] `<AdSlot />` renders nothing on `/privacy-policy`, `/terms`, `/about`, `/contact`, `/methodology`, `/404`
    - [ ] `<RateDisclaimer />` visible on HomePage, CurrencyPairPage, ExchangeRatesTodayPage

### Phase E — handoff

16. Draft a commit message (or set of commit messages, one per phase) ready for Alexandre to push.
17. Write a `POST-DEPLOY-CHECKLIST.md` with:
    - What to monitor in Google Search Console over the next 2–3 weeks (Coverage report, new URLs indexed, no crawl errors)
    - When to reapply to AdSense (after Search Console shows ≥80% of the new guides indexed, minimum 2 weeks post-deploy)
    - Reminder that `ads.txt` is already set
    - Reminder to re-enable the AdSense loader script in `index.html` only after approval is granted, OR confirm the gated-loader approach in `useAdSenseLoader` replaces the static script tag entirely (the latter is cleaner — clarify which path was taken in the handoff doc)

---

## 4. Hard constraints (recap, do not negotiate)

- **Additive only.** Do not modify the converter, `I18nContext`, or `CookieConsent` beyond reading them.
- **No new dependencies** without naming them and waiting for my approval. Specifically: no MDX runtime, no CMS, no state manager, no analytics library.
- **No placeholder content.** Every new guide is publishable on the day it's written.
- **No invented exchange rates.** Always use ranges. If a guide references a historical event, attribute it without quoting a specific number unless that number is in a cited source you link to.
- **No paraphrasing from sources.** Write from first principles. Citing a source means linking to it for further reading, not summarizing its sentences in different words.
- **Originality across the new batch.** No two new guides should reuse the same intro structure, same callout pattern repeatedly, or the same closing template. Each is its own piece.

---

## 5. Definition of done

- All 5 phases complete.
- `npm run build` passing.
- Final commit message(s) drafted.
- `POST-DEPLOY-CHECKLIST.md` written and committed.
- Total guide count: 15 (6 existing + 9 new).
- Brief summary at the end: what was changed, what was intentionally left alone, what Alexandre should verify before pushing.

Proceed with Phase A.
