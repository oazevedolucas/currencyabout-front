# Project Research Summary

**Project:** currencyabout.com Sprint 1 — AdSense Approval Reinforcement
**Domain:** Free currency-converter / finance-utility SPA (YMYL finance), AdSense application in active review (<7 days old)
**Researched:** 2026-05-19
**Confidence:** HIGH

## Executive Summary

This sprint is a 1–2 week reinforcement pass on an existing React 19 + Vite SPA whose AdSense application is mid-review. The job is not greenfield product work; it is to maximize the reviewer's perception of editorial depth, technical polish, and policy compliance during a window where every commit is publicly crawlable and a half-shipped feature can directly cause rejection (PITFALLS.md, Pitfall 2). The five-phase scope (E-E-A-T, UX polish, performance, glossary, favorites) was locked in PROJECT.md and is validated by all four research documents — no scope rewrites are recommended.

The single highest-leverage axis is **editorial trust signals (E-E-A-T)**: FEATURES.md identifies bylines + visible "Last reviewed" date + editorial standards / corrections / AI-disclosure page as three P1 additions that together convert the site from "competent utility" into "real publisher with named accountability," which is exactly the bar a 2026 YMYL-finance reviewer applies. STACK.md confirms the entire feature surface (glossary popovers via native Popover API, favorites via versioned localStorage, code-splitting via `React.lazy`, E-E-A-T components, CWV measurement, a11y) can ship **with zero net new runtime dependencies**, matching the PROJECT.md constraint. ARCHITECTURE.md provides a six-pattern build plan that ships E-E-A-T first (content-only, no risk), then performance + reserved-height ads, then glossary, then favorites — sequenced so no intermediate commit leaves a visible regression in front of the reviewer.

The asymmetric risk is **Pitfall 3 (SPA crawler-blindness)**: if Googlebot / the AdSense pre-screen crawler receives an empty `<div id="root">` for `/`, `/guides/...`, or `/:pair` pages, every other improvement in this sprint is wasted. This must be verified before phase work begins; if `curl -A "Googlebot" https://currencyabout.com/` returns no editorial body text, the sprint pivots to fixing SSG/prerender before anything else.

## Key Findings

### Recommended Stack

Stay on the fixed stack (React 19 + Vite 6 + react-router-dom v7 + react-helmet-async, plain JS, plain CSS, no TS, no ESLint, no test runner). All six new capabilities in scope ship as either custom utilities or platform-native APIs — see `STACK.md` for the per-capability rationale. Zero net new runtime dependencies is achievable for the sprint.

**Core technologies (already fixed — do not re-evaluate):**
- React 19.1.0 — UI runtime
- Vite 6.3.1 — build tool
- react-router-dom 7.13.2 — routing
- react-helmet-async 3.0.0 — `<head>` management

**New capabilities (recommended approach per STACK.md):**
- Glossary popovers — **native HTML Popover API + CSS Anchor Positioning** (zero deps, Baseline 2026)
- Favorites + schema versioning — **hand-rolled ~40-LOC `readVersioned`/`writeVersioned` util** in `src/services/storage.js`; key `currencyabout_pairs_v1` from day one
- Code-splitting — **`React.lazy` per route + minimal `manualChunks`** for react / react-router / helmet vendor chunks; lazy `src/content/guides.js`
- E-E-A-T components — `<AuthorByline>`, `<LastReviewed>`, `<SourceCitations>` + extend existing `ArticleSchema` JSON-LD with `author` + `datePublished` + `dateModified`; new `src/content/authors.js`
- Core Web Vitals measurement — **Chrome DevTools + PageSpeed Insights** first; `web-vitals@^5.2.0` as a `devDependency` only if Phase 3 needs INP attribution
- Accessibility audit — **axe DevTools extension + Lighthouse + manual keyboard / screen-reader pass** (no `eslint-plugin-jsx-a11y` this sprint)

### Expected Features

Five Active phases in PROJECT.md are validated by FEATURES.md as the right scope. FEATURES.md surfaces **three small P1 squeeze-ins that materially strengthen Phase 1** and are all <1 day of work each.

**Must have (table stakes — already present, must NOT break):**
- Privacy / Terms / About / Contact / Methodology pages, `ads.txt`, `sitemap.xml`, cookie consent gating AdSense, `RateDisclaimer` on rate-displaying pages, breadcrumbs + JSON-LD, custom `noindex` 404 — all existing per PROJECT.md Validated section.

