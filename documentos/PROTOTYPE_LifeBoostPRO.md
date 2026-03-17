# Documentação do Protótipo — Life Boost PRO

### Low-Fidelity Prototype Documentation

**Versão:** 1.0
**Data:** 17/03/2026
**Baseado em:** PRD v1.0 / SRS v1.0 / UCS v1.0 / SAD v1.0 / UIUX v1.0
**Autor:** Claude (Dev Sênior)

---

## 1. Visão Geral

### 1.1 Objetivo do Protótipo

Protótipo de baixa fidelidade funcional e navegável que implementa todas as telas planejadas do Life Boost PRO com design system aplicado, dados mock estáticos e layout responsivo. Serve como validação visual e estrutural antes da implementação real com backend.

### 1.2 O que o protótipo É

- Frontend completo e navegável com 16 rotas
- Design system implementado (cores, tipografia, espaçamento, componentes)
- Layout responsivo mobile-first (360px a 1920px)
- Dados mock realistas representando um usuário ativo
- Todas as interações visuais (filtros, tabs, toggles, views) funcionais via state local

### 1.3 O que o protótipo NÃO É

- Não tem backend real (Supabase, Stripe, Anthropic API)
- Não tem autenticação funcional
- Não persiste dados (tudo é estático/mock)
- Não tem animações de XP, level up ou conquistas
- Não tem SEO otimizado, meta tags ou Open Graph
- Não tem testes automatizados
- Não tem i18n (strings hardcoded em pt-BR)

---

## 2. Stack Técnica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router) | 16.1.7 |
| Runtime | React | 19.2.3 |
| Linguagem | TypeScript | ^5 |
| Estilização | Tailwind CSS v4 | ^4 |
| Ícones | Lucide React | ^0.577.0 |
| Fontes | Inter + JetBrains Mono | next/font/google |

---

## 3. Estrutura de Arquivos

```
lifeboost-pro/
├── documentos/                    # Documentação do projeto (5 docs + este)
├── public/                        # Assets estáticos (vazio no protótipo)
├── src/
│   ├── app/
│   │   ├── globals.css            # Design system tokens (Tailwind v4 @theme)
│   │   ├── layout.tsx             # Root layout (fontes, metadata)
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx         # Layout sem sidebar
│   │   │   └── page.tsx           # Landing page (839 linhas)
│   │   ├── (auth)/
│   │   │   ├── layout.tsx         # Layout centralizado
│   │   │   ├── login/page.tsx     # Tela de login
│   │   │   └── register/page.tsx  # Tela de cadastro
│   │   ├── onboarding/
│   │   │   └── page.tsx           # Onboarding 5 etapas (client)
│   │   ├── quiz/
│   │   │   └── page.tsx           # Quiz de segmentação 8 perguntas (client)
│   │   └── (app)/
│   │       ├── layout.tsx         # Layout com sidebar + bottom nav
│   │       ├── dashboard/page.tsx # Dashboard rico (531 linhas)
│   │       ├── tasks/page.tsx     # Tarefas com 3 views (543 linhas)
│   │       ├── analytics/page.tsx # Analytics & Insights (416 linhas)
│   │       ├── journal/page.tsx   # Diário de reflexão (226 linhas)
│   │       ├── shop/page.tsx      # Loja de recompensas (324 linhas)
│   │       ├── achievements/page.tsx # Conquistas
│   │       ├── ranking/page.tsx   # Ranking semanal
│   │       ├── mentor/page.tsx    # Chat com Mentor IA
│   │       ├── profile/page.tsx   # Perfil do usuário
│   │       └── settings/page.tsx  # Configurações
│   ├── components/
│   │   ├── ui/                    # 6 componentes base
│   │   │   ├── button.tsx         # 5 variantes, 4 tamanhos, loading state
│   │   │   ├── input.tsx          # Label, error, focus
│   │   │   ├── card.tsx           # Wrapper com hover glow
│   │   │   ├── progress-bar.tsx   # 3 tamanhos, gradient, aria
│   │   │   ├── badge.tsx          # Pilar, dificuldade, status, fonte, plano
│   │   │   └── modal.tsx          # Overlay, ESC, click-outside
│   │   └── layout/                # 4 componentes de layout
│   │       ├── sidebar.tsx        # Desktop, 8 nav items
│   │       ├── bottom-nav.tsx     # Mobile, 5 items + botão [+]
│   │       ├── header.tsx         # Mobile, streak, notificações
│   │       └── app-shell.tsx      # Composição responsiva
│   ├── lib/
│   │   ├── mock-data.ts           # Todos os dados fake (147 linhas)
│   │   └── constants.ts           # XP formulas, limites, nav items
│   └── types/
│       └── index.ts               # 10 interfaces, configs, enums (131 linhas)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Totais:** 33 arquivos | 5.739 linhas de código | 16 rotas

---

## 4. Design System Implementado

### 4.1 Paleta de Cores (Neon Verde + Dark)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-primary` | `#050508` | Fundo principal (ultra-dark) |
| `--color-bg-secondary` | `#0A0A10` | Cards, sidebar |
| `--color-bg-tertiary` | `#111118` | Cards dentro de cards, hover |
| `--color-bg-elevated` | `#18181F` | Modais, dropdowns |
| `--color-accent-primary` | `#39FF14` | **Verde neon** — ações primárias, XP, level up |
| `--color-accent-primary-light` | `#7AFF5C` | Hover, texto sobre fundo escuro |
| `--color-accent-cyan` | `#00D2FF` | Informacional, Estudos, Mentor IA |
| `--color-accent-amber` | `#FFAB00` | Warning, streak, Finanças |
| `--color-accent-red` | `#FF5252` | Erro, perigo |
| `--color-accent-pink` | `#FF4081` | Épico, conquistas raras |

