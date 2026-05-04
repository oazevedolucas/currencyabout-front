import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SeoHead } from '../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../seo/StructuredData.jsx'
import { getHomeSeo, SITE_URL } from '../seo/seoContent.js'
import { CurrencyInput } from '../components/CurrencyInput/CurrencyInput.jsx'
import { CurrencyFilter } from '../components/CurrencyFilter/CurrencyFilter.jsx'
import { CurrencyGrid } from '../components/CurrencyGrid/CurrencyGrid.jsx'
import { CurrencyGridSkeleton } from '../components/CurrencyCard/CurrencyCardSkeleton.jsx'
import { PopularPairs } from '../components/PopularPairs/PopularPairs.jsx'
import { QuickAmounts } from '../components/QuickAmounts/QuickAmounts.jsx'
import { SortSelect } from '../components/SortSelect/SortSelect.jsx'
import { PrecisionToggle } from '../components/PrecisionToggle/PrecisionToggle.jsx'
import { FeaturedResult } from '../components/FeaturedResult/FeaturedResult.jsx'
import { FAQ } from '../components/FAQ/FAQ.jsx'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'
import { getRate } from '../constants/currencies.js'

const DEFAULT_RAW_VALUE = '10000' // R$ 100,00 (stored as centavos)
const REVEAL_DELAY_MS = 260

function PageHeader({ t, showLive }) {
  return (
    <header className="header enter">
      {showLive && (
        <span className="header__eyebrow">
          <span className="header__eyebrow-dot" aria-hidden="true" />
          {t.liveRatesEyebrow || 'Live daily rates'}
        </span>
      )}
      <h1 className="header__title">
        {t.title} <span>{t.titleHighlight}</span>
      </h1>
      <p className="header__subtitle">{t.subtitle}</p>
    </header>
  )
}

function EmptyState({ t, symbol }) {
  return (
    <div className="results-empty enter" role="status">
      <div className="results-empty__icon" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <h2 className="results-empty__title">{t.emptyStateTitle || 'Enter an amount to start'}</h2>
      <p className="results-empty__text">
        {t.emptyStateHint || `Type a value above or pick a quick amount like ${symbol} 100 to see live rates across 20+ world currencies.`}
      </p>
    </div>
  )
}

