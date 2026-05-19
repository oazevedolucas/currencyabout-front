# Architecture Research

**Domain:** React 19 + Vite SPA on Cloudflare Workers — currency-converter / finance utility preparing for Google AdSense approval
**Researched:** 2026-05-19
**Confidence:** HIGH

## Scope

Targeted research for the 5-phase AdSense reinforcement sprint (E-E-A-T, UX polish, performance, glossary, favorites) on top of the existing architecture documented in `.planning/codebase/ARCHITECTURE.md`. The recommendations are constrained by:

- No SSR (rebuild risk, out of scope)
- No new heavy dependencies (zero net new is the goal)
- Cloudflare Workers static-assets-only deploy
- Active AdSense review window — every commit must keep `npm run build` green and no half-finished features visible

## Standard Architecture (recommended target shape)

```
┌──────────────────────────────────────────────────────────────────┐
│                    index.html  (Cloudflare static asset)         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Inline critical CSS (<=14KB)   Preconnect/preload hints   │  │
│  │  Static JSON-LD: WebSite · Organization · WebApplication   │  │
│  │  <noscript> editorial fallback   ads.txt link              │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│                    React entry (main.jsx, eager)                 │
│  HelmetProvider → ThemeProvider → I18nProvider → App             │
├──────────────────────────────────────────────────────────────────┤
│  Eager bundle (initial route only)            Lazy bundles       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │ Layout shell │  │ HomePage     │  │ React.lazy() routes:   │  │
│  │ + CookieCons │  │ + converter  │  │  CurrencyPairPage      │  │
│  │ + nav/footer │  │   hooks      │  │  GuidesIndexPage       │  │
│  └──────────────┘  └──────────────┘  │  GuidePage             │  │
│                                      │  ExchangeRatesToday    │  │
│  ┌──────────────────────────────┐    │  legal/* pages         │  │
│  │ Vendor chunks (manualChunks) │    │  NotFoundPage          │  │
│  │  react-vendor                │    └────────────────────────┘  │
│  │  router-vendor               │    ┌────────────────────────┐  │
│  │  helmet-vendor               │    │ Lazy data chunks:      │  │
│  └──────────────────────────────┘    │  content/guides.js     │  │
│                                      │  content/currencyProf  │  │
│                                      └────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  Below-the-fold deferred                                         │
│  ┌──────────────────┐  ┌──────────────────┐                      │
│  │ AdSlot           │  │ Glossary popover │                      │
│  │ IntersectionObs  │  │ HTML Popover API │                      │
│  │ reserved height  │  │ + role=dialog    │                      │
│  └──────────────────┘  └──────────────────┘                      │
└──────────────────────────────────────────────────────────────────┘
```

The eager bundle should contain only what is needed to paint the converter on the home page (the LCP element). Everything else — pair, guides, exchange-rates-today, legal, the editorial content modules, and the AdSense script — loads on demand.

## Component Responsibilities (recommended additions/changes)

| Component | Responsibility | File / approach |
|-----------|----------------|-----------------|
| `App.jsx` (modified) | Replace static page imports with `React.lazy(() => import(...))` for every route except `HomePage`. Wrap `<Routes>` in a single `<Suspense fallback={<RouteFallback/>}>` | `src/App.jsx` |
| `RouteFallback` (new, tiny) | Static skeleton that matches `Layout` chrome height. No spinner overlay — reserved space matches the route to suppress CLS | `src/components/RouteFallback/RouteFallback.jsx` (~30 lines) |
| `useGlossary` (new) | Tiny client hook: exposes `{open, term, openTerm, close}` plus the term dictionary. No fetch — terms ship as a JS data module like `guides.js`. | `src/hooks/useGlossary.js` |
| `GlossaryPopover` (new) | Single popover instance mounted in `Layout`; rendered via the native HTML Popover API with `role="dialog"` + `aria-modal="false"` and Escape-to-dismiss. One DOM node reused across triggers. | `src/components/Glossary/GlossaryPopover.jsx` |
| `GlossaryTerm` (new) | Inline `<button>` trigger that uses `popovertarget="glossary-popover"` and passes the term key via `data-term`. Adds `aria-describedby` on focus. | `src/components/Glossary/GlossaryTerm.jsx` |
| `glossary.js` (new) | Plain JS dictionary of 10–15 finance terms; each entry `{term, short, longGuideSlug}`. Imported eagerly only by `GlossaryPopover` (which lives in `Layout`, but the dictionary is small — <2KB gzip). | `src/content/glossary.js` |
| `useFavorites` (new) | localStorage-backed list of `{from,to,seenAt}` records; `add/remove/list/clear`. Day-scoped trim to keep storage bounded. New storage key `currencyabout_pairs_v1` (note the `v1` for future migration). | `src/hooks/useFavorites.js` |
| `FavoritesStrip` (new) | Renders a horizontal strip of recent pairs on `HomePage` and `ExchangeRatesTodayPage`. Hidden when empty — never adds vertical space speculatively. | `src/components/FavoritesStrip/FavoritesStrip.jsx` |
| `AdSlot` (modify) | Always reserve final height before consent/intersection resolves; consume `min-height` from a `slotId → height` map sourced from `AD_SLOTS`. Today the placeholder is conditional, which is a CLS risk. | `src/components/AdSlot/AdSlot.jsx` |
| `SeoHead` / `StructuredData` (modify) | Add `Person` schema for the byline author, expand `ArticleSchema` with `author`, `datePublished`, `dateModified`, `publisher`. Add `Organization` JSON-LD reference. Optionally add `FinancialProduct` (subtype `CurrencyConversionService`) to home and pair pages. | `src/seo/SeoHead.jsx`, `src/seo/StructuredData.jsx` |
| `BylineMeta` (new) | Small visible-on-page byline + "Last reviewed YYYY-MM-DD" component that mirrors the `Person`/`Article` JSON-LD it emits. Mounted on every guide + methodology page. | `src/components/BylineMeta/BylineMeta.jsx` |
| `vite.config.js` (modify) | Add `build.rollupOptions.output.manualChunks` to split `react`/`react-dom`, `react-router-dom`, `react-helmet-async` into stable vendor chunks. Optionally bump `build.chunkSizeWarningLimit` only after splits land. | `vite.config.js` |

