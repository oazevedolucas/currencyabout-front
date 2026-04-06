import { memo } from 'react'
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
  const converted = amount * rate
  const hasValue = amount > 0

  return (
    <article className={`currency-card ${hasValue ? 'currency-card--active' : ''}`}>
      <div className="currency-card__header">
        <span className="currency-card__flag" aria-hidden="true">{currency.flag}</span>
        <div className="currency-card__info">
          <div className="currency-card__code-row">
            <span className="currency-card__code">{currency.code}</span>
            <span className="currency-card__symbol">{currency.symbol}</span>
          </div>
          <span className="currency-card__name">{currency.name}</span>
        </div>
      </div>
      <div className="currency-card__value">
        <span className="currency-card__converted">
          {currency.symbol} {hasValue ? formatConverted(converted) : '0,00'}
        </span>
        <span className="currency-card__rate">
          1 {fromCurrency} = {formatRate(rate)} {currency.code}
        </span>
      </div>
    </article>
  )
})
