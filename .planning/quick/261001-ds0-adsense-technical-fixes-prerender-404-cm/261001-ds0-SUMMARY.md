---
quick_id: 261001-ds0
status: complete
date: 2026-10-01
commits: [450e125, abcda35, 1909eaa, 1d0a1b3, 0a43989]
---

# Summary: AdSense technical fixes

Live currencyabout.com still serves the pre-SSG SPA (main is ahead of origin;
phase 03.1 SSG never deployed). All fixes below are local and verified with
`npm run build`, `wrangler dev` and headless Chrome via CDP. Nothing deployed.

## Done
| Commit | Change |
|---|---|
| 450e125 | `google-adsense-account` meta in index.html (all prerendered pages) |
| abcda35 | SSG `dirStyle: flat`; canonical URLs were 307-redirecting to trailing-slash variants |
| 1909eaa | **Pre-existing 03.1 bug:** hydration appended a second full copy of the app (vite-react-ssg 0.9 + react-router 7 empty loaderData). Fixed with no-op loaders per route. Plus pre-paint theme script |
| 1d0a1b3 | **Pre-existing 03.1 bug:** prerendered pair pages said `1 USD = 0.0000 EUR (as of null)` in meta, body, FAQ JSON-LD and ExchangeRateSpecification. Rate-free variants until live rate loads |
| 0a43989 | Real HTTP 404: all 420 pair URLs + /404 prerendered, `not_found_handling: 404-page`; single robots meta per page |

## Verification
- Build passes; 446 routes; 0 occurrences of `0.0000` / `as of null` in dist.
- Status: canonical URLs 200, trailing-slash -> 307 to canonical, unknown -> 404.
- Sitemap (62 URLs) == indexable prerendered pages; new pair pages are noindex.
- Browser (light/en, i.e. Googlebot profile): 14 routes hydrate with zero errors, one header/footer, live rates load; SPA link navigation works.
- Dark mode / non-en visitors: recoverable React #418 on theme toggle / i18n text; React regenerates, single copy.
- Consent: reject -> no AdSense script; accept -> script + slots; AdSlot still absent on legal routes.
- `wrangler deploy --dry-run`: 926 files OK.

## Not done (needs owner / AdSense console)
- Deploy (push / `npm run deploy`).
- Google-certified CMP (Privacy & messaging) - changes the consent architecture; do after approval.
- Real ad unit ids for AD_SLOTS; Auto ads page exclusions for legal routes (Google's script injects its own `ins` there).
- 40 major-cross pairs are indexable (isIndexablePair) but not in the sitemap: pre-existing, left as is.
