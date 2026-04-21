import { memo } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import './FeaturedResult.css'

function formatAmount(value) {
  if (!Number.isFinite(value) || value === 0) return '0.00'
  if (value >= 1000) return value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

function formatRate(rate) {
  if (!Number.isFinite(rate) || rate === 0) return '—'
  if (rate >= 100) return rate.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return rate.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

export const FeaturedResult = memo(function FeaturedResult({ fromCurrency, toCurrency, amount, rate }) {
  const { t } = useI18n()
  if (!fromCurrency || !toCurrency) return null

  const converted = amount * rate
  const hasValue = amount > 0
  const reverseRate = rate > 0 ? 1 / rate : 0

  const pairKey = `${fromCurrency.code}-${toCurrency.code}-${amount}`

  return (
    <section className="featured-result" aria-label={t.featuredLabel || 'Featured conversion'}>
      <div className="featured-result__inner">
        <header className="featured-result__header">
          <span className="featured-result__eyebrow">{t.featuredEyebrow || 'You get'}</span>
          <div className="featured-result__pair">
            <span className="featured-result__flag" aria-hidden="true">{fromCurrency.flag}</span>
            <span className="featured-result__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="featured-result__flag" aria-hidden="true">{toCurrency.flag}</span>
          </div>
        </header>

        <div className="featured-result__value-row">
          <div className="featured-result__value" key={pairKey}>
            <span className="featured-result__symbol">{toCurrency.symbol}</span>
            <span className="featured-result__number">
              {hasValue ? formatAmount(converted) : '0.00'}
            </span>
            <span className="featured-result__code">{toCurrency.code}</span>
          </div>
        </div>

        <div className="featured-result__detail">
          <span className="featured-result__detail-item">
            <strong>1 {fromCurrency.code}</strong> = {formatRate(rate)} {toCurrency.code}
          </span>
          <span className="featured-result__detail-divider" aria-hidden="true" />
          <span className="featured-result__detail-item">
            <strong>1 {toCurrency.code}</strong> = {formatRate(reverseRate)} {fromCurrency.code}
          </span>
        </div>
      </div>
    </section>
  )
})
