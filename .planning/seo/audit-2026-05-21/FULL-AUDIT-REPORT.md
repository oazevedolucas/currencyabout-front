# currencyabout.com — Full SEO Audit

**Date:** 2026-05-21
**Method:** Static analysis of 7 sampled URLs + sitemap + robots.txt + live HTTP headers. No Ahrefs/GSC MCP — no DR, backlink, or indexing-coverage data. No Lighthouse run (covered separately by phase 03).
**Sample:** `/`, `/exchange-rates-today`, `/usd-to-brl`, `/eur-to-usd`, `/guides`, `/guides/currency-conversion-fees-compared`, `/guides/how-exchange-rates-work` — chosen to cover every page type (home, transactional, pair, guide index, guide leaf).

## Executive Summary

**SEO Health Score: 62 / 100**

Score is dragged down primarily by the SPA-SEO problem — every URL serves byte-identical initial HTML with the home-page's `<title>`, `<meta description>`, `<link rel="canonical">`, and OG tags. Per-route metadata is only injected after JavaScript executes via `react-helmet-async`. Non-rendering crawlers (Bing first-pass, Facebook/Twitter/LinkedIn card scrapers, GPTBot, ClaudeBot, PerplexityBot) see home-page metadata on every URL — and the prod canonical literally says every page IS the home page, which can collapse the entire pair-page and guide surface in Google's index.

**Top 5 critical issues:**
1. Wrong canonical on every non-home URL (initial HTML always says `<link rel="canonical" href="https://currencyabout.com/" />`)
2. Wrong `<title>` and `<meta description>` on every URL in initial HTML — same generic site title
3. Wrong `og:url` / `og:title` on every URL — social shares display home card regardless of page
4. Zero hreflang in initial HTML (helmet-set; crawlers without JS see no language alternates)
5. Per-page JSON-LD (BreadcrumbSchema, CurrencyPairSchema, ArticleSchema, FAQSchema) absent from initial HTML — only static WebSite/Organization/WebApplication ship in the shell

**Top 5 quick wins:**
1. **Deploy 03-03 T1+T2** (already committed locally at `713401b`, `a35ddac`) — fixes render-blocking + cache lifetimes
2. **Add security headers to `public/_headers`** — HSTS, X-Content-Type-Options, Referrer-Policy (zero-risk, three lines)
3. **Generate per-route static HTML at build time** — Vite SSG plugin would solve issues 1–5 at once; biggest single SEO lever
4. **Tighten robots.txt** — current file is fine but could explicitly disallow non-curated pair URLs to reduce crawl waste
5. **Add `lastmod` validation script** to CI — sitemap.xml lastmod dates are static, won't reflect content edits

## Technical SEO

### Crawlability
- ✅ `robots.txt` returns 200, allows all, references sitemap correctly
- ✅ `sitemap.xml` exists, lists 39 URLs (home + exchange-rates-today + 16 pair pages + guides index + 16 guide pages + 4 legal + about)
- ✅ Cloudflare HTTP/2 (multiplexed, fast)
- ⚠ `cf-cache-status: HIT` on HTML routes (good for users, but crawlers usually bypass cache)

### Indexability
- ✅ `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />` in initial HTML
- 🔴 **CRITICAL: `<link rel="canonical" href="https://currencyabout.com/" />` returned for every URL** — Googlebot's first-pass indexer reads this before rendering. Even with second-pass JS render, Google's crawl scheduler may treat all pair pages and guides as duplicates of `/` and reduce crawl budget allocation. Confirmed by diffing all 7 sample HTML files (`diff` returned 0 changes between any pair).
- 🔴 **CRITICAL: per-route `noindex` for non-curated pair URLs (set via `seo/SeoHead.jsx` based on `isIndexablePair`) is helmet-set — not in initial HTML.** This means non-rendering crawlers may index pages the site explicitly marks `noindex` for. Risk: thin-content penalty for the 400+ programmatic pair URLs beyond the curated allowlist.

