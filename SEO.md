# SEO Documentation — About Currency

This document describes everything that was implemented for search engine optimization, what you need to configure on external platforms, and the URL structure of the site.

---

## Table of Contents

1. [URL Structure](#url-structure)
2. [Meta Tags & Head Management](#meta-tags--head-management)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Crawlability Files](#crawlability-files)
5. [Internal Linking Strategy](#internal-linking-strategy)
6. [Internationalization (i18n) & Hreflang](#internationalization-i18n--hreflang)
7. [Performance Optimizations](#performance-optimizations)
8. [Noscript Fallback](#noscript-fallback)
9. [External Platform Configuration](#external-platform-configuration)
10. [Hosting Requirements](#hosting-requirements)
11. [File Reference](#file-reference)
12. [What to Do Next](#what-to-do-next)

---

## URL Structure

The app uses `react-router-dom` with client-side routing. All routes are defined in `src/App.jsx`.

| URL Pattern | Example | Page Component | SEO Purpose |
|---|---|---|---|
| `/` | `currencyabout.com/` | `HomePage` | Main landing page. Targets "currency converter", "exchange rates" |
| `/converter` | `currencyabout.com/converter` | `HomePage` (alias) | Targets "currency converter" specifically |
| `/exchange-rates-today` | `currencyabout.com/exchange-rates-today` | `ExchangeRatesTodayPage` | Targets "exchange rates today", "dollar today", "euro today" |
| `/:pair` | `currencyabout.com/usd-to-brl` | `CurrencyPairPage` | Dynamic. Targets "{FROM} to {TO}" searches |

### Currency Pair URL Format

Pattern: `/{from}-to-{to}` (lowercase, 3-letter ISO currency codes)

Examples:
- `/usd-to-brl` — US Dollar to Brazilian Real
- `/eur-to-brl` — Euro to Brazilian Real
- `/gbp-to-usd` — British Pound to US Dollar
- `/usd-to-jpy` — US Dollar to Japanese Yen

The pair page automatically handles:
- Parsing the URL to extract `from` and `to` codes
- Showing a 404-style message if the codes are invalid
- Providing a reverse conversion link (e.g., `/brl-to-usd`)

All 21 supported currencies can be combined, giving **420 possible pair pages** (21 x 20).

---

## Meta Tags & Head Management

Managed by `react-helmet-async` via the `src/seo/SeoHead.jsx` component.

### What each page gets dynamically

- `<title>` — Unique per page, includes currency names and brand
- `<meta name="description">` — Unique per page, includes rate when available
- `<link rel="canonical">` — Self-referencing canonical URL
- `<meta property="og:*">` — Open Graph tags (title, description, url, type, site_name)
- `<meta name="twitter:*">` — Twitter Card tags (summary_large_image)
- `<link rel="alternate" hreflang="*">` — One per supported language + `x-default`
- `<html lang="*">` — Updates dynamically based on selected language

### Static meta in `index.html`

These serve as defaults before React hydrates:
- Primary title and description
- `robots` directive: `index, follow, max-image-preview:large, max-snippet:-1`
- Open Graph locale alternates for all 7 languages
- Favicon, theme-color, manifest link
- `keywords` meta tag with main target terms

### Title Templates

Defined in each locale file under the `seo` key:

| Page | English Example |
|---|---|
| Home | `About Currency - Convert between the world's major currencies` |
| Converter | `Free Currency Converter - Live Exchange Rates \| About Currency` |
| Pair | `USD to BRL - Convert US Dollar to Brazilian Real \| About Currency` |
| Rates Today | `Exchange Rates Today - Live Currency Rates \| About Currency` |

---

## Structured Data (JSON-LD)

### Static schemas in `index.html`

**WebSite** — Tells Google this is a website with a search action:
```json
{
  "@type": "WebSite",
  "name": "About Currency",
  "url": "https://currencyabout.com",
  "potentialAction": { "@type": "SearchAction" }
}
```

**WebApplication** — Marks the converter as a finance app tool:
```json
{
  "@type": "WebApplication",
  "applicationCategory": "FinanceApplication",
  "offers": { "price": "0" }
}
```

### Dynamic schemas via React components (`src/seo/StructuredData.jsx`)

| Schema | Where Used | Purpose |
|---|---|---|
| `BreadcrumbList` | Every page | Shows breadcrumb in Google results |
| `FAQPage` | Every page (with FAQ component) | Enables FAQ rich results in SERP |
| `ExchangeRateSpecification` | Currency pair pages | Marks the exchange rate data |

---

## Crawlability Files

### `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://currencyabout.com/sitemap.xml
```

Also includes crawl-delay rules for AhrefsBot and SemrushBot.

### `public/sitemap.xml`

Contains 15+ URLs:
- Homepage with hreflang annotations for all 7 languages
- `/converter`
- `/exchange-rates-today`
- 12 high-priority currency pair pages (usd-to-brl, eur-to-brl, gbp-to-brl, etc.)

All marked with `<changefreq>daily</changefreq>` since rates update daily.

**Important:** The sitemap currently has a static list. If you add more pair pages to the sitemap, add them manually or set up a build-time sitemap generator.

### `public/manifest.json`

PWA manifest with app name, description, theme color, and icon references.

### `public/favicon.svg`

SVG favicon with the "$" symbol on a blue background. Referenced in `index.html`.

---

## Internal Linking Strategy

### Footer (every page)

Component: `src/components/Layout/Layout.jsx`

Contains two nav sections:
1. **Popular Conversions** — 12 links to the most searched currency pairs
2. **Tools** — Links to Home, Currency Converter, Exchange Rates Today

### Popular Pairs Grid (every page)

Component: `src/components/PopularPairs/PopularPairs.jsx`

A visual grid of 12 clickable cards linking to pair pages. On pair pages, the current pair is excluded from the list.

### Exchange Rates Table

Component: `src/pages/ExchangeRatesTodayPage.jsx`

Every row in the rate tables (for USD, EUR, GBP) is a clickable link to the corresponding pair page.

### Reverse Pair Links

On every currency pair page, there's a "Looking for the reverse?" link pointing to the opposite pair (e.g., `/usd-to-brl` links to `/brl-to-usd`).

### Linking Model

```
Homepage ──── /converter (alias)
    │
    ├── PopularPairs grid (12 pair links)
    ├── Footer nav (12 pairs + 3 tools)
    │
    ▼
/exchange-rates-today
    │
    ├── USD rate table → links to /usd-to-brl, /usd-to-eur, etc.
    ├── EUR rate table → links to /eur-to-brl, /eur-to-usd, etc.
    ├── GBP rate table → links to /gbp-to-brl, /gbp-to-usd, etc.
    │
    ▼
/usd-to-brl (pair page)
    │
    ├── Reverse link → /brl-to-usd
    ├── PopularPairs grid (11 other pairs)
    ├── Footer nav
    └── FAQ section
```

---

## Internationalization (i18n) & Hreflang

### Supported Languages

| Code | Language | Flag |
|---|---|---|
| `en` | English | US |
| `pt` | Portugues | BR |
| `es` | Espanol | ES |
| `fr` | Francais | FR |
| `de` | Deutsch | DE |
| `zh` | Chinese | CN |
| `ja` | Japanese | JP |

### How it works

1. On first visit, the app detects the browser language (`navigator.language`)
2. Falls back to `en` if no match
3. User can switch via the language selector (top-right pill)
4. Choice is persisted in `localStorage` key `aboutcurrency_lang`
5. `<html lang>` is updated dynamically

### Hreflang Tags

Every page includes `<link rel="alternate" hreflang="*">` for all 7 languages plus `x-default`. This tells Google which language version to show in different regions.

### SEO Content per Language

Each locale file (`src/i18n/locales/*.js`) has a `seo` object with:
- Page titles and meta descriptions (with `{from}`, `{to}`, `{rate}` placeholders for pair pages)
- FAQ questions and answers (4 per page)
- UI labels for footer, nav, tables, tooltips, disclaimer

---

## Performance Optimizations

| Optimization | Where | Impact |
|---|---|---|
| `preconnect` to Google Fonts | `index.html` | Faster font loading |
| `preconnect` to API (`open.er-api.com`) | `index.html` | Faster first API call |
| `dns-prefetch` to API | `index.html` | DNS resolution starts early |
| Font `display=swap` | Google Fonts URL | Prevents FOIT (flash of invisible text) |
| Daily localStorage cache | `src/services/exchangeRate.js` | 1 API call per day max |
| `React.memo()` on CurrencyCard | `src/components/CurrencyCard/` | Prevents unnecessary re-renders |
| SVG favicon | `public/favicon.svg` | Tiny, scalable, no extra requests |
| Semantic HTML | All components | Better crawling, accessibility |

---

## Noscript Fallback

In `index.html`, a `<noscript>` block provides:
- Full H1 and description text
- Complete list of all 21 currencies with symbols
- Links to 6 popular currency pair pages
- About section describing the app

This ensures search engine crawlers that don't execute JavaScript still see meaningful content and follow internal links.

---

## External Platform Configuration

### 1. Google Search Console

**You must do this:**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property: `https://currencyabout.com`
3. Verify ownership (DNS TXT record, HTML file, or meta tag)
4. Submit your sitemap: `https://currencyabout.com/sitemap.xml`
5. Check "Coverage" report after a few days to see indexed pages
6. Monitor "Core Web Vitals" report

### 2. Google Analytics 4

**You must do this:**

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add the script to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Bing Webmaster Tools

**Optional but recommended:**

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site and verify
3. Submit sitemap

### 4. Social Media / Sharing

The Open Graph and Twitter Card meta tags are already set. To get image previews when sharing:

1. Create an OG image (1200x630px) with your brand
2. Place it at `public/og-image.png`
3. Add to `index.html`: `<meta property="og:image" content="https://currencyabout.com/og-image.png" />`
4. Add to `SeoHead.jsx` for per-page images if desired

### 5. Domain & DNS

Make sure:
- `currencyabout.com` points to your hosting
- HTTPS is enabled (required for SEO)
- `www.currencyabout.com` redirects to `currencyabout.com` (or vice-versa, pick one)

---

## Hosting Requirements

Since this is a Single Page Application (SPA) with client-side routing, your hosting must be configured to serve `index.html` for all routes. Otherwise, direct navigation to `/usd-to-brl` will return a 404.

### Netlify

Create `public/_redirects`:
```
/*    /index.html   200
```

### Vercel

Create `vercel.json` in the project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Nginx

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Apache (.htaccess)

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Cloudflare Pages

SPA mode is automatic — no configuration needed.

---

## File Reference

### SEO-specific files

| File | Purpose |
|---|---|
| `src/seo/SeoHead.jsx` | Dynamic `<head>` management (title, meta, OG, hreflang, canonical) |
| `src/seo/StructuredData.jsx` | JSON-LD schema components (Breadcrumb, FAQ, CurrencyPair) |
| `src/seo/seoContent.js` | SEO data: popular pairs list, URL helpers, title/description generators |
| `public/robots.txt` | Crawler rules and sitemap pointer |
| `public/sitemap.xml` | URL list for search engines |
| `public/manifest.json` | PWA manifest |
| `public/favicon.svg` | Site icon |

### Pages

| File | Route | SEO Features |
|---|---|---|
| `src/pages/HomePage.jsx` | `/`, `/converter` | SeoHead, Breadcrumb, FAQ, PopularPairs |
| `src/pages/CurrencyPairPage.jsx` | `/:pair` | SeoHead, Breadcrumb, FAQ, CurrencyPairSchema, reverse link, content block |
| `src/pages/ExchangeRatesTodayPage.jsx` | `/exchange-rates-today` | SeoHead, Breadcrumb, FAQ, rate tables with internal links |

### SEO-relevant components

| File | Purpose |
|---|---|
| `src/components/Layout/Layout.jsx` | Footer with internal links to pairs and tools |
| `src/components/FAQ/FAQ.jsx` | Accordion FAQ with FAQPage schema |
| `src/components/PopularPairs/PopularPairs.jsx` | Internal linking grid to popular pair pages |

### Locale files with SEO content

All located in `src/i18n/locales/`:
`en.js`, `pt.js`, `es.js`, `fr.js`, `de.js`, `zh.js`, `ja.js`

Each contains a `seo` object with translated titles, descriptions, FAQ, and UI labels.

---

## What to Do Next

### Priority 1 — Before Launch

- [ ] Replace `https://currencyabout.com` with your actual domain in all files (search for `currencyabout.com`)
- [ ] Configure hosting for SPA fallback (see Hosting Requirements)
- [ ] Set up HTTPS
- [ ] Create and submit to Google Search Console
- [ ] Add Google Analytics tracking code

### Priority 2 — First Week

- [ ] Create an OG image (1200x630px) and add `og:image` meta tags
- [ ] Generate PNG icons for PWA (192x192 and 512x512) in `public/icons/`
- [ ] Submit to Bing Webmaster Tools
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results) for structured data
- [ ] Test with [PageSpeed Insights](https://pagespeed.web.dev/) for Core Web Vitals

### Priority 3 — Growth

- [ ] Consider SSR/SSG (Next.js, Astro, or Vite SSR) for pre-rendered HTML to improve crawlability
- [ ] Add a prerendering service (prerender.io) as a quicker SSR alternative
- [ ] Expand sitemap.xml to include all 420 pair combinations
- [ ] Build a blog section for informational keywords (`/blog/dollar-forecast-2026`, `/blog/best-time-to-buy-euros`)
- [ ] Add historical rate pages (`/usd-to-brl/history`) with charts
- [ ] Set up dynamic OG images per currency pair
- [ ] Create a build-time sitemap generator script
- [ ] Add `<link rel="prerender">` hints for popular pair pages