export function HomePage() {
  const { t } = useI18n()
  const seo = getHomeSeo(t)
  const converter = useCurrencyConverter('BRL', DEFAULT_RAW_VALUE)
  const selectedCurrency = converter.localizedCurrencies.find((c) => c.code === converter.fromCurrency)
  const topCurrency = converter.visibleCurrencies[0]
  const topRate = topCurrency
    ? getRate(converter.localizedCurrencies, converter.fromCurrency, topCurrency.code)
    : 0

  const hasAmount = converter.amount > 0

  // Progressive reveal: when amount transitions 0 → >0, briefly show a loading
  // state before revealing fresh results. Uses the Doherty threshold budget
  // (<400 ms) so the delay feels responsive, not artificial.
  const [revealState, setRevealState] = useState(hasAmount ? 'ready' : 'empty')
  const prevHasAmount = useRef(hasAmount)

  useEffect(() => {
    if (hasAmount && !prevHasAmount.current) {
      setRevealState('loading')
      const id = setTimeout(() => setRevealState('ready'), REVEAL_DELAY_MS)
      prevHasAmount.current = hasAmount
      return () => clearTimeout(id)
    }
    if (!hasAmount && prevHasAmount.current) {
      setRevealState('empty')
    }
    prevHasAmount.current = hasAmount
  }, [hasAmount])

  if (converter.loading) {
    return (
      <div className="page">
        <SeoHead title={seo.title} description={seo.description} path="/" />
        <PageHeader t={t} showLive />
        <CurrencyGridSkeleton count={8} />
      </div>
    )
  }

  if (converter.error) {
    return (
      <div className="page">
        <SeoHead title={seo.title} description={seo.description} path="/" />
        <PageHeader t={t} />
        <div className="app__error" role="alert">
          <div className="app__error-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="app__error-title">{t.errorTitle}</p>
          <p className="app__error-detail">{converter.error}</p>
          <button className="btn btn--primary app__error-retry" onClick={() => window.location.reload()}>
            {t.retry}
          </button>
        </div>
      </div>
    )
  }

  const faqQuestions = t.seo?.faq || [
    { question: 'How often are exchange rates updated?', answer: 'Exchange rates are fetched from a reliable API and updated daily. The app caches rates locally for fast performance throughout the day.' },
    { question: 'Is the currency converter free?', answer: 'Yes, About Currency is completely free. No registration or API key required.' },
    { question: 'How many currencies are supported?', answer: 'We support 20+ major world currencies including USD, EUR, GBP, BRL, JPY, CAD, AUD, CHF, and more.' },
    { question: 'Can I convert between any two currencies?', answer: 'Yes, you can select any supported currency as the source and convert to all other currencies simultaneously.' },
  ]

  const showResults = revealState === 'ready'
  const showLoading = revealState === 'loading'
  const showEmpty = revealState === 'empty'

  return (
    <div className="page">
      <SeoHead title={seo.title} description={seo.description} path="/" />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }]} />

      <PageHeader t={t} showLive />

      <div className="hero-stack enter">
        <div className="converter-card">
          <CurrencyInput
            value={converter.rawValue}
            onChange={converter.setRawValue}
            currencies={converter.localizedCurrencies}
            selectedCurrency={converter.fromCurrency}
            onCurrencyChange={converter.setFromCurrency}
          />
          <QuickAmounts
            value={converter.rawValue}
            onChange={converter.setRawValue}
            symbol={selectedCurrency?.symbol || '$'}
          />
        </div>

        {showResults && topCurrency && (
          <FeaturedResult
            fromCurrency={selectedCurrency}
            toCurrency={topCurrency}
            amount={converter.amount}
            rate={topRate}
            precision={converter.precision}
          />
        )}
      </div>

      {showEmpty && (
        <EmptyState t={t} symbol={selectedCurrency?.symbol || '$'} />
      )}

      {showLoading && (
        <>
          <div className="divider" />
          <CurrencyGridSkeleton count={6} />
        </>
      )}

      {showResults && (
        <section className="results-section enter" aria-labelledby="results-heading">
          <header className="results-section__header">
            <div className="results-section__title-group">
              <h2 id="results-heading" className="results-section__title">{t.gridTitle}</h2>
              <span className="results-section__meta" title={converter.fromCache ? t.cacheTooltip : t.freshTooltip}>
                {t.lastQuote} — {converter.rateDate}
              </span>
            </div>
            <div className="results-section__controls">
              <PrecisionToggle value={converter.precision} onChange={converter.setPrecision} />
              <span className="results-section__count">
                {converter.visibleCurrencies.length} / {converter.targetCurrencies.length}
              </span>
              <SortSelect value={converter.sortBy} onChange={converter.setSortBy} />
            </div>
          </header>

          <CurrencyFilter
            currencies={converter.targetCurrencies}
            selected={converter.selectedCodes}
            onChange={converter.setSelectedCodes}
          />

          <CurrencyGrid
            currencies={converter.visibleCurrencies}
            allCurrencies={converter.localizedCurrencies}
            amount={converter.amount}
            fromCurrency={converter.fromCurrency}
            highlightFirst={converter.sortBy === 'strength-desc'}
            grouped={converter.sortBy === 'continent'}
            precision={converter.precision}
          />
        </section>
      )}

      <PopularPairs />

      <section className="seo-content home-editorial" aria-labelledby="home-editorial-heading">
        <h2 id="home-editorial-heading">A free, transparent currency converter — explained</h2>
        <p>
          About Currency is an independent online tool that converts amounts between {' '}
          <strong>21 of the world's most traded currencies</strong> using daily-refreshed
          mid-market reference rates. No sign-up, no paywall, no obscure pricing — every figure
          on the site is the same kind of rate quoted by central banks and major financial
          publications. This page exists so you understand exactly what you are looking at
          before you act on it.
        </p>

        <h3>What "mid-market rate" means (and why it matters)</h3>
        <p>
          The rates you see on this site are <strong>mid-market rates</strong> — the midpoint
          between the global interbank buy and sell prices for a currency. This is the cleanest
          single number to publish, but no consumer actually transacts at it. Every bank, card
          network, and money-transfer service adds a margin on top, typically between 0.3% and
          5%. Knowing the mid-market rate is how you tell whether your provider is competitive
          or quietly overcharging you. For a deeper walk-through, read our guide on
          {' '}<Link to="/guides/how-exchange-rates-work">how exchange rates work</Link>.
        </p>

        <h3>How we source and refresh the data</h3>
        <p>
          Rates are pulled from a public exchange-rate data partner that aggregates feeds from
          major commercial banks and central-bank publications. We refresh once per calendar day
          and cache the result in your browser so subsequent conversions during the same day are
          instant — even on slow connections. For a complete walk-through of our data pipeline
          and known caveats, see the <Link to="/methodology">methodology page</Link>.
        </p>

        <h3>Who this site is built for</h3>
        <ul>
          <li><strong>Travellers</strong> budgeting a trip, comparing prices on the ground, or working out hotel and meal costs in a familiar currency.</li>
          <li><strong>Online shoppers</strong> checking what a foreign-currency price will cost in their home currency before checkout.</li>
          <li><strong>Freelancers and contractors</strong> invoicing clients abroad, or estimating what an inbound payment will be worth.</li>
          <li><strong>Families sending remittances</strong> who want to know the mid-market rate before accepting a quote from a bank or transfer app.</li>
          <li><strong>Students and curious readers</strong> who want a fast way to understand how the cost of imported goods, fuel, or international tuition shifts over time.</li>
        </ul>

        <h3>What we do not do</h3>
        <p>
          About Currency is not a trading platform. We do not stream live tick-by-tick prices,
          execute orders, or quote the rates a specific bank or card will give you. We do not
          recommend specific banks, brokers, or payment providers in exchange for compensation.
          We are not a financial advisor — for material decisions, always confirm directly with
          your provider and, where relevant, a licensed professional.
        </p>

        <h3>How to use this converter well</h3>
        <ol>
          <li>Pick the currency you are converting <em>from</em> and enter an amount above.</li>
          <li>Read off the mid-market value in any of the 20 other currencies displayed in the grid.</li>
          <li>Compare that figure against the rate your bank, card, or remittance app is offering.</li>
          <li>If the gap is wider than 1.5%–2%, look at a competing provider — you can almost always do better, especially on transfers above a few hundred dollars.</li>
        </ol>

        <h3>Editorial standards</h3>
        <p>
          Every guide, currency profile, and FAQ on this site is written and reviewed by humans
          with backgrounds in financial technology and consumer payments — never by automated
          summarisation of other sources. Articles are dated and re-reviewed at least annually.
          We treat corrections as a courtesy to readers, not a reputational threat: if you spot
          an error, please <Link to="/contact">tell us</Link>.
        </p>

        <h3>Continue reading</h3>
        <ul>
          <li><Link to="/guides/how-exchange-rates-work">How exchange rates work — a plain-English guide</Link></li>
          <li><Link to="/guides/sending-money-abroad">How to send money abroad without overpaying</Link></li>
          <li><Link to="/guides/best-time-to-exchange-currency">When is the best time to exchange currency?</Link></li>
          <li><Link to="/guides/major-world-currencies">A guide to the world's major currencies</Link></li>
          <li><Link to="/methodology">Our methodology — sources, refresh cadence, and known limits</Link></li>
        </ul>
      </section>

      <FAQ questions={faqQuestions} />
    </div>
  )
}
