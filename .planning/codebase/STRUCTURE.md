# Codebase Structure

**Analysis Date:** 2026-05-18

## Directory Layout

```
suacotacao-front/
├── index.html                     # HTML entry, static meta + JSON-LD + noscript fallback
├── package.json                   # Scripts (dev/build/preview/deploy), deps
├── vite.config.js                 # Vite + @vitejs/plugin-react + @cloudflare/vite-plugin
├── wrangler.jsonc                 # Cloudflare deploy: SPA fallback + observability
├── LICENSE
├── SEO.md / SEO-STRATEGY.md       # Strategy notes (root)
├── ADSENSE-PLAN.md / ADSENSE-FIX.md / ADSENSE-EXECUTE.md / ADSENSE-EXECUTION.md
├── POST-DEPLOY-CHECKLIST.md
├── public/                        # Static assets copied to dist/ verbatim
│   ├── ads.txt
│   ├── favicon.svg
│   ├── icons/                     # PWA icons (currently empty)
│   ├── manifest.json
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── dist/                          # Vite build output (git-ignored, contains wrangler.json)
├── .wrangler/                     # Wrangler local state (git-ignored)
├── .planning/                     # GSD planning artifacts
│   └── codebase/                  # Codebase-mapping docs (this folder)
├── .claude/                       # Project-scoped Claude config
│   └── skills/
└── src/
    ├── main.jsx                   # React entry — provider stack + root render
    ├── App.jsx                    # BrowserRouter + Layout + Routes
    ├── App.css                    # App-shell styles
    ├── index.css                  # Global tokens (CSS variables + resets)
    │
    ├── components/                # Reusable UI (folder per component, sibling .css)
    │   ├── AdSlot/                # Consent-gated, lazy AdSense slot
    │   ├── Breadcrumbs/
    │   ├── CookieConsent/         # Banner + consent helpers + custom event
    │   ├── CurrencyCard/          # Result card; copy/expand; CurrencyCardSkeleton.jsx
    │   ├── CurrencyFilter/
    │   ├── CurrencyGrid/
    │   ├── CurrencyInput/
    │   ├── FAQ/
    │   ├── FeaturedResult/
    │   ├── LanguageSelector/
    │   ├── Layout/                # Site shell (header/footer/skip link)
    │   ├── PopularPairs/
    │   ├── PrecisionToggle/
    │   ├── QuickAmounts/
    │   ├── RateDisclaimer/
    │   ├── SortSelect/
    │   └── ThemeToggle/
    │
    ├── constants/                 # Static config, no React
    │   ├── adsense.js             # Client ID, AD_SLOTS, NO_AD_ROUTES, isAdAllowedOnRoute
    │   └── currencies.js          # 21-currency CURRENCY_META, CONTINENT_*, getRate()
    │
    ├── content/                   # Editorial data as JS (no CMS)
    │   ├── guides.js              # 16 guide objects + getGuide(slug)
    │   └── currencyProfiles.js    # 21 currency profiles + getProfile(code)
    │
    ├── hooks/                     # Custom hooks
    │   ├── useExchangeRates.js    # Fetch + cache, joins CURRENCY_META
    │   ├── useCurrencyConverter.js# Composes rates + input + sort + filter + precision
    │   └── useAdSenseLoader.js    # Consent-gated AdSense <script> injection
    │
    ├── i18n/                      # i18n Context + dictionaries
    │   ├── I18nContext.jsx
    │   └── locales/{en,pt,es,fr,de,zh,ja}.js
    │
    ├── pages/                     # Route-level components
    │   ├── HomePage.jsx
    │   ├── CurrencyPairPage.jsx
    │   ├── ExchangeRatesTodayPage.jsx
    │   ├── NotFoundPage.jsx
    │   ├── pages.css
    │   ├── guides/
    │   │   ├── GuidesIndexPage.jsx
    │   │   ├── GuidePage.jsx
    │   │   └── guides.css
    │   └── legal/
    │       ├── AboutPage.jsx
    │       ├── PrivacyPage.jsx
    │       ├── TermsPage.jsx
    │       ├── ContactPage.jsx
    │       ├── MethodologyPage.jsx
    │       └── legal.css
    │
    ├── seo/                       # Head + structured data + SEO constants
    │   ├── SeoHead.jsx
    │   ├── StructuredData.jsx
    │   └── seoContent.js
    │
    ├── services/                  # Network/storage adapters
    │   └── exchangeRate.js        # fetchRates() w/ localStorage day-cache
    │
    └── theme/                     # Theme Context (light/dark)
        └── ThemeContext.jsx
```

