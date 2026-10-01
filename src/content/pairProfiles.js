// Hand-written per-pair editorial intros for indexable currency pair pages. Wave 1 = POPULAR_PAIRS plus reverses (38 keys) per D-09/D-10. Wave 2 (40 major-major crosses) deferred to Phase 1.5 per CONTEXT.md D-11 + RESEARCH.md §6.

export const PAIR_PROFILES = {
  'USD-BRL': `For Brazilian importers, exporters, and households tracking the cost of foreign-priced goods, the USD to BRL conversion is the single most consequential rate on the screen. Brazil settles most commodity exports in dollars, from soy and iron ore to beef and oil, so the real moves in tight correlation with global commodity cycles and with US Federal Reserve policy. When the Fed raises rates, capital tends to flow out of emerging markets and the real weakens. The Banco Central do Brasil sets its own Selic policy rate to defend the currency and anchor inflation expectations, often in the opposite direction. The day-to-day USD-BRL print also shapes household budgets in Brazil: streaming subscriptions, international tuition, software-as-a-service tools, and online purchases from US stores are all priced in dollars and converted at the retail rate plus the IOF tax. The mid-market figure displayed on this page is the benchmark against which any bank, fintech, or card spread should be measured before a transaction settles.`,

  'BRL-USD': `Travelers leaving Brazil for the United States, freelancers invoicing a US client in dollars, and families sending support to relatives studying abroad all begin with the same question: how many dollars does one real actually buy today? The answer is set in the global interbank market, where the Banco Central do Brasil has no direct influence beyond its policy rate and occasional spot intervention. On the US side, the Federal Reserve sets the broader interest-rate environment that the dollar trades against. Because the real is far more volatile than the dollar, the BRL-USD print moves mostly in response to Brazilian fiscal news, commodity prices, and emerging-market risk sentiment. A reader converting in this direction should pay close attention to the IOF tax on outbound conversions and to the all-in spread offered by Brazilian banks and brokerages, which can vary by more than two percentage points between the worst and best providers on the same business day.`,

  'EUR-USD': `No currency pair in the world trades more volume than EUR-USD. The European Central Bank, headquartered in Frankfurt, sets monetary policy for the twenty euro-area members, while the US Federal Reserve sets it for the dollar. The interest-rate gap between the two anchors most of the long-term direction of the pair. Day-to-day moves come from inflation prints in either bloc, payroll data out of Washington, manufacturing surveys out of Germany, and the broader risk environment. For a European company invoicing a US customer, a European tourist budgeting a trip to New York, or an American business buying components from a German supplier, the EUR-USD rate quoted here is the mid-market reference. Retail conversions through a bank or a card will run roughly one to three percent above this figure, depending on the provider. Online brokers and modern remittance services tend to be the closest to mid-market for medium-sized amounts, while airport kiosks remain the most expensive option on either side of the Atlantic.`,

  'USD-EUR': `Americans planning a trip to Paris, US-based subscribers paying for European software, and exporters in the United States invoicing customers across the European Union all need the USD-EUR direction. The Federal Reserve and the European Central Bank operate on very different policy cycles, so the two rates can diverge for long stretches before snapping back. When the dollar strengthens against the euro, every dollar buys more European goods, services, and travel; when it weakens, the opposite holds. Reader-relevant context: prices inside the euro area are quoted in euros across all twenty member states, from Ireland to Greece, so a single mid-market figure governs travel and online spending across the entire bloc. The rate shown here is the reference midpoint between the institutional bid and ask in the global interbank market. Any consumer-facing conversion will sit a fraction of a percent to several percent above it, depending on whether the conversion runs through a card network, a transfer specialist, a high-street bank, or a money-exchange counter at the airport.`,

  'GBP-USD': `Known to traders as "cable" after the transatlantic telegraph cable that once carried the quote between London and New York, GBP-USD is one of the four most actively traded currency pairs in the world. The Bank of England sets policy in Threadneedle Street, while the Federal Reserve sets policy in Washington. The pair tends to move on UK inflation prints, US payroll data, fiscal announcements from either Treasury, and the broader political backdrop in the United Kingdom. Brexit and its aftermath produced some of the largest single-day moves in cable's modern history. For a UK resident sending money to a US bank account, a British exporter pricing a contract in dollars, or an American buying a London property, the figure quoted on this page is the mid-market starting point. Retail spreads vary widely: high-street UK banks tend to run between 2 and 4 percent above mid-market on outbound transfers, while online specialists routinely deliver well under one percent for similar amounts.`,

  'USD-GBP': `Americans visiting London, US companies hiring contractors in the United Kingdom, and online shoppers buying from British retailers all reach for the USD-GBP direction. The pound is one of the oldest currencies still in continuous use, and the Bank of England has set its policy rate independently since gaining operational independence in 1997. On the other side, the Federal Reserve sets the dollar rate. The interest-rate gap between the two central banks anchors the long-term trend of the pair, while shorter moves track UK economic data, US labour-market prints, and broader risk sentiment. Practical note for a US-based reader: prices in the United Kingdom are quoted in pounds inclusive of value-added tax, so the headline figure on a shop window is closer to the all-in cost than equivalent quotes back home. The mid-market rate shown on this page is the reference midpoint; any actual conversion through a US card or bank will include a small spread on top of it.`,

  'USD-JPY': `Sitting alongside EUR-USD and GBP-USD as one of the most heavily traded pairs in the world, USD-JPY carries an outsized role in global financial markets. The Bank of Japan has run an ultra-loose monetary policy for most of the last two decades, while the Federal Reserve sets its dollar policy on a very different cycle. That gap makes the yen a popular funding currency for carry trades and gives USD-JPY one of the widest persistent interest-rate differentials in the major-currency space. For travelers heading to Japan, importers buying Japanese cars or electronics in dollars, and Japanese exporters pricing US-bound shipments, the rate matters in opposite directions. Practical context for a reader converting dollars to yen: Japan is one of the most cash-intensive major economies, and the unit value of the yen is very low, so any traveler should expect to handle larger note counts than they would in Europe. The figure displayed on this page is the global mid-market midpoint before any provider spread is added.`,

  'JPY-USD': `Japanese travelers booking US flights, Japanese companies paying for US-based cloud services, and US residents receiving payment from a Japanese employer all start from the JPY-USD direction. Because the yen has such a low unit value, this rate is usually expressed with several decimal places, and small absolute moves represent meaningful percentage changes. In Tokyo, the Bank of Japan sets the yen policy rate; on the dollar side, the Federal Reserve makes the call from Washington. Over the longer term, the gap between those two policy rates does most of the work in driving JPY-USD. Shorter moves track US inflation data, Japanese current-account surpluses, and the global risk environment, since the yen tends to appreciate as a safe haven when other markets sell off. Anyone converting at a Japanese bank or airport kiosk should compare the offered rate against the mid-market figure shown here: high-street spreads in Tokyo are typically narrower than in many Western capitals, but the difference between providers is still worth a quick check before committing to a sizeable conversion.`,

  'EUR-GBP': `Cross-channel trade between the United Kingdom and the European Union runs through EUR-GBP in volumes worth hundreds of billions a year. The European Central Bank and the Bank of England operate on different policy cycles, and the gap between them sets the broad direction of the pair over months and quarters. Shorter moves track UK inflation prints, eurozone manufacturing data, and political headlines that affect either bloc. For a UK importer buying components from Germany, an Irish exporter invoicing a London customer, or a Spanish resident receiving rent from a UK tenant on a British-bank account, the EUR-GBP rate determines the all-in cost. Mid-market reference rates such as the one shown here are the cleanest single number to use for planning. Card networks, transfer specialists, and high-street banks add their own spreads on top, which range from a fraction of a percent at the cheapest end to several percent at airport counters and traditional bank wires.`,

  'GBP-EUR': `British residents booking holidays in Spain or Italy, UK retirees living in Portugal or France on a pension paid in pounds, and London-based contractors invoicing euro-area customers all begin with the GBP-EUR direction. The Bank of England sets the sterling policy rate, while the European Central Bank sets the rate for all twenty members of the euro area. The gap between those two policy paths is the single largest force behind the long-term trend of GBP-EUR. Shorter moves come from UK inflation and growth data, eurozone surveys, and political events on either side of the Channel. A common practical question among UK readers: should a planned European holiday be funded by buying euros in advance, or by paying on card and converting at the point of sale? The mid-market rate shown here is the reference number for that decision, and the answer usually depends on the spread quoted by the specific card or provider, not on any near-term forecast of where the rate is heading.`,

  'USD-CNY': `Connecting the world\'s two largest economies, USD-CNY is one of the most politically watched currency pairs on the planet. The People\'s Bank of China manages the renminbi within a daily tolerance band against a basket of trade partners, so the pair tends to move in quieter steps than fully floating majors. On the other side of the pair, the Federal Reserve sets the dollar under a free-floating regime. For a US importer paying a Chinese factory, an American student paying tuition at a Shanghai university, or a US-based ecommerce seller sourcing inventory from a Shenzhen supplier, the USD-CNY rate is the starting point. Note that an offshore variant, CNH, trades freely in Hong Kong and sometimes diverges from the onshore CNY by a small margin. The mid-market figure shown here uses the standard CNY quote. Settlement through SWIFT bank wires or through specialist remittance corridors will add a spread on top, and US-China remittance flows are subject to additional compliance reviews that can slow down larger transfers by several business days.`,

  'CNY-USD': `Chinese tourists planning a trip to the United States, Chinese students paying US university fees, and Chinese exporters pricing a contract for a US buyer all start from the CNY-USD direction. The People\'s Bank of China sets a central parity rate each trading day and allows the currency to float within a narrow band around it, the Federal Reserve sets the dollar under a fully free-floating regime in Washington. Capital controls on outbound flows from mainland China shape how the pair behaves in practice: the offshore CNH market in Hong Kong tends to be more responsive to global sentiment than the onshore CNY market quoted here. For US-bound spending, the day-to-day rate matters less than the all-in cost of the conversion, which depends on whether the funds move through a bank wire, a UnionPay card, or a digital wallet that converts at point of sale. The mid-market reference on this page provides the cleanest baseline against which all of those options can be compared.`,

  'USD-INR': `Driven by one of the world\'s largest remittance corridors, USD-INR moves billions of dollars from US-based Indian diaspora workers back to families across the Indian subcontinent every quarter. The Reserve Bank of India sets the rupee policy rate and intervenes in the spot market to smooth volatility, while the Federal Reserve sets the dollar side. India runs a persistent current-account deficit and imports most of its crude oil in dollars, so the rate is particularly sensitive to global oil prices and to US Treasury yields. For US tech companies paying salaries to engineers in Bangalore or Hyderabad, for American students paying tuition at the Indian Institutes of Technology, and for the very large remittance corridor between the US and India, the all-in cost depends on the spread added by the chosen provider on top of the mid-market reference. Digital remittance services that specialize in this corridor routinely deliver rates within half a percent of the figure shown here, well below traditional bank wires.`,

  'INR-USD': `Indian travelers planning a trip to the United States, Indian importers paying for US-made medical equipment or software licences, and Indian companies receiving venture capital from US investors all begin from the INR-USD direction. Because of the rupee\'s small unit value, the quote on this page carries several decimal places; what looks like a small absolute movement can amount to a meaningful percentage shift. The Reserve Bank of India runs rupee policy from Mumbai; the dollar comes from the Federal Reserve. Outbound conversions from India face strict capital-control rules under the Liberalised Remittance Scheme, which caps the total amount an individual can send abroad in a single financial year. The mid-market reference shown here is the cleanest number for budgeting, but the actual rate received from a bank or authorised dealer will reflect both their spread and the documentation requirements of the underlying remittance category. Checking the all-in cost across two or three providers before a sizeable conversion is almost always worth the few minutes it takes.`,

  'USD-CAD': `Often called the "loonie" pair after the bird pictured on the Canadian dollar coin, USD-CAD is one of the most stable major pairs in the world. The Bank of Canada in Ottawa sets the Canadian policy rate; the Federal Reserve sets the US side, and the two central banks tend to move in roughly similar directions because the two economies are deeply integrated. Crude oil prices play an outsized role in the rate: Canada is one of the largest oil exporters to the United States, and the loonie strengthens when oil prices rise. For Americans travelling to Canada, US companies paying contractors in Toronto or Vancouver, and US ecommerce shoppers buying from Canadian retailers, the all-in cost of a conversion comes down to the spread their bank or card adds on top of the mid-market reference. Cross-border traffic between the two countries is heavy enough that many border-town businesses accept either currency directly, though usually at a discount to the spot rate displayed here.`,

  'CAD-USD': `Canadian travelers crossing the border into the United States, Canadian companies invoicing US customers in dollars, and Canadian residents shopping on US-based websites all start from the CAD-USD direction. The Bank of Canada owns Canadian policy from Ottawa, the Federal Reserve owns US policy from Washington; because the two economies are deeply linked through trade, energy flows, and labour mobility, the long-term trend of CAD-USD is usually mild compared with other major pairs. Crude oil prices, US payroll data, and Canadian inflation prints do most of the short-term work. Practical note for Canadian readers: many US retailers and hotels accept Canadian credit cards directly, but the conversion is performed at the card network rate plus a foreign-transaction fee that typically runs around 2.5 percent. The mid-market reference rate shown on this page is the cleanest starting point for comparing that cost against alternatives such as a multi-currency account, a US-dollar pre-paid card, or a direct bank wire for larger amounts.`,

  'USD-CHF': `Regarded by many traders as the cleanest expression of a flight-to-safety move, USD-CHF moves sharply when global risk appetite falls and investors crowd into Swiss francs. The Swiss National Bank in Zürich sets the franc policy rate and has a long history of active intervention to manage the currency, including the famous removal of the EUR-CHF floor in January 2015 that produced one of the largest single-day moves in modern FX history. The Federal Reserve sets the dollar side under a much more conventional framework. For American travelers heading to Zürich, Geneva, or Bern, US companies hiring Swiss-based contractors, and US wealth managers settling accounts with Swiss banks, the mid-market value listed on this page provides the starting reference for any conversion. Day-to-day costs in Switzerland sit among the highest in the world, so even a small spread on top of the spot rate can add up across a week of meals, hotels, and transport. Running a quick three-way comparison before settling a sizeable transfer is almost always worth the time.`,

  'CHF-USD': `Swiss residents planning a US trip, Swiss companies invoicing American customers, and Swiss-based asset managers settling positions in US securities all begin with the CHF-USD direction. The Swiss National Bank, based in Bern and Zürich, controls franc policy; on the US side, the Federal Reserve controls the dollar. The franc tends to appreciate during periods of global stress because of Switzerland\'s political neutrality, strong property rights, and deep banking system. That safe-haven behaviour means CHF-USD can move several percent in a short window when risk sentiment shifts. For a Swiss reader converting to dollars, the practical cost depends less on day-to-day timing than on the spread added by the chosen provider. Swiss high-street banks tend to offer broadly competitive rates to retail customers because of strong domestic competition, but specialist online platforms can still deliver tighter spreads on larger amounts. The mid-market rate displayed here works as the cleanest yardstick available for evaluating any quoted offer.`,

  'USD-AUD': `Sitting on one of the most actively traded commodity-currency pairs in the world, USD-AUD reflects two very different economies linked by deep trade and investment flows. The Reserve Bank of Australia runs Aussie policy from Sydney, opposite the Federal Reserve on the US side. The Australian dollar is heavily correlated with iron ore, coal, and LNG prices, and with the growth pulse of China, which buys most of Australia\'s mining exports. When global risk sentiment is strong, the Aussie tends to rise against the US dollar; in risk-off periods it usually falls. For Americans planning a trip to Sydney or Melbourne, US companies paying Australian-based contractors, and US ecommerce shoppers buying from Australian retailers, the mid-market figure on this page provides the starting reference. Card networks and bank wires typically add a spread of between 1 and 3 percent on top, while specialist remittance services often deliver well under one percent for larger amounts on the US-Australia corridor.`,

  'AUD-USD': `Australian travelers heading to the United States, Australian companies invoicing US customers in dollars, and Australian residents shopping on American websites all start from the AUD-USD direction. The Reserve Bank of Australia and the Federal Reserve each set their own policy rate; the long-term gap between the two does much of the work in shaping AUD-USD. Shorter moves come from US payroll data, Australian inflation prints, commodity prices, and shifts in global risk sentiment. Practical context for Australian readers: many US-facing services charge in dollars regardless of where the customer is based, so subscription costs, software licences, and cloud-hosting bills are converted through the chosen card network at its own spread. The mid-market figure on this page anchors the cleanest baseline for measuring each of those conversions. For larger amounts such as property deposits, vehicle imports, or university tuition, a direct bank wire or specialist remittance provider often delivers a better all-in rate than a credit card.`,

  'EUR-BRL': `Particularly relevant for the large European tourist flow into Brazil and for Brazilian importers buying European industrial goods, EUR-BRL is one of the most actively traded euro-real pairs after the dollar-real benchmark. From Frankfurt, the European Central Bank sets the euro policy rate for all twenty euro-area members; in Brasília, the Banco Central do Brasil owns the Selic rate that anchors the real. The pair is volatile by major-currency standards, mainly because the real is far more sensitive than the euro to commodity cycles and to emerging-market risk sentiment. For a Brazilian household funding a relative\'s European studies, a Brazilian importer paying a German machinery supplier, or a Portuguese investor settling a property purchase in São Paulo, the mid-market figure on this page sets the cleanest benchmark. Brazilian banks and brokerages charge a spread on top, plus the IOF tax on outbound conversions. Quickly comparing two or three providers before settling can shift the all-in cost by more than a full percentage point.`,

  'BRL-EUR': `Residents of Brazil planning European holidays, local companies paying for European software licences, and students travelling to study in Lisbon, Madrid, or Berlin all begin with the BRL-EUR direction. The Banco Central do Brasil sets the real policy rate, while the European Central Bank sets the euro side. Because the real is more volatile than the euro, the long-term direction of BRL-EUR is dominated by Brazilian factors: fiscal policy, commodity exports, and the Selic rate path. Practical context for Brazilian readers: outbound conversions from Brazil are subject to the IOF tax, which varies by remittance category and can add a meaningful cost on top of the bank or fintech spread. Cards used abroad also trigger IOF on each transaction. The mid-market figure on this page provides the cleanest yardstick for evaluating any quoted offer, whether it comes from a traditional Brazilian bank, a brokerage, or a newer fintech that specializes in international transfers.`,

  'GBP-BRL': `Helping connect the Brazilian diaspora in the United Kingdom with families back home, GBP-BRL is one of the most actively used non-dollar remittance corridors for Brazil. Sterling policy is run by the Bank of England from Threadneedle Street; the Selic rate that anchors the real is run by the Banco Central do Brasil. The gap between those two rates does much of the work in shaping the long-term trend, while shorter moves track UK inflation prints, Brazilian fiscal news, and commodity prices. For a UK-based Brazilian sending support to relatives in São Paulo, a British importer buying Brazilian coffee or beef, or a UK pensioner funding a stay on Brazil\'s northeast coast, the mid-market figure shown here is the starting point. Specialist remittance services on this corridor have proliferated in the last decade and now routinely offer all-in costs under one percent for medium-sized amounts. Traditional bank wires from UK high-street banks tend to run several percentage points above mid-market once both their spread and their flat fee are factored in.`,

  'BRL-GBP': `Travelers booking trips to London or Edinburgh, importers in Brazil paying for British equipment, and families supporting a relative studying at a UK university all start from the BRL-GBP direction. The Selic rate, Brazil\'s policy anchor, is run by the Banco Central do Brasil; sterling policy is run by the Bank of England. As with all BRL crosses, the real does most of the moving: it is significantly more volatile than the pound, and its direction is driven by Brazilian fiscal policy, the Selic rate, and global commodity cycles. A UK-bound conversion from a Brazilian account incurs IOF on top of whatever spread the bank or fintech of choice applies. Online specialist remittance services tend to deliver the tightest all-in spreads on this corridor, while airport exchange counters in either country remain the most expensive option by a wide margin. The mid-market reference rate displayed here is the cleanest baseline against which any quoted offer should be checked before a sizeable conversion settles.`,

  'JPY-BRL': `Reflecting the deep ties between the Japanese-Brazilian community and the Japanese diaspora in São Paulo, JPY-BRL is one of the most culturally significant cross-rates for Brazil despite its modest traded volume. Yen policy is set by the Bank of Japan in Tokyo; the Banco Central do Brasil runs Brazil\'s Selic rate from Brasília. Because the yen has such a low unit value, the rate is usually quoted with several decimal places. The yen behaves as a safe haven and tends to strengthen during global risk-off episodes, while the real tends to weaken in the same environment, so the two currencies often move in opposite directions during financial stress. For a Japanese importer of Brazilian coffee or iron ore, a Japanese-Brazilian family sending remittances between Tokyo and São Paulo, or a Japanese tourist visiting Brazil, the mid-market rate displayed on this page provides the cleanest starting figure. Comparing the IOF tax, bank spread, and remittance fees across two or three providers is almost always worthwhile.`,

  'BRL-JPY': `Households planning a trip to Tokyo, companies paying for Japanese industrial machinery, and descendants of Japanese immigrants in São Paulo sending support to relatives back in Japan all begin with the BRL-JPY direction. Brazil\'s policy anchor, the Selic rate, sits with the Banco Central do Brasil; yen policy sits with the Bank of Japan. The real is far more volatile than the yen, so most of the day-to-day movement reflects fiscal headlines from Brasília, agricultural and metal commodity prints, and shifts in global emerging-market risk appetite. A Japan-bound transfer out of a Brazilian account triggers the IOF tax on top of the provider\'s own spread. Because of the yen\'s tiny unit value, this page displays the rate with several decimal places, and modest absolute moves can amount to meaningful percentage shifts. The figure here sits at the midpoint of the global interbank quote, and it serves as the cleanest baseline for evaluating any retail quote on the corridor.`,

  'CAD-BRL': `Increasingly relevant for the growing Brazilian community in Toronto, Vancouver, and Montréal, CAD-BRL is one of the steadier BRL crosses among the majors. In Ottawa, the Bank of Canada owns the Canadian policy rate; the Selic rate that anchors the real comes from the Banco Central do Brasil in Brasília. Both economies are heavily commodity-linked, so the two currencies sometimes move in similar directions when global commodity prices shift, though the real is much more volatile in either direction. For a Brazilian working in Canada and sending support to family back home, a Canadian importer of Brazilian iron ore or beef, or a Canadian pensioner funding a stay on Brazil\'s coast, the mid-market figure on this page sets the reference midpoint. Specialist remittance corridors between Canada and Brazil have improved markedly in recent years, with several online providers offering all-in costs well under one percent for medium amounts. Traditional bank wires tend to run noticeably above mid-market once both the spread and the wire fee are factored in.`,

  'BRL-CAD': `Holidaymakers from Brazil planning a trip to Canada, agribusiness firms buying Canadian fertiliser or farm machinery, and students travelling to study in Toronto or Vancouver all start from the BRL-CAD direction. Brazil\'s real moves with the Selic rate, set in Brasília by the Banco Central do Brasil; Canadian policy is owned by the Bank of Canada. In this cross, as in all BRL pairs, the real does most of the moving: it is more volatile than the loonie and reacts more sharply to commodity-price shifts and to Brazilian fiscal news. A Canada-bound conversion from a Brazilian account adds the IOF tax on top of the bank or fintech spread; card transactions in Canada also incur IOF on every swipe, so for longer stays a pre-funded Canadian-dollar account or pre-paid card often delivers a lower all-in cost. The mid-market reference displayed here is the cleanest baseline against which any retail quote can be benchmarked before a sizeable conversion goes through.`,

  'AUD-BRL': `Australian visitors to Brazil, Australian importers of Brazilian commodities, and the Australian wing of the Brazilian football and music community all rely on AUD-BRL for cross-currency conversions. Aussie policy is owned by the Reserve Bank of Australia, headquartered in Sydney; the Selic rate that drives the real is owned by the Banco Central do Brasil. Both currencies are commodity-linked: the Aussie tracks iron ore, coal, and LNG prices, while the real tracks soy, iron ore, beef, and oil. Despite that surface similarity, the two move quite differently in practice because the real is far more sensitive to political and fiscal news in Brasília. For an Australian importer settling an invoice with a São Paulo supplier, an Australian tourist budgeting a Brazil trip, or a Brazilian based in Sydney sending support home, the mid-market reference on this page acts as the starting figure. Online specialist remittance services usually deliver tighter spreads than traditional bank wires, and running a quick three-way comparison before a large transfer is almost always worth a few minutes.`,

  'BRL-AUD': `Visitors from Brazil planning trips to Sydney or Melbourne, mining firms paying Australian suppliers for equipment, and families sending support to relatives studying at Australian universities all begin with the BRL-AUD direction. The Selic rate, which anchors the Brazilian real, is run from Brasília by the Banco Central do Brasil; Australian policy is owned by the Reserve Bank of Australia. The real is more volatile than the Aussie, so most of the rate movement comes from Brazilian factors: fiscal news, the Selic rate, and global emerging-market sentiment. An Australia-bound transfer out of a Brazilian account triggers IOF on top of whatever spread the chosen provider applies. Australia is geographically distant and time-zoned away from Brazil, so settlement on large transfers often takes an extra business day compared with European or North American corridors. The figure on this page anchors the reference midpoint, and serves as the cleanest available number against which retail quotes should be measured before settling.`,

  'CHF-BRL': `Linking one of the world\'s safest-haven currencies with one of the most volatile major emerging-market currencies, CHF-BRL is a textbook example of a risk-on, risk-off pair. The franc is governed by the Swiss National Bank; Brazil\'s Selic rate, the anchor for the real, is set by the Banco Central do Brasil in Brasília. The two currencies often move in opposite directions during global stress: the franc tends to appreciate as money flows into safe havens, while the real tends to weaken as capital leaves emerging markets. For a Swiss importer of Brazilian commodities, a Brazilian household sending tuition support to a child studying in Zürich or Lausanne, or a Swiss-based asset manager with Brazilian holdings, the mid-market figure shown on this page is the reference point. Specialist remittance services on this corridor are less common than on the dollar or euro routes, but for larger amounts a direct bank wire from a major Swiss bank typically delivers a competitive all-in rate compared with traditional Brazilian outbound options.`,

  'BRL-CHF': `Tourists from São Paulo planning trips to Zürich or Geneva, pharmaceutical importers buying Swiss precision instruments, and families supporting a student at a Swiss university all start from the BRL-CHF direction. In Brasília, the Banco Central do Brasil sets the Selic rate that drives the real; the Swiss National Bank owns franc policy. Day-to-day costs in Switzerland are among the highest in the world, which makes the IOF tax and the bank spread on outbound conversions from Brazil particularly costly in absolute terms. The mid-market reference rate shown here is the cleanest yardstick for evaluating any quoted offer from a Brazilian bank, brokerage, or fintech. For longer stays in Switzerland, a multi-currency account or a pre-funded franc card often delivers a lower all-in cost than swiping a Brazilian credit card at the point of sale, since each card transaction abroad triggers a fresh IOF charge on top of the network spread.`,

  'CNY-BRL': `Vital to one of the most economically consequential bilateral relationships in the southern hemisphere, CNY-BRL channels the trade flow between China and its largest South American partner. China is the single biggest buyer of Brazilian soy, iron ore, and beef, and the relationship has reshaped Brazilian export patterns over the last two decades. From Beijing, the People\'s Bank of China steers the renminbi inside a daily tolerance band; the Banco Central do Brasil controls the Selic rate that anchors the real. Capital controls on the Chinese side mean retail conversions in this direction often pass through dollar intermediation rather than direct CNY-BRL settlement. For Chinese importers buying Brazilian commodities, Chinese tourists visiting Brazil, and Brazilian-Chinese families sending remittances, the figure on this page provides the reference midpoint. Comparing the all-in cost across a direct corridor and a dollar-intermediated route is worthwhile, since the spread on the latter sometimes ends up tighter despite involving two conversions instead of one.`,

  'BRL-CNY': `Importers buying Chinese-made electronics, machinery, and components, exporters of agricultural commodities receiving payment in renminbi, and residents of Brazil planning trips to Shanghai or Beijing all begin with the BRL-CNY direction. From Brasília, the Banco Central do Brasil oversees the Selic rate that governs the real; from Beijing, the People\'s Bank of China keeps the renminbi inside a managed corridor against a basket of trade partners. Direct BRL-CNY conversions are less common at the retail level than dollar-intermediated routes, because the Chinese capital account is not fully open. A renminbi-bound transfer from Brazil incurs the IOF tax on top of whatever spread the chosen bank or fintech applies. The figure here represents the global interbank midpoint for the direct pair, and it provides the cleanest available baseline against which any retail quote from a Brazilian bank, brokerage, or fintech can be compared before a sizeable conversion settles into the destination account.`,

  'USD-MXN': `Anchoring the most actively traded emerging-market currency pair in the world, USD-MXN moves enormous volumes every trading day. Mexico\'s deep trade relationship with the United States, its fully convertible currency regime, and the heavy cross-border manufacturing footprint along the frontier make the peso unusually liquid for an emerging-market currency. The Banco de México controls peso policy from Mexico City, opposite the Federal Reserve on the dollar. The peso tends to strengthen when US growth is strong and weaken when cross-border political tension or trade-policy noise rises. For Americans crossing into Mexico for tourism or property purchases, US companies operating maquiladora facilities, and US residents sending remittances to family in Mexico, the mid-market figure on this page sets the starting reference. The US-Mexico remittance corridor is one of the largest in the world, and specialist providers routinely keep total costs under one percent for medium amounts, well below the spreads charged by traditional bank wires.`,

  'MXN-USD': `Mexican residents crossing into the United States for shopping, work, or family visits, Mexican companies invoicing US customers, and Mexican workers in the United States holding peso-denominated savings at home all start from the MXN-USD direction. The Banco de México in Mexico City sets the peso policy rate; the Federal Reserve sets the dollar. Because Mexico runs a large trade surplus with the United States and a heavy manufacturing relationship through cross-border supply chains, the rate is unusually liquid for an emerging-market pair and the spread between bid and ask is typically tight. In US border towns, prices are often quoted in both pesos and dollars, with local shops accepting either, though usually at a discount to the mid-market rate. The reference figure shown on this page provides the cleanest baseline against which any retail quote should be benchmarked, whether the conversion runs through a Mexican bank, a US-side casa de cambio, or a specialist online provider.`,

  'USD-KRW': `Reflecting one of the deepest trade relationships in the Asia-Pacific, USD-KRW connects the United States with one of the world\'s largest manufacturing economies. The Bank of Korea sets the won policy rate from Seoul, while the Federal Reserve sets the dollar side. The won is sensitive to global semiconductor cycles, given how much of South Korea\'s export volume comes from chips, displays, and advanced electronics. The rate is also responsive to North Korean geopolitical news and to broader Asia-Pacific risk sentiment. For American visitors to Seoul, US tech companies licensing Korean intellectual property, and US-based importers buying Korean automobiles or appliances, the mid-market value listed on this page is the cleanest starting figure. Because the won has a low unit value relative to the dollar, the rate is usually quoted with several decimal places. Card networks and bank wires add a spread on top, with specialist remittance services typically delivering tighter all-in rates than high-street banks for medium-sized amounts on the US-Korea corridor.`,

  'KRW-USD': `South Korean tourists visiting the United States, Korean conglomerates settling US-dollar invoices for raw materials or aircraft, and Korean students paying tuition at US universities all begin with the KRW-USD direction. The Bank of Korea, headquartered in Seoul, runs won policy; the Federal Reserve runs dollar policy from Washington. Because the won has a low unit value, the rate is displayed with several decimal places; modest-looking shifts in the trailing digits often translate into noticeable percentage moves. South Korea runs a persistent current-account surplus and is a major exporter of semiconductors, automobiles, and advanced electronics, so the won often strengthens when global tech-cycle indicators improve and weakens when they deteriorate. For Korean readers converting to dollars, the practical cost depends mainly on the spread added by the chosen bank or specialist provider. The mid-market reference rate on this page provides the cleanest available baseline for evaluating any quoted offer before settling a sizeable conversion.`,
}

