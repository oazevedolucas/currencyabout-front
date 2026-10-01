---
quick_id: 261001-f0q
status: complete
date: 2026-10-01
commits: [12af4d0, d2d5927, 6babc6a, 94f6be1]
---

# Summary: content audit fixes (P1 + P2)

## Audit findings (served HTML, 62 sitemap URLs)
- Pair pages = 38/62 of the sitemap with ~14% unique text each (mean pairwise similarity 54%, reverse pairs 69%).
- 40 major-cross pairs without intros were indexable and, since 261001-ds0, crawlable static pages.
- Large pages shipped main content in a React-outlined hidden `<div id="S:0">` outside `<main>`.
- Guides are distinct (max 10% overlap); the 6 legacy guides are shorter (600-770 words), have em-dashes and no external citations (P3, not done).
- Authorship/E-E-A-T is in place (byline, reviewed date, Person schema).

## Done
| Commit | Change |
|---|---|
| 12af4d0 | indexable pairs = POPULAR_PAIRS + reverses (== sitemap); 40 crosses now noindex |
| d2d5927 | removed `<Suspense>` around `<Outlet />`; content inline, no `S:` segments |
| 6babc6a | pair template: PAIR_DETAILS sections, links to guides instead of repeated text |
| 94f6be1 | hand-written details for all 38 pairs (~10.5k words) |

## Result
- Unique text per pair page 14% -> 49% avg (min 45%); pairwise similarity 54% -> 28%; reverse pairs 69% -> 26%.
- No repeated sentences across pair details, no em-dashes, no AI-tell phrases.
- Build OK; browser hydration clean on sampled pairs, home and nav; no mobile overflow; deployed and verified live.

## Next
- P3: upgrade 6 legacy guides (remove em-dashes, add citations, extend to 1,000+ words); fix "In today's" and "leverage" in hedge-basics.
