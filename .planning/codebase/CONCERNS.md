# Codebase Concerns

**Analysis Date:** 2026-05-18

## Tech Debt

**AdSense slot ids are placeholders:**
- Issue: `AD_SLOTS` contains synthetic `'0000000001'` through `'0000000005'` strings. These are not real slot ids and will never serve ads — once visitors grant consent the AdSense script loads but ad units render blank because the slot id is invalid.
- Files: `src/constants/adsense.js`
- Impact: After AdSense approval and consent acceptance, ads silently fail to render. No revenue, no warning surfaced.
- Fix approach: Create five units in the AdSense console (homeEditorial, guideMid, guideEnd, pairBelowConversion, pairEnd), copy the real numeric slot ids, and replace the placeholders. Ship in a single commit after approval lands.

**Hand-maintained sitemap and noscript guide list:**
- Issue: `public/sitemap.xml` and the `<noscript>` block in `index.html` both enumerate guides, popular pairs, and routes by hand. Already missed `how-exchange-rates-are-determined` once. Sitemap and `guides.js` currently agree (16 entries each), but drift is reintroduced with every new guide or pair.
- Files: `public/sitemap.xml`, `index.html`, `src/content/guides.js`, `src/seo/seoContent.js`
- Impact: New guides/pairs can ship without sitemap entries → slower discovery by Googlebot; mismatch between SPA routes and crawlable URL list.
- Fix approach: Add a `scripts/build-sitemap.js` that reads `GUIDES`, `POPULAR_PAIRS`, and the indexable-pair set, then writes `dist/sitemap.xml` post-build. Same for the `<noscript>` list — render it from the same source at build time, or accept it as a static homepage skeleton and stop listing every guide.

**No code splitting / `manualChunks`:**
- Issue: `vite.config.js` is bare (`plugins: [react(), cloudflare()]` only). Latest build emits `dist/assets/index-CUug3U4S.js` at ~503 KB (compressed served around ~150 KB gzip but Vite warns the chunk crosses its 500 KB threshold). All 16 guides, all locale bundles (7 languages), and all routes ship in one bundle.
- Files: `vite.config.js`, `src/App.jsx`, `src/content/guides.js`, `src/i18n/locales/*.js`
- Impact: Higher TTI on mobile, especially in markets with slow networks; LCP suffers because every visitor downloads guide prose they may never read; AdSense + Google Fonts share the same network contention window.
- Fix approach: Lazy-load route components with `React.lazy` + `Suspense` (especially `GuidePage`, `MethodologyPage`, `TermsPage`, `PrivacyPage`, `AboutPage`, `ContactPage`). Lazy-load `src/content/guides.js` only when the guide route renders. Optionally configure `build.rollupOptions.output.manualChunks` to split vendor (react/react-router) from app code so router and runtime cache across deploys.

**Centralised pair page assumes all profiles exist:**
- Issue: `getProfile(fromCode)` in `CurrencyPairPage` is rendered with `fromProfile && (...)`, but missing profiles silently produce a less rich page. There is no contract that every entry in `CURRENCY_META` (21 currencies) has a matching profile in `currencyProfiles.js`.
- Files: `src/pages/CurrencyPairPage.jsx`, `src/content/currencyProfiles.js`, `src/constants/currencies.js`
- Impact: Indexable pair pages with missing profiles render with degraded depth and can drop below the "thin content" threshold Google flags.
- Fix approach: Add a dev-time assertion or a unit-style check (when tests are added) that every code in `CURRENCY_META` has a profile entry.

**ADSENSE-* docs duplicate planning state:**
- Issue: `ADSENSE-EXECUTE.md`, `ADSENSE-EXECUTION.md`, `ADSENSE-FIX.md`, `ADSENSE-PLAN.md`, `POST-DEPLOY-CHECKLIST.md`, `SEO-STRATEGY.md`, `SEO.md` live in the project root. Five AdSense docs overlap with the new `.planning/` directory.
- Files: project root
- Impact: New contributors don't know which doc is authoritative. Stale plans can mislead.
- Fix approach: Move into `.planning/` under a milestone folder or archive once their tasks are complete.

## Known Bugs

