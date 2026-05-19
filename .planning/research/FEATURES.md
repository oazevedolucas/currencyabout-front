# Feature Research

**Domain:** Free currency-converter / finance-utility tool preparing for Google AdSense approval (YMYL finance tier)
**Researched:** 2026-05-19
**Confidence:** HIGH (cross-referenced 2026 AdSense guidance, Quality Rater / E-E-A-T docs, and feature inventories of approved competitors XE, OANDA, Wise, ExchangeRates.com)

## Research Frame

This file is scoped to **AdSense approval odds during the in-flight review window (<7 days)**, not generic feature ideation. Every recommendation is graded on:

- **Complexity** — small (<1 day) / medium (1-3 days) / large (3+ days)
- **AdSense impact** — HIGH / MEDIUM / LOW (direct reviewer-visible signal)
- **Has it now?** — verified against `.planning/codebase/STRUCTURE.md` and the `src/` tree

Reviewer model assumed: a human evaluator who first lands on the home page on a mobile viewport, samples 1-2 guide pages, 1-2 pair pages, and the footer trust pages (About / Contact / Privacy / Terms / Methodology). The site has roughly 60 seconds to read like "a real publisher with domain expertise" rather than "a tool wrapped in ads."

## Feature Landscape

### Table Stakes (Reviewer expects these; missing = elevated risk)

Features the corpus of approved finance-utility sites (and 2026 AdSense checklists) treat as baseline. Missing one is rarely a sole rejection cause, but two or three missing simultaneously triggers "thin / made-for-ads" flags.

| Feature | Why expected | Has it now? | Complexity | AdSense impact | Notes |
|---------|--------------|-------------|------------|----------------|-------|
| Privacy Policy, Terms, About, Contact pages | Universal AdSense baseline; 2026 checklists treat absence as auto-reject | YES (`src/pages/legal/`) | — | — | Already present, footer-linked |
| Methodology / data-source disclosure | YMYL finance signal — reviewer can verify rates aren't fabricated | YES (`MethodologyPage.jsx`) | — | — | Already present, exceeds peers |
| `ads.txt`, `sitemap.xml`, `robots.txt` | Mechanical AdSense / Search Console checks | YES (`public/`) | — | — | Already present |
| Mobile-friendly responsive layout | Reviewers simulate mobile first per 2026 guidance | PARTIAL — known mobile breakpoint debt (sprint Phase 2) | medium | HIGH | Phase 2 of sprint should close this |
| Cookie consent w/ marketing toggle | EEA / UK GDPR + AdSense consent-mode interplay | YES (`CookieConsent/`) | — | — | Double-gated AdSense load is best-practice |
| Rate disclaimer on converter / pair / rates pages | YMYL finance: "informational not advice" is mandatory | YES (`RateDisclaimer/`) | — | — | Already present |
| Last-updated / "Last reviewed" date visible on guides | E-E-A-T freshness signal in 2026 Quality Rater playbook | PARTIAL — `updated:` field exists in `guides.js` but is **not surfaced** on the rendered page in a "Last reviewed YYYY-MM-DD" pattern | small | HIGH | Promote `updated` to a styled `<time>` element near the title; add to JSON-LD `dateModified` |
| Author byline + bio on long-form content | YMYL finance E-E-A-T: "non-negotiable" per 2026 Quality Rater guidance | NO — guides ship anonymous | small-medium | HIGH | Already a Phase-1 deliverable; ensure bio links to a `/about` author section, not just a name string |
| Editorial standards / corrections policy page | 2026 trust-signal cluster; differentiator at scale, table-stakes for YMYL finance reviewers | NO | small | HIGH | New page under `/editorial-standards` or merged into `/methodology`; lists fact-check process, correction procedure, AI-use disclosure |
| Source citations on guides (inline or footnoted) | E-E-A-T Authoritativeness signal | PARTIAL — some guides cite, many don't | medium | MEDIUM | Audit 16 guides; add 2-4 named external links per guide where claims justify |
| FAQ block on tool pages | "Tool sites fail because the site doesn't look like a publisher" — FAQ converts UI into editorial surface | PARTIAL — `FAQ` component exists; check coverage on home + pair pages | small | MEDIUM | Confirm every monetized route has ≥3 FAQ items with original answers |
| Search functionality across guides | Standard publisher affordance; reviewer scans for it | NO — no search box anywhere | medium | LOW-MEDIUM | Low priority for approval; defer unless cheap |
| Breadcrumbs with schema | Navigation depth + JSON-LD signal | YES (`Breadcrumbs/`, `BreadcrumbSchema`) | — | — | Already present |
| Custom 404 with `noindex` | Crawl-quality signal | YES (`NotFoundPage.jsx`) | — | — | Already present |
| Internal linking between guides ↔ pair pages ↔ converter | "Tools should link to guides; guides should link back to tools" — direct AdSense audit quote | PARTIAL | small | MEDIUM | Pass through guides + pair pages and ensure every page has 2-4 contextual internal links to a guide or pair page |
| Visible ad labelling separation from content | 2026 deceptive-layout enforcement | PARTIAL — `AdSlot` exists but verify the visual treatment includes "Advertisement" label or clear container | small | MEDIUM | Check `AdSlot.css` for clear ad container styling |

