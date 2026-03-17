# PRD — Life Boost PRO

### Plataforma Gamificada de Organização de Vida com IA

**Versão:** 1.0  
**Data:** 16/03/2026  
**Status:** Levantamento de Requisitos  
**Autor:** Claude (Engenheiro de Software)

---

## 1. Visão Geral do Produto

### 1.1 Problema

A maioria das pessoas tem dificuldade em manter consistência na organização de diferentes áreas da vida (saúde, finanças, estudos, rotina). Apps de produtividade tradicionais são funcionais mas entediantes — não geram engajamento a longo prazo. A gamificação resolve isso transformando progresso real em recompensas tangíveis dentro do sistema.

### 1.2 Solução

Uma plataforma web responsiva que transforma a organização da vida do usuário em uma experiência de RPG. O usuário cria um avatar, recebe missões personalizadas por IA, ganha XP ao completar tarefas reais, sobe de nível e desbloqueia conquistas. A IA atua como mentor inteligente, adaptando desafios ao perfil e progresso individual.

### 1.3 Público-Alvo

- **Primário:** Jovens adultos (18-35 anos) que consomem cultura gamer/anime e buscam organização pessoal
- **Secundário:** Qualquer pessoa que já tentou apps de produtividade e abandonou por falta de motivação
- **Terciário:** Comunidades de desenvolvimento pessoal e self-improvement

### 1.4 Proposta de Valor

> "Transforme sua vida real em um jogo. Evolua seu personagem evoluindo você mesmo." — Life Boost PRO

### 1.5 Diferenciais Competitivos

- IA como mentor personalizado (não apenas tracking passivo)
- Estética dark/gamer de alta qualidade (não genérico)
- Gamificação profunda (não apenas badges superficiais)
- Categorias integradas (visão holística da vida, não apenas hábitos)

---

## 2. Análise de Mercado

### 2.1 Concorrentes Diretos

| Produto | Modelo | Pontos Fortes | Fraquezas |
|---------|--------|---------------|-----------|
| Habitica | Freemium | RPG + hábitos, comunidade ativa | Visual datado (pixel art), sem IA |
| Solo Leveling Arise (apps clone) | Pago | Estética forte, hype do anime | Maioria são golpes, sem produto real |
| LifeUp | Freemium | Gamificação flexível | Interface complexa, sem IA, nicho |

### 2.2 Concorrentes Indiretos

| Produto | Categoria | Por que compete |
|---------|-----------|-----------------|
| Todoist | Produtividade | Gestão de tarefas (sem gamificação) |
| Notion | Produtividade | Organização geral (sem gamificação) |
| Duolingo | Educação | Referência em gamificação (mas só idiomas) |

### 2.3 Oportunidade

O mercado de gamificação aplicada está em crescimento. O Habitica provou o modelo mas não evoluiu visualmente. Os clones de Solo Leveling provaram a demanda mas não entregaram produto real. Existe um espaço claro para um produto que una estética premium, IA e gamificação profunda.

---

## 3. Categorias de Vida (Pilares)

Cada categoria funciona como um "atributo" do personagem do usuário, com progressão independente e contribuição para o nível geral.

### 3.1 Saúde (HP — Health Points)

- Registro de exercícios físicos (tipo, duração, intensidade)
- Acompanhamento de alimentação (simplificado, não calórico)
- Tracking de sono (horas dormidas, qualidade)
- Metas de hidratação
- A IA sugere missões como: "Caminhe 30min hoje" ou "Durma antes das 23h por 5 dias seguidos"

### 3.2 Estudos/Carreira (INT — Intelligence)

- Registro de horas de estudo
- Metas de aprendizado (cursos, livros, certificações)
- Tracking de progresso profissional
- A IA sugere missões como: "Estude 2h de React esta semana" ou "Leia 20 páginas do livro X"

### 3.3 Finanças (GOLD — Ouro)

- Registro de receitas e despesas (simplificado)
- Metas de economia
- Tracking de investimentos (opcional)
- A IA sugere missões como: "Economize R$200 este mês" ou "Não gaste com delivery por 7 dias"

### 3.4 Rotina/Produtividade (STR — Strength)

- Agenda diária com tarefas
- Hábitos recorrentes (diários, semanais)
- Metas de produtividade
- A IA sugere missões como: "Complete todas as tarefas de hoje antes das 18h" ou "Mantenha o streak de 7 dias"