export function getPairIntro(fromCode, toCode) {
  return PAIR_PROFILES[`${String(fromCode).toUpperCase()}-${String(toCode).toUpperCase()}`] ?? null
}

// Pair-specific editorial detail for the pair page body: what drives this
// particular pair, practical notes for the corridor, and pair-specific FAQ.
// Replaces the generic sections that used to repeat verbatim on every pair
// page. Pairs without an entry fall back to the generic sections.
export const PAIR_DETAILS = {
  'USD-BRL': {
    drivers: [
      'The interest-rate gap between the Selic and the Fed funds rate. Brazil has kept one of the highest real interest rates among large economies, which draws carry-trade money into the real. When global investors turn cautious, that money leaves quickly and the real weakens fast.',
      'Commodity prices. Soy, iron ore, oil and beef make up a large share of Brazilian exports and are invoiced in dollars, so a commodity rally brings dollars into the country and tends to support the real.',
      'Brazilian fiscal news. Announcements about the federal spending framework and the public debt path often move USD/BRL more than routine economic data, because they change how investors price Brazilian risk.',
    ],
    notes: [
      { term: 'Commercial vs tourism dollar', text: 'Brazilian quotes separate the dólar comercial, the interbank rate that sits close to the mid-market figure on this page, from the dólar turismo, the retail rate for cash and prepaid cards. The tourism rate is always higher. Compare a quote against the right benchmark before judging whether it is fair.' },
      { term: 'IOF', text: 'Brazil’s tax on financial operations applies to most currency conversions, and the rate depends on the type of operation: card purchases abroad, buying cash, or sending a transfer. The federal government has changed these rates by decree several times in recent years, so confirm the current rate with your bank before a large conversion.' },
      { term: 'PTAX', text: 'The Banco Central do Brasil publishes PTAX once per business day, an average of dealer quotes collected at set times. Many contracts settle at PTAX rather than at a live quote, so the rate in a contract can differ from the figure on this page on a volatile day.' },
      { term: 'Receiving dollars from abroad', text: 'Payments sent to Brazil are converted under a câmbio contract at your bank or at a licensed fintech, and the spread on that contract is where most of the cost sits. Ask for the rate before you accept the transfer, not after the money has landed.' },
    ],
    faq: [
      {
        question: 'Why does an exchange house in Brazil charge more than the USD to BRL rate on this page?',
        answer: 'This page shows the mid-market rate, which is close to what Brazilian news calls the dólar comercial. Exchange houses sell paper dollars at the dólar turismo rate, which adds their margin plus the cost of moving physical cash, and IOF applies on top. A gap is normal. What matters is comparing two or three providers on the same day.',
      },
      {
        question: 'Is the PTAX rate the same as the mid-market rate?',
        answer: 'No. PTAX is the official reference rate of the Banco Central do Brasil, calculated from dealer quotes collected during set windows of the trading day. The mid-market rate on this page is a daily reference from our data provider. The two are usually close, but a contract that cites PTAX settles at PTAX.',
      },
    ],
  },

  'BRL-USD': {
    drivers: [
      'US data releases. Payroll and inflation reports from Washington shift expectations for the Federal Reserve, and the real usually reacts within minutes because Brazilian assets are priced against US yields.',
      'Global risk appetite. The real is one of the most liquid emerging-market currencies, so funds often sell it to hedge emerging-market exposure in general, even on days when Brazilian news is calm.',
      'Banco Central do Brasil intervention. When the real falls sharply, the central bank can sell dollars in the spot market or offer currency swaps, which can slow a slide without reversing the trend.',
    ],
    notes: [
      { term: 'Buying dollars for a trip', text: 'Compare three routes: paper dollars from an exchange house, a prepaid travel card, and a multi-currency account that converts when you load it. Each one carries IOF at its own rate, and the spreads differ more than the headline rates do.' },
      { term: 'Card purchases in dollars', text: 'Brazilian card issuers must publish the exchange rate they apply each day. Checking that rate against the mid-market figure on this page shows how much margin your issuer adds to every purchase abroad.' },
      { term: 'Sending money to a US account', text: 'Banks classify transfers to an account in your own name abroad differently from payments to third parties, and the documents and the IOF rate can depend on that classification. State the purpose up front to avoid delays.' },
    ],
    faq: [
      {
        question: 'Why does my bank give me fewer dollars per real than this page shows?',
        answer: 'Your bank sells dollars at its own rate, which sits above the mid-market rate shown here, and then adds IOF and sometimes a fixed fee. The total gap between this page and what you pay is the true cost of the conversion. Asking for the effective total rate, with every cost included, makes providers easy to compare.',
      },
      {
        question: 'Is it better to buy all my dollars at once before a trip?',
        answer: 'Nobody can reliably predict short-term moves in BRL/USD, one of the more volatile currency pairs. Many travelers buy in a few smaller lots during the weeks before departure, so the average rate is less exposed to a single bad day. This reduces timing risk without trying to beat the market.',
      },
    ],
  },

  'EUR-USD': {
    drivers: [
      'The policy gap between the European Central Bank and the Federal Reserve. Markets trade the expected difference between the two rate paths, so a surprise in either bank\'s guidance often moves EUR/USD more than the rate decision itself.',
      'Energy prices. The euro area imports most of its oil and gas, so an energy price spike worsens its trade balance and weighs on the euro. The 2022 energy shock pushed EUR/USD below parity for the first time in two decades.',
      'Business surveys. Purchasing managers\' indexes for the euro area and for Germany, published early each month, are among the first signals of growth and often move the pair when they surprise.',
    ],
    notes: [
      { term: 'SEPA stops at the border', text: 'Euro transfers inside the Single Euro Payments Area are cheap and fast, but a payment to a US account leaves SEPA and travels over SWIFT, often through intermediary banks that each take a fee. Ask whether the recipient will receive the full amount.' },
      { term: 'Euro prices on US websites', text: 'Some US online stores offer to charge European customers in euros at a rate the store sets. Choosing to pay in dollars and letting your card network convert is usually cheaper.' },
      { term: 'Invoicing a US client', text: 'If you bill in dollars, you carry the exchange risk until the money is converted. Some freelancers keep a dollar balance in a multi-currency account and convert in batches, which separates the timing of the payment from the timing of the conversion.' },
    ],
    faq: [
      {
        question: 'Why is EUR/USD quoted as dollars per euro?',
        answer: 'By market convention the euro is the base currency in EUR/USD, so the quote tells you how many dollars one euro buys. The same convention puts the euro first against almost every other currency. It is only a convention and says nothing about which currency is stronger.',
      },
      {
        question: 'How much do European banks charge to convert euros to dollars?',
        answer: 'Traditional banks commonly price transfers 1% to 3% away from the mid-market rate and may add a fixed SWIFT fee, while specialist transfer services often stay under 1%. The exact figure depends on the bank and the amount, so compare what the recipient will receive rather than the advertised fee.',
      },
    ],
  },

  'USD-EUR': {
    drivers: [
      'US inflation and jobs data. Strong numbers raise expectations of higher Fed rates, which tends to lift the dollar against the euro within the same trading session.',
      'Safe-haven demand. In periods of market stress, investors usually move toward dollar assets, so the dollar can rise against the euro even when the trouble starts outside both economies.',
      'Euro-area political risk. Elections, budget disputes and a widening gap between Italian and German bond yields have weighed on the euro whenever markets doubted the cohesion of the bloc.',
    ],
    notes: [
      { term: 'Pay in euros, not dollars', text: 'Card terminals and ATMs in Europe often offer to charge you in dollars. That option, called dynamic currency conversion, uses the merchant\'s own rate, which is typically worse than your card network\'s. Choosing euros is almost always cheaper.' },
      { term: 'Foreign transaction fees', text: 'Many US cards add a foreign transaction fee, commonly between 1% and 3% of each purchase, while a number of travel cards charge none. Check your card before the trip, since the fee applies to every payment.' },
      { term: 'VAT refunds', text: 'Visitors from outside the EU can often reclaim value-added tax on goods bought in stores that offer tax-free shopping, subject to a minimum purchase that varies by country. Keep the forms and have them stamped by customs when you leave the EU.' },
    ],
    faq: [
      {
        question: 'Should I buy euros before leaving the US?',
        answer: 'A small amount for arrival can be convenient, but US banks and airport counters usually price euros well above the mid-market rate. Withdrawing from a bank ATM in Europe with a low-fee card is often cheaper, as long as you decline any conversion the ATM offers.',
      },
      {
        question: 'Why does my credit card statement show a slightly different rate than this page?',
        answer: 'Card networks set their own daily conversion rates close to the mid-market rate, and your issuer may add a foreign transaction fee. The posting date can also differ from the purchase date, so the rate applied may come from another day.',
      },
    ],
  },

  'GBP-USD': {
    drivers: [
      'Bank of England surprises. Sterling reacts sharply to changes in the expected path of UK rates, especially when inflation data shifts what the Monetary Policy Committee is likely to do next.',
      'UK fiscal credibility. The September 2022 mini-budget showed how quickly cable can fall when markets doubt government finances: sterling dropped to a record low against the dollar within days.',
      'US data and the broad dollar. Because the dollar sits on the other side of most trades, US payroll and inflation reports frequently move cable more than UK news released on the same day.',
    ],
    notes: [
      { term: 'Sending pounds to a US bank', text: 'US accounts use a routing number and an account number rather than an IBAN, and transfers go through SWIFT or a specialist provider. Many US banks also charge a fee for incoming international wires, so check with the recipient.' },
      { term: 'Locking a rate for a large payment', text: 'For a property purchase or another large payment due in the future, some UK buyers use a forward contract to fix today\'s rate. It removes the risk of an adverse move before completion, at the cost of giving up any favorable one.' },
      { term: 'Card fees on US purchases', text: 'Many UK debit and credit cards charge a non-sterling transaction fee on dollar purchases. Travel-focused cards that skip the fee can save a noticeable amount over a trip.' },
    ],
    faq: [
      {
        question: 'Why does the pound move so much on UK budget days?',
        answer: 'Budgets change the expected supply of UK government bonds and the outlook for inflation and interest rates. When investors doubt the numbers, they sell gilts and sterling together, as in 2022. A calm, credible budget usually passes with little effect on the rate.',
      },
      {
        question: 'What is a good rate for converting pounds to dollars?',
        answer: 'There is no fixed good rate, because the pair moves every day. A practical test is the gap between the mid-market rate on this page and the rate you are quoted: under 1% is competitive for a transfer, while 3% or more means it is worth shopping around.',
      },
    ],
  },

  'USD-GBP': {
    drivers: [
      'UK inflation releases. UK inflation has at times run above US inflation in recent years, which affects how long the Bank of England keeps rates high and therefore how attractive sterling is to hold.',
      'Dollar strength across the board. When the dollar index rises on US data or on risk aversion, USD/GBP usually rises with it, regardless of what is happening in the UK.',
      'UK growth data. Weak GDP or retail sales figures raise expectations of rate cuts in London and tend to push sterling lower against the dollar.',
    ],
    notes: [
      { term: 'Contactless almost everywhere', text: 'UK shops and London public transport accept contactless card payments widely, so many visitors need little cash. Use a card with no foreign transaction fee and pay in pounds when a terminal offers a choice.' },
      { term: 'Paying UK contractors', text: 'Contractors in the UK usually invoice in pounds. A transfer service that converts close to the mid-market rate and pays out through the UK\'s Faster Payments system is typically quicker and cheaper than an international wire.' },
      { term: 'Scottish and Northern Irish notes', text: 'Banks in Scotland and Northern Ireland issue their own sterling banknotes. They are worth the same as Bank of England notes, but some shops in England hesitate to take them, and exchange counters abroad may refuse them.' },
    ],
    faq: [
      {
        question: 'Do I need cash in the UK?',
        answer: 'Rarely. Card and phone payments are accepted almost everywhere, including on public transport in London. A little cash helps at markets or in rural areas, and a bank ATM gives a better rate than an exchange counter if you decline the ATM\'s own conversion offer.',
      },
      {
        question: 'Why is one pound worth more than one dollar?',
        answer: 'The unit value of a currency reflects its history, not its economic strength. The pound has been worth more than a dollar throughout its modern history, but what matters for a conversion is how the rate changes over time, not whether it sits above or below one.',
      },
    ],
  },

  'USD-JPY': {
    drivers: [
      'The gap between US and Japanese interest rates. The Bank of Japan kept rates at or below zero for years while the Fed raised rates, which widened the gap and weakened the yen. The BoJ ended negative rates in March 2024, and each further step is watched closely.',
      'Japanese Ministry of Finance intervention. When the yen falls quickly, Tokyo has sold dollars to support it, as it did in 2022 and 2024. Verbal warnings from officials usually come first and can move the pair on their own.',
      'US Treasury yields. USD/JPY tends to track the 10-year Treasury yield closely, so a move in the US bond market often shows up in the pair within minutes.',
    ],
    notes: [
      { term: 'Withdrawing yen', text: 'Many ATMs in Japan, including those in convenience stores and post offices, accept foreign cards. Decline the ATM\'s offer to convert to dollars and let your card network handle the conversion.' },
      { term: 'Tax-free shopping', text: 'Visitors can buy goods tax-free in participating stores by showing a passport, subject to minimum spending per store. Japan has been moving to a refund-based system, so check the current procedure before you travel.' },
      { term: 'Cash still matters in places', text: 'Card acceptance in Japan has grown quickly, but some small restaurants, temples and rural businesses still take cash only. Carry a modest amount of yen as a backup.' },
    ],
    faq: [
      {
        question: 'Why did the yen weaken so much against the dollar in recent years?',
        answer: 'Mostly because of the interest-rate gap. US rates rose sharply from 2022 while Japanese rates stayed near zero, so investors could earn more by holding dollars, and yen-funded carry trades grew. Policy changes at either central bank remain the main thing to watch.',
      },
      {
        question: 'Can I use US dollars in Japan?',
        answer: 'In practice, no. Shops, restaurants and transport expect yen, and very few places accept foreign cash. Pay by card or withdraw yen from an ATM that accepts foreign cards.',
      },
    ],
  },

  'JPY-USD': {
    drivers: [
      'Safe-haven flows. During global market sell-offs, Japanese investors tend to bring money home and the yen often strengthens, even when the stress starts outside Japan.',
      'Unwinding of carry trades. When yen-funded positions are closed in a hurry, as in early August 2024, the yen can gain several percent against the dollar in a matter of days.',
      'Japan\'s energy import bill. Japan buys most of its oil and gas abroad in dollars, so higher energy prices raise importers\' demand for dollars and weigh on the yen.',
    ],
    notes: [
      { term: 'NISA and US funds', text: 'Since Japan expanded its tax-free NISA investment accounts in 2024, many households have bought foreign index funds. Even when a fund is bought in yen, the holdings underneath carry dollar exposure.' },
      { term: 'Remitting to the US', text: 'Japanese banks ask for the purpose of overseas remittances and may require identity documents under anti-money-laundering rules, so allow extra time for a first transfer.' },
      { term: 'US prices before tax', text: 'Most US shelf and menu prices exclude sales tax, which is added at the register and varies by state and city. Budget for a total a little above the displayed price.' },
    ],
    faq: [
      {
        question: 'Why does the yen rise when stock markets fall?',
        answer: 'Japan holds large investments abroad. In a crisis, Japanese investors tend to sell foreign assets and convert back to yen, and traders close carry trades that borrowed in yen. Both flows push the yen up.',
      },
      {
        question: 'Is now a good time to convert yen to dollars?',
        answer: 'No one can time the pair reliably. If you need dollars on a fixed date, for tuition or a trip, converting in several parts over a few months spreads the risk. For large amounts, ask your bank about forward contracts that fix the rate in advance.',
      },
    ],
  },

  'EUR-GBP': {
    drivers: [
      'Relative central bank policy. The ECB and the Bank of England have moved at different speeds in recent rate cycles, and the gap between their expected rates drives most of the trend in the pair.',
      'UK-EU relations. Since Brexit, news about customs, the Northern Ireland arrangements and closer cooperation deals has moved the pair because it changes the outlook for UK trade with its largest partner.',
      'Shared shocks. EUR/GBP usually moves less than either currency against the dollar, because both economies face similar global shocks. Large moves tend to come from events specific to one side.',
    ],
    notes: [
      { term: 'Post-Brexit import costs', text: 'Goods shipped from the EU to the UK may face customs declarations and UK VAT at the border, so the converted price is not always the full cost of an order.' },
      { term: 'Holding euros in the UK', text: 'If you receive euros regularly, keeping them in a euro account and converting in larger batches can cost less than converting each payment. Check each batch against the mid-market rate here.' },
      { term: 'SEPA still applies', text: 'The UK remains part of the Single Euro Payments Area, so euro transfers between UK and EU accounts can be cheap, although not every UK bank offers SEPA on personal accounts.' },
    ],
    faq: [
      {
        question: 'Why does EUR/GBP move less than GBP/USD?',
        answer: 'The euro area and the UK trade heavily with each other and react to many of the same global events, so the pound and the euro often move together against the dollar. Only the differences between the two economies show up in EUR/GBP.',
      },
      {
        question: 'Is it cheaper to pay a European supplier in euros or in pounds?',
        answer: 'Paying in euros through a low-cost provider is usually cheaper, because suppliers who accept pounds often build a margin into their own exchange rate. Ask for both quotes and compare them with the mid-market rate on this page.',
      },
    ],
  },

  'GBP-EUR': {
    drivers: [
      'UK inflation and wage data. They shape expectations for Bank of England rates, and a surprise in either direction moves sterling against the euro.',
      'Euro-area growth. Weak data from Germany, the bloc\'s largest economy, can push the euro lower and lift GBP/EUR even with no change in the UK.',
      'Political events. The 2016 referendum produced one of the largest one-day falls in sterling\'s modern history, and UK elections and budgets still move the pair.',
    ],
    notes: [
      { term: 'Pensions paid abroad', text: 'The UK State Pension can be paid into a bank account abroad, and the conversion rate applied to every payment matters over the years. Compare it with the mid-market rate at least once a year.' },
      { term: 'The 90/180-day rule', text: 'Since Brexit, UK citizens can spend up to 90 days in any 180-day period in the Schengen area without a visa. Longer stays need a residence permit, which also affects whether you will need a local euro bank account.' },
      { term: 'Euro cash before travel', text: 'Buying euros at a UK airport is usually the most expensive option. Ordering in advance from a provider with a narrow spread, or paying with a card that has no foreign fees, typically costs much less.' },
    ],
    faq: [
      {
        question: 'How often should I check the rate if I convert my pension every month?',
        answer: 'Monthly is enough. Regular conversions average out short-term moves, so the bigger saving usually comes from choosing a provider with a smaller spread rather than from timing each payment.',
      },
      {
        question: 'Do I need a euro bank account to live in Spain or Portugal?',
        answer: 'For residents it is usually practical, since local bills and contracts often expect a local account. A multi-currency account can bridge the first months, but check whether local providers accept a foreign IBAN for direct debits.',
      },
    ],
  },

  'USD-CNY': {
    drivers: [
      'The daily fixing. Each morning the People\'s Bank of China sets a central parity rate, and the onshore yuan may trade only within 2% either side of it. Where the fixing lands relative to market expectations signals what Beijing wants.',
      'Trade flows and tariffs. US tariff announcements and Chinese export data move the pair, because exporters decide whether to convert their dollar earnings or hold them, which changes the supply of dollars onshore.',
      'The interest-rate gap. Chinese rates have been below US rates in recent years, which makes holding dollars more attractive and adds steady pressure on the yuan.',
    ],
    notes: [
      { term: 'Paying in China', text: 'Alipay and WeChat Pay now let visitors link foreign cards, which covers most daily payments. Fees can apply to larger transactions with foreign cards, so check the app\'s terms before you travel.' },
      { term: 'Paying a Chinese supplier', text: 'Many Chinese suppliers quote in dollars. Paying in yuan can sometimes earn a better price because the supplier avoids its own conversion costs, but only if your provider\'s yuan rate is competitive.' },
      { term: 'Keep some cash', text: 'Physical yuan is still legal tender everywhere, but many shops expect mobile payment. A modest amount of cash helps with taxis and small vendors when an app or card fails.' },
    ],
    faq: [
      {
        question: 'Why does the yuan move so little compared with other currencies?',
        answer: 'Because it is managed. The daily fixing and the 2% trading band limit how far the onshore rate can move in a day, and large state banks are widely reported to step in during volatile periods. Big changes still happen, but they tend to unfold over weeks rather than hours.',
      },
      {
        question: 'What is the difference between RMB and CNY?',
        answer: 'Renminbi is the name of the currency and the yuan is its unit, much like sterling and the pound. CNY is the code for the onshore currency, while CNH is used for yuan traded offshore, mainly in Hong Kong.',
      },
    ],
  },

  'CNY-USD': {
    drivers: [
      'China\'s growth outlook. Weak property, credit or retail data raise expectations of easing by the People\'s Bank of China, which tends to weaken the yuan.',
      'Capital flows. Residents of mainland China face an annual limit on buying foreign currency, which restrains outflows, but foreign purchases and sales of Chinese stocks and bonds still move the rate.',
      'The dollar\'s global trend. When the dollar weakens broadly, the central bank often lets the yuan strengthen, keeping the currency steadier against a basket of partners than against the dollar alone.',
    ],
    notes: [
      { term: 'Annual purchase quota', text: 'Individuals in mainland China can convert up to the equivalent of USD 50,000 per year for permitted purposes such as travel and study, with documents required for some uses.' },
      { term: 'Paying US tuition', text: 'US universities invoice in dollars. Paying through a bank with the admission documents ready, and well before the deadline, avoids a last-minute conversion at a poor rate.' },
      { term: 'Converting back on return', text: 'Unused dollars are bought back by banks at their buying rate, which is lower than the rate they sold them at. Converting only what you need avoids paying the spread twice.' },
    ],
    faq: [
      {
        question: 'Why is the rate at a Chinese bank different from this page?',
        answer: 'Chinese banks publish their own buying and selling rates each day around the official fixing, and the rate for cash differs from the rate for transfers. This page shows a mid-market reference, so a bank\'s selling rate for dollars will sit above it.',
      },
      {
        question: 'Does the offshore CNH rate matter for travelers from mainland China?',
        answer: 'Mostly not. Conversions through mainland banks use the onshore CNY rate. CNH matters for businesses and investors dealing in Hong Kong or other offshore markets, where the two rates can drift slightly apart.',
      },
    ],
  },

  'USD-INR': {
    drivers: [
      'Foreign portfolio investment. Purchases and sales of Indian stocks and bonds by foreign funds can swing the rupee quickly. The inclusion of Indian government bonds in major global bond indexes from 2024 brought a steady source of inflows.',
      'Reserve Bank of India management. The RBI holds large foreign-exchange reserves and uses them to smooth sharp moves, which is why the rupee tends to drift rather than jump.',
      'The trade balance. India runs a persistent deficit in goods trade, partly offset by services exports such as software and by remittances, and the balance between these flows sets the background pressure on the rupee.',
    ],
    notes: [
      { term: 'NRE and NRO accounts', text: 'Indians living abroad can hold NRE accounts, whose balances can be moved back abroad freely and whose interest is tax-free in India, and NRO accounts for income earned in India. Sending money to the right account affects taxes and repatriation later.' },
      { term: 'Purpose codes and FIRA', text: 'Indian banks classify incoming payments with purpose codes. Freelancers receiving export income may need the right code to obtain a foreign inward remittance advice for tax records.' },
      { term: 'Compare rupees delivered', text: 'Remittance services on the US-India corridor compete heavily, and an advertised zero fee often comes with a wider exchange margin. Compare the rupees delivered for the same dollar amount.' },
    ],
    faq: [
      {
        question: 'What is the best way to send dollars to India?',
        answer: 'For most amounts, online remittance services that convert near the mid-market rate and pay into an Indian account the same day are cheaper than bank wires. For large transfers, ask whether the provider offers a better rate above a certain amount.',
      },
      {
        question: 'Why does the rupee tend to weaken against the dollar over time?',
        answer: 'India has generally had higher inflation than the US, and the currencies of higher-inflation economies tend to lose value against lower-inflation ones over long periods. The RBI aims to keep that decline gradual rather than to stop it.',
      },
    ],
  },

  'INR-USD': {
    drivers: [
      'The Fed\'s rate path. Higher US rates make dollar assets more attractive relative to Indian ones and can pull money out of India.',
      'Indian inflation and RBI decisions. When the RBI raises rates or signals tighter policy, rupee assets become more rewarding to hold, which supports the currency.',
      'Emerging-market sentiment. In sell-offs across emerging markets the rupee usually weakens, although RBI intervention tends to make the fall smaller than for many peers.',
    ],
    notes: [
      { term: 'Liberalised Remittance Scheme', text: 'Resident individuals can send up to USD 250,000 per financial year under the LRS for permitted purposes such as education, travel and investment. Tax collected at source may apply to some remittances above set thresholds and can be adjusted against your income tax.' },
      { term: 'Forex cards for students', text: 'Students heading to the US often use prepaid forex cards loaded in dollars, which fix the rate at the moment of loading. Compare the loading rate with the mid-market rate, as it varies widely between issuers.' },
      { term: 'Paying US tuition', text: 'Tuition sent under the education purpose usually requires the admission letter and the fee invoice. Starting a few weeks before the deadline avoids converting in a rush at a poor rate.' },
    ],
    faq: [
      {
        question: 'How much money can I send from India to the US each year?',
        answer: 'Resident individuals can remit up to USD 250,000 per financial year under the Liberalised Remittance Scheme for permitted purposes. Banks ask for the purpose and supporting documents, and a PAN is required.',
      },
      {
        question: 'Is a forex card better than an international debit card?',
        answer: 'A forex card fixes the rate when you load it and often carries a lower markup than a standard debit card used abroad. A debit card converts on the day of each purchase, plus a markup that varies by bank, so compare both before you travel.',
      },
    ],
  },

  'USD-CAD': {
    drivers: [
      'Oil prices. Crude oil is one of Canada\'s largest exports, so the Canadian dollar tends to strengthen when oil rises and weaken when it falls.',
      'The Bank of Canada versus the Fed. The two economies are closely linked, so even small differences in their rate paths matter, and the pair often moves on rate decisions on either side of the border.',
      'Trade policy. The US buys about three quarters of Canada\'s exports, so tariff threats and trade negotiations hit the Canadian dollar directly.',
    ],
    notes: [
      { term: 'Sales tax at the register', text: 'As in the US, Canadian shelf prices usually exclude sales tax, which varies by province and is charged as GST, PST or a combined HST at checkout.' },
      { term: 'US dollars at the border', text: 'Some businesses near the border and in tourist areas accept US dollars, but at their own rate, which is often poor. Paying in Canadian dollars with a card that has no foreign transaction fee usually costs less.' },
      { term: 'Wiring money to Canada', text: 'Canadian accounts are identified by an institution number, a transit number and an account number. International wires also need the bank\'s SWIFT code, and missing details are a common cause of delays.' },
    ],
    faq: [
      {
        question: 'Can I use US dollars in Canada?',
        answer: 'Sometimes, mainly in border towns and tourist areas, but change comes back in Canadian dollars and the merchant\'s rate is rarely good. A card, or Canadian cash from an ATM, is usually cheaper.',
      },
      {
        question: 'Why does the Canadian dollar follow oil prices?',
        answer: 'Energy makes up a large share of Canada\'s exports, most of it sold to the US and priced in dollars. Higher oil prices mean more US dollars flowing into Canada and being converted into Canadian dollars, which supports the currency.',
      },
    ],
  },

  'CAD-USD': {
    drivers: [
      'Jobs reports on both sides. Canada often publishes its labour force survey on the same morning as the US payrolls report, so the pair frequently moves on the difference between the two.',
      'Household debt. Canadian households carry high debt relative to income, so the Bank of Canada pays close attention to how rates affect mortgage payments, which can limit how far it raises rates.',
      'Risk appetite. The Canadian dollar behaves like a commodity currency and usually weakens during global sell-offs, when investors move into the US dollar.',
    ],
    notes: [
      { term: 'Norbert\'s gambit', text: 'Investors with a Canadian brokerage account can convert large amounts by buying a security listed in both currencies and selling it in US dollars. It usually costs far less than a bank conversion, but takes a few days and involves some market risk.' },
      { term: 'US dollar accounts', text: 'Most Canadian banks offer US dollar accounts, which let you keep dollars from US income or travel without converting back and forth.' },
      { term: 'Snowbird budgets', text: 'Canadians spending winters in the US need dollars for months at a time. Converting planned amounts through a low-cost provider usually beats paying with a Canadian card, which typically adds a foreign transaction fee of around 2.5%.' },
    ],
    faq: [
      {
        question: 'What is the cheapest way to convert Canadian dollars to US dollars?',
        answer: 'For large amounts, Norbert\'s gambit through a brokerage account is often the cheapest route. For smaller or regular amounts, online transfer services and US dollar bank accounts beat a standard card or branch conversion. Compare the US dollars you receive, not just the fee.',
      },
      {
        question: 'Why is the Canadian dollar called the loonie?',
        answer: 'The one-dollar coin introduced in 1987 shows a loon, a common Canadian bird, and the nickname spread to the currency. Traders use it for the USD/CAD exchange rate as well.',
      },
    ],
  },

  'USD-CHF': {
    drivers: [
      'Safe-haven demand. The franc tends to strengthen when global investors look for safety, so USD/CHF can fall during market stress even while the dollar rises against other currencies.',
      'Swiss National Bank policy. The SNB has used negative interest rates, between 2015 and 2022, and currency intervention to keep the franc from becoming too strong for Swiss exporters.',
      'Low Swiss inflation. Switzerland has kept inflation below US levels over long periods, which tends to strengthen the franc over time.',
    ],
    notes: [
      { term: 'Swiss price levels', text: 'Switzerland is one of the most expensive countries in Europe for visitors, so budgets based on euro-area prices usually fall short. Plan the amount you convert accordingly.' },
      { term: 'Francs, not euros', text: 'Switzerland is in the Schengen area but not in the EU, and it uses francs. Some shops accept euros at a poor rate and give change in francs, so paying by card in francs is usually cheaper.' },
      { term: 'VAT refunds', text: 'Visitors can reclaim Swiss VAT on larger purchases from shops that offer tax-free shopping, subject to a minimum amount per receipt and an export stamp when leaving.' },
    ],
    faq: [
      {
        question: 'Why is the Swiss franc considered a safe haven?',
        answer: 'Switzerland combines political stability, low inflation, a large current-account surplus and a strong legal system. Investors tend to buy francs in a crisis, which can push the currency up sharply, as happened when the SNB removed its cap against the euro in January 2015.',
      },
      {
        question: 'Can I pay with US dollars in Switzerland?',
        answer: 'Rarely. A few hotels and tourist shops accept foreign currency, mostly euros, at their own rate. Paying by card in francs or withdrawing francs from an ATM is the practical option.',
      },
    ],
  },

  'CHF-USD': {
    drivers: [
      'US yields. Because Swiss interest rates are low, a rise in US yields widens the gap in favor of the dollar and tends to weaken the franc against it.',
      'SNB currency operations. The SNB publishes its foreign-exchange interventions every quarter, and statements about its willingness to sell francs can move the pair.',
      'European developments. The euro area is Switzerland\'s main trading partner, so euro-area stress often pushes money into francs, lifting the franc against the dollar as well.',
    ],
    notes: [
      { term: 'Investing in US assets', text: 'Swiss investors who buy US shares or funds take on dollar exposure. Because Swiss rates are lower than US rates, hedging that exposure in the forward market carries a noticeable yearly cost.' },
      { term: 'Bank margins', text: 'Swiss retail banks often charge sizeable margins on currency conversion. Online brokers and transfer services usually come closer to the mid-market rate shown here.' },
      { term: 'Tipping in the US', text: 'Tips of 15% to 20% are customary in US restaurants and are not included in menu prices, so budget beyond the listed price when converting for a trip.' },
    ],
    faq: [
      {
        question: 'Why does the franc hold its value so well against the dollar?',
        answer: 'Over decades, Switzerland\'s lower inflation and persistent current-account surplus have supported the franc. The dollar has still had long periods of strength, so the long-term trend does not guarantee the next year.',
      },
      {
        question: 'Should a Swiss investor hedge dollar investments?',
        answer: 'It depends on the horizon and the cost. Hedging removes currency swings but costs roughly the interest-rate gap between the two currencies each year. Many long-term investors hedge part of the exposure rather than all of it. This is general information, not investment advice.',
      },
    ],
  },

  'USD-AUD': {
    drivers: [
      'Chinese demand for raw materials. Iron ore, coal and natural gas dominate Australia\'s exports and China is the largest buyer, so Chinese growth news moves the Australian dollar.',
      'Reserve Bank of Australia decisions. The RBA meets eight times a year, and changes in its guidance move the Australian dollar against the US dollar.',
      'Global risk appetite. The Australian dollar is a classic risk-sensitive currency that tends to rise when stocks rally and fall in sell-offs.',
    ],
    notes: [
      { term: 'Prices include GST', text: 'Australian shelf prices include the 10% goods and services tax, so the price you see is the price you pay at the register.' },
      { term: 'Tourist Refund Scheme', text: 'Visitors can claim back GST on goods bought from a single business above a minimum total spend, by showing the goods and receipts at the airport when leaving Australia.' },
      { term: 'Card surcharges', text: 'Some Australian merchants add a surcharge for card payments, which must be disclosed before you pay. Check the total at the terminal.' },
    ],
    faq: [
      {
        question: 'Why is the Australian dollar called a commodity currency?',
        answer: 'Australia\'s export earnings depend heavily on mining and energy. When commodity prices rise, foreign buyers need more Australian dollars, which tends to lift the currency.',
      },
      {
        question: 'Is tipping expected in Australia?',
        answer: 'No. Service wages are higher than in the US and tipping is optional, so budget for the listed price when converting for a trip.',
      },
    ],
  },

  'AUD-USD': {
    drivers: [
      'The gap between RBA and Fed rates. When US rates rise faster than Australian rates, the Australian dollar tends to weaken against the US dollar.',
      'Iron ore prices. A sustained fall in iron ore prices reduces Australia\'s export income and usually weighs on the currency.',
      'Australian jobs and inflation data. Employment figures and inflation readings shape expectations for the RBA and often move AUD/USD on release.',
    ],
    notes: [
      { term: 'GST on overseas orders', text: 'Goods bought online from overseas with a value of A$1,000 or less are charged GST at the point of sale, so a US store\'s checkout price for Australian customers may already include it.' },
      { term: 'Card fees in the US', text: 'Many Australian cards charge a foreign transaction fee on US purchases, commonly between 2% and 3%. A fee-free travel card or a multi-currency account avoids it.' },
      { term: 'Buying US shares', text: 'Many Australians buy US shares through local brokers. Check the currency conversion margin, which is charged on top of brokerage and can cost more than the trade fee itself.' },
    ],
    faq: [
      {
        question: 'Why is the Australian dollar usually worth less than the US dollar?',
        answer: 'The level reflects history, not quality. AUD/USD has spent most of the time since the currency was floated in 1983 below one, but it traded above parity during the strong commodity cycle around 2011 and 2012.',
      },
      {
        question: 'Does the time of day affect the AUD/USD rate?',
        answer: 'The pair trades almost around the clock and is busiest during Australian and Asian business hours and when US data is released. For consumers, the provider\'s spread matters far more than the hour of conversion.',
      },
    ],
  },

  'EUR-BRL': {
    drivers: [
      'Two legs, one rate. Most EUR/BRL trading is priced through the dollar by combining EUR/USD and USD/BRL, so a move in either leg changes the cross, even with no news from Europe or Brazil.',
      'The interest-rate gap. Brazilian rates sit far above euro-area rates, which makes the real attractive for carry trades and supports it while global markets are calm.',
      'EU-Brazil trade. Brazil sells farm goods, minerals and aircraft to Europe, and progress on the trade agreement between the EU and Mercosur is watched by exporters on both sides.',
    ],
    notes: [
      { term: 'Sending euros to Brazil', text: 'Several international transfer services pay out in reais to Brazilian accounts, often within a day, at rates closer to mid-market than a traditional SWIFT transfer from a European bank.' },
      { term: 'European cards in Brazil', text: 'Cards from euro-area banks work widely in Brazil. If a terminal offers to charge you in euros, decline and pay in reais so your card network applies its own, usually better, rate.' },
      { term: 'Wider retail spreads', text: 'Fewer dealers in Brazil quote euros directly against reais than dollars, so retail spreads on EUR/BRL tend to be wider than on USD/BRL. Comparing two or three quotes pays off.' },
    ],
    faq: [
      {
        question: 'Why does the euro-real rate move when the US publishes data?',
        answer: 'Because the pair is mostly traded through the dollar. US data moves both EUR/USD and USD/BRL, and the cross reflects the combination. If the dollar moves by the same proportion against both currencies, EUR/BRL barely changes; otherwise it moves.',
      },
      {
        question: 'Is the euro-real spread wider than the dollar-real spread?',
        answer: 'Usually yes for retail clients. Many providers price the pair through the dollar and add a margin on each leg. Comparing the reais delivered for the same euro amount is the simplest test.',
      },
    ],
  },

  'BRL-EUR': {
    drivers: [
      'Brazil\'s risk premium. Investor views on Brazilian public finances show up first in the real, so fiscal headlines from Brasília often move BRL/EUR more than European news does.',
      'ECB decisions. Changes in euro-area rates alter the euro\'s appeal for global investors, which feeds into the cross through EUR/USD.',
      'Commodity cycles. Higher prices for Brazil\'s main exports bring foreign currency into the country and tend to strengthen the real against the euro as well as the dollar.',
    ],
    notes: [
      { term: 'Moving to Portugal or the euro area', text: 'Brazilians moving to Portugal or another euro-area country often need to show savings or income in euros for a visa. Converting gradually ahead of the deadline reduces the risk of a bad rate on a single day.' },
      { term: 'Brazilian cards in Europe', text: 'Spending in euros with a Brazilian credit card adds IOF and the issuer\'s own euro rate. A multi-currency account loaded in advance lets you see the euro rate before you commit.' },
      { term: 'Euro cash in Brazil', text: 'Exchange houses in Brazil usually sell euros with a wider spread than dollars, because there is less demand and more handling cost. Order in advance and compare quotes.' },
    ],
    faq: [
      {
        question: 'Is it better to take euros or dollars to Europe?',
        answer: 'Take euros, or a card. Converting reais to dollars and then dollars to euros means paying two spreads, and very few places in Europe accept dollars.',
      },
      {
        question: 'How much does a Brazilian card cost on purchases in euros?',
        answer: 'The cost combines IOF with the issuer\'s margin over its reference rate. Issuers publish the rate they apply each day, so you can compare it with the mid-market figure on this page to see the margin.',
      },
    ],
  },

  'GBP-BRL': {
    drivers: [
      'Sterling\'s own swings. The pound moves on UK inflation, Bank of England decisions and fiscal news, and those moves pass straight into GBP/BRL.',
      'Emerging-market risk appetite. The real is more volatile than the pound, so in global sell-offs GBP/BRL usually rises as investors leave Brazilian assets.',
      'The dollar legs. Like most real crosses, GBP/BRL is largely priced through GBP/USD and USD/BRL, so it can move on US news alone.',
    ],
    notes: [
      { term: 'Sending money from the UK to Brazil', text: 'UK-based specialists convert pounds to reais and pay into Brazilian accounts, often faster and cheaper than a high-street bank wire. Ask for the quote in reais delivered.' },
      { term: 'Regular transfers home', text: 'Brazilians working in the UK and sending money home save more by choosing a provider with a small margin and transferring on a regular schedule than by trying to time each transfer.' },
      { term: 'UK cards in Brazil', text: 'Many UK debit cards charge a non-sterling transaction fee, so a fee-free travel card makes a noticeable difference when spending in Brazil. Always choose to pay in reais.' },
    ],
    faq: [
      {
        question: 'Why is GBP/BRL so volatile?',
        answer: 'It combines sterling\'s sensitivity to UK politics with the real\'s sensitivity to global risk and Brazilian fiscal news. When the two move in opposite directions at once, the cross can swing several percent in a short time.',
      },
      {
        question: 'How do I get the best rate sending pounds to Brazil?',
        answer: 'Compare the reais the recipient will receive across two or three providers on the same day. Banks often show a low fee while building a wide margin into the rate.',
      },
    ],
  },

  'BRL-GBP': {
    drivers: [
      'Selic decisions. A higher Selic increases the return on holding reais and tends to support the real against sterling.',
      'UK inflation. Persistent UK inflation keeps Bank of England rates higher for longer, which supports sterling and pushes BRL/GBP down.',
      'Brazilian politics. Election periods in Brazil, especially when markets doubt fiscal commitments, have produced sharp moves in the real against every major currency.',
    ],
    notes: [
      { term: 'Studying in the UK', text: 'UK universities charge international students in pounds, often in instalments. Converting each instalment ahead of its due date avoids a rushed conversion at a poor rate.' },
      { term: 'Proof of funds for a visa', text: 'UK student visas require proof of funds held for a set period before you apply, so plan when to convert around that requirement rather than at the last minute.' },
      { term: 'London living costs', text: 'Living costs in London are well above the rest of the UK, so a budget built on national averages often falls short. Plan the conversion around the city you will live in.' },
    ],
    faq: [
      {
        question: 'Do I need to convert reais to pounds before arriving in the UK?',
        answer: 'Very little. Cards are accepted almost everywhere in the UK, so a small amount of cash or none at all is enough. A multi-currency account or a card without high foreign fees covers most spending.',
      },
      {
        question: 'Why do Brazilian exchange houses quote pounds with a wide spread?',
        answer: 'Pounds are traded far less in Brazil than dollars or euros, so dealers hold small stocks of cash and charge more to cover cost and risk. The gap to the mid-market rate shown here is usually larger than for dollars.',
      },
    ],
  },

  'JPY-BRL': {
    drivers: [
      'Carry trades. Borrowing in low-yield yen to buy high-yield Brazilian assets is a well-known strategy, so JPY/BRL can move sharply when those trades are opened or closed in a hurry.',
      'Japanese monetary policy. Steps by the Bank of Japan toward higher rates make the yen more attractive and can trigger the unwinding of carry trades.',
      'Brazilian rates and risk. A cut in the Selic or a rise in Brazilian risk reduces the appeal of the real and pushes JPY/BRL up.',
    ],
    notes: [
      { term: 'A long-standing corridor', text: 'Brazil has the largest population of Japanese descent outside Japan, and many families send money between the two countries. Licensed remittance services on this corridor often beat bank wires.' },
      { term: 'Small unit value', text: 'One yen is worth only a few centavos, so JPY/BRL is quoted with several decimals. Compare percentage gaps between quotes rather than absolute numbers.' },
      { term: 'Priced through the dollar', text: 'Few dealers quote yen against reais directly, so most conversions go through the dollar. That is one reason retail spreads on this pair are wider than on USD/BRL.' },
    ],
    faq: [
      {
        question: 'Why does the yen-real rate jump during global sell-offs?',
        answer: 'In a sell-off, investors close carry trades: they sell high-yield currencies like the real and buy back yen to repay loans. Both moves push JPY/BRL up at the same time, so the cross often moves more than either currency against the dollar.',
      },
      {
        question: 'How do workers in Japan send money to Brazil?',
        answer: 'Most use licensed remittance services rather than banks, sending yen from Japan and paying out reais in Brazil. Comparing the reais delivered for the same yen amount shows which provider is cheaper.',
      },
    ],
  },

  'BRL-JPY': {
    drivers: [
      'The yen\'s safe-haven role. During global stress the yen tends to rise and the real to fall, so BRL/JPY drops sharply in risk-off periods.',
      'Japanese inflation and wages. These data shape expectations for the Bank of Japan\'s rate path, which feeds directly into the yen.',
      'Brazil\'s terms of trade. Higher prices for Brazilian exports relative to its imports support the real against the yen.',
    ],
    notes: [
      { term: 'Getting yen for a trip', text: 'Many ATMs in Japan accept foreign cards, including those in convenience stores. Withdrawing yen in Japan usually costs less than buying yen cash in Brazil.' },
      { term: 'Yen cash in Brazil', text: 'Yen is less common in Brazilian exchange houses than dollars or euros, and spreads are wider. Order in advance if you need cash before departure.' },
      { term: 'Savings earned in Japan', text: 'Brazilians on study or work programs in Japan are paid in yen. Converting savings back to reais in planned amounts avoids being forced to convert during a yen slump.' },
    ],
    faq: [
      {
        question: 'Should I take dollars to Japan and convert them there?',
        answer: 'That means paying two spreads, reais to dollars and dollars to yen. Paying by card or withdrawing yen directly in Japan is usually cheaper.',
      },
      {
        question: 'Why did my reais buy more yen in some recent years?',
        answer: 'The yen weakened broadly while Japanese interest rates stayed near zero and Brazilian rates were high, which favored the real. If Japanese rates rise or global stress returns, that can reverse.',
      },
    ],
  },

  'CAD-BRL': {
    drivers: [
      'Two commodity exporters. Canada and Brazil both depend on commodity exports, so a global commodity boom can lift both currencies at once, leaving CAD/BRL steadier than either against the dollar.',
      'Rate differentials. The large gap between Canadian and Brazilian interest rates favors the real while markets are calm.',
      'Brazilian fiscal risk. When investors worry about Brazil\'s public debt, the real falls against most currencies, including the Canadian dollar.',
    ],
    notes: [
      { term: 'Brazilians in Canada', text: 'Canada has a growing Brazilian community of students and skilled workers. Regular transfers home through a remittance service usually beat a Canadian bank wire.' },
      { term: 'How payouts work', text: 'Money arriving in Brazil is converted under a Brazilian câmbio contract. Services that pay out directly in reais handle that step for you and show the final amount before you send.' },
      { term: 'Priced through the US dollar', text: 'CAD/BRL is mostly priced through the US dollar, so retail spreads tend to be wider than on USD/BRL. Compare quotes in reais delivered.' },
    ],
    faq: [
      {
        question: 'Why do the Canadian dollar and the real sometimes move together?',
        answer: 'Both economies export commodities, so higher global commodity prices tend to support both currencies. The cross moves mainly when one side has its own news, such as a change in interest rates or fiscal policy.',
      },
      {
        question: 'Is it cheaper to convert Canadian dollars to reais directly?',
        answer: 'For consumers, a direct quote is usually better than converting to US dollars first, because two conversions mean two spreads. Check the reais delivered in each case.',
      },
    ],
  },

  'BRL-CAD': {
    drivers: [
      'Canadian rates and housing. The Bank of Canada\'s decisions, shaped partly by mortgage costs, affect how attractive the Canadian dollar is to hold.',
      'US-Canada trade. Trade tensions with the US weigh on the Canadian dollar and can lift BRL/CAD even without Brazilian news.',
      'The Selic. Higher Brazilian rates support the real against the Canadian dollar, especially when global markets are calm.',
    ],
    notes: [
      { term: 'Study permit funds', text: 'Canadian study permit applications require proof of funds, and the required amount has been raised in recent years. Check the current figure on the Canadian government\'s website before converting.' },
      { term: 'Banking on arrival', text: 'Opening a Canadian bank account usually requires a passport and immigration documents. A card that works abroad covers the first weeks.' },
      { term: 'Converting for a move', text: 'For a move, converting in a few planned amounts during the months before departure reduces the risk of locking in a bad rate on a single day.' },
    ],
    faq: [
      {
        question: 'How much money do I need to show for a Canadian study permit?',
        answer: 'The amount is set by Immigration, Refugees and Citizenship Canada and has been updated in recent years. Check the official figure before planning the conversion, since you will need to show it in Canadian dollars or the equivalent.',
      },
      {
        question: 'Should I convert reais to US dollars first and then to Canadian dollars?',
        answer: 'Usually not. Two conversions mean two spreads. A provider that quotes reais to Canadian dollars directly is normally cheaper, even if it prices the pair through the dollar behind the scenes.',
      },
    ],
  },

  'AUD-BRL': {
    drivers: [
      'China links both. China is the largest buyer of Australian iron ore and Brazil\'s largest trading partner, so Chinese growth tends to move both currencies in the same direction.',
      'Rate differentials. Brazilian rates are well above Australian rates, which favors the real while investors are comfortable taking risk.',
      'Iron ore competition. Australia and Brazil are the world\'s two largest iron ore exporters, so supply problems in one country can lift the other\'s export earnings.',
    ],
    notes: [
      { term: 'Brazilians in Australia', text: 'Many Brazilians study in Australia and work part-time while there. Wages are paid in Australian dollars, and sending savings home in planned amounts avoids being forced to convert at a weak moment.' },
      { term: 'Bank transfers vs specialists', text: 'Australian banks charge for international transfers and add a margin to the rate. Specialist services that pay out in reais are usually cheaper.' },
      { term: 'The US dollar in the middle', text: 'Most dealers price AUD/BRL through the US dollar, so a large move in the US dollar can shift the cross even when nothing changes in Australia or Brazil.' },
    ],
    faq: [
      {
        question: 'Why does AUD/BRL often move less than the real against the dollar?',
        answer: 'Both currencies are seen as risk-sensitive and linked to China, so in global sell-offs both tend to fall against the US dollar. That limits how much the cross between them moves.',
      },
      {
        question: 'Is it worth converting Australian dollars to reais all at once?',
        answer: 'For a one-off amount, splitting the conversion into a few parts over several weeks reduces timing risk. For regular transfers, choosing a provider with a smaller spread usually saves more than timing.',
      },
    ],
  },

  'BRL-AUD': {
    drivers: [
      'RBA guidance. Changes in the Reserve Bank of Australia\'s outlook move the Australian dollar and pass straight into BRL/AUD.',
      'Brazilian domestic politics. Fiscal and political news from Brasília can move the real sharply against every currency, the Australian dollar included.',
      'Global risk appetite. Both currencies tend to fall in sell-offs, but the real usually falls further, so BRL/AUD often drops in risk-off periods.',
    ],
    notes: [
      { term: 'Student visa funds', text: 'Australian student visa applications require evidence of funds, and the required amount is updated periodically. Check the current figure with the Department of Home Affairs before converting.' },
      { term: 'Overseas Student Health Cover', text: 'Student visa holders must keep Overseas Student Health Cover for their whole stay. It is an extra cost in Australian dollars to include in the budget.' },
      { term: 'An Australian account early', text: 'Opening an Australian bank account soon after arrival makes it easier to receive transfers in Australian dollars and avoid repeated card fees.' },
    ],
    faq: [
      {
        question: 'Is it better to send reais to Australia or pay with a Brazilian card?',
        answer: 'For living costs, a transfer to an Australian bank account is usually cheaper than paying everything with a Brazilian card, which adds IOF and the issuer\'s margin to each purchase.',
      },
      {
        question: 'Why does the Australian dollar fall when stock markets drop?',
        answer: 'Investors see it as a risk-sensitive currency tied to commodities and Asian growth, so they sell it in sell-offs. The real tends to fall even more under the same conditions.',
      },
    ],
  },

  'CHF-BRL': {
    drivers: [
      'Safe haven against high yield. The franc is a safe haven and the real a high-yield currency, so CHF/BRL rises sharply when global markets panic.',
      'SNB policy. A Swiss National Bank willing to lower rates or sell francs restrains the franc\'s strength.',
      'The Selic. As long as Brazilian rates stay far above Swiss rates, holding reais pays a large carry, which supports the real in calm markets.',
    ],
    notes: [
      { term: 'Swiss salaries, Brazilian expenses', text: 'Brazilians working in Switzerland often send part of their salary home. The gap between a Swiss bank\'s conversion rate and a specialist service can be large, so compare both.' },
      { term: 'Priced through other currencies', text: 'Few dealers quote francs against reais directly. Most price the cross through the dollar or the euro, which widens retail spreads.' },
      { term: 'Large transfers', text: 'For larger amounts, such as a property purchase, ask providers for a quote in reais delivered and confirm how long the quoted rate is held.' },
    ],
    faq: [
      {
        question: 'Why is CHF/BRL so volatile in a crisis?',
        answer: 'It pairs one of the strongest safe-haven currencies with a risk-sensitive one. In a crisis the franc tends to rise and the real to fall at the same time, which amplifies the move in the cross.',
      },
      {
        question: 'How should I send francs to Brazil?',
        answer: 'Compare a Swiss bank transfer with specialist services that pay out reais in Brazil, looking at the reais delivered. Specialists are often cheaper because their margin over the mid-market rate is smaller.',
      },
    ],
  },

  'BRL-CHF': {
    drivers: [
      'Swiss inflation and rates. Very low Swiss inflation keeps SNB rates low, which reduces the franc\'s yield but not its appeal as a store of value.',
      'Euro-area stress. When Europe faces financial or political stress, money flows into francs, pushing BRL/CHF down.',
      'Brazilian fiscal credibility. Confidence in Brazil\'s fiscal rules supports the real against all major currencies, the franc included.',
    ],
    notes: [
      { term: 'Traveling to Switzerland', text: 'Switzerland is expensive for Brazilian travelers, and franc cash is harder to find in Brazil than dollars or euros. A card or a multi-currency account is usually more practical.' },
      { term: 'Leftover euros', text: 'Switzerland does not use the euro. Shops that accept euros apply their own rate, so spending euros left over from another European trip is usually a poor deal.' },
      { term: 'Studying in Switzerland', text: 'Swiss residence permits for students require proof of sufficient funds, and living costs are high. Plan conversions around both the permit and the monthly budget.' },
    ],
    faq: [
      {
        question: 'Why has the franc gained so much against the real over time?',
        answer: 'Switzerland has had much lower inflation than Brazil for decades, and currencies of low-inflation economies tend to gain value against those with higher inflation over long periods.',
      },
      {
        question: 'Can I buy Swiss francs in Brazil?',
        answer: 'Some exchange houses sell them, but stocks are small and spreads are wide. Ordering in advance, or withdrawing francs in Switzerland, is usually more practical.',
      },
    ],
  },

  'CNY-BRL': {
    drivers: [
      'Brazil\'s largest trading partner. China buys a large share of Brazil\'s soy, iron ore, oil and beef, so Chinese demand matters for Brazil\'s export income and for the real.',
      'The yuan\'s managed path. Because the People\'s Bank of China manages the yuan, most of the day-to-day movement in CNY/BRL comes from the real.',
      'Settlement in local currencies. Brazil and China have taken steps to settle more trade in yuan and reais, but most of the trade is still invoiced in dollars.',
    ],
    notes: [
      { term: 'Importing from China', text: 'Brazilian importers usually pay Chinese suppliers in dollars. Paying in yuan is possible through some banks and can make sense if the supplier offers a better price, but compare the full cost.' },
      { term: 'Small online orders', text: 'Purchases from Chinese online platforms now pay federal import tax and state ICMS even at low values, so the converted price is only part of the final cost.' },
      { term: 'Yuan cash', text: 'Yuan is rarely available in Brazilian exchange houses. Travelers to China usually rely on a card linked to Alipay or WeChat Pay.' },
    ],
    faq: [
      {
        question: 'Why are Chinese online orders more expensive than the converted price?',
        answer: 'Since 2024, purchases from abroad, including from Chinese platforms, pay federal import tax and ICMS even for low-value orders. The exchange rate is only one part of the final price.',
      },
      {
        question: 'Can Brazil and China trade without the dollar?',
        answer: 'Some trade is settled directly in yuan and reais, and both countries have built infrastructure for it, but the dollar remains the main invoicing currency for commodities. For most companies, converting through the dollar is still the default.',
      },
    ],
  },

  'BRL-CNY': {
    drivers: [
      'Commodity prices. Higher prices for what Brazil sells to China strengthen the real against the yuan.',
      'The PBOC fixing. Changes in the daily yuan fixing affect the cross, although the yuan usually moves less than the real.',
      'Risk appetite. The real weakens against the yuan in global sell-offs, when investors leave higher-risk emerging markets.',
    ],
    notes: [
      { term: 'Paying in China', text: 'Visitors can link a foreign card to Alipay or WeChat Pay, which covers most payments in China. Check that your Brazilian card works with the apps and how much IOF and margin it adds.' },
      { term: 'Paying suppliers in yuan', text: 'Brazilian companies can pay Chinese suppliers in yuan through banks that offer it, which may lower the supplier\'s own conversion costs. Ask for quotes in both dollars and yuan.' },
      { term: 'Checkout in reais', text: 'When a Chinese platform offers to charge you in reais, its own exchange margin is usually built in. Compare that price with paying in the platform\'s base currency on your card.' },
    ],
    faq: [
      {
        question: 'Is it easy to buy yuan in Brazil?',
        answer: 'Not really. Few exchange houses stock it. For a trip, a card linked to a Chinese payment app, or ATM withdrawals in China, are more practical.',
      },
      {
        question: 'Why does the real move more than the yuan?',
        answer: 'The yuan is managed within a daily band around the official fixing, while the real floats freely and reacts to global risk and Brazilian news. Most of the daily change in BRL/CNY comes from the real.',
      },
    ],
  },

  'USD-MXN': {
    drivers: [
      'Banxico\'s high rates. Mexico\'s central bank has kept rates well above US rates, which makes the peso popular for carry trades and supports it while markets are calm.',
      'US trade policy. The US is by far Mexico\'s largest export market, so tariff threats and reviews of the USMCA agreement move the peso quickly.',
      'A liquid proxy. The peso is one of the most traded emerging-market currencies, so global funds use it to hedge emerging-market exposure, and it can move on news from elsewhere.',
    ],
    notes: [
      { term: 'Remittances', text: 'Money sent by workers in the US is one of Mexico\'s largest sources of foreign income, and remittance services compete heavily. Compare the pesos delivered, not the advertised fee.' },
      { term: 'Cash-funded transfers', text: 'Since 2026, the US applies a 1% excise tax to remittances paid for in cash or similar instruments, while transfers funded from a US bank account or card are exempt. Funding the transfer from an account avoids it.' },
      { term: 'Paying in pesos', text: 'In border and tourist areas prices are sometimes shown in dollars, but paying in pesos with a low-fee card usually costs less than accepting the merchant\'s dollar rate.' },
    ],
    faq: [
      {
        question: 'Why was the Mexican peso called the super peso?',
        answer: 'The nickname spread in 2023, when the peso reached its strongest level against the dollar in years, helped by high Mexican interest rates and nearshoring investment. Part of that gain later reversed when political and trade risks rose.',
      },
      {
        question: 'What is the cheapest way to send dollars to Mexico?',
        answer: 'Online services that pay into a Mexican bank account through the SPEI system, or for cash pickup, usually beat bank wires. Funding the transfer from a bank account rather than cash also avoids the US remittance tax on cash-funded transfers.',
      },
    ],
  },

  'MXN-USD': {
    drivers: [
      'Mexican politics. The 2024 election and the judicial reform that followed caused sharp drops in the peso, as investors questioned the country\'s institutional checks.',
      'Nearshoring investment. Companies moving production to Mexico to serve the US market bring in dollars that support the peso over time.',
      'US growth. A strong US economy lifts demand for Mexican exports and supports remittances, both of which help the peso.',
    ],
    notes: [
      { term: 'Limits on dollar cash', text: 'Mexican banks restrict how many US dollars in cash individuals can deposit or exchange, under anti-money-laundering rules. Larger amounts usually need a bank transfer.' },
      { term: 'Mexican cards abroad', text: 'Mexican credit and debit cards charge a commission on foreign purchases that varies by bank. Compare it with a multi-currency account before a trip to the US.' },
      { term: 'Large dollar purchases', text: 'For a large payment in dollars, such as tuition or a vehicle, converting in several parts over a few weeks reduces the risk of a sharp peso drop on a single day.' },
    ],
    faq: [
      {
        question: 'Why does the peso fall so quickly in some weeks?',
        answer: 'It is liquid and widely used to hedge emerging-market risk, so global sell-offs and Mexican political news can hit it fast. High interest rates usually help it recover once markets calm down.',
      },
      {
        question: 'Should I exchange pesos in Mexico or in the US?',
        answer: 'Exchange houses near the border can be competitive, while airport counters on both sides are usually the most expensive. Comparing the dollars you get per peso at two or three places is the simplest check.',
      },
    ],
  },

  'USD-KRW': {
    drivers: [
      'The semiconductor cycle. Chips are Korea\'s largest export, so global demand for memory chips moves the won.',
      'Foreign flows into Korean stocks. Foreign buying and selling of Korean shares, especially the large chipmakers, moves the won from day to day.',
      'Bank of Korea policy. The BoK weighs rate decisions against high household debt and housing prices, which affects the gap with US rates.',
    ],
    notes: [
      { term: 'Transit cards', text: 'Visitors can buy rechargeable transit cards such as T-money at convenience stores and top them up with cash, which covers subways and buses in major cities.' },
      { term: 'Tax refunds', text: 'Foreign visitors can get immediate tax refunds on purchases at participating stores, within set limits per purchase and per trip.' },
      { term: 'Exchanging cash in Seoul', text: 'Licensed money changers in central Seoul often offer better rates for cash than airport counters. For most spending, a low-fee card avoids cash conversion altogether.' },
    ],
    faq: [
      {
        question: 'Why is USD/KRW so sensitive to the tech sector?',
        answer: 'Semiconductors and electronics make up a large share of Korean exports and of its stock market. When chip demand rises, exporters bring in dollars and foreign investors buy Korean shares, both of which support the won.',
      },
      {
        question: 'Where should I exchange dollars in Korea?',
        answer: 'Banks and licensed money changers in the city usually beat airport counters. For everyday spending, a card with low foreign fees is simpler and often cheaper.',
      },
    ],
  },

  'KRW-USD': {
    drivers: [
      'Korean investors abroad. Korean retail investors have bought US stocks heavily in recent years, which means selling won for dollars and adds steady pressure on the won.',
      'Pension fund hedging. Korea\'s National Pension Service invests heavily abroad, and changes in how much of that exposure it hedges can move the won.',
      'Geopolitical risk. Tensions on the Korean peninsula can trigger brief sell-offs in the won, although markets usually calm quickly.',
    ],
    notes: [
      { term: 'Documents for transfers abroad', text: 'Korean banks require supporting documents for overseas transfers above certain annual amounts. Students and investors should prepare them before a large conversion.' },
      { term: 'Dollar deposits', text: 'Many Korean savers hold dollar deposits at local banks to spread currency risk. Converting gradually into these accounts reduces timing risk.' },
      { term: 'Broker exchange rates', text: 'Korean brokers often offer discounted exchange rates on US stock purchases. Compare the effective rate with the mid-market rate shown here, since the discount varies.' },
    ],
    faq: [
      {
        question: 'Why do Korean investors buying US stocks affect the won?',
        answer: 'Each purchase of US shares requires selling won for dollars. When large numbers of retail investors do this at the same time, the combined flow adds to demand for dollars and can weaken the won.',
      },
      {
        question: 'Is it better to send won to the US through a bank or an app?',
        answer: 'For smaller amounts, licensed transfer apps are often cheaper and faster. For tuition and large transfers, banks may offer better rates on request and handle the required documents.',
      },
    ],
  },
}

export function getPairDetails(fromCode, toCode) {
  return PAIR_DETAILS[`${String(fromCode).toUpperCase()}-${String(toCode).toUpperCase()}`] ?? null
}
