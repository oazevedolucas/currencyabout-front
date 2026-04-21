import { useState, useMemo, useCallback } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useExchangeRates } from './useExchangeRates.js'
import { getRate, CONTINENT_ORDER } from '../constants/currencies.js'
import { POPULAR_PAIRS } from '../seo/seoContent.js'

const POPULAR_ORDER = (() => {
  const seen = new Set()
  const order = []
  POPULAR_PAIRS.forEach(({ from, to }) => {
    if (!seen.has(from)) { seen.add(from); order.push(from) }
    if (!seen.has(to)) { seen.add(to); order.push(to) }
  })
  return order
})()

export const SORT_OPTIONS = ['strength-desc', 'strength-asc', 'continent', 'alpha', 'popular']

export function useCurrencyConverter(initialFrom = 'BRL', initialRawValue = '10000') {
  const { t } = useI18n()
  const { currencies, loading, error, fromCache, rateDate } = useExchangeRates()
  const [rawValue, setRawValue] = useState(initialRawValue)
  const [fromCurrency, setFromCurrency] = useState(initialFrom)
  const [selectedCodes, setSelectedCodes] = useState(null)
  const [sortBy, setSortBy] = useState('strength-desc')
  const [precision, setPrecision] = useState('rounded') // 'rounded' | 'precise'

  const allCodes = useMemo(() => {
    return new Set(currencies.map((c) => c.code))
  }, [currencies])

  const activeCodes = selectedCodes ?? allCodes

  const amount = useMemo(() => {
    if (!rawValue) return 0
    return Number(rawValue) / 100
  }, [rawValue])

  const localizedCurrencies = useMemo(() => {
    return currencies.map((c) => ({
      ...c,
      name: t.currencies[c.code] || c.name,
    }))
  }, [currencies, t])

  const targetCurrencies = useMemo(() => {
    return localizedCurrencies.filter((c) => c.code !== fromCurrency)
  }, [localizedCurrencies, fromCurrency])

  const sortedTargetCurrencies = useMemo(() => {
    const list = [...targetCurrencies]

    if (sortBy === 'alpha') {
      return list.sort((a, b) => a.code.localeCompare(b.code))
    }

    if (sortBy === 'popular') {
      return list.sort((a, b) => {
        const aIdx = POPULAR_ORDER.indexOf(a.code)
        const bIdx = POPULAR_ORDER.indexOf(b.code)
        const aScore = aIdx === -1 ? 999 : aIdx
        const bScore = bIdx === -1 ? 999 : bIdx
        return aScore - bScore
      })
    }

    if (sortBy === 'continent') {
      return list.sort((a, b) => {
        const aIdx = CONTINENT_ORDER.indexOf(a.continent)
        const bIdx = CONTINENT_ORDER.indexOf(b.continent)
        const aScore = aIdx === -1 ? 999 : aIdx
        const bScore = bIdx === -1 ? 999 : bIdx
        if (aScore !== bScore) return aScore - bScore
        return a.code.localeCompare(b.code)
      })
    }

    // Currency strength = 1 / rate(from -> target).
    // Smaller rate => target is stronger (1 unit of target costs more units of source).
    const direction = sortBy === 'strength-asc' ? -1 : 1
    return list.sort((a, b) => {
      const rateA = getRate(localizedCurrencies, fromCurrency, a.code) || Infinity
      const rateB = getRate(localizedCurrencies, fromCurrency, b.code) || Infinity
      return (rateA - rateB) * direction
    })
  }, [targetCurrencies, sortBy, localizedCurrencies, fromCurrency])

  const visibleCurrencies = useMemo(() => {
    return sortedTargetCurrencies.filter((c) => activeCodes.has(c.code))
  }, [sortedTargetCurrencies, activeCodes])

  const handleCurrencyChange = useCallback((code) => {
    setFromCurrency(code)
  }, [])

  const handleFilterChange = useCallback((codes) => {
    setSelectedCodes(codes)
  }, [])

  return {
    rawValue,
    setRawValue,
    fromCurrency,
    setFromCurrency: handleCurrencyChange,
    selectedCodes: activeCodes,
    setSelectedCodes: handleFilterChange,
    sortBy,
    setSortBy,
    precision,
    setPrecision,
    amount,
    localizedCurrencies,
    targetCurrencies,
    visibleCurrencies,
    loading,
    error,
    fromCache,
    rateDate,
  }
}
