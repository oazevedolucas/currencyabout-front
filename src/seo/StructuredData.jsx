import { Helmet } from 'react-helmet-async'
import { getAuthor } from '../content/authors.js'

export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function FAQSchema({ questions }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function ArticleSchema({ headline, description, url, datePublished, dateModified, authorSlug = 'lucas-azevedo-souza', author = 'About Currency Editorial Team' }) {
  // `author` (legacy string prop) is intentionally ignored after the D-12 upgrade;
  // it stays in the signature so any not-yet-migrated call site does not crash.
  void author
  const authorRecord = getAuthor(authorSlug) || getAuthor('lucas-azevedo-souza')
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorRecord.name,
      url: authorRecord.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    mainEntityOfPage: url,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function CurrencyPairSchema({ from, to, rate, date }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ExchangeRateSpecification',
    currency: to.code,
    currentExchangeRate: {
      '@type': 'UnitPriceSpecification',
      price: rate,
      priceCurrency: from.code,
    },
    exchangeRateSpread: 0,
    validFrom: date,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function FinancialProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'About Currency: Free Currency Converter',
    description: 'Mid-market reference rate converter for 21 world currencies, updated daily.',
    url: 'https://currencyabout.com',
    provider: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    category: 'Currency Conversion Tool',
    feesAndCommissionsSpecification: 'Free. No fees charged for currency conversion.',
    areaServed: 'Worldwide',
    termsOfService: 'https://currencyabout.com/terms',
    availableLanguage: ['en', 'pt', 'es', 'fr', 'de', 'zh', 'ja'],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function CurrencyConversionServiceSchema({ fromCode, toCode, fromName, toName }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'CurrencyConversion',
    name: `${fromCode} to ${toCode} Currency Converter`,
    description: `Convert ${fromName} to ${toName} using mid-market reference rates updated daily.`,
    provider: {
      '@type': 'Organization',
      name: 'About Currency',
      url: 'https://currencyabout.com',
    },
    areaServed: 'Worldwide',
    isAccessibleForFree: true,
    url: `https://currencyabout.com/${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`,
    termsOfService: 'https://currencyabout.com/terms',
    availableLanguage: ['en', 'pt', 'es', 'fr', 'de', 'zh', 'ja'],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
