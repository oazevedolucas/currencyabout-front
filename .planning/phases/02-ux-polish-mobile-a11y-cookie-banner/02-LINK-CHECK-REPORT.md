# Link check report — Phase 2 plan 02-02 T8

Both targets executed via `scripts/link-check.mjs` (zero-dependency Node ESM, SSRF guard documented in the script header). Final state: zero failures and zero redirect chains > 1 hop on both targets — no source-file fixes were necessary.

---

## Prod target

- Run at: 2026-05-21T01:54:34.616Z
- Base URL: https://currencyabout.com
- URLs from sitemap.xml: 39
- URLs from src/ grep: 13
- Total unique URLs checked: 41

### Failures (non-2xx)
(none)

### Redirect chains > 1 hop
(none)

### All URLs

| URL | Final status | Hops |
| --- | --- | --- |
| `https://currencyabout.com/` | 200 | 0 |
| `https://currencyabout.com/about` | 200 | 0 |
| `https://currencyabout.com/about#author` | 200 | 0 |
| `https://currencyabout.com/aud-to-brl` | 200 | 0 |
| `https://currencyabout.com/cad-to-brl` | 200 | 0 |
| `https://currencyabout.com/chf-to-brl` | 200 | 0 |
| `https://currencyabout.com/cny-to-brl` | 200 | 0 |
| `https://currencyabout.com/contact` | 200 | 0 |
| `https://currencyabout.com/converter` | 200 | 0 |
| `https://currencyabout.com/eur-to-brl` | 200 | 0 |
| `https://currencyabout.com/eur-to-usd` | 200 | 0 |
| `https://currencyabout.com/exchange-rates-today` | 200 | 0 |
| `https://currencyabout.com/gbp-to-brl` | 200 | 0 |
| `https://currencyabout.com/gbp-to-usd` | 200 | 0 |
| `https://currencyabout.com/guides` | 200 | 0 |
| `https://currencyabout.com/guides/best-time-to-exchange-currency` | 200 | 0 |
| `https://currencyabout.com/guides/bid-ask-spread-in-forex` | 200 | 0 |
| `https://currencyabout.com/guides/currency-conversion-fees-compared` | 200 | 0 |
| `https://currencyabout.com/guides/currency-strength-explained` | 200 | 0 |
| `https://currencyabout.com/guides/currency-volatility-explained` | 200 | 0 |
| `https://currencyabout.com/guides/floating-vs-fixed-exchange-rates` | 200 | 0 |
| `https://currencyabout.com/guides/hedge-basics-individuals-small-business` | 200 | 0 |
| `https://currencyabout.com/guides/how-central-banks-intervene` | 200 | 0 |
| `https://currencyabout.com/guides/how-exchange-rates-are-determined` | 200 | 0 |
| `https://currencyabout.com/guides/how-exchange-rates-work` | 200 | 0 |
| `https://currencyabout.com/guides/major-world-currencies` | 200 | 0 |
| `https://currencyabout.com/guides/sending-money-abroad` | 200 | 0 |
| `https://currencyabout.com/guides/spot-vs-forward-vs-swap` | 200 | 0 |
| `https://currencyabout.com/guides/top-factors-that-move-currency-markets` | 200 | 0 |
| `https://currencyabout.com/guides/understanding-euro` | 200 | 0 |
| `https://currencyabout.com/guides/understanding-us-dollar` | 200 | 0 |
| `https://currencyabout.com/inr-to-usd` | 200 | 0 |
| `https://currencyabout.com/jpy-to-brl` | 200 | 0 |
| `https://currencyabout.com/krw-to-usd` | 200 | 0 |
| `https://currencyabout.com/methodology` | 200 | 0 |
| `https://currencyabout.com/mxn-to-usd` | 200 | 0 |
| `https://currencyabout.com/privacy-policy` | 200 | 0 |
| `https://currencyabout.com/terms` | 200 | 0 |
| `https://currencyabout.com/usd-to-brl` | 200 | 0 |
| `https://currencyabout.com/usd-to-eur` | 200 | 0 |
| `https://currencyabout.com/usd-to-jpy` | 200 | 0 |

