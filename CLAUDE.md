<!-- GSD:project-start source:PROJECT.md -->
## Project

**currencyabout.com Sprint 1 — AdSense Approval Reinforcement**

**currencyabout.com** is a free, independent currency converter at https://currencyabout.com that lets users convert between 21 major world currencies using daily-refreshed mid-market reference rates. The site is built as a React 19 + Vite SPA hosted on Cloudflare Workers, with 16 long-form editorial guides, dedicated pages for each indexable currency pair, methodology and legal pages, and a consent-gated Google AdSense integration that is currently in active review for re-approval.

**This initiative** is a 1–2 week sprint to strengthen the site's AdSense approval signals while the review is in flight, without introducing visible breakage that a returning reviewer could see mid-revision.

**Core Value:** **Maximize AdSense approval odds during the active review window.** Every change in this sprint is judged by whether it strengthens the reviewer's perception of editorial depth, professional polish, and technical quality — without risking visible regressions that could harm the in-flight review.

### Constraints

- **Timeline:** 1–2 weeks part-time (evenings/weekends) — bounds the depth of each phase. Use existing components and patterns; avoid greenfield rewrites.
- **No visual rebrand:** Polish-only. Existing palette, typography, and overall layout stay. Visual changes are tightening, not reinvention.
- **No new dependencies:** Anything that adds a build-time or runtime package must be named, justified, and approved before merging. Goal: zero net new dependencies for the sprint.
- **No converter / i18n / cookie-consent changes:** These are validated systems. Read them, don't modify them, unless a phase explicitly requires it and a rollback is trivial.
- **Tech stack:** React 19 + Vite 6 + react-router-dom v7 + react-helmet-async, plain JS (not TS), plain CSS co-located with components, Cloudflare Workers static assets. Stay inside this stack.
- **Active review:** Each merge must keep `npm run build` passing and not break visible UX on home, guide, or pair pages. No long-lived feature branches.
- **Editorial content:** Any new prose must match the existing guide voice — no em-dashes in body, no "in today's fast-paced world" AI-tells, no "in conclusion" closers, sentence-case headings, ranges only for rates, no invented historical numbers.
- **Originality:** New copy is hand-written and original. No paraphrasing from sources. Cite, link, don't repeat sentences.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (ESM, ES2022+) - All application code under `src/` (`.js`, `.jsx`). No TypeScript in repo.
- HTML5 - Single entry document `index.html` (SPA shell, SEO meta, JSON-LD, noscript fallback).
- CSS3 - Plain CSS modules co-located with components (e.g. `src/App.css`, `src/components/CookieConsent/CookieConsent.css`, `src/pages/pages.css`). No CSS-in-JS, no Tailwind, no preprocessor.
- JSONC - Cloudflare config (`wrangler.jsonc`).
## Runtime
- Browser runtime (client-side SPA). React 19 renders into `#root` from `src/main.jsx`.
- Cloudflare Workers static assets in production (`wrangler.jsonc`, `compatibility_date: 2026-04-06`, `compatibility_flags: ["nodejs_compat"]`). No custom Worker code in repo — assets-only with SPA fallback.
- Node.js used only for build/deploy tooling (Vite, Wrangler). No Node version pinned (`.nvmrc`/`engines` not present).
- npm (Node) - inferred from `package-lock.json`.
- Lockfile: present (`package-lock.json`, ~110 KB).
## Frameworks
- React 19.1 (`react`, `react-dom`) - UI library. Used with `StrictMode` and functional components + hooks throughout `src/`.
- react-router-dom 7.13 - Client-side routing (`BrowserRouter`, `Routes`, `Route`). Routes declared in `src/App.jsx`; includes dynamic `/:pair` route and `*` NotFound.
- react-helmet-async 3.0 - Per-route SEO head management; provider mounted in `src/main.jsx`. Used by `src/seo/` and page components.
- Not detected. No test framework, no `test` script in `package.json`, no `__tests__`, no `vitest.config`/`jest.config`.
- Vite 6.3 - Dev server (`npm run dev`) and production build (`npm run build`). Config: `vite.config.js`.
- @vitejs/plugin-react 4.4 - React Fast Refresh + JSX transform.
- @cloudflare/vite-plugin 1.31 - Cloudflare integration for Vite (enables `wrangler dev`-compatible build output and preview).
- Wrangler 4.80 - Cloudflare Workers CLI used for `preview` and `deploy` scripts.
## Key Dependencies
- `react` ^19.1.0 - UI runtime.
- `react-dom` ^19.1.0 - Client renderer (`createRoot` in `src/main.jsx`).
- `react-router-dom` ^7.13.2 - Routing (`src/App.jsx`).
- `react-helmet-async` ^3.0.0 - SEO head tags per route.
- `vite` ^6.3.1 - Build tool.
- `@vitejs/plugin-react` ^4.4.1 - React plugin for Vite.
- `@cloudflare/vite-plugin` ^1.31.0 - Cloudflare build integration.
- `wrangler` ^4.80.0 - Cloudflare deploy CLI.
## Configuration
- No application env vars are read at runtime. The exchange-rate endpoint is hard-coded in `src/services/exchangeRate.js` (`https://open.er-api.com/v6/latest/BRL`) and the AdSense client id is hard-coded in `src/constants/adsense.js` (`ca-pub-3917556333305409`).
- `.gitignore` excludes `.env*` and `.dev.vars*` but permits `.env.example` / `.dev.vars.example`. No `.env` files present in repo root.
- Client-side persistence in `localStorage`:
- `vite.config.js` - registers `@vitejs/plugin-react` and `@cloudflare/vite-plugin`. No path aliases, no env mode customization.
- `wrangler.jsonc` - `name: currencyabout-front`, `assets.not_found_handling: "single-page-application"` (sends unknown paths to `index.html`), `observability.enabled: true`, `compatibility_flags: ["nodejs_compat"]`.
- `index.html` - Vite entry; loads `/src/main.jsx` as ES module. Includes preconnect/dns-prefetch for `https://open.er-api.com`, Google Fonts (Inter), and three inline JSON-LD blocks (WebSite, Organization, WebApplication).
- `public/` - Static assets shipped as-is: `ads.txt`, `favicon.svg`, `og-image.svg`, `manifest.json` (PWA), `robots.txt`, `sitemap.xml`, `icons/` (192/512 PNGs).
## Platform Requirements
- Node.js (LTS) with npm. Run `npm install` then `npm run dev` to start Vite dev server.
- `npm run preview` builds and runs `wrangler dev` (requires Cloudflare Wrangler authenticated for full parity, but `wrangler dev` works locally without deploy creds).
- Cloudflare Workers static-assets deployment via `npm run deploy` (`vite build` then `wrangler deploy`).
- SPA fallback handled by Cloudflare assets (`not_found_handling: "single-page-application"`); the in-app `NotFoundPage` route renders for unknown client routes.
- Domain: `currencyabout.com` (canonical URLs in `index.html`, `robots.txt`, `sitemap.xml`).
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase `.jsx` files co-located with a matching
- Hooks: camelCase `.js` files prefixed with `use`, e.g.
- Pages: PascalCase `.jsx` directly under `src/pages/` (or grouped subfolder
- Services / constants / content / seo modules: camelCase `.js`, e.g.
- Context providers: PascalCase `.jsx`, e.g. `src/i18n/I18nContext.jsx`,
- Test files: none. There are no `*.test.*` or `*.spec.*` files in the repo.
- Use `camelCase` for plain functions and hooks (`fetchRates`,
- Use `PascalCase` for React components (`AdSlot`, `Breadcrumbs`,
- Prefer `function` declarations for top-level functions and components
- `camelCase` for locals and module-level bindings (`insRef`, `pushedRef`,
- `SCREAMING_SNAKE_CASE` for module-level constants that represent
- Refs created with `useRef` end in `Ref` (`insRef`, `pushedRef`).
- Booleans are descriptive: `loading`, `fromCache`, `cancelled`, `visible`.
- No TypeScript and no JSDoc `@param` / `@returns` typing convention is in
## CSS Naming
- Plain CSS in component-co-located `.css` files, imported from the
- Class names follow **kebab-case BEM** with two underscores for elements
- Keep all visual styling in the `.css` file. Use inline `style={...}` only
## Code Style
- No formatter is configured (no `.prettierrc*`, no `biome.json`). Match
- Do not introduce Prettier/Biome configs without explicit approval — the
- **No ESLint, Biome, or other linter is configured.** There is no
- In the absence of a linter, hand-enforce: no unused imports, no
## Import Organization
- None configured. Use relative paths with explicit `.jsx` / `.js`
## Error Handling
- **Async / fetch failures:** throw a descriptive `Error` and let the
- **Hook-side handling:** wrap awaits in `try { ... } catch (err) { ... }
- **Effect cleanup against stale updates:** use a local `let cancelled =
- **`localStorage` access:** always wrap reads and writes in
- **Third-party globals (AdSense `adsbygoogle.push`):** wrap in
- **Route/data fallbacks:** prefer rendering an inline "not found" view
## Logging
- The codebase intentionally swallows expected failures (storage
- Reserve `console.error` for genuinely unexpected developer-facing
## Comments
- Only when the *why* is non-obvious. Examples:
- Do not narrate what the code already shows (`// set state to 5`).
- Inline `// ignore — ...` comments are the standard form for empty
- Not in use. Do not introduce JSDoc unless adding it to an entire
## Function Design
- Prefer small focused functions. Pull rendering helpers out of
- Hooks may be longer (see `useCurrencyConverter.js`) when they
- Components: a single destructured props object with defaults inline
- Hooks: accept primitives or small option objects with defaults
- Avoid positional booleans; prefer named props.
- Hooks return a flat object of state, derived values, and stable
- Components return JSX or `null`. Use early `return null` for
- Pure helpers return primitives or new objects — never mutate
## Module Design
- **Named exports only** for components, hooks, helpers, and
- The single tolerated `export default` is `src/App.jsx` because
- A module may export both a primary component and supporting
- None. Import directly from the component or hook file using its
## React Patterns
- **Functional components only.** No class components. React 19
- **Context providers** live in their own folder (`src/i18n/`,
- **Routing** uses `react-router-dom` v7. Routes are declared in
- **SEO head tags** use `react-helmet-async` via the wrapper
- **Cross-component coordination** for consent uses a `CustomEvent`
- **Accessibility:**
## Editorial Content Authoring
- Long-form editorial content is authored as structured JS data
- Supported block `type` values: `lead`, `h2`, `h3`, `p`, `list`,
- `p` and `list` items may use a `children` array of inline tokens.
- Rendering happens in `src/pages/guides/GuidePage.jsx` via
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- Single-page app served as static assets through Cloudflare (Wrangler `not_found_handling: "single-page-application"`) — every unknown path falls back to `index.html`.
- No global state manager (no Redux/Zustand/RTK). State is local `useState` + two Contexts (`I18nProvider`, `ThemeProvider`).
- Data flow is one-shot: a single `useExchangeRates` call on mount, day-cached in `localStorage`; no refresh, no polling, no subscriptions.
- Pair pages share `useCurrencyConverter` with the home page — uniform conversion behaviour, only the UI surface differs.
- SEO is a first-class layer: `noindex` for non-curated pairs (`isIndexablePair`), JSON-LD per page type, hreflang x-default for the single-URL multi-language strategy.
- AdSense is fully consent-gated and route-allowlisted; placement components render nothing until both gates pass.
- Editorial content (16 guides, 21 currency profiles) is shipped as JavaScript constants — no CMS, no fetching.
## Layers
- Purpose: Mount React root with the provider stack.
- Location: `src/main.jsx`
- Contains: `createRoot`, `StrictMode`, `HelmetProvider`, `ThemeProvider`, `I18nProvider`.
- Depends on: `react`, `react-dom/client`, `react-helmet-async`, two Context providers, `App`.
- Used by: `index.html` `<script type="module" src="/src/main.jsx">`.
- Purpose: Map URLs to pages and wrap them in a global chrome (header, footer, consent banner).
- Location: `src/App.jsx`, `src/components/Layout/Layout.jsx`.
- Contains: `BrowserRouter`, `Routes`, `Route`, `Layout`.
- Depends on: `react-router-dom`, every page module, `useI18n`, `useAdSenseLoader`, `POPULAR_PAIRS` / `pairUrl`.
- Used by: `main.jsx`.
- Purpose: One component per route; orchestrates SEO + data + UI sections.
- Location: `src/pages/`, `src/pages/guides/`, `src/pages/legal/`.
- Contains: `HomePage.jsx`, `CurrencyPairPage.jsx`, `ExchangeRatesTodayPage.jsx`, `GuidesIndexPage.jsx`, `GuidePage.jsx`, `NotFoundPage.jsx`, `AboutPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`, `ContactPage.jsx`, `MethodologyPage.jsx`.
- Depends on: hooks, components, SEO helpers, content modules.
- Used by: `App.jsx` route table.
- Purpose: Encapsulate cross-cutting client behaviour.
- Location: `src/hooks/`
- Contains: `useExchangeRates.js` (fetch + cache + meta join), `useCurrencyConverter.js` (input/sort/filter/precision over rates), `useAdSenseLoader.js` (consent-gated script injection).
- Depends on: `services/exchangeRate.js`, `constants/currencies.js`, `seo/seoContent.js`, `i18n/I18nContext.jsx`.
- Used by: pages and `Layout`.
- Purpose: Encapsulate every network call. Currently a single function for daily rates.
- Location: `src/services/exchangeRate.js`
- Contains: `fetchRates()` with day-keyed `localStorage` cache around `https://open.er-api.com/v6/latest/BRL`.
- Depends on: `fetch`, `localStorage`.
- Used by: `useExchangeRates`.
- Purpose: Static configuration that ships with the bundle.
- Location: `src/constants/`
- Contains: `currencies.js` (`CURRENCY_META`, `CONTINENT_ORDER`, `CONTINENT_META`, `getRate`); `adsense.js` (`ADSENSE_CLIENT_ID`, `AD_SLOTS`, `NO_AD_ROUTES`, `isAdAllowedOnRoute`).
- Depends on: nothing.
- Used by: every layer above.
- Purpose: User-preference state with localStorage persistence.
- Location: `src/i18n/I18nContext.jsx` + `src/i18n/locales/{en,pt,es,fr,de,zh,ja}.js`; `src/theme/ThemeContext.jsx`.
- Contains: Provider, `useI18n`/`useTheme` hooks, language detection, theme detection, dictionary import.
- Depends on: `react`, `localStorage`, locale files.
- Used by: most components and pages.
- Purpose: Long-form SEO content, written once, shipped as JS.
- Location: `src/content/`
- Contains: `guides.js` (16 guide entries — each a structured body of `{ type: 'lead'|'h2'|'h3'|'p'|'list'|'callout'|'disclaimer', ... }` blocks; ~977 lines); `currencyProfiles.js` (21 currency profiles; `getProfile(code)`).
- Depends on: nothing.
- Used by: `GuidePage`, `GuidesIndexPage`, `CurrencyPairPage`, `NotFoundPage`.
- Purpose: Per-page head, schema.org JSON-LD, indexing policy.
- Location: `src/seo/`
- Contains: `SeoHead.jsx`, `StructuredData.jsx`, `seoContent.js`.
- Depends on: `react-helmet-async`, `useI18n`.
- Used by: every public page.
- Purpose: Reusable presentational and small-state widgets.
- Location: `src/components/<Name>/<Name>.{jsx,css}` (sibling CSS per component).
- Contains: 17 component folders (`AdSlot`, `Breadcrumbs`, `CookieConsent`, `CurrencyCard`, `CurrencyFilter`, `CurrencyGrid`, `CurrencyInput`, `FAQ`, `FeaturedResult`, `LanguageSelector`, `Layout`, `PopularPairs`, `PrecisionToggle`, `QuickAmounts`, `RateDisclaimer`, `SortSelect`, `ThemeToggle`).
- Depends on: Context hooks, constants, SEO helpers (for links).
- Used by: pages.
## Data Flow
### Primary Request Path — load home or pair page
### Currency-pair URL resolution
### Language / Theme switching
### Consent / Ads coordination
- Two Contexts only: `I18nContext` (`lang`, `t`, `changeLang`) and `ThemeContext` (`theme`, `toggleTheme`), both persisted to `localStorage` (`currencyabout_lang`, `currencyabout_theme`).
- Everything else is component-local `useState`. The data hook `useExchangeRates` owns the rates list at the level of whichever page mounts it; pair page and home page both call it independently, so navigating between them re-fetches from cache, not from network (cache key `currencyabout_rates` is shared and day-scoped).
- Cross-component coordination for cookie consent uses a `CustomEvent` on `window` (`cookie-consent-changed`) — there is no React state representing consent globally.
## Key Abstractions
- Purpose: One API call gives every cross-rate.
- Examples: `src/services/exchangeRate.js`, `src/constants/currencies.js:39-44` (`getRate`).
- Pattern: API is queried for `latest/BRL`; any other pair is computed as `to.rateToBRL / from.rateToBRL`. `CURRENCY_META` defines the 21-currency allowlist that gets joined onto the API response.
- Purpose: Avoid thin-content SEO penalties for 400+ auto-generated pair URLs.
- Examples: `src/seo/seoContent.js:42-60`.
- Pattern: Build a `Set` of `${from}-${to}` keys from `POPULAR_PAIRS` (both directions) plus every cross of `MAJORS = ['USD','EUR','GBP','JPY','CHF','CAD','AUD','CNY']`. `isIndexablePair()` returns membership; `CurrencyPairPage` passes the inverse to `SeoHead.noindex`.
- Purpose: Hand-written long-form content with type-tagged blocks, rendered by a small switch.
- Examples: `src/content/guides.js` (16 guides, each `{ slug, title, description, readingMinutes, updated, category, tags, body: Block[] }`); `src/pages/guides/GuidePage.jsx:30-60` (`renderBlock`).
- Pattern: Block types are `lead | h2 | h3 | p | list | callout | disclaimer`; `p` may contain a `children` array of inline objects (`{text}`, `{to,text}`, `{href,text}`, `{strong}`), rendered by `renderInline`.
- Purpose: Block ads on legal pages and before consent — both gates required.
- Examples: `src/constants/adsense.js:25-36` (`isAdAllowedOnRoute`); `src/components/AdSlot/AdSlot.jsx:55-56`.
- Pattern: `AdSlot` returns `null` if `!consent || !isAdAllowedOnRoute(pathname)`; only after both pass does it render the `<ins>` and arm the IntersectionObserver lazy loader.
- Purpose: Honour Google's bidirectional hreflang return-tag check while serving every language from the same URL.
- Examples: `src/seo/SeoHead.jsx:36-47`.
- Pattern: Every `hreflang` alternate points to the same URL; only an `x-default` is emitted in addition. Comments in the file flag why per-language sub-folders are intentionally absent.
## Entry Points
- Location: `/Users/lucasazevedo/Projects/suacotacao-front/index.html`
- Triggers: Cloudflare Pages serves this for `/` and (per `wrangler.jsonc:8-9`) for any non-asset path.
- Responsibilities: Static `<title>`, OG, Twitter, three pre-rendered JSON-LD blocks (`WebSite`, `Organization`, `WebApplication`), preconnect/preload, a substantial `<noscript>` fallback for crawlers, and `<script type="module" src="/src/main.jsx">`.
- Location: `src/main.jsx`
- Triggers: Loaded by `index.html`.
- Responsibilities: Mount React 19 root with the provider stack (`HelmetProvider → ThemeProvider → I18nProvider → App`).
- Location: `src/App.jsx`
- Triggers: Mounted by `main.jsx`.
- Responsibilities: `BrowserRouter`, wrap routes in `Layout`, import every page module statically (no code splitting / lazy routes today).
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
### Multiple parallel calls to `useExchangeRates`
### Mixing locale-specific formatting in shared components
### Editorial content imported eagerly
## Error Handling
- Service layer (`src/services/exchangeRate.js:33-41`) throws on non-`ok` HTTP and on `result !== 'success'`.
- `useExchangeRates` (`src/hooks/useExchangeRates.js:33-41`) catches and stores `err.message`; sets `loading=false` in `finally`. A `cancelled` flag prevents state writes after unmount.
- Pages render a dedicated error card with a reload button (`HomePage.jsx:101-120`, `ExchangeRatesTodayPage.jsx:43-53`).
- `localStorage` access is wrapped in `try/catch` everywhere it appears (`services/exchangeRate.js:8-20`, `components/CookieConsent/CookieConsent.jsx:8-13,31-35`) so private-mode browsers degrade gracefully.
- `AdSlot` swallows `adsbygoogle.push` errors (`src/components/AdSlot/AdSlot.jsx:37-41`) because the script may not be present yet when the slot intersects.
- Route-level fallback: any unknown URL hits the `*` route in `App.jsx:33` → `NotFoundPage` (which itself emits `noindex`).
- Pair regex miss inside `CurrencyPairPage` returns `<NotFoundPage/>` directly — see the anti-pattern above.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| frontend-guidance | Canonical UI/UX rules for this project. Consult before writing or editing any frontend code — components, CSS, layouts, forms, accessibility, color, typography, spacing, dark mode, or interaction states. Sourced from Nielsen Norman Group, W3C WCAG 2.2, Material Design 3, Apple HIG, Laws of UX, and Luke Wroblewski's form research. | `.claude/skills/frontend-guidance/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