### Differentiators (lift "competent" toward "premium" in reviewer perception)

Features that separate the site from the long tail of utility sites and signal "real publisher." Not required for approval, but each one materially shifts the qualitative read.

| Feature | Value proposition | Has it now? | Complexity | AdSense impact | Notes |
|---------|-------------------|-------------|------------|----------------|-------|
| Glossary popovers for ~10-15 finance terms (mid-market, bid-ask, peg, REER, DXY, spread, float, etc.) | Demonstrates editorial depth at the surface where users actually read; cross-links guides | NO — confirmed sprint Phase 4 | medium | MEDIUM-HIGH | Already in scope. Each popover should link to the canonical guide section, not duplicate prose |
| Favorites / recently-used pairs strip | Repeat-visit signal; pattern XE/OANDA/Wise all use; shows the tool is built for users not crawlers | NO — confirmed sprint Phase 5 | medium | MEDIUM | Already in scope. localStorage-only, no auth — keep it that way (see Anti-Features) |
| Author hub page (single `/authors/<slug>` or `/about` author section with credentials) | Where bylines link to; E-E-A-T Authoritativeness target | NO | small | HIGH | Pairs with Phase 1; without it bylines look fake |
| AI-use disclosure statement | 2026-specific: AdSense and Quality Rater both call out unlabeled AI content as rejection trigger | NO | small | MEDIUM-HIGH | One paragraph in editorial standards: "AI tools may assist research; all published prose is human-written and human-reviewed" — only ship if honestly true |
| Per-guide "Reviewed by" line (separate from author) | YMYL Quality Rater explicitly cites "medical/legal/financial reviewer" bylines as strong E-E-A-T | NO | small | MEDIUM | Even if reviewer == author for now, the affordance is the point; add field to `guides.js` schema |
| Reading time on guide cards + guide pages | Already in `readingMinutes`; surface it consistently | PARTIAL — field exists in `guides.js`; verify rendering | small | LOW | Polish, not a needle-mover |
| "Updated" sort/filter on guides index | Editorial freshness affordance | NO | small | LOW | Skip unless trivial |
| Copy-to-clipboard share of a conversion (e.g. `?from=USD&to=EUR&amount=100`) | Increases dwell-time and looks like a real tool | PARTIAL — URL is part of route via `/:pair`; verify amount survives reload and that there's an explicit Copy button | small | LOW | Use existing `CurrencyCard` copy affordance; add `?amount=` query param parsing |
| Print-friendly CSS for guides | Polish signal; very cheap | NO | small | LOW | `@media print` rules in `guides.css` |
| Sticky in-page TOC on long guides | Editorial polish at desktop widths only — DO NOT make sticky on mobile (see Anti-Features) | NO | small-medium | LOW-MEDIUM | Improves dwell-time signal Google associates with quality |
| Related guides / "Read next" block at end of guide | Reduces bounce, signals editorial structure | PARTIAL — verify | small | MEDIUM | Confirm every guide ends with 2-3 related links to other guides |
| Schema markup for `FAQPage` + `HowTo` where appropriate | Direct E-E-A-T signal to Google's understanding | PARTIAL — `ArticleSchema`, `BreadcrumbSchema`, `CurrencyPairSchema` exist; check FAQ schema | small | MEDIUM | Add `FAQPage` JSON-LD wherever `FAQ` component renders |
| `WebSite` JSON-LD with `SearchAction` | Indicates a publisher-grade site to crawlers | PARTIAL — check `StructuredData.jsx` | small | LOW-MEDIUM | If a search page isn't built, omit `SearchAction` rather than fake it |
| Per-pair "Last verified" rate timestamp visible | Trust signal specific to finance utility | YES (probably via `RateDisclaimer`) | — | — | Confirm wording shows actual fetch timestamp, not just static text |
| Newsletter / RSS feed | Publisher affordance | NO | medium | LOW | Skip — adds compliance surface (CAN-SPAM, consent), not worth it pre-approval |