**Three P1 squeeze-ins inside Phase 1 (FEATURES.md, MVP Definition):**
- **Render `updated` field as visible "Last reviewed YYYY-MM-DD"** on guide pages + add to `ArticleSchema.dateModified` — small, HIGH impact, sits inside Phase 1. Field already exists in `src/content/guides.js` but is not surfaced.
- **Build the author hub destination** — bylines without a destination read fake. Either a `/about` author block or a dedicated `/authors/<slug>` route; ship before or with the byline rollout. `src/content/authors.js` is the single source of truth for visible byline + `Person` JSON-LD.
- **Add editorial-standards / corrections / AI-disclosure page** — one substantive page (e.g. `/editorial-standards` or merged into `/methodology`), not three thin ones. AI-disclosure paragraph must be honest about whether AI assisted research.

**Differentiators (in Active scope):**
- Glossary popovers for ~10–15 finance terms (Phase 4)
- Favorites / recently-used pairs strip (Phase 5)

**Defer (v2+ per PROJECT.md Out of Scope):**
- Historical rate charts, currency search overhaul, rate alerts, money-transfer affiliates, sign-up / accounts, AI chatbot, full visual rebrand, PT/EN parallel route trees, ESLint adoption, test framework, true HTTP 404 via Worker.

**Anti-features that MUST NOT be added during the review window (FEATURES.md + PITFALLS.md):**
- **Sticky mobile bottom ad bar** — explicit 2026 policy violation; direct rejection trigger.
- **AI chatbot for currency questions** — generates unverifiable YMYL claims; direct E-E-A-T penalty.
- **Auto-refreshing rates polling** — view-fraud signal + disclaimer mismatch.
- **Money-transfer comparison / affiliate widgets** — reads as MFA ("made for AdSense"); also unlicensed financial promotion.
- **Interstitial / vignette ads, sponsored "best broker" lists** — deceptive-layout / MFA flags.
- **Sign-up / accounts to enable favorites** — adds GDPR surface; localStorage is strictly better for approval.
- **Currency news ticker** scraped from feeds — duplicate content.
- **Service-worker offline mode** — stale rates = YMYL harm.

### Architecture Approach

