#!/usr/bin/env node
/**
 * Postinstall shim for vite-react-ssg + react-router-dom v7 compatibility.
 *
 * vite-react-ssg 0.9.0 dynamically `import('react-router-dom/server.js')`
 * from its own dist file to pull StaticRouterProvider / createStaticHandler
 * / createStaticRouter. In react-router-dom v6 those symbols lived at
 * the `./server.js` subpath; in v7 they were unified into the main entry
 * and the subpath was dropped from the package's exports map.
 *
 * The project pins react-router-dom ^7.13.2 (CLAUDE.md: validated system,
 * do not change). To make vite-react-ssg's dynamic import resolve, we add
 * a `./server.js` re-export to react-router-dom's exports map that points
 * at the main entry. All three symbols vite-react-ssg needs are already
 * exported from the main module in v7, so the re-export is a true alias.
 *
 * This script is idempotent: if the patch is already applied, it exits 0
 * without changes. Runs from `package.json#scripts.postinstall`.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const targetPath = resolve(projectRoot, 'node_modules/react-router-dom/package.json')

let pkg
try {
  pkg = JSON.parse(readFileSync(targetPath, 'utf8'))
} catch (err) {
  if (err?.code === 'ENOENT') {
    // node_modules not installed yet -- safe to skip; npm install will rerun
    // this script after dependencies are written.
    console.log('[patch-vite-react-ssg] react-router-dom not installed yet; skipping.')
    process.exit(0)
  }
  throw err
}

if (pkg?.exports?.['./server.js']) {
  console.log('[patch-vite-react-ssg] react-router-dom exports./server.js already present; nothing to do.')
  process.exit(0)
}

// Add ./server.js as a re-export of the main entry. The main entry already
// exposes StaticRouterProvider, createStaticHandler, and createStaticRouter
// in react-router-dom v7, so this is a true alias, not a shim.
pkg.exports = pkg.exports || {}
pkg.exports['./server.js'] = pkg.exports['.']
pkg.exports['./server'] = pkg.exports['.']

writeFileSync(targetPath, JSON.stringify(pkg, null, 2) + '\n')
console.log('[patch-vite-react-ssg] added ./server.js + ./server re-exports to react-router-dom exports map.')
