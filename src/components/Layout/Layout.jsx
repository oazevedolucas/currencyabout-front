import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { LanguageSelector } from '../LanguageSelector/LanguageSelector.jsx'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.jsx'
import { CookieConsent } from '../CookieConsent/CookieConsent.jsx'
import { POPULAR_PAIRS, pairUrl } from '../../seo/seoContent.js'
import './Layout.css'

export function Layout({ children }) {
  const { t } = useI18n()

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipToContent || 'Skip to main content'}
      </a>

      <header className="site-header" role="banner">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="About Currency — home">
            <span className="site-header__logo" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3.5 9h17M3.5 15h17M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="site-header__name">About Currency</span>
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              {t.seo?.home || 'Home'}
            </NavLink>
            <NavLink to="/converter" className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              {t.seo?.converter || 'Converter'}
            </NavLink>
            <NavLink to="/exchange-rates-today" className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              {t.seo?.ratesToday || 'Rates Today'}
            </NavLink>
            <NavLink to="/guides" className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              Guides
            </NavLink>
            <NavLink to="/methodology" className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              Methodology
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}>
              About
            </NavLink>
          </nav>

          <div className="site-header__tools">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="layout">
        <main id="main" className="layout__main">
          {children}
        </main>

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
              <li><Link to="/guides" className="footer__link">Guides</Link></li>
            </ul>
          </nav>

          <nav className="footer__nav" aria-label="About and legal">
            <h3 className="footer__title">Company</h3>
            <ul className="footer__links">
              <li><Link to="/about" className="footer__link">About</Link></li>
              <li><Link to="/methodology" className="footer__link">Methodology</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
              <li><Link to="/privacy-policy" className="footer__link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer__link">Terms of Service</Link></li>
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

      <CookieConsent />
    </>
  )
}