**Cloudflare returns HTTP 200 for unknown URLs:**
- Symptoms: `curl -I https://currencyabout.com/no-such-page` returns `200 OK` instead of `404 Not Found`. The `NotFoundPage` component renders correctly client-side and emits `<meta name="robots" content="noindex">` via `SeoHead`, but the HTTP status from the edge is wrong.
- Files: `wrangler.jsonc`, `src/pages/NotFoundPage.jsx`, `src/App.jsx` (catch-all `<Route path="*">`)
- Trigger: any URL that does not match a route — typos, deleted pairs, junk paths from referrers.
- Workaround: `noindex` meta on the 404 component prevents indexing once Googlebot renders the page. A real fix requires adding a Cloudflare Worker entrypoint script that serves the SPA shell with HTTP 404 for unmatched paths (the `assets.not_found_handling: "single-page-application"` mode cannot return a non-200 status).

**Invalid pair slug → silent NotFound, but rate fetch still runs:**
- Symptoms: Visiting `/foo-to-bar` parses fromCode/toCode as `null` and renders `<NotFoundPage />` on line 53–55 of `CurrencyPairPage`, but `useCurrencyConverter('USD')` on line 46 still executes before the early return — it fetches/reads rates and renders nothing.
- Files: `src/pages/CurrencyPairPage.jsx`
- Trigger: any non-matching slug under the `/:pair` route.
- Workaround: Harmless in practice (rates load from cache after first visit), but wastes a network request on cold visits to bad URLs. Move the regex check above the converter hook, or hoist the early return.

**Single-line regex doesn't validate against supported currencies:**
- Symptoms: `/abc-to-def` matches `^([a-z]{3})-to-([a-z]{3})$` and reaches `CURRENCY_META.find(...)`, which returns undefined → 404. Fine for unsupported codes, but two valid-format codes that aren't in CURRENCY_META still trigger the rate fetch in the case above.
- Files: `src/pages/CurrencyPairPage.jsx`
- Trigger: URLs like `/xyz-to-abc`.
- Workaround: Falls through to NotFoundPage; SEO is fine because of the noindex meta.

## Security Considerations

**No Content Security Policy / security headers:**
- Risk: No `<meta http-equiv="Content-Security-Policy">` in `index.html` and no `_headers` file in `public/`. Cloudflare's `wrangler.jsonc` does not declare any header transforms. AdSense, Google Fonts, and the open.er-api.com exchange rate API all load over the open web with no restriction policy.
- Files: `index.html`, `public/` (no `_headers`), `wrangler.jsonc`
- Current mitigation: No user-generated content, no auth, no inline `<script>` from user input. `dangerouslySetInnerHTML` / `innerHTML` / `eval` are not used anywhere in `src/`. AdSense script is loaded with `crossOrigin = 'anonymous'`.
- Recommendations: Add a `public/_headers` file with at minimum: `Content-Security-Policy` (script-src self + AdSense + adservice.google.com; style-src self + fonts.googleapis.com; img-src self data: + AdSense ad domains; connect-src self + open.er-api.com); `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy` to deny camera/microphone/geolocation. Test the CSP carefully because AdSense inlines styles and scripts at runtime; use `unsafe-inline` for style-src or hashes.

**Exchange rate API is HTTPS but unauthenticated:**
- Risk: `open.er-api.com/v6/latest/BRL` is a free public endpoint. If it goes down or returns malicious data, the converter shows wrong rates. There's no integrity check on the response shape beyond `data.result === 'success'`.
- Files: `src/services/exchangeRate.js`
- Current mitigation: HTTPS connection; throws on non-OK response; falls back to today's cached data if present.
- Recommendations: Add a sanity-check on rate values (reject if rate ≤ 0, NaN, or absurdly large). Consider stamping a `schemaVersion` in the cached payload so future shape changes don't return stale corrupt data. Long-term: proxy through a Cloudflare Worker that adds a second source for cross-check.

**localStorage values are unversioned:**
- Risk: Four localStorage keys are used: `cookie-consent` (CookieConsent), `currencyabout_theme` (ThemeContext), `currencyabout_lang` (I18nContext), `currencyabout_rates` (exchangeRate service). None carry a schema version. If the cache shape ever changes (e.g. nesting rates under `data.rates`), returning visitors hit a corrupt object and either crash or silently get wrong rates.
- Files: `src/services/exchangeRate.js`, `src/components/CookieConsent/CookieConsent.jsx`, `src/theme/ThemeContext.jsx`, `src/i18n/I18nContext.jsx`
- Current mitigation: `try/catch` around JSON parsing returns `null` on failure. Daily expiry on rate cache (`cached.date === getTodayDate()`).
- Recommendations: Bake a `v: 1` field into every cached value and bump on schema change; on read, if version mismatches, ignore and refetch.

