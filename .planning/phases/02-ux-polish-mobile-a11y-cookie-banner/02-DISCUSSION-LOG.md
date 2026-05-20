# Phase 2: UX polish — mobile, a11y, cookie banner - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-20
**Phase:** 2-ux-polish-mobile-a11y-cookie-banner
**Areas discussed:** Dark mode scope, Cookie banner gaps, Mobile baseline + UX-06, Link rot + a11y audit scope

---

## Dark mode: how to handle the missing dark tokens (UX-04)

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal contrast patch | Override only the `--color-*` tokens in `html[data-theme='dark']` that fail WCAG AA. Estimated 8–15 tokens. Keep ThemeToggle functional. | ✓ |
| Full dark palette rollout | Build the complete dark palette, revise gradients/shadows/glows, visual review every page. Likely overruns the 1–2-week sprint budget. | |
| Disable ThemeToggle | Force light-only until a future phase ships dark properly. Closes UX-04 trivially. | |
| Patch + remove hardcoded colors | Same as patch, plus replace the two `#0a1f0a` / `#fff` literals in CookieConsent.css with tokens. | |

**User's choice:** Minimal contrast patch.
**Notes:** Decision was to scope dark mode work as narrowly as possible to keep the sprint tight. Hardcoded-color removal in CookieConsent.css got captured as D-06 anyway because it pairs with the banner redesign.

---

## Cookie banner: how to fix the 3 UX-02 gaps

| Option | Description | Selected |
|--------|-------------|----------|
| Targeted fixes, keep current layout | Keep the bottom-strip layout. Change copy to "Reject all". Stack on mobile. Add ESC handler. Token-ize hardcoded colors. | |
| Redesign to floating bottom-corner card | Replace strip with a small card in a bottom corner. Reduces banner footprint, frees vertical mobile space. | ✓ |
| Centered modal with backdrop | Full GDPR-style modal. More compliant-looking but more intrusive and bad for the AdSense reviewer's first impression. | |

**User's choice:** Redesign to floating bottom-corner card.
**Notes:** Explicit override of the CLAUDE.md "no visual rebrand" rule for this one component, captured as scope-exception D-07. Rationale: the banner blocks a UX-02 requirement and the change is structural, not palette/typography.

---

## Banner card details (follow-up after the layout decision)

| Option | Description | Selected |
|--------|-------------|----------|
| GDPR-standard: bottom-right, "Reject all" / "Accept all", ESC = rejected | Card fixed bottom-right 16px from each edge, max-width ~380px, stacks below 480px, ESC fires `decide('rejected')`, surface via `--color-surface`. | ✓ |
| Bottom-left | Same layout, opposite corner. Common in EU sites. | |
| User specifies exact measurements | Skip the recommendation, transcribe user-supplied numbers verbatim. | |

**User's choice:** GDPR-standard layout.
**Notes:** Locked the conventional placement to avoid surprising reviewers / users.

---

## Mobile baseline + UX-06 ad-in-viewport

| Option | Description | Selected |
|--------|-------------|----------|
| 375×667 only + measure before changing anything | Single baseline. Use Chrome DevTools to measure where the home AdSlot lands; only move it if it's actually in the first viewport. | ✓ |
| 375×667 + 320×568 (iPhone SE 1st gen) | Add legacy small-device baseline. Doubles the visual audit work. | |
| 375×667 + 768 (tablet portrait) | Add tablet baseline. Site has no tablet-specific layout, so this would surface gaps in the middle of the breakpoint range. | |

**User's choice:** 375 only + measure first.
**Notes:** Codebase scout already suggested the home AdSlot sits well below the fold (after converter + results + FAQ-prequel), so D-09 instructs to confirm with a screenshot and skip code changes unless violated.

---

## Link-rot (UX-05): tooling choice

| Option | Description | Selected |
|--------|-------------|----------|
| Local bash/Node + curl script | New `scripts/link-check.mjs`, zero new deps. Parses sitemap + grep'd internal links, hits each with redirect-tracking. | ✓ |
| Lychee CLI (new dependency) | More robust (concurrency, retry, rich HTML parsing). Requires a new devDependency, which violates the sprint's no-new-deps rule without explicit approval. | |
| Manual crawl via URL list | Walk the ~39 sitemap URLs and main internal links by hand in DevTools. Fast at small volume but non-reproducible. | |

**User's choice:** Local script (no new deps).
**Notes:** Stays inside the project constraint and produces a reproducible artifact.

---

## a11y audit scope (UX-03)

| Option | Description | Selected |
|--------|-------------|----------|
| axe + Lighthouse + 1 manual keyboard pass | Run automated tools on 4 page types, plus ~10-minute keyboard pass per page type. No screen reader. | ✓ |
| axe + Lighthouse only | Pure automated. Faster, but axe catches roughly 30–40% of real a11y issues. Defensible since UX-03 says "no critical/serious violations", not "fully accessible". | |
| axe + Lighthouse + keyboard + screen reader (VoiceOver) | Full pass including VoiceOver on Safari. Most rigorous, 1–2h extra. Not required by AdSense. | |

**User's choice:** Automated + manual keyboard.
**Notes:** Screen reader testing was explicitly deferred — useful but not gated by AdSense, so kept out of the sprint to protect the timeline.

---

## Claude's Discretion

- Focus-ring strategy: `:focus-visible` + `box-shadow: 0 0 0 3px var(--color-primary-glow)`, matching Phase 1's BylineMeta pattern for visual consistency.
- Locale-width testing during the mobile audit: spot-check `de` (longest strings) and `zh` / `ja` (densest information) on top of `en`.
- Banner stacking breakpoint: 480px viewport width — adjust if a real-device pass shows a different obvious break.
- Starting list of dark tokens to inspect: `--color-surface`, `--color-surface-elevated`, `--color-text-primary/secondary/muted`, `--color-border`, `--color-primary`, `--color-primary-dark`, `--color-primary-glow`. Expand only if axe reports more.

## Deferred Ideas

- Full dark-mode polish (gradients, glows, shadow re-tuning) — post-sprint.
- iPhone SE 1st-gen (320) baseline — revisit only if real users report.
- Tablet (768) layout — could be its own phase.
- VoiceOver / NVDA screen-reader pass — out of sprint scope.
- Lychee CLI — needs the no-new-deps constraint to relax first.
- Cookie banner i18n — current copy English-only; localize in a future i18n-coverage phase.
- react-router-dom v7 hash-anchor scroll fix (from Phase 1 REVIEW.md) — fold in only if it surfaces during the keyboard a11y pass.
