# Testing Patterns

**Analysis Date:** 2026-05-18

## Test Framework

**Runner:**
- None configured. Verified by inspecting `package.json`: no
  `jest`, `vitest`, `mocha`, `playwright`, `cypress`, or
  `@testing-library/*` packages appear in `dependencies` or
  `devDependencies`.
- Config: Not detected. No `vitest.config.*`, `jest.config.*`,
  `playwright.config.*`, or `cypress.config.*` exists in the
  repository.

**Assertion Library:**
- Not detected. None configured.

**Run Commands:**
```bash
# No test runner is wired up. The full script surface is:
npm run dev        # Start Vite dev server
npm run build      # Production build (vite build)
npm run preview    # Build then run Wrangler dev preview
npm run deploy     # Build then deploy via Wrangler
```
There is no `test`, `test:watch`, or `coverage` script.

## Test File Organization

**Location:**
- Not applicable. A repo-wide search for `*.test.*` and `*.spec.*`
  (excluding `node_modules` and `dist`) returns zero matches. No
  `__tests__`, `tests`, or `test` directories exist under the
  project root.

**Naming:**
- Not applicable. If tests are introduced, the recommended pattern
  for this codebase would be co-located `*.test.jsx` / `*.test.js`
  files next to the module under test (e.g.
  `src/components/Breadcrumbs/Breadcrumbs.test.jsx`), matching the
  existing co-location convention used for `.css` files.

**Structure:**
```
(none — no test files in repo)
```

## Test Structure

**Suite Organization:**
```
(none — no test files in repo)
```

**Patterns:**
- Setup pattern: None configured.
- Teardown pattern: None configured.
- Assertion pattern: None configured.

## Mocking

**Framework:** Not detected. None configured.

**Patterns:**
```
(none — no mocks in repo)
```

**What to Mock:**
- Not applicable. If a runner is introduced, the modules most
  worth mocking based on current dependencies are:
  - `src/services/exchangeRate.js` (`fetch` to
    `https://open.er-api.com/v6/latest/BRL`) — to avoid network
    calls and to exercise the cache / failure branches.
  - `localStorage` (used by `services/exchangeRate.js`,
    `components/CookieConsent/CookieConsent.jsx`) — typically
    via `jsdom` defaults plus per-test resets.
  - `window.adsbygoogle` and the AdSense script injection in
    `hooks/useAdSenseLoader.js` and
    `components/AdSlot/AdSlot.jsx`.
  - `IntersectionObserver` (used in
    `components/AdSlot/AdSlot.jsx`) — needs a polyfill or stub
    in JSDOM.

**What NOT to Mock:**
- Not applicable yet. General guidance: do not mock
  `react-router-dom` — use `MemoryRouter` from the real package
  to render route-aware components.

## Fixtures and Factories

**Test Data:**
```
(none — no fixtures in repo)
```

**Location:**
- Not applicable. Real production data shapes that future tests
  can mirror include:
  - `CURRENCY_META` in `src/constants/currencies.js`.
  - `POPULAR_PAIRS` in `src/seo/seoContent.js`.
  - The guide block schema documented in `CONVENTIONS.md`
    (see `src/content/guides.js`).

## Coverage

**Requirements:** None enforced. No coverage tooling is
configured.

**View Coverage:**
```bash
# Not available — no coverage reporter is installed.
```

## Test Types

**Unit Tests:**
- Not configured. Known gap.

**Integration Tests:**
- Not configured. Known gap.

**E2E Tests:**
- Not configured. Known gap. The Cloudflare Workers + Vite stack
  would work with Playwright against `npm run preview`, but
  nothing is wired up today.

## Common Patterns

**Async Testing:**
```
(none — no async test patterns in repo)
```

**Error Testing:**
```
(none — no error test patterns in repo)
```

---

## Known Gap

**No automated tests exist in this repository.** This is a
deliberate state of the project as of 2026-05-18, not an
oversight in this document. There is:

- No test runner in `package.json` (no `jest`, `vitest`,
  `mocha`, `playwright`, or `cypress`).
- No test config files.
- No `*.test.*` or `*.spec.*` files anywhere in `src/`.
- No `__tests__` / `tests` / `test` directories.
- No `lint` script and no ESLint config, so static analysis is
  also absent.

Quality is currently held by code review, manual verification in
`npm run dev` / `npm run preview`, and TypeScript-free explicit
runtime checks (consent gating, route allowlists, cache
fallbacks). Introducing a testing framework should be planned as
a dedicated phase that:

1. Picks a runner (Vitest is the natural fit alongside Vite).
2. Adds `jsdom` and `@testing-library/react` for component
   tests.
3. Stubs `IntersectionObserver`, `localStorage`, and
   `window.adsbygoogle` in a shared setup file.
4. Starts with the highest-risk modules: `services/exchangeRate.js`,
   `hooks/useExchangeRates.js`,
   `hooks/useCurrencyConverter.js`, and the consent-gated
   `components/AdSlot/AdSlot.jsx` /
   `components/CookieConsent/CookieConsent.jsx` pair.
5. Adds a `test` script and CI hook before expecting any coverage
   threshold.

See `CONCERNS.md` if/when one is produced for this codebase map.

---

*Testing analysis: 2026-05-18*