**Cookie banner reappears every visit if storage is blocked:**
- Risk: If a user blocks localStorage (privacy mode, tracking-protection extension), the banner shows on every navigation. `decide()` swallows the storage error and the banner re-shows because `getStoredConsent()` always returns null.
- Files: `src/components/CookieConsent/CookieConsent.jsx`
- Current mitigation: Banner still works in-memory for the session because `setVisible(false)` runs after `dispatchEvent`.
- Recommendations: Track an in-memory session flag alongside localStorage so the banner doesn't keep reappearing in privacy-mode tabs.

## Performance Bottlenecks

**Single ~503 KB JS bundle (Vite warns above 500 KB):**
- Problem: Latest `npm run build` produces `dist/assets/index-CUug3U4S.js` at 503,385 bytes — past Vite's default `chunkSizeWarningLimit`.
- Files: `vite.config.js`, `src/App.jsx`, `src/content/guides.js` (977 lines, the largest file), all `src/i18n/locales/*.js`
- Cause: No `React.lazy`, no `manualChunks`. Every visitor downloads all 7 locales (~123 lines each), all 16 guides, and every page component on first load.
- Improvement path: Lazy-load each route with `React.lazy(() => import(...))`. Split locale loading: `import.meta.glob` the locales folder and load only the active language plus English fallback. Split guides into `src/content/guides/*.js` with `import.meta.glob` and load on demand by slug. Configure `build.rollupOptions.output.manualChunks` to isolate `react`, `react-dom`, `react-router-dom`, `react-helmet-async`.

**`useCurrencyConverter` sorts currencies on every render path where dependencies change:**
- Problem: `sortedTargetCurrencies` rebuilds the array and runs `.sort()` whenever `targetCurrencies`, `sortBy`, `localizedCurrencies`, or `fromCurrency` changes. `targetCurrencies` itself depends on `localizedCurrencies` which depends on `t` (the locale dictionary). Every theme/language switch invalidates the chain.
- Files: `src/hooks/useCurrencyConverter.js`
- Cause: Localized name attached inside `localizedCurrencies` mixes display-only data with rate data, forcing the downstream `useMemo` chain to recompute.
- Improvement path: Compute display labels in `CurrencyCard` from a separate hook so rate-shaped data stays stable. Or memoize a `byCode` map separately from the sortable array.

**`CurrencyGrid` renders all visible cards without virtualization:**
- Problem: HomePage shows up to ~20 currencies; each `CurrencyCard` is memoized but the parent grid passes inline-computed `rate` props (`getRate(allCurrencies, fromCurrency, currency.code)`). The rate prop changes by reference every render, defeating `memo`.
- Files: `src/components/CurrencyGrid/CurrencyGrid.jsx`, `src/components/CurrencyCard/CurrencyCard.jsx`
- Cause: `getRate` returns a number (primitive), so reference identity is not the issue, but if `allCurrencies` mutates the value can change. Combined with `amount`, `fromCurrency`, and the `precision` prop, the memo barrier is shallow.
- Improvement path: Pass the rate map as a stable object reference (memoized in the parent), and have CurrencyCard look up its rate from a context to reduce prop churn. Not urgent at 20 cards; revisit if the list grows past ~50.

**External script dependencies in head: Google Fonts and AdSense:**
- Problem: `index.html` loads `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap` as a render-blocking stylesheet (after preconnect). AdSense is consent-gated, so it's not in the critical path until consent, but Google Fonts is.
- Files: `index.html`
- Cause: Web font loaded via `<link rel="stylesheet">` blocks first paint of any text using Inter.
- Improvement path: `display=swap` mitigates FOIT but adds a font-swap CLS event. Consider self-hosting Inter as woff2 in `public/fonts/` and inlining a system-font fallback stack in critical CSS. Or load Inter via `<link rel="preload" as="font">` plus `font-display: swap`.

## Fragile Areas

**Pair URL parser + `isIndexablePair` + sitemap:**
- Files: `src/pages/CurrencyPairPage.jsx`, `src/seo/seoContent.js`, `public/sitemap.xml`
- Why fragile: Three sources of truth that must agree — the URL regex, the `indexedSet` of indexable pairs (POPULAR_PAIRS + their reverses + major-major combinations), and the sitemap. Adding a currency code or changing the majors list silently moves pages into or out of the index without updating the sitemap.
- Safe modification: Always update sitemap when changing `POPULAR_PAIRS` or `MAJORS`. Prefer to generate the sitemap from these constants (see Tech Debt above).
- Test coverage: None.

