import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { POPULAR_PAIRS, pairUrl } from '../../seo/seoContent.js'
import { CURRENCY_META } from '../../constants/currencies.js'
import './PopularPairs.css'

function getFlag(code) {
  return CURRENCY_META.find((c) => c.code === code)?.flag || ''
}

export function PopularPairs({ exclude }) {
  const { t } = useI18n()
  const pairs = exclude
    ? POPULAR_PAIRS.filter((p) => !(p.from === exclude.from && p.to === exclude.to))
    : POPULAR_PAIRS

  return (
    <section className="popular-pairs" aria-label={t.seo?.popularConversions || 'Popular conversions'}>
      <h2 className="popular-pairs__title">
        {t.seo?.popularConversions || 'Popular Conversions'}
      </h2>
      <div className="popular-pairs__grid">
        {pairs.slice(0, 12).map(({ from, to }) => (
          <Link
            key={`${from}-${to}`}
            to={pairUrl(from, to)}
            className="popular-pairs__card"
          >
            <span className="popular-pairs__flags" aria-hidden="true">
              {getFlag(from)}{getFlag(to)}
            </span>
            <span className="popular-pairs__label">{from} / {to}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