## Recommended Project Structure (delta vs current)

```
src/
├── components/
│   ├── Glossary/                 # NEW — popover + term button
│   │   ├── GlossaryPopover.jsx
│   │   ├── GlossaryPopover.css
│   │   └── GlossaryTerm.jsx
│   ├── FavoritesStrip/           # NEW — recents UI
│   │   ├── FavoritesStrip.jsx
│   │   └── FavoritesStrip.css
│   ├── BylineMeta/               # NEW — visible byline + last-reviewed
│   │   ├── BylineMeta.jsx
│   │   └── BylineMeta.css
│   └── RouteFallback/            # NEW — Suspense fallback skeleton
│       ├── RouteFallback.jsx
│       └── RouteFallback.css
├── content/
│   ├── glossary.js               # NEW — 10–15 term dictionary
│   └── authors.js                # NEW — Person schema source of truth
├── hooks/
│   ├── useGlossary.js            # NEW — popover state + dictionary access
│   └── useFavorites.js           # NEW — localStorage CRUD
└── seo/
    └── StructuredData.jsx        # MODIFIED — add PersonSchema, expand ArticleSchema
```

### Structure rationale

- **`components/Glossary/`:** Keep popover + trigger together — they share CSS and the popover-target id. Putting them in the existing `components/` folder follows the documented "folder per component" convention (`STRUCTURE.md`).
- **`content/glossary.js` and `content/authors.js`:** Follow the existing "editorial data as code" pattern already used by `guides.js` and `currencyProfiles.js`. No CMS, no fetch. `authors.js` is a tiny lookup so multiple JSON-LD emitters and `BylineMeta` share one source of truth.
- **`hooks/useFavorites.js` and `hooks/useGlossary.js`:** Match the existing `useExchangeRates` / `useCurrencyConverter` / `useAdSenseLoader` pattern. Storage key `currencyabout_pairs_v1` honours the `CONCERNS.md` note about lack of schema versioning by introducing a version suffix from day one.
- **`RouteFallback`:** Single component shared across all `Suspense` boundaries. The fallback's height must match the eventual route's minimum chrome to avoid CLS during a code-split chunk load.

## Architectural Patterns

### Pattern 1: Route-level code splitting with shared Suspense and vendor manual chunks

**What:** Convert every page import in `src/App.jsx` to `React.lazy(() => import(...))`. Wrap the `<Routes>` block in a single `<Suspense>` that uses a height-reserving skeleton, not a spinner. Pair this with `vite.config.js` `manualChunks` that pulls React, React Router, and react-helmet-async into long-lived vendor files keyed by package name.

**When to use:** When the production bundle exceeds the 500KB warning (current state, per `CONCERNS.md`) and most users land on the home page or a single pair page, so route-level boundaries are the natural split point. The site is 100% client-side, so route splitting is the largest win available without changing rendering strategy.

**Trade-offs:**
- Pro: Splits the >500KB bundle into a small initial chunk (just `HomePage` + converter hooks + shell) plus on-demand chunks. Vendor chunks gain stable hashes so they cache across deploys.
- Pro: Editorial content (`guides.js`, `currencyProfiles.js`) follows the route that imports it. Home-page visitors never download all 16 guides (currently they do — see "Editorial content imported eagerly" anti-pattern in the existing `ARCHITECTURE.md`).
- Con: One extra round trip per first navigation to a non-home route. Mitigated by Cloudflare edge caching and HTTP/2 multiplexing.
- Con: A Suspense fallback that does not match final route height causes CLS — must measure each route's shell height and pick a reserved min-height.
- Con: Lazy routes interact with `react-helmet-async`. Helmet still applies head changes on the subsequent commit, but the initial title/canonical for a deep link is delayed by the chunk load. For Googlebot (which now reliably executes JS but with a delay) this is acceptable but worth verifying with the URL Inspection tool after deploy.

