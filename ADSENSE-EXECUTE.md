# ADSENSE-PLAN — Execution Authorization

Plan reviewed. Answers to your open questions in §8, then proceed with phases A → E.

## Answers to §8

1. **Architectural decisions (§5):** all three confirmed.
   - Single-URL i18n stays. Do not introduce `/pt` `/en` route trees.
   - Expand `/guides`. Do not create `/blog`.
   - New articles use the same JS-object shape in `src/content/guides.js`. No MDX, no Contentlayer.

2. **Scope:** English-only this round. The five Brazil-specific topics in the original brief are out of scope.

3. **ESLint:** skip for this pass. Do not add a lint config or script. Don't let lint absence block completion.

4. **Topic list adjustment:**
   - Drop "Best practices for sending money internationally" (overlaps with the existing `sending-money-abroad` guide).
   - Replace it with **"Currency volatility: why some currencies move more than others"**.
   - You proposed 7 topics + "1–2 extras to reach 12–15". Propose the 2 extras in your first message back, in the same style as the existing 6 guides — don't write them yet, just the titles and a one-line angle each. I'll confirm before you author.
   - Final target: **9 new guides**, taking total from 6 → 15.

5. **`ads.txt`:** leave it as-is. The real publisher line is already there. No changes.

## Tone and structure for new guides

Mirror the existing 6 guides in `src/content/guides.js` exactly:
- Same body block shape (`h2`, `p`, `list`, `callout`, `lead`)
- Same length range as the longest existing guide (read them and match)
- Same internal-linking convention (≥2 other guides + the converter)
- Same voice — practical, plain English, no marketing fluff
- No em-dashes in body copy, no rule-of-three lists, no "in today's fast-paced world" type openers

## Execution rules

- **Stop after Phase A** and report what you found (especially the JSON-LD wiring audit and any thin pair pages still uncovered). Wait for my go-ahead before Phase B.
- **For Phase B**, write guides one at a time. After the first guide is complete, pause and show me the diff. Once I approve the pattern, batch the remaining 8 without further interruption.
- **For Phase C**, the AdSense loader must be gated on `hasMarketingConsent()` returning true, and must listen to `cookie-consent-changed` for in-session changes. Verify by reading `src/components/CookieConsent/CookieConsent.jsx` before writing the hook — replicate, don't reinvent.
- For each `<AdSlot />` placement, justify it in the commit body (why this page, why this position).

## Hard constraints (recap)

- Additive only. Don't touch the converter, the i18n context, or the cookie consent component beyond reading them.
- No new dependencies without naming them and waiting for my approval.
- Update `public/sitemap.xml` and the noscript block in `index.html` in the same commit as new guides.
- All exchange-rate examples use ranges, never invented specific numbers.
- All content original. Never paraphrase from a source — write from first principles.

## Verification (replaces the original brief's checks)

```bash
npm run build
```

Then manual:
- [ ] `dist/sitemap.xml` includes all new slugs
- [ ] Each new guide renders, shows breadcrumb, and emits `ArticleSchema` (check DevTools → Elements → `<head>`)
- [ ] Home `FAQ` emits `FAQSchema`
- [ ] Catch-all 404 works for unknown routes
- [ ] `CurrencyPairPage` redirects to 404 on invalid slugs
- [ ] Cookie banner: refuse → no AdSense script in `<head>`; accept → script injected; refresh page → state persists
- [ ] `<AdSlot />` renders nothing on `/privacy-policy`, `/terms`, `/about`, `/contact`, `/methodology`

## Definition of done

- Phases A–E complete
- Build passing
- Final commit message drafted for me to push
- Short handoff note: what I should monitor in Search Console over the next 1–2 weeks before reapplying to AdSense

Proceed with Phase A.
