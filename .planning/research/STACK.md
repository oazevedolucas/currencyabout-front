# Stack Research

**Domain:** Free currency-converter / finance-utility SPA preparing for Google AdSense approval
**Researched:** 2026-05-19
**Confidence:** HIGH

## Scope

This is **subsequent-milestone** research for `currencyabout.com`, an existing React 19 + Vite 6 + react-router-dom v7 SPA on Cloudflare Workers. The fixed stack is documented in `.planning/codebase/STACK.md` and is **not** re-investigated here. This file recommends specific approaches for six new capabilities required by the AdSense-approval sprint (PROJECT.md, Active phases):

1. Glossary popovers / tooltips
2. localStorage favorites with schema versioning
3. Code-splitting and lazy-loading
4. E-E-A-T signal components (bylines, "Last reviewed" dates, citations)
5. Core Web Vitals measurement tooling
6. Accessibility audit tooling for a small team

**Governing constraint:** zero net new runtime dependencies for the sprint (PROJECT.md, Constraints). Plain JavaScript, plain CSS, no ESLint, no TypeScript.

## Recommended Stack

### Core Technologies (already fixed — do not re-evaluate)

| Technology | Version | Purpose | Why Fixed |
|------------|---------|---------|-----------|
| React | ^19.1.0 | UI runtime | Locked in by PROJECT.md constraints; mid-sprint upgrade is out of scope |
| Vite | ^6.3.1 | Build tool | Locked in; `vite build` is the only build path |
| react-router-dom | ^7.13.2 | Routing | Locked in; routes defined in `src/App.jsx` |
| react-helmet-async | ^3.0.0 | `<head>` management | Locked in; SEO head used by every page via `src/seo/SeoHead.jsx` |

### New Capabilities (recommended approach per capability)

| Capability | Recommended Approach | Package & Version | Confidence |
|-----------|---------------------|-------------------|------------|
| Glossary popovers | Native HTML Popover API + CSS Anchor Positioning | **none (platform native)** | HIGH |
| Favorites + schema versioning | Hand-rolled versioned localStorage wrapper (~40 LOC) | **none (custom util)** | HIGH |
| Code-splitting | `React.lazy` + `<Suspense>` at route level in `src/App.jsx`, plus a tiny `manualChunks` for `react` / `react-dom` / `react-router-dom` vendor chunk | **none (uses React 19 + Vite 6 built-ins)** | HIGH |
| E-E-A-T signal components | Plain-CSS `<AuthorByline>`, `<LastReviewed>`, `<SourceCitations>` components + extend existing `ArticleSchema` JSON-LD with `author` + `dateModified` | **none (custom components)** | HIGH |
| Core Web Vitals measurement | `web-vitals` standard build, console-logged in dev only (NOT shipped to prod analytics this sprint) | **`web-vitals@^5.2.0`** as a `devDependency` | MEDIUM (only if measurement actually blocks Phase 3 work; otherwise skip the dep entirely and use Chrome DevTools + PageSpeed Insights) |
| Accessibility audit tooling | axe DevTools browser extension + Chrome Lighthouse (already built in) — both manual, zero deps | **none (browser tooling)** | HIGH |

### Supporting Libraries

