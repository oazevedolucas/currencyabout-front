import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SeoHead } from '../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../seo/StructuredData.jsx'
import { getRatesTodaySeo, SITE_URL, pairUrl } from '../seo/seoContent.js'
import { getRate } from '../constants/currencies.js'
import { useExchangeRates } from '../hooks/useExchangeRates.js'
import { PopularPairs } from '../components/PopularPairs/PopularPairs.jsx'
import { FAQ } from '../components/FAQ/FAQ.jsx'
import AdBanner from '../components/AdBanner/AdBanner.jsx'

function formatRate(rate) {
  if (rate >= 100) return rate.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return rate.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

export function ExchangeRatesTodayPage() {
  const { t } = useI18n()
  const { currencies, loading, error, rateDate } = useExchangeRates()
  const seo = getRatesTodaySeo(t)

  const localizedCurrencies = useMemo(() => {
    return currencies.map((c) => ({
      ...c,
      name: t.currencies[c.code] || c.name,
    }))
  }, [currencies, t])

  const baseCurrencies = ['USD', 'EUR', 'GBP']
  const targets = localizedCurrencies.filter((c) => !baseCurrencies.includes(c.code))

  if (loading) {
    return (
      <div className="page">
        <SeoHead title={seo.title} description={seo.description} path="/exchange-rates-today" />
        <div className="app__loading"><div className="app__spinner" /><p>{t.loading}</p></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <SeoHead title={seo.title} description={seo.description} path="/exchange-rates-today" />
        <div className="app__error">
          <p className="app__error-title">{t.errorTitle}</p>
          <button className="app__error-retry" onClick={() => window.location.reload()}>{t.retry}</button>
        </div>
      </div>
    )
  }

  const faqQuestions = [
    { question: 'When are exchange rates updated?', answer: 'Exchange rates are fetched once daily from a reliable market data API and cached for fast performance.' },
    { question: 'Are these rates accurate for trading?', answer: 'These rates are indicative and suitable for informational purposes. For trading or remittance, please check with your financial institution for exact rates.' },
    { question: 'Which currencies are shown?', answer: `We display rates for ${localizedCurrencies.length} major world currencies including USD, EUR, GBP, BRL, JPY, and more.` },
  ]

  return (
    <div className="page">
      <SeoHead title={seo.title} description={seo.description} path="/exchange-rates-today" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Exchange Rates Today', url: `${SITE_URL}/exchange-rates-today` },
      ]} />

      <header className="header">
        <h1 className="header__title">
          {t.seo?.ratesTodayH1 || 'Exchange Rates Today'}
        </h1>
        <p className="header__subtitle">
          {t.seo?.ratesTodaySub || `Live rates updated ${rateDate}`}
        </p>
      </header>

      {/* Ad: below header */}
      <AdBanner variant="horizontal" slot="slot1" />

      {baseCurrencies.map((base, index) => {
        const baseCurrency = localizedCurrencies.find((c) => c.code === base)
        if (!baseCurrency) return null

        return (
          <section key={base} className="rates-table" aria-label={`${base} exchange rates`}>
            {/* Ad: between rate tables (after first table) */}
            {index > 0 && <AdBanner variant="in-feed" slot="slot2" />}
            <h2 className="rates-table__title">
              {baseCurrency.flag} {baseCurrency.name} ({base}) {t.seo?.ratesToday || 'Rates'}
            </h2>
            <div className="rates-table__grid">
              <div className="rates-table__header">
                <span>{t.seo?.currency || 'Currency'}</span>
                <span>{t.seo?.rate || 'Rate'}</span>
              </div>
              {targets.map((target) => {
                const rate = getRate(localizedCurrencies, base, target.code)
                return (
                  <Link
                    key={target.code}
                    to={pairUrl(base, target.code)}
                    className="rates-table__row"
                  >
                    <span className="rates-table__currency">
                      <span aria-hidden="true">{target.flag}</span>
                      <span>{target.code}</span>
                      <span className="rates-table__name">{target.name}</span>
                    </span>
                    <span className="rates-table__rate">
                      {target.symbol} {formatRate(rate)}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      <PopularPairs />

      {/* Ad: before FAQ */}
      <AdBanner variant="horizontal" slot="slot3" />

      <FAQ questions={faqQuestions} />
    </div>
  )
}