### Anti-Features (Deliberately NOT to build — would hurt approval, UX, or both)

These look tempting because peers/competitors offer them, but each one carries an AdSense or compliance penalty that outweighs the user benefit in the current 1-2 week window.

| Feature | Why requested | Why problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Sticky mobile bottom ad bar | Higher RPM in peer monetization guides | 2026 AdSense policy: sticky ads only allowed on desktop ≤300px, **explicitly disallowed on mobile**. A reviewer seeing this on a mobile pass = direct policy violation = approval killed | Keep ads in-content; rely on the existing lazy `AdSlot` placements |
| Auto-refreshing converter (live rates polling every Ns) | "Feels professional" | Inflates page-view count and looks like view-fraud to AdSense's invalid-traffic systems; reviewers also flag mismatch between disclaimer ("daily mid-market reference") and behaviour | Keep daily-cached fetch; surface a "Last updated: HH:MM UTC" timestamp instead |
| Historical rate charts | Peer parity (XE, OANDA, Wise have them) | Out of scope per PROJECT.md (5-7 days alone); shipping half-built during review = visible regression; needs API extension. Higher risk than reward for the in-flight review | Defer to v2; in the meantime, add a single static "30-day band" mention or skip entirely |
| Rate alerts (email/push) | Peer parity | Requires backend, auth, email-deliverability compliance (CAN-SPAM, GDPR ROPA); none of that is achievable in 1-2 weeks; half-shipped login flow during review is a serious negative signal | Defer; the "favorites strip" gives 80% of the perceived value with zero backend |
| Money-transfer comparison widgets / affiliate links | High RPM | Reviewer interprets as monetization-first intent ("MFA — made for AdSense"); also crosses into regulated financial-services advice without a license | Stay informational; never link transfer providers from converter or pair pages |
| Sign-up / login / user accounts | Enables favorites, alerts, history sync | Adds auth, password-reset, account-deletion, data-export surface (UK/EU GDPR Art. 15/17); reviewer-visible bug in account flow = direct rejection. Favorites work fine in localStorage | Keep localStorage-only persistence; explicitly mention "no account needed" |
| Interstitial / vignette ads | Peer monetization guides recommend | 2026 deceptive-layout enforcement; very high accidental-click rate; YMYL finance reviewers are stricter | Stick to in-content `AdSlot` only |
| AI chatbot "Ask about currencies" widget | 2026 trendy feature | Generates unverifiable YMYL finance claims = direct E-E-A-T penalty + AdSense content-quality flag; also can't be reviewed by a human editor at request-time | Use the existing guides; if FAQ coverage is thin, write more FAQ items by hand |
| Sponsored / paid-link sections, "Best forex broker" lists | High affiliate revenue | Reads as MFA the moment the reviewer sees it; also runs into FCA/SEC promotion rules for unlicensed sites | Don't add. If ever added later, gate behind a separate `/disclosure` page and clear `rel="sponsored"` |
| Currency news ticker scraped from feeds | "Looks like Bloomberg" | Scraped/syndicated content = duplicate-content penalty + originality flag; ages stale without a human curator | Defer; the 16 hand-written guides already serve the "real publisher" signal |
| Hreflang split into PT/EN parallel route trees | "SEO best practice" — peer pattern | Out of scope per PROJECT.md; breaks Google's bidirectional return-tag check that the single-URL strategy currently passes | Keep single-URL i18n with hreflang |
| Service-worker offline mode | "Modern PWA feature" | Stale rates shown offline = wrong information on a finance/YMYL site = E-E-A-T and disclaimer compliance risk | Skip until rates have a versioned schema |
| Inline social-share buttons with tracking pixels | Peer parity | Adds third-party scripts that fire before consent = AdSense + GDPR risk; also dilutes Web Vitals | Use existing native `navigator.share()` if anything, no third-party widgets |

