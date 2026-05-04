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
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.jsx'

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

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Exchange Rates Today' },
      ]} />

      <header className="header">
        <h1 className="header__title">
          {t.seo?.ratesTodayH1 || 'Exchange Rates Today'}
        </h1>
        <p className="header__subtitle">
          {t.seo?.ratesTodaySub || `Live rates updated ${rateDate}`}
        </p>
      </header>

      {baseCurrencies.map((base) => {
        const baseCurrency = localizedCurrencies.find((c) => c.code === base)
        if (!baseCurrency) return null

        return (
          <section key={base} className="rates-table" aria-label={`${base} exchange rates`}>
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

      <section className="seo-content" aria-labelledby="rates-editorial-heading">
        <h2 id="rates-editorial-heading">Reading today's exchange rates</h2>
        <p>
          The tables above show today's <strong>mid-market reference rates</strong> for {' '}
          {localizedCurrencies.length} of the world's most traded currencies. Each row is a
          one-to-one quote: how many units of the target currency one unit of the base currency
          is worth, at the moment we last refreshed. Click any row to open a dedicated page for
          that currency pair, with conversion tools, common-amount tables, and editorial context.
        </p>

        <h3>What these rates are</h3>
        <p>
          Mid-market reference rates are the midpoint between the global interbank bid and ask —
          the cleanest single figure to publish for an exchange rate. They are the rates quoted
          by news outlets, central-bank reference pages, and reputable finance publications when
          they say "today's USD/EUR rate is X". They are not, however, the rate any specific bank,
          card network, or money-transfer service will give you when you transact.
        </p>

        <h3>Why your bank quotes a different number</h3>
        <p>
          Every consumer-facing provider adds a margin to the mid-market rate to cover
          operations, risk, and profit. Typical ranges:
        </p>
        <ul>
          <li><strong>Major banks:</strong> 2%–4% on international wires, often plus a flat fee.</li>
          <li><strong>Credit and debit cards abroad:</strong> 1%–3% all-in, depending on the issuer.</li>
          <li><strong>Airport exchange kiosks:</strong> 5%–12% — by far the most expensive route.</li>
          <li><strong>Online remittance specialists:</strong> 0.3%–1.5% all-in for major corridors.</li>
        </ul>
        <p>
          Comparing the mid-market rate above with the rate your provider quotes you is the
          single most useful exercise in foreign exchange. If the gap is large, your provider is
          taking a sizeable cut. For a deeper walk-through, see our guide on
          {' '}<Link to="/guides/sending-money-abroad">how to send money abroad</Link>.
        </p>

        <h3>How often these numbers change</h3>
        <p>
          Major currency rates trade continuously on weekdays, but the mid-market rate published
          here is refreshed once per calendar day from a reliable data partner. For travel,
          shopping, remittances, or general comprehension, daily granularity is more than
          sufficient — the day-to-day movement on most major pairs is well under 1%. For trading,
          a professional real-time data feed is the right tool, not this site.
        </p>

        <h3>Cross-rates and how they are computed</h3>
        <p>
          When you read a non-USD pair on this page (for example, EUR to BRL), the figure is
          derived mathematically from the underlying USD-anchored quotes. We divide one rate by
          another to express the relationship in a different base. Cross-rates may differ from
          directly traded pair rates by tiny amounts — practically negligible for any non-trading
          use. Full details are on our <Link to="/methodology">methodology page</Link>.
        </p>

        <h3>What to do with this information</h3>
        <ol>
          <li>Identify the pair you care about and note the mid-market rate.</li>
          <li>Get a quote from your actual provider.</li>
          <li>Calculate the percentage difference. Anything over 1.5%–2% is worth shopping around.</li>
          <li>For amounts above a few thousand dollars, compare two or three remittance services — the savings can easily be three figures.</li>
        </ol>
        <p>
          For a curated list of the most-converted pairs, scroll to the popular-conversions block
          above. To convert a specific amount, head to our <Link to="/converter">currency converter</Link>.
        </p>
      </section>

      <FAQ questions={faqQuestions} />
    </div>
  )
}
