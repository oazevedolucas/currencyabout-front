import { useEffect, useRef, useState } from 'react'
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
          />
        </section>
      )}

      <PopularPairs />

      <FAQ questions={faqQuestions} />
    </div>
  )
}
