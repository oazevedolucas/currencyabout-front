# AdSense Re-Application Plan — `currencyabout.com`

> **Status:** Phase 1 audit complete. **PAUSED** awaiting Alexandre's review before any code changes.
> The original `ADSENSE-FIX.md` brief was written assuming a much earlier project state. The current site is far more mature, and several "do this" items are already done. This document reconciles brief vs. reality, flags genuine architectural mismatches, and proposes a scoped plan.

---

## 1. Stack confirmed

| Aspect | Reality | Brief assumed |
|---|---|---|
| Framework | **Vite 6 + React 19 SPA** (`vite.config.js`) | Next.js (App or Pages Router) |
| Routing | `react-router-dom` v7 (`src/App.jsx`) | Next.js file-based routing |
| Hosting | **Cloudflare Workers** (`wrangler.jsonc`, `not_found_handling: "single-page-application"`) | Likely Vercel/Node |
| i18n | Custom React context (`src/i18n/I18nContext.jsx`), **7 languages** (EN/PT/ES/FR/DE/ZH/JA), language stored in `localStorage`, **single URL serves all languages** | PT + EN with parallel routes `/pt/...` `/en/...` |
| Styling | Plain CSS, one file per component (`*.css`) — no Tailwind, no CSS-in-JS | Possibly Tailwind |
| Content | Hand-authored JS data files (`src/content/guides.js`, `src/content/currencyProfiles.js`) — structured `{ type: 'h2', text: ... }` blocks rendered by `GuidePage` | MDX / CMS |
| SEO head | `react-helmet-async` via `<SeoHead>` (`src/seo/SeoHead.jsx`) | Next `<Metadata>` or `<Head>` |
| Sitemap | Static `public/sitemap.xml` (manually maintained) | Dynamic route |
| `robots.txt` | Exists, allows all except per-bot crawl delays | — |
| `ads.txt` | Exists with real publisher line (`pub-3917556333305409`) | Placeholder TBD |
| AdSense | **Previously integrated**; loader script commented out in `index.html` during re-review (commit `d380c89`). Comment block preserves the exact tag for re-enable. | Not installed |
| Cookie consent | **Already implemented** (`src/components/CookieConsent/CookieConsent.jsx`) — accept/reject, persists in `localStorage`, exposes `hasMarketingConsent()` + `cookie-consent-changed` event | Not implemented |

**Two prior strategy docs already exist in the repo:** `SEO.md` and `SEO-STRATEGY.md`. The recent commits (`d380c89`, `7e45b0a`, `de9ef39`, `abc3e10`) show the team has been iterating on AdSense readiness for months. This plan should extend that work, not restart it.

---

## 2. Pages that already exist

Routes registered in `src/App.jsx`:

| Route | Component | Notes |
|---|---|---|
| `/` and `/converter` | `HomePage` | Full converter + ~600-word editorial section + FAQ |
| `/exchange-rates-today` | `ExchangeRatesTodayPage` | |
| `/:pair` (e.g. `/usd-to-brl`) | `CurrencyPairPage` | Dynamic pair pages, ~15 KB of structured content per file |
| `/about` | `AboutPage` | Mission, sources, team |
| `/privacy-policy` | `PrivacyPage` | **Already names AdSense, DART cookies, GDPR/CCPA rights, contact email — fully AdSense-aware** |
| `/terms` | `TermsPage` | |
| `/contact` | `ContactPage` | Real form + email `contact@currencyabout.com` |
| `/methodology` | `MethodologyPage` | Data sources, refresh cadence |
| `/guides` | `GuidesIndexPage` | |
| `/guides/:slug` | `GuidePage` | 6 long-form guides in `src/content/guides.js` |

**Sitemap** (`public/sitemap.xml`) lists: home, 14 pair pages, 6 guides, guides index, about, methodology, contact, privacy, terms. 27 URLs total.

**Components already in place that the brief asked for:**
- `Layout` (global header + footer, both with primary nav and legal links)
- `Breadcrumbs` (`src/components/Breadcrumbs/Breadcrumbs.jsx`)
- `CookieConsent`
- `SeoHead`, `BreadcrumbSchema`, `FAQSchema`, `ArticleSchema`, `CurrencyPairSchema` JSON-LD helpers
- `FAQ` component used on the homepage
- Noscript SEO fallback in `index.html` listing currencies, pair pages, guides, and legal links

