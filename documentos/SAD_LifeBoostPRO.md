# Documento de Arquitetura de Software — Life Boost PRO

### Software Architecture Document (SAD)

**Versão:** 1.0  
**Data:** 16/03/2026  
**Baseado em:** PRD v1.0 / SRS v1.0 / UCS v1.0  
**Autor:** Claude (Arquiteto de Software Sênior)  
**Classificação:** Confidencial

---

## 1. Introdução

### 1.1 Propósito

Este documento define a arquitetura de software do Life Boost PRO, servindo como referência técnica para todas as decisões de design, implementação e infraestrutura. Prioriza três pilares: segurança (defense in depth), conformidade com LGPD e otimização de performance/custo.

### 1.2 Escopo Arquitetural

A arquitetura cobre:
- Estrutura de camadas e componentes do sistema
- Fluxos de dados e comunicação entre serviços
- Modelagem do banco de dados com políticas de segurança
- Estratégia de cache e otimização de performance
- Pipeline de IA com controle de custos
- Conformidade LGPD embutida na arquitetura (Privacy by Design)
- Estratégia de deploy, monitoramento e observabilidade
- Plano de escalabilidade e evolução

### 1.3 Decisões Arquiteturais (ADRs) — Resumo

| ADR | Decisão | Justificativa |
|-----|---------|---------------|
| ADR-001 | Next.js 14+ (App Router) como framework fullstack | SSR, RSC, API Routes, edge runtime, ecossistema React |
| ADR-002 | Supabase como BaaS (Auth + DB + Storage + Realtime) | PostgreSQL gerenciado, RLS nativo, Auth pronto, free tier generoso |
| ADR-003 | Vercel como plataforma de deploy | Integração nativa com Next.js, edge network global, preview deploys |
| ADR-004 | Tailwind CSS para estilização | Produtividade, design system consistente, tree-shaking nativo |
| ADR-005 | Stripe para pagamentos | Padrão global SaaS, Checkout Sessions, webhooks robustos, dunning nativo |
| ADR-006 | API Anthropic (Claude Sonnet) para IA | Melhor custo-benefício, respostas de alta qualidade, JSON mode |
| ADR-007 | Zod para validação de schemas | Runtime validation + TypeScript inference, compartilhável entre client/server |
| ADR-008 | Arquitetura serverless (sem servidor dedicado) | Custo zero em idle, escala automática, zero ops |
| ADR-009 | Privacy by Design (LGPD embedded) | Conformidade desde a fundação, não como retrofit |
| ADR-010 | Cache em múltiplas camadas | Otimização de custo de IA e performance de leitura |

---

## 2. Visão Geral da Arquitetura

### 2.1 Estilo Arquitetural

**Arquitetura serverless orientada a camadas** com separação clara de responsabilidades:

- **Presentation Layer** (Next.js Client Components) — UI, interações, estado local
- **Application Layer** (Next.js Server Components + API Routes + Server Actions) — lógica de negócio, orquestração
- **Integration Layer** (Services/Adapters) — comunicação com serviços externos
- **Data Layer** (Supabase PostgreSQL) — persistência, RLS, triggers

