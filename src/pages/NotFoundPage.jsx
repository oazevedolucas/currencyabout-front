import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SeoHead } from '../seo/SeoHead.jsx'
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.jsx'
import { POPULAR_PAIRS, pairUrl } from '../seo/seoContent.js'
import './legal/legal.css'

export function NotFoundPage() {
  const location = useLocation()
  const attempted = location.pathname

  // Lazy-load the GUIDES data only when this 404 page actually mounts, so the
  // ~80 KB `src/content/guides.js` module is not hoisted into the eager entry
  // chunk via this catch-all route. NotFoundPage itself stays eager per D-01.
  const [suggestedGuides, setSuggestedGuides] = useState([])
  useEffect(() => {
    let cancelled = false
    import('../content/guides.js').then((mod) => {
      if (!cancelled) setSuggestedGuides(mod.GUIDES.slice(0, 4))
    }).catch(() => {
      // ignore — the guide suggestion section silently degrades to empty
    })
    return () => { cancelled = true }
  }, [])

  const suggestedPairs = POPULAR_PAIRS.slice(0, 6)

  return (
    <article className="legal-page">
      <SeoHead
        title="Page not found (404) | About Currency"
        description="The page you were looking for was not found. Try our currency converter, a popular conversion, or one of our guides."
        path={attempted}
        noindex
      />

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Page not found' },
      ]} />

      <div className="legal-page__meta">Error 404</div>
      <h1>This page does not exist</h1>

      <p className="legal-page__lead">
        We could not find <code>{attempted}</code>. The page may have moved, the link may be
        out of date, or the URL may have a typo. Below are a few places you might be looking
        for.
      </p>

      <section className="legal-page__section">
        <h2>Popular conversions</h2>
        <ul>
          {suggestedPairs.map(({ from, to }) => (
            <li key={`${from}-${to}`}>
              <Link to={pairUrl(from, to)}>{from} to {to}</Link>
            </li>
          ))}
        </ul>
      </section>

      {suggestedGuides.length > 0 && (
        <section className="legal-page__section">
          <h2>Guides and explainers</h2>
          <ul>
            {suggestedGuides.map((guide) => (
              <li key={guide.slug}>
                <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="legal-page__section">
        <h2>Or start over</h2>
        <ul>
          <li><Link to="/">Currency converter (home)</Link></li>
          <li><Link to="/exchange-rates-today">Today's exchange rates</Link></li>
          <li><Link to="/guides">All guides</Link></li>
          <li><Link to="/about">About this site</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>
      </section>
    </article>
  )
}
