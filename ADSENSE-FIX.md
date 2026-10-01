# Task: Reestruturar Conversor de Moedas para Aprovação no Google AdSense

## Contexto

- **Projeto:** Site conversor de moedas (Next.js / React, bilíngue PT-BR + EN, em produção com domínio próprio)
- **Problema:** Google AdSense reprovou o site. Causa-raiz quase certa: "valor agregado insuficiente" (thin content) + ausência de páginas legais obrigatórias + estrutura de site de página única
- **Objetivo:** Transformar o site de "ferramenta única" em "hub de conteúdo sobre câmbio" que o AdSense aprove

## Regras de Investigação Antes de Codar

1. **Leia primeiro** a estrutura do projeto: `package.json`, `next.config.*`, pasta `app/` ou `pages/`, `components/`, e qualquer pasta de conteúdo existente
2. **Identifique o roteamento:** App Router (`app/`) ou Pages Router (`pages/`)? Toda decisão de rotas depende disso
3. **Identifique a estratégia de i18n:** `next-intl`, `next-i18next`, ou rotas paralelas `/pt` e `/en`? Replicar o padrão existente, não inventar
4. **Identifique se há CMS** (Contentlayer, MDX, Sanity, Notion) ou se artigos serão MDX/Markdown estáticos
5. **NÃO assuma nada sobre o stack** — leia os arquivos e me diga o que encontrou antes de prosseguir para a Fase 2

## Fase 1: Auditoria e Plano (sem escrever código ainda)

Após ler o projeto, produza um arquivo `ADSENSE-PLAN.md` na raiz contendo:

1. **Stack confirmado:** versão do Next, App Router vs Pages Router, estratégia de i18n, framework de estilo (Tailwind?), CMS/MDX
2. **Páginas existentes hoje:** rotas mapeadas
3. **Lacunas para AdSense:** lista do que falta (legais, conteúdo, navegação, sitemap, robots.txt)
4. **Plano de implementação:** ordem das fases abaixo aplicadas a este projeto específico

Pare aqui e me mostre o `ADSENSE-PLAN.md` antes de seguir.

## Fase 2: Páginas Legais Obrigatórias

Crie estas páginas em PT e EN (seguindo o padrão de i18n do projeto):

1. **Política de Privacidade / Privacy Policy**
   - Menção explícita ao uso de cookies
   - Menção explícita ao Google AdSense e cookies DART
   - Menção ao Google Analytics se aplicável
   - Direitos do usuário (LGPD para BR, GDPR menção)
   - Email de contato real

2. **Termos de Uso / Terms of Service**
   - Disclaimer: o conversor usa taxas indicativas, não é assessoria financeira
   - Limitação de responsabilidade
   - Propriedade intelectual

3. **Sobre / About**
   - História do projeto, motivação, quem mantém
   - Fontes de dados de câmbio usadas (API de origem)
   - Frequência de atualização das taxas
   - Mínimo 300 palavras por idioma — conteúdo real, não placeholder

4. **Contato / Contact**
   - Formulário ou email visível
   - Não pode ser só um link `mailto:` no rodapé — precisa ser página própria

5. **Banner de cookies** (componente reutilizável)
   - Aceitar / Recusar
   - Link para Política de Privacidade
   - Persistir escolha em `localStorage`

## Fase 3: Hub de Conteúdo (Blog)

Crie a estrutura de blog em `/blog` (PT) e `/en/blog` (EN), com pelo menos **15 artigos** no total (mínimo 7-8 por idioma). Use MDX se já houver suporte, caso contrário configure MDX com `@next/mdx`.

### Tópicos obrigatórios (escreva conteúdo real, mínimo 800 palavras por artigo)

**Em português:**
1. Como funciona a taxa de câmbio: comercial, turismo, paralelo e PTAX
2. Por que o dólar sobe ou cai: fatores macroeconômicos explicados
3. IOF no câmbio: tabela atualizada e como calcular
4. Histórico do real frente ao dólar: linha do tempo desde o Plano Real
5. Câmbio para viagem internacional: dinheiro em espécie, cartão pré-pago ou cartão de crédito?
6. Como o Banco Central do Brasil influencia o câmbio
7. Hedge cambial para pequenas empresas: quando vale a pena
8. Diferença entre câmbio spot, forward e swap

**Em inglês:**
1. How exchange rates are determined: a complete guide
2. Floating vs fixed exchange rate systems explained
3. Top factors that move currency markets
4. Currency conversion fees: how banks and apps compare
5. Best practices for sending money internationally
6. Understanding bid-ask spread in forex
7. How central banks intervene in currency markets

### Padrão de cada artigo

- Frontmatter: `title`, `description`, `publishedAt`, `updatedAt`, `author`, `category`, `readingTime`, `locale`
- Estrutura: H1, intro de 2-3 parágrafos, 4-6 H2 com seções de 150-200 palavras cada, conclusão, CTA para o conversor
- Imagens com `alt` descritivo (mesmo que placeholders inicialmente)
- Links internos: cada artigo cita pelo menos 2 outros artigos do blog e o conversor
- Schema.org: marcação `Article` em JSON-LD no `<head>`

**NÃO gere conteúdo genérico de IA óbvio.** Escreva como um especialista brasileiro em câmbio escreveria: exemplos com R$ e US$, referências ao Banco Central, casos práticos do dia a dia.

## Fase 4: SEO Técnico