### 2.2 Diagrama de Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Next.js Client Components (React)                          │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │    │
│  │  │Dashboard │ │ Tasks    │ │ Avatar   │ │ AI Chat      │   │    │
│  │  │Component │ │Component │ │Component │ │ Component    │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │  Zustand Store (Client State Management)             │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS (TLS 1.3)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK (CDN)                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Edge Middleware                                              │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────────────────────┐ │   │
│  │  │Rate Limiter │ │Auth Guard   │ │ Security Headers       │ │   │
│  │  └─────────────┘ └─────────────┘ └────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Next.js Server (Node.js Runtime)                            │   │
│  │  ┌───────────────────┐ ┌───────────────────────────────────┐ │   │
│  │  │ Server Components  │ │ API Routes (/api/*)               │ │   │
│  │  │ (RSC - Streaming)  │ │ ┌─────────┐ ┌─────────┐         │ │   │
│  │  └───────────────────┘ │ │ /tasks   │ │ /ai     │         │ │   │
│  │  ┌───────────────────┐ │ │ /auth    │ │ /stripe │         │ │   │
│  │  │ Server Actions     │ │ │ /profile │ │ /rank   │         │ │   │
│  │  │ (Mutations)        │ │ └─────────┘ └─────────┘         │ │   │
│  │  └───────────────────┘ └───────────────────────────────────┘ │   │
│  │  ┌──────────────────────────────────────────────────────────┐ │   │
│  │  │  Service Layer (Business Logic)                          │ │   │
│  │  │  ┌───────────┐ ┌───────────┐ ┌────────────┐ ┌────────┐ │ │   │
│  │  │  │TaskService│ │XPService  │ │AIService   │ │PaySvc  │ │ │   │
│  │  │  └───────────┘ └───────────┘ └────────────┘ └────────┘ │ │   │
│  │  └──────────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────┬─────────────────┬─────────────────┬──────────────────────┘
           │                 │                 │
           ▼                 ▼                 ▼
┌────────────────┐ ┌─────────────────┐ ┌────────────────┐
│   SUPABASE     │ │ API ANTHROPIC   │ │    STRIPE      │
│ ┌────────────┐ │ │                 │ │                │
│ │ PostgreSQL │ │ │ Claude Sonnet   │ │ Checkout       │
│ │ + RLS      │ │ │ (REST API)      │ │ Subscriptions  │
│ ├────────────┤ │ │                 │ │ Webhooks       │
│ │ Auth       │ │ └─────────────────┘ │ Dunning        │
│ │ (GoTrue)   │ │                     └────────────────┘
│ ├────────────┤ │
│ │ Storage    │ │
│ │ (S3-compat)│ │
│ ├────────────┤ │
│ │ Edge Funcs │ │
│ │ (CRON)     │ │
│ └────────────┘ │
└────────────────┘
```

### 2.3 Fluxo de Requisição (Request Lifecycle)

```
1. Browser envia request HTTPS
   │
2. Vercel Edge Network recebe
   │
3. Edge Middleware executa:
   ├─ Rate limiting (IP + User)
   ├─ Validação de JWT (Supabase Auth)
   ├─ Injeção de security headers
   └─ Geolocation (para CDN routing)
   │
4. Request é roteado:
   ├─ Rota estática → CDN cache (landing page, assets)
   ├─ Server Component → RSC streaming (dashboard, perfil)
   ├─ API Route → Node.js runtime (mutations, webhooks)
   └─ Server Action → Node.js runtime (form submissions)
   │
5. Service Layer processa:
   ├─ Validação com Zod
   ├─ Verificação de autorização (plano, limites)
   ├─ Lógica de negócio
   └─ Chamada ao Data Layer ou serviços externos
   │
6. Resposta retorna pelo mesmo caminho
   └─ Cache headers definidos por rota
```

---

## 3. Arquitetura de Componentes

### 3.1 Estrutura de Diretórios do Projeto

```
lifeboost-pro/
├── .env.local                    # Variáveis de ambiente (NUNCA versionado)
├── .env.example                  # Template de variáveis (versionado, sem valores)
├── next.config.ts                # Configuração Next.js
├── tailwind.config.ts            # Configuração Tailwind
├── middleware.ts                  # Edge Middleware (auth, rate limit, headers)
├── package.json
├── tsconfig.json
│
├── public/                       # Assets estáticos (servidos via CDN)
│   ├── avatars/                  # SVGs de avatares base
│   ├── badges/                   # Ícones de conquistas
│   └── og/                       # Open Graph images
│
├── src/
│   ├── app/                      # App Router (Next.js 14+)
│   │   ├── (auth)/               # Route Group: telas de autenticação
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx        # Layout sem sidebar (auth pages)
│   │   │
│   │   ├── (app)/                # Route Group: app autenticado
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── tasks/page.tsx
│   │   │   ├── achievements/page.tsx
│   │   │   ├── ranking/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── journal/page.tsx
│   │   │   ├── shop/page.tsx
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── billing/page.tsx
│   │   │   │   └── privacy/page.tsx
│   │   │   └── layout.tsx        # Layout com sidebar + header (app pages)
│   │   │
│   │   ├── (marketing)/          # Route Group: páginas públicas
│   │   │   ├── page.tsx          # Landing page (/)
│   │   │   ├── pricing/page.tsx
│   │   │   └── layout.tsx        # Layout sem sidebar
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/
│   │   │   │   └── callback/route.ts    # OAuth callback
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts             # GET (list), POST (create)
│   │   │   │   └── [id]/route.ts        # PATCH (update), DELETE
│   │   │   ├── tasks/[id]/complete/route.ts  # POST (complete task)
│   │   │   ├── ai/
│   │   │   │   ├── missions/route.ts    # POST (generate missions)
│   │   │   │   ├── report/route.ts      # GET (weekly report)
│   │   │   │   └── chat/route.ts        # POST (mentor chat)
│   │   │   ├── stripe/
│   │   │   │   └── webhook/route.ts     # POST (Stripe webhooks)
│   │   │   ├── user/
│   │   │   │   ├── profile/route.ts     # GET, PATCH
│   │   │   │   ├── export/route.ts      # POST (LGPD data export)
│   │   │   │   └── delete/route.ts      # POST (LGPD account deletion)
│   │   │   └── cron/
│   │   │       ├── daily-missions/route.ts    # CRON trigger
│   │   │       ├── weekly-report/route.ts     # CRON trigger
│   │   │       ├── expire-tasks/route.ts      # CRON trigger
│   │   │       └── ranking-snapshot/route.ts  # CRON trigger
│   │   │
│   │   ├── onboarding/           # Onboarding flow
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── not-found.tsx         # 404
│   │   └── error.tsx             # Error boundary
│   │
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes base (Button, Input, Modal, Toast)
│   │   ├── dashboard/            # Componentes do dashboard
│   │   ├── tasks/                # Componentes de tarefas
│   │   ├── avatar/               # Componentes do avatar
│   │   ├── achievements/         # Componentes de conquistas
│   │   ├── ranking/              # Componentes do ranking
│   │   ├── ai/                   # Componentes do mentor IA
│   │   ├── billing/              # Componentes de pagamento
│   │   └── onboarding/           # Componentes do onboarding
│   │
│   ├── services/                 # Camada de serviço (Business Logic)
│   │   ├── task.service.ts       # Lógica de tarefas
│   │   ├── xp.service.ts         # Cálculo de XP, level up, streak
│   │   ├── achievement.service.ts # Verificação de conquistas
│   │   ├── ai.service.ts         # Orquestração de chamadas à IA
│   │   ├── ranking.service.ts    # Cálculo de rankings
│   │   ├── payment.service.ts    # Integração Stripe
│   │   ├── user.service.ts       # Gestão de usuário e perfil
│   │   ├── notification.service.ts # Notificações e emails
│   │   ├── journal.service.ts    # Diário/Journal
│   │   ├── shop.service.ts       # Loja de recompensas
│   │   ├── analytics.service.ts  # Analytics e insights
│   │   └── quiz.service.ts       # Quiz de segmentação
│   │
│   ├── lib/                      # Utilitários e configurações
│   │   ├── supabase/
│   │   │   ├── client.ts         # Supabase client (browser)
│   │   │   ├── server.ts         # Supabase client (server-side)
│   │   │   ├── admin.ts          # Supabase admin client (service role)
│   │   │   └── middleware.ts     # Supabase auth helper for middleware
│   │   ├── stripe/
│   │   │   ├── client.ts         # Stripe client
│   │   │   └── webhooks.ts       # Webhook handler + signature validation
│   │   ├── ai/
│   │   │   ├── client.ts         # Anthropic API client
│   │   │   ├── prompts.ts        # System prompts (NUNCA exposto ao frontend)
│   │   │   ├── templates.ts      # Missões template (fallback)
│   │   │   └── validators.ts     # Validação de respostas da IA
│   │   ├── cache/
│   │   │   └── strategy.ts       # Cache strategies (stale-while-revalidate, etc.)
│   │   ├── constants.ts          # Constantes (XP table, limites por plano)
│   │   ├── errors.ts             # Classes de erro customizadas
│   │   ├── rate-limit.ts         # Rate limiting utility
│   │   └── utils.ts              # Funções utilitárias
│   │
│   ├── schemas/                  # Zod schemas (validação + tipos)
│   │   ├── task.schema.ts
│   │   ├── user.schema.ts
│   │   ├── ai.schema.ts
│   │   ├── payment.schema.ts
│   │   └── index.ts
│   │
│   ├── hooks/                    # React hooks customizados
│   │   ├── use-tasks.ts
│   │   ├── use-xp.ts
│   │   ├── use-achievements.ts
│   │   ├── use-ai-chat.ts
│   │   └── use-user.ts
│   │
│   ├── store/                    # Zustand stores (client state)
│   │   ├── user.store.ts
│   │   ├── task.store.ts
│   │   └── ui.store.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── database.types.ts     # Gerado pelo Supabase CLI (supabase gen types)
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── i18n/                     # Internacionalização
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── pt-BR.json
│   │       └── en-US.json        # v1.2
│   │
│   └── styles/
│       └── globals.css           # Tailwind imports + custom CSS vars
│
├── supabase/                     # Supabase local config
│   ├── config.toml
│   ├── migrations/               # SQL migrations (versionadas)
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   ├── 003_functions_triggers.sql
│   │   ├── 004_indexes.sql
│   │   └── 005_seed_achievements.sql
│   └── seed.sql                  # Dados iniciais (conquistas, templates)
│
└── tests/
    ├── unit/                     # Testes unitários (services, utils)
    ├── integration/              # Testes de integração (API routes)
    ├── e2e/                      # Testes end-to-end (Playwright)
    └── security/                 # Testes de segurança (RLS, auth)
```

### 3.2 Responsabilidade de Cada Camada

**Edge Middleware (`middleware.ts`)**
- Executa em TODAS as requests antes de chegar ao servidor
- Rate limiting baseado em IP e user ID
- Validação/refresh de JWT (Supabase Auth)
- Injeção de security headers (CSP, HSTS, X-Frame-Options)
- Redirecionamento de rotas protegidas (se não autenticado → login)
- Tempo de execução: < 5ms (edge runtime, sem cold start)

**Server Components (RSC)**
- Renderização server-side com streaming
- Fetch de dados no servidor (sem waterfall no client)
- Não expõem secrets ao bundle do client
- Usados para: dashboard, perfil, lista de tarefas, conquistas, ranking

**Client Components**
- Interatividade (formulários, modais, animações, drag-and-drop)
- Estado local (Zustand para estado global do client)
- Marcados com `'use client'` no topo do arquivo
- Usados para: criar/completar tarefa, chat com IA, onboarding, animações de XP

**API Routes**
- Mutations que requerem processamento server-side
- Webhooks (Stripe)
- CRON endpoints (chamados por Vercel Cron ou Supabase Edge Functions)
- Sempre validam input com Zod antes de processar

**Server Actions**
- Alternativa aos API Routes para mutations de formulários
- Usados quando a mutation é disparada por formulário ou botão simples
- Type-safe por padrão no Next.js 14+

**Service Layer**
- Toda lógica de negócio encapsulada aqui
- Nunca acessada diretamente pelo client (apenas via API Routes/Server Actions/Server Components)
- Cada service é stateless e testável isoladamente
- Importa apenas do `lib/` e `schemas/`, nunca de componentes

---

## 4. Arquitetura de Dados

### 4.1 Modelo Relacional Detalhado

```sql
-- ============================================================
-- MIGRATION 001: Schema Principal
-- ============================================================

-- Tipos enumerados
CREATE TYPE plan_type AS ENUM ('free', 'starter', 'boost', 'ultra');
CREATE TYPE pillar_type AS ENUM ('health', 'intelligence', 'gold', 'strength');
CREATE TYPE difficulty_type AS ENUM ('easy', 'medium', 'hard', 'epic');
CREATE TYPE task_status AS ENUM ('pending', 'completed', 'expired', 'rejected', 'deleted');
CREATE TYPE task_source AS ENUM ('user', 'ai', 'template');
CREATE TYPE achievement_category AS ENUM ('streak', 'milestone', 'pillar', 'challenge', 'social', 'secret');
CREATE TYPE ai_interaction_type AS ENUM ('daily_missions', 'weekly_report', 'coaching', 'challenge', 'chat');
CREATE TYPE period_type AS ENUM ('weekly', 'monthly', 'all_time');

-- ============================================================
-- TABELA: users
-- Dados do usuário. PK = auth.users.id (Supabase Auth)
-- ============================================================
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 50),
    avatar_config JSONB NOT NULL DEFAULT '{"base": null, "items": [], "stage": 1}',
    current_level INT NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 100),
    total_xp BIGINT NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    plan plan_type NOT NULL DEFAULT 'free',
    streak_count INT NOT NULL DEFAULT 0 CHECK (streak_count >= 0),
    max_streak INT NOT NULL DEFAULT 0 CHECK (max_streak >= 0),
    last_activity_at TIMESTAMPTZ,
    last_mission_generated_at TIMESTAMPTZ,
    timezone TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    onboarding_skipped BOOLEAN NOT NULL DEFAULT FALSE,
    priority_pillars pillar_type[] DEFAULT '{}',
    objectives JSONB DEFAULT '{}',
    ranking_visible BOOLEAN NOT NULL DEFAULT TRUE,
    email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
    locale TEXT NOT NULL DEFAULT 'pt-BR',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    trial_used BOOLEAN NOT NULL DEFAULT FALSE,
    plan_period_end TIMESTAMPTZ,
    deletion_requested_at TIMESTAMPTZ,
    daily_manual_xp INT NOT NULL DEFAULT 0,
    daily_manual_xp_date DATE,
    gold_balance INT NOT NULL DEFAULT 0 CHECK (gold_balance >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: pillars
-- Progressão por pilar (4 registros por usuário)
-- ============================================================
CREATE TABLE pillars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type pillar_type NOT NULL,
    current_level INT NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 100),
    current_xp BIGINT NOT NULL DEFAULT 0 CHECK (current_xp >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, type)
);

-- ============================================================
-- TABELA: tasks
-- Tarefas e missões do usuário
-- ============================================================
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pillar_type pillar_type NOT NULL,
    title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 100),
    description TEXT CHECK (char_length(description) <= 500),
    xp_reward INT NOT NULL CHECK (xp_reward >= 0),
    difficulty difficulty_type NOT NULL DEFAULT 'medium',
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    recurrence_rule JSONB,
    parent_task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    status task_status NOT NULL DEFAULT 'pending',
    source task_source NOT NULL DEFAULT 'user',
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    ai_motivation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: achievements
-- Catálogo de conquistas (read-heavy, rarely written)
-- ============================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_key TEXT NOT NULL,
    category achievement_category NOT NULL,
    condition JSONB NOT NULL,
    xp_bonus INT NOT NULL DEFAULT 0 CHECK (xp_bonus >= 0),
    is_secret BOOLEAN NOT NULL DEFAULT FALSE,
    plan_required plan_type,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: user_achievements
-- Conquistas desbloqueadas por cada usuário
-- ============================================================
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notified BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(user_id, achievement_id)
);

-- ============================================================
-- TABELA: ai_interactions
-- Log de todas as interações com a IA (custo tracking + auditoria)
-- ============================================================
CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type ai_interaction_type NOT NULL,
    prompt_tokens INT NOT NULL DEFAULT 0,
    completion_tokens INT NOT NULL DEFAULT 0,
    total_cost_cents INT NOT NULL DEFAULT 0,
    model TEXT NOT NULL DEFAULT 'claude-sonnet-4-20250514',
    request_hash TEXT,
    response JSONB,
    is_cached BOOLEAN NOT NULL DEFAULT FALSE,
    latency_ms INT,
    error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: xp_history
-- Histórico diário de XP (para gráficos e analytics)
-- ============================================================
CREATE TABLE xp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    pillar_type pillar_type NOT NULL,
    xp_earned INT NOT NULL DEFAULT 0,
    tasks_completed INT NOT NULL DEFAULT 0,
    UNIQUE(user_id, date, pillar_type)
);

-- ============================================================
-- TABELA: leaderboard_snapshots
-- Snapshots pré-calculados do ranking
-- ============================================================
CREATE TABLE leaderboard_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    period_type period_type NOT NULL,
    period_start DATE NOT NULL,
    xp_earned BIGINT NOT NULL DEFAULT 0,
    rank INT,
    snapshot_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: weekly_reports
-- Relatórios semanais gerados pela IA
-- ============================================================
CREATE TABLE weekly_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    report_data JSONB NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, week_start)
);

-- ============================================================
-- TABELA: audit_log
-- Log de auditoria para ações sensíveis (LGPD)
-- ============================================================
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: consent_records
-- Registros de consentimento (LGPD)
-- ============================================================
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    granted BOOLEAN NOT NULL,
    ip_address INET,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- ============================================================
-- TABELA: journal_entries
-- Entradas do diário de reflexão do usuário
-- ============================================================
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pillar_type pillar_type,
    mood INT NOT NULL CHECK (mood BETWEEN 1 AND 5),
    content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: shop_rewards
-- Recompensas customizáveis criadas pelo usuário
-- ============================================================
CREATE TABLE shop_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    emoji TEXT NOT NULL DEFAULT '🎁',
    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 50),
    cost_gold INT NOT NULL CHECK (cost_gold BETWEEN 1 AND 10000),
    times_redeemed INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: shop_transactions
-- Log de transações da loja (compras/resgates)
-- ============================================================
CREATE TABLE shop_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reward_id UUID REFERENCES shop_rewards(id) ON DELETE SET NULL,
    item_type TEXT NOT NULL,
    gold_spent INT NOT NULL CHECK (gold_spent > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: quiz_responses
-- Respostas do quiz de segmentação (para analytics de conversão)
-- ============================================================
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    responses JSONB NOT NULL,
    recommended_plan plan_type,
    converted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: daily_briefings
-- Briefings diários gerados pela IA (cache)
-- ============================================================
CREATE TABLE daily_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    briefing_date DATE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, briefing_date)
);
```

### 4.2 Índices de Performance

```sql
-- ============================================================
-- MIGRATION 004: Índices Otimizados
-- ============================================================

-- Users: busca por email, stripe, deletion
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX idx_users_deletion ON users(deletion_requested_at) WHERE deletion_requested_at IS NOT NULL;
CREATE INDEX idx_users_plan ON users(plan);

-- Pillars: busca por user_id (sempre acompanha o tipo)
CREATE INDEX idx_pillars_user ON pillars(user_id);

-- Tasks: queries mais frequentes
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_user_status_created ON tasks(user_id, status, created_at DESC);
CREATE INDEX idx_tasks_user_pillar ON tasks(user_id, pillar_type, status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date) WHERE status = 'pending' AND due_date IS NOT NULL;
CREATE INDEX idx_tasks_recurring ON tasks(is_recurring, status) WHERE is_recurring = TRUE;
CREATE INDEX idx_tasks_source ON tasks(user_id, source) WHERE source = 'ai';

-- Achievements: busca por user
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- AI Interactions: custo tracking por período
CREATE INDEX idx_ai_interactions_user_date ON ai_interactions(user_id, created_at DESC);
CREATE INDEX idx_ai_interactions_cost ON ai_interactions(created_at, total_cost_cents);
CREATE INDEX idx_ai_interactions_cache ON ai_interactions(request_hash) WHERE request_hash IS NOT NULL;

-- XP History: gráficos de evolução
CREATE INDEX idx_xp_history_user_date ON xp_history(user_id, date DESC);

-- Leaderboard: ranking queries
CREATE INDEX idx_leaderboard_period_xp ON leaderboard_snapshots(period_type, period_start, xp_earned DESC);
CREATE INDEX idx_leaderboard_user ON leaderboard_snapshots(user_id, period_type);

-- Audit: consulta por user e data
CREATE INDEX idx_audit_user ON audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_action ON audit_log(action, created_at DESC);

-- Consent: consulta por user
CREATE INDEX idx_consent_user ON consent_records(user_id);

-- Journal: queries por user e data
CREATE INDEX idx_journal_user_date ON journal_entries(user_id, created_at DESC);
CREATE INDEX idx_journal_user_pillar ON journal_entries(user_id, pillar_type);

-- Shop: rewards e transactions por user
CREATE INDEX idx_shop_rewards_user ON shop_rewards(user_id, is_active);
CREATE INDEX idx_shop_transactions_user ON shop_transactions(user_id, created_at DESC);

-- Daily Briefings: lookup por user e data
CREATE INDEX idx_briefings_user_date ON daily_briefings(user_id, briefing_date);

-- Quiz: conversão tracking
CREATE INDEX idx_quiz_session ON quiz_responses(session_id);
CREATE INDEX idx_quiz_converted ON quiz_responses(converted, created_at DESC);
```

### 4.3 Functions e Triggers do Banco

```sql
-- ============================================================
-- MIGRATION 003: Functions e Triggers
-- ============================================================

-- Função: atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_users_updated_at
    BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_tasks_updated_at
    BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_pillars_updated_at
    BEFORE UPDATE ON pillars FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Função: calcular XP necessário para próximo nível
-- XP_necessário(n) = ceil(100 * n^1.5)
CREATE OR REPLACE FUNCTION xp_for_level(level_num INT)
RETURNS BIGINT AS $$
BEGIN
    RETURN CEIL(100 * POWER(level_num, 1.5))::BIGINT;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Função: calcular nível a partir de XP acumulado
CREATE OR REPLACE FUNCTION level_from_xp(total_xp BIGINT)
RETURNS INT AS $$
DECLARE
    lvl INT := 1;
    xp_needed BIGINT;
    xp_accumulated BIGINT := 0;
BEGIN
    LOOP
        xp_needed := xp_for_level(lvl);
        IF xp_accumulated + xp_needed > total_xp THEN
            RETURN lvl;
        END IF;
        xp_accumulated := xp_accumulated + xp_needed;
        lvl := lvl + 1;
        IF lvl > 100 THEN
            RETURN 100;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Função: soft delete de dados do usuário (LGPD)
-- Chamada pelo CRON após 30 dias da solicitação de exclusão
CREATE OR REPLACE FUNCTION hard_delete_user(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Log de auditoria antes de excluir
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, metadata)
    VALUES (target_user_id, 'HARD_DELETE', 'user', target_user_id,
            jsonb_build_object('reason', 'LGPD deletion after 30-day grace period'));

    -- Remove dados em ordem (respeitando FKs)
    DELETE FROM consent_records WHERE user_id = target_user_id;
    DELETE FROM weekly_reports WHERE user_id = target_user_id;
    DELETE FROM leaderboard_snapshots WHERE user_id = target_user_id;
    DELETE FROM xp_history WHERE user_id = target_user_id;
    DELETE FROM ai_interactions WHERE user_id = target_user_id;
    DELETE FROM user_achievements WHERE user_id = target_user_id;
    DELETE FROM tasks WHERE user_id = target_user_id;
    DELETE FROM pillars WHERE user_id = target_user_id;

    -- Anonimiza audit_log (mantém para compliance, sem dados pessoais)
    UPDATE audit_log SET user_id = NULL, ip_address = NULL, user_agent = NULL
    WHERE user_id = target_user_id;

    -- Remove o usuário (CASCADE remove auth.users)
    DELETE FROM users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função: calcular ranking semanal
CREATE OR REPLACE FUNCTION calculate_weekly_ranking(week_start_date DATE)
RETURNS VOID AS $$
BEGIN
    -- Remove snapshot anterior desta semana
    DELETE FROM leaderboard_snapshots
    WHERE period_type = 'weekly' AND period_start = week_start_date;

    -- Calcula novo ranking
    INSERT INTO leaderboard_snapshots (user_id, period_type, period_start, xp_earned, rank)
    SELECT
        xh.user_id,
        'weekly',
        week_start_date,
        SUM(xh.xp_earned) as total_xp,
        ROW_NUMBER() OVER (ORDER BY SUM(xh.xp_earned) DESC) as rank
    FROM xp_history xh
    JOIN users u ON u.id = xh.user_id
    WHERE xh.date >= week_start_date
      AND xh.date < week_start_date + INTERVAL '7 days'
      AND u.ranking_visible = TRUE
      AND u.created_at < NOW() - INTERVAL '7 days'
    GROUP BY xh.user_id
    HAVING SUM(xh.xp_earned) > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Arquitetura de Segurança

### 5.1 Princípios de Segurança (Defense in Depth)

```
Camada 1: Edge (Vercel)
├─ TLS 1.3 (automático)
├─ DDoS protection (Vercel/Cloudflare)
├─ Rate limiting (IP-based)
└─ Security headers

Camada 2: Middleware (Next.js)
├─ JWT validation
├─ CSRF protection
├─ Rate limiting (user-based)
└─ Route protection

Camada 3: API (Server)
├─ Input validation (Zod)
├─ Authorization checks (plano, ownership)
├─ Output sanitization
└─ Error masking

Camada 4: Dados (Supabase)
├─ Row Level Security (RLS)
├─ Prepared statements (SQL injection proof)
├─ Encrypted at rest (AES-256)
└─ Encrypted in transit (TLS)

Camada 5: Serviços Externos
├─ API keys em env vars (nunca no client)
├─ Webhook signature validation
├─ Mínimo privilégio (service role apenas onde necessário)
└─ Timeout em todas as chamadas externas
```

### 5.2 Row Level Security (RLS) — Políticas Completas

```sql
-- ============================================================
-- MIGRATION 002: Row Level Security Policies
-- ============================================================

-- Ativa RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- USERS: só pode ver e editar seus próprios dados
-- ============================================================
CREATE POLICY "users_select_own"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "users_update_own"
    ON users FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        AND plan = (SELECT plan FROM users WHERE id = auth.uid())
        -- Impede que usuário altere o próprio plano diretamente
        -- Plano só é alterado via service role (webhook Stripe)
    );

-- Users: perfil público para ranking (apenas campos não sensíveis)
CREATE POLICY "users_select_public_ranking"
    ON users FOR SELECT
    USING (
        ranking_visible = TRUE
        AND id != auth.uid()
    );
-- NOTA: esta policy permite SELECT, mas o frontend só exibe
-- display_name, avatar_config, current_level — nunca email ou dados sensíveis.
-- A camada de aplicação (Server Component) faz a projeção de colunas.

-- ============================================================
-- PILLARS: apenas dados próprios
-- ============================================================
CREATE POLICY "pillars_select_own"
    ON pillars FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "pillars_update_own"
    ON pillars FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================
-- TASKS: CRUD apenas em tarefas próprias
-- ============================================================
CREATE POLICY "tasks_select_own"
    ON tasks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "tasks_insert_own"
    ON tasks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tasks_update_own"
    ON tasks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "tasks_delete_own"
    ON tasks FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- ACHIEVEMENTS: catálogo é público (read-only para todos)
-- ============================================================
CREATE POLICY "achievements_select_all"
    ON achievements FOR SELECT
    USING (is_active = TRUE);

-- ============================================================
-- USER_ACHIEVEMENTS: apenas dados próprios
-- ============================================================
CREATE POLICY "user_achievements_select_own"
    ON user_achievements FOR SELECT
    USING (auth.uid() = user_id);

-- Insert apenas via service role (trigger de conquistas)
-- Usuário não pode auto-conceder conquistas

-- ============================================================
-- AI_INTERACTIONS: apenas dados próprios
-- ============================================================
CREATE POLICY "ai_interactions_select_own"
    ON ai_interactions FOR SELECT
    USING (auth.uid() = user_id);

-- Insert apenas via service role

-- ============================================================
-- XP_HISTORY: apenas dados próprios
-- ============================================================
CREATE POLICY "xp_history_select_own"
    ON xp_history FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================================
-- LEADERBOARD: dados públicos (ranking)
-- ============================================================
CREATE POLICY "leaderboard_select_all"
    ON leaderboard_snapshots FOR SELECT
    USING (TRUE);
-- Dados do ranking são públicos por natureza
-- Dados sensíveis do user não estão nesta tabela

-- ============================================================
-- WEEKLY_REPORTS: apenas dados próprios
-- ============================================================
CREATE POLICY "weekly_reports_select_own"
    ON weekly_reports FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================================
-- AUDIT_LOG: apenas leitura dos próprios logs (LGPD transparência)
-- ============================================================
CREATE POLICY "audit_log_select_own"
    ON audit_log FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================================
-- CONSENT_RECORDS: apenas dados próprios
-- ============================================================
CREATE POLICY "consent_records_select_own"
    ON consent_records FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================================
-- JOURNAL_ENTRIES: apenas dados próprios
-- ============================================================
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "journal_select_own"
    ON journal_entries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "journal_insert_own"
    ON journal_entries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "journal_delete_own"
    ON journal_entries FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- SHOP_REWARDS: apenas dados próprios
-- ============================================================
ALTER TABLE shop_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "shop_rewards_select_own"
    ON shop_rewards FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "shop_rewards_insert_own"
    ON shop_rewards FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shop_rewards_update_own"
    ON shop_rewards FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================
-- SHOP_TRANSACTIONS: apenas dados próprios
-- ============================================================
ALTER TABLE shop_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "shop_transactions_select_own"
    ON shop_transactions FOR SELECT
    USING (auth.uid() = user_id);

-- Insert apenas via service role (transação validada no server)

-- ============================================================
-- QUIZ_RESPONSES: público para inserção (visitante), leitura apenas admin
-- ============================================================
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_insert_public"
    ON quiz_responses FOR INSERT
    WITH CHECK (TRUE);
-- Nota: visitantes podem inserir respostas do quiz sem autenticação
-- Leitura apenas via service role (admin dashboard)

-- ============================================================
-- DAILY_BRIEFINGS: apenas dados próprios
-- ============================================================
ALTER TABLE daily_briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "briefings_select_own"
    ON daily_briefings FOR SELECT
    USING (auth.uid() = user_id);
```

### 5.3 Security Headers (Edge Middleware)

```typescript
// middleware.ts — security headers
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://*.supabase.co",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co https://api.stripe.com",
    "frame-src https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};
```

### 5.4 Rate Limiting Strategy

| Endpoint | Limite (não autenticado) | Limite (Free) | Limite (Starter) | Limite (Boost) | Limite (Ultra) |
|----------|------------------------|---------------|-------------------|----------------|----------------|
| POST /api/auth/* | 10/min por IP | — | — | — | — |
| POST /api/tasks | — | 30/hora | 60/hora | 120/hora | 300/hora |
| POST /api/tasks/*/complete | — | 50/hora | 100/hora | 200/hora | 500/hora |
| POST /api/ai/missions | — | 3/dia | 8/dia | 20/dia | 100/dia |
| POST /api/ai/chat | — | N/A | N/A | 30/dia | 100/dia |
| GET /api/* (leitura) | 100/min por IP | 200/min | 300/min | 500/min | 1000/min |
| POST /api/stripe/webhook | Sem limite (validado por signature) | — | — | — | — |
| POST /api/user/export | — | 1/semana | 1/semana | 1/semana | 1/semana |

### 5.5 Proteção contra Ameaças Específicas

| Ameaça | Mitigação |
|--------|-----------|
| SQL Injection | Supabase client usa prepared statements. Nenhuma query SQL raw no código da aplicação. |
| XSS (Cross-Site Scripting) | React escapa output por padrão. CSP headers. Sanitização de respostas da IA antes de render. |
| CSRF | Verificação de Origin header em API Routes. SameSite cookies. |
| Prompt Injection (IA) | Respostas da IA são parseadas como JSON estruturado e validadas com Zod. Nenhuma resposta raw é renderizada como HTML. |
| Enumeração de usuários | Login retorna mesma mensagem para email inválido e senha incorreta. Recovery não revela se email existe. |
| Session Hijacking | JWT httpOnly + Secure + SameSite=Lax. Refresh token rotacionado. |
| XP Farming | Limite diário de XP manual (500). Tarefas completadas são irreversíveis. Anti-cheating por IA no ranking. |
| Webhook Spoofing | Validação de assinatura Stripe em toda requisição de webhook. |
| Data Exfiltration | RLS impede acesso cross-user. Service role usado apenas em CRON/webhooks controlados. |
| Brute Force | Rate limiting + account lockout (5 tentativas, 15 min block). |

---

## 6. Arquitetura de IA

### 6.1 Pipeline de Geração de Missões

```
┌──────────────────────────────────────────────────────┐
│                   CRON (00:05 user TZ)               │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│  1. COLETA DE CONTEXTO                               │
│  ┌───────────────────────────────────────────────┐   │
│  │ Query Supabase:                                │   │
│  │ - user: level, plan, streak, objectives        │   │
│  │ - pillars: level/xp cada                       │   │
│  │ - tasks (7d): completed, rejected, expired     │   │
│  │ - ai_interactions (7d): últimas missões        │   │
│  └───────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│  2. CACHE CHECK                                      │
│  ┌───────────────────────────────────────────────┐   │
│  │ Hash do contexto (SHA-256)                     │   │
│  │ Se hash existe em ai_interactions (< 24h):     │   │
│  │   → Retorna resposta cacheada                  │   │
│  │   → Marca is_cached = true                     │   │
│  │ Se não: prossegue para API                     │   │
│  └───────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│  3. MONTAGEM DO PROMPT                               │
│  ┌───────────────────────────────────────────────┐   │
│  │ System Prompt (fixo, nunca exposto):            │   │
│  │ - Personalidade do Mentor                      │   │
│  │ - Regras de segurança (nunca sugerir harm)     │   │
│  │ - Formato de saída (JSON schema)               │   │
│  │ - Limites de dificuldade                       │   │
│  │                                                │   │
│  │ User Message (dinâmico):                       │   │
│  │ - Contexto compilado do passo 1                │   │
│  │ - Quantidade de missões a gerar                │   │
│  │ - Instrução de não repetir missões recentes    │   │
│  └───────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│  4. CHAMADA À API ANTHROPIC                          │
│  ┌───────────────────────────────────────────────┐   │
│  │ Model: claude-sonnet-4-20250514                │   │
│  │ Max tokens: 1000                               │   │
│  │ Temperature: 0.7 (criatividade controlada)     │   │
│  │ Timeout: 30s                                   │   │
│  │ Retry: 2x com backoff exponencial              │   │
│  └───────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────┘
                        │
                  ┌─────┴─────┐
                  │  Sucesso? │
                  └─────┬─────┘
              Sim ──────┼────── Não
                │       │       │
                ▼       │       ▼
┌───────────────────┐   │  ┌────────────────────┐
│  5. VALIDAÇÃO     │   │  │  FALLBACK           │
│  ┌─────────────┐  │   │  │  ┌──────────────┐  │
│  │ Parse JSON  │  │   │  │  │ Template     │  │
│  │ Zod schema  │  │   │  │  │ estático     │  │
│  │ Sanitize    │  │   │  │  │ por pilar    │  │
│  │ Safety chk  │  │   │  │  │ + dificuldade│  │
│  └─────────────┘  │   │  │  └──────────────┘  │
└─────────┬─────────┘   │  └─────────┬──────────┘
          │             │            │
          ▼             │            ▼
┌──────────────────────────────────────────────────────┐
│  6. PERSISTÊNCIA                                     │
│  ┌───────────────────────────────────────────────┐   │
│  │ INSERT tasks (source = 'ai'/'template')        │   │
│  │ INSERT ai_interactions (tokens, cost, hash)    │   │
│  │ UPDATE users.last_mission_generated_at         │   │
│  └───────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### 6.2 System Prompt do Mentor (Estrutura)

```typescript
// src/lib/ai/prompts.ts — NUNCA exposto ao frontend
export const MENTOR_SYSTEM_PROMPT = `
Você é o Mentor do Life Boost PRO, um guia pessoal gamificado.

PERSONALIDADE:
- Tom motivacional mas direto, sem ser piegas
- Use referências de RPG/games naturalmente
- Trate o usuário como herói de sua própria jornada
- Seja específico nas missões, não genérico

REGRAS DE SEGURANÇA:
- NUNCA sugira missões que possam prejudicar saúde (jejum extremo, exercício perigoso)
- NUNCA sugira missões envolvendo gastos de dinheiro
- NUNCA sugira missões que envolvam outras pessoas sem consentimento
- NUNCA inclua dados pessoais do usuário na resposta
- NUNCA quebre o formato JSON definido

FORMATO DE RESPOSTA:
Responda APENAS com JSON válido, sem markdown, sem texto fora do JSON.
{json_schema}

CALIBRAÇÃO DE DIFICULDADE:
- Se taxa de conclusão > 80%: priorize missões "hard" e "epic"
- Se taxa de conclusão entre 40-80%: mix balanceado
- Se taxa de conclusão < 40%: priorize "easy" e "medium"
- Sempre inclua pelo menos 1 missão "easy" para garantir acessibilidade
`;
```

### 6.3 Otimização de Custo de IA

| Estratégia | Implementação | Economia Estimada |
|------------|--------------|-------------------|
| Cache por hash de contexto | Se contexto do user não mudou em 24h, retorna cache | 15-25% |
| Batch de usuários por fuso | Agrupa gerações por timezone para reduzir overhead | 5-10% |
| Modelo adaptativo | Usar claude-haiku para missões simples (Free), sonnet para complexas | 30-40% em Free |
| Prompt compacto | Contexto limitado a 800 tokens, resposta a 600 | Controle linear |
| Deduplicação de contexto | Não enviar dados que não mudaram desde última interação | 10-15% |
| Rate limiting rigoroso | Limites por plano reduzem volume total | Proporcional |
| Template fallback | 100% das missões de fallback são grátis (sem API call) | Emergency savings |

### 6.4 Zod Schema para Validação de Resposta da IA

```typescript
// src/schemas/ai.schema.ts
import { z } from 'zod';

export const AIMissionSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(300),
  pillar: z.enum(['health', 'intelligence', 'gold', 'strength']),
  difficulty: z.enum(['easy', 'medium', 'hard', 'epic']),
  motivation: z.string().max(200).optional(),
});

export const AIDailyResponseSchema = z.object({
  missions: z.array(AIMissionSchema).min(1).max(20),
  daily_message: z.string().max(300),
});

export const AIWeeklyReportSchema = z.object({
  summary: z.string().max(500),
  strongest_pillar: z.enum(['health', 'intelligence', 'gold', 'strength']),
  weakest_pillar: z.enum(['health', 'intelligence', 'gold', 'strength']),
  focus_suggestion: z.string().max(300),
  motivation_message: z.string().max(300),
});

export const AIChatResponseSchema = z.object({
  message: z.string().max(1000),
  suggested_mission: AIMissionSchema.optional(),
});
```

---

## 7. Conformidade LGPD (Privacy by Design)

### 7.1 Princípios Implementados

| Princípio LGPD | Implementação Arquitetural |
|----------------|---------------------------|
| Finalidade | Cada dado coletado tem propósito documentado (tabela 7.2) |
| Adequação | Coletamos apenas dados necessários ao funcionamento |
| Necessidade | Sem campos opcionais armazenados quando vazios |
| Livre acesso | Endpoint /api/user/export retorna todos os dados [UC-092] |
| Qualidade | Validação Zod em todas as entradas; email verificado |
| Transparência | Política de privacidade detalhada; consent_records rastreiam aceite |
| Segurança | RLS, encryption at rest/in transit, audit log |
| Prevenção | Rate limiting, input validation, security headers |
| Não discriminação | Nenhum dado sensível (raça, religião, política) é coletado |
| Responsabilização | Audit log de ações sensíveis; logs de processamento de dados |

### 7.2 Mapa de Dados Pessoais

| Dado | Tabela | Finalidade | Base Legal | Retenção |
|------|--------|-----------|------------|----------|
| Email | users | Autenticação, comunicação | Execução de contrato | Até exclusão da conta + 30d |
| Nome de exibição | users | Personalização, ranking | Execução de contrato | Até exclusão da conta + 30d |
| Senha (hash) | auth.users | Autenticação | Execução de contrato | Até exclusão da conta |
| Fuso horário | users | Funcionalidade (streak, missões) | Execução de contrato | Até exclusão da conta |
| IP address | audit_log, consent | Segurança, auditoria | Interesse legítimo | 90 dias (anonimizado após) |
| User agent | audit_log | Segurança, debug | Interesse legítimo | 90 dias (anonimizado após) |
| Objetivos pessoais | users.objectives | Personalização de IA | Consentimento | Até exclusão da conta |
| Tarefas/missões | tasks | Funcionalidade core | Execução de contrato | Conforme plano |
| Histórico de XP | xp_history | Funcionalidade core | Execução de contrato | Conforme plano |
| Interações com IA | ai_interactions | Melhoria do serviço, custo tracking | Interesse legítimo | 90 dias |
| Dados de pagamento | Stripe (externo) | Processamento de pagamento | Execução de contrato | Gerido pelo Stripe |

### 7.3 Fluxo de Exclusão de Dados (LGPD Art. 18)

```
Usuário solicita exclusão [UC-006]
         │
         ▼
┌─────────────────────────────┐
│  1. VALIDAÇÃO               │
│  - Confirma identidade      │
│  - Registra solicitação     │
│  - Cancela assinatura Stripe│
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  2. PERÍODO DE CARÊNCIA     │
│  - 30 dias                  │
│  - Conta marcada como       │
│    "deletion_requested_at"  │
│  - Pode cancelar via login  │
│  - Email enviado dia 1 e 25│
└────────────┬────────────────┘
             │
             ▼ (CRON diário verifica)
┌─────────────────────────────┐
│  3. HARD DELETE              │
│  - hard_delete_user(id)     │
│  - Remove TODOS os dados    │
│  - Anonimiza audit_log      │
│  - Remove auth.users        │
│  - Notifica Stripe para     │
│    remover dados do cliente  │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  4. CONFIRMAÇÃO             │
│  - Email final: "Seus dados │
│    foram removidos"         │
│  - Registro no audit_log    │
│    (anonimizado)            │
└─────────────────────────────┘
```

### 7.4 Exportação de Dados (LGPD Art. 18, V)

```typescript
// Estrutura do JSON de exportação
interface UserDataExport {
  export_metadata: {
    generated_at: string;
    format_version: string;
    user_id: string;
  };
  personal_data: {
    email: string;
    display_name: string;
    timezone: string;
    locale: string;
    created_at: string;
  };
  game_data: {
    current_level: number;
    total_xp: number;
    streak_count: number;
    max_streak: number;
    pillars: PillarData[];
    avatar_config: object;
  };
  tasks: TaskData[];
  achievements: AchievementData[];
  ai_interactions_summary: {
    total_interactions: number;
    types: Record<string, number>;
  };
  subscription: {
    plan: string;
    period_end: string | null;
  };
  consent_records: ConsentData[];
}
```

---

## 8. Estratégia de Cache e Performance

### 8.1 Camadas de Cache

```
┌──────────────────────────────────────────────────────────┐
│  CAMADA 1: CDN (Vercel Edge)                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Assets estáticos: avatars, badges, fonts, images   │  │
│  │ Cache-Control: public, max-age=31536000, immutable │  │
│  │                                                    │  │
│  │ Landing page (ISR): revalidate a cada 1 hora       │  │
│  │ Cache-Control: public, s-maxage=3600, stale-       │  │
│  │                while-revalidate=86400              │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│  CAMADA 2: Server-Side (React Server Components Cache)   │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Catálogo de conquistas: revalidate 1 hora          │  │
│  │ Ranking: revalidate 5 minutos                      │  │
│  │ Dados do usuário: no-store (sempre fresh)          │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│  CAMADA 3: Banco de Dados (Supabase/PostgreSQL)          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Prepared statements cacheados                      │  │
│  │ Connection pooling (PgBouncer no Supabase)         │  │
│  │ Índices otimizados (seção 4.2)                     │  │
│  │ Materialized views para rankings pesados           │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│  CAMADA 4: Cache de IA                                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Hash do contexto → resposta cacheada (24h TTL)     │  │
│  │ Armazenado na própria tabela ai_interactions       │  │
│  │ Lookup por request_hash antes de chamar API        │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### 8.2 Estratégia de Fetch por Página

| Página | Estratégia | Cache | Justificativa |
|--------|-----------|-------|---------------|
| Landing (/) | ISR (Incremental Static Regeneration) | CDN, revalidate 1h | Raramente muda, precisa de SEO |
| Dashboard | RSC Streaming + no-store | Nenhum | Dados pessoais, sempre fresh |
| Tasks | RSC Streaming + no-store | Nenhum | Mutations frequentes |
| Achievements | RSC + stale-while-revalidate | 1h para catálogo | Catálogo muda raramente |
| Ranking | RSC + revalidate 5min | 5 min | Snapshot pré-calculado |
| Profile | RSC + no-store | Nenhum | Dados pessoais |
| Pricing | ISR + revalidate 24h | CDN, 24h | Preços mudam raramente |
| Onboarding | CSR (Client-Side) | Nenhum | Interatividade total |

### 8.3 Otimização de Performance Frontend

| Técnica | Implementação |
|---------|--------------|
| Code Splitting | Automático no Next.js App Router (por rota) |
| Tree Shaking | Tailwind purge + Next.js bundle analyzer |
| Image Optimization | Next.js Image component com WebP automático |
| Font Optimization | next/font com subset latin para eliminação de FOIT |
| Lazy Loading | Componentes pesados (gráficos, chat IA) carregados com dynamic() |
| Prefetching | Link prefetch habilitado para rotas principais |
| Bundle Size | Target < 150KB first load JS (monitorado via Vercel) |
| Animações | CSS animations/transitions preferidos sobre JS; framer-motion lazy loaded |
| Streaming | RSC com Suspense boundaries para TTI progressivo |

### 8.4 Otimização de Queries SQL

```sql
-- QUERY OTIMIZADA: Dashboard (dados do usuário + pilares + tarefas do dia)
-- Uma única query ao invés de 3 separadas
SELECT
    u.id, u.display_name, u.current_level, u.total_xp,
    u.streak_count, u.avatar_config, u.plan,
    (
        SELECT json_agg(json_build_object(
            'type', p.type, 'level', p.current_level, 'xp', p.current_xp
        ))
        FROM pillars p WHERE p.user_id = u.id
    ) as pillars,
    (
        SELECT json_agg(json_build_object(
            'id', t.id, 'title', t.title, 'pillar', t.pillar_type,
            'difficulty', t.difficulty, 'status', t.status,
            'source', t.source, 'xp_reward', t.xp_reward
        ) ORDER BY t.status ASC, t.created_at DESC)
        FROM tasks t
        WHERE t.user_id = u.id
          AND t.status IN ('pending', 'completed')
          AND t.created_at >= CURRENT_DATE
    ) as today_tasks
FROM users u
WHERE u.id = $1;
-- Usa índices: PK users, idx_pillars_user, idx_tasks_user_status_created
-- Tempo esperado: < 10ms
```

---

## 9. Arquitetura de Deploy e Infraestrutura

### 9.1 Ambientes

| Ambiente | URL | Branch | Propósito |
|----------|-----|--------|-----------|
| Development | localhost:3000 | feature/* | Desenvolvimento local |
| Preview | *.vercel.app | PR branches | Review de PRs, QA |
| Staging | staging.lifeboostpro.com | develop | Teste pré-produção |
| Production | lifeboostpro.com | main | Produção |

### 9.2 Pipeline de Deploy (CI/CD)

```
Developer push → GitHub
        │
        ▼
┌─────────────────────────────────────────┐
│  GitHub Actions                          │
│  ┌─────────────────────────────────────┐ │
│  │ 1. Lint (ESLint + Prettier)        │ │
│  │ 2. Type Check (tsc --noEmit)       │ │
│  │ 3. Unit Tests (Vitest)             │ │
│  │ 4. Security Scan (npm audit)       │ │
│  │ 5. Build Check (next build)        │ │
│  └─────────────────────────────────────┘ │
└──────────────────┬──────────────────────┘
                   │ (se pass)
                   ▼
┌─────────────────────────────────────────┐
│  Vercel                                  │
│  ┌─────────────────────────────────────┐ │
│  │ 6. Build production                 │ │
│  │ 7. Deploy to preview (PR) ou       │ │
│  │    production (main)                │ │
│  │ 8. Lighthouse CI (score > 90)      │ │
│  │ 9. E2E Tests (Playwright)          │ │
│  └─────────────────────────────────────┘ │
└──────────────────┬──────────────────────┘
                   │ (se production)
                   ▼
┌─────────────────────────────────────────┐
│  Post-Deploy                             │
│  ┌─────────────────────────────────────┐ │
│  │ 10. Supabase migrations (se houver)│ │
│  │ 11. Smoke tests em produção        │ │
│  │ 12. Sentry release tracking        │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 9.3 Variáveis de Ambiente

```bash
# .env.example — Template (NUNCA commitar valores reais)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...        # Apenas operações com RLS
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # APENAS no server (CRON, webhooks)

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...                # APENAS no server

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...   # Client-safe
STRIPE_SECRET_KEY=sk_...                    # APENAS no server
STRIPE_WEBHOOK_SECRET=whsec_...             # APENAS no server

# App
NEXT_PUBLIC_APP_URL=https://lifeboostpro.com
CRON_SECRET=random-secret-for-cron-auth     # Protege endpoints CRON

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...
```

**Regra de ouro:** qualquer variável com prefixo `NEXT_PUBLIC_` é exposta ao browser. NUNCA prefixar com `NEXT_PUBLIC_` variáveis que contêm secrets.

### 9.4 CRON Jobs (Vercel Cron)

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-missions",
      "schedule": "5 */1 * * *"
    },
    {
      "path": "/api/cron/expire-tasks",
      "schedule": "0 */1 * * *"
    },
    {
      "path": "/api/cron/recurring-tasks",
      "schedule": "1 */1 * * *"
    },
    {
      "path": "/api/cron/ranking-snapshot",
      "schedule": "30 */1 * * *"
    },
    {
      "path": "/api/cron/daily-briefing",
      "schedule": "0 */1 * * *"
    },
    {
      "path": "/api/cron/weekly-report",
      "schedule": "0 */1 * * 0"
    },
    {
      "path": "/api/cron/proactive-alerts",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/cleanup-deleted-users",
      "schedule": "0 3 * * *"
    },
    {
      "path": "/api/cron/anonymize-old-logs",
      "schedule": "0 4 * * 1"
    }
  ]
}
```

**Detalhamento dos CRON Jobs:**

| Job | Schedule | Lógica de Execução |
|-----|----------|--------------------|
| `daily-missions` | A cada hora (min 5) | Roda a cada hora e filtra usuários cujo fuso horário acabou de passar das 00:05. Ex: quando o CRON executa às 03:05 UTC, processa apenas usuários com timezone UTC-3 (onde são 00:05 local). Garante que cada usuário recebe missões à meia-noite do seu fuso, sem necessidade de agendar CRONs por timezone. |
| `expire-tasks` | A cada hora (min 0) | Identifica tarefas com `status='pending'` e `due_date < NOW()` e marca como `'expired'`. Roda a cada hora para cobrir todos os fusos horários sem atraso perceptível. |
| `recurring-tasks` | A cada hora (min 1) | Gera novas instâncias de tarefas recorrentes para usuários cujo fuso horário acabou de virar meia-noite (mesma lógica de timezone do `daily-missions`). Marca instâncias anteriores não completadas como expiradas. [UC-028] |
| `ranking-snapshot` | A cada hora (min 30) | Recalcula snapshots de ranking semanal e global. Executado meia hora após os outros para garantir que XP recente já foi processado. [RN-RANK-03] |
| `weekly-report` | A cada hora aos domingos | Roda a cada hora no domingo e filtra usuários cujo fuso horário corresponde a 23:00 local. Gera relatório semanal por IA para planos Starter+. [RN-IA05] |
| `proactive-alerts` | A cada 6 horas | Analisa padrões negativos (inatividade 3+ dias, streak em risco, pilar negligenciado) e envia alertas por email/in-app para planos Starter+. Frequência menor para evitar spam. [UC-063] |
| `cleanup-deleted-users` | Diário às 03:00 UTC | Executa `hard_delete_user()` para contas com `deletion_requested_at` há mais de 30 dias. Horário de baixo tráfego. [UC-006, LGPD-003] |
| `daily-briefing` | A cada hora (min 0) | Gera briefings diários para usuários cujo fuso acaba de passar das 06:00 local. Compila contexto dos últimos 7 dias e chama API Anthropic. Resultado cacheado na tabela `daily_briefings`. |
| `anonymize-old-logs` | Semanal (segunda 04:00 UTC) | Anonimiza registros de `audit_log` e `ai_interactions` com mais de 90 dias. Remove IP e user_agent. [SEC-010] |

**Padrão de timezone nos CRONs horários:**

```typescript
// Lógica reutilizada por daily-missions, recurring-tasks e weekly-report
// Exemplo: /api/cron/daily-missions/route.ts

