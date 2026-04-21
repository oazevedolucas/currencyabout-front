import { memo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { pairUrl } from '../../seo/seoContent.js'
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

const DETAIL_AMOUNTS = [1, 10, 100, 1000]

export const CurrencyCard = memo(function CurrencyCard({ currency, amount, fromCurrency, rate, isTop = false }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const converted = amount * rate
  const hasValue = amount > 0
  const displayValue = hasValue ? formatConverted(converted) : '0,00'
  const reverseRate = rate > 0 ? 1 / rate : 0

  const copyLabel = copied
    ? (t.copied || 'Copied!')
    : (t.copyValue || 'Copy value')

  const detailsLabel = expanded
    ? (t.hideDetails || 'Hide details')
    : (t.showDetails || 'Show details')

  const handleCopy = useCallback(async (e) => {
    e.stopPropagation()
    if (!hasValue) return
    try {
      await navigator.clipboard.writeText(`${converted.toFixed(2)} ${currency.code}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }, [converted, currency.code, hasValue])

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }, [handleToggle])

  return (
    <article
      className={`currency-card ${hasValue ? 'currency-card--active' : ''} ${isTop ? 'currency-card--top' : ''} ${expanded ? 'currency-card--expanded' : ''}`}
      aria-label={`${currency.name}: ${displayValue} ${currency.code}`}
    >
      {isTop && (
        <span className="currency-card__badge" aria-label={t.strongestBadge || 'Strongest currency'}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {t.strongestBadge || 'Strongest'}
        </span>
      )}

      <div
        className="currency-card__summary"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={`card-detail-${currency.code}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
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
        <span className="currency-card__chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div
        id={`card-detail-${currency.code}`}
        className="currency-card__detail"
        aria-hidden={!expanded}
      >
        <div className="currency-card__detail-inner">
          <h4 className="currency-card__detail-title">
            {t.quickTable || 'Quick reference'}
          </h4>
          <ul className="currency-card__detail-list">
            {DETAIL_AMOUNTS.map((amt) => (
              <li key={amt} className="currency-card__detail-row">
                <span className="currency-card__detail-from">
                  {amt.toLocaleString('en')} {fromCurrency}
                </span>
                <span className="currency-card__detail-to">
                  {formatConverted(amt * rate)} {currency.code}
                </span>
              </li>
            ))}
          </ul>
          <div className="currency-card__detail-rates">
            <div>
              <span className="currency-card__detail-label">1 {fromCurrency}</span>
              <span className="currency-card__detail-number">{formatRate(rate)} {currency.code}</span>
            </div>
            <div>
              <span className="currency-card__detail-label">1 {currency.code}</span>
              <span className="currency-card__detail-number">{formatRate(reverseRate)} {fromCurrency}</span>
            </div>
          </div>
          <Link
            to={pairUrl(fromCurrency, currency.code)}
            className="currency-card__detail-link"
            onClick={(e) => e.stopPropagation()}
          >
            {t.viewPairPage || `View ${fromCurrency}/${currency.code} page`}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
})