### 3.5 Nível Geral (LEVEL)

- Calculado pela média ponderada dos 4 pilares
- Representa a "evolução total" do usuário
- Desbloqueios visuais acontecem por nível geral

---

## 4. Sistema de Gamificação

### 4.1 Sistema de XP e Níveis

| Elemento | Descrição |
|----------|-----------|
| XP por tarefa | Cada tarefa completada dá XP proporcional à dificuldade |
| XP por pilar | Cada categoria acumula XP independente |
| XP geral | Soma ponderada dos pilares |
| Curva de nível | Progressiva (cada nível exige mais XP que o anterior) |
| Nível máximo | 100 (ou sem limite, a definir) |
| Multiplicadores | Streaks (sequências) multiplicam o XP ganho |

**Fórmula sugerida de XP por nível:**

```
XP_necessário(n) = 100 * n^1.5
```

- Nível 1→2: 100 XP
- Nível 10→11: ~316 XP
- Nível 50→51: ~3.536 XP

### 4.2 Avatar/Personagem

| Elemento | Descrição |
|----------|-----------|
| Criação | Usuário escolhe base do avatar no onboarding |
| Evolução visual | Avatar muda aparência conforme sobe de nível |
| Equipamentos | Itens visuais desbloqueados por conquistas |
| Classes | Possibilidade futura — especialização baseada no pilar mais forte |
| Skins | Variações visuais (potencial de monetização) |

### 4.3 Conquistas/Badges

| Categoria | Exemplos |
|-----------|----------|
| Streak | "7 dias seguidos", "30 dias seguidos", "365 dias seguidos" |
| Marco | "Primeiro nível", "Nível 10", "Nível 50" |
| Pilar | "Mestre da Saúde (nível 25 em Saúde)" |
| Desafio | "Completou desafio semanal da IA" |
| Social | "Ficou em 1º no ranking semanal" |
| Segredo | Conquistas ocultas para descobrir |

### 4.4 Ranking/Leaderboard

| Elemento | Descrição |
|----------|-----------|
| Ranking Global | Top usuários por XP total |
| Ranking Semanal | Reset toda segunda — incentiva engajamento contínuo |
| Ranking por Pilar | Quem é o melhor em Saúde, Finanças, etc. |
| Ranking entre Amigos | Competição entre pessoas que se seguem |
| Anti-cheating | IA valida consistência das atividades reportadas |

---

## 5. Sistema de IA

### 5.1 Mentor Inteligente

A IA atua como um "NPC guia" dentro do jogo. Ela conhece o perfil, histórico e objetivos do usuário e se comunica de forma personalizada.

**Funcionalidades do Mentor:**

- **Geração de Missões Personalizadas:** A IA cria missões diárias/semanais baseadas no perfil do usuário, nível atual e áreas que precisam de atenção. Se o usuário está negligenciando Saúde, o mentor prioriza missões dessa categoria.
- **Análise de Progresso e Feedback:** Relatórios semanais gerados por IA com insights sobre o desempenho. Exemplo: "Você teve um ótimo progresso em Estudos esta semana (+45% XP), mas sua Saúde caiu. Que tal focar em exercícios nos próximos dias?"
- **Desafios Adaptativos:** A IA ajusta a dificuldade das missões automaticamente. Se o usuário está completando tudo fácil, aumenta a dificuldade. Se está falhando muito, reduz para manter motivação.
- **Coaching Contextual:** Respostas e dicas contextuais quando o usuário interage. Não é um chatbot genérico — é um mentor que conhece seu histórico.
- **Alertas Inteligentes:** Notificações proativas quando detecta padrões negativos (ex: 3 dias sem registrar nada, streak prestes a quebrar).

### 5.2 Modelo de IA

| Aspecto | Decisão |
|---------|---------|
| Provider | API Anthropic (Claude) |
| Modelo | claude-sonnet-4-20250514 (custo-benefício ideal para SaaS) |
| Chamadas | Assíncronas via backend (nunca expor API key no frontend) |
| Contexto | System prompt com perfil do usuário + histórico recente |
| Rate limiting | Limitar chamadas por usuário/dia para controle de custo |
| Cache | Cachear respostas similares para reduzir custos |

### 5.3 Custo de IA por Usuário (Estimativa)

| Plano | Chamadas IA/dia | Custo estimado/mês por usuário |
|-------|-----------------|-------------------------------|
| Free | 3 | ~R$ 0,30 — R$ 0,50 |
| Pro | 15 | ~R$ 1,50 — R$ 2,50 |

