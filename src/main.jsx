// Application entry. This file is referenced by index.html
// (<script type="module" src="/src/main.jsx">) and by vite-react-ssg's
// ssgOptions.entry in vite.config.js, so the same file drives both:
//   1. Build-time SSG: vite-react-ssg imports `createRoot` to run
//      renderToString per route and emit dist/<route>/index.html.
//   2. Client-time hydration: the same `createRoot` runs in the browser
//      against the pre-rendered HTML.
//
// The actual data-router routes table and the ViteReactSSG bootstrap live
// in ./ssg-entry.jsx; this file re-exports `createRoot` so the plugin can
// find it via the documented named-export convention.

export { createRoot } from './ssg-entry.jsx'