### Security headers (response)
- 🟧 No `Strict-Transport-Security` header visible
- 🟧 No `X-Content-Type-Options: nosniff`
- 🟧 No `X-Frame-Options` / `frame-ancestors` CSP directive
- 🟧 No `Referrer-Policy`
- 🟧 No `Permissions-Policy`
- ✅ HTTPS enforced (HTTP/2 with `:443`)
- ✅ Cloudflare `report-to` + `nel` for error reporting

### Cache-Control (live prod)
- ✅ HTML routes: `public, max-age=0, must-revalidate` — correct for SPA shell
- 🔴 `/ads.txt`: `public, max-age=0, must-revalidate` — too short (Lighthouse "Use efficient cache lifetimes" 17 KiB finding)
- 🔴 `/robots.txt`: same — same issue
- 🔴 `/sitemap.xml`, `/manifest.json`, `/favicon.svg`, `/og-image.svg`, `/icons/*`: same — same issue
- ⚠ Local fix committed (03-03 T2, `a35ddac`) — `public/_headers` adds `max-age=86400` for these paths and `max-age=31536000, immutable` for `/assets/*`. **Not deployed yet.**

### Core Web Vitals
Deferred to phase 03 PERF-AUDIT (currently in progress; baseline Insights captured for `/` and `/guides/currency-conversion-fees-compared`; `/usd-to-brl` pending). 03-03 T1 (font swap) and T2 (cache headers) committed locally, address ~990–1,140 ms of render-blocking + 17 KiB of cache opportunities.

## Content Quality (E-E-A-T)

### What ships in initial HTML
- ✅ 16 guide pages (~30K gzipped of original editorial content per CONTEXT.md, in a route-bounded chunk after 03-01 lazy split)
- ✅ Currency profiles for 21 currencies (`src/content/currencyProfiles.js`)
- ✅ Methodology page, About page, Contact, Privacy, Terms — explicit trust signals
- ✅ JSON-LD: WebSite, Organization, WebApplication

### What does NOT ship in initial HTML (helmet-set)
- 🔴 Per-page `<title>` — every URL serves "About Currency - Live Exchange Rates & Free Currency Converter"
- 🔴 Per-page `<meta description>` — every URL serves the home description
- 🔴 Article schema for guide pages
- 🔴 CurrencyPair schema for pair pages
- 🔴 Breadcrumb schema
- 🔴 FAQ schema
- 🔴 Hreflang alternates

### noscript fallback
- ✅ Single `<noscript>` block (4,370 bytes) with H1, currency list (20+ currencies with symbols), 7 links to popular pairs, navigation to /guides, /privacy-policy, /terms, /methodology, /contact
- ⚠ Identical on every route — `/usd-to-brl`'s noscript fallback is generic "Convert between world's major currencies" with no USD↔BRL-specific content
- ⚠ No editorial guide content surfaces in the noscript — even the per-guide H1/lead/sections is JS-rendered

### Editorial content (per CONTEXT.md authored guides)
- ✅ 16 guides, structured block-typed content (lead, h2, h3, p, list, callout, disclaimer), human-written per CLAUDE.md sprint rules
- ✅ BylineMeta + authors module (phase 01) — E-E-A-T signals
- ⚠ Crawlers without JS render see none of this

## On-Page SEO

### Tags present in initial HTML (correct for home, wrong for everything else)
- `<title>About Currency - Live Exchange Rates & Free Currency Converter</title>` (60 chars — good length)
- `<meta name="description" content="Convert currencies instantly with live exchange rates. Free real-time converter for USD, EUR, GBP, BRL, JPY and 20+ world currencies. Updated daily." />` (157 chars — good)
- `<link rel="canonical" href="https://currencyabout.com/" />` 🔴 ALWAYS HOME
- `<meta property="og:title" content="About Currency - Live Exchange Rates & Free Currency Converter" />`
- `<meta property="og:url" content="https://currencyabout.com/" />` 🔴 ALWAYS HOME
- `<meta property="og:image" content="https://currencyabout.com/og-image.svg" />`
- `<meta name="twitter:card" content="summary_large_image" />`

