import { useState, useEffect } from 'react'
import { fetchRates } from '../services/exchangeRate.js'
import { CURRENCY_META } from '../constants/currencies.js'

// On SSR / build-time we want pages to render their full editorial body
// (intro paragraphs, FAQ, schema markup, etc.) instead of the loading
// skeleton, because the whole point of pre-rendering is to ship that
// content to non-rendering crawlers.
//
// `loading` therefore starts FALSE on both SSR and the initial client
// paint so the page renders its full body immediately (with rate values
// gracefully degrading to 0/blank until the post-mount fetch resolves).
// Hydration finds the same shell on both sides. The post-mount effect
// flips loading to true only if a fetch is actually in flight AND no
// cached payload was returned synchronously -- which on a warm cache is
// the common case and avoids the brief 0-flash for return visitors.

export function useExchangeRates() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fromCache, setFromCache] = useState(false)
  const [rateDate, setRateDate] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // Intentionally do NOT setLoading(true) here. We start loading=false
        // so the SSR-rendered HTML matches the initial client paint
        // (full body with 0-rate placeholders) and there's no hydration
        // mismatch or skeleton flash. Once this effect's fetch resolves we
        // fill in the real rate values via setCurrencies below; React's
        // reconciliation updates the rate-bearing nodes without unmounting
        // the rest of the page.
        setError(null)
        const { rates, fromCache: cached, date } = await fetchRates()

        if (cancelled) return

        const list = CURRENCY_META
          .filter((meta) => rates[meta.code] !== undefined)
          .map((meta) => ({
            ...meta,
            rateToBRL: rates[meta.code],
          }))

        setCurrencies(list)
        setFromCache(cached)
        setRateDate(date)
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { currencies, loading, error, fromCache, rateDate }
}
