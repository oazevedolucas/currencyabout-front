# currencyabout.com — SEO Action Plan

**Date:** 2026-05-21
**Audit:** [FULL-AUDIT-REPORT.md](./FULL-AUDIT-REPORT.md)
**Sprint context:** AdSense approval window active — prioritize fixes that strengthen reviewer perception of quality without visible regressions.

## Critical (fix immediately — blocks indexing or causes penalties)

### C-1. SPA-SEO: per-route metadata not in initial HTML
**Impact:** Every URL serves the home-page `<title>`, `<meta description>`, `<link rel="canonical">`, `og:url`, `og:title` in initial HTML. Non-rendering crawlers (Bing first-pass, social card scrapers, GPTBot, ClaudeBot, PerplexityBot) see home metadata on every URL. Google's first-pass indexer reads the wrong canonical and may treat every pair page and guide as a duplicate of `/`.

**Recommended fix:** Add build-time pre-rendering (Vite SSG) — `vite-plugin-ssr` or `vike` would generate static HTML per route with correct per-page tags baked in. The SPA then hydrates on top. **Trade-off vs CLAUDE.md "no new dependencies":** This needs explicit approval — SSG is the only fix that solves all five top-critical findings at once.

**Lighter alternative (no new dep):** Pre-render a small static HTML snapshot per route via a Vite build hook that runs a headless browser pass over the dev server and writes `dist/<route>/index.html`. Requires Playwright (dev dep). Same approval question.

**Cheapest interim mitigation (no dep):** Remove `<link rel="canonical" href="https://currencyabout.com/" />` from `index.html` entirely so the helmet-set per-route canonical is the only one. Trade-off: pages without JS execution get no canonical at all instead of the wrong one — but "no canonical" is safer than "wrong canonical" for index hygiene. Still leaves the wrong `<title>` / `og:url` / description in shell.

**Effort:** Full SSG = ~2–3 days. Snapshot script = ~1 day. Canonical-removal interim = 5 minutes.

---

### C-2. Wrong canonical leaks duplicate signal to Google
Same root cause as C-1; called out separately because it's the single most damaging consequence. Even if SSG is deferred, the interim mitigation above (delete the static canonical line from `index.html`) eliminates the explicit wrong signal.

**Effort:** 5 minutes (one-line removal in `index.html`). Wrap in a GSD micro-plan; verify nothing else relies on the static canonical.

---

### C-3. PWA manifest references icons that 404
`public/manifest.json` lists `/icons/icon-192.png` and `/icons/icon-512.png` but `public/icons/` is empty on disk. AdSense reviewers loading on mobile see broken PWA install prompts and missing home-screen icons.