### Heading structure
- ✅ One `<h1>` in noscript fallback ("About Currency - Live Exchange Rates & Currency Converter")
- ⚠ Cannot verify per-route H1 hierarchy from initial HTML — all JS-rendered
- (Phase 01 / 02 SUMMARY suggests per-page H1 is correctly set per route at render time)

### Internal linking
- ✅ Footer with "Popular pairs" + tools + legal links visible in noscript
- ⚠ Per-guide internal links (e.g. from a guide to a referenced pair page) only render with JS
- ⚠ Pair pages cross-link to other pair pages via the converter UI — also JS-only

## Schema / Structured Data

### Implemented (initial HTML, all pages)
- ✅ WebSite schema (`@type: WebSite`)
- ✅ Organization schema
- ✅ WebApplication schema

### Implemented (JS-rendered only — `src/seo/StructuredData.jsx`)
- ⚠ CurrencyPairSchema on pair pages
- ⚠ ArticleSchema on guide pages
- ⚠ BreadcrumbSchema on subpages
- ⚠ FAQSchema where applicable

### Missing entirely
- 🟧 LocalBusiness / Service / Product — N/A (informational site)
- 🟧 Article author byline → `Person` schema with `sameAs` (would boost E-E-A-T)

## Performance (CWV)

Deferred to phase 03 — Insights baseline already captured in `.planning/phases/03-performance-core-web-vitals/03-PERF-AUDIT.md`. Key findings to date:

| Page | Render-blocking (est.) | Other Insights |
|------|------------------------|----------------|
| `/` | ~990 ms | Layout shift culprits, cache lifetimes (17 KiB) |
| `/guides/currency-conversion-fees-compared` | ~1,140 ms | DOM size, cache lifetimes (17 KiB) |
| `/usd-to-brl` | — (pending) | — |

03-03 T1 (font swap, committed `713401b`) and T2 (cache headers, committed `a35ddac`) target render-blocking + cache. Not yet deployed.

## Images

- ✅ No raster images on home / pair / guide pages (CSS-emoji flags + inline SVGs only) — zero CLS from images, zero `<img>` alt-text audit needed for content surfaces
- ✅ `og-image.svg` exists and is referenced in OG tags
- ✅ `favicon.svg` + `icons/icon-192.png`, `icons/icon-512.png` referenced in manifest.json
- 🔴 **icons/icon-192.png and icons/icon-512.png DO NOT EXIST on disk** (`public/icons/` is empty) — manifest references PNGs that 404. Affects PWA install + Android home-screen icon. Pre-existing issue, unrelated to phase 03.

## AI Search Readiness

- 🔴 No `llms.txt` — opportunity to opt-in/out of AI training and guide AI crawlers to canonical content
- 🔴 No AI-crawler-specific rules in robots.txt (no entries for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`)
- 🔴 SPA-SEO problem hits AI crawlers hardest — most AI bots do NOT execute JS, so every URL they fetch returns home-page metadata
- 🟧 No author `Person` schema linking guides to a credible byline
- ✅ Static JSON-LD (WebSite, Organization, WebApplication) is present pre-render
- ✅ Noscript fallback contains some indexable text (currency list, links)

---

## Data Sources

| Source | Status | Data Provided |
|--------|--------|---------------|
| Static Analysis | Available | 7-URL HTML sample, sitemap, robots.txt, live response headers |
| Ahrefs MCP | Not connected | (no DR, no backlinks, no organic keyword data) |
| GSC MCP | Not connected | (no indexing coverage, no clicks/impressions, no top pages) |
| Lighthouse | Deferred | (covered by phase 03 PERF-AUDIT) |
| Crawl | Sampled (7 / 39) | Full crawl skipped — every URL serves identical HTML, so a 39-URL crawl would yield no additional signal |
