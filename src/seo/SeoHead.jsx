import { Helmet } from 'react-helmet-async'
import { useI18n } from '../i18n/I18nContext.jsx'

const SITE_URL = 'https://currencyabout.com'
const LANGS = ['en', 'pt', 'es', 'fr', 'de', 'zh', 'ja']

export function SeoHead({ title, description, path = '/', type = 'website' }) {
  const { lang } = useI18n()
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="About Currency" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Hreflang for all supported languages */}
      {LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={l === 'en' ? url : `${SITE_URL}/${l}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  )
}
