// Canonical Person records for guide bylines and ArticleSchema author field. Keyed by authorSlug; single author this sprint (D-01), future-proofed for guest contributors (D-08).

export const AUTHORS = {
  'lucas-azevedo-souza': {
    '@type': 'Person',
    name: 'Lucas Azevedo Souza',
    jobTitle: 'Editor and senior software engineer',
    url: 'https://currencyabout.com/about#author',
    description: 'Six years building production financial-systems software at banks and credit-data companies, applied to explaining mid-market currency reference rates and conversion math to non-traders.',
    bio: 'Lucas Azevedo Souza is a senior software engineer based in Andradina, Brazil. He works at Equifax, where he builds and optimizes debt-information APIs that financial institutions rely on to assess credit risk. Earlier, he spent more than five years on financial-systems teams at NBC Bank, C6 Bank, and Expense Mobi, where he built billing pipelines that process millions of records a day and migrated monolith services to microservices on AWS and GCP. He runs currencyabout.com as an independent reference site for travelers, freelancers, and small importers who want to understand the math behind a currency conversion.',
    knowsAbout: [
      'Foreign exchange',
      'Currency markets',
      'International payments',
      'Consumer finance',
      'Software engineering',
    ],
    external: {
      url: 'https://www.linkedin.com/in/oazevedolucas',
      text: 'Lucas Azevedo on LinkedIn',
    },
  },
}

export function getAuthor(slug) {
  return AUTHORS[slug] ?? null
}
