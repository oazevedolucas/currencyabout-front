import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { LanguageSelector } from '../LanguageSelector/LanguageSelector.jsx'
import { POPULAR_PAIRS, pairUrl } from '../../seo/seoContent.js'
import AdBanner from '../AdBanner/AdBanner.jsx'
import './Layout.css'

export function Layout({ children }) {
  const { t } = useI18n()

  return (
    <>
      <LanguageSelector />
      <div className="layout">
        {children}

        {/* Ad: above footer */}
        <AdBanner variant="horizontal" slot="slot2" />

        <footer className="footer">
          <nav className="footer__nav" aria-label="Popular currency conversions">
            <h3 className="footer__title">{t.seo?.popularConversions || 'Popular Conversions'}</h3>
            <ul className="footer__links">
              {POPULAR_PAIRS.slice(0, 12).map(({ from, to }) => (
                <li key={`${from}-${to}`}>
                  <Link to={pairUrl(from, to)} className="footer__link">
                    {from} to {to}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__nav" aria-label="Site navigation">
            <h3 className="footer__title">{t.seo?.tools || 'Tools'}</h3>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">{t.seo?.home || 'Home'}</Link></li>
              <li><Link to="/converter" className="footer__link">{t.seo?.converter || 'Currency Converter'}</Link></li>
              <li><Link to="/exchange-rates-today" className="footer__link">{t.seo?.ratesToday || 'Exchange Rates Today'}</Link></li>
            </ul>
          </nav>

          <div className="footer__bottom">
            <p className="footer__disclaimer">
              {t.seo?.disclaimer || 'Exchange rates are provided for informational purposes only. Rates are updated daily and may differ from actual market rates.'}
            </p>
            <p className="footer__copy">&copy; {new Date().getFullYear()} About Currency</p>
          </div>
        </footer>
      </div>

      {/* Sticky anchor ad at bottom of viewport */}
      <AdBanner variant="anchor" slot="slot3" />
    </>
  )
}
