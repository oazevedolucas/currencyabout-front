# SEO Strategy for Web Applications

A practical, code-level SEO playbook. Share this with any AI assistant to implement proper SEO optimization on a web project from scratch.

---

## How to Use This Document

Give this file to an AI assistant along with your project and say:

> "Read SEO-STRATEGY.md and implement all applicable optimizations for my project."

The AI should adapt each section to your specific tech stack, niche, and content.

---

## 1. Technical Foundation

### 1.1 HTML Head — Required Meta Tags

Every page must have these unique, per-page tags in `<head>`:

```html
<!-- Primary -->
<title>{Page Title} | {Brand} — max 60 chars</title>
<meta name="description" content="{Unique description — max 155 chars}" />
<link rel="canonical" href="https://yourdomain.com/current-page" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="{Same as title}" />
<meta property="og:description" content="{Same as meta description}" />
<meta property="og:url" content="https://yourdomain.com/current-page" />
<meta property="og:site_name" content="{Brand}" />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
<meta property="og:locale" content="en_US" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{Same as title}" />
<meta name="twitter:description" content="{Same as meta description}" />
<meta name="twitter:image" content="https://yourdomain.com/og-image.png" />
```

**Rules:**
- Title: 50-60 chars. Put the keyword first, brand last. Use `|` or `—` as separator.
- Description: 120-155 chars. Include the primary keyword. Write a compelling CTA.
- Canonical: Always self-referencing. Only point elsewhere to deduplicate pages.
- Every page must have a UNIQUE title and description. Never duplicate.

### 1.2 Dynamic Head Management

For SPAs (React, Vue, Svelte), use a head management library:

| Framework | Library |
|---|---|
| React | `react-helmet-async` |
| Vue | `@unhead/vue` |
| Svelte | `svelte-meta-tags` |
| Next.js | Built-in `<Head>` or Metadata API |
| Nuxt | Built-in `useHead()` |
| Astro | Built-in `<head>` in layouts |

Create a reusable `SeoHead` component that every page calls with its specific title and description. Never hardcode meta tags in individual pages — centralize the template.

### 1.3 Crawlability Files

Create these in your `public/` or static directory:

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add every indexable page -->
</urlset>
```

**Rules:**
- Include every page you want indexed. Exclude admin, auth, or utility pages.
- Set `changefreq` based on how often content actually changes.
- Priority: homepage = 1.0, main sections = 0.8-0.9, detail pages = 0.6-0.7.
- If you have 100+ pages, generate the sitemap at build time with a script.
- Submit the sitemap in Google Search Console after deploying.

**manifest.json** (for PWA and mobile):
```json
{
  "name": "Your App Name",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#your-brand-color"
}
```

**Favicon:**
- Use SVG (`favicon.svg`) for modern browsers — scales perfectly, tiny file.
- Add `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />` in head.
- Add `<meta name="theme-color" content="#your-brand-color" />`.

---

## 2. Structured Data (JSON-LD)

Structured data helps Google show rich results (FAQ dropdowns, breadcrumbs, ratings, etc.).

### 2.1 Mandatory for Every Site

**WebSite** — Place in `index.html` or root layout:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Your Brand",
  "url": "https://yourdomain.com"
}
```

**BreadcrumbList** — Place on every page:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com" },
    { "@type": "ListItem", "position": 2, "name": "Page Name", "item": "https://yourdomain.com/page" }
  ]
}
```

### 2.2 Per Content Type

| Content | Schema Type | Rich Result |
|---|---|---|
| FAQ sections | `FAQPage` | Expandable Q&A in Google |
| Blog posts | `Article` | Author, date, headline in SERP |
| Products | `Product` | Price, rating, availability |
| Tools/Apps | `WebApplication` | App info in SERP |
| Local business | `LocalBusiness` | Map pack, hours, address |
| Recipes | `Recipe` | Ingredients, time, rating |
| Events | `Event` | Date, location, ticket info |
| Reviews | `Review` + `AggregateRating` | Star ratings in SERP |

### 2.3 Implementation Pattern

Create a reusable component that takes data and outputs `<script type="application/ld+json">`:

```jsx
function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

