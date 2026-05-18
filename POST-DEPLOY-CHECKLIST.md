# POST-DEPLOY CHECKLIST

What to do after this branch lands in production. Steps are ordered roughly
by when you need to act on them.

---

## 1. Immediately after deploy

- [ ] Open the live site and confirm every page renders without error.
- [ ] Submit the updated `sitemap.xml` in **Google Search Console** under
      *Sitemaps* (https://search.google.com/search-console). The URL is
      `https://currencyabout.com/sitemap.xml`.
- [ ] Inspect 2 or 3 of the new guide URLs with **URL Inspection** in
      Search Console and click *Request Indexing*. This nudges Googlebot
      without waiting for the next crawl. Recommended URLs to inspect first:
  - `https://currencyabout.com/guides/currency-strength-explained`
  - `https://currencyabout.com/guides/floating-vs-fixed-exchange-rates`
  - `https://currencyabout.com/guides/how-central-banks-intervene`

## 2. First 72 hours

- [ ] Check the **Coverage / Pages** report in Search Console daily. You
      are looking for the new URLs to move from *Discovered* to *Crawled*
      to *Indexed*. The first crawl typically happens within 24–48 hours
      when sitemap submission is fresh.
- [ ] Watch for any **crawl errors** flagged on the new URLs. The most
      likely error class is 4xx/5xx from the data-fetching layer or
      hreflang mismatches — neither should occur because nothing in this
      branch touches those layers, but it is worth verifying.
- [ ] Confirm **AdSense placeholders are dormant**. Without consent, no
      `<AdSlot />` should render and no `pagead2.googlesyndication.com`
      script should be present in the document. Quick check from DevTools
      console: `document.querySelectorAll('script[data-adsense-loader]').length`
      should be `0` before accepting cookies and `1` after.

## 3. First two weeks

- [ ] In Search Console *Pages* report, wait for ≥80% of the 9 new guide
      slugs to show as *Indexed*. Targets:
  - `currency-strength-explained`
  - `floating-vs-fixed-exchange-rates`
  - `top-factors-that-move-currency-markets`
  - `currency-conversion-fees-compared`
  - `bid-ask-spread-in-forex`
  - `how-central-banks-intervene`
  - `hedge-basics-individuals-small-business`
  - `spot-vs-forward-vs-swap`
  - `currency-volatility-explained`
- [ ] Verify **no canonical conflicts**. Each guide URL should self-canonical
      (the `<SeoHead>` component handles this automatically; spot-check 2 or
      3 in DevTools).
- [ ] Verify **structured data** on the new pages with Google's
      [Rich Results Test](https://search.google.com/test/rich-results).
      Expected: `Article` schema on each new guide; `BreadcrumbList` on
      every pair, guide, and legal page; `FAQPage` on the home and pair
      pages; `ExchangeRateSpecification` on indexable pair pages.

## 4. When to reapply to AdSense

- **Do not reapply before week 2.** AdSense reviewers check the indexed
  surface of the site, not the deployed surface. If they crawl while most
  of the new content is still in *Discovered* state, the reviewer will see
  the same 7-guide site they last rejected.
- **Target: ≥80% of new guides indexed.** Once Search Console shows 7 of
  the 9 new guides as indexed, plus the previously missing
  `how-exchange-rates-are-determined` (added to the sitemap in this
  branch), you are ready to resubmit.
- **Reapply via AdSense console** at https://adsense.google.com under
  *Sites → currencyabout.com → Request Review*.
- **Before clicking Request Review**, walk through the site as an
  uncloaked visitor once more. Open an incognito window, accept cookies
  on the banner, and confirm that ads start loading on the home, guide,
  and pair pages. The placeholder slot ids in
  `src/constants/adsense.js` will not render real ads but will fire the
  AdSense script — that is enough for the reviewer to confirm placement.
  After approval, replace the placeholder ids with the real ones.

## 5. Replacing placeholder slot ids (after approval)

The current `AD_SLOTS` constants are placeholders:

```js
// src/constants/adsense.js
export const AD_SLOTS = {
  homeEditorial: '0000000001',
  guideMid:      '0000000002',
  guideEnd:      '0000000003',
  pairBelowConversion: '0000000004',
  pairEnd:       '0000000005',
}
```

After approval, create 5 ad units in the AdSense console (one per slot
position above) and replace each placeholder string with the real slot id
returned by AdSense. No code changes are needed beyond updating those
constants. Deploy, then re-test in incognito to confirm real ad creatives
appear.

## 6. Things that are already done, no action required

- [x] `ads.txt` — already contains the real publisher line
      (`pub-3917556333305409`). No change needed before or after approval.
- [x] Static AdSense script removed from `index.html` — replaced by the
      consent-gated `useAdSenseLoader` hook in `Layout`. Do **not** re-add
      a static `<script>` tag for `adsbygoogle.js`. The comment block at
      the old location in `index.html` documents this explicitly.
- [x] Cookie consent banner — already in place, dispatches
      `cookie-consent-changed` events that `useAdSenseLoader` and
      `<AdSlot />` listen to.
- [x] `RateDisclaimer` — mounted on home, pair, and exchange-rates-today
      pages with copy that mirrors `MethodologyPage` (provider name,
      refresh cadence, not-financial-advice clause).
- [x] Custom 404 with `noindex` meta — implemented via the catch-all route
      and `<NotFoundPage>`. Note: Cloudflare's static-assets configuration
      currently returns HTTP 200 for unknown URLs because of
      `not_found_handling: "single-page-application"`. The `noindex` meta
      prevents indexing of these URLs, which is sufficient signal for
      Googlebot. If you want true HTTP 404 status later, the cleanest
      path is a Cloudflare Worker entrypoint that 404s on routes that do
      not match any known pattern — flagged but intentionally deferred.

## 7. Monitoring after approval

- [ ] Watch **AdSense Policy Center** for any new policy alerts in the
      first 30 days. Finance is a sensitive vertical, and reviewers
      sometimes flag pages that passed the initial review.
- [ ] Track **CTR and viewability** by ad unit in the AdSense reports.
      If any of the 5 placements consistently delivers a poor user
      experience (CTR under 0.2%, viewability under 50%), reconsider the
      position rather than the unit format.
- [ ] Re-check the **Coverage report** monthly for crawl errors,
      especially on pair pages where the dynamic `:pair` route can
      occasionally pick up junk URLs from inbound links.

## 8. Open items for future work (out of scope for this branch)

- Cloudflare Worker for real HTTP 404 status on unknown routes.
- ESLint configuration (deliberately skipped this pass).
- Sitemap auto-generation from `guides.js` + `App.jsx` route map (manual
  for now; trivial to add if guide volume continues to grow).
- Portuguese-language route tree (`/pt`) and the IOF/PTAX/Plano Real
  topics from the original brief — out of scope for this round per the
  i18n architecture decision documented in `SeoHead.jsx`.
