# Technology Stack

**Analysis Date:** 2026-05-18

## Languages

**Primary:**
- JavaScript (ESM, ES2022+) - All application code under `src/` (`.js`, `.jsx`). No TypeScript in repo.

**Secondary:**
- HTML5 - Single entry document `index.html` (SPA shell, SEO meta, JSON-LD, noscript fallback).
- CSS3 - Plain CSS modules co-located with components (e.g. `src/App.css`, `src/components/CookieConsent/CookieConsent.css`, `src/pages/pages.css`). No CSS-in-JS, no Tailwind, no preprocessor.
- JSONC - Cloudflare config (`wrangler.jsonc`).

## Runtime

**Environment:**
- Browser runtime (client-side SPA). React 19 renders into `#root` from `src/main.jsx`.
- Cloudflare Workers static assets in production (`wrangler.jsonc`, `compatibility_date: 2026-04-06`, `compatibility_flags: ["nodejs_compat"]`). No custom Worker code in repo — assets-only with SPA fallback.
- Node.js used only for build/deploy tooling (Vite, Wrangler). No Node version pinned (`.nvmrc`/`engines` not present).

**Package Manager:**
- npm (Node) - inferred from `package-lock.json`.
- Lockfile: present (`package-lock.json`, ~110 KB).

## Frameworks

**Core:**
- React 19.1 (`react`, `react-dom`) - UI library. Used with `StrictMode` and functional components + hooks throughout `src/`.
- react-router-dom 7.13 - Client-side routing (`BrowserRouter`, `Routes`, `Route`). Routes declared in `src/App.jsx`; includes dynamic `/:pair` route and `*` NotFound.
- react-helmet-async 3.0 - Per-route SEO head management; provider mounted in `src/main.jsx`. Used by `src/seo/` and page components.

**Testing:**
- Not detected. No test framework, no `test` script in `package.json`, no `__tests__`, no `vitest.config`/`jest.config`.

**Build/Dev:**
- Vite 6.3 - Dev server (`npm run dev`) and production build (`npm run build`). Config: `vite.config.js`.
- @vitejs/plugin-react 4.4 - React Fast Refresh + JSX transform.
- @cloudflare/vite-plugin 1.31 - Cloudflare integration for Vite (enables `wrangler dev`-compatible build output and preview).
- Wrangler 4.80 - Cloudflare Workers CLI used for `preview` and `deploy` scripts.

## Key Dependencies

**Critical:**
- `react` ^19.1.0 - UI runtime.
- `react-dom` ^19.1.0 - Client renderer (`createRoot` in `src/main.jsx`).
- `react-router-dom` ^7.13.2 - Routing (`src/App.jsx`).
- `react-helmet-async` ^3.0.0 - SEO head tags per route.

**Infrastructure:**
- `vite` ^6.3.1 - Build tool.
- `@vitejs/plugin-react` ^4.4.1 - React plugin for Vite.
- `@cloudflare/vite-plugin` ^1.31.0 - Cloudflare build integration.
- `wrangler` ^4.80.0 - Cloudflare deploy CLI.

## Configuration

**Environment:**
- No application env vars are read at runtime. The exchange-rate endpoint is hard-coded in `src/services/exchangeRate.js` (`https://open.er-api.com/v6/latest/BRL`) and the AdSense client id is hard-coded in `src/constants/adsense.js` (`ca-pub-3917556333305409`).
- `.gitignore` excludes `.env*` and `.dev.vars*` but permits `.env.example` / `.dev.vars.example`. No `.env` files present in repo root.
- Client-side persistence in `localStorage`:
  - `currencyabout_rates` - cached daily rates (`src/services/exchangeRate.js`).
  - `cookie-consent` - consent state (`src/components/CookieConsent/CookieConsent.jsx`).
  - Theme and i18n locale also persisted via `src/theme/ThemeContext.jsx` and `src/i18n/I18nContext.jsx`.

**Build:**
- `vite.config.js` - registers `@vitejs/plugin-react` and `@cloudflare/vite-plugin`. No path aliases, no env mode customization.
- `wrangler.jsonc` - `name: currencyabout-front`, `assets.not_found_handling: "single-page-application"` (sends unknown paths to `index.html`), `observability.enabled: true`, `compatibility_flags: ["nodejs_compat"]`.
- `index.html` - Vite entry; loads `/src/main.jsx` as ES module. Includes preconnect/dns-prefetch for `https://open.er-api.com`, Google Fonts (Inter), and three inline JSON-LD blocks (WebSite, Organization, WebApplication).
- `public/` - Static assets shipped as-is: `ads.txt`, `favicon.svg`, `og-image.svg`, `manifest.json` (PWA), `robots.txt`, `sitemap.xml`, `icons/` (192/512 PNGs).

## Platform Requirements

**Development:**
- Node.js (LTS) with npm. Run `npm install` then `npm run dev` to start Vite dev server.
- `npm run preview` builds and runs `wrangler dev` (requires Cloudflare Wrangler authenticated for full parity, but `wrangler dev` works locally without deploy creds).

**Production:**
- Cloudflare Workers static-assets deployment via `npm run deploy` (`vite build` then `wrangler deploy`).
- SPA fallback handled by Cloudflare assets (`not_found_handling: "single-page-application"`); the in-app `NotFoundPage` route renders for unknown client routes.
- Domain: `currencyabout.com` (canonical URLs in `index.html`, `robots.txt`, `sitemap.xml`).

---

*Stack analysis: 2026-05-18*
