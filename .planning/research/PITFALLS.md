# Pitfalls Research

**Domain:** Free currency-converter / finance-utility tool preparing for / under active Google AdSense review
**Project:** currencyabout.com (React 19 + Vite SPA, i18n 7 languages)
**Researched:** 2026-05-19
**Confidence:** HIGH on AdSense policy issues (Google Help + multiple 2026 industry sources); MEDIUM on reviewer behavior heuristics (inferred from publisher post-mortems, not Google-confirmed)

## Context constraints

- Site is **inside an active AdSense review window** (commit 5f46310 on 2026-05-18, <7 days ago). Substantive changes during review carry asymmetric risk: reviewers may re-snapshot mid-edit and see incomplete state.
- This is a **single-purpose utility (converter) in the YMYL "finance" bucket** — the worst combination for AdSense: both the niche most-skeptically reviewed AND the format most-skeptically reviewed.
- Polish-only visual direction. 1-2 week part-time sprint.
- Existing assets: 9 guides, `RateDisclaimer`, consent-gated AdSense loader (commit `d380c89`), cookie banner, dark mode, legal pages, continent grouping.

## Critical Pitfalls

### Pitfall 1: "Tool-only / thin utility" rejection — currency converter is a textbook trigger

**What goes wrong:**
Reviewers (and the pre-screen algorithm) treat single-input/single-output converter pages as "UI only" and flag the entire site as low-value, even when 20+ guides exist elsewhere. The 9-guide library does not automatically inoculate the `/usd-to-eur` style pages — reviewers sample tool pages directly, and each pair page must independently demonstrate editorial value.

**Why it happens:**
The currency-converter category is saturated with scraped/duplicated tools ("same calculator, different domain"). Google's pre-screen is trained to recognize that template. Pair pages on currencyabout.com that render `{base} to {quote}` with a generic paragraph + chart + rate table look identical to thousands of rejected sites.

**How to avoid:**
- Each indexable pair page must carry unique editorial: a 150-300 word pair-specific paragraph that includes named real-world use cases (remittance corridors, tourism flow, named central banks involved), historical context, and named events that moved the pair. Do not template the same paragraph across pairs.
- Aggressively `noindex` long-tail / exotic pairs that cannot yet carry unique editorial (commit `7e45b0a` already started this — verify it covers ALL thin pairs, not just a sample).
- Add at least one piece of proof-of-uniqueness per pair: a worked example with numbers, an annotated rate-history micro-note, or a "why this pair matters" bullet list.

**Warning signs:**
- The same intro paragraph appears on >5 pair pages with only the currency code swapped.
- A pair page rendered with JS disabled shows only headers, chart placeholder, and footer — no editorial body.
- `view-source:` on a pair URL shows no unique copy in the first 50 lines of body content.

**Phase to address:** **E-E-A-T phase** (pair-page editorial pass) + audit existing `noindex` coverage on thin pairs.