## Feature Dependencies

```
Author byline (Phase 1)
    └──requires──> Author hub / bio page  (where the byline links)
                        └──requires──> "Reviewed by" field schema in guides.js

Editorial standards page (Phase 1)
    └──enhances──> Author byline credibility
    └──enhances──> Methodology page
    └──contains──> AI-use disclosure
    └──contains──> Corrections policy

Last reviewed date (Phase 1)
    └──requires──> Render of guides.js `updated` field
    └──enhances──> ArticleSchema `dateModified`

Glossary popovers (Phase 4)
    └──requires──> 10-15 glossary entries (data layer)
    └──enhances──> Guide pages, methodology page, pair pages
    └──cross-links──> Existing guides (popover "Read more" target)

Favorites / recently used (Phase 5)
    └──requires──> 6th localStorage key with migration strategy (per CONCERNS.md)
    └──conflicts──> Server-side persistence (anti-feature)
    └──conflicts──> User accounts (anti-feature)

FAQPage JSON-LD
    └──requires──> FAQ component already mounted on the route
    └──enhances──> E-E-A-T surface, rich-result eligibility

Internal linking audit
    └──enhances──> "Tool is part of a real resource" signal
    └──independent of──> all other phases (do it once across the codebase)
```

### Dependency notes

- **Bylines need a destination.** Shipping author names without a `/about` author block or per-author page is worse than no byline — it reads as fabricated. Sequence the destination before or with the byline rollout.
- **Editorial standards + corrections + AI-use are one page, not three.** Bundle into `/editorial-standards` or extend `/methodology`. Three thin pages is worse than one substantive page.
- **Last-reviewed date is two changes, not one.** Render the date visibly AND emit it as `dateModified` in `ArticleSchema`. The visible date without the schema half-wastes the signal.
- **Glossary popovers depend on 10-15 entries actually being written before the component ships.** Don't merge the component with placeholder definitions; reviewer landing on an empty popover is worse than no popover.
- **Favorites needs schema-versioning thought.** Per `CONCERNS.md`, adding a 6th localStorage key without versioning compounds existing drift risk. Wrap in a `{ v: 1, data: ... }` envelope.

## MVP Definition (Approval-Window-Scoped)

### Launch with (this sprint — locked in PROJECT.md Active section)

Five phases already committed. This research validates all five and adds priorities for items inside each phase.

- [ ] **Editorial trust signals (Phase 1)** — bylines + last-reviewed dates + editorial standards page + AI-use disclosure. HIGH impact, small-medium effort each. **This is the single highest-leverage phase for AdSense approval.**
- [ ] **UX polish (Phase 2)** — mobile breakpoint audit is the AdSense-critical sub-task because reviewers simulate mobile first.
- [ ] **Performance / Core Web Vitals (Phase 3)** — 2026 guidance treats CWV as an AdSense approval input, not just a ranking factor.
- [ ] **Glossary popovers (Phase 4)** — medium effort, medium-high reviewer impact (depth signal).
- [ ] **Favorites / recently-used (Phase 5)** — medium effort, medium impact (publisher-grade affordance).

### Squeeze-in candidates (small, high-leverage, not yet in Active)

Each is <1 day and reinforces an already-in-flight phase. Sequence opportunistically inside the existing five phases rather than as new phases.

