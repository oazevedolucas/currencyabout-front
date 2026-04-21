import { useMemo } from 'react'
import { CurrencyCard } from '../CurrencyCard/CurrencyCard.jsx'
import { getRate, CONTINENT_META } from '../../constants/currencies.js'
import { useI18n } from '../../i18n/I18nContext.jsx'
import './CurrencyGrid.css'

function CardRow({ currencies, allCurrencies, amount, fromCurrency, highlightFirst, startIdx, precision }) {
  return (
    <div className="currency-grid__row enter-stagger">
      {currencies.map((currency, idx) => (
        <CurrencyCard
          key={currency.code}
          currency={currency}
          amount={amount}
          fromCurrency={fromCurrency}
          rate={getRate(allCurrencies, fromCurrency, currency.code)}
          isTop={highlightFirst && startIdx + idx === 0}
          precision={precision}
        />
      ))}
    </div>
  )
}

export function CurrencyGrid({ currencies, allCurrencies, amount, fromCurrency, highlightFirst = false, grouped = false, precision = 'rounded' }) {
  const { t } = useI18n()

  const groups = useMemo(() => {
    if (!grouped) return null
    const map = []
    let current = null
    currencies.forEach((c) => {
      if (!current || current.continent !== c.continent) {
        current = { continent: c.continent, items: [] }
        map.push(current)
      }
      current.items.push(c)
    })
    return map
  }, [currencies, grouped])

  if (grouped && groups) {
    return (
      <div className="currency-groups" aria-label="Currency quotes grouped by region">
        {groups.map((group, i) => {
          const continentLabel = t.continents?.[group.continent] || group.continent
          const icon = CONTINENT_META[group.continent]?.icon || '🌐'
          const startIdx = groups.slice(0, i).reduce((acc, g) => acc + g.items.length, 0)
          return (
            <section key={group.continent} className="currency-groups__section" aria-labelledby={`group-${group.continent}`}>
              <header className="currency-groups__header">
                <span className="currency-groups__icon" aria-hidden="true">{icon}</span>
                <h3 id={`group-${group.continent}`} className="currency-groups__title">
                  {continentLabel}
                </h3>
                <span className="currency-groups__count">{group.items.length}</span>
              </header>
              <CardRow
                currencies={group.items}
                allCurrencies={allCurrencies}
                amount={amount}
                fromCurrency={fromCurrency}
                highlightFirst={highlightFirst}
                startIdx={startIdx}
                precision={precision}
              />
            </section>
          )
        })}
      </div>
    )
  }

  return (
    <section className="currency-grid enter-stagger" aria-label="Currency quotes">
      {currencies.map((currency, idx) => (
        <CurrencyCard
          key={currency.code}
          currency={currency}
          amount={amount}
          fromCurrency={fromCurrency}
          rate={getRate(allCurrencies, fromCurrency, currency.code)}
          isTop={highlightFirst && idx === 0}
          precision={precision}
        />
      ))}
    </section>
  )
}
