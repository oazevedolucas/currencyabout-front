// Editorial guides — original content, hand-written for currencyabout.com.
// Each guide is a structured article used to build the /guides section.

export const GUIDES = [
  {
    slug: 'how-exchange-rates-work',
    title: 'How Exchange Rates Work: A Plain-English Guide',
    description: 'Exchange rates shape the price of almost everything you buy from abroad. Here is how they are set, why they move, and what the numbers actually mean.',
    readingMinutes: 7,
    updated: '2026-04-20',
    category: 'Fundamentals',
    tags: ['basics', 'forex', 'education'],
    body: [
      { type: 'lead', text: 'An exchange rate is the price of one currency expressed in another. "1 USD = 5.02 BRL" means that, right now, one US dollar trades for 5.02 Brazilian reais. Simple on the surface — but the machinery behind that number touches every imported product, every online purchase in a foreign store, every trip abroad.' },
      { type: 'h2', text: 'Who sets the rate?' },
      { type: 'p', text: 'For most major currencies, no single entity "sets" the rate. Instead, it emerges from a global, always-on market where banks and financial institutions buy and sell currencies from each other. This interbank market is decentralized, open 24 hours on weekdays, and handles more than $7 trillion in daily volume, according to the Bank for International Settlements.' },
      { type: 'p', text: 'What you see quoted on sites like this one is the mid-market rate — the midpoint between the price at which banks are buying and selling. It is a reference point, not the rate you typically receive at the till.' },
      { type: 'h2', text: 'What moves a rate up or down?' },
      { type: 'p', text: 'Four big forces dominate day-to-day changes:' },
      { type: 'list', items: [
        'Interest rates. When a central bank raises rates, holding that currency becomes more attractive, and money flows in.',
        'Inflation. Currencies with high, persistent inflation tend to weaken against stable ones.',
        'Trade balances. Countries that export more than they import see foreign buyers constantly converting into their currency.',
        'Political and fiscal risk. Unexpected elections, debt defaults, or policy shifts can move rates several percent in a day.',
      ] },
      { type: 'h2', text: 'Mid-market vs. the rate you actually get' },
      { type: 'p', text: 'If you change currency at an airport kiosk, you might see a number 5%–12% worse than the mid-market. A credit card abroad typically adds 1%–3%. A modern remittance service may add 0.3%–1.5%. The difference is the provider\'s margin and fees — it is how they make money.' },
      { type: 'callout', text: 'Before a large conversion, compare the mid-market rate (shown here) against your provider\'s quote. If the gap is over 2%, you can probably do better.' },
      { type: 'h2', text: 'Why rates can differ between websites' },
      { type: 'p', text: 'You may see slightly different rates on different currency sites. Reasons include: different data sources, caching windows (many free tools refresh once or twice a day), rounding, and whether a site quotes mid-market vs. an indicative retail rate. A variance of 0.1%–0.5% between reputable reference sites is normal.' },
      { type: 'h2', text: 'A quick mental model' },
      { type: 'p', text: 'Think of a currency like a stock. Its price moves constantly based on supply, demand, and expectations about the issuing country. When the news says "the pound fell," it means traders collectively were willing to accept fewer dollars (or euros) per pound than the day before. That is it. Everything else — charts, analyst quotes, technical indicators — is commentary on that one movement.' },
      { type: 'h2', text: 'What this means for you' },
      { type: 'list', items: [
        'For small transactions (under $100), the exact rate barely matters. Convenience and fees dominate.',
        'For medium amounts ($100–$5,000), the rate matters — compare two or three providers.',
        'For large or recurring conversions, use a service that shows the mid-market rate and a transparent fee. Avoid any service that quotes a "rate" with no fee broken out.',
      ] },
      { type: 'p', text: 'Understanding the basics above protects you from the most common trap in foreign exchange: paying a hidden margin disguised as "zero fees". Now you know what to look for.' },
    ],
  },

  {
    slug: 'understanding-us-dollar',
    title: 'Understanding the US Dollar (USD): The World\'s Reserve Currency',
    description: 'The US dollar anchors more than 60% of global reserves and is on one side of nearly 90% of all foreign-exchange trades. Here is why.',
    readingMinutes: 8,
    updated: '2026-04-20',
    category: 'Currency Guides',
    tags: ['usd', 'dollar', 'reserve-currency'],
    body: [
      { type: 'lead', text: 'The US dollar (ISO code: USD, symbol: $) is the most important currency on the planet by almost any measure. It prices most commodities, settles most international trade, and sits in the reserves of virtually every central bank. This guide explains why — and what that means in practice when you convert money to or from USD.' },
      { type: 'h2', text: 'Basic facts' },
      { type: 'list', items: [
        'ISO code: USD',
        'Symbol: $ (sometimes US$ to distinguish from other dollar currencies)',
        'Subunit: 1 dollar = 100 cents',
        'Issuer: Federal Reserve (the "Fed") — the central bank of the United States',
        'First issued in current form: 1914 (Federal Reserve notes)',
      ] },
      { type: 'h2', text: 'Why the dollar dominates' },
      { type: 'p', text: 'Three overlapping reasons made USD the default global currency in the 20th century, and they keep it there today.' },
      { type: 'p', text: 'First, the Bretton Woods agreement (1944) pegged most major currencies to the dollar, which was itself pegged to gold. The gold peg ended in 1971, but the habit of quoting and settling international trade in dollars stuck.' },
      { type: 'p', text: 'Second, the United States has the deepest, most liquid financial markets in the world. When a Japanese insurer or a German pension fund needs a safe, liquid place to park reserves, US Treasury bonds are the natural home.' },
      { type: 'p', text: 'Third, oil and most other commodities are priced in dollars. A refinery in Korea buying crude from Saudi Arabia will almost always settle in USD. That creates constant global demand that no other currency rivals.' },
      { type: 'h2', text: 'What moves USD' },
      { type: 'p', text: 'When you watch USD against other currencies, the most common drivers are:' },
      { type: 'list', items: [
        'Federal Reserve interest-rate decisions (announced eight times a year).',
        'US inflation data (CPI, typically released mid-month).',
        'Non-farm payrolls (monthly jobs report, first Friday of each month).',
        'Safe-haven flows — during global crises, money often runs into the dollar, pushing it up.',
      ] },
      { type: 'h2', text: 'Converting to or from USD' },
      { type: 'p', text: 'Because USD is quoted against virtually every other currency, conversion costs are usually lower than for exotic pairs. If you are converting a major currency into dollars, you should expect a spread of 0.3%–1% from the mid-market rate at a competitive provider, and 1%–3% at a typical bank.' },
      { type: 'callout', text: 'Tip: if you are sending USD abroad, the recipient\'s bank often converts on arrival at its own — usually worse — rate. Ask whether you can send in the local currency instead.' },
      { type: 'h2', text: 'Currencies pegged or heavily linked to USD' },
      { type: 'p', text: 'Several currencies hold a formal or informal peg to USD, meaning their value only moves when the dollar does. Examples include the Hong Kong dollar (HKD), Saudi riyal (SAR), UAE dirham (AED), and Panamanian balboa. When you convert USD into one of these, the rate barely changes day to day.' },
      { type: 'h2', text: 'The future of dollar dominance' },
      { type: 'p', text: 'Some analysts argue that the euro, the Chinese yuan, or even a future digital-currency basket will eventually chip away at dollar hegemony. That may be true over decades. For practical purposes — travel, shopping, remittances, small business — USD will continue to be the most useful currency to know in the near term.' },
      { type: 'h2', text: 'Related pages' },
      { type: 'p', text: 'See live USD rates on our homepage, or jump to specific pairs: USD/EUR, USD/GBP, USD/JPY, USD/BRL, USD/CAD.' },
    ],
  },

  {
    slug: 'understanding-euro',
    title: 'Understanding the Euro (EUR): The Currency of 20 Nations',
    description: 'The euro is the second most-traded currency in the world and the official currency of 20 EU member states. Here is how it works and why it matters.',
    readingMinutes: 7,
    updated: '2026-04-20',
    category: 'Currency Guides',
    tags: ['eur', 'euro', 'europe'],
    body: [
      { type: 'lead', text: 'The euro (ISO code: EUR, symbol: €) is the second most-traded currency after the US dollar and the official currency of 20 European Union member states — collectively known as the eurozone. This guide covers what it is, who issues it, what moves it, and what to watch when converting to or from EUR.' },
      { type: 'h2', text: 'Basic facts' },
      { type: 'list', items: [
        'ISO code: EUR',
        'Symbol: €',
        'Subunit: 1 euro = 100 cents',
        'Issuer: European Central Bank (ECB), based in Frankfurt',
        'Launched: 1 January 1999 (electronic), 1 January 2002 (coins and notes)',
        'Used by: Austria, Belgium, Croatia, Cyprus, Estonia, Finland, France, Germany, Greece, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Portugal, Slovakia, Slovenia, Spain',
      ] },
      { type: 'h2', text: 'A single currency, 20 economies' },
      { type: 'p', text: 'The euro is unusual: a single currency shared by independent countries with very different economies. The ECB sets one interest rate that has to work for Germany and Greece, for France and Finland. This creates a tension that shapes much of euro-area politics and drives some of the euro\'s bigger movements against the dollar.' },
      { type: 'p', text: 'Countries that use the euro gave up control of their own monetary policy when they joined the eurozone. They can no longer devalue their currency independently — which makes their economies more integrated, but also more constrained in a crisis.' },
      { type: 'h2', text: 'What moves the euro' },
      { type: 'list', items: [
        'ECB interest-rate decisions (governing council meets eight times a year).',
        'Eurozone inflation data (flash estimate usually at month-end).',
        'Political events — elections in France, Germany, or Italy can all move EUR.',
        'Relative US-vs-eurozone economic strength. When the US grows faster than the eurozone, EUR/USD tends to fall.',
      ] },
      { type: 'h2', text: 'Converting to or from EUR' },
      { type: 'p', text: 'EUR is the second most liquid currency in the world, so spreads are typically narrow. You should expect under 1% at a competitive provider for any EUR-to-major conversion. Card transactions abroad in EUR often show a "dynamic currency conversion" option — always decline it and let your card issuer convert at their rate, which is usually much better.' },
      { type: 'callout', text: 'Inside the eurozone, there is no conversion between, say, French and Spanish prices — they are both in euros. That is the whole point of the single currency.' },
      { type: 'h2', text: 'EUR and non-eurozone EU countries' },
      { type: 'p', text: 'Not every EU country uses the euro. Denmark and Sweden have opted out. Bulgaria, Czech Republic, Hungary, Poland, and Romania plan to join eventually but keep their own currencies for now. When you travel to Prague (Czech Republic), you will need koruna, not euros — although many tourist-heavy shops accept euros at an unfavorable rate.' },
      { type: 'h2', text: 'The euro in global reserves' },
      { type: 'p', text: 'About 20% of global foreign-exchange reserves are held in euros, second only to USD. That makes EUR a key anchor currency for any country with meaningful trade with Europe — which is most of the world.' },
    ],
  },

  {
    slug: 'sending-money-abroad',
    title: 'How to Send Money Abroad: A Practical Guide for 2026',
    description: 'Banks, remittance services, fintech apps, cards — the options have never been wider or the price differences larger. Here is how to choose.',
    readingMinutes: 9,
    updated: '2026-04-20',
    category: 'How-to',
    tags: ['remittance', 'transfer', 'fees'],
    body: [
      { type: 'lead', text: 'Sending money across borders used to be slow, expensive, and opaque. It is still often expensive if you use the wrong tool — but the right tool can now move money in minutes at a cost close to the mid-market rate. This guide walks through the main options and how to compare them honestly.' },
      { type: 'h2', text: 'The true cost of an international transfer' },
      { type: 'p', text: 'Every international transfer has two costs: an explicit fee (shown to you) and an FX margin (hidden in the rate). A "zero fee" transfer with a 4% margin is worse than a transfer with a $5 fee and a 0.5% margin on most amounts.' },
      { type: 'p', text: 'To compare apples to apples, always look at: "How many units of the destination currency will land, total?" That single number cuts through the marketing.' },
      { type: 'h2', text: 'Option 1: Your bank' },
      { type: 'p', text: 'Using your bank\'s international wire transfer is the default for many people, and usually the most expensive choice. Expect fees of $15–$50 and FX margins of 2%–4%. Some banks also charge an intermediary-bank fee that gets deducted from the amount the recipient sees. For amounts under a few thousand dollars, banks almost always lose on price.' },
      { type: 'p', text: 'Banks are still worth using when: the recipient is also a customer of the same bank, the amount is very large and you need compliance paperwork, or regulatory requirements in one of the countries limit your options.' },
      { type: 'h2', text: 'Option 2: Remittance specialists' },
      { type: 'p', text: 'Services like Wise, Remitly, WorldRemit, OFX, and XE built their business on offering better rates than banks. Costs typically run 0.3%–1.5% all-in for major corridors, and transfers often arrive the same day.' },
      { type: 'p', text: 'Read the rate they show carefully — most specialists are transparent, but a few quote an inflated rate and hide the margin. Use the "how much will arrive" test.' },
      { type: 'h2', text: 'Option 3: Card payments' },
      { type: 'p', text: 'Paying with a credit or debit card in a foreign currency is not technically a "transfer," but it is the most common cross-border payment. Standard card networks (Visa, Mastercard) charge a network fee of about 0.2%–1% and your issuer usually adds 1%–3% on top. Travel-focused cards often reimburse or waive the issuer portion.' },
      { type: 'callout', text: 'If a foreign terminal asks whether to charge you in your home currency or the local currency, always choose the local currency. The "home currency" option uses a markup that is almost always worse than your card\'s own rate.' },
      { type: 'h2', text: 'Option 4: Peer-to-peer and crypto' },
      { type: 'p', text: 'For some corridors — particularly ones with strict capital controls or limited traditional infrastructure — people use peer-to-peer platforms or stablecoins. These can be cheap but carry counterparty, regulatory, and tax risk. They are not recommended unless you know what you are doing and understand the tax treatment in your country.' },
      { type: 'h2', text: 'How to choose' },
      { type: 'list', items: [
        'Under $500: pick whatever is fastest and most convenient. Cost differences are small in absolute terms.',
        '$500–$10,000: spend five minutes comparing 2–3 remittance specialists. You will typically save 1%–3% over a bank.',
        'Over $10,000: consider a dedicated FX broker who can quote a negotiated rate. For business volumes, this can be worth thousands per year.',
        'Recurring transfers (salary, rent, tuition): set up with a remittance specialist that has good API or scheduled-transfer support.',
      ] },
      { type: 'h2', text: 'A five-minute checklist before sending' },
      { type: 'list', items: [
        'Check the mid-market rate (for example, on this site).',
        'Get a quote from your provider.',
        'Calculate the total cost: fee + (mid-market rate − offered rate) × amount.',
        'Confirm how the recipient will be paid (bank deposit, cash pickup, wallet).',
        'Double-check the recipient name, account number, and country — transfers to the wrong account can be very hard to reverse.',
      ] },
      { type: 'p', text: 'A little shopping around genuinely pays. On a $5,000 transfer, the difference between a bank wire and a competitive specialist can easily be $100–$200.' },
    ],
  },

  {
    slug: 'best-time-to-exchange-currency',
    title: 'Best Time to Exchange Currency: What the Research Actually Says',
    description: 'Timing the market is famously hard. Here is what works, what does not, and how to think about when to convert.',
    readingMinutes: 6,
    updated: '2026-04-20',
    category: 'Strategy',
    tags: ['timing', 'strategy', 'forex'],
    body: [
      { type: 'lead', text: '"Should I convert now or wait?" is one of the most common questions people ask about foreign exchange. The honest answer is: usually you cannot predict short-term movements, but you can structure conversions so timing matters less. Here is what actually works.' },
      { type: 'h2', text: 'The bad news: short-term timing is close to a coin flip' },
      { type: 'p', text: 'Currency markets are famously difficult to predict over days or weeks. Professional traders — with access to real-time data, Bloomberg terminals, and teams of analysts — still get short-term directional calls wrong about half the time. If they cannot time it, you almost certainly cannot either.' },
      { type: 'p', text: 'That does not mean movements are random. They are driven by real information — interest-rate expectations, inflation releases, political events. But that information is priced in almost instantly when it arrives, so by the time you read it in the news, the rate has already adjusted.' },
      { type: 'h2', text: 'The good news: you rarely need to time anything' },
      { type: 'p', text: 'For most people converting money, the rate will fluctuate within a 1%–3% band over any given month. For a $500 conversion, that is the difference between converting today and waiting a month: maybe $5–$15. For a $5,000 conversion, it is $50–$150. For a $50,000 conversion, it is $500–$1,500.' },
      { type: 'p', text: 'If the amount matters to you, the smart move is usually not to try to pick the perfect day but to average your conversions over time — known as "dollar-cost averaging" in the investing world.' },
      { type: 'h2', text: 'Strategy 1: Convert what you need, when you need it' },
      { type: 'p', text: 'For trips, purchases, and remittances with a fixed deadline: convert the amount you need shortly before you need it. Trying to wait for a better rate can easily backfire, and the mental overhead is usually not worth the expected savings.' },
      { type: 'h2', text: 'Strategy 2: Split large amounts across time' },
      { type: 'p', text: 'For larger amounts — buying a home abroad, paying annual tuition, funding a long trip — split the conversion into 3–6 tranches spaced over weeks or months. This gets you the average rate over that window, which is statistically a very good outcome compared to picking a single day.' },
      { type: 'h2', text: 'Strategy 3: Rate alerts and limit orders' },
      { type: 'p', text: 'If you have a specific target in mind ("I\'ll convert when USD/BRL reaches 5.20"), most remittance specialists offer rate alerts or limit orders that execute automatically at a price you set. This removes the emotional component and lets you wait passively.' },
      { type: 'callout', text: 'Set the target at a rate you would be genuinely happy with — not the best rate of the past 5 years. Aim for the top quartile of the last 6–12 months and you will usually get filled within weeks or months.' },
      { type: 'h2', text: 'What about seasonality?' },
      { type: 'p', text: 'Some currencies show mild seasonal patterns. The Swiss franc historically strengthens in times of global risk-off. Commodity-linked currencies (AUD, CAD, BRL) often move with commodity-price cycles. But these effects are small, unreliable, and mostly already priced in. Do not structure a conversion around them.' },
      { type: 'h2', text: 'What about day-of-week or time-of-day?' },
      { type: 'p', text: 'Liquidity is lowest during the Asia overnight hours, which can cause slightly wider spreads. For retail conversion services, this rarely matters — they quote the same rate 24/7 within their caching window. Ignore advice that tells you to convert "on Tuesdays at 10 AM." The effect, if any, is microscopic.' },
      { type: 'h2', text: 'The best rule of thumb' },
      { type: 'p', text: 'Pick a competitive provider. Convert when you need the money. For large amounts, split over time. Do not lose sleep over day-to-day movements — the noise is bigger than the signal for almost everyone.' },
    ],
  },

  {
    slug: 'major-world-currencies',
    title: 'A Guide to the Major World Currencies',
    description: 'USD, EUR, JPY, GBP, CHF, CAD, AUD, CNY — the eight currencies that make up most of the world\'s foreign-exchange volume.',
    readingMinutes: 8,
    updated: '2026-04-20',
    category: 'Reference',
    tags: ['currencies', 'reference', 'fx-majors'],
    body: [
      { type: 'lead', text: 'The foreign-exchange market is enormous, but most of its volume concentrates in a surprisingly small set of currencies. Eight currencies together account for the overwhelming majority of daily FX turnover. If you understand these, you understand most of what goes on in global finance.' },
      { type: 'h2', text: 'The majors' },
      { type: 'p', text: 'The "majors" are the currencies of countries with the largest, most open capital markets. Trading them against USD has the deepest liquidity and the narrowest spreads.' },

      { type: 'h3', text: 'US Dollar (USD)' },
      { type: 'p', text: 'The global reserve currency. On one side of roughly 88% of all FX trades. Issued by the Federal Reserve. Covered in depth on our dedicated USD guide.' },

      { type: 'h3', text: 'Euro (EUR)' },
      { type: 'p', text: 'The currency of 20 EU member states. Second in global reserves and FX volume. Issued by the European Central Bank. The EUR/USD pair is the single most traded instrument in the world.' },

      { type: 'h3', text: 'Japanese Yen (JPY)' },
      { type: 'p', text: 'Third by FX volume. The Bank of Japan has maintained near-zero or negative interest rates for decades, which makes JPY a popular funding currency for "carry trades" — borrowing in yen to invest in higher-yielding currencies. Famous for moving sharply when global risk appetite shifts.' },

      { type: 'h3', text: 'British Pound (GBP)' },
      { type: 'p', text: 'The oldest still-used major currency. Issued by the Bank of England. Historically strong against most currencies. More volatile since 2016 due to Brexit-related news.' },

      { type: 'h3', text: 'Swiss Franc (CHF)' },
      { type: 'p', text: 'Considered one of the ultimate "safe haven" currencies. Switzerland\'s political neutrality and large foreign reserves mean CHF tends to rise during global crises. The Swiss National Bank has intervened repeatedly to prevent excessive appreciation.' },

      { type: 'h3', text: 'Canadian Dollar (CAD)' },
      { type: 'p', text: 'Often called the "loonie" after the bird on the $1 coin. Heavily correlated with oil prices and US economic activity.' },

      { type: 'h3', text: 'Australian Dollar (AUD)' },
      { type: 'p', text: 'Correlated with commodity exports (iron ore, coal, gold) and Chinese demand. Known in FX circles as a "risk-on" currency — it tends to rise when investors are optimistic.' },

      { type: 'h3', text: 'Chinese Yuan (CNY)' },
      { type: 'p', text: 'Technically managed by the People\'s Bank of China within a trading band. Less freely floating than other majors. Its offshore variant (CNH) trades more freely in Hong Kong. CNY\'s share of global payments has been growing steadily.' },

      { type: 'h2', text: 'Notable non-majors worth knowing' },
      { type: 'list', items: [
        'Brazilian Real (BRL) — the most important Latin American currency, volatile and commodity-linked.',
        'Indian Rupee (INR) — underpins the world\'s most populous country and a major remittance destination.',
        'Mexican Peso (MXN) — the most actively traded emerging-market currency.',
        'South Korean Won (KRW) — backed by one of Asia\'s largest and most tech-driven economies.',
        'Singapore Dollar (SGD) — managed as a "basket" against major trading partners, known for stability.',
      ] },

      { type: 'h2', text: 'How this helps you' },
      { type: 'p', text: 'Most people only need to think about two or three currencies day-to-day — their home currency, the one they travel with, and maybe USD or EUR. But understanding the broader landscape helps you make sense of news, spot cross-rate opportunities, and judge when a quoted rate seems off.' },
    ],
  },

  {
    slug: 'how-exchange-rates-are-determined',
    title: 'How Exchange Rates Are Determined: A Complete Guide',
    description: 'Beyond "supply and demand": a walk through the actual machinery that produces the exchange rates you see quoted every day, from the interbank market down to the rate on your card statement.',
    readingMinutes: 10,
    updated: '2026-05-15',
    category: 'Fundamentals',
    tags: ['fundamentals', 'forex', 'markets'],
    body: [
      { type: 'lead', text: 'Most explanations of exchange rates stop at "supply and demand." That is technically correct and practically useless. What you really need to know is the actual machinery: who quotes prices, where they trade, how those trades aggregate into the number on your screen, and which of those steps adds cost to your conversion. This guide walks through the full path.' },
      { type: 'h2', text: 'The interbank market is where prices begin' },
      { type: 'p', text: 'Almost every retail exchange rate you have ever seen ultimately traces back to one place: the interbank foreign exchange market. This is not a building. It is a global network of large banks and a small number of specialised non-bank market makers, connected through electronic trading platforms, that quote each other prices to buy and sell currencies in large volumes.' },
      { type: 'p', text: 'The interbank market is decentralised and open 24 hours from Monday morning in Sydney through Friday afternoon in New York. According to the Bank for International Settlements, it handles more than 7 trillion US dollars of average daily turnover. That figure dwarfs every other financial market combined, including all global equities and bonds.' },
      { type: 'h2', text: 'How a quoted rate actually forms' },
      { type: 'p', text: 'A bank willing to trade a currency at scale continuously streams two prices to its counterparties: a bid (the price at which it will buy) and an ask, sometimes called the offer (the price at which it will sell). The gap between bid and ask is the spread, and it represents the bank\'s compensation for warehousing the risk of holding a position.' },
      { type: 'p', text: 'What you see published as "the rate" on news sites or reference services is the midpoint between the best bid and best ask across the most active trading venues at a given instant. The industry calls this the mid-market or interbank rate. It is a useful reference because it is symmetrical: neither side has paid the spread yet.' },
      { type: 'p', text: 'Several forces determine how often that midpoint moves:' },
      { type: 'list', items: [
        'Order flow from large players. A pension fund hedging billions of dollars of foreign exposure can move a mid-market rate by several basis points within minutes.',
        'Macroeconomic releases. Interest-rate decisions, inflation prints, and major employment data trigger near-instant repricing in the millisecond range.',
        'Central-bank communication. A scheduled speech from a Fed chair or ECB president can move rates more than the actual policy decision a week later.',
        'Cross-border trade settlements. Real-economy demand for currencies, settling commercial contracts denominated in foreign units, shows up in the order book continuously.',
        'Algorithmic trading. A growing share of interbank volume is automated, which makes the market faster but also more prone to brief liquidity gaps when conditions shift.',
      ] },
      { type: 'h2', text: 'Spot, forward, and what your screen is showing' },
      { type: 'p', text: 'The interbank market trades several kinds of contracts, and it matters which one is feeding your data.' },
      { type: 'p', text: 'A spot rate is a price for an immediate exchange, typically settled two business days later. This is the rate you see on conversion sites, including this one. A forward rate is a price agreed today for an exchange that will happen at a specified future date. A swap is a combination of a spot trade and a forward trade in the opposite direction, used by banks to manage their currency funding.' },
      { type: 'p', text: 'For everyday use, spot is the only rate that matters. Forwards and swaps mostly affect businesses with future foreign-currency obligations. They are quoted as small adjustments to the spot rate, reflecting the interest-rate difference between the two currencies. We cover this distinction in more depth in the spot vs forward vs swap guide.' },
      { type: 'h2', text: 'Who actually trades currencies, and why it matters' },
      { type: 'p', text: 'The composition of trading flow shapes how predictable a currency is. Most interbank turnover comes from:' },
      { type: 'list', items: [
        'Commercial banks, both for their own positions and on behalf of corporate clients.',
        'Hedge funds and asset managers seeking returns or hedging foreign holdings.',
        'Multinational corporations converting revenue, paying suppliers, or hedging future cash flows.',
        'Central banks, occasionally, when they want to influence their own currency.',
        'Retail aggregators, the back end of every consumer FX app, routing accumulated client trades into the wholesale market.',
      ] },
      { type: 'p', text: 'Currencies dominated by trade flow, like the Singapore dollar or the Swiss franc, tend to be relatively stable, because trade payments are spread out and predictable. Currencies driven heavily by speculative positioning, like the Australian dollar or the Brazilian real, are usually more volatile. This composition is one of the underrated reasons why some currencies move so much more than others.' },
      { type: 'h2', text: 'What moves the rate within a single day' },
      { type: 'p', text: 'On any given trading day, an exchange rate is reset thousands of times by a combination of background flow and specific news. The most reliable intraday movers are:' },
      { type: 'list', items: [
        'Scheduled data releases. The US non-farm payrolls report (first Friday of the month) is the most consistently market-moving event in FX.',
        'Central-bank policy statements. Even small wording changes in a Fed or ECB statement can move a rate by half a percent within seconds.',
        'Surprise political events. An unexpected election outcome, a sanctions package, or a sovereign-debt rating change can move a rate by several percent in hours.',
        'Risk-on, risk-off shifts. When global stock markets sell off, money tends to rotate into perceived safe-haven currencies (USD, JPY, CHF) regardless of underlying news.',
      ] },
      { type: 'p', text: 'For deeper coverage of how political and economic events translate into currency moves, see our guide on the top factors that move currency markets.' },
      { type: 'h2', text: 'Why the rate on a tourist board or card statement is different' },
      { type: 'p', text: 'None of the rates discussed above are what a consumer pays. Once an interbank rate is established, it goes through several layers of markup before it reaches you:' },
      { type: 'list', items: [
        'Interbank pricing, where the mid-market rate originates, gets sold to wholesale FX providers.',
        'A wholesale provider feeds retail platforms (your bank, card network, or remittance app), adding a margin.',
        'The retail platform layers its own markup before quoting a rate to you.',
        'Local services (airport kiosks, hotel cashiers, tourist exchange booths) add yet another markup, plus a flat fee, before handing over physical currency.',
      ] },
      { type: 'p', text: 'By the time a rate reaches a tourist exchange board, it can be 5 to 12 percent worse than the underlying mid-market figure. By the time it reaches a competitive remittance app, it is typically 0.3 to 1.5 percent worse. The structural shape is the same in every channel. Only the size of the markup differs.' },
      { type: 'callout', text: 'To estimate how much your provider is taking, compare the rate they quote against the mid-market rate at the moment of the transaction. The difference, divided by the mid-market rate, is the all-in margin in percent. That single calculation cuts through almost every marketing claim about "zero-fee" FX.' },
      { type: 'h2', text: 'The role of central banks' },
      { type: 'p', text: 'Central banks influence exchange rates through three main channels. They set short-term interest rates, which determines the return on holding a currency. They communicate forward guidance about future policy, which moves the rate immediately even when no policy has actually changed yet. And in a small number of cases, they intervene directly in the FX market, buying or selling their own currency in size to push the rate in a desired direction.' },
      { type: 'p', text: 'Most major central banks (the Federal Reserve, the European Central Bank, the Bank of England, the Bank of Japan) intervene only rarely. Some, like the Swiss National Bank or the People\'s Bank of China, are more active. The pattern and rationale for those interventions is covered in our guide on how central banks intervene in currency markets.' },
      { type: 'h2', text: 'How to read a quote sensibly' },
      { type: 'p', text: 'With all of the above in mind, a few principles will keep you from being misled:' },
      { type: 'list', items: [
        'The mid-market rate is the only fair reference point. Anything else is someone\'s retail price.',
        'A "live" rate on a consumer site is at best the mid-market rate from a few minutes ago. Spot data in the interbank market is genuinely instantaneous, but consumer feeds always lag.',
        'Two reputable sources can show slightly different rates at the same moment. Variances under half a percent are normal and reflect different data feeds or refresh windows.',
        'If a provider does not show its margin separately from the rate, assume the margin is built into the rate. Use a mid-market reference (you can get it on the home page of this site) to back it out.',
      ] },
      { type: 'p', text: 'Understanding how a rate is determined does not let you predict where it is going next. Nothing reliably does that over short horizons, as we cover in our guide on the best time to exchange currency. But it does let you read every rate you see with confidence, separate signal from marketing, and avoid paying more than you need to.' },
    ],
  },

  {
    slug: 'currency-strength-explained',
    title: 'Currency Strength Explained: What "Strong" and "Weak" Really Mean',
    description: 'When a headline says a currency is strong or weak, what is it actually measured against? Here is how analysts define currency strength, how the BIS and major banks measure it, and what those numbers mean for travel, transfers, and prices.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'Fundamentals',
    tags: ['strength', 'indices', 'fundamentals'],
    body: [
      { type: 'lead', text: 'When a news outlet reports that the dollar is strong or the yen is weak, the framing sounds simple. In practice, strength is always a comparative idea, and how it is measured changes the picture you get. This guide explains what currency strength actually means, how analysts and central banks measure it, and what those measurements imply when you are converting, travelling, or pricing a foreign purchase.' },

      { type: 'h2', text: 'Strong against what?' },
      { type: 'p', text: 'A currency cannot be strong on its own. It is always strong or weak relative to another currency, a basket of currencies, or its own past values. When you read that the US dollar rose 2% this week, that figure is usually quoted against a specific peer or index. A dollar that strengthens 3% against the Japanese yen can simultaneously weaken 1% against the Swiss franc on the same day. Treating "the dollar is strong" as a single fact, instead of as a relationship, is the first habit worth dropping.' },

      { type: 'h2', text: 'Three ways professionals actually measure strength' },
      { type: 'p', text: 'Day to day, traders watch bilateral pairs. The cleanest example is EUR/USD, the most heavily traded pair in the world. A move from 1.10 to 1.08 represents the dollar strengthening by roughly 1.8% against the euro within that window.' },
      { type: 'p', text: 'For a broader view, analysts use a trade-weighted index. The most familiar to retail readers is the US Dollar Index (DXY), which measures USD against a fixed basket of six developed-economy currencies: EUR, JPY, GBP, CAD, SEK, and CHF, with the euro getting the largest weight at about 58%. DXY is convenient, but it ignores most of the emerging-market world, including the Chinese yuan, the Mexican peso, and the Indian rupee.' },
      { type: 'p', children: [
        'The most rigorous measure is the real effective exchange rate (REER), maintained by central banks and the Bank for International Settlements. It weights a currency against dozens of trading partners by actual trade flow, then adjusts for inflation differentials. The BIS publishes monthly REER series for more than 60 currencies on its ',
        { href: 'https://www.bis.org/statistics/eer.htm', text: 'effective exchange rate statistics page' },
        '. REER answers the question that travel and trade actually care about: how much foreign output one unit of this currency buys today, compared with its long-term average.',
      ] },

      { type: 'h2', text: 'What makes a currency strengthen' },
      { type: 'p', text: 'Sustained strength tends to come from a small set of drivers:' },
      { type: 'list', items: [
        'Interest-rate differentials. When a central bank raises rates above its peers, holding that currency earns more, and capital tends to flow in.',
        'Persistent current-account surpluses. Countries that export more than they import generate steady foreign demand for their own currency.',
        'Safe-haven status. In global crises, money rotates into a small set of currencies (USD, CHF, JPY) regardless of relative interest rates.',
        'Confidence in institutions. Independent central banks, predictable rule of law, and credible fiscal policy quietly support a currency for decades.',
      ] },
      { type: 'p', children: [
        'For the underlying mechanics behind any individual price move, see our guide on ',
        { to: '/guides/how-exchange-rates-are-determined', text: 'how exchange rates are determined' },
        '.',
      ] },

      { type: 'h2', text: 'Common mistakes when reading strength stories' },
      { type: 'p', text: 'Two patterns trip up readers more than any others.' },
      { type: 'p', text: 'First, confusing a strong currency with a strong economy. The two often diverge. The Japanese yen has been weak through most of the past decade despite Japan being the third largest economy in the world. The Swiss franc has been remarkably strong despite Switzerland being a comparatively small economy. Strength reflects monetary conditions and capital flows, not GDP.' },
      { type: 'p', text: 'Second, anchoring on a recent peak. If a headline says the pound is weak, the implicit comparison may be against its level a year ago, a decade ago, or its all-time high. A 5% drop from a recent high can still leave a currency well above its 10-year average. Before acting on a "weak currency" framing, check where the rate sits in its 12-month range, not just its 30-day move.' },
      { type: 'callout', text: 'A rule of thumb. If you are converting an amount that matters to you, a single-day move of 0.5% in either direction is noise. A sustained move of 2% or more across a week is signal worth checking your provider against the mid-market rate. Anything between is a coin flip not worth losing sleep over.' },

      { type: 'h2', text: 'What strength actually means for you' },
      { type: 'p', children: [
        'For travellers, a stronger home currency means cheaper trips abroad. A 5% appreciation against the destination currency cuts roughly 5% off every restaurant meal, hotel night, and museum ticket. On a $3,000 holiday, that works out to about $150 in real savings, before any provider margin. Run the comparison on our ',
        { to: '/', text: 'live converter' },
        ' before you book.',
      ] },
      { type: 'p', text: 'For online shoppers, the effect is similar but compresses across the year. A USD that strengthens 8% against the euro over six months makes German cookware, Italian shoes, and French wine roughly 8% cheaper for a US buyer, all else equal. For an annual European-goods budget of $2,000, that is around $160 of recovered purchasing power.' },
      { type: 'p', children: [
        'For people sending money abroad, the picture flips. A stronger home currency means each unit converts into more of the destination currency, so the same monthly remittance lands as a larger amount. Over a year, a 3% to 5% currency-strength swing can be the difference between a recipient receiving 11 months of support or 12. Our guide on ',
        { to: '/guides/sending-money-abroad', text: 'how to send money abroad' },
        ' covers how to capture that benefit without giving it back in fees.',
      ] },
      { type: 'p', text: 'For freelancers and contractors invoicing in a foreign currency, strength works against you. A stronger home currency reduces the value of a foreign invoice once it lands in your account. If a meaningful share of your income is foreign-currency, this is one of the few cases where currency strength is worth tracking actively rather than passively.' },

      { type: 'h2', text: 'A practical playbook' },
      { type: 'p', text: 'A few specific habits separate readers who use strength data well from those who get only noise out of it:' },
      { type: 'list', items: [
        'Pick one reference. Use DXY for headline reading, the BIS REER series for a deeper look. Do not flip between measures hoping to find one that confirms a feeling.',
        'Check the 12-month range, not the 30-day move, before describing a currency as strong or weak. Most multi-decade fluctuations sit inside a 10% to 20% band.',
        'For amounts under a few hundred dollars, ignore strength stories entirely. The expected swing is smaller than the spread you pay any provider.',
        [
          'For amounts above several thousand, set a target rate and let it execute. Most reputable remittance specialists support rate alerts and limit orders, as covered in ',
          { to: '/guides/best-time-to-exchange-currency', text: 'the best time to exchange currency' },
          '.',
        ],
        'Treat headline "strong" or "weak" framings as a starting point, not a verdict. Always confirm against the live mid-market rate before transacting.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For a primer on how rates form in the first place, see ',
        { to: '/guides/how-exchange-rates-work', text: 'how exchange rates work' },
        '. For currency-specific context, the ',
        { to: '/guides/major-world-currencies', text: 'major world currencies guide' },
        ' covers the eight currencies that dominate global trade and the ones against which most other rates are quoted.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'floating-vs-fixed-exchange-rates',
    title: 'Floating vs Fixed Exchange Rate Systems Explained',
    description: 'Some currencies float freely against the dollar; others are pegged or managed inside narrow bands. Here is how each system works, what it costs the country running it, and what it means for your conversions.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'Fundamentals',
    tags: ['systems', 'monetary-policy', 'fundamentals'],
    body: [
      { type: 'lead', text: 'There are roughly 180 national currencies in active use today, and they are not all managed the same way. Some move freely against the dollar minute by minute. Others have not changed by more than a few cents in years because their central bank actively prevents it. This guide walks through the main exchange-rate regimes, the trade-offs each one imposes on the country running it, and what each regime means in practice when you are exchanging money.' },

      { type: 'h2', text: 'The three regimes, simplified' },
      { type: 'p', text: 'In its purest form, an exchange-rate regime is a choice about who decides the price of a currency. A floating regime lets the market decide. A fixed regime lets the central bank decide. Most countries sit somewhere in between, managing the rate inside a band or against a basket while letting normal market forces operate the rest of the time.' },

      { type: 'h2', text: 'How a floating regime works' },
      { type: 'p', text: 'In a pure floating system, the central bank does not commit to any particular level. The currency trades against others continuously on the interbank market, with the rate set by the balance of supply and demand from importers, exporters, investors, and speculators. The majority of major currencies operate this way: USD, EUR, GBP, JPY, AUD, CAD, NZD, CHF.' },
      { type: 'p', text: 'Floating regimes give a country two big advantages. The central bank keeps full control of domestic interest-rate policy, because it never has to defend a particular exchange rate. And the currency acts as a shock absorber: in a downturn, the rate tends to weaken, exports become more competitive, and recovery can come faster than under a fixed regime.' },
      { type: 'p', text: 'The cost is uncertainty. Importers, exporters, and households face exchange-rate risk that they may have to hedge or simply absorb. For very small or very open economies, that volatility can be painful enough that policymakers prefer the alternative.' },

      { type: 'h2', text: 'How a fixed peg actually holds' },
      { type: 'p', text: 'In a fixed system, the central bank commits to maintaining the exchange rate at a specific level (or inside a very narrow band) against another currency or a basket. It does this by standing ready to buy or sell its own currency in size at the chosen rate. Hong Kong has held a tight peg of HKD to USD since 1983. Saudi Arabia pegs SAR to USD. Several Caribbean and Gulf currencies operate similarly.' },
      { type: 'p', text: 'A peg holds as long as the central bank has the reserves and the political will to defend it. When market pressure mounts, defending the peg means burning through foreign reserves to buy back the domestic currency. If reserves run out, or the political cost of high domestic interest rates becomes too great, the peg breaks. The history of FX is studded with examples: the UK leaving the European Exchange Rate Mechanism in 1992, several Asian pegs breaking in 1997, the Argentine convertibility plan ending in 2002, Switzerland abandoning its EUR/CHF floor in 2015.' },

      { type: 'h2', text: 'The middle ground: managed floats and crawling pegs' },
      { type: 'p', text: 'Most countries do not run pure systems. They run intermediate regimes, where the rate is allowed to move within wider bands, or against a basket of trade partners, or along a pre-announced glide path. China runs a managed float of the yuan against a basket. Singapore manages SGD against a trade-weighted basket. Vietnam and several other emerging markets use crawling pegs that allow gradual depreciation.' },
      { type: 'p', text: 'The International Monetary Fund classifies these arrangements every year and publishes them in its Annual Report on Exchange Arrangements and Exchange Restrictions, usually shortened to AREAER. The classifications are useful for spotting which currencies are genuinely market-driven and which are not.' },

      { type: 'callout', text: 'What this means for you. If you regularly convert a currency that is on a hard peg, daily fluctuations will be minuscule, and timing the conversion barely matters. If you convert a managed-float currency, expect occasional sharp moves when the band is reset. If you convert a free-floating currency, daily moves of 0.3% to 1% are normal background noise.' },

      { type: 'h2', text: 'When pegs break: the warning signs' },
      { type: 'p', text: 'For anyone holding savings in a pegged currency or doing business across one, the early warning signs of regime stress are worth knowing. None is a guarantee, but each shows up repeatedly in historical breakdowns.' },
      { type: 'list', items: [
        'Falling foreign-exchange reserves, especially if depletion accelerates over weeks rather than months.',
        'A widening gap between the official rate and any parallel or black-market rate.',
        'Capital controls being tightened or extended (a sign that the peg cannot hold without restricting outflows).',
        'Sustained current-account deficits without a corresponding capital inflow.',
        'A political crisis or election that threatens the credibility of central-bank independence.',
      ] },

      { type: 'h2', text: 'Common misconceptions' },
      { type: 'p', text: 'Two confusions come up repeatedly.' },
      { type: 'p', text: 'First, a stable currency is not the same as a strong currency. A peg can be stable but at a level that is widely considered overvalued, and stability under those conditions usually ends with a devaluation. Stability is a process; strength is a level.' },
      { type: 'p', text: 'Second, floating does not mean unmanaged. Even free-floating currencies see occasional central-bank intervention through verbal signals, forward guidance, or coordinated buying and selling among major central banks. The machinery is covered in our guide on central-bank intervention.' },

      { type: 'h2', text: 'Practical takeaways' },
      { type: 'p', children: [
        'For travel and small remittances, the regime mostly affects how volatile your conversion will feel day to day. For business decisions and large transfers, it affects whether you can lock a rate, how much hedging cost you should expect, and how confident you should be in published forecasts. To check a live rate before any decision, use the ',
        { to: '/', text: 'converter on the home page' },
        '.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'The ',
        { to: '/guides/major-world-currencies', text: 'major world currencies guide' },
        ' notes which of the top currencies are free-floating and which are managed. For more on direct central-bank action, see ',
        { to: '/guides/how-central-banks-intervene', text: 'how central banks intervene in currency markets' },
        '. The IMF publishes the regime classifications used by analysts on its ',
        { href: 'https://www.imf.org/en/Publications/Annual-Report-on-Exchange-Arrangements-and-Exchange-Restrictions', text: 'AREAER page' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'top-factors-that-move-currency-markets',
    title: 'Top Factors That Move Currency Markets',
    description: 'Interest rates, inflation, politics, capital flows. Here are the forces that actually move major currency pairs, ranked by how reliably each one shows up in real price action.',
    readingMinutes: 8,
    updated: '2026-05-18',
    category: 'Markets',
    tags: ['drivers', 'markets', 'macro'],
    body: [
      { type: 'lead', text: 'Open any morning\'s FX news and you will see a dozen explanations for why a currency moved overnight. Most are decorative. The forces that actually produce sustained currency moves are surprisingly stable across decades. This guide ranks them by how often they show up in the price action, and explains how to weigh each one when you read a headline.' },

      { type: 'h2', text: '1. Interest-rate differentials and central-bank policy' },
      { type: 'p', text: 'No other variable matches the consistency of relative interest rates. When one central bank raises its policy rate above another, money tends to flow toward the higher-yielding currency, all else equal. The reverse holds when the gap narrows. Most large daily moves in major pairs (EUR/USD, USD/JPY, GBP/USD) can be traced to a shift in market expectations about a future central-bank decision.' },
      { type: 'p', text: 'Watch for the difference between what the central bank actually does and what the market already expected. A 0.25-point rate hike that everyone anticipated may produce almost no FX reaction. A pause from a bank that was expected to hike can move a pair 1% to 2% in minutes.' },

      { type: 'h2', text: '2. Inflation and the real interest rate' },
      { type: 'p', text: 'Headline interest rates only tell half the story. What actually matters is the real interest rate: the nominal rate minus expected inflation. A country with a 5% policy rate and 6% inflation is offering a negative real return, and capital tends to flow out. A country with a 3% policy rate and 1% inflation is offering a positive real return and tends to attract capital.' },
      { type: 'p', text: 'For this reason, the monthly inflation print in major economies is one of the highest-impact data releases in FX. Surprises of even 0.1 to 0.3 percentage points against the consensus forecast can move a major pair noticeably within seconds.' },

      { type: 'h2', text: '3. Trade balances and capital flows' },
      { type: 'p', text: 'Countries that run persistent current-account surpluses generate ongoing demand for their own currency as foreign buyers pay for exports. Germany, Japan, and Switzerland have run surpluses for decades, supporting their currencies over the long run. Countries with persistent deficits (the United States, the United Kingdom, much of southern Europe at various points) lean on inbound capital flows to balance things out.' },
      { type: 'p', text: 'Capital flows can be more volatile than trade flows. A change in global risk appetite can produce sudden inflows or outflows of portfolio capital, moving emerging-market currencies in particular by several percent over weeks.' },

      { type: 'h2', text: '4. Risk appetite and safe-haven demand' },
      { type: 'p', text: 'In periods of global stress, money rotates into a small set of currencies regardless of relative interest rates: the US dollar, the Swiss franc, the Japanese yen. The mechanism is part fundamental (deep liquid markets, strong institutions) and part behavioural (these flows have happened reliably for so long that they have become self-fulfilling).' },
      { type: 'p', text: 'The clearest signal that risk-off is the dominant driver is when several apparently unrelated currencies move in the same direction at once, with the safe havens up and the high-yielders and commodity currencies down.' },

      { type: 'h2', text: '5. Politics, debt sustainability, and sovereign risk' },
      { type: 'p', text: 'Election surprises, fiscal blow-ups, debt downgrades, sanctions, and political crises can produce some of the largest single-day moves in FX history. Most are unpredictable. What you can do is recognise the regime: when politics is the dominant story, volatility tends to be higher, spreads wider, and timing decisions riskier. A currency in a political crisis can move 5% to 10% in a single session.' },

      { type: 'h2', text: '6. Speculative positioning and technicals' },
      { type: 'p', text: 'Hedge funds and large speculators can push a currency around for short periods, especially in less liquid pairs. Pure-technical factors (moving averages, breakouts, options barriers) also produce intraday reactions. These effects tend to be smaller and shorter-lived than the macro drivers above, but they explain a meaningful fraction of intra-week noise.' },

      { type: 'callout', text: 'How these stack up over different horizons. Over a single day, news flow and positioning dominate. Over a month, interest-rate expectations and inflation data take the lead. Over a year or more, structural factors (current-account balances, real interest rates, institutional credibility) explain most of the move. If you are timing a conversion in days, watch the news. If you are budgeting in months, watch the rate differentials. If you are planning over years, do not bother predicting.' },

      { type: 'h2', text: 'Common mistakes when reading FX news' },
      { type: 'p', text: 'A few habits separate readers who get useful signal from those who get only noise.' },
      { type: 'list', items: [
        'Do not assume the headline explanation is the real driver. Reporters tend to fit a narrative to whatever moved overnight; check whether interest-rate expectations or inflation data actually shifted.',
        'Do not over-weight one-day moves. Most daily moves under 0.5% are noise that retraces within a week.',
        'Do not confuse a currency-specific story (a political crisis in one country) with a global one (risk-off across the board). The right hedge or timing strategy depends on which it is.',
      ] },

      { type: 'h2', text: 'A weekly check that covers most of the work' },
      { type: 'list', items: [
        'Look at the calendar for central-bank meetings and major inflation releases in the pair you care about. Most of the predictable volatility happens around these.',
        'Check the 12-month range of the rate, not just the latest move. Most pairs revisit their range repeatedly.',
        'When risk-off is dominant globally (equity markets falling sharply), expect the safe havens to be bid against everything else.',
        'For amounts that matter, spread the conversion across two or three sessions to average through single-event volatility.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For the underlying market machinery, see ',
        { to: '/guides/how-exchange-rates-are-determined', text: 'how exchange rates are determined' },
        '. For why some currencies move more than others under the same conditions, see ',
        { to: '/guides/currency-volatility-explained', text: 'why some currencies move more than others' },
        '. The ',
        { href: 'https://www.bis.org/publ/rpfx22.htm', text: 'BIS Triennial Central Bank Survey' },
        ' is the standard reference for FX market structure and turnover.',
      ] },

      { type: 'p', children: [
        'For a quick look at today\'s reference rates across 20+ currencies, use the ',
        { to: '/', text: 'live converter' },
        ' on the home page.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'currency-conversion-fees-compared',
    title: 'Currency Conversion Fees: How Banks and Apps Compare',
    description: 'Banks, cards, fintech apps, kiosks, and brokers all charge in different ways. Here is how the typical fee structures break down, and which channel is cheapest for which use case.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'How-to',
    tags: ['fees', 'comparison', 'how-to'],
    body: [
      { type: 'lead', text: 'Two people sending $1,000 from the United States to Brazil can end up paying anywhere from a few dollars to nearly $80, depending on which channel they use. The difference is rarely about the headline fee. It is about the FX margin, the routing, and one or two settings most people never check. This guide walks through every common conversion channel, what it actually costs, and when each one is the right tool.' },

      { type: 'h2', text: 'The three components of any conversion cost' },
      { type: 'p', text: 'Every currency conversion charges you in some combination of three ways:' },
      { type: 'list', items: [
        'A headline fee. Usually a fixed amount per transaction, sometimes a percentage. This is the cost most users notice first.',
        'An FX margin. The gap between the mid-market rate and the rate you actually receive. This is where most consumer FX revenue comes from, and it is invisible unless you compare quotes side by side.',
        'Routing or correspondent costs. Particularly on international wires, intermediary banks can deduct unannounced fees of $10 to $40 from the amount that lands.',
      ] },
      { type: 'p', text: 'When you compare providers, the only honest test is the final number: how many units of the destination currency will the recipient actually receive. Anything else is marketing.' },

      { type: 'h2', text: 'Major banks: the default and usually the worst' },
      { type: 'p', text: 'A traditional bank wire is the default for many people, especially for larger amounts. It is almost always the most expensive route on a per-dollar basis. Typical costs: a $15 to $50 outbound fee, an FX margin of 2% to 4%, sometimes a $10 to $30 intermediary deduction on arrival, and occasionally an additional inbound fee at the recipient bank.' },
      { type: 'p', text: 'Banks are worth using when the recipient is at the same institution, when the amount is genuinely large (six figures or more, where they may negotiate the margin), or when regulatory requirements in one of the countries force you down this path. For everything else, they typically lose on price.' },

      { type: 'h2', text: 'Credit and debit cards abroad' },
      { type: 'p', text: 'Card payments in a foreign currency are the most common cross-border transactions worldwide. The cost has two layers. The card network (Visa, Mastercard, American Express) sets a wholesale rate close to mid-market plus 0.2% to 1%. The issuing bank then adds a foreign-transaction fee, typically 1% to 3%. Travel-focused cards waive or reimburse the issuer portion, which is what makes them cheaper.' },
      { type: 'p', text: 'A separate trap is dynamic currency conversion (DCC), where the foreign terminal asks whether to charge you in your home currency or the local currency. Always choose the local currency. DCC almost always builds in a 3% to 8% markup that goes to the terminal operator rather than the card network.' },

      { type: 'h2', text: 'Fintech and remittance specialists' },
      { type: 'p', text: 'Services like Wise, Remitly, WorldRemit, OFX, and Revolut built their business specifically on being cheaper than banks. All-in costs for major corridors typically run 0.3% to 1.5%, with no intermediary deductions because the routing is internal. Funds usually arrive within a business day; some corridors arrive within minutes.' },
      { type: 'p', text: 'The trade-off is product breadth. A bank can wire to almost any country in the world. A given remittance specialist may only serve a subset of corridors well, and pricing can vary substantially between corridors even at the same provider.' },

      { type: 'h2', text: 'Multi-currency accounts and wallets' },
      { type: 'p', text: 'Some accounts let you hold balances in multiple currencies and convert between them on demand at near-mid-market rates. Examples include Wise multi-currency accounts, Revolut Premium plans, and offerings from Citi Global Wallet and HSBC Global Money. For people with recurring foreign-currency income or expenses, these can collapse multiple conversion fees into one cheaper one.' },

      { type: 'h2', text: 'Exchange kiosks' },
      { type: 'p', text: 'Airport kiosks, hotel cashiers, and tourist exchange booths are consistently the most expensive way to change money. Margins of 5% to 12% are standard, sometimes higher in resort and airport locations. They survive on convenience and on travellers who do not realise a competing card payment a few feet away would be 3% to 8% cheaper.' },

      { type: 'h2', text: 'A side-by-side comparison' },
      { type: 'p', text: 'Putting numbers on these channels for a hypothetical $1,000 conversion:' },
      { type: 'list', items: [
        'Bank wire: total cost roughly 2.5% to 4.5% of the amount, sometimes more once intermediary fees are counted.',
        'Standard credit card abroad: roughly 1.5% to 3% all-in, depending on issuer.',
        'Travel-fee-free card: roughly 0.2% to 1% all-in (the network spread only).',
        'Modern remittance specialist: roughly 0.3% to 1.5% all-in.',
        'Airport kiosk: roughly 5% to 12% all-in.',
      ] },
      { type: 'p', text: 'On $1,000, the gap between best and worst is roughly $50 to $110. On $10,000, it is $500 to $1,100. The relative ranking is remarkably stable across corridors and over time.' },

      { type: 'callout', text: 'Before any large conversion, run a simple test. Get a quote from your provider, multiply your amount by the mid-market rate (shown on this site), and calculate the difference as a percentage. Anything more than about 2% on a major corridor is worth a second quote from a specialist.' },

      { type: 'h2', text: 'Common mistakes' },
      { type: 'list', items: [
        'Comparing only fees, not the rate. A zero-fee transfer with a 4% margin loses to a $5 fee with a 0.5% margin on every amount above about $130.',
        'Choosing dynamic currency conversion at the terminal. It is almost never the cheaper option, despite being presented that way.',
        'Assuming the same provider is best for every corridor. The same fintech may be excellent for USD to EUR and mediocre for USD to PHP.',
        'Ignoring delivery method. The same dollar amount can arrive as a bank deposit, a cash pickup, or a mobile-wallet credit, and pricing differs across methods.',
      ] },

      { type: 'h2', text: 'A practical workflow' },
      { type: 'p', text: 'For most readers, three habits cover almost every situation:' },
      { type: 'list', items: [
        'Use a travel-fee-free card for in-person spending abroad. Decline DCC at every terminal.',
        'Use a competitive remittance specialist for international transfers above a few hundred dollars. Compare two providers for amounts above a few thousand.',
        'Use a multi-currency account if you have recurring foreign-currency cash flows. The convenience is real and the cost is usually low.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For deeper coverage of international transfers specifically, see ',
        { to: '/guides/sending-money-abroad', text: 'how to send money abroad' },
        '. For why providers all build margins into the rate, see ',
        { to: '/guides/how-exchange-rates-work', text: 'how exchange rates work' },
        '. Corridor-level cost data is published by the World Bank ',
        { href: 'https://remittanceprices.worldbank.org/', text: 'Remittance Prices Worldwide' },
        ' tracker. To check today\'s mid-market rate before any conversion, use the ',
        { to: '/', text: 'live converter' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'bid-ask-spread-in-forex',
    title: 'Understanding Bid-Ask Spread in Forex',
    description: 'The gap between what a market will pay you for a currency and what it will charge you to buy it back is the spread. Here is what determines it, where it shows up in your conversion cost, and how to use it.',
    readingMinutes: 7,
    updated: '2026-05-18',
    category: 'Fundamentals',
    tags: ['spread', 'mechanics', 'fundamentals'],
    body: [
      { type: 'lead', text: 'Every quote in foreign exchange is really two quotes: a bid and an ask. The gap between them is where most of the cost of an FX transaction lives, even when no explicit fee is charged. Understanding the spread is the single concept that lets you read every retail rate the same way and judge instantly whether a quote is competitive or quietly overpriced.' },

      { type: 'h2', text: 'Bid and ask, in plain terms' },
      { type: 'p', text: 'When a market quotes a currency pair, it shows two prices. The bid is what the market will pay you if you sell the base currency. The ask (sometimes called the offer) is what the market will charge you if you buy. The bid is always lower than the ask. The gap between them is the spread, and it represents the market-maker\'s compensation for warehousing risk.' },
      { type: 'p', text: 'For example, if EUR/USD is quoted 1.0830 by 1.0832, the market will buy euros from you at 1.0830 and sell them to you at 1.0832. The spread is two pips (the standard FX unit is one ten-thousandth of a major pair). On a $10,000 conversion, that two-pip spread amounts to about $2.' },

      { type: 'h2', text: 'What determines the size of a spread' },
      { type: 'p', text: 'Spreads are not random. Four factors explain most of the variation.' },
      { type: 'list', items: [
        'Liquidity. The more active the trading in a pair, the tighter the spread. EUR/USD and USD/JPY routinely trade at sub-one-pip spreads in interbank size. Exotic pairs (USD/TRY, USD/ZAR, USD/PHP) typically trade at 5 to 50 pips, sometimes wider.',
        'Volatility. When a market is moving fast, spreads widen because market-makers need a bigger cushion to cover the risk of being run over. Major data releases and central-bank announcements regularly widen spreads by a factor of 2 to 10 for a few minutes.',
        'Hours. Liquidity ebbs around the Asia overnight handover. Spreads widen modestly during those hours, even in the majors.',
        'Counterparty size and channel. Banks quote tighter spreads to large institutional counterparties than to small retail clients. By the time a price reaches a consumer app, it has accumulated several layers of widening.',
      ] },

      { type: 'h2', text: 'Spreads on major pairs vs exotic pairs' },
      { type: 'p', text: 'Major pairs (EUR/USD, USD/JPY, GBP/USD, USD/CHF, USD/CAD, AUD/USD, NZD/USD) trade with the tightest spreads in the world because they account for the bulk of global FX turnover. In the retail world, you can find brokers offering 0.1 to 0.5-pip spreads on EUR/USD during active hours.' },
      { type: 'p', text: 'Cross-pairs that involve two major currencies but not the dollar (EUR/GBP, EUR/JPY, GBP/JPY) trade slightly wider. Pairs involving emerging-market currencies trade considerably wider, with retail spreads of 10 to 100 pips not unusual.' },

      { type: 'h2', text: 'Retail spreads vs interbank spreads' },
      { type: 'p', text: 'The spread an interbank dealer sees on EUR/USD might be a fraction of a pip. The spread a bank shows a retail wire-transfer customer on the same pair might be 100 to 400 pips, packaged as a rate with no explicit fee. The difference is the margin the bank earns on the transaction.' },
      { type: 'p', text: 'Consumer-facing services translate the spread into different formats. A fintech app may show you the mid-market rate plus an explicit percentage fee. A bank may show you a single rate with the margin baked in. The total cost is the same kind of calculation in both cases; only the presentation differs.' },

      { type: 'h2', text: 'Spreads on weekends and outside major hours' },
      { type: 'p', text: 'The interbank market closes for the weekend from late Friday New York time to early Monday morning Sydney time. Retail platforms that quote weekend rates do so on an indicative basis, with much wider spreads or with the spread baked into a less favourable rate. For non-urgent conversions, executing during the Tuesday-to-Thursday window when major sessions overlap typically gives the tightest available rate.' },

      { type: 'h2', text: 'A live test you can run yourself' },
      { type: 'p', children: [
        'Pick a currency pair you actually convert and check three quotes within a minute: the mid-market rate on a reference site (you can use the ',
        { to: '/', text: 'live converter' },
        ' on this site), the buy and sell rates at your bank, and the buy and sell rates at a remittance specialist. The two retail spreads, expressed as a percentage of the mid-market rate, are the all-in costs of using each provider. Most readers find the bank spread is 5 to 15 times wider than the specialist spread on major pairs.',
      ] },

      { type: 'h2', text: 'Common mistakes when judging spreads' },
      { type: 'list', items: [
        'Comparing a single quote against the mid-market without checking whether you can also sell at that rate. A provider that buys at 1.0830 and sells at 1.0930 is showing you a 100-pip spread, not the 1.0880 midpoint.',
        'Comparing spreads across very different times of day. A pair that looks tight during the London session can show a much wider spread during Asia hours; check during the time you actually transact.',
        'Forgetting that a fee-free service still has a spread. Zero explicit fee is not zero cost.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For the broader machinery that produces these prices, see ',
        { to: '/guides/how-exchange-rates-are-determined', text: 'how exchange rates are determined' },
        '. For a channel-by-channel cost comparison, see ',
        { to: '/guides/currency-conversion-fees-compared', text: 'how banks and apps compare on conversion fees' },
        '. The ',
        { href: 'https://www.bis.org/publ/rpfx22.htm', text: 'BIS Triennial Central Bank Survey' },
        ' is the standard reference for market structure, turnover, and spread dynamics across pairs.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'how-central-banks-intervene',
    title: 'How Central Banks Intervene in Currency Markets',
    description: 'Central banks do not just set interest rates. They can also buy and sell currency directly to push the market. Here is how it works, why some banks do it more than others, and what readers should watch for.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'Markets',
    tags: ['intervention', 'central-banks', 'markets'],
    body: [
      { type: 'lead', text: 'On a Wednesday in January 2015, the Swiss National Bank announced without warning that it would no longer defend a long-standing floor on the euro against the franc. Within minutes, EUR/CHF fell by roughly 30%. Hedge funds blew up. Several retail brokers went bust. The episode is the cleanest illustration of a single principle: central banks influence currencies, until suddenly they decide not to.' },

      { type: 'h2', text: 'Three tools central banks have' },
      { type: 'p', text: 'When people say a central bank is intervening in the currency market, they can mean any of three different things, and the distinction matters.' },
      { type: 'list', items: [
        'Interest-rate policy. The most common tool, and indirectly the most powerful. Raising rates relative to peers attracts capital and tends to strengthen the currency; cutting them does the reverse.',
        'Forward guidance and verbal intervention. Public statements from senior officials about likely future policy. Often moves the rate immediately, even though no transaction has happened.',
        'Direct FX intervention. Buying or selling the domestic currency on the open market to push the rate in a chosen direction.',
      ] },
      { type: 'p', text: 'Only the third counts as intervention in the strict sense. The other two are policy tools that happen to affect the FX market.' },

      { type: 'h2', text: 'How a direct FX intervention works mechanically' },
      { type: 'p', text: 'A central bank that wants to weaken its currency sells the domestic currency for foreign currency on the open market, usually in large clip sizes, sometimes coordinated with the central banks of major trading partners. The effect is to flood the market with the domestic currency, pushing its price down. A bank that wants to strengthen its currency does the opposite: it sells foreign reserves and buys back its own currency.' },
      { type: 'p', text: 'Intervention can be sterilised or unsterilised. A sterilised intervention is offset by an opposite open-market operation, so the domestic money supply stays unchanged; only the FX market is affected. An unsterilised intervention leaves the money supply altered, which has knock-on effects on domestic interest rates and inflation. Most modern interventions in major economies are sterilised.' },

      { type: 'h2', text: 'Which central banks intervene the most' },
      { type: 'p', text: 'Among major economies, the most active interveners over the past two decades have been the Bank of Japan (especially around episodes of sharp yen appreciation), the Swiss National Bank (around the franc as a safe haven), and the People\'s Bank of China (which manages the yuan against a basket). The Federal Reserve and the European Central Bank rarely intervene directly in their own currencies, although they have done so a handful of times in coordinated actions.' },
      { type: 'p', text: 'Smaller economies intervene much more frequently. Many emerging-market central banks intervene routinely to dampen volatility, build reserves, or manage capital flows. The pattern is so common that volatility in emerging-market FX is meaningfully lower than it otherwise would be because of constant central-bank presence.' },

      { type: 'h2', text: 'When forward guidance moves a rate without any actual policy' },
      { type: 'p', text: 'Some of the largest single-day moves in FX history have been triggered by speeches or written statements, with no policy change at all. A line in a Federal Reserve statement that hints at slower future rate hikes can move EUR/USD by 1% to 2% within seconds. An ECB press conference where the president sounds slightly more or less hawkish than expected can move the euro by similar magnitudes.' },
      { type: 'p', text: 'Verbal intervention is cheap and effective when the central bank is credible. It loses power if the bank repeatedly fails to follow through on what it implied.' },

      { type: 'h2', text: 'When interventions stick, and when they fail' },
      { type: 'p', text: 'A simple framework for judging whether an intervention will hold:' },
      { type: 'list', items: [
        'Is it consistent with the underlying fundamentals? An intervention pushing a currency toward its fair-value range tends to stick. One pushing against fundamentals tends to fail eventually.',
        'Is it coordinated? Joint interventions by several major central banks have a higher success rate than unilateral ones because they signal a global view.',
        'How large are the reserves involved? Defending an overvalued peg with finite reserves is essentially a deadline. The market knows this and tests the bank.',
        'How clear is the communication? Surprise interventions get larger initial moves; signalled ones get more durable ones.',
      ] },

      { type: 'callout', text: 'The 2015 Swiss franc case is the textbook reminder that the question is never simply "will this peg hold" but "for how long, and at what cost to the central bank?" When the SNB removed the EUR/CHF floor, it did so because defending it any longer would have required printing francs at a pace it considered incompatible with its inflation mandate. The peg was breakable from day one; the only question was the trigger.' },

      { type: 'h2', text: 'How to read intervention signals as a non-trader' },
      { type: 'p', text: 'For people who convert money rather than trade it, two practical implications follow.' },
      { type: 'p', text: 'First, currencies under active intervention pressure can move sharply with little warning when policy shifts. If you hold savings in a managed-float or pegged currency, regime stress is the largest tail risk you face. Watch the warning signs: falling reserves, gaps with parallel rates, tightening capital controls.' },
      { type: 'p', text: 'Second, around scheduled central-bank events (FOMC, ECB, BoJ meetings), spreads widen and rates can jump several tenths of a percent within minutes. For non-urgent conversions, executing the day before or two days after a meeting often produces a tighter spread than executing during the announcement window.' },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For regime distinctions and what makes a peg breakable in the first place, see ',
        { to: '/guides/floating-vs-fixed-exchange-rates', text: 'floating vs fixed exchange rate systems explained' },
        '. For the underlying macro drivers that intervention often tries to counter, see ',
        { to: '/guides/top-factors-that-move-currency-markets', text: 'top factors that move currency markets' },
        '. The ',
        { href: 'https://www.bis.org/publ/quarterly.htm', text: 'BIS Quarterly Review' },
        ' regularly publishes research on FX intervention practice across central banks. To check today\'s rates before any decision, use the ',
        { to: '/', text: 'live converter' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'hedge-basics-individuals-small-business',
    title: 'Hedge Basics for Individuals and Small Businesses',
    description: 'You do not need to be a trader to hedge currency risk. For individuals and small businesses with foreign-currency income or expenses, a handful of simple techniques cover most of the practical risk.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'How-to',
    tags: ['hedging', 'risk', 'how-to'],
    body: [
      { type: 'lead', text: 'Freelancers paid in dollars from American clients. Retirees with US dividends that fund euro expenses. Small importers ordering in yuan and selling in pounds. None of these people think of themselves as currency traders, yet all of them carry currency risk, and all can manage it with techniques that take minutes to set up. This guide walks through what hedging means for non-professionals, when each tool is appropriate, and what the trade-offs are.' },

      { type: 'h2', text: 'What hedging actually means' },
      { type: 'p', text: 'Hedging is the act of reducing your exposure to a future currency move by locking in a rate now or by offsetting a foreign-currency obligation with a matching foreign-currency asset. It is not speculation. A speculator takes on currency risk hoping to profit. A hedger removes currency risk to make outcomes more predictable.' },
      { type: 'p', text: 'The mental model that helps the most: hedging is insurance. You are paying a small, known cost (a spread, a forward premium, or some carrying overhead) to remove a larger, unknown risk. Like insurance, it is often the right call even when, after the fact, you would have been better off without it.' },

      { type: 'h2', text: 'The four risks an individual or small business typically faces' },
      { type: 'list', items: [
        'Transaction risk. You have agreed a price in one currency but will be paid or pay in another. The exchange rate may move between agreement and settlement.',
        'Translation risk. Your assets, debts, or income are in a foreign currency, and your reporting currency moves against them over time.',
        'Operating risk. Your business model depends on a stable cost or price in a foreign currency, and a large currency move would change the economics of what you sell.',
        'Lifestyle risk. You earn in one currency and spend in another (the freelancer-with-foreign-clients case, or the cross-border retiree).',
      ] },
      { type: 'p', text: 'Different tools fit different risks. Most individuals only need to think about transaction risk and lifestyle risk.' },

      { type: 'h2', text: 'Natural hedging: the cheapest tool you already have' },
      { type: 'p', text: 'The simplest hedge is to match foreign-currency income against foreign-currency expenses. A freelancer paid in dollars who pays an American hosting bill, an American software subscription, and an American business expense out of the same dollar balance has hedged that portion of their income at zero cost. The currency only matters when funds finally need to be converted to the home currency.' },
      { type: 'p', text: 'For most people with cross-border cash flows, natural hedging covers more risk than they realise. Auditing where your foreign-currency money actually has to leave the foreign-currency rail is the first hedging exercise worth doing.' },

      { type: 'h2', text: 'Multi-currency accounts as a partial hedge' },
      { type: 'p', text: 'Multi-currency accounts and wallets (Wise, Revolut, several bank offerings) let you hold balances in different currencies and convert only when you want to. This is not a hedge in the strict sense, because the balance is still exposed to the underlying currency, but it gives you control over the timing of the conversion, which is the next-most-valuable tool after natural hedging.' },

      { type: 'h2', text: 'Forward contracts and rate locks' },
      { type: 'p', text: 'A forward contract is an agreement to exchange currencies at a specified rate on a specified future date. For an individual with a known future obligation (paying tuition in dollars next September, buying a flat in euros at completion in three months), a forward lets you lock in today\'s rate plus or minus a small adjustment for the interest-rate differential between the two currencies.' },
      { type: 'p', text: 'Many remittance specialists and some banks now offer rate locks or future-dated transfers that work like forwards for retail clients, typically for 30 to 90 days. The cost is the spread embedded in the locked rate, which is usually small for major pairs and significantly wider for emerging-market pairs.' },
      { type: 'p', children: [
        'Forwards are explained in more depth in our ',
        { to: '/guides/spot-vs-forward-vs-swap', text: 'spot vs forward vs swap guide' },
        '.',
      ] },

      { type: 'h2', text: 'Splitting conversions across time' },
      { type: 'p', text: 'For recurring conversions (a monthly salary, a quarterly invoice, an annual tuition payment), spreading the conversion into multiple tranches at regular intervals averages out the rate. This is the FX equivalent of dollar-cost averaging in investing. It will not give you the best rate, but it eliminates the worst-rate outcomes and reduces variance dramatically.' },

      { type: 'h2', text: 'Hedge ratios: how much is too little or too much' },
      { type: 'p', text: 'A common mistake is treating hedging as an all-or-nothing decision. In practice, partial hedges often make sense. A business with $100,000 of expected foreign-currency revenue over the next six months might hedge 30% to 70% of it: enough to take the worst-case outcome off the table without paying to hedge a position that could equally turn favourable.' },
      { type: 'p', text: 'For individuals, a sensible rule of thumb is to hedge the portion of your foreign-currency exposure that you cannot afford to absorb the volatility of. Anything beyond that becomes a directional bet.' },

      { type: 'h2', text: 'A concrete example' },
      { type: 'p', text: 'Consider a freelancer earning $5,000 per month in USD with monthly expenses of about €4,500 in EUR. Without any hedge, every month\'s real income depends on the EUR/USD rate at the moment of conversion. A 5% swing means roughly $250 of variability per month, or around $3,000 a year.' },
      { type: 'p', text: 'A natural hedge cuts that risk to whatever portion of the income actually needs to be in EUR (perhaps $4,500 of the $5,000, leaving $500 in USD for retirement or US-denominated investments). A multi-currency account lets them convert when the rate looks favourable rather than reflexively on the day the invoice arrives. A 90-day rate lock on the converted portion eliminates the timing risk altogether for a small spread cost.' },

      { type: 'callout', text: 'A rule of thumb for whether to bother hedging. If a 5% to 10% currency move would meaningfully change your monthly budget or your business margin, hedge. If it would be uncomfortable but absorbable, partial hedge or accept the variability. If it would barely register, the hedging cost is probably not worth paying.' },

      { type: 'h2', text: 'Common mistakes when individuals try to hedge' },
      { type: 'list', items: [
        'Confusing speculation with hedging. Taking a directional bet on a currency move is not the same as offsetting an existing exposure. Be honest about which you are doing.',
        'Over-hedging. Hedging more than your actual exposure creates new risk rather than reducing it.',
        'Using leveraged retail FX products as hedges. They are speculation tools, not hedges, and the leverage usually amplifies losses faster than gains.',
        'Forgetting tax treatment. Forward-contract gains and losses can be taxed differently than spot conversions in some jurisdictions. Check before structuring anything material.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For timing strategies without forwards, see ',
        { to: '/guides/best-time-to-exchange-currency', text: 'the best time to exchange currency' },
        '. For the cost of the conversion itself, see ',
        { to: '/guides/currency-conversion-fees-compared', text: 'currency conversion fees compared' },
        '. The ',
        { href: 'https://www.bis.org/wpapers.htm', text: 'BIS working paper series' },
        ' covers retail and corporate hedging practice in more depth. To check live mid-market rates before structuring any hedge, use the ',
        { to: '/', text: 'live converter' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'spot-vs-forward-vs-swap',
    title: 'Spot vs Forward vs Swap Explained',
    description: 'Three contract types account for almost all currency trading. Here is the difference between spot, forward, and swap deals, when each one applies, and what the distinction means for a non-trader.',
    readingMinutes: 8,
    updated: '2026-05-18',
    category: 'Fundamentals',
    tags: ['contracts', 'spot', 'forward', 'swap'],
    body: [
      { type: 'lead', text: 'Walk into a bank\'s FX dealing desk and you will hear three words constantly: spot, forward, swap. These are the three contract types that account for the overwhelming majority of currency trading worldwide. Understanding them turns a quoted rate from a single mysterious number into something you can interrogate, and explains why the price you see on a chart is not always the price someone is paying behind the scenes.' },

      { type: 'h2', text: 'Spot: the price for immediate exchange' },
      { type: 'p', text: 'A spot trade is an agreement to exchange one currency for another at a price agreed now, with settlement typically two business days later (T+2). Most major pairs settle T+2; USD/CAD and USD/MXN settle T+1 because of the time zones involved. The spot rate you see published on any conversion site, including this one, refers to the price for this kind of transaction.' },
      { type: 'p', text: 'In practice, retail conversions are almost always priced off the spot rate, even though the actual cash movement may follow a different timeline (a card payment, a wire, a remittance). The spot rate is the universal reference; everything else is a markup or routing choice on top.' },

      { type: 'h2', text: 'Forward: a price agreed today for a future exchange' },
      { type: 'p', text: 'A forward contract locks in an exchange rate today for a transaction that will settle on a chosen future date, usually anywhere from one week to one year out. The buyer of a forward commits to delivering one currency and receiving the other at the agreed rate on that date, regardless of where the spot rate has moved in the meantime.' },
      { type: 'p', text: 'Forwards exist because real-world cash flows almost never line up perfectly with the spot settlement window. A company expecting a euro invoice payment in 90 days, an importer who has just bid for goods priced in yen, a homebuyer scheduled to close in dollars next quarter: each has a future currency need that can be locked in today with a forward.' },

      { type: 'h2', text: 'Swap: spot and forward bolted together' },
      { type: 'p', text: 'An FX swap is a simultaneous spot and forward in opposite directions. Imagine a bank that needs to hold euros for the next month but also needs dollars in the meantime: it can swap by selling euros for dollars at today\'s spot rate, and agreeing to reverse the transaction at a forward rate in 30 days. The bank ends up with the dollar liquidity it needs without taking on a net FX position.' },
      { type: 'p', text: 'Swaps are the workhorse of bank treasury operations. They account for more than half of all global FX turnover according to the BIS Triennial Survey. Most retail customers never directly transact a swap, but the rates banks quote to retail clients are influenced by swap-market funding costs.' },

      { type: 'h2', text: 'How forward points are calculated' },
      { type: 'p', text: 'The forward rate is not a forecast. It is a mathematical adjustment to the spot rate, derived from the interest-rate differential between the two currencies. If you can earn higher interest holding currency A than currency B, the forward rate for A against B will be lower than the spot rate by enough to offset the rate gap. Otherwise an arbitrage opportunity would exist.' },
      { type: 'p', text: 'For major pairs over short tenors, forward points are usually a small adjustment, on the order of fractions of a percent. For pairs involving high-interest-rate emerging-market currencies, the forward points can be very large, reflecting the carry the market demands to hold the high-rate currency.' },

      { type: 'h2', text: 'A worked example: hedging a 6-month invoice' },
      { type: 'p', text: 'Suppose a UK exporter has just invoiced a US buyer for $250,000, payable in 6 months. The exporter\'s costs are in pounds, and they care about GBP, not USD. Without a hedge, they bear 6 months of GBP/USD risk.' },
      { type: 'p', text: 'With a 6-month forward, the exporter agrees today to sell $250,000 in 6 months at a forward rate close to the current spot, adjusted by a few basis points for the interest-rate differential. When the customer pays, the exporter delivers the dollars and receives a known pound amount. The 6-month FX uncertainty is gone. The cost is the small spread embedded in the forward price.' },

      { type: 'h2', text: 'NDFs and where they show up' },
      { type: 'p', text: 'For currencies that are not freely convertible (the Chinese yuan onshore, the Indian rupee, the Brazilian real, several others), the international market uses non-deliverable forwards (NDFs). NDFs settle in dollars based on the difference between the agreed forward rate and the prevailing spot rate at maturity, without any actual exchange of the restricted currency. NDFs allow foreign investors and businesses to hedge currency exposure they could not hedge through deliverable forwards.' },

      { type: 'h2', text: 'When does a non-trader meet each of these?' },
      { type: 'list', items: [
        'A spot rate is what you see on this site, what your card uses to convert a foreign purchase, and what a remittance specialist quotes for a same-day transfer.',
        'A forward shows up when a remittance provider offers a rate lock for a future transfer, when a bank offers a fixed-rate window on a corporate FX line, or when a business buys an explicit forward contract.',
        'A swap rarely shows up directly to retail users, but swap-market funding costs are why holding a balance in a foreign currency overnight at some brokerages incurs a daily rollover charge or credit.',
      ] },

      { type: 'h2', text: 'Common mistakes around forwards' },
      { type: 'list', items: [
        'Treating a forward rate as a forecast. It is not. A forward rate that implies a 10% depreciation over 12 months reflects an interest-rate differential, not market consensus that the currency will fall.',
        'Hedging speculative rather than committed exposures. A forward is a binding commitment; if your expected cash flow does not materialise, you still have to deliver the currency.',
        'Forgetting the credit dimension. A forward contract carries counterparty credit risk for the duration. Standard with a major bank, less so with smaller providers.',
      ] },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For why and how to use forwards as a non-trader, see ',
        { to: '/guides/hedge-basics-individuals-small-business', text: 'hedge basics for individuals and small businesses' },
        '. For the underlying machinery that produces the spot rate in the first place, see ',
        { to: '/guides/how-exchange-rates-are-determined', text: 'how exchange rates are determined' },
        '. The ',
        { href: 'https://www.bis.org/publ/rpfx22.htm', text: 'BIS Triennial Survey' },
        ' publishes detailed turnover figures across spot, forward, and swap instruments. To check today\'s spot rate, use the ',
        { to: '/', text: 'live converter' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },

  {
    slug: 'currency-volatility-explained',
    title: 'Currency Volatility: Why Some Currencies Move More Than Others',
    description: 'The Singapore dollar barely moves on most days. The Brazilian real can shift 2% in an afternoon. The difference is structural, and it has direct implications for how you should plan a conversion.',
    readingMinutes: 9,
    updated: '2026-05-18',
    category: 'Fundamentals',
    tags: ['volatility', 'emerging-markets', 'fundamentals'],
    body: [
      { type: 'lead', text: 'Two currencies can both float yet behave nothing like each other. The Singapore dollar barely moves on most days. The Brazilian real can shift 2% in an afternoon. The Argentine peso has, in some periods, swung in double digits within a single trading session. None of this is random. The reasons are structural, and once you see them, you can guess which currencies will be calm or wild without ever looking at a chart.' },

      { type: 'h2', text: 'What volatility actually measures' },
      { type: 'p', text: 'In FX, volatility usually means the realised standard deviation of returns over some recent window: daily, weekly, monthly. A pair with realised annual volatility of 8% has typically moved within roughly plus-or-minus 8% of its starting value over the course of a year. Implied volatility, derived from option prices, is the market\'s forecast of future realised volatility; for major pairs, it can be looked up from any FX options data feed.' },
      { type: 'p', text: 'For practical purposes, volatility is just the typical size of a daily move. The euro-dollar pair averages roughly 0.4% to 0.6% per day. The dollar-Brazil pair averages closer to 1% to 1.5%. The dollar against several frontier-market currencies can average 2% or more.' },

      { type: 'h2', text: 'The structural drivers of currency volatility' },
      { type: 'p', text: 'Five factors explain most of the differences in volatility across currencies.' },
      { type: 'list', items: [
        'Trade composition. Countries that depend heavily on a small number of commodity exports see their currencies swing with those commodity prices. Norway with oil, Australia with iron ore, Chile with copper, Brazil with a basket of commodities.',
        'Capital-account openness. The more freely capital can flow in and out, the more responsive the currency is to shifts in global risk sentiment. Currencies with capital controls move less, but with bigger discrete adjustments when the controls bend.',
        'Domestic financial-market depth. Countries with deep, liquid domestic bond and equity markets absorb capital flows internally; the currency feels less of the pressure. Smaller markets transmit more flow into the FX rate.',
        'Central-bank credibility and reserves. A central bank with abundant reserves and a clear inflation mandate can dampen volatility through credible policy. One with depleted reserves or political constraints cannot.',
        'External debt structure. Countries with significant foreign-currency debt have their currency move more in response to global financing conditions, because foreign-currency liabilities create one-directional buying or selling pressure.',
      ] },

      { type: 'h2', text: 'Why majors move less than emerging markets' },
      { type: 'p', text: 'The eight major currencies (USD, EUR, JPY, GBP, CHF, CAD, AUD, and in some classifications CNY) share a similar set of features: large diversified economies, deep financial markets, fully open capital accounts (or in CNY\'s case, partially managed with deep onshore liquidity), and credible institutions. The result is that their pairwise volatility is structurally lower than emerging-market FX volatility, often by a factor of two or three.' },
      { type: 'p', text: 'It is not just risk: it is liquidity. The major pairs are the most liquid financial instruments on Earth. A large order that would move an emerging-market currency several percent gets absorbed in EUR/USD without a noticeable ripple.' },

      { type: 'h2', text: 'When usually-quiet currencies suddenly are not' },
      { type: 'p', text: 'Even majors have volatility regimes. EUR/USD can spend months in a quiet 2% range and then move 5% in two weeks around a central-bank surprise or geopolitical shock. JPY can sit still for quarters and then move 8% to 10% in a month if Japan\'s rate policy diverges from peers. The most reliable predictor of a volatility regime change is a shift in the underlying interest-rate gap or a credible threat to it.' },

      { type: 'h2', text: 'How volatility shows up in spreads and conversion costs' },
      { type: 'p', text: 'Higher volatility means wider spreads in retail FX. Market-makers price spread as compensation for the risk of being run over by a fast move; the riskier the pair, the wider they quote. As a result, the all-in cost of converting volatile currencies is typically higher even at the same provider:' },
      { type: 'list', items: [
        'Major pairs: spreads of 0.1% to 0.5% at competitive providers.',
        'Liquid emerging markets (BRL, MXN, INR, ZAR): 0.5% to 1.5%.',
        'Less liquid emerging markets or frontier currencies: 1.5% to 5% or more.',
      ] },

      { type: 'callout', text: 'A practical implication. If you regularly convert into a high-volatility currency, the worst rate you will see in any given month is materially worse than the average. Splitting the conversion into multiple tranches reduces variance dramatically, often more than the small loss in average rate timing would cost.' },

      { type: 'h2', text: 'Matching conversion strategy to volatility' },
      { type: 'list', items: [
        'For majors, single-tranche conversions are fine for most purposes. The expected difference between converting today and converting next week is usually well under 1%.',
        'For liquid emerging markets, split larger conversions across two or three tranches. The expected savings versus a single shot are small, but the worst-case outcomes get much better.',
        'For volatile currencies (annualised volatility above 15%), consider hedging instruments such as rate locks or forwards, especially for committed cash flows. The spread cost of the hedge is often less than the variance it removes.',
        'For pegged or heavily managed currencies, ignore short-term timing entirely. Watch instead for regime-stress warning signs that signal a potential discrete move.',
      ] },

      { type: 'h2', text: 'A worked example' },
      { type: 'p', text: 'A small importer pays a $50,000 invoice quarterly. The home currency is BRL, with USD/BRL realised volatility of roughly 12% to 15% annualised. The expected daily move is around 1%. Over a quarter, the cumulative range can easily span 10%.' },
      { type: 'p', text: 'Without any planning, the importer might pay 5% above or below the quarter\'s average rate purely on timing luck. Splitting the conversion into three monthly tranches reduces that range substantially; using a rate lock for half the amount reduces it further. The cost is a few basis points of spread on the locked portion. The benefit is more predictable margins on every quarter.' },

      { type: 'h2', text: 'Where to read more' },
      { type: 'p', children: [
        'For the macro drivers behind these moves, see ',
        { to: '/guides/top-factors-that-move-currency-markets', text: 'top factors that move currency markets' },
        '. For tools to manage volatility on a personal scale, see ',
        { to: '/guides/best-time-to-exchange-currency', text: 'the best time to exchange currency' },
        ' and ',
        { to: '/guides/floating-vs-fixed-exchange-rates', text: 'floating vs fixed exchange rate systems' },
        '. The ',
        { href: 'https://www.bis.org/publ/quarterly.htm', text: 'BIS Quarterly Review' },
        ' regularly publishes FX volatility analyses across major and emerging-market currencies. To check today\'s rates across both quiet and volatile pairs, use the ',
        { to: '/', text: 'live converter' },
        '.',
      ] },

      { type: 'disclaimer', text: 'This article is educational. It is not financial, tax, or investment advice.' },
    ],
  },
]

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug)
}
