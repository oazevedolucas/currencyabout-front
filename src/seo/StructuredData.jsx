import { Helmet } from 'react-helmet-async'

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
