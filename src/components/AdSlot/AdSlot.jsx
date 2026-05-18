import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hasMarketingConsent } from '../CookieConsent/CookieConsent.jsx'
import { ADSENSE_CLIENT_ID, isAdAllowedOnRoute } from '../../constants/adsense.js'
import './AdSlot.css'

// Renders an AdSense slot, gated by:
//   1. Marketing consent (must be 'accepted')
//   2. Route allowlist (no ads on legal/about/contact/methodology)
// Lazy-loaded via IntersectionObserver: the slot pushes to adsbygoogle only
// when it comes within 200px of the viewport, so we never block first paint.
export function AdSlot({ slotId, format = 'auto', layout, className = '' }) {
  const location = useLocation()
  const insRef = useRef(null)
  const pushedRef = useRef(false)
  const [consent, setConsent] = useState(() => hasMarketingConsent())

  useEffect(() => {
    function onConsentChange(e) {
      setConsent(e?.detail === 'accepted')
    }
    window.addEventListener('cookie-consent-changed', onConsentChange)
    return () => window.removeEventListener('cookie-consent-changed', onConsentChange)
  }, [])

  useEffect(() => {
    if (!consent) return
    const el = insRef.current
    if (!el || pushedRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !pushedRef.current) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({})
              pushedRef.current = true
            } catch {
              // AdSense script may not be present yet; the loader hook
              // will inject it on consent, and the next intersection will
              // succeed. Swallow to avoid noisy console errors.
            }
            observer.disconnect()
            return
          }
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [consent])

  if (!consent) return null
  if (!isAdAllowedOnRoute(location.pathname)) return null

  return (
    <div className={`adslot ${className}`.trim()} aria-label="Advertisement">
      <ins
        ref={insRef}
        className="adsbygoogle adslot__ins"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { 'data-ad-layout': layout } : {})}
      />
    </div>
  )
}
