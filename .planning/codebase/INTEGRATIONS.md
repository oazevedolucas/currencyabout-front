# External Integrations

**Analysis Date:** 2026-05-18

## APIs & External Services

**Exchange Rates:**
- open.er-api.com - Public REST API providing latest exchange rates with BRL as base. Fetched once per UTC day; results cached in `localStorage` under `currencyabout_rates` and re-served from cache on subsequent visits the same day.
  - Endpoint: `https://open.er-api.com/v6/latest/BRL`
  - Implementation: `src/services/exchangeRate.js` (plain `fetch`, validates `data.result === 'success'`).
  - Consumer hook: `src/hooks/useExchangeRates.js` (merges rates with `src/constants/currencies.js` metadata).
  - Disclosed to users in `src/components/RateDisclaimer/RateDisclaimer.jsx`, `src/pages/legal/MethodologyPage.jsx`, and `src/pages/legal/PrivacyPage.jsx`.
  - SDK/Client: none (raw `fetch`).
  - Auth: none — public, unauthenticated endpoint. No API key required.

**Advertising:**
- Google AdSense - Publisher id `ca-pub-3917556333305409`. Script loader is consent-gated.
  - Script: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3917556333305409`
  - Config: `src/constants/adsense.js` (exports `ADSENSE_CLIENT_ID`, `ADSENSE_SCRIPT_SRC`, `AD_SLOTS` placeholders, `isAdAllowedOnRoute()` deny-list for legal/about/contact/methodology).
  - Loader: `src/hooks/useAdSenseLoader.js` injects the AdSense script into `<head>` only after marketing consent is granted (`hasMarketingConsent()` returns `accepted`) and reacts to in-session consent changes via the `cookie-consent-changed` `CustomEvent`.
  - Slot component: `src/components/AdSlot/AdSlot.jsx` lazy-mounts each slot via `IntersectionObserver` and pushes to `window.adsbygoogle` on visibility.
  - Verification file: `public/ads.txt` containing `google.com, pub-3917556333305409, DIRECT, f08c47fec0942fa0`.
  - SDK/Client: AdSense JS tag (no npm package).
  - Auth: publisher id only (no secret); embedded in client.

**Fonts:**
- Google Fonts - Inter family (weights 400–800) loaded via stylesheet link in `index.html` with `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.

## Data Storage

**Databases:**
- None. The application is a purely client-side SPA with no backend database.

**File Storage:**
- Local filesystem only. Static assets shipped from `public/` to Cloudflare's edge.

**Caching:**
- Client-side `localStorage` cache for exchange rates (key `currencyabout_rates`, scoped to the current calendar date in `src/services/exchangeRate.js`).
- Cloudflare's default edge caching for static assets (no custom cache rules in `wrangler.jsonc`).
- No server-side cache, no Redis/Memcached, no Cloudflare KV.

## Authentication & Identity

**Auth Provider:**
- Not applicable. The app has no user accounts, no login flow, and no protected routes.

## Monitoring & Observability

**Error Tracking:**
- Not detected. No Sentry, Datadog, Bugsnag, LogRocket, or similar in dependencies or source.

**Logs:**
- Cloudflare Workers Observability is enabled in `wrangler.jsonc` (`observability.enabled: true`) — provides request-level logs and metrics in the Cloudflare dashboard.
- No client-side logging service; errors surface in the UI via local `try/catch` (e.g. `src/hooks/useExchangeRates.js`).

## CI/CD & Deployment

**Hosting:**
- Cloudflare Workers static assets, project name `currencyabout-front` (`wrangler.jsonc`). SPA fallback configured via `assets.not_found_handling: "single-page-application"`.

**CI Pipeline:**
- Not detected. No `.github/workflows/`, no `.gitlab-ci.yml`, no CircleCI/Bitbucket configs in the repo. Deploys appear to run locally via `npm run deploy` (`vite build` + `wrangler deploy`).

## Environment Configuration

**Required env vars:**
- None at application runtime. The exchange-rate endpoint and AdSense client id are hard-coded constants.
- For deployment, `wrangler deploy` requires Cloudflare credentials in the operator's environment (e.g. `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) per standard Wrangler conventions. These are not committed and not referenced in source.

**Secrets location:**
- No secrets are stored in the repo. `.gitignore` excludes `.env*` and `.dev.vars*` (allowing only `.env.example` / `.dev.vars.example` if/when added). No such example files presently exist.

## Webhooks & Callbacks

**Incoming:**
- None. The app has no server endpoints to receive webhooks.

**Outgoing:**
- None. The app issues only outbound `GET` requests to `open.er-api.com` (rates) and indirectly loads the AdSense script tag from `pagead2.googlesyndication.com` after consent.

---

*Integration audit: 2026-05-18*
