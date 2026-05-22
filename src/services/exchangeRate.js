const API_URL = 'https://open.er-api.com/v6/latest/BRL'
const CACHE_KEY = 'currencyabout_rates'

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

function readCache() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (cached.date === getTodayDate() && cached.rates) {
      return cached
    }
    return null
  } catch {
    return null
  }
}

function writeCache(rates) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
  try {
    const data = { date: getTodayDate(), rates, timestamp: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // ignore — private-mode browsers / storage blocked
  }
}

export async function fetchRates() {
  // SSR / build-time short-circuit: never contact the rates API during
  // vite-react-ssg's renderToString pass. Returning an empty payload
  // matches how the converter renders before its first client fetch
  // (loading state), so hydration finds the same shell on both sides.
  if (typeof window === 'undefined') {
    return { rates: {}, fromCache: false, date: '' }
  }

  const cached = readCache()
  if (cached) {
    return { rates: cached.rates, fromCache: true, date: cached.date }
  }

  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Erro ao buscar cotações: ${response.status}`)
  }

  const data = await response.json()
  if (data.result !== 'success') {
    throw new Error('API retornou erro')
  }

  writeCache(data.rates)
  return { rates: data.rates, fromCache: false, date: getTodayDate() }
}
