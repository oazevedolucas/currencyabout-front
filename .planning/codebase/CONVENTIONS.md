# Coding Conventions

**Analysis Date:** 2026-05-18

This project is plain JavaScript (no TypeScript), React 19 + Vite, deployed via
Cloudflare Wrangler. Conventions below are derived from real source files
under `src/` (e.g. `src/components/AdSlot/AdSlot.jsx`,
`src/hooks/useCurrencyConverter.js`, `src/pages/guides/GuidePage.jsx`).

## Naming Patterns

**Files:**
- React components: PascalCase `.jsx` files co-located with a matching
  PascalCase `.css` file in their own folder, e.g.
  `src/components/Breadcrumbs/Breadcrumbs.jsx` + `Breadcrumbs.css`.
- Hooks: camelCase `.js` files prefixed with `use`, e.g.
  `src/hooks/useAdSenseLoader.js`, `src/hooks/useCurrencyConverter.js`.
- Pages: PascalCase `.jsx` directly under `src/pages/` (or grouped subfolder
  like `src/pages/guides/`, `src/pages/legal/`); shared page styles live in
  `src/pages/pages.css` and route-group styles like
  `src/pages/guides/guides.css`.
- Services / constants / content / seo modules: camelCase `.js`, e.g.
  `src/services/exchangeRate.js`, `src/constants/adsense.js`,
  `src/content/guides.js`, `src/seo/seoContent.js`.
- Context providers: PascalCase `.jsx`, e.g. `src/i18n/I18nContext.jsx`,
  `src/theme/ThemeContext.jsx`.
- Test files: none. There are no `*.test.*` or `*.spec.*` files in the repo.

**Functions:**
- Use `camelCase` for plain functions and hooks (`fetchRates`,
  `useAdSenseLoader`, `renderBlock`).
- Use `PascalCase` for React components (`AdSlot`, `Breadcrumbs`,
  `GuidePage`).
- Prefer `function` declarations for top-level functions and components
  (`export function AdSlot(...)`); use arrow functions for inline callbacks
  passed to hooks or event handlers.

**Variables:**
- `camelCase` for locals and module-level bindings (`insRef`, `pushedRef`,
  `localizedCurrencies`).
- `SCREAMING_SNAKE_CASE` for module-level constants that represent
  configuration or fixed values (`ADSENSE_CLIENT_ID`, `AD_SLOTS`,
  `STORAGE_KEY`, `SORT_OPTIONS`, `POPULAR_ORDER`, `NO_AD_ROUTES`,
  `CURRENCY_META`).
- Refs created with `useRef` end in `Ref` (`insRef`, `pushedRef`).
- Booleans are descriptive: `loading`, `fromCache`, `cancelled`, `visible`.

**Types:**
- No TypeScript and no JSDoc `@param` / `@returns` typing convention is in
  use. Do not introduce TypeScript or JSDoc types in new files unless the
  surrounding folder already uses them (none currently do).

## CSS Naming

- Plain CSS in component-co-located `.css` files, imported from the
  component module (`import './AdSlot.css'`). No CSS modules, no
  CSS-in-JS, no Tailwind.
- Class names follow **kebab-case BEM** with two underscores for elements
  and two dashes for modifiers:
  - Block: `.adslot`, `.cookie-consent`, `.breadcrumbs`, `.guide-article`.
  - Element: `.adslot__ins`, `.breadcrumbs__list`,
    `.cookie-consent__title`, `.guide-article__body`.
  - Modifier: `.cookie-consent__btn--primary`,
    `.cookie-consent__btn--ghost`.
- Keep all visual styling in the `.css` file. Use inline `style={...}` only
  for ad/iframe display constraints required by third-party SDKs (see
  `AdSlot.jsx` setting `style={{ display: 'block' }}` on the `<ins>`).

## Code Style

**Formatting:**
- No formatter is configured (no `.prettierrc*`, no `biome.json`). Match
  the existing house style observed in `src/`:
  - 2-space indentation.
  - **No semicolons** at statement ends (see every sampled file:
    `Breadcrumbs.jsx`, `AdSlot.jsx`, `useCurrencyConverter.js`,
    `useExchangeRates.js`, `App.jsx`, `main.jsx`).
  - Single quotes for JS strings; double quotes for JSX attributes.
  - Trailing commas on multi-line literals and JSX prop lists.
  - One blank line between top-level declarations; no blank line between
    a JSX block and its closing tag.
