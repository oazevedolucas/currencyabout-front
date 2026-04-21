import { useParams, Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema, ArticleSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import { GUIDES, getGuide } from '../../content/guides.js'
import './guides.css'

function renderBlock(block, i) {
  switch (block.type) {
    case 'lead':
      return <p key={i} className="guide-article__lead">{block.text}</p>
    case 'h2':
      return <h2 key={i}>{block.text}</h2>
    case 'h3':
      return <h3 key={i}>{block.text}</h3>
    case 'p':
      return <p key={i}>{block.text}</p>
    case 'list':
      return (
        <ul key={i}>
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      )
    case 'callout':
      return <div key={i} className="guide-article__callout">{block.text}</div>
    default:
      return null
  }
}

export function GuidePage() {
  const { slug } = useParams()
  const guide = getGuide(slug)

  if (!guide) {
    return (
      <div className="guide-article">
        <SeoHead title="Guide not found | About Currency" description="The requested article was not found." path={`/guides/${slug}`} />
        <h1 className="header__title">Article not found</h1>
        <p><Link to="/guides">← Back to all guides</Link></p>
      </div>
    )
  }

  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3)
  const url = `${SITE_URL}/guides/${guide.slug}`

  return (
    <article className="guide-article">
      <SeoHead title={`${guide.title} | About Currency`} description={guide.description} path={`/guides/${guide.slug}`} type="article" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Guides', url: `${SITE_URL}/guides` },
        { name: guide.title, url },
      ]} />
      <ArticleSchema
        headline={guide.title}
        description={guide.description}
        url={url}
        datePublished={guide.updated}
        dateModified={guide.updated}
      />

      <nav className="guide-article__breadcrumb" aria-label="Breadcrumb">
        <Link to="/guides">Guides</Link>
        <span aria-hidden="true"> / </span>
        <span>{guide.category}</span>
      </nav>

      <header className="guide-article__header">
        <span className="guide-article__category">{guide.category}</span>
        <h1>{guide.title}</h1>
        <div className="guide-article__meta">
          <span>By the About Currency editorial team</span>
          <span aria-hidden="true">·</span>
          <span>{guide.readingMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>Updated {guide.updated}</span>
        </div>
      </header>

      <div className="guide-article__body">
        {guide.body.map(renderBlock)}
      </div>

      <footer className="guide-article__footer">
        <h2 className="guide-article__related-title">Keep reading</h2>
        <ul className="guides-index__grid">
          {related.map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} className="guide-card">
                <span className="guide-card__category">{g.category}</span>
                <h3 className="guide-card__title">{g.title}</h3>
                <p className="guide-card__description">{g.description}</p>
                <div className="guide-card__meta">
                  <span>{g.readingMinutes} min read</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}