- [ ] **Render `updated` date on guide pages + add to `ArticleSchema.dateModified`** — small, HIGH impact, sits inside Phase 1
- [ ] **Author hub / `/about` author block** — small, HIGH impact, prerequisite for Phase 1 bylines
- [ ] **Editorial standards / corrections / AI-use page** (single page) — small, HIGH impact, Phase 1
- [ ] **FAQPage JSON-LD wherever `FAQ` mounts** — small, MEDIUM impact, sits inside Phase 2 or Phase 3
- [ ] **Internal linking audit (guides ↔ pair pages ↔ converter)** — small-medium, MEDIUM impact, Phase 1 polish
- [ ] **Reviewed-by field in `guides.js` schema** (even if reviewer == author initially) — small, MEDIUM impact, Phase 1

### Add after approval (v1.x)

- [ ] **Per-author pages** — once bylines exist, expand a single author block into individual author pages with credential lists, social verification, and topical authority claims
- [ ] **Source-citation audit across all 16 guides** — add 2-4 external authoritative citations per guide where claims justify (IMF, BIS, ECB, Fed releases)
- [ ] **Print-friendly CSS** — polish, after approval pressure eases
- [ ] **Sticky in-page TOC on long guides (desktop only)** — dwell-time signal
- [ ] **Reading-time sort/filter on guides index** — editorial affordance

### Future consideration (v2+ — defer indefinitely or until specific trigger)

- [ ] **Historical rate charts** — defer per PROJECT.md; trigger = API extension + 5-7 days budget available
- [ ] **Currency search overhaul** — defer per PROJECT.md; trigger = user feedback signals dropdown is friction
- [ ] **Rate alerts** — defer; trigger = post-approval, post-monetization, and only with a real backend + email compliance plan
- [ ] **Money-transfer affiliate integrations** — defer; trigger = licensed business entity in place and post-approval AdSense stable for 3+ months
- [ ] **Newsletter / RSS** — defer; trigger = >10K monthly visitors and a real editorial cadence to feed it
- [ ] **Sign-up / accounts** — defer indefinitely; current localStorage approach is strictly better for approval

## Feature Prioritization Matrix

Scoped to features **not yet shipped** and relevant to the approval window. Ordered by Priority then by AdSense impact.

| Feature | User value | Implementation cost | AdSense impact | Priority |
|---------|------------|---------------------|----------------|----------|
| Render `updated` date + `ArticleSchema.dateModified` on guides | LOW (users) / HIGH (reviewers) | LOW | HIGH | **P1** |
| Author bylines + `/about` author block | LOW (users) / HIGH (reviewers) | LOW-MEDIUM | HIGH | **P1** (Phase 1) |
| Editorial standards / corrections / AI-use page | LOW (users) / HIGH (reviewers) | LOW | HIGH | **P1** |
| Mobile breakpoint audit + fixes | HIGH | MEDIUM | HIGH | **P1** (Phase 2) |
| Code-split bundle / CWV improvements | MEDIUM | MEDIUM | HIGH | **P1** (Phase 3) |
| FAQPage JSON-LD on every page with FAQ | LOW | LOW | MEDIUM | P2 |
| Internal linking audit | MEDIUM | LOW-MEDIUM | MEDIUM | P2 |
| Glossary popovers | MEDIUM | MEDIUM | MEDIUM-HIGH | **P1** (Phase 4) |
| Favorites / recently-used pairs | MEDIUM-HIGH | MEDIUM | MEDIUM | **P1** (Phase 5) |
| Reviewed-by field in `guides.js` | LOW (users) / MEDIUM (reviewers) | LOW | MEDIUM | P2 |
| Source-citation audit on existing guides | MEDIUM | MEDIUM | MEDIUM | P2 |
| Reading-time on cards/pages | LOW | LOW | LOW | P3 |
| Sticky desktop TOC | MEDIUM | LOW-MEDIUM | LOW-MEDIUM | P3 |
| Print CSS for guides | LOW | LOW | LOW | P3 |
| Site search | MEDIUM | MEDIUM | LOW-MEDIUM | P3 |
| Auto-refresh rates | NEGATIVE | — | NEGATIVE | **Don't build** |
| Sticky mobile ad bar | NEGATIVE | — | NEGATIVE (policy violation) | **Don't build** |
| AI chatbot for currency questions | NEGATIVE | — | NEGATIVE (YMYL) | **Don't build** |
| Email rate alerts | LOW (without auth) | HIGH | NEUTRAL or NEGATIVE | **Don't build** (defer to v2) |
| Affiliate transfer-provider widgets | NEGATIVE | — | NEGATIVE (MFA flag) | **Don't build** |