*Valores estimados, dependem do volume de tokens por chamada.*

---

## 6. Funcionalidades por Release

### 6.1 MVP (v1.0) — Lançamento

**Objetivo:** Produto funcional mínimo para validar o conceito e coletar feedback.

**Inclui:**

- Cadastro/Login (email + Google OAuth)
- Onboarding com criação de avatar (escolha de base pré-definida)
- Dashboard principal com visão geral dos 4 pilares
- CRUD de tarefas/hábitos por categoria
- Sistema de XP e níveis funcionando
- Barra de progresso por pilar e geral
- Mentor IA básico (missões diárias geradas por IA)
- Conquistas básicas (10-15 badges)
- Perfil do usuário com avatar e stats
- Design dark/neon responsivo
- Landing page com conversão para cadastro

**Não inclui no MVP:**

- Ranking/Leaderboard (v1.1)
- Evolução visual do avatar (v1.1)
- Sistema de amigos (v1.2)
- Plano pago/pagamento (v1.1)
- App mobile nativo (v2.0)

### 6.2 v1.1 — Engajamento Social

- Ranking global e semanal
- Evolução visual do avatar (mudança de aparência por nível)
- Sistema de streaks com multiplicadores de XP
- Planos pagos com pagamento (Stripe) — Starter, Boost, Ultra
- Relatórios semanais por IA mais detalhados
- Notificações por email

### 6.3 v1.2 — Comunidade

- Sistema de amigos (seguir/ser seguido)
- Ranking entre amigos
- Desafios em grupo
- Conquistas sociais
- Compartilhar progresso (cards para redes sociais)

### 6.4 v2.0 — Mobile

- App nativo iOS e Android (React Native ou Flutter)
- Push notifications
- Widget na tela inicial do celular
- Sync completo com a versão web

---

## 7. Arquitetura Técnica

### 7.1 Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | Next.js 14+ (React) | Framework dominante, SSR, App Router, responsivo |
| Estilização | Tailwind CSS | Produtividade, design system consistente |
| Backend/API | Next.js API Routes + Supabase Edge Functions | Serverless, sem servidor para gerenciar |
| Banco de Dados | Supabase (PostgreSQL) | BaaS completo, Auth incluso, real-time |
| Autenticação | Supabase Auth | Email, Google OAuth, magic links |
| Storage | Supabase Storage | Avatares, imagens, assets |
| IA | API Anthropic (Claude Sonnet) | Melhor custo-benefício para geração de texto |
| Pagamento | Stripe | Padrão global para SaaS |
| Deploy | Vercel | Deploy automático, CDN global, free tier |
| Versionamento | Git + GitHub | Padrão da indústria |
| Monitoramento | Vercel Analytics + Sentry | Performance e error tracking |

### 7.2 Diagrama de Arquitetura (Simplificado)

```
[Usuário (Browser)]
       │
       ▼
[Vercel CDN / Next.js Frontend]
       │
       ├──► [Next.js API Routes] ──► [Supabase PostgreSQL]
       │          │
       │          ├──► [Supabase Auth]
       │          │
       │          ├──► [Supabase Storage]
       │          │
       │          └──► [API Anthropic (Claude)]
       │
       └──► [Stripe (Pagamentos)]
```

### 7.3 Modelagem do Banco de Dados (Entidades Principais)

**users**
- id (UUID, PK)
- email
- name
- avatar_config (JSONB — configuração visual do avatar)
- current_level (INT)
- total_xp (BIGINT)
- created_at
- updated_at
- plan (ENUM: free, starter, boost, ultra)
- streak_count (INT)
- last_activity_at

**pillars**
- id (UUID, PK)
- user_id (FK → users)
- type (ENUM: health, intelligence, gold, strength)
- current_level (INT)
- current_xp (BIGINT)
- updated_at

**tasks**
- id (UUID, PK)
- user_id (FK → users)
- pillar_type (ENUM)
- title
- description
- xp_reward (INT)
- difficulty (ENUM: easy, medium, hard, epic)
- is_recurring (BOOL)
- recurrence_rule (JSONB — diário, semanal, etc.)
- status (ENUM: pending, completed, failed, expired)
- due_date
- completed_at
- source (ENUM: user, ai — quem criou a tarefa)
- created_at

