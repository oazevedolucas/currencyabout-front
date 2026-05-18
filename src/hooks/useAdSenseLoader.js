import { useEffect } from 'react'
import { hasMarketingConsent } from '../components/CookieConsent/CookieConsent.jsx'
import { ADSENSE_SCRIPT_SRC } from '../constants/adsense.js'

const SCRIPT_MARKER = 'data-adsense-loader'

function injectAdSenseScript() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[${SCRIPT_MARKER}]`)) return
  const s = document.createElement('script')
  s.async = true
  s.src = ADSENSE_SCRIPT_SRC
  s.crossOrigin = 'anonymous'
  s.setAttribute(SCRIPT_MARKER, 'true')
  document.head.appendChild(s)
}

// Mount once at the app shell. Injects the AdSense script the first time
// marketing consent is granted, and reacts in-session to the
// `cookie-consent-changed` event dispatched by CookieConsent. Idempotent:
// repeat injections are no-ops once the script is present.
export function useAdSenseLoader() {
  useEffect(() => {
    if (hasMarketingConsent()) {
      injectAdSenseScript()
    }

    function onConsentChange(e) {
      if (e?.detail === 'accepted') {
        injectAdSenseScript()
      }
    }

    window.addEventListener('cookie-consent-changed', onConsentChange)
    return () => window.removeEventListener('cookie-consent-changed', onConsentChange)
  }, [])
}