---

## Local target

- Run at: 2026-05-21T01:54:40.235Z
- Base URL: http://localhost:5173
- URLs from sitemap.xml: 39
- URLs from src/ grep: 13
- Total unique URLs checked: 41

### Failures (non-2xx)
(none)

### Redirect chains > 1 hop
(none)

### All URLs

| URL | Final status | Hops |
| --- | --- | --- |
| `http://localhost:5173/` | 200 | 0 |
| `http://localhost:5173/about` | 200 | 0 |
| `http://localhost:5173/about#author` | 200 | 0 |
| `http://localhost:5173/aud-to-brl` | 200 | 0 |
| `http://localhost:5173/cad-to-brl` | 200 | 0 |
| `http://localhost:5173/chf-to-brl` | 200 | 0 |
| `http://localhost:5173/cny-to-brl` | 200 | 0 |
| `http://localhost:5173/contact` | 200 | 0 |
| `http://localhost:5173/converter` | 200 | 0 |
| `http://localhost:5173/eur-to-brl` | 200 | 0 |
| `http://localhost:5173/eur-to-usd` | 200 | 0 |
| `http://localhost:5173/exchange-rates-today` | 200 | 0 |
| `http://localhost:5173/gbp-to-brl` | 200 | 0 |
| `http://localhost:5173/gbp-to-usd` | 200 | 0 |
| `http://localhost:5173/guides` | 200 | 0 |
| `http://localhost:5173/guides/best-time-to-exchange-currency` | 200 | 0 |
| `http://localhost:5173/guides/bid-ask-spread-in-forex` | 200 | 0 |
| `http://localhost:5173/guides/currency-conversion-fees-compared` | 200 | 0 |
| `http://localhost:5173/guides/currency-strength-explained` | 200 | 0 |
| `http://localhost:5173/guides/currency-volatility-explained` | 200 | 0 |
| `http://localhost:5173/guides/floating-vs-fixed-exchange-rates` | 200 | 0 |
| `http://localhost:5173/guides/hedge-basics-individuals-small-business` | 200 | 0 |
| `http://localhost:5173/guides/how-central-banks-intervene` | 200 | 0 |
| `http://localhost:5173/guides/how-exchange-rates-are-determined` | 200 | 0 |
| `http://localhost:5173/guides/how-exchange-rates-work` | 200 | 0 |
| `http://localhost:5173/guides/major-world-currencies` | 200 | 0 |
| `http://localhost:5173/guides/sending-money-abroad` | 200 | 0 |
| `http://localhost:5173/guides/spot-vs-forward-vs-swap` | 200 | 0 |
| `http://localhost:5173/guides/top-factors-that-move-currency-markets` | 200 | 0 |
| `http://localhost:5173/guides/understanding-euro` | 200 | 0 |
| `http://localhost:5173/guides/understanding-us-dollar` | 200 | 0 |
| `http://localhost:5173/inr-to-usd` | 200 | 0 |
| `http://localhost:5173/jpy-to-brl` | 200 | 0 |
| `http://localhost:5173/krw-to-usd` | 200 | 0 |
| `http://localhost:5173/methodology` | 200 | 0 |
| `http://localhost:5173/mxn-to-usd` | 200 | 0 |
| `http://localhost:5173/privacy-policy` | 200 | 0 |
| `http://localhost:5173/terms` | 200 | 0 |
| `http://localhost:5173/usd-to-brl` | 200 | 0 |
| `http://localhost:5173/usd-to-eur` | 200 | 0 |
| `http://localhost:5173/usd-to-jpy` | 200 | 0 |

---

## Re-run after fixes

Not applicable — the initial run on both targets was already clean (zero failures, zero multi-hop chains). No source-file edits were required; `src/App.jsx` route table is unchanged (grep diff confirms).