Six patterns from ARCHITECTURE.md, sequenced per phase. No SSR, no prerender this sprint (Pattern 5 explicitly says don't), no new Context providers. Eager bundle stays minimal (Layout + HomePage + converter hooks); everything else is lazy.

**Major components / changes:**
1. **`src/App.jsx` (modify)** — convert every page import except `HomePage` to `React.lazy`; wrap `<Routes>` in a single `<Suspense fallback={<RouteFallback/>}>`.
2. **`vite.config.js` (modify)** — add `manualChunks` for react / react-router / helmet vendor splits.
3. **`AdSlot` (modify)** — always reserve `min-height` from first paint via a `AD_SLOTS_HEIGHTS` map; render `<ins>` conditionally inside. Eliminates CLS at consent-grant time.
4. **`src/seo/StructuredData.jsx` (modify)** — add `PersonSchema`, extend `ArticleSchema` with `author` + `datePublished` + `dateModified` + `publisher`; add `FinancialProduct`/`CurrencyConversionService` to home and indexable pair pages.
5. **`BylineMeta`, `RouteFallback`, `GlossaryPopover` + `GlossaryTerm`, `FavoritesStrip` (new)** — all small, plain-CSS, no deps.
6. **`src/content/authors.js` and `src/content/glossary.js` (new)** — follow the existing "editorial data as code" pattern of `guides.js`.

### Critical Pitfalls

PITFALLS.md surfaces 10 pitfalls. Five are pre-conditions or cross-cutting and need explicit handling in the roadmap:

1. **Pitfall 3 — SPA crawler-blindness (PRE-PHASE-1 VERIFICATION).** Verify Googlebot sees real body text on `/`, `/guides/:slug`, `/:pair`. Run `curl -A "Googlebot" https://currencyabout.com/` and `curl -s https://currencyabout.com/usd-to-eur | grep -i 'euro\|dollar'`. If body has no editorial text, the sprint pivots — every other phase is wasted until this is fixed. The `<noscript>` fallback in `index.html` must contain real editorial content per ARCHITECTURE.md Pattern 5.
2. **Pitfall 2 — Substantive structural changes during the active review window.** Every phase must be additive-only: no removals of existing pages, no renames of existing routes, no nav links to not-yet-deployed pages, no `Coming soon` stubs. New routes must launch with full content + nav link + sitemap entry + internal links in a single deploy.
3. **Pitfall 1 — Tool-only thin utility rejection.** Every indexable pair page must carry unique editorial (≥150 word pair-specific paragraph, no templated copy). Audit existing `noindex` coverage from commit `7e45b0a` — make sure ALL thin pairs are excluded, not a sample. Sits inside the Phase 1 editorial pass.
4. **Pitfall 4 — Lazy-loading the AdSense loader script itself.** Keep `adsbygoogle.js` async (not deferred, not user-gesture-gated). The consent-gated loader from commit `d380c89` is acceptable IF consent default is fast. Lazy-load *slots* via `data-loading-strategy="lazy"` or the existing IntersectionObserver pattern; never the loader. Watch for this regression in Phase 3.
5. **Pitfall 8 — Above-the-fold ad density on mobile.** Hard rule: zero ads in the first viewport on mobile (375x667). Verify with a real device or emulator screenshot. The existing placement is one ad on home and is below the converter — confirm it stays there in Phase 2's mobile audit.

Plus three pitfalls that are scoped tightly inside individual phases:

- **Pitfall 5 — Glossary popover CLS / WCAG 1.4.13.** Click-only triggers (no hover); single popover instance in `Layout`; `role="dialog"` + `aria-labelledby`; CLS-safe positioning. Phase 4.
- **Pitfall 6 — Favorites mimicking ads / empty-state.** Visually distinct from ad cards; "Saved by you" label (never "Featured" or "Recommended"); informative empty state with a content-rich CTA; route `noindex` if a `/favorites` page is added. Phase 5.
- **Pitfall 9 + 10 — Navigation rot + cookie banner blocking content.** Link-check production before each phase merges. Cookie banner must remain non-blocking (Phase 2 visual audit).

## Implications for Roadmap

### Phase 0 (PRE-PHASE-1 GATE — NOT A PHASE, but blocks the roadmap)
**Rationale:** Pitfall 3 (SPA crawler-blindness) would invalidate every other improvement. Verify before any sprint work begins.
**Delivers:** Confidence that Googlebot sees real editorial content on `/`, `/guides/:slug`, and `/:pair` pages.
**Verification steps:**
- `curl -A "Googlebot" https://currencyabout.com/ | grep -i 'convert\|currency\|rate'` — must return body text matches.
- `curl -s https://currencyabout.com/usd-to-eur | grep -i 'euro\|dollar'` — must return body text matches.
- Google Search Console URL Inspection on `/`, one guide, one indexable pair page → "Rendered HTML" tab shows full editorial body.
- The `<noscript>` block in `index.html` must contain real editorial content, not placeholder.

**If this gate fails:** Pause Phases 1–5 and add a prerender/SSG remediation phase (vite-plugin-prerender or migrate to Astro/SSG). PITFALLS.md Recovery Strategies estimates this as MEDIUM-HIGH effort. This was explicitly noted by FEATURES.md / ARCHITECTURE.md as the asymmetric-risk question.

### Phase 1: Editorial trust signals (E-E-A-T)
**Rationale:** Highest-leverage phase for AdSense approval (FEATURES.md, MVP Definition). Pure content + small components — zero performance impact, zero structural risk during the review window (ARCHITECTURE.md, Build Order, Phase 1). Ships first.
**Delivers:**
- `src/content/authors.js` — single source of truth for `Person` JSON-LD + visible bylines.
- `<BylineMeta>` component visible on every guide and methodology page (author name + role + link to author hub).
- **Render `updated` field as visible "Last reviewed YYYY-MM-DD"** on every guide; add to `ArticleSchema.dateModified` (P1 squeeze-in #1).
- **Author hub destination** — `/about` author block or `/authors/<slug>` route (P1 squeeze-in #2). Visible bio + expertise statement.
- **`/editorial-standards` page** (or merged into `/methodology`) covering fact-check process, corrections policy, AI-use disclosure (P1 squeeze-in #3).
- Extend `ArticleSchema` JSON-LD with `author` + `datePublished` + `dateModified` + `publisher` (ARCHITECTURE.md, Pattern 6).
- Add `FinancialProduct` / `CurrencyConversionService` JSON-LD on home and indexable pair pages.
- Pair-page editorial uniqueness pass — verify each indexable pair has ≥150 unique words; thin pairs stay `noindex` (PITFALLS.md, Pitfall 1).
- Optional P2: `reviewedBy` field added to `guides.js` schema (even if reviewer == author for now).
- Optional P2: `FAQPage` JSON-LD wherever `FAQ` component already mounts.
- Optional P2: Internal linking audit — every page links to ≥2 contextual guides/pair pages.

**Addresses:** FEATURES.md Table Stakes (byline, last-reviewed, editorial standards), Pitfall 1 (thin pair-page editorial), Pitfall 7 (missing E-E-A-T signals).
**Avoids:** Shipping bylines without a destination (FEATURES.md dependency note: "bylines without `/about` block read as fabricated").

### Phase 2: UX polish + cookie banner / mobile / a11y
**Rationale:** Reviewers simulate mobile first (FEATURES.md, "Reviewer model"); mobile-breakpoint debt is on the critical path. Cookie banner must not block content (Pitfall 10). Can ship in parallel with Phase 1 or right after — touches existing components, no DOM restructuring.
**Delivers:**
- Mobile breakpoint audit + fixes on home / guide / pair / legal pages (375x667 baseline).
- Verify cookie banner is non-blocking bottom-corner, never overlaps converter on mobile, content visible without dismissal, "Reject all" is as prominent as "Accept all" (PITFALLS.md, Pitfall 10).
- Mobile above-fold ad density check — confirm 0 ads in first viewport at 375x667 (PITFALLS.md, Pitfall 8).
- axe DevTools + Lighthouse a11y scan + manual keyboard + VoiceOver pass on home, one guide, one pair, exchange-rates-today, methodology, cookie banner (STACK.md, capability 6).
- Visual consistency tightening (spacing, hierarchy, dark-mode quality, focus rings, contrast, `aria-*` correctness).
- Link checker pass on production — zero 404s, zero redirect chains > 1 hop (PITFALLS.md, Pitfall 9).
- No new dependencies. No rebrand.

**Avoids:** Pitfalls 8, 9, 10.

### Phase 3: Performance + Core Web Vitals
**Rationale:** 2026 guidance treats CWV as an AdSense approval input, not just a ranking factor. >500 KB bundle warning from `vite build` documented in `CONCERNS.md`. Must ship AFTER Phase 1 so the lazy-route split captures the heavier `guides.js` (now carrying byline metadata) — doing Phase 3 first would just be redone (ARCHITECTURE.md, Build Order, Phase 3).
**Delivers:**
- `React.lazy` per route in `src/App.jsx`, single `<Suspense fallback={<RouteFallback/>}>` (ARCHITECTURE.md, Pattern 1). Keep `HomePage` + `Layout` + `useCurrencyConverter` + `useExchangeRates` eager (LCP-critical — ARCHITECTURE.md, Anti-Pattern 3).
- Lazy-load `src/content/guides.js` on the matched guide route specifically (STACK.md, capability 3).
- `manualChunks` in `vite.config.js` for react / react-router / helmet vendor splits.
- Reserved `min-height` on `AdSlot` from first paint via `AD_SLOTS_HEIGHTS` map (ARCHITECTURE.md, Pattern 4) — eliminates CLS at consent-grant time.
- Optional critical-CSS inline in `index.html` (ARCHITECTURE.md, Pattern 2) — defer if budget tight, the bundle split is the bigger win.
- Validate LCP / CLS / INP in "Good" range on mobile via Chrome DevTools + PageSpeed Insights. Add `web-vitals@^5.2.0` as a `devDependency` only if INP attribution is needed (STACK.md, capability 5).
- **DO NOT** lazy-load `adsbygoogle.js` itself (PITFALLS.md, Pitfall 4) — keep `async`.
- **DO NOT** add `vite-plugin-prerender` / `prerender-spa-ultra` / Vike (ARCHITECTURE.md, Pattern 5 + Anti-Pattern 6).
- **DO NOT** add Sentry, Datadog RUM, GA4 RUM, or any third-party RUM beacon during the review window (STACK.md).

**Addresses:** `CONCERNS.md` >500 KB bundle. Pitfall 4 (AdSense loader stays async). Site-wide CWV aggregation per March 2026 update.

### Phase 4: Glossary popovers
**Rationale:** Ships AFTER Phase 3 because the glossary mounts in `Layout` and adds ~2 KB to the eager bundle; measure impact against a known-good baseline. Also lets glossary terms cross-link into the new author hub / editorial standards from Phase 1 without rebuilding.
**Delivers:**
- `src/content/glossary.js` — 10–15 finance terms (`mid-market`, `bid-ask`, `spread`, `REER`, `DXY`, `peg`, `float`, etc.) with `{term, short, longGuideSlug}`.
- `<GlossaryTerm>` inline trigger (`<button popovertarget="glossary-popover" data-term="...">`) — click/Enter/Space only, no hover (PITFALLS.md, Pitfall 5; ARCHITECTURE.md, Anti-Pattern 2).
- Single `<GlossaryPopover>` instance mounted in `Layout` (ARCHITECTURE.md, Anti-Pattern 5: avoid one popover per term).
- Native HTML Popover API + `role="dialog"` + `aria-labelledby` + Escape/light-dismiss handled by browser (STACK.md, capability 1; ARCHITECTURE.md, Pattern 3).
- CSS Anchor Positioning with `@position-try` fallback; `@supports` progressive enhancement for older Safari.
- WCAG 2.2 SC 1.4.13 verification: dismissible, hoverable (only relevant if hover used — it isn't), persistent.
- Lighthouse CLS < 0.1 on guide pages with popover open. Verify popover does not cover converter or primary CTA at 375px.
- 10–15 entries must be **fully written before merging** — never ship the component with placeholder definitions (FEATURES.md dependency note).
- "Read more" link in each popover targets the canonical guide section, not duplicate prose.

**Addresses:** FEATURES.md Differentiator (glossary popovers). PITFALLS.md Pitfall 5.

### Phase 5: Favorites / recently used pairs
**Rationale:** Ships last. Smallest reviewer impact, depends on nothing else. Storage versioning must be baked in from day one to address `CONCERNS.md` migration debt.
**Delivers:**
- `src/services/storage.js` — ~40-LOC `readVersioned` / `writeVersioned` wrapper (STACK.md, capability 2).
- `useFavorites()` hook + new localStorage key `currencyabout_pairs_v1` with schema `{ v: 1, data: { pairs: [{from, to, addedAt}], pinned: [...] } }`.
- `<FavoritesStrip>` on home page and `/exchange-rates-today` — hidden when empty (never reserves vertical space speculatively).
- **Empty-state content-rich CTA** when no favorites yet (PITFALLS.md, Pitfall 6): a paragraph explaining what favorites do + suggested pairs with editorial blurb, not a blank box.
- Visually distinct from ad cards — different border / background, explicit "Your saved pairs" header, never sized like 300x250 or 336x280 (PITFALLS.md, Pitfall 6).
- Star button has `aria-label="Save USD to EUR to favorites"` with toggled state announced.
- If a `/favorites` route is added, it carries `noindex`. Recommended: no separate route — just the strip.
- No backend, no auth, no server-side persistence (FEATURES.md anti-features).

**Addresses:** FEATURES.md Differentiator (favorites/recent pairs). PITFALLS.md Pitfall 6. `CONCERNS.md` schema-versioning gap.

### Phase Ordering Rationale

- **Phase 0 (verification gate) first** because Pitfall 3 (SPA crawler-blindness) would invalidate every other phase.
- **Phase 1 (E-E-A-T) first among delivery phases** because pure content additions are zero-risk during the active review window (ARCHITECTURE.md Pattern 6 + Build Order); they ship reviewer-visible value immediately; and they create the content that Phase 3's lazy-loading needs to optimize. FEATURES.md identifies this as the single highest-leverage phase.
- **Phase 2 (UX polish) parallel or immediately after Phase 1** because reviewers simulate mobile first; mobile breakpoint / cookie-banner / a11y issues are reviewer-visible.
- **Phase 3 (performance) after Phase 1** so the route split captures the heavier guide content that Phase 1 added (ARCHITECTURE.md, Build Order). Reserved-height `AdSlot` is grouped here because it's a CWV/CLS fix.
- **Phase 4 (glossary) after Phase 3** so the impact of mounting a popover in `Layout` is measured against a known-good baseline post-split.
- **Phase 5 (favorites) last** because it has the smallest reviewer impact and depends on no other phase; the empty-state design and storage versioning must be done up-front before merging.

### Conflicts and Resolutions

- **Conflict: ARCHITECTURE.md says "ship E-E-A-T first" vs PITFALLS.md says "verify SPA crawl first."** Resolution: PITFALLS Pitfall 3 takes precedence as a verification gate (not a phase). It's a 15-minute `curl` check, not a feature — run it before Phase 1 starts. If it passes, ARCHITECTURE.md's Phase 1 ordering stands. If it fails, the roadmap is rewritten.
- **Conflict: PROJECT.md says "no new runtime dependencies" vs STACK.md offers `web-vitals@^5.2.0`.** Resolution: `web-vitals` is downgraded to a conditional `devDependency` only added if Phase 3 needs INP attribution — never shipped to production. Default path uses Chrome DevTools + PageSpeed Insights.
- **Conflict: FEATURES.md lists "site search" as a publisher affordance vs scope constraints.** Resolution: deferred to v2 — low AdSense impact, not worth the implementation cost during the review window.
- **No conflict: glossary popover and code-splitting both touch `Layout`** but in additive ways — popover mounts once; the split is route-level. Sequencing (Phase 4 after Phase 3) resolves any measurement ambiguity.

### Research Flags

Phases likely needing deeper research during planning:
- **None.** The four research documents (STACK, FEATURES, ARCHITECTURE, PITFALLS) cover every active phase. The remaining unknowns are user decisions, not research gaps (see Open Questions below).

Phases with standard patterns (skip further research):
- **All five.** Each phase has prescriptive guidance from at least three of the four research documents.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All capabilities verified against 2026 sources; zero-dep path is real |
| Features | HIGH | Cross-referenced 2026 AdSense + Quality Rater + competitor inventories |
| Architecture | HIGH | Six patterns grounded in current authoritative sources; one MEDIUM (Pattern 5 no-prerender depends on Googlebot JS execution remaining reliable) |
| Pitfalls | HIGH on AdSense policy, MEDIUM on reviewer-behavior heuristics (inferred from publisher post-mortems, not Google-confirmed) |

**Overall confidence:** HIGH

### Open Questions Left for User Decisions (not for more research)

These are decisions the user must make before Phase 1 plan-phase, not research gaps:

- **Who is the named byline?** FEATURES.md Risks: "Bylines without verifiable credentials on YMYL finance content can read as performative." Resolve before Phase 1: is the byline the project owner's real name (with a linkable LinkedIn / personal site / prior publication), or a "CurrencyAbout Editorial Desk" team byline pointing to `/about`? An invented persona is worse than no byline.
- **Is AI use honestly disclosed?** FEATURES.md Risks: "A false 'human-written' claim that a reviewer notices is a much worse signal than a transparent 'AI-assisted, human-reviewed' claim." Before writing the editorial-standards page, the owner must decide what's true and write it accurately.
- **Author hub destination shape?** Single `/about` author block or per-author `/authors/<slug>` routes? Both work; FEATURES.md notes single block is fine for one named maintainer.
- **Editorial-standards / corrections / AI-disclosure — one page or extension of `/methodology`?** FEATURES.md: bundle into one substantive page, not three thin pages. Choice between `/editorial-standards` (new route, requires sitemap entry) vs extending existing `/methodology` (no nav change).
- **Phase 0 verification result?** Pending — the `curl -A "Googlebot"` check has not been run as of 2026-05-19.

## Sources

### Primary (HIGH confidence)
- `.planning/research/STACK.md` — six capabilities with zero-dep paths
- `.planning/research/FEATURES.md` — table stakes, differentiators, anti-features, P1 squeeze-ins, competitor inventory
- `.planning/research/ARCHITECTURE.md` — six patterns, six anti-patterns, build-order mapping for the 5 phases
- `.planning/research/PITFALLS.md` — 10 pitfalls with phase mapping + "Looks Done But Isn't" checklist + recovery strategies
- `.planning/PROJECT.md` — locked sprint scope and constraints
- `.planning/codebase/CONCERNS.md` (referenced) — >500 KB bundle warning, localStorage versioning gap
- Google AdSense Help (official): policies, ad placement, account-not-approved, fix policy issues
- Google Search Central: Article structured data, Page Experience, pre-rendering guidance
- W3C: WCAG 2.2 SC 1.4.13 (Content on Hover or Focus)

### Secondary (MEDIUM confidence)
- 2026 industry sources cited across STACK/FEATURES/ARCHITECTURE/PITFALLS — AdSense approval guides, E-E-A-T 2026 playbooks, CWV March 2026 update analyses, Smashing Magazine Popover API guide (March 2026), Schema Pilot / Geneo JSON-LD 2026 guides

### Tertiary (LOW confidence)
- Reviewer behavior heuristics inferred from publisher post-mortems (PITFALLS.md confidence note) — useful but not Google-confirmed

---
*Research completed: 2026-05-19*
*Ready for roadmap: yes*
