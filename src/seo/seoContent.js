export const SITE_URL = 'https://currencyabout.com'

export const POPULAR_PAIRS = [
  { from: 'USD', to: 'BRL' },
  { from: 'EUR', to: 'BRL' },
  { from: 'GBP', to: 'BRL' },
  { from: 'USD', to: 'EUR' },
  { from: 'GBP', to: 'USD' },
  { from: 'USD', to: 'JPY' },
  { from: 'EUR', to: 'GBP' },
  { from: 'AUD', to: 'USD' },
  { from: 'USD', to: 'CAD' },
  { from: 'USD', to: 'CHF' },
  { from: 'USD', to: 'CNY' },
  { from: 'USD', to: 'INR' },
  { from: 'JPY', to: 'BRL' },
  { from: 'CAD', to: 'BRL' },
  { from: 'AUD', to: 'BRL' },
  { from: 'CHF', to: 'BRL' },
  { from: 'CNY', to: 'BRL' },
  { from: 'MXN', to: 'USD' },
  { from: 'KRW', to: 'USD' },
  { from: 'INR', to: 'USD' },
]

export function pairSlug(from, to) {
  return `${from.toLowerCase()}-to-${to.toLowerCase()}`
}

export function pairUrl(from, to) {
  return `/${pairSlug(from, to)}`
}

// Curated set of pairs we treat as "high-value" for indexing.
// The converter still works for any supported pair, but only these get
// indexed by search engines — everything else is rendered with noindex.
// Logic:
//   1. All POPULAR_PAIRS plus their reverses.
//   2. All major-major combinations (USD/EUR/GBP/JPY/CHF/CAD/AUD/CNY).
// This keeps Google's index focused on pages with depth, instead of 400+
// auto-generated thin variants that trigger the "low-value content" flag.
const MAJORS = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY']

const indexedSet = new Set()

for (const { from, to } of POPULAR_PAIRS) {
  indexedSet.add(`${from}-${to}`)
  indexedSet.add(`${to}-${from}`)
}

for (const a of MAJORS) {
  for (const b of MAJORS) {
    if (a !== b) indexedSet.add(`${a}-${b}`)
  }
}

export function isIndexablePair(fromCode, toCode) {
  if (!fromCode || !toCode) return false
  return indexedSet.has(`${fromCode.toUpperCase()}-${toCode.toUpperCase()}`)
}

export function getHomeSeo(t) {
  return {
    title: `About Currency - ${t.subtitle}`,
    description: t.seo?.homeDescription ||
      'Convert currencies instantly with live exchange rates. Free real-time converter for USD, EUR, GBP, BRL, JPY and 20+ world currencies. Updated daily.',
  }
}

export function getConverterSeo(t) {
  return {
    title: t.seo?.converterTitle || 'Free Currency Converter - Live Exchange Rates | About Currency',
    description: t.seo?.converterDescription ||
      'Free online currency converter with live daily exchange rates. Convert between USD, EUR, GBP, BRL, JPY, and 20+ currencies instantly. No signup required.',
  }
}

export function getPairSeo(fromCode, toCode, fromName, toName, rate, t) {
  const template = t.seo?.pairTitle || '{from} to {to} - Convert {fromName} to {toName} | About Currency'
  const descTemplate = t.seo?.pairDescription ||
    'Convert {from} to {to} with today\'s live exchange rate. 1 {from} = {rate} {to}. Free {fromName} to {toName} converter updated daily.'

  const title = template
    .replace(/{from}/g, fromCode)
    .replace(/{to}/g, toCode)
    .replace(/{fromName}/g, fromName)
    .replace(/{toName}/g, toName)

  const description = descTemplate
    .replace(/{from}/g, fromCode)
    .replace(/{to}/g, toCode)
    .replace(/{fromName}/g, fromName)
    .replace(/{toName}/g, toName)
    .replace(/{rate}/g, rate)

  return { title, description }
}

export function getRatesTodaySeo(t) {
  return {
    title: t.seo?.ratesTodayTitle || 'Exchange Rates Today - Live Currency Rates | About Currency',
    description: t.seo?.ratesTodayDescription ||
      'Today\'s live exchange rates for 20+ world currencies. See current rates for USD, EUR, GBP, BRL, JPY, and more. Updated daily with real-time data.',
  }
}