**achievements**
- id (UUID, PK)
- code (VARCHAR, unique — identificador interno)
- name
- description
- icon_url
- category (ENUM: streak, milestone, pillar, challenge, social, secret)
- condition (JSONB — regras para desbloqueio)

**user_achievements**
- id (UUID, PK)
- user_id (FK → users)
- achievement_id (FK → achievements)
- unlocked_at

**ai_interactions**
- id (UUID, PK)
- user_id (FK → users)
- type (ENUM: daily_missions, weekly_report, coaching, challenge)
- prompt_tokens (INT)
- completion_tokens (INT)
- response (TEXT)
- created_at

**leaderboard_snapshots** *(v1.1)*
- id (UUID, PK)
- user_id (FK → users)
- period_type (ENUM: weekly, monthly, all_time)
- period_start
- xp_earned (BIGINT)
- rank (INT)

### 7.4 Segurança

| Aspecto | Implementação |
|---------|--------------|
| Autenticação | Supabase Auth (JWT tokens) |
| Autorização | Row Level Security (RLS) no Supabase — cada usuário só acessa seus dados |
| API Key da IA | Apenas no backend (variável de ambiente na Vercel) |
| Rate Limiting | Middleware no Next.js + limites por plano |
| Validação | Zod para validação de inputs no backend |
| HTTPS | Automático via Vercel |

---

## 8. Modelo de Monetização

### 8.1 Visão Geral dos Planos

4 planos com progressão clara de valor. O plano **Boost** é o plano em destaque (melhor custo-benefício, recomendado na UI). Todos os planos pagos oferecem desconto progressivo, e o ciclo anual tem desconto adicional significativo.

### 8.2 Tabela de Planos

| Recurso | Free | Starter | ⭐ Boost (Destaque) | Ultra |
|---------|------|---------|---------------------|-------|
| **Preço Mensal** | R$ 0 | R$ 14,90/mês | R$ 29,90/mês | R$ 49,90/mês |
| **Preço Anual** | R$ 0 | R$ 9,90/mês (R$ 118,80/ano) | R$ 19,90/mês (R$ 238,80/ano) | R$ 34,90/mês (R$ 418,80/ano) |
| **Desconto Anual** | — | ~33% off | ~33% off | ~30% off |
| Tarefas ativas | 15 | 50 | Ilimitadas | Ilimitadas |
| Missões IA/dia | 3 | 8 | 20 | Ilimitadas |
| Coaching IA | Não | Básico (dicas gerais) | Completo (personalizado) | Completo + análise profunda |
| Relatório IA | Não | Semanal simplificado | Semanal detalhado | Diário + semanal + mensal |
| Categorias | 4 padrão | 4 padrão + 1 custom | 4 padrão + 3 custom | Ilimitadas |
| Avatar | Base estático | Evolução básica (5 estágios) | Evolução completa + skins | Evolução completa + skins exclusivas + efeitos |
| Conquistas | 10 básicas | 30 conquistas | Todas (50+) | Todas + secretas + exclusivas Ultra |
| Ranking | Apenas visualizar | Participar + posição | Posição destaque + badge | Badge exclusivo + destaque VIP |
| Desafios semanais IA | 1 | 3 | 5 | Ilimitados + criação própria |
| Histórico de progresso | 7 dias | 30 dias | 6 meses | Ilimitado |
| Exportar dados | Não | Não | CSV | CSV + PDF relatório visual |
| Suporte | Comunidade | Email (48h) | Email prioritário (24h) | Chat prioritário + email (12h) |
| Selo no perfil | Não | "Starter" | "Boost" (dourado) | "Ultra" (animado, neon) |

### 8.3 Estratégia de Precificação

**Por que o Boost é o plano destaque:**
- Concentra os recursos que mais geram engajamento (IA completa, avatar evoluído, conquistas completas)
- Preço acessível no anual (R$ 19,90/mês) com percepção de valor alta
- O Starter existe para capturar quem quer pagar pouco, mas funciona como "âncora" que faz o Boost parecer o melhor negócio
- O Ultra existe para power users e gera receita premium, mas o volume virá do Boost

**Incentivo ao plano anual:**
- Desconto de ~30-33% no ciclo anual em todos os planos
- Na UI de pricing, o preço anual é exibido como padrão com toggle para mensal
- Badge "Membro Anual" exclusivo no perfil
- 1 mês grátis de trial no plano anual (efetivamente 12 meses pelo preço de ~8-9)