**AdSense consent gate:**
- Files: `src/hooks/useAdSenseLoader.js`, `src/components/CookieConsent/CookieConsent.jsx`, `src/components/AdSlot/AdSlot.jsx`, `index.html` (the comment around the removed static `<script>`)
- Why fragile: Three coordinated pieces talking via a custom event. If anyone re-adds a static AdSense `<script>` to `index.html` (the comment block at lines 47–53 warns against this), the script loads before consent, breaking GDPR posture. If `AdSlot` mounts before `useAdSenseLoader` runs the first push throws and is silently swallowed, masking a real misconfiguration in dev.
- Safe modification: Keep the static `<script>` out of `index.html` — comment documents this. When changing the consent event name (`cookie-consent-changed`), update all three files together. When debugging, temporarily replace the `catch {}` in `AdSlot` with a `console.warn`.
- Test coverage: None.

**localStorage rate cache invalidation:**
- Files: `src/services/exchangeRate.js`
- Why fragile: Cache key is the UTC-rounded date string from `new Date().toISOString().slice(0, 10)`. A user crossing midnight UTC mid-session sees stale rates until they reload. Also, no upper bound on cache age — if the user is offline for days, they still see whatever was last cached if today's UTC date happens to match.
- Safe modification: Add a `timestamp` ceiling (already stored, not checked). Add a manual refresh button or a max-age check.
- Test coverage: None.

**StrictMode double-effect interaction with `cookie-consent-changed` listener:**
- Files: `src/main.jsx` (StrictMode), `src/hooks/useAdSenseLoader.js`, `src/components/AdSlot/AdSlot.jsx`
- Why fragile: In dev, StrictMode mounts effects twice. The script injection in `useAdSenseLoader` is idempotent (checks for the marker before appending), but the AdSense push in `AdSlot` is also gated by `pushedRef.current`. Looks fine on inspection; verify after any refactor that the push doesn't double-fire in production.
- Safe modification: Keep both idempotency guards in place.
- Test coverage: None.

## Scaling Limits

**Currency list:**
- Current capacity: 21 currencies in `CURRENCY_META`.
- Limit: HomePage `CurrencyGrid` renders all of them as cards. Past ~50 cards, the page becomes long and the un-virtualized layout slows scrolls on mobile.
- Scaling path: Add virtualization (e.g. `react-window`) or paginate per continent.

**Indexable pair pages:**
- Current capacity: 20 popular pairs (with their reverses) plus 56 major-major combos = roughly 76 indexable pages. Anyone visiting `/aaa-to-bbb` for a non-indexable supported pair gets a working page with `noindex`.
- Limit: Around 21 × 20 = 420 potential supported-currency pairs. Indexing all of them once triggered the "low-value content" flag with Google.
- Scaling path: Keep the curated indexable set and only expand it when editorial depth (currency profiles, intro paragraphs, FAQ) is added for the new pair.

**Guide content:**
- Current capacity: 16 guides, each baked into `src/content/guides.js` (977 lines total).
- Limit: At ~60–100 lines per guide, the file will cross 5,000+ lines and become unwieldy by guide #50. Also, all guide content ships to every visitor on the homepage.
- Scaling path: Split into per-guide files under `src/content/guides/` and lazy-load by slug in `GuidePage`.

## Dependencies at Risk

**`react-helmet-async@^3.0.0` on React 19:**
- Risk: `react-helmet-async` was last meaningfully updated for React 17/18. React 19 changes some lifecycle semantics; the package may emit deprecation warnings or have edge cases.
- Impact: SEO meta tags break if Helmet stops syncing on route change. Used heavily by `SeoHead`.
- Migration plan: Evaluate `react-router`'s built-in `<title>` handling (in v7+, route components can declare meta directly) or migrate to a lightweight head manager that explicitly supports React 19.

**`react-router-dom@^7.13.2`:**
- Risk: v7 is recent (post-Remix merge). API surface for SSR-style route data loaders changed; SPA usage like here is stable but the package's direction is moving toward framework mode.
- Impact: Future major versions may break the simple `<Routes>`/`<Route>` pattern.
- Migration plan: Pin to v7.x. Watch for v8 release notes before upgrading.