- Do not introduce Prettier/Biome configs without explicit approval — the
  current style is intentional and consistent.

**Linting:**
- **No ESLint, Biome, or other linter is configured.** There is no
  `.eslintrc*`, no `eslint.config.*`, and no `lint` script in
  `package.json`. This is intentional for the current project size; if
  adding lint, propose it as a separate phase and surface the decision.
- In the absence of a linter, hand-enforce: no unused imports, no
  unused locals, no `console.log` left in shipped code, hook dependency
  arrays kept accurate.

## Import Organization

**Order:**
1. External packages (`react`, `react-dom`, `react-router-dom`,
   `react-helmet-async`).
2. Internal modules using relative paths from the current file
   (`../../components/...`, `../i18n/I18nContext.jsx`).
3. Local CSS import last, e.g. `import './AdSlot.css'`.

Each import group is separated from the next by a blank line only when
the file mixes external and internal imports heavily. Single-import files
have no separator.

**Path Aliases:**
- None configured. Use relative paths with explicit `.jsx` / `.js`
  extensions (`import { hasMarketingConsent } from
  '../CookieConsent/CookieConsent.jsx'`). Always include the extension —
  Vite resolves them but the codebase writes them explicitly for
  consistency and to keep imports unambiguous.

## Error Handling

**Patterns:**
- **Async / fetch failures:** throw a descriptive `Error` and let the
  calling hook catch it. `services/exchangeRate.js` throws
  `new Error('Erro ao buscar cotações: ${status}')` on a non-OK response
  and `new Error('API retornou erro')` on an unexpected payload.
- **Hook-side handling:** wrap awaits in `try { ... } catch (err) { ... }
  finally { ... }`; surface `err.message` through state
  (`setError(err.message)`), never re-throw from a hook. See
  `useExchangeRates.js`.
- **Effect cleanup against stale updates:** use a local `let cancelled =
  false` flag and `return () => { cancelled = true }` from `useEffect`;
  guard every state setter with `if (!cancelled)`. See
  `useExchangeRates.js`.
- **`localStorage` access:** always wrap reads and writes in
  `try { ... } catch { ... }` and degrade silently — never let storage
  failures crash a render. See `CookieConsent.jsx#getStoredConsent` and
  `services/exchangeRate.js#readCache`.
- **Third-party globals (AdSense `adsbygoogle.push`):** wrap in
  `try { ... } catch { ... }` and leave a comment explaining why the
  empty catch is safe (see `AdSlot.jsx`).
- **Route/data fallbacks:** prefer rendering an inline "not found" view
  with a return-home link rather than throwing. See `GuidePage.jsx` when
  `getGuide(slug)` returns `undefined`.

## Logging

**Framework:** None. Use `console` sparingly, and never ship
`console.log` left in production code paths.

**Patterns:**
- The codebase intentionally swallows expected failures (storage
  blocked, AdSense not yet loaded, consent not granted) without
  logging. Do not add `console.warn` to these paths; add a comment
  explaining the swallow instead.
- Reserve `console.error` for genuinely unexpected developer-facing
  failures and prefer surfacing the message through component state
  for anything user-visible.

## Comments

**When to Comment:**
- Only when the *why* is non-obvious. Examples:
  - The two-line block in `AdSlot.jsx` explaining the consent + route
    gating and IntersectionObserver lazy-load rationale.
  - The `useAdSenseLoader.js` header explaining the mount-once,
    consent-driven script injection contract.
  - `adsense.js` notes on placeholder slot ids and the no-ad route
    allowlist policy.
- Do not narrate what the code already shows (`// set state to 5`).
- Inline `// ignore — ...` comments are the standard form for empty
  `catch` blocks.

**JSDoc/TSDoc:**
- Not in use. Do not introduce JSDoc unless adding it to an entire
  module surface deliberately and the surrounding folder is updated
  to match.

## Function Design

**Size:**
- Prefer small focused functions. Pull rendering helpers out of
  components when JSX branches by data shape — see `renderInline` and
  `renderBlock` at the top of `GuidePage.jsx`.