**Sources:**
- [AdSense for Tool & Utility Websites: How to Get Approved in 2026](https://adsenseaudit.net/adSense-tool-websites)
- [Google AdSense Help — Your AdSense account wasn't approved](https://support.google.com/adsense/answer/81904?hl=en)
- [Low Value Content AdSense](https://adsenseaudit.net/guides/low-value-content-adsense)

---

### Pitfall 2: Substantive structural changes during the active review window

**What goes wrong:**
Reviewers (manual and automated) may sample the site one or more times during the 3-14 day window. If sampling catches a half-shipped redesign — broken nav links to not-yet-deployed pages, new pages with placeholder copy, removed legal pages — the application is rejected as "site under construction" or "site behavior: navigation" even though all the parts work individually.

**Why it happens:**
Single-page-app deploys are atomic per-bundle but a sprint that adds glossary, favorites, and new guide pages typically ships in multiple commits. Each intermediate state is publicly crawlable. Google explicitly tells publishers not to remove the site or change code while status is "Getting Ready."

**How to avoid:**
- **Freeze rule for the next 7 days:** no removals of existing pages, no rename of existing routes, no relocation of legal/contact/about pages, no changes to the canonical URL of any indexable page.
- Net-new pages (new guides, glossary page, favorites view) are LOWER risk than changes to existing pages — but every new page must launch with full content, internal links in, and out, on the same deploy. Never ship a nav link to a page that returns 404 or a `Coming soon` stub.
- For unfinished features (e.g., favorites): gate behind a feature flag that defaults OFF in production until the feature is whole. Do not ship a partially functional UI button.
- Hold all `robots.txt` and sitemap.xml mutations until after the verdict (or, if a sitemap entry must be added for a new guide, add it only after the guide is live + internally linked).

**Warning signs:**
- A new commit lands a nav link to `/glossary` while the route still resolves to `NotFoundPage.jsx`.
- `git diff --stat` for a single commit shows changes across nav, routing, and content — staged together rather than as additive new pages.
- Search Console "Crawled - currently not indexed" count rises during the sprint (means crawler hit incomplete pages).

**Phase to address:** **Sprint plan / sequencing decisions** — every phase must enforce additive-only, full-launch-or-nothing semantics during the review window.

**Sources:**
- [AdSense Not Approved 2026 — Hike Web Solutions](https://hikewebsolutions.com/details/adsense-not-approved-2026-fix-rejected)
- [AdSense Rejected: "Site Not Ready" — Yerman](https://yerman.uk/adsense-site-not-ready/)
- [Google AdSense Help — Your AdSense account wasn't approved](https://support.google.com/adsense/answer/81904?hl=en)

---

### Pitfall 3: SPA crawler-blindness — React renders to a blank `<div id="root">` for the reviewer

**What goes wrong:**
The site is a React 19 + Vite SPA. If guide and pair-page content is rendered client-side only (no SSR, no SSG, no prerender), Googlebot and the AdSense pre-screen crawler may receive an empty HTML shell. Even though Googlebot can execute JS, the AdSense reviewer pipeline has historically been more conservative about JS execution than Search. A "no visible text" response triggers low-value / under-construction rejection.

**Why it happens:**
Vite's default `npm run build` produces a `dist/index.html` with one `<div id="root">` and JS bundles. No prerender unless explicitly configured. Developers verify in a real browser (JS enabled), not in a `curl` request — so the bug is invisible.

**How to avoid:**
- Run `curl -s https://currencyabout.com/usd-to-eur | grep -i 'european\|dollar\|euro'` (or the equivalent for any indexable page). If the body has no editorial text, you have a crawler-blind site.
- Add prerendering (`vite-plugin-prerender`, `@prerenderer/rollup-plugin`, or migrate the indexable routes to static generation). Hash routes (`#/...`) are even worse — verify none are used for content.
- Ensure `<meta name="description">`, `<title>`, canonical, hreflang are populated in the rendered HTML, not injected only by client-side `react-helmet` updates.
- Verify with Google's Rich Results Test and Mobile-Friendly Test — these execute JS the way Googlebot does and will show what the crawler actually sees.

**Warning signs:**
- `curl` of any indexable URL returns the same HTML body regardless of URL.
- Search Console "URL Inspection" → "Rendered HTML" shows empty body.
- Site only ranks for the homepage despite 9 guides being live.

**Phase to address:** **Performance / SEO infrastructure phase** (highest priority — this would invalidate every other improvement).

**Sources:**
- [Why Google AdSense Rejects Your Application — Medium (Feb 2026)](https://medium.com/write-a-catalyst/why-google-adsense-rejects-your-application-and-how-to-fix-the-thin-content-problem-76504ce5cf7e)
- [AdSense Approval Failure Debugging — McGarrah](https://www.mcgarrah.org/adsense-approval-failure-remediation/)

---

### Pitfall 4: Lazy-loading the AdSense `pub-` loader script itself (not the ad units)

**What goes wrong:**
To improve Lighthouse / Core Web Vitals scores during the sprint, a well-meaning optimization defers `adsbygoogle.js` until user interaction or until below-fold scroll. AdSense reviewers and the pre-screen verifier visit the site and see no AdSense script at all — they cannot verify that ads will load correctly, and they may treat the site as either not-yet-implementing AdSense or as actively hiding ads from review.

**Why it happens:**
Two distinct things are conflated: (a) lazy-loading the AdSense library (forbidden in spirit during review and a known policy gray area in production), versus (b) lazy-loading individual ad slots below the fold (which Google explicitly supports via `data-loading-strategy="lazy"` on `ins` tags). Developers chasing CWV scores often defer (a) when they should only touch (b).

**How to avoid:**
- Keep the AdSense loader script (`adsbygoogle.js`) tagged with `async` (not `defer`, not user-gesture-gated, not IntersectionObserver-gated) in the document head/body.
- The consent-gated loader in commit `d380c89` is acceptable AS LONG AS the consent banner defaults to a meaningful, fast user choice — do not require scroll-then-click to trigger script load.
- For individual ad slots, use AdSense-supported lazy-loading (`data-loading-strategy="lazy"`), not custom IntersectionObserver code that mutates `adsbygoogle.push`.
- Re-confirm the consent banner does not block crawlers: serve a non-blocking variant when User-Agent matches Googlebot/AdsBot, OR ensure the page's editorial content is unconditionally rendered behind/around the banner.

**Warning signs:**
- Network panel on a fresh page load shows no `adsbygoogle.js` request until user scrolls or clicks.
- Lighthouse "Total Blocking Time" improved by >500ms in a single commit that touched the AdSense loader.
- Cookie banner intercepts pointer events on the entire viewport (page content non-interactive until dismissed).

**Phase to address:** **Performance / UX polish phase** (review every CWV optimization commit for this regression).

**Sources:**
- [Lazy loading of ads — policy violation? (WebmasterWorld)](https://www.webmasterworld.com/google_adsense/4660012.htm)
- [Lazily load ads below the fold — Google Publisher Ads Audits](https://developers.google.com/publisher-ads-audits/reference/audits/ads-in-viewport)
- [Fix policy issues that affect ad serving — AdSense Help](https://support.google.com/adsense/answer/7003627?hl=en-GB)

---

### Pitfall 5: Glossary popover introduces CLS, focus-trap bugs, or covers content

**What goes wrong:**
A planned glossary-term popover (`<abbr>`-style or click-to-define) is added inline within editorial copy. When triggered it shifts surrounding paragraphs (CLS), obscures the converter results, or fails WCAG 1.4.13 (Content on Hover or Focus). At minimum, this hurts the Site Behavior signal; at worst, the popover overlapping the converter form during the reviewer's session reads as a "deceptive ad placement / interaction blocker."

**Why it happens:**
Popovers are typically built absolutely-positioned but if the trigger reflows (line wrap, mobile rotation) the popover lands over the primary CTA. Developers don't test with keyboard-only or screen reader. CLS regressions don't show up in local dev because content above the fold is stable on desktop.

**How to avoid:**
- Use the native `popover` API (`popover="auto"` attribute) or a vetted library (Floating UI, Radix Popover) — both manage z-index, dismissal, focus, ESC key, and viewport overflow correctly.
- Verify three WCAG 1.4.13 requirements explicitly: **dismissible** (ESC closes, click-outside closes), **hoverable** (cursor can enter popover without dismiss), **persistent** (stays open until user dismisses or moves focus away).
- Reserve space with `contain: layout` and a stable anchor; never expand the parent on open.
- Test specifically: open popover over the converter's "Convert" button on mobile 375px width — the popover must NOT overlap the primary CTA.
- aria-describedby on the trigger, role="tooltip" only on actual tooltips (not on click-popovers — those want role="dialog" with proper labelling).

**Warning signs:**
- Opening a glossary term scrolls the page or pushes the converter down.
- Lighthouse CLS rises above 0.1 on guide pages after the glossary ships.
- Tabbing to a glossary term and pressing Enter does nothing, or opens a popover that cannot be closed without a mouse.

**Phase to address:** **Glossary phase** + UX/accessibility polish phase.

**Sources:**
- [WCAG 1.4.13: Content on Hover or Focus](https://www.wcag.com/authors/1-4-13-content-on-hover-or-focus/)
- [Accessible Tooltips Example 2026 — TheWCAG](https://www.thewcag.com/examples/tooltips)
- [Cumulative Layout Shift (CLS) and Ads — Advanced Ads](https://wpadvancedads.com/cumulative-layout-shift-cls-and-ads/)

---

### Pitfall 6: "Favorites" UX accidentally mimicking ad placement or breaking navigation contract

**What goes wrong:**
A favorites feature (star a pair → show in sidebar or homepage strip) creates a user-curated list of links. If styled as cards similar to ad slots, or placed adjacent to ads with similar visual treatment, AdSense policy on "ads must be clearly distinguishable from site content" can trigger — AdSense explicitly prohibits labeling ads as "Favorite Sites" or similar user-content terms. Even if no actual mislabeling occurs, visual confusion between favorites and ad units is a known violation pattern.

Additionally, favorites stored in `localStorage` can yield an empty state that looks like a broken page on a fresh reviewer visit ("My favorites" page with zero content).

**Why it happens:**
Designers reuse the same card component for favorites and ad placeholders. Empty states are an afterthought. The feature relies entirely on client-side state, so the reviewer's first visit (no localStorage entries) shows an empty container.

**How to avoid:**
- Visually separate favorites from ads: different border/background, explicit "Your saved pairs" header, no card sizes matching the standard AdSense 300x250 or 336x280.
- Never use the words "Recommended," "Featured," "Sponsored," "Top picks," or other ambiguous labels on user-saved content. Use unambiguous labels like "Saved by you" or "Your pinned pairs."
- Empty state must be informative and content-rich: a paragraph explaining what favorites do + a CTA + visible suggested pairs (with editorial blurb, not a generic grid). Reviewers must never see a blank box.
- If favorites lives at a route like `/favorites`, ensure that route is `noindex` (it's user-personalized; not editorial).
- Use `aria-label="Save USD to EUR to favorites"` on the star button — not just an unlabeled icon.

**Warning signs:**
- A reviewer with cleared cookies sees an empty `/favorites` page or empty sidebar slot.
- Star button has no accessible name (screen reader announces "button").
- The favorites card and an ad unit are within 50px of each other with similar visual weight.

**Phase to address:** **Favorites phase** — empty-state design must be done up-front.

**Sources:**
- [AdSense Program Policies — ad placement labels](https://support.google.com/adsense/answer/48182?hl=en)
- [Fix policy issues that affect ad serving — AdSense Help](https://support.google.com/adsense/answer/7003627?hl=en-GB)

---

### Pitfall 7: Missing or weak E-E-A-T signals on a YMYL finance site

**What goes wrong:**
Reviewers cite "low value content" not because the words on the page are wrong, but because the site cannot answer "who is responsible for this information?" In 2026 finance/YMYL reviews, lacking a real author identity, methodology page, or named rate-source citation is the single most cited cause of rejection that publishers report after their first denial.

**Why it happens:**
Indie developer projects default to anonymous or generic "the team" attribution. Currency utility sites assume "we just show rates from an API, we don't need expertise" — but reviewers don't share that assumption.

**How to avoid:**
- Named author byline on every guide AND on the homepage (real name, real photo, link to a real LinkedIn or personal site). One named maintainer is enough; it does not need to be a CFA.
- Dedicated `/about` page covering: who runs the site, when it started, why, what the editorial standards are. Include a real photo.
- A dedicated `/methodology` (or "How we source rates") page naming the upstream API (e.g., "Rates from Open Exchange Rates / ECB / etc., refreshed every X minutes, mid-market rates"), the refresh cadence, and the explicit statement that rates are indicative and not transactional.
- A real `/contact` page with a working form OR a real email address (mailto), not a generic web form behind reCAPTCHA only.
- Cite the rate source on every page that displays a rate (the existing `RateDisclaimer` is the right pattern — verify it's actually on every pair page, every guide page, and the homepage).
- Add a "Last updated" timestamp on guide articles (visible in HTML, not just in metadata).

**Warning signs:**
- `/about` page has no real name, no photo, no founding date.
- No methodology page exists, or it's a generic stub.
- Guides have no byline.
- Search "site:currencyabout.com" for the rate-provider name; if zero results, you don't cite the source anywhere.

**Phase to address:** **E-E-A-T phase** (highest-priority pre-review phase).

**Sources:**
- [Google AdSense Approval Guide — Monetization Guy](https://monetizationguy.com/articles/google-adsense-approval-guide-requirements-process-and-avoiding-rejections)
- [Best & Worst Niches for AdSense Approval 2026 — AdSense Audit](https://adsenseaudit.net/guides/adsense-niche-guide)
- [2026 Blog Monetization E-E-A-T Strategy](https://acknowledgementtemplates.com/2026-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%88%98%EC%9D%B5%ED%99%94-checklist/)

---

### Pitfall 8: Above-the-fold ad density on mobile (Better Ads Standards: "Density > 30%")

**What goes wrong:**
The converter is the primary above-the-fold feature on mobile. If a top-of-page ad slot (banner above the converter, or a 300x250 wedged between converter input and result) renders before/with the converter, the ad-to-content ratio in the first viewport exceeds the Coalition for Better Ads 30% threshold. Google ad density enforcement now silently serves blank ad slots on offending pages (no warning) and during review treats this as a "site behavior" violation.

**Why it happens:**
A common monetization pattern is to "frame" the converter with an ad above and a sidebar/below ad. On 375px mobile, the above-converter ad alone consumes 250px of a 667px viewport = 37%.

**How to avoid:**
- Hard rule: zero ads in the first viewport on mobile. Ads start after the converter result block.
- Verify with a screenshot at 375x667 (iPhone SE/12 mini baseline). Measure ad pixel height ÷ viewport height; must be < 30%, ideally 0%.
- Reserve a fixed `min-height` on every ad container so the ad does not push content (CLS protection). Use AdSense's responsive `data-ad-format="auto"` with explicit height containment.
- No sticky/anchor mobile ads during the review window. Once approved, the AdSense bottom-anchor format is the only sticky type guaranteed compliant (it's <300px wide, dismissible, doesn't overlap content) — but adding it during review introduces risk.

**Warning signs:**
- A screenshot of the homepage on a 375px-wide viewport shows any ad visible without scrolling.
- The first ad slot appears in the HTML before the `<main>` element or before the converter form.
- CLS spikes on mobile guide pages where ads load.

**Phase to address:** **Performance / UX polish phase** — audit ad placements with a phone emulator BEFORE the review verdict arrives.

**Sources:**
- [The Initial Better Ads Standards — Coalition for Better Ads](https://www.betterads.org/standards/)
- [AdSense Revenue Dropping in 2026? 17 Real Reasons — WeForAds](https://weforads.com/blog/adsense-revenue-dropping-2026/)
- [5 MOST Common AdSense Violations On Mobile — MonetizeMore](https://www.monetizemore.com/blog/common-adsense-violations-on-mobile/)
- [Google AdSense Now Allows 300x250 Above the Fold on Mobile — AdPushup](https://www.adpushup.com/blog/google-adsense-now-allows-300x250-ads-above-the-fold-on-mobile-web/)

---

### Pitfall 9: Navigation rot — orphaned routes, broken links, or noindex chains

**What goes wrong:**
"Site Behavior: Navigation" is one of the most-cited AdSense rejection signals. It triggers when reviewers click into the site and hit 404s, infinite redirects, dead nav links, or pages that exist but aren't linked from anywhere. The `NotFoundPage.jsx` recently added (untracked file per git status) is a warning sign — it implies that some routes ARE 404'ing in production.

**Why it happens:**
Mid-sprint, the dev adds a route component but forgets to add it to the nav. Or removes a page but a footer link still points to it. Or i18n routes (the project has 7 languages) get added/removed asymmetrically. With 7 language locales, a single broken English route can mean 7 broken pages from Google's perspective.

**How to avoid:**
- Run a link-checker against the production deploy before each commit lands (`linkinator`, `lychee`, or `wget --spider -r`). Zero 404s. Zero redirect chains > 1 hop.
- Every route in the React Router config must be reachable from the global nav OR from at least 2 internal links from indexable pages. No orphans.
- Every `noindex` decision (from commit `7e45b0a`) must be paired with the page being either fully removed from internal links OR clearly demoted (footer-only link). Don't put `noindex` on a page that the main nav points to.
- Verify the `NotFoundPage.jsx` returns HTTP 404 (not 200 with a "not found" body). For SPAs deployed on Vercel/Netlify/etc., this requires explicit hosting config — by default SPAs serve 200 for everything.
- Verify hreflang correctness: every i18n alternate must resolve to a 200 with real content. Broken hreflang counts as broken navigation.

**Warning signs:**
- `wget --spider -r https://currencyabout.com` reports any 404 or 500.
- The new `NotFoundPage.jsx` is reached when clicking a nav link.
- Search Console shows "Soft 404" entries.
- Hreflang reciprocity check tool flags missing return links.

**Phase to address:** **UX polish phase** + every sprint phase must include "verify no orphans / no 404s" in its definition-of-done.

**Sources:**
- [How to Solve AdSense Policy Violation Site Behavior: Navigation — SofanMax](https://sofanmax.blogspot.com/2020/08/solving-adsense-site-behavior-navigation.html)
- [Site Behaviour: Navigation how to fix it? — AdSense Community](https://support.google.com/adsense/thread/226666062/site-behaviour-navigation-how-to-fix-it?hl=en)
- [Google AdSense Help — Your AdSense account wasn't approved](https://support.google.com/adsense/answer/81904?hl=en)

---

### Pitfall 10: Cookie consent banner blocks the crawler or hides editorial content

**What goes wrong:**
The consent banner added in commit `d380c89` (paused AdSense during re-review) intercepts page interactions or visually obscures the converter and below-fold copy. If the reviewer's emulated session can't see the editorial content because of an overlay, it reads as "site under construction" or "site behavior: deceptive."

**Why it happens:**
Privacy-first banner libraries default to a center-modal or full-bottom-bar that overlaps content. For SEO/AdSense purposes, the banner needs to be non-blocking visually (content remains readable around it) AND must not block the crawler (Googlebot should see the same editorial DOM as a consenting user).

**How to avoid:**
- The banner should be a small bottom corner notice that does NOT visually obscure content above ~80% of viewport height, and never overlaps the converter on mobile.
- Editorial body content must be in the DOM regardless of consent state (consent only gates the AdSense loader, NOT the article body).
- Do not server-side detect Googlebot and bypass the banner — this is cloaking. Instead: render the page identically for everyone, with the banner non-blocking.
- Confirm Lighthouse / PageSpeed Insights can scroll the page and see body content without dismissing the banner programmatically.

**Warning signs:**
- Lighthouse "Accessibility" or "Best Practices" flags an overlay over interactive content.
- The banner has no close button on mobile, or the close button is below the visible area.
- "Reject all" requires more clicks than "Accept all" (this is itself a dark pattern under GDPR/EU AI Act and increasingly under scrutiny).

**Phase to address:** **UX polish phase** — verify the banner does not regress the reviewer's perception of the site.

**Sources:**
- [AdSense Program Policies — Better Ads Standards compliance](https://support.google.com/adsense/answer/48182?hl=en)
- [Fix issues with the ad experience on your site — AdSense Help](https://support.google.com/adsense/answer/7514132?hl=en-GB)

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Templated pair-page copy ("$X is the rate from $A to $B") | Ship 100+ pages in a day | Triggers "scaled content" / "thin pages" rejection — most likely single cause of denial for converter sites | **Never during AdSense review.** OK only if those pages are `noindex` AND not linked from indexable pages. |
| Client-side-only rendering of guide content | Simpler build pipeline | Crawler-blind to reviewer = treated as empty site | Never for indexable content. Acceptable for personalized/UI-state pages (favorites). |
| Defer AdSense loader script for CWV score | +5-15 Lighthouse points | Reviewer sees no AdSense integration; potential policy violation | Never. Use `async` and lazy-load *slots*, not the *loader*. |
| Cookie banner library defaults (center modal, full bar) | One-line install | Looks like a blocker / dark pattern to AdSense reviewer | Acceptable temporarily only with a small bottom-corner variant configured. |
| Unified card component for ads + favorites + featured pairs | DRY UI | Visual ambiguity = AdSense "deceptive placement" risk | Never. Ads must be visually distinct from all content cards. |
| Static glossary terms (plain `<dl>`, no popovers) | Zero CLS / a11y risk | Slightly lower UX polish | **Recommended for this sprint** — defer popovers until post-approval. |
| Adding new guides via CMS-style content file edits | Fast authoring | If file changes ship without internal nav links, creates orphans | Acceptable IF every new content file ships with router entry + nav/footer link + sitemap entry in the same commit. |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| AdSense `adsbygoogle.js` loader | Lazy-load via IntersectionObserver or user gesture | `async` script tag, present on every page from initial HTML |
| AdSense ad slots | Hand-rolled IntersectionObserver lazy-loading | Use AdSense's `data-loading-strategy="lazy"` attribute, supported officially |
| Cookie consent (TCF/IAB) | Block AdSense entirely until consent, but block content too | Block only AdSense loader on no-consent; render editorial content always |
| Rate API (Open Exchange Rates / ECB / etc.) | Show raw API output without naming the source | Cite source on every page; named methodology page; refresh-cadence disclosure |
| Sitemap | Auto-generate from all routes including `noindex` thin pairs | Exclude `noindex` pages from sitemap; align signals |
| hreflang for 7 locales | Asymmetric coverage (some pages have 7 alternates, some 3) | Either full 7-language coverage or no hreflang block — never partial |
| React Router + static hosting | SPA serves 200 for every URL including misspelled paths | Configure host to serve 404 for unrouted paths; or prerender with proper 404 |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Auto Ads enabled before approval | Ads appear in random spots during review, including above-fold | Use manual ad slots only during the approval window | Day 1 of review — silent rejection |
| Ad container with no reserved height | CLS spikes when ads load | `min-height` matching expected ad size on the container | Visible on every page load with ads |
| Hydration mismatch on i18n routes | Page flashes English then localizes | Render correct locale server-side or in initial HTML | When crawler hits a non-English locale URL |
| Image-heavy hero with no `loading="lazy"` and no width/height | LCP > 4s; CLS > 0.1 | Explicit dimensions, lazy below-fold, preload LCP image | Mobile 4G throttled (which is what AdSense pre-screen approximates) |
| Recharts / chart library loaded synchronously on every page | TBT > 600ms | Dynamic import (`React.lazy`) for chart components, only load on guide pages | Visible on Lighthouse mobile audits |
| Glossary popover content fetched on hover | First popover open delays 500ms+ | Bundle glossary inline (it's small), or preload | When reviewer hovers any glossary term |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing rate-API key in the bundled JS | Stolen API quota; potentially shown as "leaked credentials" in tooling | Proxy through a serverless function; never ship secret keys in Vite client bundle |
| User-input currency codes interpolated into URLs without validation | Reflected XSS via crafted pair URLs; SEO spam routes | Whitelist ISO 4217 codes; reject everything else with a 404 |
| `localStorage` for favorites stores raw HTML | XSS via crafted entries | Store only canonical codes (e.g. `"USD"`), render via React (auto-escaped) |
| `target="_blank"` on outbound links to source/API/news | Tabnabbing | Always pair with `rel="noopener noreferrer"` |
| No CSP header | XSS persistence if any reflected vuln slips in | Add a CSP allowing only `googlesyndication.com`, `googletagservices.com`, `google-analytics.com`, self, and any chart CDN |
| User-controlled URL params reflected in `<meta>` description | SEO spam pages indexed via your domain | Sanitize and length-limit any param-derived metadata |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Converter result jumps as rates refresh | Distrust / motion-sickness on mobile | `min-height` on result block; debounce updates; preserve last-good value on transient errors |
| Currency picker is a huge dropdown of 100+ codes | Mobile users scroll forever | Searchable combobox with recents + flags; group by continent (already done per commit `de9ef39`) |
| "Save to favorites" star has no accessible name | Screen reader users can't tell what it does | `aria-label="Save USD to EUR to favorites"`; toggled state announced |
| Glossary popover closes on any scroll | Frustrating; defeats the purpose | Stay open until ESC, outside-click, or trigger un-focus |
| Dark mode swap causes white flash on load | "Flash of incorrect theme" — feels broken | Inline an early script that reads stored theme and applies class before React mounts |
| Decimal precision toggle (commit `fd06cc6`) defaults to rounded; users copy rate for a transaction and get wrong number | Real financial confusion — pure YMYL harm | Make precise the default OR show both side-by-side; the disclaimer must be prominent regardless |
| i18n switcher is buried in footer | Non-English users bounce | Visible header switcher with native names (Português, Español, etc., not flags alone) |

## "Looks Done But Isn't" Checklist

- [ ] **Pair pages:** Have unique editorial copy — verify by diffing the rendered text of 5 random pair pages; if >70% is identical wording, you have templated thin content.
- [ ] **`noindex` coverage:** Verify with `curl -s URL | grep noindex` on every thin pair page that was supposed to be noindex'd in commit `7e45b0a`. Don't trust the code — test the deployed HTML.
- [ ] **Crawler view:** Run `curl -s https://currencyabout.com/<page>` and confirm real editorial text appears in the body without JS execution. Test homepage, /guides, and 3 random pair pages.
- [ ] **404 handling:** `curl -I https://currencyabout.com/this-page-does-not-exist` returns HTTP 404, not 200. Critical for SPA hosting.
- [ ] **AdSense loader present:** Network panel on a fresh load shows `adsbygoogle.js` requested as `async` from `pagead2.googlesyndication.com` — even if consent banner suppresses it pending click, verify the script tag exists in HTML.
- [ ] **Mobile above-fold:** Screenshot at 375x667 — zero ads visible without scrolling.
- [ ] **Author byline:** Every guide AND the homepage have a named author with photo + bio. Currently? Verify.
- [ ] **Methodology page:** Named rate source, refresh cadence, indicative-not-transactional language. Currently? Verify exists at a discoverable URL.
- [ ] **Contact:** A real email or working form. Verify by submitting it.
- [ ] **Internal link audit:** Every published page is reachable from the home in ≤2 clicks. Run a crawler against production.
- [ ] **Glossary popovers:** Pass WCAG 1.4.13 (dismissible / hoverable / persistent); pass keyboard test; no CLS impact.
- [ ] **Favorites empty state:** A fresh visitor with no localStorage sees informative content, not an empty container.
- [ ] **Cookie banner:** Does not overlap converter on mobile; does not require dismissal to read content; "Reject all" is as prominent as "Accept all."
- [ ] **Last updated dates:** Every guide shows a visible "Last updated" timestamp in the body, not just in `<meta>`.
- [ ] **hreflang reciprocity:** All 7 locales link to each other; no asymmetric pairs.
- [ ] **No new pages with placeholder copy:** Search the codebase for "Lorem", "TODO", "Coming soon", "Placeholder" before each deploy.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Rejected during this review window for "low value content" | MEDIUM | Take 30+ days before reapplying. Use the time to: add 10 more named-author guides; deepen pair-page editorial; add methodology page; remove or noindex remaining thin pages. Reapply only after Search Console shows clean indexing. |
| Rejected for "site behavior: navigation" | LOW | Run a link checker, fix 404s, add proper 404 HTTP status, verify nav reaches every page. Can reapply within 1-2 weeks. |
| Rejected for crawler-blind SPA | MEDIUM-HIGH | Add prerendering (vite-plugin-prerender, or migrate to SSG via Astro/Next). Significant work but mandatory. Verify with curl + Search Console URL Inspection before reapply. |
| Mid-review accidental nav break (404 from new nav link) | HIGH if reviewer caught it; LOW if not | Roll back the breaking commit immediately. If review still pending, hope they didn't sample at the bad moment. If rejected, address as "navigation" rejection. |
| Cookie banner identified as blocker | LOW | Reconfigure banner to bottom-corner non-blocking variant. Reapply after 2-3 days with deployed fix verified. |
| AdSense loader was deferred / hidden | LOW | Restore `async` script in HTML head. Verify in Network panel. Wait 7 days before reapply for crawler to recheck. |
| Favorites/glossary feature triggered "deceptive placement" flag | MEDIUM | Increase visual distance and contrast between feature cards and ad slots; rename ambiguous labels; reapply. |
| Mobile above-fold ad density violation | LOW | Move first ad slot below converter result block; verify with mobile screenshot; reapply. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 1. Tool-only thin utility rejection | E-E-A-T phase (pair-page editorial pass) | Diff random pair pages; assert <30% wording overlap; verify noindex on all thin pairs |
| 2. Changes during active review | Sprint sequencing (every phase) | Each PR's definition-of-done includes "no orphan routes, no placeholder content, no nav-link to 404" |
| 3. SPA crawler-blindness | Performance / SEO infrastructure phase | `curl` shows real body text; Search Console URL Inspection passes; prerender configured |
| 4. Lazy-loading AdSense loader | Performance / UX polish phase | Network panel shows `adsbygoogle.js` requested on initial load; AdSense loader is `async`, not deferred |
| 5. Glossary popover CLS / a11y | Glossary phase + UX polish | Lighthouse CLS < 0.1; keyboard test passes; ESC closes; WCAG 1.4.13 checklist |
| 6. Favorites mimicking ads | Favorites phase | Visual diff of favorites card vs ad slot — clearly distinct; empty state populated; route is noindex |
| 7. Missing E-E-A-T signals | E-E-A-T phase | About + methodology + contact pages exist; named author with photo on every guide |
| 8. Mobile above-fold ad density | Performance / UX polish phase | 375x667 screenshot shows no ads above fold; density < 30% |
| 9. Navigation rot / orphans | Every phase (DoD) + UX polish | Link checker passes on production; no 404s; all routes reachable in ≤2 clicks |
| 10. Cookie banner blocks crawler/content | UX polish phase | Banner is non-blocking bottom-corner; content visible without dismissal; identical for bot and user |

## Sources

- [Google AdSense Help — Your AdSense account wasn't approved](https://support.google.com/adsense/answer/81904?hl=en) (official)
- [AdSense Program Policies — Google AdSense Help](https://support.google.com/adsense/answer/48182?hl=en) (official)
- [Fix issues with the ad experience on your site — AdSense Help](https://support.google.com/adsense/answer/7514132?hl=en-GB) (official)
- [Fix policy issues that affect ad serving — AdSense Help](https://support.google.com/adsense/answer/7003627?hl=en-GB) (official)
- [Lazily load ads below the fold — Google Publisher Ads Audits](https://developers.google.com/publisher-ads-audits/reference/audits/ads-in-viewport) (official)
- [The Initial Better Ads Standards — Coalition for Better Ads](https://www.betterads.org/standards/) (industry standard)
- [WCAG 1.4.13: Content on Hover or Focus](https://www.wcag.com/authors/1-4-13-content-on-hover-or-focus/) (W3C-derived)
- [AdSense for Tool & Utility Websites — AdSense Audit (2026)](https://adsenseaudit.net/adSense-tool-websites)
- [Low Value Content AdSense — AdSense Audit](https://adsenseaudit.net/guides/low-value-content-adsense)
- [AdSense Rejected: "Site Not Ready" — Yerman UK](https://yerman.uk/adsense-site-not-ready/)
- [Best & Worst Niches for AdSense Approval 2026 — AdSense Audit](https://adsenseaudit.net/guides/adsense-niche-guide)
- [Google AdSense Updates 2026 — TempEmailNow](https://news.tempemailnow.com/google-adsense-updates-2026/)
- [AdSense Revenue Dropping in 2026? 17 Real Reasons — WeForAds](https://weforads.com/blog/adsense-revenue-dropping-2026/)
- [Google AdSense Approval Guide — MonetizationGuy](https://monetizationguy.com/articles/google-adsense-approval-guide-requirements-process-and-avoiding-rejections)
- [AdSense Approval Failure Debugging — McGarrah Technical Blog](https://www.mcgarrah.org/adsense-approval-failure-remediation/)
- [Why Google AdSense Rejects Your Application — Medium (Feb 2026)](https://medium.com/write-a-catalyst/why-google-adsense-rejects-your-application-and-how-to-fix-the-thin-content-problem-76504ce5cf7e)
- [How to Solve AdSense "Site Behavior: Navigation" — SofanMax](https://sofanmax.blogspot.com/2020/08/solving-adsense-site-behavior-navigation.html)
- [Site Behaviour: Navigation thread — AdSense Community](https://support.google.com/adsense/thread/226666062/site-behaviour-navigation-how-to-fix-it?hl=en)
- [5 MOST Common AdSense Violations On Mobile — MonetizeMore](https://www.monetizemore.com/blog/common-adsense-violations-on-mobile/)
- [Google AdSense Now Allows 300x250 Above the Fold on Mobile — AdPushup](https://www.adpushup.com/blog/google-adsense-now-allows-300x250-ads-above-the-fold-on-mobile-web/)
- [Lazy loading of ads — policy violation? (WebmasterWorld)](https://www.webmasterworld.com/google_adsense/4660012.htm)
- [Accessible Tooltips Example 2026 — TheWCAG](https://www.thewcag.com/examples/tooltips)
- [Cumulative Layout Shift (CLS) and Ads — Advanced Ads](https://wpadvancedads.com/cumulative-layout-shift-cls-and-ads/)

---
*Pitfalls research for: free currency-converter / finance-utility site under active AdSense review*
*Researched: 2026-05-19*