---

## 3. Brief vs. reality — what the brief asked for that's already done

| Brief item (Phase 2–5) | Status |
|---|---|
| Privacy Policy with AdSense / DART / LGPD-GDPR mentions | ✅ Done (`PrivacyPage.jsx`) |
| Terms of Service with rate disclaimer | ✅ Done |
| About page, ≥300 words, sources of FX data | ✅ Done |
| Contact page (not just a `mailto:`) | ✅ Done — has form + visible email |
| Cookie banner with accept/reject + localStorage | ✅ Done |
| `robots.txt` | ✅ Done |
| `sitemap.xml` covering all pages | ✅ Done (static) |
| Metadata (`title`, `description`, OG, Twitter, canonical) | ✅ Done via `<SeoHead>` |
| JSON-LD `WebSite` / `Organization` / `Article` / `Breadcrumb` / `FAQPage` | ✅ Helpers exist; need to confirm each route wires them |
| Global header / footer / breadcrumbs | ✅ Done |
| Enriched home (how it works, latest articles, FAQ, sources) | ✅ Done (`HomePage.jsx` editorial section + FAQ) |
| `ads.txt` | ✅ Done with real publisher line |

---

## 4. Genuine gaps (the actual punch list)

What still needs work to maximize AdSense approval odds:

1. **Editorial volume.** 6 guides is below where AdSense reviewers typically gain confidence in "substantial original content." Target: **+6 to +9 new guides** in English, taking the total to 12–15. Topics from the brief that fit our global-EN site:
   - How exchange rates are determined: a complete guide
   - Floating vs fixed exchange rate systems
   - Top factors that move currency markets
   - Currency conversion fees: how banks and apps compare
   - Best practices for sending money internationally _(partial overlap with existing `sending-money-abroad`; pick a complementary angle, e.g. corridor-specific)_
   - Understanding bid-ask spread in forex
   - How central banks intervene in currency markets
   - Hedge basics for individuals and small businesses
   - Spot vs forward vs swap explained
2. **Custom 404.** `App.jsx` has no catch-all; the `:pair` dynamic route swallows unknown slugs and renders an empty/error pair page. Add a `NotFoundPage` matched by `path="*"` placed **after** `:pair`, plus pair-validity guard in `CurrencyPairPage` that redirects unknown slugs to 404.
3. **`<AdSlot />` component.** Reusable, slot-id-configurable, suppressed on legal pages, suppressed when `getStoredConsent() !== 'accepted'`, and lazy-loaded so it never blocks first paint.
4. **Gated AdSense loader.** Re-enable the AdSense script — but inject it dynamically only after the user accepts cookies (listen to the existing `cookie-consent-changed` event). Keeps the page clean for reviewers loading without consent.
5. **Confirm JSON-LD wiring.**
   - `GuidePage` must emit `ArticleSchema` for each guide (helper exists, need to verify).
   - `HomePage`'s `<FAQ>` should emit `FAQSchema` (helper exists; need to verify it's called).
   - `CurrencyPairPage` should emit `BreadcrumbSchema` + `CurrencyPairSchema`.
6. **Sitemap freshness.** When new guides land, `public/sitemap.xml` must be updated in the same commit. (Optional: a `scripts/build-sitemap.mjs` driven off `guides.js` + `App.jsx` route map, run via `npm run build`. Defer unless asked.)
7. **Internal linking.** Each new guide must link to ≥2 other guides and to the converter (already the convention in the existing 6).

**Gaps the brief calls out that we intentionally will NOT do** (see §5).

---

## 5. Architectural mismatches — decisions needed from Alexandre

The brief was written without seeing the current codebase. Three of its requirements would require disruptive rewrites that contradict explicit design decisions already in the repo. Flagging before touching code:

### 5a. i18n: brief wants `/pt`-and-`/en` route trees; site uses single-URL client-side switching

The brief: "Crie estas páginas em PT e EN (seguindo o padrão de i18n do projeto)" → assumes parallel route trees.