## Directory Purposes

**`src/components/`:**
- Purpose: Reusable presentational and small-state UI building blocks.
- Contains: One folder per component, each pairing `<Name>.jsx` with `<Name>.css`. Skeleton variants live alongside their hero component (e.g. `CurrencyCard/CurrencyCardSkeleton.jsx`).
- Key files: `Layout/Layout.jsx` (site shell), `CurrencyCard/CurrencyCard.jsx` (memoised result card), `AdSlot/AdSlot.jsx` (double-gated ad placement), `CookieConsent/CookieConsent.jsx` (consent banner + `hasMarketingConsent`).

**`src/constants/`:**
- Purpose: Static configuration that ships in the bundle and is depended on by every layer.
- Contains: Plain JS modules — no React, no JSX.
- Key files: `currencies.js` (`CURRENCY_META` allowlist of 21 currencies + `getRate(currencies, from, to)`), `adsense.js` (`AD_SLOTS`, `NO_AD_ROUTES`, `isAdAllowedOnRoute`).

**`src/content/`:**
- Purpose: Hand-written editorial content shipped as code.
- Contains: Large JS data modules with `export const` + helper finders.
- Key files: `guides.js` (16 entries with `body: Block[]` arrays), `currencyProfiles.js` (21-key map keyed by ISO code).

**`src/hooks/`:**
- Purpose: Reusable client-state and side-effect logic shared between pages.
- Contains: `.js` (not `.jsx`) hook files following the `use*` convention.
- Key files: `useExchangeRates.js`, `useCurrencyConverter.js`, `useAdSenseLoader.js`.

**`src/i18n/`:**
- Purpose: Internationalisation Context + per-language string dictionaries.
- Contains: `I18nContext.jsx` provider/hook, `locales/<code>.js` flat dictionary modules. Each locale file is ~123 lines and exports a default object with the same shape.
- Key files: `I18nContext.jsx`, `locales/en.js` (canonical).

**`src/pages/`:**
- Purpose: One component per route. Owns SEO and section composition.
- Contains: Top-level page files plus `guides/` and `legal/` subdirectories that group route families. A flat `pages.css` covers shared page chrome (`.page`, `.header__*`, `.results-section__*`, etc.).
- Key files: `HomePage.jsx`, `CurrencyPairPage.jsx`, `ExchangeRatesTodayPage.jsx`, `NotFoundPage.jsx`, `guides/GuidePage.jsx`, `legal/MethodologyPage.jsx`.

**`src/seo/`:**
- Purpose: Everything related to head tags, structured data, and indexing policy.
- Contains: React components that emit `<Helmet>` fragments plus pure data/helpers.
- Key files: `SeoHead.jsx`, `StructuredData.jsx`, `seoContent.js`.

**`src/services/`:**
- Purpose: Network and storage adapters; the only place `fetch` is called.
- Contains: Currently one module.
- Key files: `exchangeRate.js`.

**`src/theme/`:**
- Purpose: Light/dark theme Context with `prefers-color-scheme` detection and DOM sync.
- Contains: One file.
- Key files: `ThemeContext.jsx`.

**`public/`:**
- Purpose: Static assets copied as-is into `dist/`. Includes `robots.txt`, `sitemap.xml`, `ads.txt`, `manifest.json`, OG image, favicon.
- Contains: No JS or JSX. `icons/` is currently empty.

**`.planning/codebase/`:**
- Purpose: Codebase-mapping artifacts written by GSD mappers (this document, plus `STACK.md` and `INTEGRATIONS.md`).

## Key File Locations

**Entry Points:**
- `/Users/lucasazevedo/Projects/suacotacao-front/index.html` — HTML entry; static head + JSON-LD + noscript fallback; loads `/src/main.jsx`.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/main.jsx` — React entry; mounts the provider stack.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/App.jsx` — Router entry; declares every route.