**Priority key:**
- **P1** — Must ship in the 1-2 week window. Highest leverage on approval odds.
- **P2** — Squeeze in opportunistically; each is small and reinforces a P1 phase.
- **P3** — Nice-to-have, defer to post-approval polish sprint.

## Competitor Feature Analysis

Approved competitors operating in the same niche, sampled for what the AdSense reviewer corpus has already seen and accepted as "normal."

| Feature | XE.com | OANDA | Wise | ExchangeRates.com | Our approach |
|---------|--------|-------|------|-------------------|--------------|
| Number of currencies | 220+ | 190+ | 130+ | 100+ | 21 (deliberately curated — call this out as "major world currencies" on home) |
| Historical charts | Up to 10y | Back to 1990 | 5y | Limited | **Defer to v2** (out of scope) |
| Rate alerts | Free email | Yes | Yes | No | **Defer** (no auth in scope) |
| Mobile apps | iOS + Android | iOS + Android | iOS + Android | Web only | Web only (no scope to ship apps) |
| Glossary / educational content | Limited | Limited | Yes (Wise Hub) | Yes (dedicated `/glossary`) | 16 guides + glossary popovers in flight |
| API access | Paid | Paid | Limited | Free tier | Out of scope |
| Favorites / recent pairs | Yes (in-app) | Yes | Yes | Limited | localStorage strip — in flight |
| Author bylines on educational content | No (corporate) | No (corporate) | Yes (Wise Hub) | No | **Adding** — differentiator for independent site |
| Editorial standards page | No | No | Yes | No | **Adding** — differentiator |
| Last-reviewed date on educational content | Sometimes | No | Yes | No | **Adding** — differentiator |
| Methodology / data-source page | No public page | Linked | Linked | No | **Have it** — strength relative to peers |
| Cookie consent gating ads | Yes | Yes | Yes | Yes | **Have it** — best-practice parity |
| Sticky mobile ad bar | No | No | No | Some | **Don't build** — policy risk |
| Affiliate transfer links | Self (Xe transfer) | Self (FX brokerage) | Self (Wise transfer) | Yes (mixed) | **Don't build** — not licensed |

Key observation: the corporate competitors (XE, OANDA) don't carry bylines or editorial-standards pages because their corporate domain authority substitutes for E-E-A-T. An **independent** site like currencyabout.com cannot rely on that substitute and needs the bylines + editorial standards explicitly. This is exactly why Phase 1 is the highest-leverage phase.

## Risks and Open Questions

- **Authorship credibility.** Bylines without verifiable credentials (LinkedIn, finance/economics background, prior publication) on YMYL finance content can read as performative. Question to resolve before Phase 1 lands: which real person is the byline? An invented persona is worse than no byline.
- **AI-use disclosure honesty.** If any guide prose was AI-drafted, the disclosure must say so accurately. A false "human-written" claim that a reviewer notices is a much worse signal than a transparent "AI-assisted, human-reviewed" claim.
- **Schema-versioning for localStorage.** Five keys exist; favorites makes six. Per `CONCERNS.md` there's no migration strategy. The risk is small now but compounds.
- **Sitemap drift.** Hand-maintained `public/sitemap.xml` — any new page added (author hub, editorial standards) needs sitemap entries; missing entries dilute the "complete site" signal.
- **Mobile-first review.** 2026 guidance is explicit that reviewers simulate mobile first. Phase 2's mobile audit is therefore on the critical path, not nice-to-have.
- **Glossary popovers UX risk.** On mobile, popovers must not cover the underlying text indefinitely; misuse here turns a depth signal into a deceptive-layout flag. Tap-outside-to-close is mandatory.

