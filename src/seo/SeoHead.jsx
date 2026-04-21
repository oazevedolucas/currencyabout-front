import { Helmet } from 'react-helmet-async'
import { useI18n } from '../i18n/I18nContext.jsx'

const SITE_URL = 'https://currencyabout.com'
const OG_IMAGE = `${SITE_URL}/og-image.svg`
const LANGS = ['en', 'pt', 'es', 'fr', 'de', 'zh', 'ja']

export function SeoHead({ title, description, path = '/', type = 'website', noindex = false, image = OG_IMAGE }) {
  const { lang } = useI18n()
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="About Currency" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang:
         The site serves every language from the same URL (client-side language
         toggle, localStorage-persisted). We don't maintain /pt/, /es/ etc.
         sub-folders, so the previous per-language alternates were broken and
         would fail Google's bidirectional return-tag check.
         Per Google docs, a single URL serving multiple languages should either
         omit hreflang entirely or point each alternate to the same URL. We
         take the conservative path: x-default only. */}
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  )
}
