import { useI18n } from '../i18n/I18nContext.jsx'
import { SeoHead } from '../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../seo/StructuredData.jsx'
import { getHomeSeo, SITE_URL } from '../seo/seoContent.js'
import { CurrencyInput } from '../components/CurrencyInput/CurrencyInput.jsx'
import { CurrencyFilter } from '../components/CurrencyFilter/CurrencyFilter.jsx'
import { CurrencyGrid } from '../components/CurrencyGrid/CurrencyGrid.jsx'
import { CurrencyGridSkeleton } from '../components/CurrencyCard/CurrencyCardSkeleton.jsx'
import { PopularPairs } from '../components/PopularPairs/PopularPairs.jsx'
import { FAQ } from '../components/FAQ/FAQ.jsx'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'

function PageHeader({ t, showLive }) {
  return (
    <header className="header">
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

export function HomePage() {
  const { t } = useI18n()
  const seo = getHomeSeo(t)
  const converter = useCurrencyConverter('BRL')

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

  return (
    <div className="page">
      <SeoHead title={seo.title} description={seo.description} path="/" />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }]} />

      <PageHeader t={t} showLive />

      <CurrencyInput
        value={converter.rawValue}
        onChange={converter.setRawValue}
        currencies={converter.localizedCurrencies}
        selectedCurrency={converter.fromCurrency}
        onCurrencyChange={converter.setFromCurrency}
      />

      <div className="divider" />

      <CurrencyFilter
        currencies={converter.targetCurrencies}
        selected={converter.selectedCodes}
        onChange={converter.setSelectedCodes}
      />

      <div className="grid-header">
        <h2 className="grid-header__title">{t.gridTitle}</h2>
        <div className="grid-header__right">
          <span className="grid-header__badge" title={converter.fromCache ? t.cacheTooltip : t.freshTooltip}>
            {t.lastQuote} — {converter.rateDate}
          </span>
          <span className="grid-header__count">
            {converter.visibleCurrencies.length} {t.of} {converter.targetCurrencies.length}
          </span>
        </div>
      </div>

      <CurrencyGrid
        currencies={converter.visibleCurrencies}
        allCurrencies={converter.localizedCurrencies}
        amount={converter.amount}
        fromCurrency={converter.fromCurrency}
      />

      <PopularPairs />

      <FAQ questions={faqQuestions} />
    </div>
  )
}
