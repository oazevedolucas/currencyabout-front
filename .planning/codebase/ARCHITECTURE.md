<!-- refreshed: 2026-05-18 -->
# Architecture

**Analysis Date:** 2026-05-18

## System Overview

```text
                              Browser
                                 │
                                 ▼
                       index.html ( /src/main.jsx )
                                 │
              ┌──────────────────┴──────────────────┐
              │  StrictMode → HelmetProvider →      │
              │  ThemeProvider → I18nProvider → App │
              └──────────────────┬──────────────────┘
                                 ▼
                  src/App.jsx (BrowserRouter)
                                 │
                                 ▼
            src/components/Layout/Layout.jsx (shell)
              header · <main>{children}</main> · footer · CookieConsent
                                 │
                                 ▼
            Routes (src/App.jsx)  ──► page component
              /                  ─► pages/HomePage.jsx
              /converter         ─► pages/HomePage.jsx          (alias)
              /exchange-rates-today ─► pages/ExchangeRatesTodayPage.jsx
              /:pair             ─► pages/CurrencyPairPage.jsx  (matches /^[a-z]{3}-to-[a-z]{3}$/)
              /guides            ─► pages/guides/GuidesIndexPage.jsx
              /guides/:slug      ─► pages/guides/GuidePage.jsx
              /about | /privacy-policy | /terms | /contact | /methodology
                                 ─► pages/legal/*.jsx
              *                  ─► pages/NotFoundPage.jsx
                                 │
                                 ▼
            Page composition (typical pair / home flow):
              SeoHead + Structured-data helpers (react-helmet-async)
              useCurrencyConverter ──► useExchangeRates ──► services/exchangeRate.js
                                                              │
                              ┌───────────────────────────────┤
                              ▼                               ▼
                  localStorage cache                fetch open.er-api.com
              (key: currencyabout_rates)             (BRL-base rates)
                              │
                              ▼
              CURRENCY_META (src/constants/currencies.js) + getRate()
                              │
                              ▼
              UI components: CurrencyInput · CurrencyGrid · CurrencyCard
                             PopularPairs · FAQ · AdSlot · RateDisclaimer
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `main.jsx` | React 19 root, mounts provider stack (Helmet → Theme → I18n → App) | `src/main.jsx` |
| `App` | Declares `BrowserRouter`, wraps everything in `Layout`, defines all routes | `src/App.jsx` |
| `Layout` | Site shell: skip-link, header (brand + primary nav + ThemeToggle + LanguageSelector), main slot, footer (popular pairs / tools / legal), CookieConsent banner; calls `useAdSenseLoader` once | `src/components/Layout/Layout.jsx` |
| `I18nProvider` | Language detection (localStorage → `navigator.language` → `en`), `t` dictionary lookup, `changeLang` + `<html lang>` update | `src/i18n/I18nContext.jsx` |
| `ThemeProvider` | Light/dark detection (localStorage → `prefers-color-scheme`), sets `data-theme` on `<html>` and `theme-color` meta | `src/theme/ThemeContext.jsx` |
| `useExchangeRates` | One-shot fetch on mount, joins API rates with `CURRENCY_META`, exposes `{currencies, loading, error, fromCache, rateDate}` | `src/hooks/useExchangeRates.js` |
| `useCurrencyConverter` | Composes `useExchangeRates`, owns input amount (centavos), source currency, multi-select filter, sort mode, precision toggle, derives sorted/visible lists | `src/hooks/useCurrencyConverter.js` |
| `fetchRates` | Service layer: day-keyed localStorage cache, then `fetch('https://open.er-api.com/v6/latest/BRL')` | `src/services/exchangeRate.js` |
| `SeoHead` | Per-page `<title>`, description, canonical, OG/Twitter, hreflang (x-default + 7 langs all pointing to same URL), optional `noindex` | `src/seo/SeoHead.jsx` |
| `StructuredData` | JSON-LD helpers: `BreadcrumbSchema`, `FAQSchema`, `ArticleSchema`, `CurrencyPairSchema` | `src/seo/StructuredData.jsx` |
| `seoContent` | SEO constants/templates: `SITE_URL`, `POPULAR_PAIRS`, `pairSlug`/`pairUrl`, `isIndexablePair`, per-page title/description builders | `src/seo/seoContent.js` |
| `CookieConsent` | Banner UI; persists `cookie-consent` (accepted|rejected) to localStorage; broadcasts `cookie-consent-changed` `CustomEvent` | `src/components/CookieConsent/CookieConsent.jsx` |
| `useAdSenseLoader` | Mounted in `Layout`; injects the AdSense `<script>` on consent + reacts to the consent event; idempotent | `src/hooks/useAdSenseLoader.js` |
| `AdSlot` | Route-allowlisted, consent-gated, lazy-loaded `<ins.adsbygoogle>` (`IntersectionObserver` w/ 200 px root margin) | `src/components/AdSlot/AdSlot.jsx` |
| `CurrencyGrid` / `CurrencyCard` | Render the conversion table; per-card expand, copy-to-clipboard, top-result highlight, optional continent grouping | `src/components/CurrencyGrid/*`, `src/components/CurrencyCard/*` |

## Pattern Overview

**Overall:** Client-side SPA (Vite + React 19 + React Router 7) with file-colocated CSS modules-by-convention, custom React-Context state, and a thin service layer over a single REST endpoint. Editorial content is embedded as JavaScript data modules consumed by render functions inside page components. SEO is handled per page by composing `react-helmet-async` head fragments.

**Key Characteristics:**
- Single-page app served as static assets through Cloudflare (Wrangler `not_found_handling: "single-page-application"`) — every unknown path falls back to `index.html`.
- No global state manager (no Redux/Zustand/RTK). State is local `useState` + two Contexts (`I18nProvider`, `ThemeProvider`).
- Data flow is one-shot: a single `useExchangeRates` call on mount, day-cached in `localStorage`; no refresh, no polling, no subscriptions.
- Pair pages share `useCurrencyConverter` with the home page — uniform conversion behaviour, only the UI surface differs.
- SEO is a first-class layer: `noindex` for non-curated pairs (`isIndexablePair`), JSON-LD per page type, hreflang x-default for the single-URL multi-language strategy.
- AdSense is fully consent-gated and route-allowlisted; placement components render nothing until both gates pass.
- Editorial content (16 guides, 21 currency profiles) is shipped as JavaScript constants — no CMS, no fetching.

## Layers

**Entry / Bootstrap:**
- Purpose: Mount React root with the provider stack.
- Location: `src/main.jsx`
- Contains: `createRoot`, `StrictMode`, `HelmetProvider`, `ThemeProvider`, `I18nProvider`.
- Depends on: `react`, `react-dom/client`, `react-helmet-async`, two Context providers, `App`.
- Used by: `index.html` `<script type="module" src="/src/main.jsx">`.

**Routing / Shell:**
- Purpose: Map URLs to pages and wrap them in a global chrome (header, footer, consent banner).
- Location: `src/App.jsx`, `src/components/Layout/Layout.jsx`.
- Contains: `BrowserRouter`, `Routes`, `Route`, `Layout`.
- Depends on: `react-router-dom`, every page module, `useI18n`, `useAdSenseLoader`, `POPULAR_PAIRS` / `pairUrl`.
- Used by: `main.jsx`.

**Pages (route-level views):**
- Purpose: One component per route; orchestrates SEO + data + UI sections.
- Location: `src/pages/`, `src/pages/guides/`, `src/pages/legal/`.
- Contains: `HomePage.jsx`, `CurrencyPairPage.jsx`, `ExchangeRatesTodayPage.jsx`, `GuidesIndexPage.jsx`, `GuidePage.jsx`, `NotFoundPage.jsx`, `AboutPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`, `ContactPage.jsx`, `MethodologyPage.jsx`.
- Depends on: hooks, components, SEO helpers, content modules.
- Used by: `App.jsx` route table.

**Hooks (state composition):**
- Purpose: Encapsulate cross-cutting client behaviour.
- Location: `src/hooks/`
- Contains: `useExchangeRates.js` (fetch + cache + meta join), `useCurrencyConverter.js` (input/sort/filter/precision over rates), `useAdSenseLoader.js` (consent-gated script injection).
- Depends on: `services/exchangeRate.js`, `constants/currencies.js`, `seo/seoContent.js`, `i18n/I18nContext.jsx`.
- Used by: pages and `Layout`.

**Services (data fetch):**
- Purpose: Encapsulate every network call. Currently a single function for daily rates.
- Location: `src/services/exchangeRate.js`
- Contains: `fetchRates()` with day-keyed `localStorage` cache around `https://open.er-api.com/v6/latest/BRL`.
- Depends on: `fetch`, `localStorage`.
- Used by: `useExchangeRates`.

**Constants:**
- Purpose: Static configuration that ships with the bundle.
- Location: `src/constants/`
- Contains: `currencies.js` (`CURRENCY_META`, `CONTINENT_ORDER`, `CONTINENT_META`, `getRate`); `adsense.js` (`ADSENSE_CLIENT_ID`, `AD_SLOTS`, `NO_AD_ROUTES`, `isAdAllowedOnRoute`).
- Depends on: nothing.
- Used by: every layer above.

**i18n / Theme (Context state):**
- Purpose: User-preference state with localStorage persistence.
- Location: `src/i18n/I18nContext.jsx` + `src/i18n/locales/{en,pt,es,fr,de,zh,ja}.js`; `src/theme/ThemeContext.jsx`.
- Contains: Provider, `useI18n`/`useTheme` hooks, language detection, theme detection, dictionary import.
- Depends on: `react`, `localStorage`, locale files.
- Used by: most components and pages.

**Content (editorial data as code):**
- Purpose: Long-form SEO content, written once, shipped as JS.
- Location: `src/content/`
- Contains: `guides.js` (16 guide entries — each a structured body of `{ type: 'lead'|'h2'|'h3'|'p'|'list'|'callout'|'disclaimer', ... }` blocks; ~977 lines); `currencyProfiles.js` (21 currency profiles; `getProfile(code)`).
- Depends on: nothing.
- Used by: `GuidePage`, `GuidesIndexPage`, `CurrencyPairPage`, `NotFoundPage`.

**SEO:**
- Purpose: Per-page head, schema.org JSON-LD, indexing policy.
- Location: `src/seo/`
- Contains: `SeoHead.jsx`, `StructuredData.jsx`, `seoContent.js`.
- Depends on: `react-helmet-async`, `useI18n`.
- Used by: every public page.

**UI components:**
- Purpose: Reusable presentational and small-state widgets.
- Location: `src/components/<Name>/<Name>.{jsx,css}` (sibling CSS per component).
- Contains: 17 component folders (`AdSlot`, `Breadcrumbs`, `CookieConsent`, `CurrencyCard`, `CurrencyFilter`, `CurrencyGrid`, `CurrencyInput`, `FAQ`, `FeaturedResult`, `LanguageSelector`, `Layout`, `PopularPairs`, `PrecisionToggle`, `QuickAmounts`, `RateDisclaimer`, `SortSelect`, `ThemeToggle`).
- Depends on: Context hooks, constants, SEO helpers (for links).
- Used by: pages.

## Data Flow

### Primary Request Path — load home or pair page

1. Browser requests `/`. Cloudflare static assets return `index.html` (`wrangler.jsonc:8-9`: `not_found_handling: "single-page-application"`).
2. `index.html` (`/Users/lucasazevedo/Projects/suacotacao-front/index.html:174`) loads `/src/main.jsx`.
3. `main.jsx:9-19` mounts `<StrictMode><HelmetProvider><ThemeProvider><I18nProvider><App/>`.
4. `App.jsx:19-37` wraps everything in `BrowserRouter`+`Layout` and matches the URL against the route table.
5. `Layout.jsx:10-12` calls `useI18n()` for nav labels and `useAdSenseLoader()` (the one mount point that injects the AdSense script if consent is granted — `src/hooks/useAdSenseLoader.js:22-37`).
6. The matched page renders. It composes:
   - `SeoHead` → `<Helmet>` with title/description/OG/hreflang.
   - Optional `BreadcrumbSchema` / `ArticleSchema` / `FAQSchema` / `CurrencyPairSchema` JSON-LD.
   - `useCurrencyConverter('BRL'|fromCode, rawValue)` (`src/hooks/useCurrencyConverter.js:19-120`).
7. Inside that hook, `useExchangeRates()` mounts (`src/hooks/useExchangeRates.js:12-46`):
   - Calls `fetchRates()` (`src/services/exchangeRate.js:27-45`).
   - `fetchRates` reads `localStorage['currencyabout_rates']`; if `cached.date === today`, returns `{rates, fromCache:true, date}`; otherwise `fetch(API_URL)`, validates `data.result==='success'`, writes the cache, returns `{rates, fromCache:false, date:today}`.
   - The hook joins those rates into `CURRENCY_META` (only currencies present in both lists), producing `{code, name, flag, symbol, continent, rateToBRL}` records.
8. `useCurrencyConverter` derives `amount = Number(rawValue) / 100`, localises currency names through `t.currencies`, sorts (`strength-desc|strength-asc|continent|alpha|popular`), filters by `selectedCodes`, exposes `precision` (`rounded`|`precise`).
9. Page renders `CurrencyInput`, `CurrencyGrid` (which calls `getRate(allCurrencies, fromCurrency, target)` → `to.rateToBRL / from.rateToBRL`), `PopularPairs`, `FAQ`, `AdSlot`, `RateDisclaimer`.
10. After first paint, `AdSlot` (`src/components/AdSlot/AdSlot.jsx:12-72`) checks consent + route allowlist; if both pass, it observes the `<ins>` and `window.adsbygoogle.push({})` when within 200 px of the viewport.

### Currency-pair URL resolution

1. `App.jsx:32` matches `/:pair` for unknown segments.
2. `CurrencyPairPage.jsx:37-41` matches `params.pair` against `/^([a-z]{3})-to-([a-z]{3})$/i`. On miss, returns `<NotFoundPage/>`.
3. On hit, looks up `fromMeta`/`toMeta` in `CURRENCY_META`; if either is unknown returns 404.
4. `isIndexablePair(fromCode, toCode)` (`src/seo/seoContent.js:42-60`) decides whether to add `<meta name="robots" content="noindex, follow">` — only `POPULAR_PAIRS` + reverses + all majors-pair combinations are indexable.
5. `CurrencyPairSchema` JSON-LD is emitted only for indexable pairs.

### Language / Theme switching

1. `LanguageSelector` calls `changeLang(code)` (`src/i18n/I18nContext.jsx:29-33`) → updates state, writes `currencyabout_lang`, sets `document.documentElement.lang`.
2. `useI18n` returns a fresh `t` (memoised against `lang`); every component using `t` re-renders.
3. `ThemeToggle` calls `toggleTheme()` (`src/theme/ThemeContext.jsx:21-27`) → updates state, writes `currencyabout_theme`, the effect on `theme` sets `data-theme` on `<html>` and the `theme-color` meta tag (`src/theme/ThemeContext.jsx:15-19`).

### Consent / Ads coordination

1. `CookieConsent` mounts at the bottom of `Layout` (`src/components/Layout/Layout.jsx:109`).
2. On first visit, after a 600 ms delay, it renders. On click, it writes `cookie-consent` (`accepted`|`rejected`) to localStorage and dispatches `window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }))` (`src/components/CookieConsent/CookieConsent.jsx:30-38`).
3. `useAdSenseLoader` listens for the event and, on `accepted`, injects the AdSense script (`src/hooks/useAdSenseLoader.js:22-37`).
4. Every `AdSlot` also listens to the event (`src/components/AdSlot/AdSlot.jsx:18-23`) so it re-renders from `null` → the actual `<ins>` and arms its `IntersectionObserver`.

**State Management:**
- Two Contexts only: `I18nContext` (`lang`, `t`, `changeLang`) and `ThemeContext` (`theme`, `toggleTheme`), both persisted to `localStorage` (`currencyabout_lang`, `currencyabout_theme`).
- Everything else is component-local `useState`. The data hook `useExchangeRates` owns the rates list at the level of whichever page mounts it; pair page and home page both call it independently, so navigating between them re-fetches from cache, not from network (cache key `currencyabout_rates` is shared and day-scoped).
- Cross-component coordination for cookie consent uses a `CustomEvent` on `window` (`cookie-consent-changed`) — there is no React state representing consent globally.

## Key Abstractions

**Currency rate triangulation via a single BRL base:**
- Purpose: One API call gives every cross-rate.
- Examples: `src/services/exchangeRate.js`, `src/constants/currencies.js:39-44` (`getRate`).
- Pattern: API is queried for `latest/BRL`; any other pair is computed as `to.rateToBRL / from.rateToBRL`. `CURRENCY_META` defines the 21-currency allowlist that gets joined onto the API response.

**Indexable-pair allowlist:**
- Purpose: Avoid thin-content SEO penalties for 400+ auto-generated pair URLs.
- Examples: `src/seo/seoContent.js:42-60`.
- Pattern: Build a `Set` of `${from}-${to}` keys from `POPULAR_PAIRS` (both directions) plus every cross of `MAJORS = ['USD','EUR','GBP','JPY','CHF','CAD','AUD','CNY']`. `isIndexablePair()` returns membership; `CurrencyPairPage` passes the inverse to `SeoHead.noindex`.

**Editorial content as block-array JS:**
- Purpose: Hand-written long-form content with type-tagged blocks, rendered by a small switch.
- Examples: `src/content/guides.js` (16 guides, each `{ slug, title, description, readingMinutes, updated, category, tags, body: Block[] }`); `src/pages/guides/GuidePage.jsx:30-60` (`renderBlock`).
- Pattern: Block types are `lead | h2 | h3 | p | list | callout | disclaimer`; `p` may contain a `children` array of inline objects (`{text}`, `{to,text}`, `{href,text}`, `{strong}`), rendered by `renderInline`.

**Consent + route double-gate for ads:**
- Purpose: Block ads on legal pages and before consent — both gates required.
- Examples: `src/constants/adsense.js:25-36` (`isAdAllowedOnRoute`); `src/components/AdSlot/AdSlot.jsx:55-56`.
- Pattern: `AdSlot` returns `null` if `!consent || !isAdAllowedOnRoute(pathname)`; only after both pass does it render the `<ins>` and arm the IntersectionObserver lazy loader.

**Single-URL multi-language SEO:**
- Purpose: Honour Google's bidirectional hreflang return-tag check while serving every language from the same URL.
- Examples: `src/seo/SeoHead.jsx:36-47`.
- Pattern: Every `hreflang` alternate points to the same URL; only an `x-default` is emitted in addition. Comments in the file flag why per-language sub-folders are intentionally absent.

## Entry Points

**HTML entry:**
- Location: `/Users/lucasazevedo/Projects/suacotacao-front/index.html`
- Triggers: Cloudflare Pages serves this for `/` and (per `wrangler.jsonc:8-9`) for any non-asset path.
- Responsibilities: Static `<title>`, OG, Twitter, three pre-rendered JSON-LD blocks (`WebSite`, `Organization`, `WebApplication`), preconnect/preload, a substantial `<noscript>` fallback for crawlers, and `<script type="module" src="/src/main.jsx">`.

**React entry:**
- Location: `src/main.jsx`
- Triggers: Loaded by `index.html`.
- Responsibilities: Mount React 19 root with the provider stack (`HelmetProvider → ThemeProvider → I18nProvider → App`).

**Router entry:**
- Location: `src/App.jsx`
- Triggers: Mounted by `main.jsx`.
- Responsibilities: `BrowserRouter`, wrap routes in `Layout`, import every page module statically (no code splitting / lazy routes today).

**Build / deploy entry:**
- Location: `vite.config.js` (`@vitejs/plugin-react` + `@cloudflare/vite-plugin`), `wrangler.jsonc`, `package.json` (`build`, `preview`, `deploy`).
- Triggers: `npm run build` (Vite static build), `npm run deploy` (`vite build && wrangler deploy`).

## Architectural Constraints

- **Threading:** Single-threaded browser; no Web Workers, no SSR. Everything runs on the main thread.
- **Rendering:** Client-side only. Cloudflare returns the same `index.html` for every route (`wrangler.jsonc:8-9`); crawlers must execute JS or fall back to the static `<noscript>` content in `index.html`.
- **Global state:** Two module-level singletons via Context — `I18nContext` and `ThemeContext`. One module-level event channel — `window` `cookie-consent-changed`. No Redux/Zustand/RTK.
- **Side effects:** Three `localStorage` keys: `currencyabout_rates` (rates cache), `currencyabout_lang` (selected language), `currencyabout_theme` (selected theme), plus `cookie-consent` (banner choice). Two DOM mutations outside React: `document.documentElement.lang` (`I18nContext.jsx:32`) and `data-theme` + `theme-color` meta (`ThemeContext.jsx:17-18`).
- **Network:** One outbound endpoint — `https://open.er-api.com/v6/latest/BRL`. No backend of our own; AdSense (`pagead2.googlesyndication.com`) and Google Fonts are the only other external network calls, both gated.
- **Circular imports:** None detected. The dependency chain is acyclic: `components → hooks/seo/constants → services → built-in libs`.
- **Bundle:** All routes import statically (`src/App.jsx:1-13`). No `React.lazy`, no dynamic `import()`. The entire app ships in the initial bundle.
- **Pair URL space:** Pair pages share the root namespace (`/:pair`). Any new top-level route must be declared before the `/:pair` catch — currently `/converter`, `/exchange-rates-today`, `/about`, `/privacy-policy`, `/terms`, `/contact`, `/methodology`, `/guides`, `/guides/:slug` all precede it in `src/App.jsx:22-31`.
- **Reserved storage keys:** `currencyabout_rates`, `currencyabout_lang`, `currencyabout_theme`, `cookie-consent`. Do not reuse these names.

## Anti-Patterns

### Importing pages directly from other pages

**What happens:** `CurrencyPairPage.jsx:19` imports `NotFoundPage` and renders it inline when the route param fails the regex.
**Why it's wrong:** The browser URL still says `/:pair`, so users see 404 content under a 200 status path. It also couples two route components.
**Do this instead:** Use `useNavigate()` to push `/404`, or rely on the `*` route by returning `<Navigate to="/404" replace />`. Keep page components reachable only via the router.

### Multiple parallel calls to `useExchangeRates`

**What happens:** `HomePage`, `CurrencyPairPage`, and `ExchangeRatesTodayPage` each call `useCurrencyConverter` / `useExchangeRates`. Each component instance starts its own fetch effect (`src/hooks/useExchangeRates.js:12`).
**Why it's wrong:** If two consumers ever mount on the same screen they would duplicate the fetch (the localStorage cache mitigates network cost, but not the JSON-parse + state churn).
**Do this instead:** Move rates into a dedicated `RatesProvider` Context (or a small store) and consume it from pages. This also makes the rate state available to `Layout` for things like a global "stale rates" banner without re-fetching.

### Mixing locale-specific formatting in shared components

**What happens:** `CurrencyCard.jsx:7-17` uses `toLocaleString('pt-BR', …)` regardless of selected UI language; `CurrencyPairPage.jsx:21-29` uses `toLocaleString('en', …)`.
**Why it's wrong:** Numbers do not match the chosen `lang`; users on `es`/`de`/`ja` see Brazilian or US grouping.
**Do this instead:** Thread the active locale (`useI18n().lang`) into `toLocaleString` or centralise number formatting in a small helper keyed off `lang`.

### Editorial content imported eagerly

**What happens:** `src/content/guides.js` (~977 lines) is imported by `GuidesIndexPage`, `GuidePage`, and `NotFoundPage` (`src/pages/NotFoundPage.jsx:5`). It therefore ships in the initial bundle.
**Why it's wrong:** Visitors to the home page download all 16 guides' prose before they can use the converter.
**Do this instead:** Route-split with `React.lazy(() => import('./pages/guides/GuidePage.jsx'))` and load individual guides via dynamic `import()` keyed by slug.

## Error Handling

**Strategy:** Per-page guarded render. Hooks track `{loading, error}` flags; pages branch on those before rendering primary content. Service-layer errors throw; the hook catches and stores the message string. There is no global error boundary.

**Patterns:**
- Service layer (`src/services/exchangeRate.js:33-41`) throws on non-`ok` HTTP and on `result !== 'success'`.
- `useExchangeRates` (`src/hooks/useExchangeRates.js:33-41`) catches and stores `err.message`; sets `loading=false` in `finally`. A `cancelled` flag prevents state writes after unmount.
- Pages render a dedicated error card with a reload button (`HomePage.jsx:101-120`, `ExchangeRatesTodayPage.jsx:43-53`).
- `localStorage` access is wrapped in `try/catch` everywhere it appears (`services/exchangeRate.js:8-20`, `components/CookieConsent/CookieConsent.jsx:8-13,31-35`) so private-mode browsers degrade gracefully.
- `AdSlot` swallows `adsbygoogle.push` errors (`src/components/AdSlot/AdSlot.jsx:37-41`) because the script may not be present yet when the slot intersects.
- Route-level fallback: any unknown URL hits the `*` route in `App.jsx:33` → `NotFoundPage` (which itself emits `noindex`).
- Pair regex miss inside `CurrencyPairPage` returns `<NotFoundPage/>` directly — see the anti-pattern above.

## Cross-Cutting Concerns

**Logging:** None. No analytics tag, no `console.*` instrumentation, no error reporter. Cloudflare `observability.enabled: true` in `wrangler.jsonc:5-7` captures Worker-level logs only (there are no Workers in this project — assets-only deployment).

**Validation:** Minimal. The pair URL is validated with `^([a-z]{3})-to-([a-z]{3})$` and a lookup in `CURRENCY_META`. The amount input is treated as centavos (`Number(rawValue) / 100`) with no schema validation. There is no form library and no runtime type-checker.

**Authentication:** Not applicable — fully anonymous public site.

**Internationalisation:** Custom Context (`src/i18n/I18nContext.jsx`) with seven hand-maintained dictionaries in `src/i18n/locales/{en,pt,es,fr,de,zh,ja}.js`. No `react-intl`/`i18next`. URL strategy is single-URL with hreflang `x-default`; the language toggle is purely client state.

**Performance:** Hard-coded daily cache in `localStorage` for rates; preconnect/preload hints in `index.html:55-60`; lazy ad loading via `IntersectionObserver`; `React.memo` on `CurrencyCard` (`src/components/CurrencyCard/CurrencyCard.jsx:21`). No code splitting yet.

**Accessibility:** Skip link in `Layout` (`src/components/Layout/Layout.jsx:16-18`), `role` and `aria-label` on landmarks and dialogs, `aria-hidden` on decorative icons, language attribute on `<html>` kept in sync with i18n state.

---

*Architecture analysis: 2026-05-18*
