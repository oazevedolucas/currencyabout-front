import { useState, useEffect } from 'react'
import { fetchRates } from '../services/exchangeRate.js'
import { CURRENCY_META } from '../constants/currencies.js'

export function useExchangeRates() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fromCache, setFromCache] = useState(false)
  const [rateDate, setRateDate] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
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
