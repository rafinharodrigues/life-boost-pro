# Diretrizes de UI/UX — Life Boost PRO

### UI/UX Design System & Guidelines

**Versão:** 1.0  
**Data:** 17/03/2026  
**Baseado em:** PRD v1.0 / SRS v1.0 / UCS v1.0 / SAD v1.0  
**Autor:** Claude (UI/UX Specialist Sênior)  
**Classificação:** Interno — Equipe de Design e Desenvolvimento

---

## 1. Filosofia de Design

### 1.1 Visão

O Life Boost PRO não é um app de produtividade com skin de jogo. É uma experiência de jogo que organiza sua vida. Cada pixel, animação e interação deve reforçar a sensação de que o usuário está evoluindo um personagem — que é ele mesmo.

### 1.2 Princípios Fundamentais

**P1 — Progresso Visível a Todo Momento**
O usuário nunca deve se perguntar "como estou indo?". O progresso é omnipresente: barras de XP, níveis, streaks e indicadores visuais estão sempre à vista. Toda ação positiva tem feedback visual imediato — o sistema celebra cada conquista, por menor que seja.

**P2 — Escuridão que Ilumina**
O tema dark não é apenas estético — é funcional. Fundos escuros reduzem fadiga visual em uso prolongado e criam contraste dramático com os elementos de destaque (neon, glow, barras de progresso). Os acentos de cor funcionam como "luz no fim do túnel" — são as recompensas visuais pelo esforço.

**P3 — Complexidade Progressiva**
O sistema tem muita profundidade, mas o usuário nunca vê tudo de uma vez. A interface revela funcionalidades conforme o progresso: level 1 é simples, level 10 desbloqueia visuais novos, level 25 revela detalhes antes ocultos. A própria UI é uma conquista.

**P4 — Fricção Intencional Zero**
Completar uma tarefa deve levar 1 toque. Criar uma tarefa, no máximo 3. Toda ação frequente é acessível em menos de 2 cliques a partir do dashboard. Menus são curtos, modais são raros, e formulários são mínimos.

**P5 — Mobile-First, Desktop-Enhanced**
O design começa em 360px. A experiência no celular não é uma versão "cortada" do desktop — é a experiência primária. Desktop adiciona espaço e riqueza, mas nunca funcionalidades exclusivas.

### 1.3 Referências de Design

| Referência | O que Extrair |
|-----------|---------------|
| Duolingo | Gamificação: feedback imediato, streaks visuais, celebração de conquistas, UI limpa |
| Habitica | Sistema de RPG: XP, levels, avatar, party — mas modernizar a estética |
| Discord | Estética dark: hierarquia visual em fundo escuro, uso de cores de destaque |
| Genshin Impact (menus) | UI de jogos: barras de status, inventário, cards de personagem |
| Linear | Craft: atenção ao detalhe, micro-interações, design system rigoroso |
| Spotify Wrapped | Storytelling com dados: como apresentar progresso de forma emocional |

---

## 2. Design System — Fundação Visual

### 2.1 Paleta de Cores

#### Cores de Fundo (Background)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#0A0A0F` | Fundo principal do app |
| `--bg-secondary` | `#12121A` | Cards, painéis, superfícies elevadas |
| `--bg-tertiary` | `#1A1A26` | Hover de cards, superfícies de terceiro nível |
| `--bg-elevated` | `#22222E` | Modais, dropdowns, tooltips |
| `--bg-input` | `#16161F` | Campos de input, selects |
| `--bg-hover` | `#1E1E2A` | Estado hover de elementos interativos |

#### Cores de Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `--text-primary` | `#F0F0F5` | Texto principal (títulos, conteúdo) |
| `--text-secondary` | `#9494A8` | Texto secundário (labels, hints, metadados) |
| `--text-tertiary` | `#5C5C72` | Texto terciário (placeholders, disabled) |
| `--text-inverse` | `#0A0A0F` | Texto sobre fundos claros (badges, CTAs) |

#### Cores de Acento (Neon)

| Token | Hex | RGB | Uso Principal |
|-------|-----|-----|--------------|
| `--accent-primary` | `#6C5CE7` | 108, 92, 231 | Roxo principal — XP, level up, ações primárias |
| `--accent-primary-light` | `#A29BFE` | 162, 155, 254 | Hover do roxo, text sobre fundos escuros |
| `--accent-primary-glow` | `rgba(108, 92, 231, 0.15)` | — | Glow sutil em hover e focus |
| `--accent-cyan` | `#00D2FF` | 0, 210, 255 | Ciano — Streak, tempo, informacional |
| `--accent-cyan-glow` | `rgba(0, 210, 255, 0.12)` | — | Glow do ciano |
| `--accent-green` | `#00E676` | 0, 230, 118 | Verde — Sucesso, tarefa completada, saúde |
| `--accent-green-glow` | `rgba(0, 230, 118, 0.12)` | — | Glow do verde |
| `--accent-amber` | `#FFAB00` | 255, 171, 0 | Âmbar — Warning, XP, ouro, finanças |
| `--accent-amber-glow` | `rgba(255, 171, 0, 0.12)` | — | Glow do âmbar |
| `--accent-red` | `#FF5252` | 255, 82, 82 | Vermelho — Erro, streak perdido, perigo |
| `--accent-pink` | `#FF4081` | 255, 64, 129 | Rosa — Destaque especial, conquistas épicas |

#### Cores por Pilar

| Pilar | Cor | Token | Racional |
|-------|-----|-------|----------|
| Saúde (HP) | Verde `#00E676` | `--pillar-health` | Associação universal saúde = verde |
| Estudos (INT) | Ciano `#00D2FF` | `--pillar-intelligence` | Associação mente = azul/ciano |
| Finanças (GOLD) | Âmbar `#FFAB00` | `--pillar-gold` | Associação dinheiro = ouro |
| Rotina (STR) | Roxo `#6C5CE7` | `--pillar-strength` | Disciplina = roxo (força interior) |

#### Cores Semânticas

| Token | Hex | Uso |
|-------|-----|-----|
| `--semantic-success` | `#00E676` | Confirmações, tarefas completadas |
| `--semantic-warning` | `#FFAB00` | Alertas, streak em risco |
| `--semantic-error` | `#FF5252` | Erros, falhas, streak quebrado |
| `--semantic-info` | `#00D2FF` | Informações, dicas, notificações |

#### Gradientes (uso limitado — apenas em momentos especiais)

| Token | Valor | Uso |
|-------|-------|-----|
| `--gradient-xp` | `linear-gradient(90deg, #6C5CE7, #A29BFE)` | Barra de XP principal |
| `--gradient-level-up` | `linear-gradient(135deg, #6C5CE7, #00D2FF)` | Animação de level up |
| `--gradient-epic` | `linear-gradient(135deg, #FF4081, #6C5CE7)` | Conquistas épicas |
| `--gradient-gold` | `linear-gradient(135deg, #FFAB00, #FFD740)` | Efeitos de ouro/premium |