The reality: the site has **7 languages**, all served from the same URL. `SeoHead.jsx` carries an explicit comment block warning against per-language sub-folders (it would break Google's bidirectional hreflang return-tag check).

> **Recommendation:** keep the existing strategy. Add new content in English (the default the AdSense crawler will see). Do not introduce `/pt/` `/en/` route trees — that's a multi-day refactor and would invalidate the hreflang reasoning already documented in code.

### 5b. Blog at `/blog`; site already has `/guides`

> **Recommendation:** expand `/guides` to ~15 articles. Do not create a parallel `/blog` path — splitting editorial across two paths dilutes the signal.

### 5c. MDX; site uses structured JS data objects rendered by `GuidePage`

The existing content model in `src/content/guides.js` is `{ slug, title, body: [{ type: 'h2'|'p'|'list'|'callout'|'lead', ... }] }`. It works, has no build-step penalty, and is what the team has chosen.

> **Recommendation:** new articles use the same JS-object shape. Do not introduce MDX, `@next/mdx`, Contentlayer, or any new content pipeline.

### 5d. Brief's PT-specific topics (IOF, PTAX, Banco Central, Plano Real)

Five of the eight Portuguese topics in the brief are Brazil-specific and only make sense if we publish under a PT route. Since we are not adding PT routes (5a), those topics are out of scope for this pass.

> **Recommendation:** prioritise the **seven English-language topics** from the brief (which all fit the existing `/guides` audience), plus 1–2 extras to reach 12–15 total. If Alexandre wants PT articles long-term, that's a separate project that includes the i18n refactor.

---

## 6. Implementation order (after Alexandre's go-ahead)

Phases adapted to **this** stack and current state:

**Phase A — quick wins (1 commit, ~1 hour)**
1. Add `NotFoundPage` + catch-all route; guard `CurrencyPairPage` against invalid slugs.
2. Verify `ArticleSchema` is emitted in `GuidePage`; verify `FAQSchema` is emitted in the home `FAQ`. Wire any missing one.
3. Audit and fix any thin pair pages (the existing `noindex` work in commit `7e45b0a` already handled the worst cases — re-check with a grep).

**Phase B — editorial expansion (~6–9 new guides, the bulk of the work)**
4. Author 6–9 new long-form guides in English in `src/content/guides.js`, each ≥800 words, schema-tagged, internally linked. Use the topic list in §4.
5. Update `public/sitemap.xml` and the noscript block in `index.html` with the new slugs.

**Phase C — AdSense scaffolding (1 commit)**
6. Build `<AdSlot />`: takes a slot id, renders nothing unless `hasMarketingConsent()` returns true AND the route is not a legal page.
7. Build a gated loader hook (`useAdSenseLoader`) that injects the AdSense `<script>` tag into `<head>` the first time consent is granted. Listens to `cookie-consent-changed` to react in-session.
8. Place at most 1–2 `<AdSlot />` on the home, guide, and pair pages. **Zero** ads on `/privacy-policy`, `/terms`, `/about`, `/contact`, `/methodology`.

**Phase D — verification**
9. `npm run build` (currently `vite build`; **note: the brief's `npx tsc --noEmit` and `npm run lint` do not apply — this project is JS, not TS, and has no lint script. Will confirm with Alexandre whether to add ESLint or skip**).
10. Manual check: sitemap returns 200 locally; each new guide page shows JSON-LD in DevTools; cookie banner gates the AdSense script; 404 page works.

**Phase E — handoff**
11. Final commit message draft, ready for Alexandre to push to production. After 1–2 weeks of indexing, he reapplies to AdSense.

---

## 7. Constraints I'll honor

- No design system / palette changes.
- No new heavy dependencies (no MDX runtime, no CMS, no state manager).
- Additive only — the converter and its components stay untouched.
- No placeholder / "lorem ipsum" content. All new articles will be hand-written.
- No AI-tell phrasing. PT-BR (not PT-PT) and EN-US.
- All exchange-rate examples in articles will use ranges, not specific invented numbers.

## 8. Open questions for Alexandre

1. Confirm the three architectural decisions in §5 (single-URL i18n stays; `/guides` not `/blog`; JS data objects not MDX).
2. Confirm the **English-only** scope for new editorial content this round.
3. Should I add an ESLint config + script, or skip linting for this pass?
4. Any topic in §4's list you'd rather replace? Any in-house preference on tone / voice you want me to mirror beyond what's in `guides.js`?
5. After AdSense is re-approved, who updates `ads.txt`? (It already has the real publisher line — confirm no changes needed.)

---

**Stopping here. Awaiting review of this plan before touching code.**
