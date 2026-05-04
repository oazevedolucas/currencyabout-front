import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'

const STORAGE_KEY = 'cookie-consent'

export function getStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function hasMarketingConsent() {
  return getStoredConsent() === 'accepted'
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      const id = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(id)
    }
  }, [])

  function decide(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // ignore — banner will reappear next visit if storage is blocked
    }
    setVisible(false)
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }))
  }

  if (!visible) return null

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-desc">
      <div className="cookie-consent__inner">
        <div className="cookie-consent__text">
          <h2 id="cookie-consent-title" className="cookie-consent__title">Cookies & privacy</h2>
          <p id="cookie-consent-desc" className="cookie-consent__desc">
            About Currency uses cookies to remember your language and theme, and may use
            advertising and analytics cookies in the future to keep the site free. You can
            accept all cookies or reject non-essential ones at any time. See our
            {' '}<Link to="/privacy-policy" className="cookie-consent__link">privacy policy</Link>
            {' '}for details.
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--ghost"
            onClick={() => decide('rejected')}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={() => decide('accepted')}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
