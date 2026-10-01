import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

// Build the list of indexable routes to pre-render at build time.
// Sources of truth:
//   1. Static routes from src/App.jsx / src/ssg-entry.jsx
//   2. Guide slugs from src/content/guides.js (16 guides)
//   3. Pair slugs from src/content/pairProfiles.js (38 indexable pairs)
async function buildIncludedRoutes() {
  const [{ GUIDES }, { PAIR_PROFILES }] = await Promise.all([
    import('./src/content/guides.js'),
    import('./src/content/pairProfiles.js'),
  ])

  const staticRoutes = [
    '/',
    '/converter',
    '/exchange-rates-today',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
    '/methodology',
    '/guides',
  ]

  const guideRoutes = GUIDES.map((g) => `/guides/${g.slug}`)
  const pairRoutes = Object.keys(PAIR_PROFILES).map((k) => {
    const [from, to] = k.split('-')
    return `/${from.toLowerCase()}-to-${to.toLowerCase()}`
  })

  return Array.from(new Set([...staticRoutes, ...guideRoutes, ...pairRoutes]))
}

// In-memory audit record, written to dist/.ssg-audit.json by onFinished.
// Feeds the per-route audit task (Task 5) without re-parsing every HTML file.
const ssgAudit = []

function recordAuditEntry(route, html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)
  const ldCount = (html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi) || []).length
  ssgAudit.push({
    route,
    title: titleMatch?.[1] || null,
    canonical: canonicalMatch?.[1] || null,
    description: descMatch?.[1] || null,
    robots: robotsMatch?.[1] || null,
    jsonLdBlocks: ldCount,
    bodyLength: html.length,
  })
}

export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      // Compatibility shim for vite-react-ssg + react-router-dom v7:
      // vite-react-ssg 0.9.0 imports `react-router-dom/server.js` (a v6
      // subpath that no longer exists in v7's exports map). The three
      // symbols it needs (StaticRouterProvider, createStaticHandler,
      // createStaticRouter) all live in react-router-dom's main export
      // in v7, so we redirect the subpath import to the main entry.
      // This avoids downgrading react-router-dom, which is a validated
      // system per CLAUDE.md.
      'react-router-dom/server.js': 'react-router-dom',
      'react-router-dom/server': 'react-router-dom',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  ssgOptions: {
    entry: 'src/main.jsx',
    script: 'defer',
    dirStyle: 'flat',
    mock: true,
    formatting: 'none',
    includedRoutes: async () => {
      const routes = await buildIncludedRoutes()
      return routes
    },
    onPageRendered(route, html) {
      // React 19 + react-helmet-async ^3.0.0 do not populate the
      // helmetContext object that vite-react-ssg's RemixAdapter reads
      // from (the helmet README's "React 19 SSR note" calls this out:
      // "The `context` object will not be populated with helmet state
      // on React 19. ... render these tags directly in your component
      // tree instead and let React 19 handle them natively"). The
      // plugin still places appHTML inside <div id="root">, so the
      // per-route <title>, <meta>, <link>, and JSON-LD <script> tags
      // emitted by <SeoHead> end up nested inside the body. To make
      // them visible to non-rendering crawlers (which is the entire
      // point of this phase) we hoist them into <head> here:
      //   1. Find the per-route head tags inside <div id="root">
      //   2. Move them up under <head>, AFTER the template's static
      //      tags so per-route values win on duplicate matches
      //   3. Strip the now-duplicate static tags whose key matches
      //      a per-route value (title, og:title, og:description,
      //      twitter:title, twitter:description, og:url, description)
      // The JSON-LD blocks stay in <body> -- search engines accept
      // them there and react-helmet-async wraps them in script tags
      // alongside other components, so cleanly hoisting them is more
      // invasive than the SEO value gained.

      // 1. Pull all helmet-rendered head tags out of #root
      const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>\s*<script>window\.__staticRouterHydrationData/)
      if (!rootMatch) {
        // Couldn't find the root container; skip hoisting and just
        // record the post-build state for the audit.
        recordAuditEntry(route, html)
        return html
      }
      const rootInner = rootMatch[1]

      // Capture leading <title>, <meta>, <link> tags emitted by
      // <SeoHead> (they appear at the very start of #root because
      // SeoHead is rendered first in each page). Stop as soon as a
      // non-head element appears.
      const headTagPattern = /^(?:<title[^>]*>[^<]*<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)+/i
      const headBlockMatch = rootInner.match(headTagPattern)
      if (!headBlockMatch) {
        recordAuditEntry(route, html)
        return html
      }
      const headBlock = headBlockMatch[0]

      // 2. Strip those head tags from #root
      const newRootInner = rootInner.slice(headBlock.length)
      let newHtml = html.replace(rootInner, newRootInner)

      // 3. Identify which template head tags to drop so we don't
      //    ship both old (home) values and new (per-route) values.
      // The conflicting keys SeoHead always emits per-route:
      //   - <title>
      //   - <meta name="description">
      //   - <meta property="og:title">
      //   - <meta property="og:description">
      //   - <meta property="og:url">
      //   - <meta property="og:image">
      //   - <meta property="og:image:width">
      //   - <meta property="og:image:height">
      //   - <meta name="twitter:card">
      //   - <meta name="twitter:title">
      //   - <meta name="twitter:description">
      //   - <meta name="twitter:image">
      //   - <link rel="canonical">
      //   - <link rel="alternate">
      const conflictPatterns = [
        /<title>[^<]*<\/title>/i,
        /<meta\s+name="description"[^>]*>/i,
        /<meta\s+property="og:title"[^>]*>/i,
        /<meta\s+property="og:description"[^>]*>/i,
        /<meta\s+property="og:url"[^>]*>/i,
        /<meta\s+property="og:image"[^>]*>/i,
        /<meta\s+property="og:image:width"[^>]*>/i,
        /<meta\s+property="og:image:height"[^>]*>/i,
        /<meta\s+name="twitter:card"[^>]*>/i,
        /<meta\s+name="twitter:title"[^>]*>/i,
        /<meta\s+name="twitter:description"[^>]*>/i,
        /<meta\s+name="twitter:image"[^>]*>/i,
        /<link\s+rel="canonical"[^>]*>/i,
      ]
      // Only strip from inside <head> ... </head>
      const headOpenIdx = newHtml.indexOf('<head>')
      const headCloseIdx = newHtml.indexOf('</head>')
      if (headOpenIdx !== -1 && headCloseIdx !== -1) {
        let headSection = newHtml.slice(headOpenIdx, headCloseIdx)
        for (const pat of conflictPatterns) {
          headSection = headSection.replace(pat, '')
        }
        newHtml = newHtml.slice(0, headOpenIdx) + headSection + newHtml.slice(headCloseIdx)
      }

      // 4. Inject the per-route head block right before </head>
      newHtml = newHtml.replace('</head>', `${headBlock}\n  </head>`)

      recordAuditEntry(route, newHtml)
      return newHtml
    },
    onFinished(dir) {
      const auditPath = `${dir}/.ssg-audit.json`
      try {
        mkdirSync(dirname(auditPath), { recursive: true })
        writeFileSync(auditPath, JSON.stringify(ssgAudit, null, 2))
        // eslint-disable-next-line no-console
        console.log(`[ssg] wrote audit for ${ssgAudit.length} routes -> ${auditPath}`)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[ssg] could not write audit file:', err?.message)
      }
    },
  },
})