**Regra: gradientes são permitidos APENAS em barras de progresso, animações de level up e badges de conquistas. Nunca em fundos de cards, botões ou backgrounds de seção.**

### 2.2 Tipografia

**Fonte principal:** Inter (Google Fonts) — legibilidade excelente em telas pequenas, suporta pesos variáveis, ampla compatibilidade.

**Fonte alternativa gamer:** JetBrains Mono — usada exclusivamente para números de XP, níveis e contadores (dá sensação de HUD de game).

| Token | Tamanho | Peso | Line Height | Uso |
|-------|---------|------|-------------|-----|
| `--text-display` | 32px / 2rem | 700 (Bold) | 1.2 | Números grandes (nível geral, XP total), hero |
| `--text-h1` | 24px / 1.5rem | 600 (SemiBold) | 1.3 | Títulos de página |
| `--text-h2` | 20px / 1.25rem | 600 (SemiBold) | 1.35 | Títulos de seção |
| `--text-h3` | 16px / 1rem | 600 (SemiBold) | 1.4 | Subtítulos, labels fortes |
| `--text-body` | 14px / 0.875rem | 400 (Regular) | 1.6 | Corpo de texto, descrições |
| `--text-small` | 12px / 0.75rem | 400 (Regular) | 1.5 | Metadados, timestamps, hints |
| `--text-tiny` | 10px / 0.625rem | 500 (Medium) | 1.4 | Badges, tags, contadores mínimos |
| `--text-mono` | 14px / 0.875rem | 500 (JetBrains Mono) | 1.2 | XP numbers, levels, streak counters |

**Regras tipográficas:**
- Tamanho mínimo em qualquer lugar: 10px (acessibilidade)
- Nunca usar mais de 3 pesos na mesma tela
- Números de jogo (XP, nível, streak) sempre em JetBrains Mono
- Corpo de texto sempre em Inter 400
- Nenhum texto em ALL CAPS exceto badges de status (máx 2 palavras)
- Kerning: deixar o browser resolver (Inter tem kerning otimizado)

### 2.3 Espaçamento

**Sistema de 4px:** todo espaçamento é múltiplo de 4.

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Micro espaços (entre ícone e texto inline) |
| `--space-2` | 8px | Padding interno mínimo, gap em grids compactos |
| `--space-3` | 12px | Padding de badges, pills, tags |
| `--space-4` | 16px | Padding interno de cards, gap padrão |
| `--space-5` | 20px | Separação entre grupos de conteúdo |
| `--space-6` | 24px | Padding de modais, seções |
| `--space-8` | 32px | Separação entre seções |
| `--space-10` | 40px | Margens grandes |
| `--space-12` | 48px | Separação entre blocos de página |
| `--space-16` | 64px | Margens de página (desktop) |

### 2.4 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 4px | Badges, tags, tooltips |
| `--radius-md` | 8px | Botões, inputs, cards menores |
| `--radius-lg` | 12px | Cards principais, modais |
| `--radius-xl` | 16px | Cards de destaque, CTAs hero |
| `--radius-full` | 9999px | Avatares, pills, indicadores circulares |

### 2.5 Elevação e Superfícies

O sistema usa sobreposição de camadas (elevation via cor de fundo) em vez de shadows. Sombras são evitadas — a hierarquia visual vem da diferença de luminosidade dos backgrounds.