1. **`robots.txt`** em `public/robots.txt` permitindo crawl de tudo exceto `/api/*`
2. **`sitemap.xml` dinâmico** — rota `app/sitemap.ts` (App Router) ou `pages/sitemap.xml.ts` listando todas as páginas e artigos nos dois idiomas com `hreflang`
3. **Metadata por página:** `title`, `description`, `openGraph`, `twitter`, `alternates.languages` para PT/EN
4. **JSON-LD estrutural:**
   - `WebSite` na home
   - `Organization` no layout raiz
   - `Article` em cada post do blog
   - `BreadcrumbList` em rotas profundas
   - `FAQPage` em artigos que tenham seção de perguntas
5. **`<link rel="canonical">`** em todas as páginas
6. **`hreflang`** corretamente configurado entre PT e EN

## Fase 5: Estrutura de Navegação

1. **Header global:** Logo, Conversor, Blog, Sobre, Contato, toggle de idioma
2. **Footer global:** colunas com links para Política de Privacidade, Termos, Sobre, Contato, Blog, mais redes sociais se houver
3. **Breadcrumbs** em páginas internas (blog, posts, páginas legais)
4. **Página 404 customizada** com sugestões de navegação (não a default do Next)
5. **Página inicial enriquecida:** o conversor continua sendo o destaque, mas a home agora precisa ter:
   - Seção "Como funciona" (200 palavras)
   - Seção "Últimos artigos do blog" (3 cards)
   - Seção "Perguntas frequentes" com 5-6 FAQs em accordion (marcadas com `FAQPage` JSON-LD)
   - Seção "Fontes de dados" explicando a API usada e frequência de update

## Fase 6: Integração AdSense (apenas após Fases 1-5 prontas)

1. Adicionar o script do AdSense no `<head>` do layout raiz via `next/script` com `strategy="afterInteractive"`
2. Criar componente `<AdSlot />` reutilizável com placeholders de slot configuráveis
3. **NÃO** colocar anúncios em páginas legais (Política, Termos) — viola política do AdSense
4. **NÃO** colocar mais de 3 anúncios por página
5. Adicionar `ads.txt` em `public/ads.txt` (deixar placeholder com instrução pro Alexandre preencher após aprovação)

## Constraints (não negocie)

- **NÃO** quebre o conversor existente. Toda alteração no componente principal deve ser aditiva
- **NÃO** mude o design system / paleta sem confirmar com o Alexandre
- **NÃO** instale dependências pesadas sem justificar (CMS, ORM, state managers)
- **NÃO** gere artigos com texto "lorem ipsum" ou placeholder — todos os artigos precisam ser conteúdo real e publicável
- **NÃO** use AI-tells óbvios na escrita: nada de "no mundo dinâmico de hoje", "navegar pelas complexidades", "desbloquear o potencial", em-dashes excessivos, listas de três
- **NÃO** copie texto de outros sites — todo conteúdo deve ser original
- **Idioma:** escreva em PT-BR natural (não PT de Portugal) e EN-US

## Anti-Hallucination

- Antes de criar arquivos novos, verifique o que já existe com `ls` ou `find`
- Antes de instalar pacotes, cheque `package.json` para o que já está disponível
- Se não tiver certeza sobre o padrão de i18n, leia 2-3 arquivos existentes e replique
- Para taxas de câmbio históricas mencionadas nos artigos, use ranges aproximados ("entre R$ 4,50 e R$ 5,20 ao longo de 2024") em vez de números específicos inventados
- Cite o Banco Central, IBGE, Receita Federal como fontes quando aplicável — não invente outras fontes

## Verificação (obrigatória antes de finalizar)

```bash
# Build deve passar
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Sitemap acessível
# Após `npm run dev`, abrir http://localhost:3000/sitemap.xml

# Verificar metadata
# Abrir DevTools > Elements > <head> em cada nova página
```

Checklist manual:
- [ ] Todas as 4 páginas legais existem em PT e EN
- [ ] Pelo menos 15 artigos publicados (7+ em cada idioma)
- [ ] `robots.txt` e `sitemap.xml` retornam 200
- [ ] Cada artigo do blog tem JSON-LD `Article`
- [ ] Banner de cookies aparece e persiste a escolha
- [ ] Header e footer aparecem em todas as páginas
- [ ] Toggle de idioma funciona em todas as páginas novas
- [ ] Página 404 customizada funciona
- [ ] Home tem seção FAQ, últimos artigos, e "como funciona"
- [ ] Build de produção passa sem warnings de SEO

## Definition of Done

1. `ADSENSE-PLAN.md` produzido na Fase 1 e validado pelo Alexandre
2. Páginas legais publicadas em PT e EN
3. Blog com 15+ artigos reais, indexáveis, com schema markup
4. SEO técnico: sitemap, robots, metadata, hreflang, canonical, JSON-LD
5. Navegação global (header, footer, breadcrumbs, 404)
6. Componente AdSlot pronto, mas sem script ativo ainda (Alexandre ativa após reaplicar no AdSense)
7. Build passando, lint limpo, type-check ok
8. Commit message sugerida ao final do trabalho

## Após a entrega

Após o merge, o Alexandre deve:
1. Subir pra produção
2. Aguardar 1-2 semanas para o Google indexar (verificar no Search Console)
3. Reaplicar no AdSense
4. Quando aprovado, preencher `ads.txt` com a linha oficial do AdSense
