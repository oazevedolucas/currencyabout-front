import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import { GUIDES } from '../../content/guides.js'
import './guides.css'

export function GuidesIndexPage() {
  return (
    <div className="guides-index">
      <SeoHead
        title="Currency Guides & Articles | About Currency"
        description="Plain-English guides on how exchange rates work, how to send money abroad, major world currencies, and timing conversions. Written by our editorial team."
        path="/guides"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Guides', url: `${SITE_URL}/guides` },
      ]} />

      <header className="guides-index__header">
        <span className="header__eyebrow">
          <span className="header__eyebrow-dot" aria-hidden="true" />
          Guides
        </span>
        <h1 className="header__title">Understand how money moves across borders</h1>
        <p className="header__subtitle">
          Short, practical reads on exchange rates, remittances, and global currencies.
          No jargon, no affiliate fluff.
        </p>
      </header>

      <ul className="guides-index__grid">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link to={`/guides/${guide.slug}`} className="guide-card">
              <span className="guide-card__category">{guide.category}</span>
              <h2 className="guide-card__title">{guide.title}</h2>
              <p className="guide-card__description">{guide.description}</p>
              <div className="guide-card__meta">
                <span>{guide.readingMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>Updated {guide.updated}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