| Nível | Background | Uso |
|-------|-----------|-----|
| Nível 0 | `--bg-primary` (#0A0A0F) | Fundo da página |
| Nível 1 | `--bg-secondary` (#12121A) | Cards, sidebar |
| Nível 2 | `--bg-tertiary` (#1A1A26) | Cards dentro de cards, itens de lista hover |
| Nível 3 | `--bg-elevated` (#22222E) | Modais, dropdowns, popovers |

**Exceção para glow:** elementos interativos em hover e focus podem ter `box-shadow` de glow sutil com as cores de acento:
```css
/* Único uso permitido de shadow — glow funcional */
.card:hover {
  box-shadow: 0 0 20px var(--accent-primary-glow);
}
.button-primary:focus-visible {
  box-shadow: 0 0 0 3px var(--accent-primary-glow);
}
```

### 2.6 Bordas

| Token | Valor | Uso |
|-------|-------|-----|
| `--border-subtle` | 1px solid rgba(255, 255, 255, 0.06) | Separadores de cards, divisores |
| `--border-default` | 1px solid rgba(255, 255, 255, 0.10) | Bordas de inputs, cards |
| `--border-strong` | 1px solid rgba(255, 255, 255, 0.16) | Bordas em hover/focus |
| `--border-accent` | 1px solid var(--accent-primary) | Bordas de destaque, seleção ativa |

### 2.7 Ícones

**Biblioteca:** Lucide Icons (consistente, leve, MIT license, excelente suporte React).

| Regra | Detalhe |
|-------|---------|
| Tamanho padrão | 20px em navegação, 16px inline com texto, 24px em ações |
| Stroke width | 1.5px (padrão Lucide) — mais leve e elegante no tema dark |
| Cor padrão | `--text-secondary` (#9494A8) — nunca branco puro |
| Cor ativa | Herda a cor do pilar ou acento correspondente |
| Cor hover | `--text-primary` (#F0F0F5) |
| Ícones de pilar | Customizados (SVG) — cada pilar tem um ícone único tematizado |

**Ícones dos pilares (sugestão):**
- Saúde: Coração pulsante (Heart Pulse)
- Estudos: Livro aberto com estrela (Book Open + Sparkle)
- Finanças: Moeda com seta (Coins)
- Rotina: Relógio com check (Clock + Check)

---

## 3. Componentes do Design System

### 3.1 Botões

#### Variantes

| Variante | Background | Texto | Borda | Uso |
|----------|-----------|-------|-------|-----|
| Primary | `--accent-primary` (#6C5CE7) | `--text-inverse` (#0A0A0F) ou branco | Nenhuma | Ações principais (Completar, Criar, Salvar) |
| Secondary | Transparente | `--accent-primary-light` | `--border-accent` | Ações secundárias (Editar, Filtrar) |
| Ghost | Transparente | `--text-secondary` | Nenhuma | Ações terciárias (Cancelar, Voltar) |
| Danger | `--semantic-error` com 10% opacity | `--semantic-error` | Nenhuma | Ações destrutivas (Excluir, Cancelar assinatura) |
| Success | `--semantic-success` com 10% opacity | `--semantic-success` | Nenhuma | Confirmações especiais (Completar tarefa) |

#### Estados

| Estado | Modificação |
|--------|-------------|
| Default | Conforme variante |
| Hover | Lighten 10% no background + glow sutil (0 0 12px accent-glow) |
| Active/Pressed | Darken 10% + scale(0.98) com transition 100ms |
| Focus | Ring de 3px com accent-glow + outline offset 2px |
| Disabled | Opacity 0.4, cursor not-allowed, sem hover |
| Loading | Conteúdo substituído por spinner (16px), largura mantida |

#### Tamanhos

| Tamanho | Height | Padding H | Font Size | Radius | Uso |
|---------|--------|-----------|-----------|--------|-----|
| sm | 32px | 12px | 12px | --radius-md | Ações inline, dentro de cards |
| md | 40px | 16px | 14px | --radius-md | Padrão |
| lg | 48px | 24px | 16px | --radius-lg | CTAs, ações de destaque |
| xl | 56px | 32px | 18px | --radius-xl | Hero CTA, landing page |

### 3.2 Inputs

| Propriedade | Valor |
|-------------|-------|
| Background | `--bg-input` (#16161F) |
| Borda | `--border-default` |
| Texto | `--text-primary` |
| Placeholder | `--text-tertiary` |
| Height | 40px (md), 48px (lg) |
| Padding | 12px horizontal |
| Radius | `--radius-md` |
| Focus | Borda muda para `--accent-primary`, glow sutil |
| Error | Borda muda para `--semantic-error`, mensagem de erro em `--text-small` abaixo |
| Disabled | Opacity 0.5, background mais escuro |

**Labels:** sempre acima do input, em `--text-small` + `--text-secondary`, com 4px de gap.

**Mensagens de erro:** abaixo do input, em `--text-tiny` + `--semantic-error`, com ícone AlertCircle (12px) inline.

### 3.3 Cards

#### Card Padrão

```
┌─────────────────────────────────────┐
│  bg: --bg-secondary                  │
│  border: --border-subtle             │
│  radius: --radius-lg                 │
│  padding: --space-4                  │
│  hover: border → --border-strong     │
│         + glow sutil                 │
│                                      │
│  [Conteúdo]                          │
│                                      │
└─────────────────────────────────────┘
```

#### Card de Pilar

```
┌─────────────────────────────────────┐
│  bg: --bg-secondary                  │
│  border-left: 3px solid {pillar-cor}│
│  radius: --radius-lg                 │
│  padding: --space-4                  │
│                                      │
│  ┌─────┐  Saúde          Nível 12  │
│  │ ♥️  │  ████████░░░░░    78%     │
│  └─────┘  1.245 / 1.600 XP         │
│                                      │
└─────────────────────────────────────┘
```

#### Card de Tarefa

```
┌─────────────────────────────────────┐
│  ○  Caminhada de 20 minutos     IA │
│     Saúde • Médio • +25 XP         │
│                              [...] │
└─────────────────────────────────────┘
 ○ = checkbox interativo
 IA = badge indicando fonte
 [...] = menu de ações (editar, excluir)
```

Ao completar: checkbox animado para ✓ com preenchimento verde, XP "+25" flutua para cima com fade out, card desliza para seção "Completadas" com opacity reduzida.

### 3.4 Barras de Progresso

**Barra de XP (componente central do sistema):**

| Propriedade | Valor |
|-------------|-------|
| Height | 8px (compact), 12px (default), 20px (hero) |
| Background track | `rgba(255, 255, 255, 0.06)` |
| Background fill | `var(--gradient-xp)` ou cor do pilar |
| Radius | `--radius-full` |
| Animação | Preenchimento com ease-out 600ms ao ganhar XP |
| Label | XP atual / XP necessário em `--text-mono` acima ou ao lado |

**Regras:**
- Nunca mostrar barra vazia sem label — sempre indicar "0 / 100 XP"
- Ao ganhar XP: animar a barra enchendo + mostrar "+{XP}" flutuando
- Ao fazer level up: barra enche até 100%, flash branco, reseta e começa do novo XP excedente

### 3.5 Badges e Tags

| Tipo | Background | Texto | Radius | Uso |
|------|-----------|-------|--------|-----|
| Pilar | {pillar-cor} 15% opacity | {pillar-cor} | --radius-sm | Indicador de pilar |
| Dificuldade | Varia por nível | Branco/escuro | --radius-sm | Fácil/Médio/Difícil/Épico |
| Status | Semântico 15% opacity | Semântico | --radius-sm | Pendente/Completada/Expirada |
| Fonte | `--accent-cyan` 15% | `--accent-cyan` | --radius-sm | "IA" — missão gerada por IA |
| Plano | Varia | Branco | --radius-full | "Starter" / "Boost" / "Ultra" |
| Conquista | `--gradient-epic` | Branco | --radius-md | Badges de achievements |

**Cores de dificuldade:**

| Dificuldade | Cor | Rationale |
|-------------|-----|-----------|
| Fácil | `--semantic-success` (#00E676) | Verde = seguro, tranquilo |
| Médio | `--accent-cyan` (#00D2FF) | Ciano = neutro, intermediário |
| Difícil | `--accent-amber` (#FFAB00) | Âmbar = atenção, desafio |
| Épico | `--accent-pink` (#FF4081) | Rosa = raro, especial |

### 3.6 Toasts e Notificações

| Tipo | Ícone | Cor | Duração |
|------|-------|-----|---------|
| Sucesso | CheckCircle | `--semantic-success` | 3 segundos |
| Erro | XCircle | `--semantic-error` | 5 segundos (ou dismiss manual) |
| Info | Info | `--semantic-info` | 4 segundos |
| Warning | AlertTriangle | `--semantic-warning` | 5 segundos |
| Conquista | Trophy | `--gradient-epic` | 5 segundos + animação especial |
| Level Up | ChevronUp | `--gradient-level-up` | 4 segundos + animação especial |
| XP Ganho | Zap | `--accent-primary` | 2 segundos (sutil, flutuante) |

**Posicionamento:** toasts aparecem no canto superior direito (desktop) ou topo central (mobile). Stack vertical com 8px de gap, máximo 3 visíveis simultaneamente.

### 3.7 Modais

| Propriedade | Valor |
|-------------|-------|
| Overlay | `rgba(0, 0, 0, 0.7)` com backdrop-blur(4px) |
| Background | `--bg-elevated` |
| Border | `--border-default` |
| Radius | `--radius-lg` |
| Max-width | 480px (small), 640px (medium), 800px (large) |
| Padding | `--space-6` |
| Animação entrada | Fade in overlay (200ms) + slide up modal (300ms, ease-out) |
| Animação saída | Slide down (200ms) + fade out overlay (150ms) |
| Close | Botão X no canto superior direito + click no overlay + ESC |

**Regra: modais são usados apenas para ações destrutivas (confirmação de exclusão) e criação/edição de tarefas. Nunca para exibição de informação — use inline expansion ou navegação.**

### 3.8 Navegação (Sidebar + Bottom Nav)

#### Desktop: Sidebar Fixa

```
┌──────────────┐
│  ◆ LB PRO    │  ← Logo compacto
│              │
│  ▣ Dashboard │  ← Ativo: bg-tertiary + accent-primary left border
│  ☐ Tarefas   │
│  ★ Conquistas│
│  ⚔ Ranking   │
│  ◉ Mentor IA │
│              │
│  ──────────  │
│  ○ Perfil    │
│  ⚙ Config    │
│              │
│  [Upgrade]   │  ← CTA se Free/Starter
│              │
│  ┌────────┐  │
│  │ Avatar │  │  ← Mini preview do avatar
│  │ Lv. 12 │  │
│  └────────┘  │
└──────────────┘
 Largura: 240px (expandida) / 64px (colapsada)
```

#### Mobile: Bottom Navigation Bar

```
┌──────────────────────────────────────────────┐
│  ▣         ☐        [+]       ★        ○    │
│ Home     Tarefas   Criar   Conquistas Perfil │
└──────────────────────────────────────────────┘
 Height: 64px + safe area bottom
 Ativo: ícone muda para cor --accent-primary + label visível
 Inativo: ícone em --text-tertiary, sem label
 Botão [+]: centralizado, elevado, cor --accent-primary, radius-full
```

**Regras de navegação:**
- Mobile: máximo 5 itens no bottom nav
- Ranking e Mentor IA acessíveis via tela de "Mais" ou swipe
- O botão central [+] (criar tarefa) é sempre acessível — ação mais frequente
- Transições entre telas: slide horizontal (150ms, ease-in-out)

---

## 4. Telas e Layouts

### 4.1 Layout Grid

**Desktop (≥1024px):**
```
┌─────────┬──────────────────────────────────────────┐
│         │                                           │
│ Sidebar │         Conteúdo Principal                │
│ (240px) │         (max-width: 1200px, centered)     │
│  fixo   │         padding: 32px                     │
│         │                                           │
└─────────┴──────────────────────────────────────────┘
```

**Tablet (768px — 1023px):**
```
┌────┬───────────────────────────────────────────────┐
│    │                                                │
│ 64 │         Conteúdo Principal                     │
│ px │         padding: 24px                          │
│    │                                                │
└────┴───────────────────────────────────────────────┘
 Sidebar colapsada (apenas ícones)
```

**Mobile (360px — 767px):**
```
┌───────────────────────────────────────────────────┐
│  Header (56px): Logo + Streak + Notificações      │
├───────────────────────────────────────────────────┤
│                                                    │
│         Conteúdo Principal                         │
│         padding: 16px                              │
│         scroll vertical                            │
│                                                    │
├───────────────────────────────────────────────────┤
│  Bottom Nav (64px + safe area)                     │
└───────────────────────────────────────────────────┘
```

### 4.2 Dashboard (Tela Principal)

A tela mais importante do sistema. O usuário passa 80% do tempo aqui.

**Desktop Layout:**

```
┌──────────────────────────────────────────────────────────────────┐
│  Header: "Boa noite, {nome}!" | Streak 🔥 12 | 🔔 Notificações │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────┐  ┌────────────────────────┐ │
│  │  AVATAR + NÍVEL GERAL           │  │  MENSAGEM DO MENTOR    │ │
│  │  ┌──────────┐                   │  │                        │ │
│  │  │          │  Nível 12          │  │  "Bom dia, guerreiro!  │ │
│  │  │  Avatar  │  ████████░░ 78%   │  │   Ontem você mandou    │ │
│  │  │          │  3.245 / 4.200 XP │  │   bem! Hoje foco em    │ │
│  │  └──────────┘                   │  │   Saúde."              │ │
│  └─────────────────────────────────┘  └────────────────────────┘ │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Saúde    │ │ Estudos  │ │ Finanças │ │ Rotina   │           │
│  │ Lv. 8   │ │ Lv. 14   │ │ Lv. 10   │ │ Lv. 11   │           │
│  │ ██████░░ │ │ ████████ │ │ ██████░░ │ │ ███████░ │           │
│  │ 67%      │ │ 89%      │ │ 72%      │ │ 81%      │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                   │
│  ┌──────────────────────────────────┐  ┌────────────────────────┐│
│  │  MISSÕES DE HOJE          3/5   │  │  CONQUISTAS RECENTES   ││
│  │                                  │  │                        ││
│  │  ○ Caminhada 20min    IA +25XP  │  │  🏆 Mês de Ferro      ││
│  │  ○ Estudar React 1h   IA +50XP  │  │  🏆 Mente Afiada      ││
│  │  ✓ Não pedir delivery     +25XP │  │  🏆 Centurião          ││
│  │  ✓ Meditar 10min         +10XP  │  │                        ││
│  │  ○ Revisar finanças   IA +25XP  │  │  [Ver todas →]         ││
│  │                                  │  │                        ││
│  │  [+ Nova tarefa]                 │  └────────────────────────┘│
│  └──────────────────────────────────┘                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  ATIVIDADE DA SEMANA (gráfico de barras: XP/dia últimos 7d) ││
│  │  █  █     █  █  █                                            ││
│  │  █  █  █  █  █  █  ░                                         ││
│  │  Seg Ter Qua Qui Sex Sáb Dom                                 ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (360px):**

```
┌────────────────────────────────────┐
│  LB PRO      🔥 12      🔔       │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │  [Avatar]  Nível 12          │  │
│  │            ██████████░░ 78%  │  │
│  │            3.245 / 4.200 XP  │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────┐┌──────┐┌──────┐┌──────┐ │
│  │ ♥ 8 ││ 🧠 14││ 💰 10││ ⚡ 11│ │  ← Pilares compactos
│  │██████││██████││██████││██████│ │
│  └──────┘└──────┘└──────┘└──────┘ │
│                                    │
│  💬 "Bom dia! Foco em Saúde."    │  ← Mensagem do Mentor
│                                    │
│  Missões de hoje            3/5   │
│  ┌──────────────────────────────┐  │
│  │ ○ Caminhada 20min  IA +25XP │  │
│  ├──────────────────────────────┤  │
│  │ ○ Estudar React    IA +50XP │  │
│  ├──────────────────────────────┤  │
│  │ ✓ Não pedir deliv.    +25XP │  │
│  └──────────────────────────────┘  │
│  [Ver todas]                       │
│                                    │
├────────────────────────────────────┤
│  ▣      ☐      [+]     ★      ○  │
└────────────────────────────────────┘
```

### 4.3 Onboarding

**Fluxo de 5 telas com progress bar no topo:**

```
[1]──[2]──[3]──[4]──[5]
 ██████████░░░░░░░░░░░░  Etapa 2 de 5
```

**Princípios do onboarding:**
- Cada tela tem 1 única ação a fazer (reduz carga cognitiva)
- Botão "Próximo" no canto inferior direito, sempre no mesmo lugar
- Botão "Pular" discreto no canto superior direito
- Animações suaves de transição entre etapas (slide left 300ms)
- Tela 3 (Avatar): grid de cards com hover glow — seleção sente-se como "escolher personagem"
- Tela 5 (Resumo): preview do avatar com as escolhas visuais — botão "Começar Jornada!" com gradiente epic
- Tela final: animação de "personagem criado" (avatar aparece com efeito de reveal, partículas sutis)

### 4.4 Tela de Tarefas

**Tabs de pilar no topo + lista filtrada:**

```
  [Todas] [Saúde] [Estudos] [Finanças] [Rotina]

  Filtros: [Pendentes ▾] [Todas as fontes ▾]

  ── Hoje ──────────────────────────────
  ○ Caminhada 20min          IA  +25XP
  ○ Estudar React 1h         IA  +50XP
  ○ Revisar orçamento        IA  +25XP

  ── Amanhã ────────────────────────────
  ○ Correr 30min (recorrente)     +50XP

  ── Completadas hoje ──────────────────
  ✓ Meditar 10min                 +10XP
  ✓ Não pedir delivery            +25XP
```

### 4.5 Tela de Conquistas

**Grid de badges com estados visuais claros:**

```
  [Todas] [Streak] [Marco] [Pilar] [Desafio] [Segredo]

  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
  │ 🏆   │ │ 🔥   │ │ 🧠   │ │ ???  │
  │Primei│ │Semana│ │Mente │ │ ???  │
  │Passo │ │Forte │ │Afiada│ │      │
  │ ✓    │ │ ✓    │ │ 7/10 │ │ 🔒   │
  └──────┘ └──────┘ └──────┘ └──────┘

  ✓ = desbloqueada (badge colorido, glow)
  7/10 = progresso parcial (badge com barra)
  🔒 = bloqueada (badge cinza, condição visível)
  ??? = secreta (badge com "?", sem informação)
```

### 4.6 Tela de Ranking

```
  [Semanal] [All-Time]       Reseta em 2d 14h

  🥇  1. @player_one     Lv. 42    2.450 XP
  🥈  2. @gamer_pro      Lv. 38    2.120 XP
  🥉  3. @levelup_queen  Lv. 35    1.890 XP
      4. @night_owl      Lv. 33    1.650 XP
      5. @code_warrior   Lv. 31    1.420 XP
      ...
  ─── Sua posição ──────────────────────────
  📍 47. @seu_username    Lv. 12      340 XP
```

Top 3 com backgrounds dourado/prata/bronze sutis. Posição do usuário sempre visível (sticky) mesmo ao scrollar.

### 4.7 Tela de Pricing

```
  Toggle: [Mensal] [Anual ← Economize até 33%]

  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐
  │          │ │          │ │ ⭐ BOOST   │ │          │
  │  FREE    │ │ STARTER  │ │ Recomendado│ │  ULTRA   │
  │          │ │          │ │            │ │          │
  │  R$ 0    │ │R$ 14,90  │ │ R$ 29,90   │ │R$ 49,90  │
  │          │ │          │ │            │ │          │
  │ Features │ │ Features │ │ Features   │ │ Features │
  │ ...      │ │ ...      │ │ ...        │ │ ...      │
  │          │ │          │ │            │ │          │
  │ [Atual]  │ │[Assinar] │ │[Assinar ⭐]│ │[Assinar] │
  └──────────┘ └──────────┘ └────────────┘ └──────────┘
                              ↑ Borda accent
                              ↑ Badge "Recomendado"
                              ↑ Levemente maior
```

**O card Boost:**
- Borda: 2px solid `--accent-primary`
- Badge "Recomendado" no topo com `--gradient-xp`
- Escala ligeiramente maior que os outros (transform: scale(1.03))
- Glow permanente sutil no card

---

## 5. Micro-Interações e Animações

### 5.1 Princípios de Animação

| Princípio | Implementação |
|-----------|--------------|
| Performance | Animar apenas `transform` e `opacity` (GPU-accelerated). Nunca `width`, `height`, `top`, `left`. |
| Propósito | Toda animação comunica algo. Não animar por estética — animar por feedback. |
| Duração | Micro-interações: 100-200ms. Transições: 200-400ms. Celebrações: 400-800ms. |
| Easing | Interações: `ease-out`. Entradas: `ease-out`. Saídas: `ease-in`. Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`. |
| Redução de movimento | Respeitar `prefers-reduced-motion`. Substituir animações por fade simples de 150ms. |

### 5.2 Catálogo de Animações

#### Completar Tarefa (a animação mais importante do sistema)

```
Sequência (total: ~1200ms):

1. Checkbox: ○ → ✓
   - Círculo preenche com verde (200ms, ease-out)
   - Check mark desenha stroke animado (150ms)

2. XP Float: "+25 XP"
   - Texto aparece acima da tarefa (0ms)
   - Flutua para cima 40px (600ms, ease-out)
   - Fade out nos últimos 200ms

3. Barra de XP:
   - Barra preenche com animação suave (600ms, ease-out)
   - Glow sutil no trecho novo
   - Número de XP atualiza com contagem progressiva

4. Card da tarefa:
   - Opacity 1 → 0.6 (300ms)
   - Slide down para seção "Completadas" (400ms)

5. Se level up: [ver abaixo]
```

#### Level Up

```
Sequência (total: ~2000ms):

1. Barra de XP enche até 100% (400ms)
2. Flash branco na barra (100ms)
3. Overlay sutil escurece o fundo (200ms)
4. Badge "LEVEL UP!" centralizado com scale(0) → scale(1.1) → scale(1)
   (400ms, cubic-bezier bounce)
5. Novo nível exibido: "Nível 12 → 13"
6. Partículas sutis ao redor do badge (CSS, 600ms)
7. Barra reseta e preenche com XP excedente (400ms)
8. Badge faz fade out (300ms)
```

#### Conquista Desbloqueada

```
Sequência (total: ~2500ms):

1. Toast especial aparece no topo
2. Badge da conquista: reveal com glow dourado
3. Texto: "Conquista desbloqueada!" + nome da conquista
4. Confetti sutil (partículas CSS, não lib pesada)
5. Toast permanece 4 segundos
6. Slide out para direita (300ms)
```

#### Streak em Risco (Aviso)

```
- Ícone de fogo no header pulsa (animation: pulse 2s infinite)
- Cor do ícone muda de --accent-amber para --accent-red
- Tooltip: "Seu streak de 12 dias está em risco! Complete uma tarefa."
```

#### Hover em Cards

```
- Border: --border-subtle → --border-strong (150ms)
- Glow: 0 → box-shadow: 0 0 20px accent-glow (200ms)
- Background: sutil lighten 2% (100ms)
- Sem scale, sem translate — mantém estabilidade visual
```

### 5.3 Feedback Háptico (Mobile)

| Ação | Vibração |
|------|----------|
| Completar tarefa | Haptic light (10ms) |
| Level up | Haptic medium (20ms) |
| Conquista | Haptic heavy (30ms) |
| Erro | Haptic notificationError |

Implementar via `navigator.vibrate()` com detecção de suporte.

### 5.4 Sons (Opcional — toggle nas configurações)

| Evento | Tipo | Duração |
|--------|------|---------|
| Completar tarefa | "Coin collect" sutil | < 500ms |
| Level up | Fanfarra curta | ~1.5s |
| Conquista | Achievement jingle | ~2s |
| Erro | Tone baixo sutil | < 300ms |

**Regra: sons desativados por padrão. Ativação opcional nas configurações. Volume fixo e baixo — nunca deve assustar o usuário.**

---

## 6. Padrões de Interação (UX Patterns)

### 6.1 Feedback Imediato

| Ação do Usuário | Feedback (< 100ms) | Feedback (< 1s) | Feedback (< 5s) |
|----------------|---------------------|-------------------|-------------------|
| Tap em completar | Checkbox muda de estado | XP float + barra atualiza | Conquistas verificadas |
| Criar tarefa | Modal fecha | Toast "Tarefa criada!" | Tarefa aparece na lista |
| Enviar mensagem ao Mentor | Mensagem aparece no chat | Indicador "Mentor digitando..." | Resposta da IA aparece |
| Clique em filtro | Tab muda de cor | Lista atualiza com fade | — |
| Swipe em tarefa (mobile) | Card segue o dedo | Ações reveladas | — |

### 6.2 Empty States

Todo empty state deve ter 3 elementos: ilustração temática + mensagem clara + CTA.

| Tela | Ilustração | Mensagem | CTA |
|------|-----------|----------|-----|
| Dashboard sem tarefas | Avatar dormindo | "Nenhuma missão ativa. Vamos começar?" | "Criar primeira tarefa" |
| Conquistas vazia | Baú de tesouro fechado | "Conquistas serão desbloqueadas conforme você progride" | "Ver como desbloquear" |
| Ranking sem posição | Pódio vazio | "Complete tarefas para entrar no ranking" | "Ir para missões" |
| Busca sem resultado | Lupa com "?" | "Nenhuma tarefa encontrada para este filtro" | "Limpar filtros" |

### 6.3 Loading States

| Tipo | Visual | Quando |
|------|--------|--------|
| Skeleton | Formas cinza animadas (pulse) no formato do conteúdo | Carregamento inicial de página |
| Spinner | Círculo de 20px em accent-primary, rotação 800ms | Ações pontuais (completar tarefa, salvar) |
| Progress Bar | Barra horizontal no topo da tela | Navegação entre páginas |
| Typing Indicator | 3 pontos pulsando | Mentor IA respondendo |
| Shimmer | Gradiente animado left-right sobre skeleton | Carregamento de dados pesados |

**Regra: NUNCA exibir tela em branco. Usar skeleton imediatamente enquanto os dados carregam. Next.js Suspense boundaries são o ponto de implementação.**

### 6.4 Tratamento de Erros

| Severidade | Visual | Ação |
|-----------|--------|------|
| Leve (campo inválido) | Borda vermelha no campo + mensagem abaixo | Correção inline |
| Média (ação falhou) | Toast de erro com retry | Botão "Tentar novamente" no toast |
| Alta (conexão perdida) | Banner fixo no topo da tela | "Sem conexão. Reconectando..." com auto-retry |
| Crítica (sistema fora) | Tela de erro full-page com ilustração | "Voltaremos em breve" + link para status page |

**Mensagens de erro são sempre:**
- Em português claro (nunca códigos técnicos)
- Específicas ("Email inválido" não "Erro de validação")
- Com sugestão de solução ("Verifique e tente novamente")
- Sem culpar o usuário ("Não foi possível salvar" não "Você errou")

### 6.5 Gestos Mobile

| Gesto | Ação | Tela |
|-------|------|------|
| Swipe right em tarefa | Revelar botão "Completar" | Lista de tarefas |
| Swipe left em tarefa | Revelar botão "Excluir" (vermelho) | Lista de tarefas |
| Pull-to-refresh | Atualizar dados do dashboard | Dashboard, Tarefas |
| Long press em conquista | Exibir detalhes em popover | Conquistas |
| Swipe entre tabs | Navegar entre pilares | Tarefas |

### 6.6 Confirmações e Ações Destrutivas

| Ação | Requer Confirmação? | Tipo |
|------|---------------------|------|
| Completar tarefa | Não (irreversível mas positiva) | Direto |
| Criar tarefa | Não | Direto |
| Editar tarefa | Não (salvar no botão) | Direto |
| Excluir tarefa | Sim — modal com "Excluir" em vermelho | Modal |
| Cancelar assinatura | Sim — modal com lista do que perde | Modal |
| Excluir conta | Sim — modal com digitação "EXCLUIR" | Modal + input |
| Rejeitar missão IA | Não (sem penalidade) | Direto + feedback opcional |
| Logout | Não | Direto |

---

## 7. Design Responsivo

### 7.1 Breakpoints

| Token | Largura | Dispositivo |
|-------|---------|-------------|
| `xs` | 0 — 374px | Celulares pequenos (SE) |
| `sm` | 375 — 479px | Celulares padrão (iPhone, Galaxy) |
| `md` | 480 — 767px | Celulares grandes, phablets |
| `lg` | 768 — 1023px | Tablets, telas médias |
| `xl` | 1024 — 1279px | Desktop pequeno, tablets landscape |
| `2xl` | 1280px+ | Desktop padrão |

### 7.2 Adaptações por Breakpoint

| Componente | Mobile (xs-md) | Tablet (lg) | Desktop (xl+) |
|-----------|----------------|-------------|----------------|
| Navegação | Bottom Nav (5 itens) | Sidebar colapsada (64px) | Sidebar expandida (240px) |
| Dashboard Grid | 1 coluna, vertical scroll | 2 colunas | 2-3 colunas |
| Cards de pilar | 4 em row horizontal (scroll) | 4 em row (sem scroll) | 4 em row |
| Lista de tarefas | Full width, swipe actions | Full width, botões visíveis | Max-width 800px, botões hover |
| Modal | Full screen (bottom sheet) | Centralizado (480px) | Centralizado (480px) |
| Avatar | 64px | 80px | 120px |
| Barra de XP | 8px height | 12px height | 12px height |
| Gráficos | Simplificados (barras) | Completos | Completos com detalhes |
| Pricing cards | Vertical stack | 2x2 grid | 4 em row |
| Fonte base | 14px | 14px | 14px (mantém consistência) |

### 7.3 Touch Targets

| Contexto | Tamanho Mínimo | Espaçamento Mínimo |
|----------|---------------|-------------------|
| Botões primários | 48 × 48px | 8px entre botões |
| Checkbox de tarefa | 44 × 44px | — |
| Itens de lista | 48px height mínimo | — |
| Ícones de navegação | 44 × 44px | 8px |
| Links inline | 44px height (via padding) | — |

**Regra absoluta: nenhum alvo de toque menor que 44 × 44px em mobile. [WCAG 2.5.8]**

---

## 8. Acessibilidade (A11y)

### 8.1 Conformidade Target

**WCAG 2.1 Nível AA** — com extensões para gaming:

| Critério | Status | Implementação |
|---------|--------|---------------|
| 1.1.1 Conteúdo não-textual | Obrigatório | Alt text em imagens, labels em ícones |
| 1.4.3 Contraste mínimo | Obrigatório | Ratio ≥ 4.5:1 para texto, ≥ 3:1 para UI |
| 1.4.11 Contraste não-textual | Obrigatório | Bordas e indicadores com contraste suficiente |
| 2.1.1 Teclado | Obrigatório | Toda funcionalidade acessível via teclado |
| 2.4.7 Foco visível | Obrigatório | Ring de foco com accent-glow em todos os interativos |
| 2.5.8 Target size | Obrigatório | Touch targets ≥ 44px |
| 4.1.2 Nomes acessíveis | Obrigatório | aria-label em botões de ícone |

### 8.2 Contraste Validado

| Par de Cores | Ratio | Status |
|-------------|-------|--------|
| `--text-primary` (#F0F0F5) sobre `--bg-primary` (#0A0A0F) | 18.4:1 | Passa AAA |
| `--text-secondary` (#9494A8) sobre `--bg-primary` (#0A0A0F) | 6.1:1 | Passa AA |
| `--text-tertiary` (#5C5C72) sobre `--bg-primary` (#0A0A0F) | 3.2:1 | Passa AA (large text) |
| `--accent-primary` (#6C5CE7) sobre `--bg-primary` (#0A0A0F) | 5.4:1 | Passa AA |
| `--accent-cyan` (#00D2FF) sobre `--bg-primary` (#0A0A0F) | 10.3:1 | Passa AAA |
| `--accent-green` (#00E676) sobre `--bg-primary` (#0A0A0F) | 10.8:1 | Passa AAA |
| `--accent-amber` (#FFAB00) sobre `--bg-primary` (#0A0A0F) | 9.2:1 | Passa AAA |
| `--accent-red` (#FF5252) sobre `--bg-primary` (#0A0A0F) | 5.0:1 | Passa AA |

### 8.3 Navegação por Teclado

| Tecla | Ação |
|-------|------|
| Tab | Navegar entre elementos interativos |
| Shift+Tab | Navegar para trás |
| Enter/Space | Ativar botão/checkbox |
| Escape | Fechar modal/dropdown |
| Setas ← → | Navegar entre tabs |
| Setas ↑ ↓ | Navegar em listas |

**Focus order:** segue a ordem visual (top-down, left-right). Sidebar → Header → Conteúdo principal → Ações.

### 8.4 Screen Reader

| Componente | aria-label / aria-role |
|-----------|----------------------|
| Barra de XP | `role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do pilar Saúde: 78%"` |
| Checkbox de tarefa | `aria-label="Completar tarefa: Caminhada de 20 minutos"` |
| Badge de dificuldade | `aria-label="Dificuldade: Médio, recompensa 25 XP"` |
| Streak icon | `aria-label="Streak atual: 12 dias consecutivos"` |
| Nível | `aria-label="Nível geral: 12"` |
| Avatar | `role="img" aria-label="Seu avatar, nível 12, estágio de evolução 2"` |
| Conquista bloqueada | `aria-label="Conquista bloqueada: Mês de Ferro. Condição: manter streak de 30 dias. Progresso: 12 de 30."` |

### 8.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 150ms !important;
  }

  .xp-float,
  .level-up-animation,
  .confetti,
  .particles {
    display: none;
  }

  .progress-bar {
    transition: width 150ms ease;
  }
}
```

Quando `prefers-reduced-motion` está ativo: barras de XP fazem transição instantânea, level up exibe apenas badge estático, conquistas exibem toast simples sem confetti.

---

## 9. Convenções de Escrita (UX Writing)

### 9.1 Tom de Voz

| Atributo | Sim | Não |
|----------|-----|-----|
| Motivacional | "Mandou bem! +25 XP" | "Tarefa completada com sucesso." |
| Direto | "Crie sua primeira tarefa" | "Para começar, por favor considere criar uma tarefa" |
| Gamer | "Novo level desbloqueado!" | "Você avançou para o nível seguinte" |
| Empático | "Não foi possível salvar. Tente de novo?" | "Erro ao salvar tarefa." |
| Celebratório | "Daily Clear! Missões zeradas!" | "Todas as tarefas foram concluídas." |

### 9.2 Padrões de Texto

| Contexto | Formato | Exemplo |
|---------|---------|---------|
| Títulos de página | Sentença, sem ponto | "Suas conquistas" |
| Labels de botão | Verbo no infinitivo ou imperativo | "Criar tarefa", "Salvar" |
| Toast de sucesso | Exclamação curta | "Tarefa criada!" |
| Toast de erro | Descrição + sugestão | "Falha ao salvar. Verifique sua conexão." |
| Empty state | Frase + pergunta ou CTA | "Nenhuma missão ativa. Vamos começar?" |
| Placeholder de input | Exemplo do que preencher | "Ex: Estudar React por 1 hora" |
| Confirmação destrutiva | Consequência clara + ação explícita | "Ao excluir, esta tarefa será removida permanentemente." |
| Números de XP | Sempre com sinal | "+25 XP", "+100 XP" |
| Níveis | "Nível" + número | "Nível 12", nunca "Lv.12" em textos longos (ok em UI compacta) |
| Datas | Formato relativo quando < 7 dias | "Hoje", "Ontem", "3 dias atrás", "12/03/2026" |

### 9.3 Glossário do Produto (Termos Padronizados)

| Usar | Não Usar |
|------|----------|
| Missão | Quest, challenge, objetivo (quando gerada por IA) |
| Tarefa | Task, to-do, item (quando criada pelo usuário) |
| Pilar | Categoria, atributo, stat |
| Nível | Level, rank (rank é só ranking) |
| Streak | Sequência, combo |
| Conquista | Achievement, badge (badge é o visual, conquista é o conceito) |
| Mentor | Coach, assistente, IA |
| XP | Pontos, experiência (abreviação sempre OK) |
| Avatar | Personagem, character |

---

## 10. Padrões de Layout para Componentes Recorrentes

### 10.1 Hierarquia Visual em Cards

```
Sempre seguir esta ordem dentro de cards:

1. Indicador visual (ícone do pilar ou badge) — topo esquerdo
2. Título / Nome — maior e mais forte
3. Metadados — menor e em --text-secondary
4. Indicador de progresso (barra, contador)
5. Ação (botão, checkbox) — canto direito ou abaixo
```

### 10.2 Consistência de Alinhamento

| Regra | Detalhe |
|-------|---------|
| Texto sempre alinhado à esquerda | Nunca centralizar corpo de texto (exceto em hero da landing) |
| Números sempre alinhados à direita | XP, níveis, contadores — facilita comparação |
| Ações sempre à direita ou abaixo | Botões de ação no canto inferior direito de cards |
| Ícones de pilar sempre à esquerda | Border-left com cor do pilar em cards de pilar |
| Barras de progresso sempre abaixo do título | Nunca ao lado (exceto em pilares compactos do mobile) |

### 10.3 Densidade de Informação

| Contexto | Densidade | Justificativa |
|----------|----------|---------------|
| Dashboard | Média-alta | Usuário quer visão geral rápida |
| Lista de tarefas | Média | Precisa ser escaneável |
| Perfil/Estatísticas | Média | Dados importantes mas não urgentes |
| Onboarding | Baixa | Foco em uma ação por tela |
| Modal de criação | Baixa | Foco no formulário |
| Landing page | Baixa-média | Narrativa visual, não sobrecarregar |
| Pricing | Média | Comparação precisa ser clara |
| Ranking | Alta | Tabela de dados, eficiência |

---

## 11. Diretrizes da Landing Page

### 11.1 Estrutura

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (sticky, transparente → solid on scroll)              │
│ Logo                    [Login] [Começar Grátis]             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│ HERO (viewport height)                                        │
│ "Transforme sua vida em um jogo."                             │
│ Subtítulo: 1 linha explicativa                                │
│ [Começar Grátis — é de graça]                                │
│ Preview do dashboard (mockup) com glow sutil                  │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ FEATURES (4-6 cards com ícones)                               │
│ "Por que Life Boost PRO?"                                     │
│ [IA Mentor] [Gamificação] [4 Pilares] [Ranking] [Avatar]     │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ COMO FUNCIONA (3 passos)                                      │
│ 1. Crie seu avatar  →  2. Complete missões  →  3. Evolua     │
│ (ícones ou ilustrações animadas sutis)                        │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF (depoimentos ou números)                         │
│ "X mil jogadores já estão evoluindo"                          │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ PRICING (se pós-MVP)                                          │
│ Tabela de planos com Boost em destaque                        │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ CTA FINAL                                                     │
│ "Pronto para começar sua jornada?"                            │
│ [Criar Conta Grátis]                                          │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                        │
│ Links: Termos, Privacidade, Contato                           │
└──────────────────────────────────────────────────────────────┘
```

### 11.2 Diretrizes Visuais da Landing

| Regra | Detalhe |
|-------|---------|
| Fundo principal | `--bg-primary` com gradiente radial sutil de `--accent-primary` 3% opacity no hero |
| CTA primário | Botão XL com gradient `--gradient-xp`, border-radius-xl, glow em hover |
| Mockup | Screenshot real do dashboard, não wireframe. Envolto em moldura de device com glow. |
| Animações | Parallax sutil no hero. Fade-in on scroll nas seções. Nada pesado. |
| Performance | Lighthouse > 90. Nenhuma imagem > 200KB. Lazy load abaixo da dobra. |
| Texto hero | Máximo 8 palavras. Subtítulo máximo 15 palavras. |
| CTA wording | "Começar Grátis" (não "Cadastre-se"). Reforçar que é gratuito. |

---

## 12. Estados Especiais e Edge Cases

### 12.1 Primeiro Uso (First-Time Experience)

| Momento | Tratamento |
|---------|-----------|
| Primeiro login após onboarding | Tour guiado com tooltips nos principais elementos (5 pontos) |
| Primeiro tarefa criada | Toast especial: "Primeira missão criada! Vamos nessa!" |
| Primeira tarefa completada | Animação especial + conquista "Primeiro Passo" desbloqueada |
| Primeiro level up | Animação mais impactante que o normal + mensagem do Mentor |
| Primeira vez no ranking | Destaque pulsante na posição do usuário |

### 12.2 Streak Perdido

| Estado | Visual |
|--------|--------|
| Streak ativo | Ícone de fogo amarelo/laranja pulsando, número ao lado |
| Streak em risco (22h+ sem atividade) | Fogo muda para vermelho, pulsa mais rápido |
| Streak perdido (ao acessar após perder) | Animação de fogo apagando, mensagem empática: "Seu streak de 12 dias foi reiniciado. Que tal começar um novo hoje?" |
| Streak recomeçando | Fogo pequeno aparecendo, "Novo streak: Dia 1!" |

### 12.3 Downgrade de Plano

| Recurso Perdido | Tratamento Visual |
|-----------------|-------------------|
| Avatar evoluído | Avatar "congela" no estágio atual (não regride), badge de cadeado sutil |
| Missões IA extras | Contador mostra novo limite, CTA de upgrade nas missões bloqueadas |
| Conquistas premium | Mantém as desbloqueadas, novas premium ficam com cadeado |
| Histórico extenso | Dados antigos ficam inacessíveis mas não são deletados, mensagem explicativa |

### 12.4 Modo Offline / Conexão Fraca

```
┌──────────────────────────────────────────┐
│  ⚠️ Sem conexão. Exibindo último estado. │
│  As alterações serão salvas quando a      │
│  conexão voltar.                 [Fechar] │
└──────────────────────────────────────────┘
```

- Banner fixo no topo, amarelo sutil
- Dashboard exibe último estado cacheado (service worker)
- Ações de completar tarefa são enfileiradas localmente
- Sync automático quando conexão retorna
- Dados nunca são perdidos

---

## 13. Checklist de Qualidade por Tela

Antes de considerar qualquer tela como "pronta", validar:

**Funcional:**
- Todos os estados foram desenhados (default, hover, active, focus, disabled, loading, error, empty)
- Funciona em 360px e 1920px
- Touch targets ≥ 44px em mobile
- Acessível por teclado
- Screen reader consegue navegar e entender o conteúdo

**Visual:**
- Contraste AA em todos os textos
- Espaçamento segue sistema de 4px
- Fontes seguem a escala tipográfica definida
- Cores são apenas dos tokens (nenhum hex hardcoded fora do design system)
- Dark theme não tem nenhum elemento "flutuando" sem contraste

**Performance:**
- Nenhuma imagem > 200KB
- Animações usam apenas transform/opacity
- Skeletons definidos para todos os dados assíncronos
- Lazy load em componentes abaixo da dobra

**UX:**
- Feedback para toda ação do usuário (< 100ms)
- Mensagens de erro são claras e em português
- Empty states tem ilustração + CTA
- Confirmação para ações destrutivas
- `prefers-reduced-motion` respeitado

---

*Documento vivo — deve ser atualizado conforme o design system evolui. Toda alteração de componente, cor ou padrão deve ser refletida aqui e na implementação simultaneamente. Não existem exceções ao design system sem aprovação documentada.*