## Sources

### Google official guidance

- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)
- [Ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en)
- [Ad formats FAQ](https://support.google.com/adsense/answer/10734935?hl=en)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [AdSense policy change log](https://support.google.com/adsense/answer/9336650?hl=en)
- [Your AdSense account wasn't approved](https://support.google.com/adsense/answer/81904?hl=en)

### 2026 AdSense approval guidance

- [Google AdSense Approval Requirements 2026 — webtimizesolutions](https://webtimizesolutions.com/blog/google-adsense-approval-guide-2026-complete-genuine-updated-information/)
- [AdSense Approval 2026 9-Step Checklist — Stacked Buddy](https://www.stackedbuddy.com/google-adsense-approval-checklist/)
- [Google AdSense Program Policies 2026 Compliance Checklist — WPThemeLabs](https://www.wpthemelabs.com/adsense-program-policies-compliance-checklist/)
- [AdSense Approval Checklist 2026 — Blogerhub](https://blogerhub.com/adsense-approval-checklist-for-2026-step-by-step-for-new-blogs/)
- [AdSense for Tool & Utility Websites: How to Get Approved in 2026 — AdSenseAudit](https://adsenseaudit.net/adSense-tool-websites)
- [Google AdSense Updates 2026 — tempemailnow](https://news.tempemailnow.com/google-adsense-updates-2026/)
- [How to Fix AdSense Low Value Content Rejection 2026 — Adstimate](https://adstimate.com/blog/low-value-content-fix.html)
- [AdSense Invalid Traffic in 2026 — Prodigy AI Tools](https://prodigyaitools.de/adsense-invalid-traffic-2026/)
- [AdSense and Core Web Vitals — Just Publishing Advice](https://justpublishingadvice.com/adsense-and-core-web-vitals/)

### E-E-A-T / YMYL finance guidance (2026)

- [YMYL Content Guidelines: Complete Guide for 2026 — Koanthic](https://koanthic.com/en/ymyl-content-guidelines-complete-guide-for-2026/)
- [Google E-E-A-T Guide 2026 — LinkBuilder](https://linkbuilder.com/blog/google-eeat-guide)
- [Google E-E-A-T Guidelines 2026 Playbook — Keywords Everywhere](https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/)
- [E-E-A-T Ultimate Guide 2026 — seo-kreativ](https://www.seo-kreativ.de/en/blog/e-e-a-t-guide-for-more-trust-and-top-rankings/)

### Competitor feature inventories

- [XE Currency Converter](https://www.xe.com/currencyconverter/)
- [OANDA Currency Converter](https://www.oanda.com/currency-converter/en/)
- [Wise Currency Converter](https://wise.com/us/currency-converter/)
- [ExchangeRates.com Glossary](https://www.exchangerates.com/glossary/)
- [Best Currency Converters comparison — BuckRates](https://www.buckrates.com/guides/best-currency-converters.html)

### Trust signal patterns

- [Expressing Trust and Credibility Information in IPTC Standards](https://iptc.org/std/guidelines/trust-and-credibility/)
- [Washington Post Policies and Standards](https://www.washingtonpost.com/policies-and-standards/)
- [Beinsure Editorial Policy, Fact-Checking and Standards](https://beinsure.com/editorial-policy/)

### Internal references

- `.planning/codebase/STRUCTURE.md` — verified current file layout
- `.planning/codebase/CONCERNS.md` — localStorage schema-versioning concern relevant to favorites
- `.planning/PROJECT.md` — sprint scope, locked decisions, out-of-scope deferrals
- `src/content/guides.js` — confirmed `updated` field present, no `author` / `reviewedBy` fields
- `src/pages/legal/MethodologyPage.jsx` — existing methodology page to extend or pair with editorial standards
- `src/App.jsx` — current route map; no `/authors` or `/editorial-standards` route

---
*Feature research for: currencyabout.com — AdSense approval reinforcement sprint*
*Researched: 2026-05-19*