**`open.er-api.com` free tier (third-party data):**
- Risk: Single source of exchange rates, free tier, no SLA. Outages directly break the converter for first-time visitors (cache mitigates returning visitors for the day).
- Impact: Empty grid, error state, churned visitors.
- Migration plan: Add a fallback source (e.g. ECB daily reference rates served via a Cloudflare Worker). Pre-build a daily snapshot into the deployed assets as a hard fallback.

## Missing Critical Features

**Real HTTP 404 status:**
- Problem: Unknown URLs return 200 (see Known Bugs).
- Blocks: Cleaner crawl signals to search engines, more accurate analytics, correct CDN cache behavior for invalid paths.

**Automated tests:**
- Problem: No test runner in `package.json`. No `test/` or `__tests__/`. No CI test step.
- Blocks: Safe refactors of the rate cache, pair parsing, consent flow, indexable-pair logic; regressions land unnoticed.

**Lint / formatter:**
- Problem: No ESLint or Prettier config; no `lint` script in `package.json`. Intentional per recent AdSense planning docs.
- Blocks: Style consistency across contributors; catching unused imports, dangling `await`s, accessibility lint rules (`eslint-plugin-jsx-a11y`).

**CI / pre-commit hook:**
- Problem: No `.github/workflows/`, no Husky, no lefthook. Deploys run from a developer machine via `npm run deploy`.
- Blocks: Automated build verification before deploy; safety net for the previously-listed gaps.

**SSR or pre-rendered HTML:**
- Problem: Pure client-side rendering. Googlebot handles JS, but social previews and slower bots may see the empty SPA shell.
- Blocks: First-paint SEO performance; rich link previews for fresh pair pages; meta tags reach crawlers only after JS executes.

**Error boundary:**
- Problem: No React `ErrorBoundary` anywhere in the tree. A render-time error in any component crashes the whole app to the blank shell.
- Blocks: Graceful recovery on the production site; the user just sees a white page.

**Build-time sitemap and noscript generator:**
- Problem: See Tech Debt — both are hand-maintained.
- Blocks: Reliable indexing of new content.

## Test Coverage Gaps

**Rate cache logic (`src/services/exchangeRate.js`):**
- What's not tested: Date rollover behavior, JSON parse error recovery, missing `data.result` field, cache key collision.
- Files: `src/services/exchangeRate.js`
- Risk: Stale or wrong rates served silently.
- Priority: High.

**Pair URL parser and `isIndexablePair` (`src/seo/seoContent.js`):**
- What's not tested: Lowercase/uppercase normalization, missing currency codes, the major-major matrix expansion, that every entry in `POPULAR_PAIRS` is also in the indexable set.
- Files: `src/seo/seoContent.js`, `src/pages/CurrencyPairPage.jsx`
- Risk: Indexable pages getting marked noindex (or vice versa), invisible to SEO.
- Priority: High.

**Consent gating (`useAdSenseLoader`, `AdSlot`, `CookieConsent`):**
- What's not tested: No-storage browsers, accept then reject in same session, AdSense script load failure, IntersectionObserver fallback in older browsers.
- Files: `src/hooks/useAdSenseLoader.js`, `src/components/AdSlot/AdSlot.jsx`, `src/components/CookieConsent/CookieConsent.jsx`
- Risk: Ads loading before consent (GDPR violation) or never loading after consent (revenue loss).
- Priority: High.

**i18n key coverage:**
- What's not tested: Every locale has the same key shape; fallback to English when a key is missing in another locale.
- Files: `src/i18n/locales/*.js`, `src/i18n/I18nContext.jsx`
- Risk: Broken layout or `undefined` text on non-English locales when a new key is added in English only.
- Priority: Medium.

**Accessibility:**
- What's not tested: Color contrast in dark mode, keyboard navigation through the cookie banner, focus management when the language selector or filter opens, ARIA labels on icon-only buttons. `aria-*` / `role` attributes appear ~91 times in JSX (good), but no automated audit (e.g. axe-core) runs.
- Files: All `src/components/*` and `src/pages/*`
- Risk: AdSense reviewers and search engines now weight accessibility; failures are silent.
- Priority: Medium.

**Currency profiles completeness:**
- What's not tested: Every code in `CURRENCY_META` has a matching entry in `currencyProfiles.js`.
- Files: `src/content/currencyProfiles.js`, `src/constants/currencies.js`
- Risk: Pair pages with missing profiles render thinner content and drop below thin-content thresholds.
- Priority: Medium.

---

*Concerns audit: 2026-05-18*
