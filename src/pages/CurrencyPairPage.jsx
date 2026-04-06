import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SeoHead } from '../seo/SeoHead.jsx'
import { BreadcrumbSchema, CurrencyPairSchema } from '../seo/StructuredData.jsx'
import { getPairSeo, SITE_URL, pairUrl } from '../seo/seoContent.js'
import { getRate, CURRENCY_META } from '../constants/currencies.js'
import { CurrencyInput } from '../components/CurrencyInput/CurrencyInput.jsx'
import { CurrencyGrid } from '../components/CurrencyGrid/CurrencyGrid.jsx'
import { PopularPairs } from '../components/PopularPairs/PopularPairs.jsx'
import { FAQ } from '../components/FAQ/FAQ.jsx'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'
import AdBanner from '../components/AdBanner/AdBanner.jsx'

function formatRateDisplay(rate) {
  if (rate >= 100) return rate.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return rate.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

export function CurrencyPairPage() {
  const { pair } = useParams()
  const { t } = useI18n()

  const [fromCode, toCode] = useMemo(() => {
    const match = pair?.match(/^([a-z]{3})-to-([a-z]{3})$/i)
    if (!match) return [null, null]
    return [match[1].toUpperCase(), match[2].toUpperCase()]
  }, [pair])

  const fromMeta = CURRENCY_META.find((c) => c.code === fromCode)
  const toMeta = CURRENCY_META.find((c) => c.code === toCode)

  const converter = useCurrencyConverter(fromCode || 'USD')

  const rate = useMemo(() => {
    if (!converter.localizedCurrencies.length || !fromCode || !toCode) return 0
    return getRate(converter.localizedCurrencies, fromCode, toCode)
  }, [converter.localizedCurrencies, fromCode, toCode])

  if (!fromMeta || !toMeta) {
    return (
      <div className="page">
        <SeoHead title="Currency pair not found | About Currency" description="The requested currency pair was not found." path={`/${pair}`} />
        <h1 className="header__title">Currency pair not found</h1>
        <p className="header__subtitle">
          <Link to="/">Go to homepage</Link>
        </p>
      </div>
    )
  }

  const fromName = t.currencies[fromCode] || fromMeta.name
  const toName = t.currencies[toCode] || toMeta.name
  const rateStr = formatRateDisplay(rate)
  const seo = getPairSeo(fromCode, toCode, fromName, toName, rateStr, t)

  if (converter.loading) {
    return (
      <div className="page">
        <SeoHead title={seo.title} description={seo.description} path={pairUrl(fromCode, toCode)} />
        <div className="app__loading">
          <div className="app__spinner" />
          <p>{t.loading}</p>
        </div>
      </div>
    )
  }

  const singleTarget = converter.localizedCurrencies.filter((c) => c.code === toCode)

  const faqQuestions = [
    {
      question: `What is the current ${fromCode} to ${toCode} exchange rate?`,
      answer: `The current exchange rate is 1 ${fromCode} = ${rateStr} ${toCode}. Rates are updated daily from reliable market data sources.`,
    },
    {
      question: `How do I convert ${fromName} to ${toName}?`,
      answer: `Enter the amount in ${fromCode} in the input field above. The converter will instantly show the equivalent value in ${toCode} based on today's exchange rate.`,
    },
    {
      question: `Is the ${fromCode}/${toCode} rate updated in real-time?`,
      answer: `Rates are updated daily and cached for fast performance. The date shown indicates when the rate was last fetched.`,
    },
    {
      question: `Can I also convert ${toCode} to ${fromCode}?`,
      answer: `Yes! Visit our ${toCode} to ${fromCode} page or use the currency selector to switch the source currency.`,
    },
  ]

  return (
    <div className="page">
      <SeoHead title={seo.title} description={seo.description} path={pairUrl(fromCode, toCode)} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: `${fromCode} to ${toCode}`, url: `${SITE_URL}${pairUrl(fromCode, toCode)}` },
      ]} />
      <CurrencyPairSchema from={fromMeta} to={toMeta} rate={rate} date={converter.rateDate} />

      <header className="header">
        <h1 className="header__title">
          <span>{fromMeta.flag}</span> {fromCode} to {toCode} <span>{toMeta.flag}</span>
        </h1>
        <p className="header__subtitle">
          {fromName} to {toName} — {t.seo?.liveRate || 'live exchange rate'}
        </p>
      </header>

      {/* Hero rate display */}
      <div className="pair-rate">
        <span className="pair-rate__value">
          1 {fromCode} = {toMeta.symbol} {rateStr} {toCode}
        </span>
        {converter.rateDate && (
          <span className="pair-rate__date">
            {t.lastQuote} — {converter.rateDate}
          </span>
        )}
      </div>

      <CurrencyInput
        value={converter.rawValue}
        onChange={converter.setRawValue}
        currencies={converter.localizedCurrencies}
        selectedCurrency={converter.fromCurrency}
        onCurrencyChange={converter.setFromCurrency}
      />

      {/* Focused conversion card */}
      <div className="pair-result">
        <CurrencyGrid
          currencies={singleTarget}
          allCurrencies={converter.localizedCurrencies}
          amount={converter.amount}
          fromCurrency={converter.fromCurrency}
        />
      </div>

      {/* Ad: after conversion result */}
      <AdBanner variant="horizontal" slot="slot2" />

      <div className="divider" />

      {/* SEO content block */}
      <section className="seo-content" aria-label={`${fromCode} to ${toCode} information`}>
        <h2>Convert {fromName} to {toName}</h2>
        <p>
          Use this free converter to calculate how much {toName} ({toCode}) you get for your {fromName} ({fromCode}).
          The exchange rate of {fromCode}/{toCode} is updated daily. Whether you are traveling, sending money abroad,
          or tracking investments, About Currency gives you the latest rate instantly.
        </p>
        <h3>About {fromName} ({fromCode})</h3>
        <p>
          The {fromName} ({fromMeta.symbol}) is identified by the currency code {fromCode}.
          It is one of the most traded currencies in the world.
        </p>
        <h3>About {toName} ({toCode})</h3>
        <p>
          The {toName} ({toMeta.symbol}) is identified by the currency code {toCode}.
          You can convert {fromCode} to {toCode} and many other currencies on this page.
        </p>
      </section>

      {/* Reverse link */}
      <p className="pair-reverse">
        Looking for the reverse? <Link to={pairUrl(toCode, fromCode)}>{toCode} to {fromCode}</Link>
      </p>

      <PopularPairs exclude={{ from: fromCode, to: toCode }} />

      {/* Ad: before FAQ */}
      <AdBanner variant="horizontal" slot="slot3" />

      <FAQ questions={faqQuestions} />
    </div>
  )
}