**Example:**
```js
// src/App.jsx — every route except HomePage is lazy.
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'                  // eager — LCP route
import { RouteFallback } from './components/RouteFallback/RouteFallback.jsx'

const CurrencyPairPage   = lazy(() => import('./pages/CurrencyPairPage.jsx'))
const ExchangeToday      = lazy(() => import('./pages/ExchangeRatesTodayPage.jsx'))
const GuidesIndexPage    = lazy(() => import('./pages/guides/GuidesIndexPage.jsx'))
const GuidePage          = lazy(() => import('./pages/guides/GuidePage.jsx'))
const AboutPage          = lazy(() => import('./pages/legal/AboutPage.jsx'))
// ...legal/* and NotFoundPage same shape

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/converter" element={<HomePage />} />
            <Route path="/exchange-rates-today" element={<ExchangeToday />} />
            <Route path="/guides" element={<GuidesIndexPage />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* ...rest before /:pair */}
            <Route path="/:pair" element={<CurrencyPairPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
```

```js
// vite.config.js — vendor split. Function form so any future package lands automatically.
export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router'))    return 'router-vendor'
          if (id.includes('react-helmet'))    return 'helmet-vendor'
          if (id.includes('react-dom'))       return 'react-vendor'
          if (id.includes('/react/'))         return 'react-vendor'
          return 'vendor'
        },
      },
    },
  },
})
```

### Pattern 2: Critical CSS inlined in index.html + deferred component CSS

**What:** Extract the rules needed to render the eager bundle (Layout shell + converter input + currency input) and inline them in `<style>` inside `index.html`. Defer everything else by letting Vite-emitted `<link rel="stylesheet">` load as it always does, but ensure the initial paint never blocks on a route-CSS file by keeping the eager bundle's CSS small. No new build plugin required if you hand-write the critical CSS once and treat it as a maintained asset alongside `index.css`.

**When to use:** SPA with no SSR where LCP is dominated by the converter input rendering. The 14KB compressed budget is plenty for converter + nav + skip-link styles.

**Trade-offs:**
- Pro: Removes one render-blocking CSS round trip. Pairs directly with the lazy route split — only the home-page CSS needs to be inline.
- Pro: Zero new dependencies. Avoids adding `critters` or `vite-plugin-critical`, both of which add build-time complexity for marginal gain on a small CSS surface.
- Con: Manual maintenance — when the shell HTML/CSS changes, the inline copy must be updated. Mitigated by keeping the inline block tagged with a clear comment block and a build-time check (a simple `node` script in `npm run build` prelude can diff the inline block against a canonical file).
- Con: First paint loses the dark-mode flash protection unless the `data-theme` script in `index.html` runs before any visible content paints. The current `ThemeContext` sets `data-theme` after React mounts; consider a tiny inline `<script>` that reads `localStorage.currencyabout_theme` and stamps `data-theme` on `<html>` before the React mount to avoid a flash. (This is already partly addressed but worth verifying alongside critical CSS work.)

**Example:**
```html
<!-- index.html, inside <head>, before the bundled <link rel="stylesheet"> -->
<style id="critical-shell">
  :root { /* tokens copied from src/index.css — keep in sync */ }
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
  .skip-link, .site-header, main, .currency-input { /* minimal layout */ }
  [data-theme="dark"] { /* dark token overrides */ }
</style>
<script>
  // No flash: stamp theme before React mounts. Keep tiny (~250 bytes).
  try {
    var t = localStorage.getItem('currencyabout_theme')
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', t)
  } catch (_) {}
</script>
```

### Pattern 3: HTML Popover API for glossary definitions with ARIA dialog semantics

**What:** Use the native HTML Popover API (`popover` attribute + `popovertarget` invoker) for the glossary feature. The browser handles Escape-to-dismiss, top-layer rendering, and outside-click dismiss for free. Layer ARIA on top: `role="dialog"` (because the popover contains interactive content — a "Read more" link — and is not just descriptive text), `aria-labelledby` pointing at the term heading, `aria-modal="false"` because it does not trap focus. The single popover element lives in `Layout`; each `<GlossaryTerm>` is a `<button popovertarget="glossary-popover" data-term="spread">` that dispatches an event the popover listens to in order to swap content.

**When to use:** Click-triggered definition popovers in a content-heavy site where keyboard access and screen-reader correctness matter. The Popover API is fully supported in Chrome, Edge, Firefox, and Safari as of 2026, so a polyfill is not needed.