- Hooks may be longer (see `useCurrencyConverter.js`) when they
  encapsulate cohesive state; split out memoized derivations rather
  than splitting the hook itself.

**Parameters:**
- Components: a single destructured props object with defaults inline
  (`export function AdSlot({ slotId, format = 'auto', layout,
  className = '' })`). No prop-types, no defaultProps static.
- Hooks: accept primitives or small option objects with defaults
  (`useCurrencyConverter(initialFrom = 'BRL', initialRawValue =
  '10000')`).
- Avoid positional booleans; prefer named props.

**Return Values:**
- Hooks return a flat object of state, derived values, and stable
  setters (see `useCurrencyConverter.js` return block). Wrap event
  handlers in `useCallback` before exposing them.
- Components return JSX or `null`. Use early `return null` for
  consent / route gating (`AdSlot.jsx`, `CookieConsent.jsx`).
- Pure helpers return primitives or new objects — never mutate
  inputs. Memoized derivations clone arrays before sorting
  (`const list = [...targetCurrencies]`).

## Module Design

**Exports:**
- **Named exports only** for components, hooks, helpers, and
  constants (`export function AdSlot`, `export const AD_SLOTS`,
  `export async function fetchRates`).
- The single tolerated `export default` is `src/App.jsx` because
  `main.jsx` imports it as the app root; do not add new default
  exports.
- A module may export both a primary component and supporting
  helpers (e.g. `CookieConsent.jsx` exports `CookieConsent`,
  `getStoredConsent`, and `hasMarketingConsent`).

**Barrel Files:**
- None. Import directly from the component or hook file using its
  full path with extension. Do not introduce `index.js` barrels —
  it would break the established explicit-extension convention.

## React Patterns

- **Functional components only.** No class components. React 19
  hooks (`useState`, `useEffect`, `useMemo`, `useCallback`,
  `useRef`) are the standard primitives.
- **Context providers** live in their own folder (`src/i18n/`,
  `src/theme/`) and are composed in `src/main.jsx` outside the
  router.
- **Routing** uses `react-router-dom` v7. Routes are declared in
  `src/App.jsx`; the catch-all `path="*"` renders `NotFoundPage`.
- **SEO head tags** use `react-helmet-async` via the wrapper
  `src/seo/SeoHead.jsx`, plus structured-data components in
  `src/seo/StructuredData.jsx`. Always wrap inside a `HelmetProvider`
  (already done in `main.jsx`).
- **Cross-component coordination** for consent uses a `CustomEvent`
  on `window` (`'cookie-consent-changed'`) plus a localStorage key.
  Subscribe with `window.addEventListener` inside `useEffect` and
  clean up on unmount.
- **Accessibility:**
  - Always set `aria-label`, `aria-current`, `aria-hidden`, and
    role attributes that match the semantic intent (see
    `Breadcrumbs.jsx`, `RateDisclaimer.jsx`, `CookieConsent.jsx`).
  - Use `<button type="button">` for non-submit buttons.
  - External links must include `target="_blank"
    rel="noopener noreferrer"` (see `RateDisclaimer.jsx`,
    `GuidePage.jsx#renderInline`).

## Editorial Content Authoring

- Long-form editorial content is authored as structured JS data
  objects in `src/content/guides.js`. Each guide has metadata
  (`slug`, `title`, `description`, `category`, `readingMinutes`,
  `updated`) and a `body` array of block objects.
- Supported block `type` values: `lead`, `h2`, `h3`, `p`, `list`,
  `callout`, `disclaimer`.
- `p` and `list` items may use a `children` array of inline tokens.
  Inline tokens are either:
  - A string.
  - An internal link `{ to, text }` (rendered as
    `<Link to={to}>`).
  - An external link `{ href, text }` (rendered as `<a
    target="_blank" rel="noopener noreferrer">`).
  - A bold span `{ strong }`.
- Rendering happens in `src/pages/guides/GuidePage.jsx` via
  `renderBlock` and `renderInline`. To add a new block type, extend
  both functions and add a CSS hook on `.guide-article__...`.

---

*Convention analysis: 2026-05-18*