### 4.2 Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Corpo de texto | Inter | 400-600 |
| Números de jogo (XP, nível, streak) | JetBrains Mono | 500-700 |

### 4.3 Componentes UI

| Componente | Variantes | Props Principais |
|------------|-----------|-----------------|
| Button | primary, secondary, ghost, danger, success × sm/md/lg/xl | variant, size, loading, disabled |
| Input | default, error, disabled | label, error, placeholder, type |
| Card | default, hover | children, className, hover |
| ProgressBar | sm/md/lg | value, size, color, label, showLabel |
| Badge | pillar, difficulty, status, source, plan | variant, label, color |
| Modal | sm/md/lg | isOpen, onClose, title, size |

---

## 5. Mapa de Rotas e Conteúdo

### 5.1 Área Pública

| Rota | Tipo | Conteúdo |
|------|------|----------|
| `/` | Server | Landing page completa: hero, problema (PAS), solução, 6 features, como funciona, social proof, pricing 4 planos, FAQ, CTA |
| `/quiz` | Client | Quiz Typeform-style 8 perguntas → resultado com perfil + radar + plano recomendado |
| `/login` | Server | Email/senha + Google OAuth + links |
| `/register` | Server | Formulário + termos + Google OAuth |
| `/onboarding` | Client | 5 etapas: boas-vindas → nome → avatar → prioridades → resumo |

### 5.2 Área Autenticada (App)

| Rota | Tipo | Widgets/Seções |
|------|------|----------------|
| `/dashboard` | Server | Briefing IA, radar pilares, 4 pillar cards, missões do dia, heatmap 90d, avatar+nível, streak, XP hoje, conquistas próximas, ranking mini, mentor quick access, atividade semanal |
| `/tasks` | Client | Stats bar, quick add, 3 views (Lista/Kanban/Calendário), filtros pilar+status, cards com badges |
| `/analytics` | Server | 4 KPIs, gráfico tendência XP, radar pilares, distribuição, heatmap anual, insights IA, tabela comparativa |
| `/journal` | Client | Seletor humor 5 emojis, tags pilar, textarea, toggle privado, timeline entries |
| `/shop` | Client | Saldo ouro, 4 tabs (auto-recompensas, avatar, temas, sazonais), cards itens, evento sazonal |
| `/achievements` | Server | Grid badges 3 estados (desbloqueada/bloqueada/secreta), filtro por categoria |
| `/ranking` | Server | Top 3 destacado, tabela, posição do usuário sticky |
| `/mentor` | Client | Chat com mensagens, quick replies, missão inline, input funcional |
| `/profile` | Server | Avatar, stats, pilares detalhados, gráfico, conquistas destaque |
| `/settings` | Client | Lista drill-down mobile, toggles, seções desktop, ações LGPD |

### 5.3 Navegação

**Desktop (Sidebar — 8 items):** Dashboard, Tarefas, Analytics, Diário, Loja, Conquistas, Ranking, Mentor IA + Perfil, Configurações

**Mobile (Bottom Nav — 5 items):** Home, Tarefas, [+Criar], Conquistas, Perfil

---

## 6. Dados Mock

### 6.1 Usuário Mock

| Campo | Valor |
|-------|-------|
| Nome | João Warrior |
| Nível | 12 |
| XP Total | 4.850 |
| Plano | Boost |
| Streak | 12 dias (máx: 34) |
| Ouro | 340 |
| Avatar | Guerreiro |

### 6.2 Pilares

| Pilar | Nível | XP | % Próximo Nível |
|-------|-------|-----|-----------------|
| Saúde | 8 | 580/849 | 68% |
| Estudos | 14 | 1.200/1.470 | 82% |
| Finanças | 10 | 720/1.000 | 72% |
| Rotina | 11 | 890/1.153 | 77% |

### 6.3 Volume de Dados

