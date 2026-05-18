// AdSense configuration. Slot ids must match the units configured in the
// AdSense console after the site is re-approved. They are placeholders until
// then; the gated loader (useAdSenseLoader) and <AdSlot /> component will
// render nothing until consent is granted, so unresolved slot ids never reach
// the visitor before approval.

export const ADSENSE_CLIENT_ID = 'ca-pub-3917556333305409'

export const ADSENSE_SCRIPT_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`

// Placeholder slot ids — replace with real ones from the AdSense console
// after approval. Keeping them centralised so the placement code stays clean.
export const AD_SLOTS = {
  homeEditorial: '0000000001',
  guideMid: '0000000002',
  guideEnd: '0000000003',
  pairBelowConversion: '0000000004',
  pairEnd: '0000000005',
}

// Routes where we never render ads, per AdSense policy and editorial choice:
// legal pages, contact, methodology, and the about page should remain ad-free.
// Guide and pair pages are allowed and handled at the placement site.
const NO_AD_ROUTES = new Set([
  '/privacy-policy',
  '/terms',
  '/about',
  '/contact',
  '/methodology',
])

export function isAdAllowedOnRoute(pathname) {
  if (!pathname) return false
  return !NO_AD_ROUTES.has(pathname)
}