export async function POST(req: Request) {
  // 1. Validar CRON_SECRET
  validateCronSecret(req);

  // 2. Calcular qual timezone acabou de passar das 00:05
  const now = new Date();
  const targetLocalHour = 0;
  const targetLocalMinute = 5;

  // Buscar usuários cujo fuso horário corresponde ao horário-alvo
  // Ex: se agora é 03:05 UTC → processa timezone 'America/Sao_Paulo' (UTC-3)
  const { data: users } = await supabaseAdmin
    .from('users')
    .select('id, timezone')
    .eq('onboarding_completed', true)
    .filter('timezone', 'in', getTimezonesAtLocalTime(now, targetLocalHour, targetLocalMinute));

  // 3. Processar geração de missões para cada usuário
  for (const user of users) {
    await generateDailyMissions(user.id);
  }
}
```

Cada endpoint CRON é protegido por validação do header `Authorization: Bearer {CRON_SECRET}`. O Vercel injeta este header automaticamente nas chamadas de CRON configuradas.

---

## 10. Observabilidade e Monitoramento

### 10.1 Stack de Monitoramento

| Ferramenta | Função | Custo |
|-----------|--------|-------|
| Vercel Analytics | Performance frontend (Web Vitals) | Incluso |
| Vercel Speed Insights | LCP, FID, CLS real user monitoring | Incluso |
| Sentry | Error tracking + performance backend | Free tier (5K events/mês) |
| Supabase Dashboard | Métricas de banco (queries, connections, RLS denials) | Incluso |
| Stripe Dashboard | Métricas de pagamento (MRR, churn, falhas) | Incluso |
| Custom Admin Dashboard [UC-110] | Métricas de negócio (DAU, conversão, custo IA) | Interno |

### 10.2 Alertas Configurados

| Alerta | Condição | Canal | Severidade |
|--------|----------|-------|------------|
| Error rate spike | > 5% de requests com 5xx em 5 min | Email + Sentry | Crítico |
| API IA down | 3 falhas consecutivas em geração de missões | Email | Crítico |
| Custo IA diário | > R$ 50/dia (threshold inicial) | Email | Warning |
| Latência API | p95 > 2s por 10 min | Sentry | Warning |
| Database connections | > 80% do pool utilizado | Email | Warning |
| Stripe webhook failures | > 3 webhooks falharam em 1h | Email | Crítico |
| RLS denial spike | > 10 denials/min (possível ataque) | Email + Sentry | Crítico |
| Disk usage Supabase | > 80% do storage | Email | Warning |
| Cadastros anômalos | > 100 cadastros/hora (possível bot) | Email | Warning |

---

## 11. Estratégia de Testes

### 11.1 Pirâmide de Testes

| Camada | Ferramenta | Cobertura Target | O que testa |
|--------|-----------|-------------------|-------------|
| Unit | Vitest | > 80% | Services, utils, schemas Zod, cálculos de XP |
| Integration | Vitest + Supabase local | > 60% | API Routes, RLS policies, database functions |
| E2E | Playwright | Fluxos críticos | Cadastro → onboarding → completar tarefa → level up |
| Security | Custom scripts | 100% RLS | Tentativas de acesso cross-user em todas as tabelas |
| Performance | Lighthouse CI | Score > 90 | Web Vitals em cada deploy |
| Visual | Playwright screenshots | Páginas principais | Regressão visual em mobile e desktop |

### 11.2 Testes de Segurança Obrigatórios

```typescript
// tests/security/rls.test.ts — EXECUTAR ANTES DE CADA RELEASE
describe('RLS Policies', () => {
  test('User A cannot read User B tasks', async () => {
    const { data } = await supabaseAsUserA
      .from('tasks')
      .select('*')
      .eq('user_id', userB.id);
    expect(data).toHaveLength(0);
  });

  test('User cannot update own plan directly', async () => {
    const { error } = await supabaseAsUser
      .from('users')
      .update({ plan: 'ultra' })
      .eq('id', user.id);
    expect(error).toBeTruthy(); // RLS bloqueia
  });

  test('User cannot insert achievements for themselves', async () => {
    const { error } = await supabaseAsUser
      .from('user_achievements')
      .insert({ user_id: user.id, achievement_id: 'some-id' });
    expect(error).toBeTruthy(); // Apenas service role
  });

  test('User cannot read other users AI interactions', async () => {
    const { data } = await supabaseAsUserA
      .from('ai_interactions')
      .select('*')
      .eq('user_id', userB.id);
    expect(data).toHaveLength(0);
  });

  test('User cannot access audit_log of another user', async () => {
    const { data } = await supabaseAsUserA
      .from('audit_log')
      .select('*')
      .eq('user_id', userB.id);
    expect(data).toHaveLength(0);
  });
});
```

---

## 12. Estratégia de Escalabilidade

### 12.1 Gargalos Identificados e Mitigações

| Componente | Gargalo | Threshold | Mitigação |
|-----------|---------|-----------|-----------|
| Supabase DB | Connections | 60 (free) / 200 (pro) | Connection pooling; upgrade para Pro quando > 50 ativos |
| API Anthropic | Rate limit | Depende do tier contratado | Cache agressivo; batch processing; queue para geração |
| Vercel Serverless | Cold starts | Perceptível após inatividade | Manter funções quentes via cron; edge runtime onde possível |
| Stripe Webhooks | Delivery delay | Raro | Implementar polling como fallback; idempotency keys |
| Ranking Calculation | Query peso | > 10K users | Snapshot pré-calculado; materialized view; paginação |

### 12.2 Roadmap de Escala

| Fase | Usuários | Ações |
|------|----------|-------|
| 0 - Launch | 0 — 500 | Supabase Free, Vercel Hobby, monitorar de perto |
| 1 - Traction | 500 — 2.000 | Supabase Pro, Vercel Pro, implementar cache de IA |
| 2 - Growth | 2.000 — 10.000 | Redis para cache (Upstash), queue para IA (Inngest/Trigger.dev), CDN otimizado |
| 3 - Scale | 10.000+ | Supabase Team, read replicas, Anthropic tier empresarial, considerar migrar CRON para workers dedicados |

---

## 13. Decisões Arquiteturais Pendentes

| Decisão | Opções | Quando Decidir | Critério |
|---------|--------|---------------|----------|
| Redis/Upstash para cache | Sim / Manter PostgreSQL | Quando cache de IA atingir > 10K entries | Latência de lookup > 50ms |
| Queue system para IA | Inngest / Trigger.dev / Supabase Edge Functions | Quando geração de missões > 5 min para processar todos os users | Timeout de CRON |
| Email provider | Resend / SendGrid / Supabase built-in | MVP | Custo + developer experience |
| Analytics provider | PostHog / Mixpanel / Custom | v1.1 | Custo + privacidade dos dados |
| Avatar rendering | SVG estático / Canvas / Lottie animations | MVP (estático) → v1.1 (animado) | Complexidade vs impacto visual |
| Mobile framework | React Native / Flutter / PWA | v2.0 | Reutilização de código vs performance nativa |

---

## 14. Glossário Técnico

| Termo | Definição |
|-------|-----------|
| RSC | React Server Components — componentes renderizados no servidor |
| ISR | Incremental Static Regeneration — páginas estáticas que se atualizam periodicamente |
| RLS | Row Level Security — políticas no PostgreSQL que restringem acesso por linha |
| CDN | Content Delivery Network — rede de distribuição de conteúdo estático |
| JWT | JSON Web Token — token de autenticação assinado |
| BaaS | Backend as a Service — backend gerenciado (Supabase) |
| Edge Runtime | Ambiente de execução leve na borda da CDN (sem Node.js completo) |
| DXA | Document eXternal Attributes — unidade de medida em documentos |
| TTI | Time to Interactive — tempo até a página ser interativa |
| FOIT | Flash of Invisible Text — flash de texto invisível durante carregamento de fonte |

---

*Este documento deve ser revisado a cada release major e atualizado conforme decisões arquiteturais são tomadas. Toda mudança arquitetural significativa deve ser documentada como ADR (Architecture Decision Record) com justificativa, alternativas consideradas e consequências.*