**Trade-offs:**
- Pro: Native API gives Escape dismiss, light-dismiss, top-layer (no z-index battles), and `aria-expanded` on the invoker for free.
- Pro: Single popover instance avoids 10–15 duplicated DOM trees on a guide page that mentions multiple terms.
- Pro: Works without JavaScript for simple definitions if the popover content is co-located; degrades gracefully (the trigger is a button — keyboard accessible by default).
- Con: `role="dialog"` requires deliberate `aria-labelledby` and a focusable element inside (the "Read more" link suffices). Without one, screen-reader users land on dialog with no anchor.
- Con: `popover="auto"` light-dismisses on outside click, which is the right default; but `popover="manual"` is needed if a future "pin" feature is added. Choose `auto` for now.
- Con: WCAG 2.2 SC 1.4.13 (Content on Hover or Focus) requires the content to be *dismissible*, *hoverable*, and *persistent*. Native Popover handles dismissibility; the dialog content is reachable by mouse and persists until dismissed — compliant. But avoid hover triggers; use click/Enter/Space only. Hover triggers fail the "hoverable" rule when the cursor must cross gaps to reach the popover.
- Con: Tooltips (role="tooltip") are NOT the right pattern here — tooltips are presentational, dismiss on focus loss, and may not contain interactive content. The glossary content has a link, so `role="dialog"` is correct.

**Example:**
```jsx
// src/components/Glossary/GlossaryTerm.jsx
export function GlossaryTerm({ termKey, children }) {
  return (
    <button
      type="button"
      className="glossary-term"
      popovertarget="glossary-popover"
      data-term={termKey}
      aria-haspopup="dialog"
    >
      {children}
      <span aria-hidden="true" className="glossary-term__indicator">?</span>
    </button>
  )
}

// src/components/Glossary/GlossaryPopover.jsx — single instance in Layout
export function GlossaryPopover() {
  const [term, setTerm] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    function onToggle(e) {
      if (e.newState !== 'open') return
      // popovertargetelement is the invoker; capture its data-term
      const invoker = document.activeElement?.closest('[data-term]')
      setTerm(invoker?.dataset.term ?? null)
    }
    const el = ref.current
    el?.addEventListener('toggle', onToggle)
    return () => el?.removeEventListener('toggle', onToggle)
  }, [])

  const entry = term ? GLOSSARY[term] : null
  return (
    <div
      ref={ref}
      id="glossary-popover"
      popover="auto"
      role="dialog"
      aria-labelledby="glossary-popover-title"
      className="glossary-popover"
    >
      {entry && (
        <>
          <h3 id="glossary-popover-title">{entry.term}</h3>
          <p>{entry.short}</p>
          {entry.longGuideSlug && (
            <Link to={`/guides/${entry.longGuideSlug}`}>Read more</Link>
          )}
        </>
      )}
    </div>
  )
}
```

### Pattern 4: Reserved-height ad slots with double-gated lazy render

**What:** Today's `AdSlot` returns `null` until both consent and route allowlist pass, then arms an IntersectionObserver. The CLS risk: the placeholder height transitions from 0 to the ad height when the gates resolve. Change `AdSlot` to *always* render a `<div className="ad-slot ad-slot--<slotId>" style={{ minHeight }}>` from first paint, regardless of consent state. Inside that container, render the `<ins>` conditionally as it does today. This reserves space immediately and the IntersectionObserver still controls when `adsbygoogle.push({})` runs.

**When to use:** Any AdSense placement on a page measured by CLS. The Google AdSense reviewer and Lighthouse both penalise unreserved ad space.