**Configuration:**
- `/Users/lucasazevedo/Projects/suacotacao-front/package.json` — scripts (`dev`, `build`, `preview`, `deploy`), pins React 19, React Router 7, react-helmet-async 3.
- `/Users/lucasazevedo/Projects/suacotacao-front/vite.config.js` — Vite plugins (`@vitejs/plugin-react`, `@cloudflare/vite-plugin`).
- `/Users/lucasazevedo/Projects/suacotacao-front/wrangler.jsonc` — Cloudflare deploy: `assets.not_found_handling: "single-page-application"`, `compatibility_flags: ["nodejs_compat"]`.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/constants/adsense.js` — `ADSENSE_CLIENT_ID`, `AD_SLOTS`, route allowlist.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/constants/currencies.js` — `CURRENCY_META` (the 21-currency allowlist), `CONTINENT_ORDER`, `getRate`.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/seo/seoContent.js` — `SITE_URL`, `POPULAR_PAIRS`, `MAJORS`, `isIndexablePair`, per-page SEO builders.

**Core Logic:**
- `/Users/lucasazevedo/Projects/suacotacao-front/src/services/exchangeRate.js` — fetch + day-cache.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/hooks/useExchangeRates.js` — rates state + meta join.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/hooks/useCurrencyConverter.js` — primary page state.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/hooks/useAdSenseLoader.js` — consent-gated script injection.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/i18n/I18nContext.jsx` — language Context.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/theme/ThemeContext.jsx` — theme Context.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/seo/SeoHead.jsx` — per-page `<Helmet>` head.
- `/Users/lucasazevedo/Projects/suacotacao-front/src/seo/StructuredData.jsx` — JSON-LD helpers.

**Editorial content:**
- `/Users/lucasazevedo/Projects/suacotacao-front/src/content/guides.js` — 16 guides (single source of truth for `/guides` and `/guides/:slug`).
- `/Users/lucasazevedo/Projects/suacotacao-front/src/content/currencyProfiles.js` — 21 profiles consumed by `CurrencyPairPage`.

**Pages:**
- Home: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/HomePage.jsx`
- Pair: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/CurrencyPairPage.jsx`
- Rates index: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/ExchangeRatesTodayPage.jsx`
- Guides: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/guides/{GuidesIndexPage,GuidePage}.jsx`
- Legal: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/legal/{About,Privacy,Terms,Contact,Methodology}Page.jsx`
- 404: `/Users/lucasazevedo/Projects/suacotacao-front/src/pages/NotFoundPage.jsx`

**Testing:**
- Not detected. No `test/`, no `__tests__/`, no `vitest`/`jest` config, no `*.test.*` files. Test stack is not configured.

**Static assets / SEO surface:**
- `/Users/lucasazevedo/Projects/suacotacao-front/public/robots.txt`, `sitemap.xml`, `ads.txt`, `manifest.json`, `og-image.svg`, `favicon.svg`.

## Naming Conventions

**Files:**
- React components and Contexts: `PascalCase.jsx` (e.g. `CurrencyCard.jsx`, `I18nContext.jsx`, `SeoHead.jsx`).
- Hooks: `useCamelCase.js` (e.g. `useExchangeRates.js`).
- Pure modules (constants, services, content, SEO helpers): `camelCase.js` (e.g. `exchangeRate.js`, `seoContent.js`, `guides.js`).
- Locale dictionaries: lowercase ISO code, `<code>.js` (e.g. `en.js`, `pt.js`).
- Stylesheets: sibling to the component, same base name and PascalCase (`CurrencyCard.css`). Page-level CSS uses lowercase (`pages.css`, `guides.css`, `legal.css`).
- Global stylesheets: `index.css` (tokens/resets), `App.css` (shell).

**Directories:**
- One folder per component, named after the component: `components/<PascalCase>/`.
- Route-family grouping inside `pages/`: `pages/guides/`, `pages/legal/`.
- All other src groupings are lowercase singular topic names: `hooks/`, `seo/`, `services/`, `theme/`, `i18n/`, `constants/`, `content/`.

**Exports / Identifiers:**
- Named exports for React components and helpers (e.g. `export function HomePage(...)`, `export function getRate(...)`). No default exports except `App.jsx`.
- Constants in `SCREAMING_SNAKE_CASE` (`CURRENCY_META`, `CONTINENT_ORDER`, `POPULAR_PAIRS`, `AD_SLOTS`, `SITE_URL`).
- Cache/storage keys live next to their owning module as module-level `const`s (e.g. `CACHE_KEY = 'currencyabout_rates'`).

