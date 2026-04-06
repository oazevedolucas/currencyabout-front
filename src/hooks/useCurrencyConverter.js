import { useState, useMemo, useCallback } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useExchangeRates } from './useExchangeRates.js'

export function useCurrencyConverter(initialFrom = 'BRL') {
  const { t } = useI18n()
  const { currencies, loading, error, fromCache, rateDate } = useExchangeRates()
  const [rawValue, setRawValue] = useState('')
  const [fromCurrency, setFromCurrency] = useState(initialFrom)
  const [selectedCodes, setSelectedCodes] = useState(null)

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

  const visibleCurrencies = useMemo(() => {
    return targetCurrencies.filter((c) => activeCodes.has(c.code))
  }, [targetCurrencies, activeCodes])

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