**Recommended fix:** Generate two PNGs (192x192, 512x512) from the existing `favicon.svg`. One-line ImageMagick / `sharp` command or Figma export. Drop into `public/icons/`. Either commit directly (interim, since it's a fix to a pre-existing breakage) or fold into the next polish phase.

**Effort:** 15 minutes.

## High (fix within 1 week — significantly impacts rankings / approval)

### H-1. Deploy phase 03-03 T1 + T2 to prod
Already committed locally (`713401b`, `a35ddac`). Render-blocking font swap + cache-headers fix. Closes ~1 s of LCP regression and the Lighthouse cache-lifetimes warning. Blocks PERF-04 acceptance.

**Effort:** Trivial (`npm run deploy` after finishing 03-02 measurement loop).

### H-2. Add baseline security headers to `public/_headers`
Cloudflare reads `_headers` (just added in T2). Append a block for `/*` with non-cache headers:

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
```

Do NOT add `Cache-Control` to `/*` — would break SPA shell revalidation. Skip `X-Frame-Options` — `frame-ancestors` in CSP is the modern equivalent; defer CSP itself (high tuning effort, easy to break AdSense iframes).

**Effort:** 10 minutes + Lighthouse re-check.

### H-3. Add per-route noscript fallback content
The single 4,370-byte noscript block is identical on every URL. Pair pages (`/usd-to-brl`) deserve at least a per-route H1 ("US Dollar to Brazilian Real exchange rate") and a one-paragraph description in noscript so non-rendering crawlers get something topical to index. Guide pages should at minimum have their title + lead paragraph in noscript.

**Implementation:** Static HTML snippets injected via Vite plugin or a build script that reads `seoContent.js` titles. Lower effort than SSG but only handles noscript, not initial-HTML metadata.

**Effort:** ~half a day.

### H-4. Author `Person` schema for guides
`src/content/authors.js` (added in phase 01) is rich enough to produce `Person` + `Article.author` schema. Currently the byline ships visually but isn't structured. Add to `StructuredData.jsx` and confirm it appears in the rendered ArticleSchema. (Still subject to the SPA-SEO problem — only Googlebot's second-pass sees it.)

**Effort:** ~2 hours.

## Medium (fix within 1 month)

### M-1. Add `llms.txt`
Spec-compliant Markdown index of canonical content for AI crawlers. Could surface the 16 guide titles + descriptions + the 21 currency profiles + methodology — gives ChatGPT/Claude/Perplexity a way to ground answers to currency questions in this site's content.

**Effort:** ~3 hours (auto-generate from `guides.js` + `currencyProfiles.js` via a build script).

### M-2. Tighten robots.txt for AI crawlers
Add explicit policy for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`. Recommendation: allow all (the site IS public reference content that benefits from AI citation), but make the intent explicit.

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

**Effort:** 5 minutes.

### M-3. Sitemap lastmod dates
Current `sitemap.xml` is static (committed file). Lastmod values won't reflect actual content edits. Either generate at build time from git mtime, or accept the limitation and document it in METHODOLOGY.

**Effort:** ~1 hour (build-time generator).

### M-4. Sitemap coverage gaps
Validate that every URL in `sitemap.xml` returns 200 and that no indexable URLs are missing. Quick `curl` loop over the 39 entries.

**Effort:** 30 minutes.

## Low (backlog)

### L-1. CSP header
Strict CSP would harden against XSS but is fiddly with AdSense's many iframes/scripts. Defer until AdSense is approved and the iframe domain list is stable.

### L-2. Image alt-text audit pipeline
Site currently has no raster images on content surfaces. If raster `og:image` upgrades happen later, gate the change behind alt-text presence in CI.

### L-3. Internal-link audit
Cross-link density between pair pages and related guides could be tightened. Currently lazily handled by the converter UI and footer; an explicit cross-link map (e.g. "see also" block at the bottom of each guide) would help Google's link graph. Defer until SSG is in place — pre-render gets the benefit.

---

## Prioritized order (next 7 days)

1. **C-2 canonical interim fix** — 5 min, ships immediately, biggest single-config win
2. **H-1 deploy 03-03 T1+T2** — finish phase 03 first per existing plan
3. **C-3 PWA icon PNGs** — 15 min, removes a visible reviewer-facing breakage
4. **H-2 security headers** — 10 min, low risk, ticks Lighthouse Best Practices boxes
5. **M-2 AI crawler policy** — 5 min, free signal to AI ecosystems
6. **C-1 SSG / pre-render decision** — needs explicit "approve new dep" call from project owner before any planning

Items 1–5 total ~45 min of work for very high signal-to-effort ratio. Item 6 is the structural fix and warrants its own phase if approved.

---

## What was NOT covered

- **No live Lighthouse pass** — phase 03 PERF-AUDIT owns CWV measurement
- **No Ahrefs data** — no DR, backlinks, organic keywords, traffic
- **No GSC data** — no real indexing status, no real click/impression data
- **No full crawl** — 7-URL sample sufficient because every URL returns identical HTML; a 39-URL crawl would have added zero new signal (verified by `diff` returning empty between sample pairs)
- **No specialist subagent delegation** — inline analysis only, saved ~15 min of agent spawn time; trade-off is less depth on individual dimensions
- **No screenshots** — Playwright not invoked; UI/visual audit deferred to `/gsd:ui-review` if needed
