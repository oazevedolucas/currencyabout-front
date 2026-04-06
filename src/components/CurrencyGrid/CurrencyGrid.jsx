import { CurrencyCard } from '../CurrencyCard/CurrencyCard.jsx'
import { getRate } from '../../constants/currencies.js'
import './CurrencyGrid.css'

export function CurrencyGrid({ currencies, allCurrencies, amount, fromCurrency }) {
  return (
    <section className="currency-grid" aria-label="Currency quotes">
      {currencies.map((currency) => (
        <CurrencyCard
          key={currency.code}
          currency={currency}
          amount={amount}
          fromCurrency={fromCurrency}
          rate={getRate(allCurrencies, fromCurrency, currency.code)}
        />
      ))}
    </section>
  )
}
