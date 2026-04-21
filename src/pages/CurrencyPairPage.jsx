import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SeoHead } from '../seo/SeoHead.jsx'
import { BreadcrumbSchema, CurrencyPairSchema } from '../seo/StructuredData.jsx'
import { getPairSeo, SITE_URL, pairUrl } from '../seo/seoContent.js'
import { getRate, CURRENCY_META } from '../constants/currencies.js'
import { CurrencyInput } from '../components/CurrencyInput/CurrencyInput.jsx'
import { CurrencyGrid } from '../components/CurrencyGrid/CurrencyGrid.jsx'
import { CurrencyGridSkeleton } from '../components/CurrencyCard/CurrencyCardSkeleton.jsx'
import { PopularPairs } from '../components/PopularPairs/PopularPairs.jsx'
import { FAQ } from '../components/FAQ/FAQ.jsx'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'
import { getProfile } from '../content/currencyProfiles.js'

function formatRateDisplay(rate) {
  if (rate >= 100) return rate.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return rate.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function formatAmount(value) {
  if (value >= 1000) return value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

const QUICK_AMOUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000]

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
        <SeoHead
          title="Currency pair not found | About Currency"
          description="The requested currency pair was not found."
          path={`/${pair}`}
          noindex
        />
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
        <header className="header">
          <h1 className="header__title">
            <span>{fromMeta.flag}</span> {fromCode} to {toCode} <span>{toMeta.flag}</span>
          </h1>
          <p className="header__subtitle">
            {fromName} to {toName} — {t.seo?.liveRate || 'live exchange rate'}
          </p>
        </header>
        <CurrencyGridSkeleton count={1} />
      </div>
    )
  }

  const singleTarget = converter.localizedCurrencies.filter((c) => c.code === toCode)
  const fromProfile = getProfile(fromCode)
  const toProfile = getProfile(toCode)
  const reverseRate = rate > 0 ? 1 / rate : 0

  const faqQuestions = [
    {
      question: `What is the current ${fromCode} to ${toCode} exchange rate?`,
      answer: `The current mid-market rate is 1 ${fromCode} = ${rateStr} ${toCode} (as of ${converter.rateDate}). This is a reference rate — the rate you actually receive from a bank, card, or transfer service will typically include a spread of 0.3%–3% above this.`,
    },
    {
      question: `How do I convert ${fromName} to ${toName}?`,
      answer: `Enter the amount in ${fromCode} in the input field above. The converter instantly multiplies your amount by today's rate to show the equivalent value in ${toCode}. For large conversions, also compare the rate offered by your actual payment provider.`,
    },
    {
      question: `Is the ${fromCode}/${toCode} rate live?`,
      answer: `Rates are pulled from a reliable exchange-rate data source and refreshed daily. They are cached in your browser for the day for performance. For second-by-second market rates used by traders, you would need a professional data feed.`,
    },
    {
      question: `Can I convert ${toCode} back to ${fromCode}?`,
      answer: `Yes — visit our ${toCode} to ${fromCode} page for the reverse direction. At today's rate, 1 ${toCode} is worth about ${formatRateDisplay(reverseRate)} ${fromCode}.`,
    },
    {
      question: `How much is 100 ${fromCode} in ${toCode}?`,
      answer: `At the current rate, 100 ${fromCode} equals approximately ${formatAmount(100 * rate)} ${toCode}. The quick-reference table on this page shows other common amounts from 1 to 10,000 ${fromCode}.`,
    },
    {
      question: `Why is the rate on my card different from what's shown here?`,
      answer: `The rate shown here is the mid-market rate. Banks, credit-card networks, and payment processors add a margin (typically 0.3% to 3%) to this rate to cover their costs and profit. This margin is how most "zero fee" services make money.`,
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
        <span className="header__eyebrow">
          <span className="header__eyebrow-dot" aria-hidden="true" />
          Updated {converter.rateDate}
        </span>
        <h1 className="header__title">
          <span>{fromMeta.flag}</span> {fromCode} to {toCode} <span>{toMeta.flag}</span>
        </h1>
        <p className="header__subtitle">
          Convert {fromName} to {toName} with today's live exchange rate.
        </p>
      </header>

      {/* Hero rate display */}
      <div className="pair-rate">
        <span className="pair-rate__value">
          1 {fromCode} = {toMeta.symbol} {rateStr} {toCode}
        </span>
        <Link
          to={pairUrl(toCode, fromCode)}
          className="pair-rate__swap"
          aria-label={`Swap to ${toCode} to ${fromCode}`}
        >
          <svg className="pair-rate__swap-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 10l-3-3 3-3M4 7h13a4 4 0 0 1 0 8h-1M17 14l3 3-3 3M20 17H7a4 4 0 0 1 0-8h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.swapPair || 'Swap'} — {toCode}/{fromCode}
        </Link>
        {converter.rateDate && (
          <span className="pair-rate__date">
            Mid-market reference rate — {converter.rateDate}
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

      {/* Quick-reference table */}
      <section className="pair-table" aria-labelledby="pair-table-heading">
        <h2 id="pair-table-heading" className="pair-table__title">
          {fromCode} to {toCode} — common amounts
        </h2>
        <p className="pair-table__subtitle">
          Use this quick-reference table to check common conversion amounts at today's rate.
        </p>
        <div className="pair-table__grid">
          <div className="pair-table__header">
            <span>{fromCode}</span>
            <span>{toCode}</span>
          </div>
          {QUICK_AMOUNTS.map((amount) => (
            <div key={amount} className="pair-table__row">
              <span>{fromMeta.symbol} {amount.toLocaleString('en')}</span>
              <span className="pair-table__value">{toMeta.symbol} {formatAmount(amount * rate)}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Rich editorial content */}
      <section className="seo-content" aria-label={`${fromCode} to ${toCode} information`}>
        <h2>Converting {fromName} ({fromCode}) to {toName} ({toCode})</h2>
        <p>
          Whether you are planning a trip, paying an international invoice, sending money to family,
          or pricing an imported product, understanding the {fromCode}/{toCode} exchange rate helps
          you avoid surprises. At today's mid-market rate of <strong>1 {fromCode} = {rateStr} {toCode}</strong>,
          {' '}{fromCode === toCode ? 'the currencies are identical' : `every ${fromCode} you convert will yield about ${formatAmount(rate)} ${toCode}`}
          {' '}— before any fees or spread your payment provider adds.
        </p>

        <h3>Reverse direction: {toCode} to {fromCode}</h3>
        <p>
          Converting the other way, <strong>1 {toCode} = {formatRateDisplay(reverseRate)} {fromCode}</strong>.
          For the reverse-direction converter, see the dedicated <Link to={pairUrl(toCode, fromCode)}>{toCode} to {fromCode}</Link> page.
        </p>

        {fromProfile && (
          <>
            <h3>About the {fromName} ({fromCode})</h3>
            <p>
              <strong>Country:</strong> {fromProfile.country}. <strong>Central bank:</strong> {fromProfile.centralBank}.
              {' '}<strong>Subunit:</strong> {fromProfile.subunit}. <strong>Global rank:</strong> {fromProfile.rank}.
            </p>
            <p>{fromProfile.about}</p>
            <p><strong>Where it's used:</strong> {fromProfile.usage}</p>
          </>
        )}

        {toProfile && (
          <>
            <h3>About the {toName} ({toCode})</h3>
            <p>
              <strong>Country:</strong> {toProfile.country}. <strong>Central bank:</strong> {toProfile.centralBank}.
              {' '}<strong>Subunit:</strong> {toProfile.subunit}. <strong>Global rank:</strong> {toProfile.rank}.
            </p>
            <p>{toProfile.about}</p>
            <p><strong>Where it's used:</strong> {toProfile.usage}</p>
          </>
        )}

        <h3>Typical use cases for {fromCode} → {toCode}</h3>
        <ul>
          <li><strong>Travel:</strong> budgeting a trip, converting cash before departure, or understanding prices while on the ground.</li>
          <li><strong>Online shopping:</strong> comparing a foreign-currency price against what your home card or wallet will actually charge.</li>
          <li><strong>Remittances:</strong> estimating how much will land when sending money to family or friends abroad.</li>
          <li><strong>Freelance and contract work:</strong> invoicing in one currency while the payer settles in another.</li>
          <li><strong>Property, tuition, or medical costs abroad:</strong> planning large one-off payments.</li>
        </ul>

        <h3>Mid-market rate vs. the rate you'll actually pay</h3>
        <p>
          The rate shown here is the <strong>mid-market rate</strong> — the midpoint between the global
          interbank bid and ask. No consumer actually transacts at this rate. Every provider adds a
          spread or fee to cover its costs and profit:
        </p>
        <ul>
          <li><strong>Banks:</strong> typically add 2%–4% plus a flat fee on international transfers.</li>
          <li><strong>Credit and debit cards abroad:</strong> typically 1%–3% total, depending on issuer and network.</li>
          <li><strong>Airport exchange kiosks:</strong> often 5%–12% worse than mid-market — the most expensive option.</li>
          <li><strong>Online remittance specialists:</strong> usually 0.3%–1.5% all-in, often the best option for medium amounts.</li>
        </ul>
        <p>
          To estimate the real cost of a conversion, multiply your amount by the mid-market rate
          shown here, then subtract your provider's fee and the margin they charge on the rate.
          For deeper guidance, see our guide on <Link to="/guides/sending-money-abroad">how to send money abroad</Link>.
        </p>

        <h3>What moves the {fromCode}/{toCode} rate</h3>
        <p>
          Day-to-day changes in {fromCode}/{toCode} are typically driven by relative interest rates
          at {fromProfile?.centralBank || `${fromCode}'s central bank`} and
          {' '}{toProfile?.centralBank || `${toCode}'s central bank`}, inflation data in both countries,
          and the broader global risk environment. Larger swings tend to coincide with policy
          announcements, political events, or unexpected economic data. To read more about what
          drives FX rates generally, see our guide on
          {' '}<Link to="/guides/how-exchange-rates-work">how exchange rates work</Link>.
        </p>

        <h3>Can I time this conversion?</h3>
        <p>
          Short-term FX moves are notoriously difficult to predict. For small and medium amounts,
          converting when you actually need the money is usually the right call — the expected
          savings from waiting rarely justify the effort or the risk of the rate moving the wrong
          way. For larger or recurring conversions, spreading the conversion across several tranches
          is a well-established way to reduce timing risk. Our guide on
          {' '}<Link to="/guides/best-time-to-exchange-currency">timing a currency conversion</Link>
          {' '}covers this in depth.
        </p>

        <p>
          <strong>Disclaimer:</strong> rates shown are for reference and may differ from the rate
          you receive from any specific provider. Always confirm with your actual payment provider
          before committing to a material conversion. See our
          {' '}<Link to="/terms">terms of service</Link> for full details.
        </p>
      </section>

      {/* Reverse link */}
      <p className="pair-reverse">
        Looking for the reverse? <Link to={pairUrl(toCode, fromCode)}>{toCode} to {fromCode}</Link>
      </p>

      <PopularPairs exclude={{ from: fromCode, to: toCode }} />

      <FAQ questions={faqQuestions} />
    </div>
  )
}
