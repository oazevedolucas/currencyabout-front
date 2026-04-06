export const CURRENCY_META = [
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧', symbol: '£' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭', symbol: 'Fr' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺', symbol: 'A$' },
  { code: 'NZD', name: 'Dólar Neozelandês', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'SGD', name: 'Dólar de Singapura', flag: '🇸🇬', symbol: 'S$' },
  { code: 'HKD', name: 'Dólar de Hong Kong', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'NOK', name: 'Coroa Norueguesa', flag: '🇳🇴', symbol: 'kr' },
  { code: 'SEK', name: 'Coroa Sueca', flag: '🇸🇪', symbol: 'kr' },
  { code: 'DKK', name: 'Coroa Dinamarquesa', flag: '🇩🇰', symbol: 'kr' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: '🇰🇷', symbol: '₩' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Rúpia Indiana', flag: '🇮🇳', symbol: '₹' },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: 'MX$' },
  { code: 'AED', name: 'Dirham dos Emirados', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Riyal Saudita', flag: '🇸🇦', symbol: '﷼' },
  { code: 'ILS', name: 'Shekel Israelense', flag: '🇮🇱', symbol: '₪' },
]

export function getRate(currencies, fromCode, toCode) {
  const from = currencies.find((c) => c.code === fromCode)
  const to = currencies.find((c) => c.code === toCode)
  if (!from || !to || !from.rateToBRL || !to.rateToBRL) return 0
  return to.rateToBRL / from.rateToBRL
}