**Rules:**
- Always validate with [Google Rich Results Test](https://search.google.com/test/rich-results).
- Never fake or exaggerate structured data — Google penalizes this.
- Place JSON-LD in `<head>` or at the top of `<body>`.

---

## 3. URL Architecture

### 3.1 Rules for URL Design

- **Lowercase, hyphen-separated:** `/exchange-rates-today` not `/ExchangeRatesToday`
- **Short and descriptive:** `/usd-to-brl` not `/currency/convert?from=USD&to=BRL`
- **No trailing slashes** (or always trailing — pick one, be consistent)
- **No query parameters for indexable content** — use path segments instead
- **Noindex utility pages:** login, signup, admin, 404, thank-you pages
- **Use 301 redirects** when changing URLs — never break old links

### 3.2 URL Patterns by Page Type

| Page Type | Pattern | Example |
|---|---|---|
| Homepage | `/` | `yourdomain.com/` |
| Category/listing | `/{category}` | `/exchange-rates-today` |
| Detail/item | `/{slug}` | `/usd-to-brl` |
| Blog post | `/blog/{slug}` | `/blog/dollar-forecast-2026` |
| Tool | `/{tool-name}` | `/converter` |

### 3.3 Programmatic SEO Pages

If your data allows hundreds or thousands of similar pages (products, locations, currency pairs), generate them programmatically:

1. Define a URL pattern: `/{from}-to-{to}`
2. Create one page component that reads the URL params
3. Generate unique title, description, H1, and content per page
4. Add all pages to sitemap.xml
5. Interlink between related pages

**Critical rule:** Every programmatic page must have unique, useful content. Google will deindex thin or duplicate pages. Add at minimum:
- Unique H1 with the specific entity
- 2-3 paragraphs of relevant text
- FAQ section with entity-specific questions
- Related/similar entity links
- Data or stats specific to that entity

---

## 4. Content Architecture

### 4.1 Heading Hierarchy

Every page must follow this structure:

```
<h1> — One per page. The primary keyword. Unique across the site.
  <h2> — Major sections (3-6 per page)
    <h3> — Subsections within an H2
```

**Rules:**
- Only ONE `<h1>` per page. It should match the page's primary search intent.
- Never skip heading levels (no H1 → H3).
- Use headings for structure, not for styling. If you need big text, use CSS.
- Include the target keyword naturally in H1 and at least one H2.

### 4.2 Semantic HTML

Use the correct HTML elements — it directly improves crawling and accessibility:

```html
<header>    — Site header or page header
<nav>       — Navigation menus (main nav, footer nav, breadcrumbs)
<main>      — The primary content of the page (one per page)
<article>   — Self-contained content (blog post, product card, comment)
<section>   — Thematic grouping with a heading
<aside>     — Sidebar, related content, callouts
<footer>    — Site footer or section footer
<details>   — Expandable content (perfect for FAQ)
<summary>   — The visible label for <details>
<time>      — Dates and times (use datetime attribute)
```

**Never do this:**
- `<div onclick>` instead of `<button>`
- `<div>` with a class for navigation instead of `<nav>`
- `<b>` for emphasis instead of `<strong>`
- `<span class="heading">` instead of actual heading tags

### 4.3 Required Content Blocks for SEO

Every important page should have:

| Block | Purpose | SEO Impact |
|---|---|---|
| H1 + subtitle | Primary keyword targeting | High |
| Core tool/content | What the user came for | User signals |
| FAQ section (3-5 questions) | Long-tail keywords, FAQ rich results | High |
| Internal links grid | Distributes authority, improves crawl depth | High |
| Text content (2-3 paragraphs) | Gives crawlers content to index | Medium |
| Breadcrumb | Navigation, breadcrumb rich result | Medium |
| Footer with links | Crawl all pages, site structure | Medium |

### 4.4 Content Freshness

Google favors fresh content for time-sensitive queries. Signals to implement:

- Show a "last updated" date and make it visible
- Actually update content regularly (rates, prices, stats)
- Add `<time datetime="2026-04-01">` to dates in HTML
- Set `changefreq` in sitemap based on real update frequency
- Blog posts should have published and modified dates

---

## 5. Internal Linking Strategy

### 5.1 Linking Model

```
Homepage (highest authority)
├── links to all category/section pages
├── links to top 10-15 detail pages
│
Category Pages
├── links to all detail pages in that category
├── links back to homepage
├── links to related categories
│
Detail Pages
├── links to related detail pages (6-12 links)
├── links back to parent category
├── links back to homepage (via nav/breadcrumb)
│
Footer (on every page)
├── links to all category pages
├── links to top detail pages
├── links to legal pages
│
Blog Posts
├── links to relevant tool/detail pages
├── links to related blog posts
```

### 5.2 Rules

- Every page should be reachable within 3 clicks from the homepage.
- Use descriptive anchor text: "USD to BRL converter" not "click here".
- Link bidirectionally: if A links to B, B should link back to A.
- Don't link to the current page (avoid self-links).
- Use `<nav>` with `aria-label` for navigation link groups.
- Footer links should cover your most important pages.

### 5.3 Implementation

Create reusable components for internal links:
- **PopularItems grid** — 8-12 cards linking to top detail pages. Place on every page.
- **RelatedItems** — 4-6 contextually related links. Place on detail pages.
- **Footer nav** — Category links + top items. Present on every page.
- **Breadcrumb** — Shows page hierarchy. Present on every page except homepage.

---

## 6. Internationalization (i18n) SEO

If your site supports multiple languages:

### 6.1 Hreflang Tags

Add to every page for every supported language:

```html
<link rel="alternate" hreflang="en" href="https://yourdomain.com/page" />
<link rel="alternate" hreflang="pt" href="https://yourdomain.com/pt/page" />
<link rel="alternate" hreflang="es" href="https://yourdomain.com/es/page" />
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com/page" />
```

**Rules:**
- `x-default` points to the default/fallback version.
- Hreflang must be reciprocal: if page A hreflangs to page B, page B must hreflang back to A.
- Include hreflang in sitemap.xml as well.
- Set `<html lang="xx">` dynamically based on the active language.

### 6.2 Translated SEO Content

Every locale file must have:
- Translated page titles and meta descriptions
- Translated FAQ questions and answers
- Translated UI labels (footer, nav, buttons)
- Translated entity names (currency names, product names, etc.)

Never leave SEO-critical text untranslated or in the wrong language.

### 6.3 URL Strategy for Languages

Three options (pick one):

| Strategy | Example | Pros | Cons |
|---|---|---|---|
| Subdirectory | `/pt/usd-to-brl` | Easy to implement, shared domain authority | Longer URLs |
| Subdomain | `pt.yourdomain.com` | Clear separation | Split domain authority |
| Same URL + lang detection | `/usd-to-brl` (content changes) | Simplest | Google may not index all versions |

Subdirectory is recommended for most projects.

---

## 7. Performance for SEO

Core Web Vitals directly affect Google ranking. Target these scores:

| Metric | Good | What It Measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| INP (Interaction to Next Paint) | < 200ms | How fast the page responds to clicks |
| CLS (Cumulative Layout Shift) | < 0.1 | How much the layout shifts while loading |

### 7.1 Performance Checklist

```html
<!-- Preconnect to external domains you'll fetch from -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://your-api-domain.com" />
<link rel="dns-prefetch" href="https://your-api-domain.com" />

<!-- Font loading: always use display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
```

**Implementation checklist:**
- [ ] Preconnect to all external domains (fonts, APIs, CDNs)
- [ ] Use `font-display: swap` on all web fonts
- [ ] Lazy load images below the fold (`loading="lazy"`)
- [ ] Use modern image formats (WebP, AVIF) with `<picture>` fallbacks
- [ ] Set explicit `width` and `height` on images to prevent CLS
- [ ] Cache API responses locally (localStorage/sessionStorage) when possible
- [ ] Code-split routes (lazy load pages not on initial view)
- [ ] Minimize JavaScript bundle size
- [ ] Use `React.memo()` or equivalent to prevent unnecessary re-renders
- [ ] SVG for icons and simple graphics (smaller than PNG)
- [ ] Compress assets with gzip/brotli on the server

### 7.2 SPA-Specific Performance

Single Page Applications need extra attention:

- **Noscript fallback:** Add meaningful HTML content inside `<noscript>` with your primary keywords, currency/product lists, and internal links. This ensures crawlers that don't execute JS still get content.
- **Consider SSR/SSG:** If SEO is critical, evaluate moving to Next.js, Nuxt, Astro, or Remix for server-side rendering. SSR gives crawlers pre-rendered HTML.
- **Prerendering service:** If you can't migrate to SSR, use a service like prerender.io to serve pre-rendered pages to bots.

---

## 8. Noscript Fallback for SPAs

If your app is a Single Page Application (client-side rendered), add a `<noscript>` block in `index.html`:

```html
<noscript>
  <div>
    <h1>Your Page Title with Primary Keyword</h1>
    <p>Description of what this page/app does, including target keywords.</p>
    <h2>Key Content Section</h2>
    <ul>
      <li><a href="/important-page-1">Important Page 1</a></li>
      <li><a href="/important-page-2">Important Page 2</a></li>
      <!-- List your key internal links -->
    </ul>
    <p>Please enable JavaScript for the full experience.</p>
  </div>
</noscript>
```

**Why:** Some crawlers and all non-JS users see this. It provides:
- Keyword-rich content for indexing
- Internal links for crawl discovery
- A fallback user experience

---

## 9. External Platform Setup Checklist

After deploying, do these in order:

### Week 1 — Required

- [ ] **Google Search Console** — Verify domain, submit sitemap
- [ ] **Google Analytics 4** — Add tracking script, set up conversions
- [ ] **HTTPS** — Ensure all pages serve over HTTPS
- [ ] **Redirects** — www → non-www (or vice-versa), HTTP → HTTPS
- [ ] **SPA fallback** — Configure hosting to serve index.html for all routes

### Week 2 — Recommended

- [ ] **Bing Webmaster Tools** — Submit sitemap
- [ ] **OG Image** — Create a 1200x630px image for social sharing
- [ ] **Google Rich Results Test** — Validate all structured data
- [ ] **PageSpeed Insights** — Test and fix Core Web Vitals
- [ ] **Mobile-Friendly Test** — Ensure responsive design works

### Month 1 — Growth

- [ ] **Google Business Profile** — If applicable (local business)
- [ ] **Social media profiles** — Link back to your site
- [ ] **Guest posts / backlinks** — Start building domain authority
- [ ] **Content calendar** — Plan blog posts for informational keywords

---

## 10. Hosting Configuration for SPAs

SPAs with client-side routing need the server to return `index.html` for all routes. Without this, direct navigation to `/any-page` returns 404.

**Netlify** — Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** — Create `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Nginx:**
```nginx
location / { try_files $uri $uri/ /index.html; }
```

**Apache** — Create `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Cloudflare Pages:** Automatic — no config needed.

---

## 11. Common SEO Mistakes to Avoid

| Mistake | Why It Hurts | Fix |
|---|---|---|
| Duplicate titles across pages | Google can't tell pages apart | Unique title per page |
| No meta description | Google generates a random snippet | Write compelling descriptions |
| Client-rendered content only | Some crawlers can't execute JS | Add noscript fallback or use SSR |
| Missing canonical tag | Duplicate content issues | Self-referencing canonical on every page |
| Blocking JS/CSS in robots.txt | Google can't render the page | Allow all resources |
| No internal links | Pages are orphaned, low authority | Link between related pages |
| Slow page load (>3s) | Higher bounce rate, lower ranking | Optimize CWV |
| No mobile responsiveness | Google uses mobile-first indexing | Mobile-first CSS |
| Thin content on programmatic pages | Google deindexes low-value pages | Add unique text, FAQ, data per page |
| No sitemap | Google may not discover all pages | Submit sitemap.xml |
| Broken links (404s) | Wasted crawl budget, bad UX | Audit and fix regularly |
| No HTTPS | Google marks as "not secure" | Enable SSL certificate |
| Keyword stuffing | Google penalizes over-optimization | Write naturally, prioritize user value |

---

## 12. SEO Monitoring Routine

### Weekly

- Check Google Search Console for crawl errors
- Monitor Core Web Vitals in PageSpeed Insights
- Review top pages and queries in Search Console

### Monthly

- Check indexed page count (site:yourdomain.com in Google)
- Review and update meta descriptions for underperforming pages
- Add new content / blog posts targeting long-tail keywords
- Check for broken links
- Update sitemap if new pages were added

### Quarterly

- Full technical audit (run Lighthouse, Screaming Frog, or Ahrefs)
- Review and refresh old content
- Analyze competitors for new keyword opportunities
- Update structured data if content types changed

---

## Quick Reference — File Checklist

Before launching any web project, verify these files exist and are correct:

```
public/
├── robots.txt          — Crawler rules + sitemap URL
├── sitemap.xml         — All indexable URLs
├── manifest.json       — PWA metadata
├── favicon.svg         — Site icon
├── og-image.png        — Social sharing image (1200x630)
└── _redirects          — SPA fallback (Netlify)

src/
├── seo/
│   ├── SeoHead.jsx     — Reusable head component (title, meta, OG, hreflang)
│   ├── StructuredData.jsx — JSON-LD schema components
│   └── seoContent.js   — SEO data (titles, descriptions, URL helpers)
├── components/
│   ├── Layout/         — Footer with internal links
│   ├── FAQ/            — Accordion FAQ with FAQPage schema
│   └── PopularItems/   — Internal linking grid
├── pages/
│   ├── HomePage.jsx    — With SeoHead, FAQ, PopularItems
│   └── DetailPage.jsx  — With SeoHead, Breadcrumb, FAQ, schema, content blocks
└── i18n/
    └── locales/        — SEO content translated per language
```

---

## Summary

The SEO hierarchy of impact, in order:

1. **Crawlable, indexable content** — If Google can't see it, nothing else matters
2. **Unique titles and descriptions** — How you appear in search results
3. **URL structure** — Clean, keyword-rich, permanent URLs
4. **Content depth** — Real, useful content on every page
5. **Internal linking** — Distribute authority and help crawlers find pages
6. **Structured data** — Rich results in SERP
7. **Performance** — Core Web Vitals ranking factor
8. **Backlinks** — External sites linking to yours (earned over time)

Implement in this order. Each layer builds on the previous one.
