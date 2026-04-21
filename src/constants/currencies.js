export const CURRENCY_META = [
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷', symbol: 'R$', continent: 'Americas' },
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸', symbol: '$', continent: 'Americas' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦', symbol: 'C$', continent: 'Americas' },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: 'MX$', continent: 'Americas' },

  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€', continent: 'Europe' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧', symbol: '£', continent: 'Europe' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭', symbol: 'Fr', continent: 'Europe' },
  { code: 'NOK', name: 'Coroa Norueguesa', flag: '🇳🇴', symbol: 'kr', continent: 'Europe' },
  { code: 'SEK', name: 'Coroa Sueca', flag: '🇸🇪', symbol: 'kr', continent: 'Europe' },
  { code: 'DKK', name: 'Coroa Dinamarquesa', flag: '🇩🇰', symbol: 'kr', continent: 'Europe' },

  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵', symbol: '¥', continent: 'Asia' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳', symbol: '¥', continent: 'Asia' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: '🇰🇷', symbol: '₩', continent: 'Asia' },
  { code: 'INR', name: 'Rúpia Indiana', flag: '🇮🇳', symbol: '₹', continent: 'Asia' },
  { code: 'SGD', name: 'Dólar de Singapura', flag: '🇸🇬', symbol: 'S$', continent: 'Asia' },
  { code: 'HKD', name: 'Dólar de Hong Kong', flag: '🇭🇰', symbol: 'HK$', continent: 'Asia' },

  { code: 'AED', name: 'Dirham dos Emirados', flag: '🇦🇪', symbol: 'د.إ', continent: 'Middle East' },
  { code: 'SAR', name: 'Riyal Saudita', flag: '🇸🇦', symbol: '﷼', continent: 'Middle East' },
  { code: 'ILS', name: 'Shekel Israelense', flag: '🇮🇱', symbol: '₪', continent: 'Middle East' },

  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺', symbol: 'A$', continent: 'Oceania' },
  { code: 'NZD', name: 'Dólar Neozelandês', flag: '🇳🇿', symbol: 'NZ$', continent: 'Oceania' },
]

export const CONTINENT_ORDER = ['Americas', 'Europe', 'Asia', 'Middle East', 'Oceania']

export const CONTINENT_META = {
  'Americas': { icon: '🌎' },
  'Europe': { icon: '🇪🇺' },
  'Asia': { icon: '🌏' },
  'Middle East': { icon: '🕌' },
  'Oceania': { icon: '🏝️' },
}

export function getRate(currencies, fromCode, toCode) {
  const from = currencies.find((c) => c.code === fromCode)
  const to = currencies.find((c) => c.code === toCode)
  if (!from || !to || !from.rateToBRL || !to.rateToBRL) return 0
  return to.rateToBRL / from.rateToBRL
}
