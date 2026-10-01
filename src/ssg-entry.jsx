// vite-react-ssg entry point.
//
// Defines the data-router route tree consumed by the plugin at build time
// (renderToString per route -> dist/<route>/index.html) and at runtime
// (createBrowserRouter -> hydrate). Mirrors the JSX route table that used
// to live in src/App.jsx so every existing URL keeps the same shell:
//   header / nav / footer (Layout) + matched page in <Outlet />.
//
// The provider stack (HelmetProvider -> ThemeProvider -> I18nProvider) is
// mounted INSIDE the parent route element (LayoutOutlet). That keeps every
// page descendant of every provider on both SSR and CSR paths, which is
// what react-helmet-async needs to collect per-route <title>, <meta>, and
// <link> tags into initial HTML during the build's renderToString pass.

import React from 'react'
import { Outlet } from 'react-router-dom'
import { ViteReactSSG } from 'vite-react-ssg'
import { I18nProvider } from './i18n/I18nContext.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CurrencyPairPage } from './pages/CurrencyPairPage.jsx'
import { ExchangeRatesTodayPage } from './pages/ExchangeRatesTodayPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import './App.css'
import './pages/pages.css'
import './index.css'

// Parent route element: mounts the (Theme + I18n) provider stack and the
// Layout shell, then renders the matched child page via <Outlet />.
// No <Suspense> around <Outlet />: lazy routes resolve through react-router's
// `lazy` (before render), so nothing suspends, and a boundary makes React 19
// outline large pages into a hidden <div id="S:0"> moved in by script, which
// keeps the main content out of the static HTML for non-rendering crawlers.
//
// HelmetProvider is intentionally NOT mounted here. vite-react-ssg wraps
// the rendered tree with its own <HelmetProvider context={helmetContext}>
// at build time so the plugin can extract helmet.title/.meta/.link and
// inject them into the <head> of the per-route dist/<route>/index.html.
// A nested HelmetProvider would capture <Helmet> calls into its own
// context and leak them as literal JSX nodes inside <div id="root">
// instead of into the document head -- which would be invisible to
// non-rendering crawlers and defeat the whole pre-render. On the client,
// the plugin's bootstrap also mounts HelmetProvider above the router so
// react-helmet-async still works for runtime title updates.
function LayoutOutlet() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Layout>
          <Outlet />
        </Layout>
      </I18nProvider>
    </ThemeProvider>
  )
}

// Lazy resolver helper: react-router-dom v7 data router accepts a `lazy`
// field that returns { Component }. Adapt the existing named-export pages
// without touching their source.
const lazyComp = (loader) => async () => {
  const mod = await loader()
  // Prefer a default export, otherwise pick the first named function export
  // (matches our convention of one named PascalCase page per file).
  const first = Object.keys(mod).find((k) => k !== 'default' && typeof mod[k] === 'function')
  return { Component: mod.default || (first ? mod[first] : undefined) }
}

// Hydration fix for vite-react-ssg 0.9 + react-router 7. On the client the
// plugin attaches a static-data `loader` to every route and builds the
// router without passing hydration data, so react-router only hydrates
// synchronously when window.__staticRouterHydrationData.loaderData already
// holds an entry for each matched route id. Without loaders at build time
// that object is `{}`, the router treats the page as not yet loaded, renders
// nothing during hydration ("No HydrateFallback element" warning), and React
// ends up appending a second client-rendered copy of the app next to the
// prerendered one. A no-op loader on every route makes the build emit
// `null` entries for each id, so hydration adopts the prerendered markup.
const nullLoader = () => null

function withNullLoaders(routeList) {
  return routeList.map((route) => ({
    ...route,
    loader: nullLoader,
    ...(route.children ? { children: withNullLoaders(route.children) } : {}),
  }))
}

export const routes = withNullLoaders([
  {
    path: '/',
    element: <LayoutOutlet />,
    children: [
      // Eager static routes
      { index: true, Component: HomePage },
      { path: 'converter', Component: HomePage },
      { path: 'exchange-rates-today', Component: ExchangeRatesTodayPage },

      // Lazy legal / company / methodology routes
      { path: 'about', lazy: lazyComp(() => import('./pages/legal/AboutPage.jsx')) },
      { path: 'privacy-policy', lazy: lazyComp(() => import('./pages/legal/PrivacyPage.jsx')) },
      { path: 'terms', lazy: lazyComp(() => import('./pages/legal/TermsPage.jsx')) },
      { path: 'contact', lazy: lazyComp(() => import('./pages/legal/ContactPage.jsx')) },
      { path: 'methodology', lazy: lazyComp(() => import('./pages/legal/MethodologyPage.jsx')) },

      // Lazy guide routes (index + slug detail)
      { path: 'guides', lazy: lazyComp(() => import('./pages/guides/GuidesIndexPage.jsx')) },
      { path: 'guides/:slug', lazy: lazyComp(() => import('./pages/guides/GuidePage.jsx')) },

      // Dynamic pair route (must come AFTER all named routes so /converter,
      // /about, /guides, etc. match first).
      { path: ':pair', Component: CurrencyPairPage },

      // Catch-all 404 (must be last).
      { path: '*', Component: NotFoundPage },
    ],
  },
])

// ViteReactSSG bootstrap. Named export `createRoot` is the convention the
// plugin's CLI discovers from the entry file (src/main.jsx re-exports it).
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient, initialState }) => {
    // No additional setup needed: routes + LayoutOutlet handle everything.
    // initialState / isClient hooks are available if a future plan needs
    // to seed build-time data (e.g. injecting cached rates so the
    // converter has numbers at first paint).
    void isClient
    void initialState
  },
  {
    rootContainer: '#root',
  },
)