**Trade-offs:**
- Pro: CLS contribution from ads goes to zero. Site-wide CLS aggregate improves (the March 2026 Core Web Vitals update aggregates at the domain level, so any single high-CLS page hurts everywhere — see Pattern 5).
- Pro: Reviewer sees a visibly polished page even before consent (the empty reserved slot is invisible/subtle, but the layout below the ad doesn't jump when consent is granted).
- Con: A small amount of pixel real estate is "wasted" on rejected-consent users. Acceptable trade-off — the alternative is layout shift after first paint, which is worse for both UX and CWV.
- Con: Need a `slotId → min-height` map. Source it from a single `AD_SLOTS_HEIGHTS` constant in `src/constants/adsense.js`. Values come from the AdSense slot dashboard (responsive slots use the maximum height they may render to).

**Example:**
```jsx
// src/components/AdSlot/AdSlot.jsx (delta)
import { AD_SLOTS_HEIGHTS } from '../../constants/adsense.js'

export function AdSlot({ slotId, format = 'auto' }) {
  const { pathname } = useLocation()
  const allowed = isAdAllowedOnRoute(pathname)
  const minHeight = AD_SLOTS_HEIGHTS[slotId] ?? 250 // medium rectangle fallback
  // ... existing consent + observer state
  if (!allowed) return null // route gate: don't even reserve

  return (
    <div className="ad-slot" style={{ minHeight }} aria-hidden={!consent || !visible}>
      {consent && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
```

### Pattern 5: No build-time prerendering — invest in noscript + Googlebot signals instead

**What:** Investigate but do not adopt `vite-plugin-prerender` / `prerender-spa-ultra` / Vike for this milestone. Reasons:

1. Googlebot reliably executes JavaScript in 2026 and renders React SPAs with a modest delay. The risk is bot indexing, not human LCP.
2. The current `index.html` `<noscript>` block already provides editorial content for the rare crawler that doesn't execute JS, plus the three static JSON-LD blocks (`WebSite`, `Organization`, `WebApplication`) ride along on every page.
3. Build-time prerendering against a 400+ pair URL space + 16 guides + N legal pages introduces a custom build orchestration, headless-chrome dependency, and a new failure mode mid-AdSense-review — exactly the kind of risk explicitly out of scope.
4. The bigger LCP gains come from route splitting and critical CSS (Patterns 1 and 2). Once those land, measured LCP should be in the "good" range without prerender.

**When to revisit:** If Google Search Console shows that indexed pages have stale or missing meta (e.g. canonical wrong, h1 missing), or if measured LCP on mid-tier mobile stays above 2.5s after Patterns 1, 2, and 4 are in production. At that point evaluate a tiny custom build step that renders just `/`, `/guides`, and the popular pair routes to static `*.html` files and serves them with Cloudflare Workers' static-asset routing fallback.

**Example:** *Intentionally no example — this is a "don't do" pattern for this sprint.*

### Pattern 6: Person + Article + FinancialProduct JSON-LD for E-E-A-T

**What:** Expand `src/seo/StructuredData.jsx`:

1. Add a `PersonSchema` helper. Source data from a new `src/content/authors.js`:
   ```js
   export const AUTHORS = {
     'editorial-desk': {
       '@type': 'Person',
       name: 'CurrencyAbout Editorial Desk',
       url: 'https://currencyabout.com/about',
       sameAs: [], // add LinkedIn/X when available
       jobTitle: 'Editorial Team',
       knowsAbout: ['Foreign Exchange', 'Currency Markets', 'Monetary Policy'],
     },
   }
   ```
2. Modify `ArticleSchema` to require `author` (a `Person` ref or object), `datePublished`, `dateModified`, and a `publisher` object pointing to the existing `Organization` JSON-LD. Pull `dateModified` from the guide's `updated` field already present in `src/content/guides.js`.
3. On `HomePage`, `CurrencyPairPage` (indexable variants only), and `ExchangeRatesTodayPage`, emit a `FinancialProduct`/`CurrencyConversionService` schema:
   ```js
   {
     '@context': 'https://schema.org',
     '@type': 'FinancialProduct',
     name: 'Mid-market currency conversion',
     provider: { '@type': 'Organization', name: 'CurrencyAbout', url: 'https://currencyabout.com' },
     category: 'CurrencyConversionService',
   }
   ```
4. Emit `BreadcrumbList` everywhere (already done on pair and guide pages — confirm coverage extends to legal and the rates landing).

**When to use:** Always, for E-E-A-T-sensitive verticals. Finance is YMYL in Google's quality framework; visible author + structured author + freshness metadata is table stakes in 2026. AI search engines also key off `Person`/`Organization` for citation attribution.

**Trade-offs:**
- Pro: Strengthens the editorial-trust signal for an AdSense reviewer on first read and improves AI-citation surfacing.
- Pro: All static — no runtime cost, no new dependency. Just JS data + JSX emitters.
- Con: Requires keeping `authors.js` accurate. The byline must point to a real bio page (the existing `/about` works as a destination for the editorial desk).
- Con: Visible bylines must match structured-data bylines exactly. Source both from `authors.js` to keep them in sync via the `BylineMeta` component.

## Data Flow

### Eager bundle request flow (home page)

```
Browser → Cloudflare static → index.html (inline critical CSS + JSON-LD)
                                ↓
                           [first paint within ~200ms]
                                ↓
                          /src/main.jsx → Provider stack → App
                                ↓
                          HomePage (eager) renders converter
                                ↓
                          useExchangeRates → localStorage cache → render rate table
                                ↓
                          (later) AdSlot reserves height → IntersectionObserver →
                          (later still) consent grant → adsbygoogle.push
```

### Lazy route navigation flow (e.g., user clicks /guides)

```
Click → React Router transition starts
        ↓
   Suspense fallback (RouteFallback) renders within shell — no CLS, no spinner
        ↓
   import('./pages/guides/GuidesIndexPage.jsx') chunk fetch (cached after first)
        ↓
   GuidesIndexPage renders → SeoHead updates head → BylineMeta + JSON-LD emit
        ↓
   AdSlots on the route mount with reserved height
```

### Glossary popover interaction flow

```
User clicks <GlossaryTerm term="spread">
        ↓
Browser fires invoker → popovertarget="glossary-popover"
        ↓
Popover element's 'toggle' event → GlossaryPopover swaps content for term
        ↓
Popover renders in top layer with role="dialog", aria-labelledby
        ↓
Escape | outside-click | re-click → browser dismisses → focus restored to invoker
```

### State management (no change to global model)

```
Local useState in pages and components
            ↓
            └→ Context: I18n, Theme (unchanged)
            └→ Event channel: cookie-consent-changed (unchanged)
            └→ NEW localStorage key: currencyabout_pairs_v1  (useFavorites)
            └→ NEW Glossary state: useState in GlossaryPopover only
```

No new Context provider is introduced — favorites and glossary are local concerns. This preserves the "two contexts only" constraint in the existing `ARCHITECTURE.md`.

## Build Order Implications for the 5 Phases

The 5 phases in `PROJECT.md` interact with these patterns in a specific order. Build order matters because each phase must ship clean (active AdSense review).

| Phase | Patterns | Order rationale |
|-------|----------|-----------------|
| **1. Editorial trust (E-E-A-T)** | Pattern 6, `BylineMeta`, `authors.js`, `PersonSchema`, expanded `ArticleSchema` | Ship first. Pure content additions — zero performance impact, zero risk. Reviewer-visible immediately. No interaction with code splitting. |
| **2. UX polish** | (none — visual tightening of existing components) | Ships in parallel with Phase 1 or right after. Touches existing components only; should not change DOM structure enough to interact with patterns below. |
| **3. Performance + CWV** | Pattern 1 (route split + manualChunks), Pattern 2 (critical CSS), Pattern 4 (AdSlot reserved height) | Ship AFTER Phase 1 because lazy routes will pull `guides.js` (now larger from byline additions in Phase 1) out of the eager bundle. Doing Phase 3 first would just be redone after Phase 1 lands more content. Pattern 5 (don't prerender) is locked in here. |
| **4. Glossary popover** | Pattern 3 (Popover API + role=dialog) | Ships AFTER Phase 3 because the glossary is mounted in `Layout` and adds ~2KB to the eager bundle for the dictionary. Better to land code splitting first so the impact is measurable, not muddled. Also lets the glossary terms be linked into existing guides (Phase 1) without rebuilding. |
| **5. Favorites strip** | `useFavorites` + `FavoritesStrip`, storage key `currencyabout_pairs_v1` | Ships last. Smallest reviewer-impact, depends on no other pattern. Storage versioning baked in to avoid the `CONCERNS.md` migration debt. |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–1k DAU | Current architecture is fine. Lazy routes + reserved AdSlots + critical CSS get LCP under 2.5s and CLS near 0 on mid-tier mobile. |
| 1k–100k DAU | Watch the Cloudflare static-asset cache hit ratio. Bundle splits create more chunks — verify `cache-control: immutable` is set on hashed assets (Vite default emits hashes; Cloudflare auto-caches). Consider preloading the pair-page chunk on the home page once measured navigation paths confirm pair pages are the dominant next click. |
| 100k+ DAU | Re-evaluate Pattern 5: build-time prerendering of `/`, `/guides`, and the ~20 indexable pair pages becomes worth the build complexity once organic traffic justifies it. Move `useExchangeRates` to a `RatesProvider` Context (the anti-pattern already noted in `.planning/codebase/ARCHITECTURE.md`) so route transitions don't re-mount fetch effects. |

### Scaling priorities

1. **First bottleneck: JS bundle on mobile (already hitting it).** Patterns 1, 2, 4 fix this. No infra change needed.
2. **Second bottleneck: rates state duplicated across pages.** Documented anti-pattern. Convert `useExchangeRates` to a Context provider mounted in `Layout` once route splitting lands. Out of scope for this sprint per the "no new architecture" constraint, but pre-staged by the Phase 3 work.
3. **Third bottleneck: indexing latency for new pair pages.** Mitigated by sitemap discipline and the existing `noindex` policy on thin pairs. If it becomes a real problem, that triggers a re-evaluation of Pattern 5.

## Anti-Patterns

### Anti-Pattern 1: Spinner-based Suspense fallback

**What people do:** `<Suspense fallback={<Spinner />}>` — a tiny spinner replaces the full route area.
**Why it's wrong:** The route loads in 50–300 ms on a warm cache, but the spinner-to-content swap shifts every element below the spinner. CLS spikes. Reviewer sees a flicker.
**Do this instead:** A `RouteFallback` skeleton that reserves the chrome height and stamps a faint structural placeholder. Match the final route's first-screen height as closely as possible. On warm-cache loads users barely see it; on cold-cache loads they see content arrive in place rather than jump.

### Anti-Pattern 2: Hover-triggered glossary popovers

**What people do:** Open the definition on `:hover` of an inline term.
**Why it's wrong:** Fails WCAG 2.2 SC 1.4.13 hoverable/persistent requirements when users must move across gaps to reach the popover. Mobile has no hover. Keyboard users get nothing.
**Do this instead:** Click/Enter/Space activation only, via a `<button>` trigger. Native Popover API gives Escape dismissal and outside-click dismissal for free.

### Anti-Pattern 3: Lazy-loading the LCP-relevant component

**What people do:** Add `React.lazy` indiscriminately — including for `HomePage` or its `CurrencyInput`.
**Why it's wrong:** The converter input *is* the LCP element. Lazy-loading it adds a chunk fetch before the LCP element can render. LCP regresses.
**Do this instead:** Keep `HomePage`, `Layout`, `CurrencyInput`, `useCurrencyConverter`, and `useExchangeRates` in the eager bundle. Lazy-load only routes other than home and components that render below the fold.

### Anti-Pattern 4: AdSlot with no reserved height until consent

**What people do:** Return `null` from `AdSlot` until consent + intersection both pass, then render full-height ad.
**Why it's wrong:** Layout shifts at consent time (after the cookie banner is dismissed) — large CLS hit precisely when the reviewer interacts with the page. Also hits the March 2026 site-wide CWV aggregation.
**Do this instead:** Reserve `min-height` from first paint based on the slot's expected size. Render the `<ins>` only after gates pass, but never let the surrounding layout move.

### Anti-Pattern 5: Multiple popover DOM trees, one per term

**What people do:** Render a hidden `<div class="popover">` next to every `GlossaryTerm` inline.
**Why it's wrong:** A guide page that mentions 8 terms gets 8 hidden popover trees in the DOM. Memory churn, accessibility tree pollution, and `aria-controls` resolution gets ambiguous.
**Do this instead:** One `GlossaryPopover` mounted in `Layout`, addressed by `popovertarget="glossary-popover"` from every term button. Content swaps based on the active invoker's `data-term`.

### Anti-Pattern 6: Adopting Vike / vite-plugin-prerender mid-sprint

**What people do:** Reach for prerendering as a silver bullet for SEO and LCP.
**Why it's wrong:** New build dependency, new failure modes, headless-chrome at build time on Cloudflare, all of it converging during an active AdSense review window. Violates "no new heavy dependencies" and "active review" constraints.
**Do this instead:** Use the existing `<noscript>` editorial fallback + Googlebot's JS execution + the route split + critical CSS combination. Re-evaluate prerendering only if real Search Console signals warrant it.

## Integration Points

### External services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google AdSense (`pagead2.googlesyndication.com`) | Consent-gated script + IntersectionObserver-armed `<ins>` slots, reserved height | Existing pattern; add reserved height (Pattern 4). No other change. The script must remain commented out in `index.html` — adding it back defeats the consent gate. |
| `open.er-api.com` (rates) | Day-cached fetch in `services/exchangeRate.js` | Unchanged. Survives lazy-loading. |
| Google Fonts / system fonts | `<link rel="preconnect">` in `index.html` | Confirm `font-display: swap` to prevent FOIT contributing to LCP. |
| AdSense reviewer (human + automated) | Crawl every public route; Lighthouse runs from CrUX-like profile | Site-level CWV aggregation (March 2026 update) means no single page can be poor. Apply Patterns 1, 2, 4 to all routes, not just home. |
| Googlebot / Bingbot | Execute JS, follow links from rendered DOM and `sitemap.xml` | Lazy-loaded routes are fine — Googlebot follows links and triggers the chunk fetch. Confirm with URL Inspection tool that lazy routes' canonicals resolve correctly. |

### Internal boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `Layout` ↔ `GlossaryPopover` | Direct mount (Popover is a child of Layout) | One instance, addressed by id from every term button. |
| `GlossaryTerm` ↔ `GlossaryPopover` | Browser-native `popover` + `popovertarget` invoker + `toggle` event | No React state crossing — the DOM event-driven contract is intentional and avoids prop drilling. |
| `useFavorites` ↔ `localStorage` | Direct `getItem`/`setItem` with `try/catch` and `currencyabout_pairs_v1` key | Match the wrapping style in `services/exchangeRate.js` and `CookieConsent.jsx`. Version suffix in the key. |
| `BylineMeta` ↔ `authors.js` ↔ `StructuredData` | All three read the same `AUTHORS[key]` record | Single source of truth — visible byline and JSON-LD `Person` always match. |
| `App` (lazy routes) ↔ `react-helmet-async` | Helmet still applies head changes on chunk-load commit | Verify with the URL Inspection tool that lazy routes' canonical URLs and titles are visible to Googlebot. |
| `AdSlot` ↔ `Layout` (consent state) | Existing `cookie-consent-changed` `window.CustomEvent` | Unchanged. The reserved-height change is layout-only. |

## Confidence Notes

- **HIGH confidence:** Patterns 1, 2, 3, 4, 6. All grounded in current (2026) authoritative sources and well-understood patterns. Tooling (HTML Popover API, Vite manualChunks, JSON-LD schema types) is stable and supported.
- **MEDIUM confidence:** Pattern 5 (no prerender). The argument depends on Googlebot's JS-execution reliability in 2026 — true today, but worth monitoring via Search Console. If indexing slips, the recommendation flips.
- **Constraint-driven trade-off:** The "no SSR / no heavy deps" constraints mean some perf ceiling exists. The recommended combination (route split + critical CSS + reserved ads + lazy data) should put the home and guide pages comfortably in CWV "Good". Pair pages with `currencyProfiles.js` lazy-loaded should also be Good. If a future milestone lifts the no-SSR constraint, consider React Router v7's framework mode (server-side rendering with file-system routes) — but that is a different project.

## Sources

- [Lazy Loading Routes with Vite and React Router v7 — Schof](https://schof.co/lazy-loading-routes-with-vite-and-react-router-v7/)
- [Making My React App Feel Instant: Route-Level Code-Splitting with React.lazy, Suspense, and Vite manualChunks — Mykola Aleksandrov](http://www.mykolaaleksandrov.dev/posts/2025/10/react-lazy-suspense-vite-manualchunks/)
- [Taming "Large Chunks" in Vite + React — Mykola Aleksandrov](https://www.mykolaaleksandrov.dev/posts/2025/11/taming-large-chunks-vite-react/)
- [Vite code splitting that just works — Sambit Sahoo](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)
- [Building for Production — Vite docs](https://v3.vitejs.dev/guide/build)
- [Splitting vendor chunk with Vite — DEV Community](https://dev.to/tassiofront/splitting-vendor-chunk-with-vite-and-loading-them-async-15o3)
- [Faster Lazy Loading in React Router v7.5+ — Remix blog](https://remix.run/blog/faster-lazy-loading)
- [Pre-Rendering — React Router docs](https://reactrouter.com/how-to/pre-rendering)
- [Build a Vite Plugin to Inline Critical Resources — DEV Community](https://dev.to/ethancarlsson/build-a-vite-plugin-to-inline-critical-resources-3j6h)
- [How I Improved My Website's LCP and SEO with Critical CSS in Vite + React — Medium](https://medium.com/@fadingbeat/how-i-improved-my-websites-lcp-and-seo-with-critical-css-in-vite-react-vercel-257aede4f22c)
- [Critical CSS Explained: How to Extract & Inline for Faster FCP — PageSpeedMatters](https://www.pagespeedmatters.com/resources/glossary/critical-css)
- [Defer non-critical CSS — web.dev](https://web.dev/articles/defer-non-critical-css)
- [Core Web Vitals 2026: INP, LCP & CLS Optimization — Digital Applied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [Core Web Vitals in 2026: The Practical Fixes — DEV Community](https://dev.to/benriemer/core-web-vitals-in-2026-the-practical-fixes-for-inp-lcp-and-cls-that-actually-work-4ef0)
- [Core Web Vitals in 2026: What Google's March Update Changed — Logos Web Designs](https://logoswebdesigns.com/blog/core-web-vitals-2026-march-update/)
- [Minimize layout shift — Google Publisher Tag docs](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
- [How to Fix CLS Shifting When Using Google AdSense — Gold Penguin](https://goldpenguin.org/blog/fix-massive-cls-shift-from-adsense/)
- [Cumulative Layout Shift (CLS) and Ads — Advanced Ads](https://wpadvancedads.com/cumulative-layout-shift-cls-and-ads/)
- [Prerendering of SPA applications — Cloudflare Community](https://community.cloudflare.com/t/prerendering-of-spa-applications/391138)
- [How to do Pre-Render for React SPAs (with CF Workers)? — Cloudflare Community](https://community.cloudflare.com/t/how-to-do-pre-render-for-react-spas-with-cf-workers/851242)
- [prerender-spa-ultra — GitHub](https://github.com/antitoxic/prerender-spa-ultra)
- [FinancialProduct — Schema.org](https://schema.org/FinancialProduct)
- [Banks and Financial Institutions — Schema.org](https://schema.org/docs/financial.html)
- [JSON-LD: The Complete Guide to Structured Data in 2026 — Schema Pilot](https://www.schemapilot.app/blog/json-ld-guide/)
- [JSON-LD Schema Markup for Business Websites: 2026 Guide — Slaff.io](https://slaff.io/en/blog-posts/json-ld-schema-markup-for-business-websites-the-complete-2026-guide)
- [Schema Markup Best Practices 2026 — Geneo](https://geneo.app/blog/schema-markup-best-practices-2026-json-ld-audit/)
- [Tooltip Pattern — W3C WAI ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [Accessible Tooltips Example 2026 — WCAG 2.2 Compliant Guide](https://www.thewcag.com/examples/tooltips)
- [WCAG 1.4.13 Content on Hover or Focus — WCAG.com](https://www.wcag.com/authors/1-4-13-content-on-hover-or-focus/)
- [Tooltips in the time of WCAG 2.1 — Sarah Higley](https://sarahmhigley.com/writing/tooltips-in-wcag-21/)
- [On popover accessibility: what the browser does and doesn't do — hidde.blog](https://hidde.blog/popover-accessibility/)
- [Semantics and the popover attribute — hidde.blog](https://hidde.blog/popover-semantics/)
- [Getting Started With The Popover API — Smashing Magazine (March 2026)](https://www.smashingmagazine.com/2026/03/getting-started-popover-api/)
- [Using the Popover API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using)
- [Comparing the Popover API and the <dialog> element — LogRocket](https://blog.logrocket.com/comparing-popover-api-dialog-element/)
- [Accessible Drop-Down Menus in 2026 Without a Framework — dfm2html](https://www.dfm2html.com/tutorials/accessible-drop-down-menus-in-2026-without-a-framework/)
- [Google AdSense Program Policies 2026 — WPThemeLabs](https://www.wpthemelabs.com/adsense-program-policies-compliance-checklist/)
- [Understanding Google Page Experience — Google Search Central](https://developers.google.com/search/docs/appearance/page-experience)

---
*Architecture research for: AdSense reinforcement sprint on a React 19 + Vite + Cloudflare Workers SPA*
*Researched: 2026-05-19*
