/*
 * scripts/link-check.mjs
 * --------------------------------------------------------------------------
 * Zero-dependency Node ESM link checker for currencyabout.com.
 *
 * SSRF guard:
 *   The CLI exposes a two-valued --target flag only. The host is hard-coded
 *   based on that flag and the URL set is derived solely from two local
 *   sources: public/sitemap.xml and a grep of src/ for internal Link/href
 *   references. Arbitrary URLs cannot be passed in. The two allowlisted
 *   base URLs are:
 *     - https://currencyabout.com
 *     - http://localhost:5173
 *
 * Inputs (both read from the repo, never from the command line):
 *   1. public/sitemap.xml — parsed via /<loc>([^<]+)<\/loc>/g.
 *   2. src/<recursive> — grepped for `<Link\s+[^>]*to="(\/[^"]+)"` and
 *      `href="https:\/\/currencyabout\.com(\/[^"]+)"`.
 *
 * Usage:
 *   node scripts/link-check.mjs --target prod
 *   node scripts/link-check.mjs --target local
 *   node scripts/link-check.mjs --target prod --out path/to/report.md
 *
 * Exit codes:
 *   0  — every URL returned 2xx (or a single 301/302 hop to a 2xx).
 *   1  — at least one URL returned non-2xx, or a redirect chain exceeded
 *        the 2-hop ceiling, or the CLI received an unrecognized flag.
 *
 * Redirect handling:
 *   fetch is invoked with `redirect: 'manual'` and the script follows
 *   Location headers up to a 2-hop ceiling. Anything beyond is flagged.
 *
 * No third-party imports; only `node:*` built-ins are used.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { resolve, join, relative } from 'node:path'
import { parseArgs } from 'node:util'
import process from 'node:process'

const PROJECT_ROOT = resolve(new URL('..', import.meta.url).pathname)
const SITEMAP_PATH = join(PROJECT_ROOT, 'public', 'sitemap.xml')
const SRC_PATH = join(PROJECT_ROOT, 'src')

const TARGETS = Object.freeze({
  prod: 'https://currencyabout.com',
  local: 'http://localhost:5173',
})

const MAX_REDIRECT_HOPS = 2

function printUsageAndExit(code = 1) {
  process.stderr.write([
    'Usage:',
    '  node scripts/link-check.mjs --target prod',
    '  node scripts/link-check.mjs --target local',
    '  node scripts/link-check.mjs --target prod --out path/to/report.md',
    '',
    'The --target flag is required and must be one of: prod, local.',
    'No other inputs are accepted (SSRF guard — see header).',
    '',
  ].join('\n'))
  process.exit(code)
}

let parsed
try {
  parsed = parseArgs({
    args: process.argv.slice(2),
    options: {
      target: { type: 'string' },
      out: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
    strict: true,
    allowPositionals: false,
  })
} catch (err) {
  process.stderr.write(`error: ${err.message}\n\n`)
  printUsageAndExit(1)
}

if (parsed.values.help) {
  printUsageAndExit(0)
}

const targetFlag = parsed.values.target
if (!targetFlag || !Object.hasOwn(TARGETS, targetFlag)) {
  process.stderr.write(`error: --target must be one of: prod, local (got: ${targetFlag ?? '<missing>'})\n\n`)
  printUsageAndExit(1)
}

const BASE_URL = TARGETS[targetFlag]
const OUT_PATH = parsed.values.out ? resolve(process.cwd(), parsed.values.out) : null

async function parseSitemap() {
  const xml = await readFile(SITEMAP_PATH, 'utf8')
  const urls = new Set()
  const re = /<loc>([^<]+)<\/loc>/g
  let match
  while ((match = re.exec(xml)) !== null) {
    urls.add(match[1].trim())
  }
  return urls
}

async function walkSrc(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkSrc(full, files)
    } else if (entry.isFile() && /\.(jsx?|tsx?|html|md)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function discoverInternalUrls() {
  const urls = new Set()
  const files = await walkSrc(SRC_PATH)
  const linkRe = /<Link\s+[^>]*to="(\/[^"]+)"/g
  const hrefRe = /href="https:\/\/currencyabout\.com(\/[^"]+)"/g
  for (const file of files) {
    const text = await readFile(file, 'utf8')
    let m
    while ((m = linkRe.exec(text)) !== null) urls.add(m[1])
    while ((m = hrefRe.exec(text)) !== null) urls.add(m[1])
    linkRe.lastIndex = 0
    hrefRe.lastIndex = 0
  }
  return urls
}

function toAbsolute(url) {
  if (/^https?:\/\//i.test(url)) {
    if (targetFlag === 'prod' && url.startsWith('https://currencyabout.com')) return url
    if (targetFlag === 'local') return BASE_URL + new URL(url).pathname + new URL(url).search
    return url
  }
  return BASE_URL + (url.startsWith('/') ? url : `/${url}`)
}

async function checkUrl(absoluteUrl) {
  const chain = []
  let current = absoluteUrl
  for (let hop = 0; hop <= MAX_REDIRECT_HOPS; hop++) {
    let res
    try {
      res = await fetch(current, { redirect: 'manual', method: 'GET' })
    } catch (err) {
      return { ok: false, hops: chain.length, finalStatus: 0, error: err.message, chain, finalUrl: current }
    }
    const status = res.status
    chain.push({ url: current, status })
    if (status >= 200 && status < 300) {
      return { ok: true, hops: chain.length - 1, finalStatus: status, chain, finalUrl: current }
    }
    if (status >= 300 && status < 400) {
      const loc = res.headers.get('location')
      if (!loc) return { ok: false, hops: chain.length - 1, finalStatus: status, error: 'redirect without Location', chain, finalUrl: current }
      current = new URL(loc, current).toString()
      continue
    }
    return { ok: false, hops: chain.length - 1, finalStatus: status, chain, finalUrl: current }
  }
  return { ok: false, hops: MAX_REDIRECT_HOPS, finalStatus: chain[chain.length - 1]?.status ?? 0, error: `exceeded ${MAX_REDIRECT_HOPS} redirect hops`, chain, finalUrl: current }
}

function formatChain(chain) {
  return chain.map(c => `${c.status} ${c.url}`).join(' → ')
}

function renderReport({ target, baseUrl, sitemapCount, internalCount, results }) {
  const failures = results.filter(r => !r.result.ok)
  const longChains = results.filter(r => r.result.ok && r.result.hops > 1)
  const ts = new Date().toISOString()

  const lines = []
  lines.push(`# Link check — ${target} target`)
  lines.push('')
  lines.push(`- Run at: ${ts}`)
  lines.push(`- Base URL: ${baseUrl}`)
  lines.push(`- URLs from sitemap.xml: ${sitemapCount}`)
  lines.push(`- URLs from src/ grep: ${internalCount}`)
  lines.push(`- Total unique URLs checked: ${results.length}`)
  lines.push('')

  lines.push('## Failures (non-2xx)')
  if (failures.length === 0) {
    lines.push('(none)')
  } else {
    for (const f of failures) {
      const chainStr = formatChain(f.result.chain)
      const err = f.result.error ? ` — ${f.result.error}` : ''
      lines.push(`- \`${f.url}\` — final status ${f.result.finalStatus}${err}`)
      lines.push(`  - Chain: ${chainStr}`)
    }
  }
  lines.push('')

  lines.push('## Redirect chains > 1 hop')
  if (longChains.length === 0) {
    lines.push('(none)')
  } else {
    for (const f of longChains) {
      lines.push(`- \`${f.url}\` — ${f.result.hops} hops`)
      lines.push(`  - Chain: ${formatChain(f.result.chain)}`)
    }
  }
  lines.push('')

  lines.push('## All URLs')
  lines.push('')
  lines.push('| URL | Final status | Hops |')
  lines.push('| --- | --- | --- |')
  for (const r of results) {
    lines.push(`| \`${r.url}\` | ${r.result.finalStatus} | ${r.result.hops} |`)
  }
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const sitemapUrls = await parseSitemap()
  const internalUrls = await discoverInternalUrls()

  const merged = new Set()
  for (const u of sitemapUrls) merged.add(toAbsolute(u))
  for (const u of internalUrls) merged.add(toAbsolute(u))

  const ordered = Array.from(merged).sort()
  const results = []
  for (const url of ordered) {
    const result = await checkUrl(url)
    results.push({ url, result })
  }

  const report = renderReport({
    target: targetFlag,
    baseUrl: BASE_URL,
    sitemapCount: sitemapUrls.size,
    internalCount: internalUrls.size,
    results,
  })

  if (OUT_PATH) {
    await writeFile(OUT_PATH, report, 'utf8')
    process.stdout.write(`wrote report to ${relative(process.cwd(), OUT_PATH)}\n`)
  } else {
    process.stdout.write(report)
    if (!report.endsWith('\n')) process.stdout.write('\n')
  }

  const failureCount = results.filter(r => !r.result.ok).length
  const longChainCount = results.filter(r => r.result.ok && r.result.hops > 1).length
  if (failureCount > 0 || longChainCount > 0) {
    process.stderr.write(`link-check failed: ${failureCount} non-2xx, ${longChainCount} chain > 1 hop\n`)
    process.exit(1)
  }
  process.exit(0)
}

main().catch(err => {
  process.stderr.write(`uncaught error: ${err.stack ?? err.message}\n`)
  process.exit(1)
})
