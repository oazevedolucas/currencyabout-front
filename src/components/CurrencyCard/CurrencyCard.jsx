import { memo, useState, useCallback } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import './CurrencyCard.css'

function formatConverted(value) {
  if (value >= 1000) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

function formatRate(rate) {
  if (rate >= 100) {
    return rate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return rate.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

export const CurrencyCard = memo(function CurrencyCard({ currency, amount, fromCurrency, rate }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const converted = amount * rate
  const hasValue = amount > 0
  const displayValue = hasValue ? formatConverted(converted) : '0,00'

  const copyLabel = copied
    ? (t.copied || 'Copied!')
    : (t.copyValue || 'Copy value')

  const handleCopy = useCallback(async () => {
    if (!hasValue) return
    try {
      await navigator.clipboard.writeText(`${converted.toFixed(2)} ${currency.code}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }, [converted, currency.code, hasValue])

  return (
    <article
      className={`currency-card ${hasValue ? 'currency-card--active' : ''}`}
      aria-label={`${currency.name}: ${displayValue} ${currency.code}`}
    >
      <div className="currency-card__header">
        <span className="currency-card__flag" aria-hidden="true">{currency.flag}</span>
        <div className="currency-card__info">
          <div className="currency-card__code-row">
            <span className="currency-card__code">{currency.code}</span>
            <span className="currency-card__symbol">{currency.symbol}</span>
          </div>
          <span className="currency-card__name">{currency.name}</span>
        </div>
        {hasValue && (
          <button
            type="button"
            className={`currency-card__copy ${copied ? 'currency-card__copy--success' : ''}`}
            onClick={handleCopy}
            aria-label={copyLabel}
            title={copyLabel}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="currency-card__value">
        <span className="currency-card__converted">
          {currency.symbol} {displayValue}
        </span>
        <span className="currency-card__rate">
          1 {fromCurrency} = {formatRate(rate)} {currency.code}
        </span>
      </div>
    </article>
  )
})
