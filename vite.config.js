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

export default defineConfig({
  plugins: [react(), cloudflare()],
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
    dirStyle: 'nested',
    mock: true,
    formatting: 'none',
    includedRoutes: async () => {
      const routes = await buildIncludedRoutes()
      return routes
    },
    onPageRendered(route, html) {
      // Record per-route metadata for the audit doc. Extract <title> and
      // a fingerprint to confirm route-specific content was baked in.
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
      return html
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