| Entidade | Quantidade |
|----------|-----------|
| Tarefas | 8 (3 pendentes, 2 completas, 1 expirada, 1 amanhã, 1 rejeitada) |
| Conquistas | 15 (8 desbloqueadas, 6 bloqueadas, 1 secreta) |
| Ranking | 9 entries (top 8 + posição do usuário #47) |
| Chat | 3 mensagens (mentor, user, mentor com missão) |
| Journal | 5 entradas (3 dias, moods 2-5) |
| Shop rewards | 6 auto-recompensas |
| Heatmap | 90 dias de dados aleatórios |
| Briefing IA | 1 briefing completo |

---

## 7. Como Executar

```bash
# Instalar dependências
cd life-boost-pro
npm install

# Modo desenvolvimento (hot reload, mais lento na 1ª compilação)
npm run dev

# Modo produção (recomendado para demo — instantâneo)
npm run build
npx next start -p 3000
```

Acesse: `http://localhost:3000`

---

## 8. Limitações Conhecidas

| Limitação | Impacto | Solução no Protótipo de Alta Fidelidade |
|-----------|---------|----------------------------------------|
| Dados estáticos | Sem persistência | Supabase PostgreSQL + RLS |
| Sem autenticação | Qualquer rota acessível | Supabase Auth + middleware |
| Sem animações de gamificação | XP/level up sem feedback visual | Framer Motion + CSS animations |
| Gráficos simplificados (divs) | Radar e charts são aproximações | Recharts ou Chart.js |
| Sem IA real | Briefing/missões são mock | API Anthropic (Claude Sonnet) |
| Sem pagamento | Planos são visuais | Stripe Checkout + webhooks |
| Sem i18n | Strings hardcoded pt-BR | next-intl + arquivos de tradução |
| Sem testes | Zero coverage | Vitest + Playwright |
| Sem SEO | Meta tags básicas | Schema.org, OG images, sitemap |
| Sem service worker | Sem modo offline | Workbox + cache strategies |

---

## 9. Rastreabilidade com Documentação

| Documento | Seções Implementadas no Protótipo |
|-----------|----------------------------------|
| PRD | Seções 3 (pilares), 4 (gamificação), 5 (IA), 6 (releases), 8 (monetização) |
| SRS | AUTH, ONB, DASH, TASK, PROG, AVT, ACH, AI, RANK, PAY, PROF, LAND, ANAL, BRIEF, JOUR, SHOP, QUIZ |
| UCS | UC-001 a UC-006, UC-010, UC-020 a UC-028, UC-040, UC-050, UC-060, UC-070, UC-080, UC-090, UC-095-100, UC-120-150 |
| SAD | Estrutura de diretórios (seção 3.1), route groups, component hierarchy |
| UIUX | Seções 2-4 (design system, componentes, telas), seção 11 (landing), seção 13 (assets strategy) |

---

## 10. Transição para Protótipo de Alta Fidelidade

### 10.1 O que será mantido

- Estrutura de rotas e route groups
- Design system tokens (globals.css)
- Componentes UI base (refinar, não reescrever)
- Layout responsivo (sidebar, bottom nav, header, app-shell)
- Tipografia e iconografia

### 10.2 O que será adicionado

| Camada | O que Adicionar |
|--------|----------------|
| Backend | Supabase (Auth, DB, Storage, RLS), API Routes, Server Actions |
| IA | API Anthropic (Claude Sonnet), system prompts, validação Zod |
| Pagamentos | Stripe Checkout, webhooks, gestão de assinatura |
| State | Zustand stores, React Query/SWR para data fetching |
| Animações | Framer Motion para XP, level up, conquistas, transições |
| Gráficos | Recharts para radar, line, bar, donut, heatmap |
| Formulários | React Hook Form + Zod schemas |
| Auth | Middleware de proteção de rotas, JWT refresh |
| Testes | Vitest (unit), Playwright (E2E), testes de RLS |
| i18n | next-intl com pt-BR.json e en-US.json |
| SEO | Meta tags, OG images, sitemap.xml, schema.org |
| Monitoramento | Sentry (errors), Vercel Analytics (performance) |
| CRON | Vercel Cron jobs (missões, briefing, ranking, cleanup) |

### 10.3 Ordem de Implementação Sugerida

1. **Supabase Setup** — Schema, migrations, RLS, Auth (email + Google OAuth)
2. **Auth Flow** — Login/register funcional, middleware, proteção de rotas
3. **Core Data** — CRUD de tarefas com persistência, cálculo de XP/nível/streak real
4. **IA Integration** — Missões diárias, briefing, mentor chat via API Anthropic
5. **Gamificação** — Conquistas automáticas, loja funcional, ranking real-time
6. **Pagamentos** — Stripe checkout, planos, webhooks
7. **Polish** — Animações, gráficos reais (Recharts), testes, SEO, i18n

---

*Este documento será atualizado conforme o protótipo de alta fidelidade avança.*