**Estratégia de conversão Free → Pago:**
- Usuário Free vê preview dos recursos bloqueados (avatar evoluído aparece em cinza, conquistas trancadas)
- Ao atingir nível 5, popup de upgrade contextual: "Seu personagem está pronto para evoluir. Desbloqueie a evolução visual."
- Limite de missões IA gera frustração positiva: "Suas 3 missões de hoje acabaram. Quer mais? Upgrade para Starter."
- Relatório semanal do Boost aparece como preview borrado para Free users

### 8.4 Receita Estimada por Cenário (Mês 6)

| Cenário | Usuários Total | Free | Starter | Boost | Ultra | MRR Estimado |
|---------|---------------|------|---------|-------|-------|-------------|
| Conservador | 1.000 | 85% | 7% | 6% | 2% | ~R$ 3.800 |
| Moderado | 3.000 | 80% | 8% | 9% | 3% | ~R$ 16.500 |
| Otimista | 5.000 | 75% | 9% | 11% | 5% | ~R$ 42.000 |

*MRR = Monthly Recurring Revenue. Considera mix de planos mensais e anuais.*

### 8.5 Projeção de Custos (Primeiros 6 Meses)

| Serviço | Mês 1 | Mês 6 (Conservador) | Mês 6 (Moderado) |
|---------|-------|---------------------|-------------------|
| Vercel | R$ 0 (Hobby) | R$ 100 (Pro) | R$ 100 (Pro) |
| Supabase | R$ 0 (Free) | R$ 125 (Pro) | R$ 125 (Pro) |
| API Anthropic (Claude) | R$ 50 | R$ 300 | R$ 800 |
| Stripe (taxas) | R$ 0 | ~R$ 135 | ~R$ 580 |
| Domínio + DNS | R$ 5 | R$ 5 | R$ 5 |
| **Total** | **~R$ 55** | **~R$ 665** | **~R$ 1.610** |
| **Margem (MRR - Custos)** | — | **~R$ 3.135** | **~R$ 14.890** |

---

## 9. Métricas de Sucesso (KPIs)

| Métrica | Meta (3 meses pós-lançamento) |
|---------|-------------------------------|
| Cadastros | 1.000 usuários |
| DAU (Daily Active Users) | 15% dos cadastrados |
| Retenção D7 | 40% |
| Retenção D30 | 20% |
| Conversão Free → Pago | 5% |
| NPS | > 40 |
| Churn mensal pagantes | < 8% |

---

## 10. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Custo de IA escalar rápido | Alto | Cache agressivo, rate limiting, modelo mais barato para funções simples |
| Usuários perdem interesse | Alto | Loop de engajamento forte (streaks, ranking, missões diárias) |
| Competidor copiar | Médio | Velocidade de execução, comunidade forte, IA superior |
| Cheating no ranking | Médio | Validação por IA, limites de XP/dia, reports da comunidade |
| Complexidade técnica | Médio | MVP enxuto, iterar rápido, usar Claude para desenvolvimento |

---

## 11. Cronograma Sugerido

| Fase | Duração | Entregável |
|------|---------|------------|
| **Fase 1 — Setup** | 1 semana | Projeto criado, Supabase configurado, repo no GitHub, deploy na Vercel |
| **Fase 2 — Auth + DB** | 1 semana | Cadastro/login funcionando, schema do banco criado |
| **Fase 3 — Core** | 2-3 semanas | Dashboard, CRUD de tarefas, sistema de XP/níveis |
| **Fase 4 — Avatar** | 1 semana | Criação e exibição do avatar |
| **Fase 5 — IA** | 1-2 semanas | Mentor IA gerando missões e feedback |
| **Fase 6 — Gamificação** | 1 semana | Conquistas, streaks, barras de progresso |
| **Fase 7 — Landing Page** | 1 semana | Página de conversão com CTA |
| **Fase 8 — QA + Polish** | 1 semana | Testes, responsividade, bugs, performance |
| **Lançamento MVP** | **~8-10 semanas** | Produto no ar |

---

## 12. Próximos Passos Imediatos

1. **Definir nome oficial** do produto
2. **Criar conta no Supabase** (supabase.com)
3. **Criar conta na Vercel** (vercel.com)
4. **Criar repositório no GitHub**
5. **Iniciar Fase 1** — setup do projeto Next.js com Claude

---

*Documento gerado como parte do processo de engenharia de software. Deve ser revisado e atualizado conforme o produto evolui.*