**None.** The sprint's zero-net-new-dependencies goal is achievable for all six capabilities. The one optional addition (`web-vitals` as a devDependency) is downgraded to MEDIUM confidence below; in the recommended path, Phase 3 uses Chrome DevTools' built-in performance panel and PageSpeed Insights, and `web-vitals` is added **only** if the team needs INP attribution debugging during real-device testing.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Chrome DevTools (Performance + Lighthouse panels) | Real-device CWV measurement, mobile throttling, a11y audits | Built in; the Lighthouse a11y audit uses axe-core under the hood (subset of ~57 of axe-core's ~96 rules) |
| axe DevTools (browser extension by Deque) | Comprehensive automated a11y scan, more rules than Lighthouse | Free Chrome/Firefox extension; manual run per page; no runtime cost |
| PageSpeed Insights (web.dev/measure) | Field-data CWV from CrUX + lab data | Validates Phase 3 ships LCP/CLS/INP in "Good" without instrumenting the app |
| Manual keyboard + screen reader pass | Catches the 60–70% of WCAG issues automated tools miss | VoiceOver on macOS / TalkBack on Android for at least home, one guide, one pair, and the cookie consent banner |

## Installation

```bash
# Default sprint path: zero new runtime or build dependencies.
# Nothing to install.
```

Optional (only if Phase 3 requires INP attribution on real users — see "Stack Patterns by Variant" below):

```bash
npm install -D web-vitals@^5.2.0
```

This is a **devDependency**, not a runtime dependency. It is imported only behind an `if (import.meta.env.DEV)` guard so it never ships in the production bundle.

## Per-Capability Rationale

### 1. Glossary popovers — native Popover API + CSS Anchor Positioning

**Use:** HTML `popover` attribute + `popovertarget` + CSS `anchor-name` / `position-anchor` / `position-area`.

**Why:**
- Popover API reached Baseline Widely Available in April 2025; CSS Anchor Positioning hit Baseline in 2026 with full support in Chrome 125+, Firefox 147+, Safari 26.
- Focus management, light-dismiss, and ARIA wiring are handled by the browser — no manual `aria-expanded`, `aria-controls`, focus-trap, or escape-key handlers.
- Zero JavaScript, zero new dependencies, zero bundle cost.
- One small CSS file in `src/components/Glossary/Glossary.css` defines `anchor-name` on the trigger button and `position-anchor` + `position-area` on the `<div popover>`, with a `@position-try` fallback for viewport edges.
- For 10–15 finance terms (mid-market, bid-ask, spread, REER, DXY, peg, float, etc.) this is by far the simplest path.

**What NOT to use:**
- **Tippy.js, Floating UI, Popper.js, Radix UI Popover, Headless UI Popover** — all add 10–50 KB gzipped to a sprint whose explicit goal is to *shrink* the >500 KB single bundle. The browser does this natively and more performantly.
- **Custom `<details>` element** — viable for a single inline definition but cannot anchor-position above a trigger, has no light-dismiss, and provides a worse keyboard/screen-reader experience than the Popover API.
- **MUI Popover / Material UI** — entire framework would have to come with it; violates the no-rebrand and no-heavy-deps constraints.

### 2. localStorage favorites — hand-rolled versioned wrapper

**Use:** A ~40-LOC `src/services/storage.js` (or extend an existing storage util) exposing `readVersioned(key, latestVersion, migrate)` and `writeVersioned(key, version, value)`. Each stored object is `{ v: <int>, data: <payload> }`. On read, if `v < latestVersion`, the `migrate(oldData, oldVersion)` function returns the upgraded payload, which is then re-persisted.

**Why:**
- `CONCERNS.md` already flags "localStorage usage has no schema versioning" as a known concern; PROJECT.md requires Phase 5 to address this before adding a sixth key (favorites).
- The pattern is small enough that a 3rd-party lib (`versioned-storage`, `@webcored/react-local-storage`, `migrate-local-storage`) is pure overhead — none of them is widely adopted enough to justify a runtime dep, and all add an API the rest of the codebase doesn't share with the existing 5 localStorage usages.
- A single shared util can be retrofitted onto the existing `exchange-rates-cache`, cookie-consent, theme, language, and precision-toggle keys at the team's leisure, without forcing this sprint to migrate them all.

**Wrapper sketch (illustrative, not final):**

```js
// src/services/storage.js
export function readVersioned(key, latestVersion, migrate) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    const v = Number.isInteger(parsed.v) ? parsed.v : 0
    if (v === latestVersion) return parsed.data
    const upgraded = migrate(parsed.data, v)
    writeVersioned(key, latestVersion, upgraded)
    return upgraded
  } catch {
    return null
  }
}

export function writeVersioned(key, version, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ v: version, data }))
  } catch { /* quota or private mode — fail silent */ }
}
```

**Schema for `currencyabout.favorites` (v1):** `{ pairs: [{ from: 'USD', to: 'EUR', addedAt: 1747600000 }], pinned: ['USD-EUR'] }`. A future v2 (e.g. adding `amount`) gets a `migrate(data, 1)` clause; older data is upgraded on next read.

**What NOT to use:**
- `versioned-storage`, `migrate-local-storage`, `@webcored/react-local-storage` — all functional but each adds a runtime dep with <100k weekly downloads and an unfamiliar API. The cost of a 40-LOC util is lower than a long-term dependency.
- **Redux Persist** — solves a problem this app doesn't have (no Redux); massive scope creep.
- **Dexie.js / IndexedDB** — overkill for ~10 favorite pairs; IndexedDB's async API would complicate the home-page render path.

### 3. Code-splitting — `React.lazy` per route + minimal `manualChunks`

**Use:**
1. In `src/App.jsx`, convert every page import to `const HomePage = lazy(() => import('./pages/HomePage.jsx'))` and wrap `<Routes>` in `<Suspense fallback={<RouteSkeleton />}>`.
2. In `vite.config.js`, add a small `build.rollupOptions.output.manualChunks` function that splits the React + react-dom + react-router-dom vendor chunk away from app code.
3. Leave `react-helmet-async` in the app chunk (it's small and used by every route, so splitting it produces no win).
4. Optionally lazy-load the 16 guide bodies (`src/content/guides.js`) via dynamic import on `/guides/:slug` — this is the single biggest win because the current bundle includes every guide's full markdown text on every page.

**Why:**
- `CONCERNS.md` documents the >500 KB single JS bundle warning from `vite build`. Route-level lazy + a tiny vendor split is the standard, well-documented Vite 6 + react-router v7 pattern in 2026, and the combination commonly drops main-bundle size by 50–95% on routes the user never visits.
- React 19 ships native `<Suspense>` boundaries; no extra dep needed for fallback UI.
- Cloudflare Workers static-asset hosting serves the new chunks directly — no infra change.
- `manualChunks` for the vendor split is a **build-time** decision that does not change app behavior; safe during active AdSense review.

**Concrete `manualChunks` (illustrative):**

```js
// vite.config.js — inside defineConfig({ build: { rollupOptions: { output: ... } } })
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('react-router')) return 'router'
    if (id.includes('react-dom') || id.includes('/react/')) return 'react'
    if (id.includes('react-helmet-async')) return 'helmet'
  }
}
```

**What NOT to use:**
- **Aggressive per-component lazy loading** (lazy-load `<RateDisclaimer />`, `<AdSlot />`, etc.) — these mount on every page and would introduce loading flashes that a returning AdSense reviewer might catch.
- **`rollup-plugin-visualizer`** as a runtime dep — fine as a one-off `npx`/devDependency for analysis, but don't commit it to `package.json` for the sprint.
- **Loadable Components / @loadable/component** — react-router v7 + React 19 + `React.lazy` covers this natively; the third-party lib is no longer needed.

### 4. E-E-A-T components — three small components + extend existing JSON-LD

**Use:**
- `src/components/Editorial/AuthorByline.jsx` — renders byline (author name, role, link to `/about#editorial-team` anchor or a dedicated `/authors/<slug>` page if added later). Visible above the guide title.
- `src/components/Editorial/LastReviewed.jsx` — renders "Published: YYYY-MM-DD · Last reviewed: YYYY-MM-DD" with human-readable dates. Both dates are required visible per Google's byline-dates guidance.
- `src/components/Editorial/SourceCitations.jsx` — renders a numbered or bulleted list of cited sources at the bottom of each guide (e.g. ECB statistical data warehouse, BIS triennial survey, IMF SDR composition page). Each `<a>` has `rel="noopener"` and a visible publication name.
- Extend the existing `ArticleSchema` JSON-LD in `src/seo/` to include `author` (as `Person` with `name` + `url`), `datePublished`, and `dateModified`. Per Google's structured-data guidelines, the JSON-LD `dateModified` must match the visible "Last reviewed" date and the sitemap `lastmod`.

**Why:**
- Google's 2026 E-E-A-T guidance explicitly rewards named bylines that link to an author page with verifiable expertise, visible dates labeled with "Published" / "Last reviewed", and consistent dates across visible content, structured data, and sitemap.
- These are content + small-component changes; no dependency burden.
- The guides already use `ArticleSchema` JSON-LD — extending it is a 10-line patch to one file rather than introducing a new SEO library.

**What NOT to use:**
- **A CMS or headless content layer (Sanity, Contentful, Strapi)** — wildly out of scope; guides live in `src/content/guides.js` and that's working.
- **`schema-dts` or other schema typings** — repo is plain JS and rejects TS adoption this sprint.
- **Generic "rich snippet" plugins** — react-helmet-async + a small JSON-LD literal is sufficient.

### 5. Core Web Vitals measurement — Chrome DevTools first, `web-vitals@^5.2.0` only if needed

**Default path (HIGH confidence, zero deps):** Use Chrome DevTools' Performance panel with mobile-emulation + CPU throttling (4× slowdown) and the built-in Lighthouse panel for synthetic CWV. Validate field data with PageSpeed Insights (`https://pagespeed.web.dev/`), which pulls the real CrUX dataset for `currencyabout.com`. This covers everything Phase 3's "validate LCP/CLS/INP fall in the 'Good' range" requirement asks for, with no instrumentation.

**Optional path (MEDIUM confidence):** If real-user INP debugging is needed (CrUX rarely surfaces *which* interaction is slow), install `web-vitals@^5.2.0` as a **devDependency** and import the `attribution` build behind a dev-only guard:

```js
// src/main.jsx — dev-only
if (import.meta.env.DEV) {
  import('web-vitals/attribution').then(({ onINP, onLCP, onCLS }) => {
    onINP(console.log); onLCP(console.log); onCLS(console.log)
  })
}
```

This never ships to production. Do **not** wire it to Google Analytics, AdSense, or any third-party endpoint during the active review window — extra third-party beacons risk a reviewer flagging the page.

**Why this split:** INP is the most-failed Core Web Vital in early-2026 CrUX (~43% of sites fail the 200ms threshold), and the `attribution` build is the only easy way to identify which click handler causes a long task. But: Phase 3 explicitly aims to *reduce* bundle size and avoid new third-party network calls. Shipping a CWV beacon to production this sprint trades performance work for instrumentation work.

**What NOT to use:**
- **Sentry / Datadog RUM / New Relic Browser** — paid, heavy, and introduces a third-party script during an active AdSense review.
- **Google Analytics CWV reporting** — would re-introduce a marketing tag the site has deliberately avoided pre-approval.
- **`web-vitals` as a `dependency` (not `devDependency`)** — even with a `DEV` guard, listing it as a runtime dep is misleading and risks accidental import from production code.

### 6. Accessibility audit tooling — axe DevTools extension + Lighthouse + manual

**Use:**
1. Install the **axe DevTools** browser extension (Deque, free Chrome + Firefox extension) and run a full scan on home, one guide, one pair page, exchange-rates-today, methodology, and the 404 page. axe DevTools runs the full ~96-rule axe-core ruleset.
2. Run **Chrome Lighthouse's Accessibility audit** on the same pages (it uses a 57-rule subset of axe-core, but the report format is easier to share).
3. Manual keyboard pass: Tab through home + cookie banner + one guide + one pair without a mouse; confirm focus order and visible focus rings.
4. Manual screen-reader pass: VoiceOver (macOS) on home + one guide + cookie banner; confirm landmark structure and that `aria-*` on the converter announces sensibly.

**Why:**
- All automated tooling catches only ~30–40% of WCAG issues; the remaining 60–70% is manual. For a small team with no QA budget, the highest leverage is one thorough automated scan + a 30-minute manual pass per major template, not a CI integration.
- PROJECT.md explicitly excludes ESLint adoption this sprint, so `eslint-plugin-jsx-a11y` is **not** an option. (Recommended for the future "tech-debt sprint" if ESLint is ever adopted: `eslint-plugin-jsx-a11y@^6.10.0` paired with `@eslint/js@^9.x` flat config.)
- axe DevTools and Lighthouse together produce overlapping findings that confirm each other and prevent false negatives.

**What NOT to use this sprint:**
- **`eslint-plugin-jsx-a11y`** — excellent linter, but adopting ESLint is out of scope per PROJECT.md.
- **`jest-axe` / `@axe-core/react`** — there is no test framework in the repo (`TESTING.md` confirms zero tests). Adding axe runtime checks without a test runner is dead weight.
- **Pa11y / WAVE / accessibility-checker as CI tools** — each requires a new build pipeline integration the team has no capacity to maintain this sprint.
- **Paid axe DevTools Pro / IBM Equal Access** — free tier covers small-site needs.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Native Popover + Anchor Positioning | Tippy.js (`@tippyjs/react@^4.2.6`) | If you need to support legacy Safari < 17 or pre-Chrome 125 enterprise environments. Currencyabout.com's audience is consumer-mobile-first 2026 traffic — irrelevant here. |
| Native Popover + Anchor Positioning | Radix UI Popover (`@radix-ui/react-popover@^1.x`) | If the project also adopts Radix for dialogs, menus, dropdowns. Single Popover does not justify the framework. |
| Hand-rolled `storage.js` | `versioned-storage` / `migrate-local-storage` | If you have >20 keys with frequent schema changes and a team unfamiliar with localStorage semantics. The site has 5 keys total. |
| `React.lazy` + minimal `manualChunks` | Aggressive per-component lazy with React Server Components | Requires a Cloudflare Workers + RSC server. Out of scope this sprint. |
| Chrome DevTools + PageSpeed Insights | `web-vitals@^5.2.0` attribution build | If the team needs to identify a specific slow interaction handler that PageSpeed reports as "poor" but cannot reproduce locally. |
| axe DevTools extension (manual) | `@axe-core/react@^4.10.x` runtime mounting | If a test framework is added later; runtime axe is too noisy in dev console without tests gating it. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Tippy.js, Floating UI, Popper.js, Radix Popover, Headless UI Popover | All add 10–50 KB gzip; the Popover API + Anchor Positioning now does this natively in all evergreen browsers as of Baseline 2026. Sprint goal is to *shrink* the bundle. | Native HTML `popover` attribute + CSS anchor positioning. |
| Redux, Zustand, Jotai for favorites | Adds a runtime state-management dep for a single feature (favorites list). `useState` + a `storage.js` wrapper handles it. | `useState` + custom `useFavorites()` hook reading/writing through `readVersioned`/`writeVersioned`. |
| Dexie.js / IndexedDB | Async API would complicate render path; overkill for ~10 favorite pairs. | localStorage + versioned wrapper. |
| Sentry, Datadog RUM, New Relic, GA4 RUM | Third-party scripts during active AdSense review increase reviewer-perceived complexity and tracking surface. | Chrome DevTools + PageSpeed Insights field data. Defer RUM until post-approval. |
| `eslint-plugin-jsx-a11y` this sprint | PROJECT.md excludes ESLint adoption. | axe DevTools extension + Lighthouse + manual keyboard/screen-reader pass. |
| `@axe-core/react` runtime | No test framework in repo; dev-only console noise without gating tests. | axe DevTools browser extension run manually per template. |
| `versioned-storage`, `migrate-local-storage` npm packages | ~40 LOC equivalent costs less long-term than a third-party dep nobody on the team has used. | Hand-rolled `readVersioned` / `writeVersioned` in `src/services/storage.js`. |
| `schema-dts` for JSON-LD typings | Requires TypeScript adoption (excluded by PROJECT.md). | Hand-written JSON-LD object literal inside `react-helmet-async`'s `<script type="application/ld+json">`. |
| `react-loadable` / `@loadable/component` | React 19 + react-router v7 + `React.lazy` covers route splitting natively. | `lazy()` + `<Suspense>`. |
| MUI / Chakra / Mantine Popover components | Each pulls a design system; violates no-rebrand and zero-new-deps constraints. | Native Popover. |
| Google Tag Manager / GA4 added to gate CWV reporting | Adds a third-party script during active AdSense review. | Dev-only `web-vitals` import behind `import.meta.env.DEV`. |

## Stack Patterns by Variant

**If `vite build` still warns >500 KB after route-level lazy + vendor `manualChunks`:**
- Apply a second pass: dynamic-import the guide content map (`src/content/guides.js`) so a single guide's body loads only when `/guides/:slug` is hit.
- If still warning, split each guide into its own file under `src/content/guides/<slug>.js` and import lazily on the matched route.

**If PageSpeed Insights field data shows poor INP and DevTools cannot reproduce locally:**
- Add `web-vitals@^5.2.0` as a `devDependency` and use the attribution build (dev-only guard) to identify the slow handler.
- Remove the import before the next production build.

**If a future milestone adopts ESLint (out of scope this sprint):**
- Add `eslint-plugin-jsx-a11y@^6.10.0` alongside flat config. Pair with `eslint-plugin-react@^7.37.x` for React 19 rules.

**If favorites grow beyond ~50 entries or per-user data needs cross-device sync:**
- Replace localStorage with a Cloudflare D1 / Workers KV-backed account system. Out of scope here.

**If the AdSense reviewer flags missing visible authorship:**
- Add a dedicated `/authors/<slug>` route with full author bio, expertise, and external profile links. The `<AuthorByline>` component should `href` into this route from day one so it's a 1-file add later, not a refactor.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `web-vitals@^5.2.0` | React 19, Vite 6, modern browsers | v5 dropped legacy FID metric; INP is the interactivity metric. Use the `web-vitals/attribution` import path for debug data. |
| Native Popover API | Chrome 114+, Firefox 125+ (Baseline April 2025) | Universally supported in 2026 evergreen browsers per Baseline Widely Available status. |
| CSS Anchor Positioning | Chrome 125+, Firefox 147+, Safari 26 (Baseline 2026) | If supporting Safari 17 traffic that has not updated, ship a `@supports (anchor-name: --x)` progressive enhancement and fall back to a CSS-only `position: absolute` placement. |
| React 19 + react-router-dom v7 | `React.lazy` + `<Suspense>` for route splits | No extra config required; v7's `<Routes>` works with lazy children directly. |

## Sources

- [web-vitals — npm](https://www.npmjs.com/package/web-vitals) — confirmed latest is **5.2.0** (published ~2026-03)
- [GitHub — GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals) — attribution build documentation
- [Popover API — web.dev (Baseline)](https://web.dev/blog/popover-baseline) — confirmed Baseline status April 2025
- [Popover API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — `popover` / `popovertarget` attribute reference
- [CSS Anchor Positioning Baseline 2026](https://pockit.tools/blog/css-anchor-positioning-api-complete-guide/) — confirmed Chrome 125+ / Firefox 147+ / Safari 26 support
- [Article structured data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/article) — `Article` / `BlogPosting`, `datePublished`, `dateModified` schema requirements
- [Byline Dates in SEO — Search Engine Land](https://searchengineland.com/guide/byline-dates) — published vs reviewed date labeling guidance
- [Add a Byline Date to Google Search Results — Google Search Central](https://developers.google.com/search/docs/appearance/publication-dates) — date visibility and consistency requirements
- [E-E-A-T in 2026 — Keywords Everywhere](https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/) — author-page expectations for 2026
- [Lazy Loading Routes with Vite and React Router v7 — schof.co](https://schof.co/lazy-loading-routes-with-vite-and-react-router-v7/) — concrete pattern for the recommended approach
- [Taming Large Chunks in Vite + React — Mykola Aleksandrov](https://www.mykolaaleksandrov.dev/posts/2025/11/taming-large-chunks-vite-react/) — `manualChunks` strategy
- [axe DevTools vs Lighthouse — inclly](https://inclly.com/resources/axe-vs-lighthouse) — confirmed axe runs ~96 rules vs Lighthouse's ~57
- [Versioned localStorage migration — Jan Monschke](https://janmonschke.com/simple-frontend-data-migration/) — versioned `{ v, data }` wrapper pattern
- `.planning/codebase/STACK.md` — fixed core stack (React 19 / Vite 6 / react-router-dom v7 / react-helmet-async)
- `.planning/codebase/CONCERNS.md` — documented >500 KB bundle warning, localStorage schema-versioning gap
- `.planning/PROJECT.md` — sprint constraints (no new runtime deps, no TS, no ESLint, plain CSS, no rebrand)

---
*Stack research for: AdSense-approval reinforcement sprint on existing React 19 + Vite SPA*
*Researched: 2026-05-19*