**CSS:**
- BEM-ish: block names use `kebab-case` (`.site-header`, `.cookie-consent`), elements use `__`, modifiers use `--` (`.site-header__link.is-active`, `.cookie-consent__btn--primary`).
- Theme variables live in `:root` in `src/index.css` (`--color-primary`, etc.), with light/dark overrides scoped by `[data-theme="dark"]`.

## Where to Add New Code

**New page / route:**
- Implementation: `src/pages/<Name>Page.jsx`. Group route families in a subfolder (`pages/legal/`, `pages/guides/`). Reuse `pages.css` selectors when possible; add `<group>.css` if a family needs its own styles.
- Register the route in `src/App.jsx` *before* the `/:pair` catch-all to avoid shadowing.
- Add it to `public/sitemap.xml` if it should be crawled.
- Tests: not applicable — no test harness configured.

**New currency:**
- Append to `CURRENCY_META` in `src/constants/currencies.js` (must match the API response codes from `open.er-api.com`).
- Optionally add a profile to `src/content/currencyProfiles.js` so it shows up on pair pages.
- Add localised name to every `src/i18n/locales/<code>.js` under `currencies.<CODE>`.

**New guide:**
- Append a new entry to `GUIDES` in `src/content/guides.js`. Required fields: `slug`, `title`, `description`, `readingMinutes`, `updated`, `category`, `tags`, `body: Block[]`. Block types: `lead | h2 | h3 | p | list | callout | disclaimer`. Use `p.children` with `{text}|{to,text}|{href,text}|{strong}` for inline formatting.
- No route change needed — `/guides/:slug` looks it up via `getGuide(slug)`.

**New popular / indexable pair:**
- Add to `POPULAR_PAIRS` in `src/seo/seoContent.js`. Both directions are auto-added to the `indexedSet`. To mark non-popular cross-pairs as indexable, edit the `MAJORS` array.

**New component:**
- Create `src/components/<PascalCase>/<PascalCase>.jsx` plus sibling `.css`. Export the component as a named export. Import via `'../components/<PascalCase>/<PascalCase>.jsx'`.

**New hook:**
- `src/hooks/use<Name>.js`. Keep it `.js` (not `.jsx`) unless it returns JSX.

**New language:**
- Create `src/i18n/locales/<code>.js` with the same key shape as `en.js`. Register it in the `locales` map at the top of `src/i18n/I18nContext.jsx`. Add the code to the `LANGS` array in `src/seo/SeoHead.jsx`.

**New network call:**
- Add a function in `src/services/`. Keep `fetch` out of components and hooks — hooks may call services but should not import `fetch` directly.

**New ad placement:**
- Add an entry to `AD_SLOTS` in `src/constants/adsense.js`, then `<AdSlot slotId={AD_SLOTS.<key>} />` in the page. If the route should be ad-free, add it to `NO_AD_ROUTES`.

**Shared helpers:**
- Pure functions go next to the data they operate on (e.g. `getRate` in `constants/currencies.js`, `getProfile` in `content/currencyProfiles.js`). There is no general `utils/` directory by design.

## Special Directories

**`.planning/`:**
- Purpose: GSD planning artifacts and codebase mapping documents.
- Generated: Yes — produced by GSD skills/mappers.
- Committed: Per project convention, yes.

**`.wrangler/`:**
- Purpose: Wrangler CLI local state and deploy cache.
- Generated: Yes — produced by `wrangler dev` / `wrangler deploy`.
- Committed: No.

**`dist/`:**
- Purpose: Vite build output. Includes a copy of `public/`, hashed asset bundles in `dist/assets/`, and a generated `dist/wrangler.json`.
- Generated: Yes — produced by `npm run build`.
- Committed: No.

**`public/`:**
- Purpose: Static assets copied verbatim into `dist/`. Anything here is reachable at the same URL on the deployed site.
- Generated: No — hand-maintained.
- Committed: Yes.

**`node_modules/`:**
- Purpose: Installed dependencies.
- Generated: Yes (`npm install`).
- Committed: No.

**`.claude/`:**
- Purpose: Project-scoped Claude Code configuration and skill overlays.
- Generated: Partly — `skills/` is hand-curated.
- Committed: Per project convention.

---

*Structure analysis: 2026-05-18*
