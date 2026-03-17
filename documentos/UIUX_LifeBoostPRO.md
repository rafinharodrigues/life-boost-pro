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

A tela mais importante do sistema. O usuário passa 80% do tempo aqui. O dashboard foi projetado como um **painel de comando de RPG**: tudo que o jogador precisa saber sobre seu personagem, missões e progresso está acessível sem navegação. A disposição em colunas no desktop permite uma experiência densa em informação sem sobrecarga, enquanto o mobile prioriza o fluxo vertical com as informações mais acionáveis no topo.

**Benchmark competitivo aplicado:**
- **Duolingo:** Briefing diário motivacional + streak como elemento emocional central
- **Habitica:** Cards de pilar com stats de RPG + avatar sempre visível
- **GitHub:** Heatmap de atividade para visualização de consistência a longo prazo
- **Notion:** Densidade de informação organizada em blocos modulares
- **Spotify Wrapped:** Radar chart para autoconhecimento visual

---

#### 4.2.1 Desktop Layout (lg+ breakpoint, 1024px+)

**Grid:** 3 colunas via CSS Grid — `grid-template-columns: 2fr 1fr` (coluna principal ocupa 2/3, sidebar 1/3).

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Header: "Boa noite, {nome}!" | Streak 🔥 12 | 🔔 3 | [Avatar mini]              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─ COLUNA PRINCIPAL (lg:col-span-2) ──────────────────┐  ┌─ SIDEBAR (lg:col-1) ─┐ │
│  │                                                      │  │                       │ │
│  │  ┌──────────────────────────────────────────────────┐│  │  ┌───────────────────┐│ │
│  │  │ 🤖 BRIEFING DIÁRIO IA                    [IA] ││  │  │  AVATAR + NÍVEL   ││ │
│  │  │ ╔══════════════════════════════════════════════╗ ││  │  │  ┌─────────────┐  ││ │
│  │  │ ║                                              ║ ││  │  │  │             │  ││ │
│  │  │ ║  "Bom dia, guerreiro! Ontem você completou   ║ ││  │  │  │   Avatar    │  ││ │
│  │  │ ║   89% das missões — parabéns! Seu pilar de   ║ ││  │  │  │   (128px)   │  ││ │
│  │  │ ║   Saúde subiu, mas Finanças precisa de amor."║ ││  │  │  │             │  ││ │
│  │  │ ║                                              ║ ││  │  │  └─────────────┘  ││ │
│  │  │ ║  💪 "Disciplina é liberdade."                ║ ││  │  │  @guerreiro_42    ││ │
│  │  │ ║                                              ║ ││  │  │  Nível 12         ││ │
│  │  │ ║  ⚠️ Alertas:                                ║ ││  │  │  ████████░░░ 78%  ││ │
│  │  │ ║  · Streak de 12 dias em risco (falta 1h!)   ║ ││  │  │  3.245 / 4.200 XP ││ │
│  │  │ ║  · Pilar Finanças abaixo da média (Lv.6)    ║ ││  │  │  [PRO] badge      ││ │
│  │  │ ║  · Prazo: "Prova React" em 2 dias           ║ ││  │  └───────────────────┘│ │
│  │  │ ║                                              ║ ││  │                       │ │
│  │  │ ║  🎯 Top 3 Prioridades:                      ║ ││  │  ┌───────────────────┐│ │
│  │  │ ║  1. Correr 30min (Saúde +50XP)              ║ ││  │  │  🔥 STREAK        ││ │
│  │  │ ║  2. Estudar React 1h (Estudos +50XP)        ║ ││  │  │                   ││ │
│  │  │ ║  3. Revisar orçamento (Finanças +25XP)      ║ ││  │  │     12            ││ │
│  │  │ ║                                              ║ ││  │  │   dias            ││ │
│  │  │ ║  📈 Previsão: Nível 15 em ~12 dias          ║ ││  │  │  (display font    ││ │
│  │  │ ╚══════════════════════════════════════════════╝ ││  │  │   72px, neon glow)││ │
│  │  │ ← gradient border: accent-primary → accent-cyan  ││  │  │                   ││ │
│  │  └──────────────────────────────────────────────────┘│  │  │  Maior: 34 dias   ││ │
│  │                                                      │  │  │  Multi: 1.25x XP  ││ │
│  │  ┌──────────────────────────────────────────────────┐│  │  └───────────────────┘│ │
│  │  │  GRÁFICO RADAR — EQUILÍBRIO DOS PILARES         ││  │                       │ │
│  │  │                                                  ││  │  ┌───────────────────┐│ │
│  │  │              Saúde (8)                           ││  │  │  ⚡ XP HOJE       ││ │
│  │  │                 ╱╲                               ││  │  │                   ││ │
│  │  │                ╱  ╲                              ││  │  │    +185           ││ │
│  │  │               ╱ ·· ╲                             ││  │  │   XP ganho        ││ │
│  │  │  Rotina (7) ╱ ·    · ╲  Estudos (9)             ││  │  │  (display font    ││ │
│  │  │            ╲ ·      · ╱                          ││  │  │   48px, verde)    ││ │
│  │  │             ╲ ·    · ╱                           ││  │  │                   ││ │
│  │  │              ╲ ·· ╱                              ││  │  │  +12% vs média    ││ │
│  │  │               ╲  ╱                               ││  │  │  ↑ (seta verde)   ││ │
│  │  │                ╲╱                                ││  │  └───────────────────┘│ │
│  │  │            Finanças (6)                          ││  │                       │ │
│  │  │                                                  ││  │  ┌───────────────────┐│ │
│  │  │  Polígono preenchido com gradient sutil          ││  │  │ 🏆 CONQUISTAS     ││ │
│  │  │  Valores 0-10 baseados no nível relativo         ││  │  │    PRÓXIMAS       ││ │
│  │  │  Hover: mostra valor numérico por eixo           ││  │  │                   ││ │
│  │  └──────────────────────────────────────────────────┘│  │  │ Maratonista       ││ │
│  │                                                      │  │  │ ██████████░░ 80%  ││ │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐│  │ faltam 2 dias     ││ │
│  │  │ ♥ Saúde    │ │ 🧠 Estudos │ │ 💰 Finanças│ │ ⚡ Rotina  ││  │                   ││ │
│  │  │            │ │            │ │            │ │            ││  │ Mente Suprema     ││ │
│  │  │  Lv. 8     │ │  Lv. 14    │ │  Lv. 6     │ │  Lv. 11    ││  │ ██████░░░░░░ 50%  ││ │
│  │  │ ██████░░░░ │ │ █████████░ │ │ ████░░░░░░ │ │ ████████░░ ││  │ faltam 5 tarefas  ││ │
│  │  │  67%       │ │  89%       │ │  45%       │ │  81%       ││  │                   ││ │
│  │  │ +2 hoje    │ │ +3 hoje    │ │ +0 hoje    │ │ +1 hoje    ││  │ Centurião         ││ │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘│  │ ████████████░ 92%  ││ │
│  │  ← Grid 2x2 (sm) ou 4x1 (lg). Cada card:                  │  │ faltam 8 XP       ││ │
│  │    ícone pilar, nível, barra XP gradiente na cor do pilar,  │  │                   ││ │
│  │    porcentagem, contagem de tarefas feitas hoje.             │  │ [Ver todas →]     ││ │
│  │                                                              │  └───────────────────┘│ │
│  │  ┌──────────────────────────────────────────────────┐│  │                       │ │
│  │  │  MISSÕES DE HOJE                          3/5   ││  │  ┌───────────────────┐│ │
│  │  │                                                  ││  │  │ 📊 RANKING        ││ │
│  │  │  ○ Correr 30min             ♥ Saúde    +50XP   ││  │  │                   ││ │
│  │  │  ○ Estudar React 1h         🧠 Estudos  +50XP  ││  │  │    #47            ││ │
│  │  │  ○ Revisar orçamento        💰 Finanças +25XP  ││  │  │  (display font)   ││ │
│  │  │  ✓ Não pedir delivery       💰 Finanças +25XP  ││  │  │  ↑3 vs ontem      ││ │
│  │  │  ✓ Meditar 10min            ♥ Saúde    +10XP   ││  │  │  (seta verde)     ││ │
│  │  │                                                  ││  │  │                   ││ │
│  │  │  [+ Nova tarefa]                [Ver todas →]   ││  │  │  [Ver ranking →]  ││ │
│  │  └──────────────────────────────────────────────────┘│  │  └───────────────────┘│ │
│  │                                                      │  │                       │ │
│  │  ┌──────────────────────────────────────────────────┐│  │  ┌───────────────────┐│ │
│  │  │  HEATMAP DE ATIVIDADE (últimos 90 dias)          ││  │  │ 🧙 MENTOR         ││ │
│  │  │                                                  ││  │  │                   ││ │
│  │  │  Jan         Fev         Mar                     ││  │  │ "Hoje foque em    ││ │
│  │  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ││  │  │  Finanças — seu   ││ │
│  │  │  ░░▓▓░░░░▓▓▓▓░░▓▓▓▓▓▓▓▓████▓▓▓▓████████████  ││  │  │  pilar mais fra..."││ │
│  │  │  ░░▓▓░░░░▓▓▓▓▓▓▓▓████▓▓████████████████▓▓▓▓  ││  │  │                   ││ │
│  │  │  ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓████████████▓▓▓▓████  ││  │  │ [Falar com        ││ │
│  │  │  ░░░░░░░░░░░░░░▓▓▓▓▓▓████████████████▓▓████  ││  │  │  Mentor →]        ││ │
│  │  │  ░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓████▓▓████▓▓████████  ││  │  └───────────────────┘│ │
│  │  │  ░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓████████████████  ││  │                       │ │
│  │  │                                                  ││  │  ┌───────────────────┐│ │
│  │  │  ░ = sem atividade  ▓ = atividade leve           ││  │  │ ATIVIDADE SEMANAL ││ │
│  │  │  █ = atividade alta                              ││  │  │ (bar chart)       ││ │
│  │  │  Hover: "12 Mar: 145 XP, 5 tarefas concluídas"  ││  │  │                   ││ │
│  │  │  Estilo GitHub contributions. Cor base: accent-  ││  │  │  █              ││ │
│  │  │  primary com 4 níveis de intensidade.            ││  │  │  █  █     █     ││ │
│  │  └──────────────────────────────────────────────────┘│  │  │  █  █  █  █  █  ││ │
│  │                                                      │  │  │  █  █  █  █  █  ░││ │
│  └──────────────────────────────────────────────────────┘  │  │  S  T  Q  Q  S  S D││ │
│                                                             │  │                   ││ │
│                                                             │  │  Média: 165 XP/d  ││ │
│                                                             │  └───────────────────┘│ │
│                                                             │                       │ │
│                                                             └───────────────────────┘ │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

**Detalhamento dos widgets:**

| Widget | Tamanho | Dados | Interação |
|--------|---------|-------|-----------|
| Briefing Diário IA | Full-width coluna principal | Gerado pela IA: saudação + análise do dia anterior, frase motivacional, 3 alertas (streak risco, pilar fraco, prazo), top 3 prioridades, previsão de level up | Badge "IA" canto superior direito. Refresh manual com ícone. Gradient border animado (accent-primary → accent-cyan, 4s loop). |
| Gráfico Radar | Full-width coluna principal | Spider chart dos 4 pilares (valores 0-10 baseados no nível relativo de cada pilar). Polígono preenchido com gradient sutil. | Hover em cada eixo revela valor numérico + tooltip. Animação de "desenho" ao carregar (1s ease-out). |
| 4 Pillar Cards | Grid 2x2 (sm) ou 4x1 (lg) | Ícone do pilar, nome, nível, barra XP com gradient na cor do pilar, porcentagem, contagem de tarefas do dia | Click navega para detalhe do pilar. Hover: glow na cor do pilar. Barra anima ao carregar. |
| Missões de Hoje | Full-width coluna principal | Lista de tarefas pendentes/completadas com pilar badge, XP, contagem "3/5 completas" | Click no círculo completa tarefa (animação check + XP toast). "[+ Nova tarefa]" abre modal rápido. |
| Heatmap Atividade | Full-width coluna principal | Grid estilo GitHub — últimos 90 dias. Cor = intensidade de atividade (4 níveis). | Hover mostra tooltip: "12 Mar: 145 XP, 5 tarefas". Scroll horizontal em telas menores. |
| Avatar + Nível | Sidebar topo | Avatar renderizado, username, nível geral, barra XP, plano badge (FREE/PRO/ULTRA) | Click no avatar abre perfil. Barra XP anima ao ganhar XP. |
| Streak | Sidebar | Ícone fogo, número do streak em display font (72px), recorde pessoal, multiplicador XP atual | Animação de chama se streak > 7. Glow intensifica com streak alto. Tooltip explica multiplicador. |
| XP Hoje | Sidebar | XP ganho hoje em display font (48px, verde), comparativo percentual vs média dos últimos 7 dias | Seta verde (acima da média) ou vermelha (abaixo). Atualiza em tempo real ao completar tarefa. |
| Conquistas Próximas | Sidebar | 2-3 conquistas mais próximas de desbloquear. Cada uma com: nome, progress bar, "faltam X" | Click navega para tela de conquistas. Progress bar usa cor da conquista. |
| Ranking Posição | Sidebar | Posição atual ("#47"), variação vs ontem com seta e número | Click navega para ranking completo. Verde = subiu, vermelho = desceu. |
| Mentor Quick Access | Sidebar | Ícone do Mentor, última mensagem truncada (2 linhas), botão CTA | "[Falar com Mentor →]" abre chat. Mensagem atualiza diariamente. |
| Atividade Semanal | Sidebar | Bar chart vertical dos últimos 7 dias (XP/dia). Média exibida abaixo. | Hover em cada barra mostra XP exato daquele dia. Barras usam accent-primary. |

---

#### 4.2.2 Mobile Layout (360px)

Stack vertical otimizado para thumb zone. Informações mais acionáveis (briefing, missões) priorizadas. Cards secundários colapsáveis.

```
┌────────────────────────────────────┐
│  LB PRO      🔥 12      🔔 3     │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🤖 BRIEFING IA (compacto)   │  │
│  │                              │  │
│  │ "Bom dia, guerreiro! Ontem   │  │  ← Versão resumida:
│  │  89% das missões. Hoje foque │  │     saudação + 1 insight
│  │  em Finanças."               │  │     + frase motivacional
│  │                              │  │
│  │  💪 "Disciplina é liberdade" │  │
│  │                              │  │
│  │  ⚠ Streak em risco (1h!)    │  │  ← Só o alerta mais
│  │                              │  │     urgente
│  │  [Ver briefing completo ↓]   │  │  ← Expande para versão
│  └──────────────────────────────┘  │     completa
│                                    │
│  ┌──────────────────────────────┐  │
│  │  ┌────┐  Nível 12            │  │
│  │  │Avat│  ████████░░░ 78%     │  │
│  │  │ ar │  3.245 / 4.200 XP    │  │
│  │  └────┘  @guerreiro_42 [PRO] │  │
│  └──────────────────────────────┘  │
│                                    │
│  ← scroll horizontal dos pilares → │
│  ┌───────┐┌───────┐┌───────┐┌───────┐
│  │ ♥     ││ 🧠    ││ 💰    ││ ⚡    │
│  │Saúde  ││Estudos││Finanç.││Rotina │
│  │ Lv.8  ││ Lv.14 ││ Lv.6  ││ Lv.11 │
│  │██████ ││██████ ││██████ ││██████ │
│  │ 67%   ││ 89%   ││ 45%   ││ 81%   │
│  └───────┘└───────┘└───────┘└───────┘
│                                    │
│  ┌──────────────┐┌──────────────┐  │
│  │ 🔥 Streak    ││ ⚡ XP Hoje   │  │  ← Side by side
│  │              ││              │  │     (50/50)
│  │    12        ││   +185       │  │
│  │   dias       ││    XP        │  │
│  │ Multi: 1.25x ││ +12% vs méd  │  │
│  └──────────────┘└──────────────┘  │
│                                    │
│  Missões de hoje             3/5  │
│  ┌──────────────────────────────┐  │
│  │ ○ Correr 30min    ♥  +50XP  │  │
│  ├──────────────────────────────┤  │
│  │ ○ Estudar React   🧠 +50XP  │  │
│  ├──────────────────────────────┤  │
│  │ ○ Revisar orçam.  💰 +25XP  │  │
│  ├──────────────────────────────┤  │
│  │ ✓ Não pedir deliv 💰 +25XP  │  │
│  ├──────────────────────────────┤  │
│  │ ✓ Meditar 10min   ♥  +10XP  │  │
│  └──────────────────────────────┘  │
│  [+ Nova tarefa]    [Ver todas →] │
│                                    │
│  Conquistas próximas              │
│  ┌──────────────────────────────┐  │
│  │ 🏆 Maratonista  ████████░ 80%│  │
│  │ 🏆 Centurião    ██████████░92%│  │
│  └──────────────────────────────┘  │
│  [Ver todas →]                    │
│                                    │
│  Heatmap (últimos 90 dias)        │
│  ← scroll horizontal →            │
│  ┌──────────────────────────────┐  │
│  │ ░░▓▓░░▓▓▓▓▓▓████▓▓████████ │  │
│  │ ░░▓▓░░▓▓▓▓████████████▓▓▓▓ │  │
│  │ ░░░░░░▓▓▓▓▓▓████████████▓▓ │  │
│  │ ░░░░░░░░▓▓▓▓▓▓████████████ │  │
│  │ ░░░░░░░░▓▓▓▓████▓▓████████ │  │
│  │ ░░░░░░░░░░▓▓▓▓▓▓████████▓▓ │  │
│  │ ░░░░░░░░░░░░▓▓████████████ │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  ▣      ☐      [+]     ★      ○  │
└────────────────────────────────────┘
```

**Adaptações mobile-specific do dashboard:**

| Elemento | Desktop | Mobile |
|----------|---------|--------|
| Briefing IA | Versão completa com 3 alertas, 3 prioridades, previsão | Versão compacta: 1 insight + 1 alerta urgente + expandir |
| Layout | 2 colunas (main + sidebar) | Stack vertical único |
| Pillar Cards | Grid 2x2 ou 4x1 | Scroll horizontal (snap scroll) |
| Streak + XP Hoje | Cards separados na sidebar | Side by side (50/50 width) |
| Heatmap | 90 dias visíveis inteiros | Scroll horizontal com snap |
| Radar Chart | Visível no main feed | Acessível via "Ver briefing completo" |
| Ranking / Mentor | Cards dedicados na sidebar | Acessíveis via bottom nav ou briefing |
| Atividade Semanal | Bar chart na sidebar | Omitido no mobile (dados no heatmap) |

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

#### 4.4.1 Funcionalidades Avançadas da Tela de Tarefas

**Task Stats Bar (topo da página, abaixo das tabs):**

Barra fixa com métricas rápidas que contextualizam o estado geral das tarefas. Background `--bg-tertiary`, padding 12px, border-radius-md.

```
┌──────────────────────────────────────────────────────────────────┐
│  12 pendentes  |  45 completadas  |  3 expiradas  |  Taxa: 87%  │
│  (amarelo)        (verde)            (vermelho)      (verde)     │
└──────────────────────────────────────────────────────────────────┘
```

**Quick Add (input inline no topo da lista):**

Campo de input sempre visível para criação rápida de tarefas. Auto-detecta pilar baseado em palavras-chave (ex: "correr" → Saúde, "estudar" → Estudos, "pagar" → Finanças).

```
┌──────────────────────────────────────────────────────────────────┐
│  ＋ Adicionar tarefa rápida...          [♥] [🧠] [💰] [⚡]      │
│                                         ← auto-suggest pilar    │
│  Ao digitar "correr 30min":                                      │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │ correr 30min                         [♥ Saúde] ← auto  [↵] ││
│  └──────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

**View Toggle (3 modos de visualização):**

Toggle de 3 botões no canto superior direito da tela, ao lado dos filtros.

```
  Filtros: [Pendentes ▾] [Todas as fontes ▾]     [ ≡ Lista | ▦ Kanban | 📅 Calendário ]
```

**Kanban View:**

Quando o toggle "▦ Kanban" está ativo, as tarefas são exibidas em colunas arrastáveis (drag & drop entre colunas).

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Todas] [Saúde] [Estudos] [Finanças] [Rotina]                              │
│  12 pendentes | 45 completadas | 3 expiradas | Taxa: 87%                     │
│  ＋ Adicionar tarefa rápida...                    [ ≡ | [▦] | 📅 ]           │
│                                                                               │
│  ┌─ PENDENTE (5) ────────┐  ┌─ EM PROGRESSO (2)──┐  ┌─ COMPLETA (3) ───────┐│
│  │                        │  │                     │  │                       ││
│  │  ┌──────────────────┐  │  │  ┌───────────────┐  │  │  ┌─────────────────┐ ││
│  │  │ ⠿ Correr 30min   │  │  │  │ ⠿ Leitura     │  │  │  │ ✓ Meditar 10min │ ││
│  │  │   ♥ Saúde  +50XP │  │  │  │   🧠 Estudos  │  │  │  │   ♥ Saúde +10XP │ ││
│  │  │   Hoje            │  │  │  │   +30XP       │  │  │  │   Hoje 09:15    │ ││
│  │  └──────────────────┘  │  │  └───────────────┘  │  │  └─────────────────┘ ││
│  │                        │  │                     │  │                       ││
│  │  ┌──────────────────┐  │  │  ┌───────────────┐  │  │  ┌─────────────────┐ ││
│  │  │ ⠿ Estudar React  │  │  │  │ ⠿ Orçamento   │  │  │  │ ✓ Delivery ✕   │ ││
│  │  │   🧠 Estudos     │  │  │  │   💰 Finanças │  │  │  │   💰 Fin +25XP  │ ││
│  │  │   +50XP          │  │  │  │   +25XP       │  │  │  │   Hoje 12:30    │ ││
│  │  └──────────────────┘  │  │  └───────────────┘  │  │  └─────────────────┘ ││
│  │                        │  │                     │  │                       ││
│  │  ┌──────────────────┐  │  │                     │  │  ┌─────────────────┐ ││
│  │  │ ⠿ Pagar conta    │  │  │                     │  │  │ ✓ Não delivery  │ ││
│  │  │   💰 Finanças    │  │  │                     │  │  │   💰 Fin +25XP  │ ││
│  │  │   +25XP          │  │  │                     │  │  │   Hoje 13:00    │ ││
│  │  └──────────────────┘  │  │                     │  │  └─────────────────┘ ││
│  │                        │  │                     │  │                       ││
│  │  [+ Adicionar]         │  │                     │  │                       ││
│  └────────────────────────┘  └─────────────────────┘  └───────────────────────┘│
│                                                                               │
│  ⠿ = drag handle (6 dots)   Drag & drop entre colunas para mudar status      │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Calendar View:**

Quando o toggle "📅 Calendário" está ativo, as tarefas são exibidas em um calendário mensal.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Todas] [Saúde] [Estudos] [Finanças] [Rotina]                              │
│  12 pendentes | 45 completadas | 3 expiradas | Taxa: 87%                     │
│  ＋ Adicionar tarefa rápida...                    [ ≡ | ▦ | [📅] ]           │
│                                                                               │
│  ◀  Março 2026  ▶                                                            │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐                          │
│  │  Seg │  Ter │  Qua │  Qui │  Sex │  Sáb │  Dom │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │      │      │      │      │      │      │  1   │                          │
│  │      │      │      │      │      │      │      │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │  2   │  3   │  4   │  5   │  6   │  7   │  8   │                          │
│  │      │      │ ♥ 2  │      │ 🧠 1 │      │      │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │  9   │  10  │  11  │  12  │  13  │  14  │  15  │                          │
│  │ 💰 1 │      │ ♥ 1  │ ⚡ 2 │      │ 🧠 1 │      │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │  16  │ [17] │  18  │  19  │  20  │  21  │  22  │                          │
│  │      │ ♥ 2  │      │ 💰 1 │      │      │      │                          │
│  │      │ 🧠 1 │      │      │      │      │      │                          │
│  │      │ 💰 1 │      │      │      │      │      │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │  23  │  24  │  25  │  26  │  27  │  28  │  29  │                          │
│  │      │ 🧠 1 │      │      │ ⚡ 1 │      │      │                          │
│  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤                          │
│  │  30  │  31  │      │      │      │      │      │                          │
│  └──────┴──────┴──────┴──────┴──────┴──────┴──────┘                          │
│                                                                               │
│  [17] = dia selecionado (borda accent-primary)                               │
│  ♥ 2 = 2 tarefas de Saúde naquele dia (badge com cor do pilar)               │
│  Click no dia abre painel lateral com tarefas daquele dia                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Drag and Drop (reordenação por prioridade):**

Na List View, cada tarefa possui um drag handle (⠿) no lado esquerdo que permite reordenar por prioridade arrastando para cima/baixo.

```
  ── Hoje ──────────────────────────────────────────
  ⠿  ○ Correr 30min              ♥ Saúde    +50XP   ← drag para reordenar
  ⠿  ○ Estudar React 1h          🧠 Estudos  +50XP
  ⠿  ○ Revisar orçamento         💰 Finanças +25XP
```

**Batch Actions (ações em lote):**

Ao selecionar tarefas via checkbox (long press em mobile, ou click no checkbox em desktop), uma barra de ações aparece no topo.

```
┌──────────────────────────────────────────────────────────────────┐
│  ☑ 3 selecionadas    [✓ Completar todas] [🗑 Excluir] [✕]      │
└──────────────────────────────────────────────────────────────────┘

  ☑  ○ Correr 30min              ♥ Saúde    +50XP
  ☐  ○ Estudar React 1h          🧠 Estudos  +50XP
  ☑  ○ Revisar orçamento         💰 Finanças +25XP
  ☑  ○ Pagar conta de luz        💰 Finanças +25XP
```

**Subtasks (subtarefas expansíveis):**

Tarefas com subtarefas mostram um indicador de contagem. Click expande a lista de subtarefas inline.

```
  ○ Estudar React 1h           🧠 Estudos  +50XP  ▾ 2/4 subtarefas
     ├── ✓ Ler documentação Hooks
     ├── ✓ Fazer exercício useEffect
     ├── ○ Criar componente com Context API
     └── ○ Testar com React Testing Library
```

#### 4.4.2 Wireframe Completo — Tela de Tarefas Enhanced (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Header: "Minhas Missões" | Streak 🔥 12 | 🔔 3 | [Avatar]                 │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  [Todas] [♥ Saúde] [🧠 Estudos] [💰 Finanças] [⚡ Rotina]                   │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  12 pendentes  |  45 completadas  |  3 expiradas  |  Taxa: 87%          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  ＋ Adicionar tarefa rápida...                 [♥] [🧠] [💰] [⚡]       ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  Filtros: [Pendentes ▾] [Todas as fontes ▾] [Data ▾]   [ [≡] | ▦ | 📅 ]    │
│                                                                               │
│  ── Hoje ────────────────────────────────────────────────────────────────── │
│  ⠿  ○ Correr 30min                ♥ Saúde     IA  +50XP   [...] ← menu    │
│  ⠿  ○ Estudar React 1h            🧠 Estudos  IA  +50XP   ▾ 2/4 sub      │
│     ├── ✓ Ler documentação Hooks                                            │
│     ├── ✓ Fazer exercício useEffect                                         │
│     ├── ○ Criar componente Context API                                      │
│     └── ○ Testar com RTL                                                    │
│  ⠿  ○ Revisar orçamento           💰 Finanças  IA  +25XP   [...]          │
│  ⠿  ○ Pagar conta de luz          💰 Finanças      +25XP   [...]          │
│  ⠿  ○ Lavar roupa                 ⚡ Rotina       +10XP   [...]          │
│                                                                               │
│  ── Amanhã ──────────────────────────────────────────────────────────────── │
│  ⠿  ○ Correr 30min (recorrente)   ♥ Saúde         +50XP   [...]          │
│  ⠿  ○ Revisar notas React         🧠 Estudos      +25XP   [...]          │
│                                                                               │
│  ── Completadas hoje ────────────────────────────────────────────────────── │
│  ✓ Meditar 10min                   ♥ Saúde         +10XP   09:15          │
│  ✓ Não pedir delivery              💰 Finanças     +25XP   12:30          │
│  ✓ Arrumar quarto                  ⚡ Rotina       +10XP   08:00          │
│                                                                               │
│  ── Expiradas ───────────────────────────────────────────────────────────── │
│  ✕ Estudar TypeScript              🧠 Estudos      +50XP   (ontem)  [↻]   │
│                                                                               │
│  [↻] = botão para reagendar tarefa expirada                                  │
│  [...] = menu contextual (editar, excluir, adiar, marcar em progresso)       │
└──────────────────────────────────────────────────────────────────────────────┘
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

### 4.7.1 Tela de Analytics / Insights

Página dedicada a dados e insights do usuário. Permite análise profunda do progresso por período, pilar e comportamento. Inspirada em dashboards de dados modernos (Stripe Dashboard, GitHub Insights) com o visual dark/neon do Life Boost PRO.

**Princípios:**
- Dados acionáveis, não apenas decorativos — cada gráfico deve gerar um "e agora?"
- Insights de IA transformam dados em conselhos ("Seu melhor dia é terça-feira")
- Comparação temporal (esta semana vs anterior) para sensação de progresso

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Header: "Analytics" | Streak 🔥 12 | 🔔 3 | [Avatar]                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Período:  [ 7d ] [ 30d ] [•90d•] [ 6m ] [ 1 ano ]                     ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── ROW 1: KPI Cards ───────────────────────────────────────────────────── │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│  │  ⚡ XP TOTAL    │ │  ✓ TAREFAS     │ │  📊 TAXA       │ │  🔥 STREAK     ││
│  │    PERÍODO      │ │    CONCLUÍDAS  │ │    CONCLUSÃO   │ │    ATUAL       ││
│  │                 │ │                │ │                │ │                ││
│  │   4.280         │ │     127        │ │     87%        │ │     12         ││
│  │   XP            │ │   tarefas      │ │                │ │    dias        ││
│  │                 │ │                │ │                │ │                ││
│  │  ↑ 23% vs ant. │ │  ↑ 12 vs ant.  │ │  ↑ 5% vs ant.  │ │  Maior: 34    ││
│  │  (verde)        │ │  (verde)       │ │  (verde)       │ │               ││
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘│
│                                                                               │
│  ── ROW 2: Line Chart (XP por semana) ──────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  XP por Semana                                            Legenda:      ││
│  │                                                           ── Total      ││
│  │  600│                                         ╱──●        ── Saúde      ││
│  │     │                                    ╱───╱            ── Estudos    ││
│  │  400│              ●───────●         ●──╱                 ── Finanças   ││
│  │     │         ╱───╱         ╲───╱───╱                     ── Rotina     ││
│  │  200│    ●───╱                                                          ││
│  │     │───╱                                                               ││
│  │    0│──────────────────────────────────────────                          ││
│  │     Sem1   Sem2   Sem3   Sem4   Sem5   Sem6   Sem7                      ││
│  │                                                                          ││
│  │  4 linhas coloridas (cor do pilar) + 1 linha branca (total)             ││
│  │  Hover em ponto: tooltip com XP exato daquela semana                    ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── ROW 3: Radar + Donut (2 colunas) ───────────────────────────────────── │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐ │
│  │  RADAR — EQUILÍBRIO DOS PILARES │  │  DONUT — DISTRIBUIÇÃO TAREFAS   │ │
│  │                                  │  │                                  │ │
│  │           Saúde (8)              │  │        ┌────────────┐            │ │
│  │              ╱╲                  │  │       ╱ ╲    127    ╱╲           │ │
│  │             ╱  ╲                 │  │      ╱   ╲ tarefas╱  ╲          │ │
│  │            ╱ ·· ╲                │  │     │ 35% │       │28%│          │ │
│  │  Rotina ╱ ·    · ╲ Estudos     │  │     │Saúde│       │Est│          │ │
│  │         ╲ ·      · ╱            │  │      ╲   ╱ ╲    ╱╲  ╱           │ │
│  │          ╲ ·    · ╱              │  │       ╲ ╱   ╲  ╱  ╲╱            │ │
│  │           ╲ ·· ╱                 │  │       │22%│  │15%│              │ │
│  │            ╲  ╱                  │  │       │Fin│  │Rot│              │ │
│  │             ╲╱                   │  │        └────────────┘            │ │
│  │         Finanças (6)             │  │                                  │ │
│  │                                  │  │  Saúde: 45 (35%) ♥              │ │
│  │  Animação: desenho do polígono   │  │  Estudos: 36 (28%) 🧠           │ │
│  │  ao scroll (reveal)              │  │  Finanças: 28 (22%) 💰          │ │
│  │                                  │  │  Rotina: 18 (15%) ⚡            │ │
│  └──────────────────────────────────┘  └──────────────────────────────────┘ │
│                                                                               │
│  ── ROW 4: Heatmap Calendar (visão anual completa) ─────────────────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  HEATMAP DE ATIVIDADE — 2026                                            ││
│  │                                                                          ││
│  │  Jan    Fev    Mar    Abr    Mai    Jun    Jul    Ago    Set    Out ...   ││
│  │  ░░░░░░ ░░▓▓▓▓ ▓▓████                                                  ││
│  │  ░░░░░░ ░░▓▓▓▓ ▓▓████                                                  ││
│  │  ░░░░░░ ░▓▓▓▓▓ ████▓▓    (restante do ano em cinza claro = futuro)     ││
│  │  ░░░░░░ ▓▓▓▓▓▓ ████▓▓                                                  ││
│  │  ░░░░░░ ▓▓▓▓▓▓ ▓▓████                                                  ││
│  │  ░░░░░░ ░▓▓▓▓▓ ████▓▓                                                  ││
│  │  ░░░░░░ ░░▓▓▓▓ ▓▓▓▓██                                                  ││
│  │                                                                          ││
│  │  ░ nenhum  ▓ leve  █ intenso     Hover: "12 Mar: 145 XP, 5 tarefas"    ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── ROW 5: AI Insights Card ────────────────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  🤖 INSIGHTS DA IA                                              [IA]   ││
│  │  ╔══════════════════════════════════════════════════════════════════════╗││
│  │  ║                                                                    ║││
│  │  ║  📅 Seu melhor dia de produtividade é terça-feira (média 210 XP)   ║││
│  │  ║                                                                    ║││
│  │  ║  🌅 Você é 40% mais produtivo de manhã (6h-12h)                   ║││
│  │  ║                                                                    ║││
│  │  ║  📈 Seu pilar de Estudos cresceu 3 níveis em 30 dias — excelente! ║││
│  │  ║                                                                    ║││
│  │  ║  ⚠️ Pilar Finanças está 40% abaixo da sua média — crie tarefas!  ║││
│  │  ║                                                                    ║││
│  │  ║  🎯 Se mantiver o ritmo atual, alcança Nível 20 em 45 dias.      ║││
│  │  ║                                                                    ║││
│  │  ╚══════════════════════════════════════════════════════════════════════╝││
│  │  ← gradient border: accent-primary → accent-cyan                       ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── ROW 6: Tabela Comparativa ──────────────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  COMPARAÇÃO DE PERÍODOS                                                 ││
│  │                                                                          ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │  │ Métrica          │ Esta Semana │ Semana Anterior │ Variação        │ ││
│  │  ├──────────────────┼─────────────┼─────────────────┼─────────────────┤ ││
│  │  │ XP Total         │    620      │      505        │  ↑ +23% (verde) │ ││
│  │  │ Tarefas feitas   │     18      │       15        │  ↑ +20% (verde) │ ││
│  │  │ Taxa conclusão   │    92%      │      87%        │  ↑ +5%  (verde) │ ││
│  │  │ Média XP/dia     │    89       │       72        │  ↑ +24% (verde) │ ││
│  │  │ Pilar mais forte │  Estudos    │    Saúde        │  — mudou        │ ││
│  │  │ Pilar mais fraco │  Finanças   │   Finanças      │  ↔ mesmo        │ ││
│  │  └──────────────────┴─────────────┴─────────────────┴─────────────────┘ ││
│  │                                                                          ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │  │ Métrica          │ Este Mês    │ Mês Anterior    │ Variação        │ ││
│  │  ├──────────────────┼─────────────┼─────────────────┼─────────────────┤ ││
│  │  │ XP Total         │   2.180     │     1.750       │  ↑ +25% (verde) │ ││
│  │  │ Tarefas feitas   │     72      │       58        │  ↑ +24% (verde) │ ││
│  │  │ Taxa conclusão   │    89%      │      82%        │  ↑ +7%  (verde) │ ││
│  │  │ Níveis ganhos    │      3      │        2        │  ↑ +1           │ ││
│  │  │ Streak máximo    │     12      │       34        │  ↓ -22  (verm.) │ ││
│  │  └──────────────────┴─────────────┴─────────────────┴─────────────────┘ ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.7.2 Tela de Diário / Journal

Espaço pessoal de reflexão integrado ao sistema de gamificação. Cada entrada no diário gera XP e alimenta os insights da IA. Inspirado na simplicidade do Day One com a integração de pilares do Life Boost PRO.

**Princípios:**
- Escrita deve ser convidativa, nunca obrigatória — prompts sugeridos reduzem a barreira
- Privacidade explícita: badge "Privada" visível em cada entrada
- Mood tracking via emojis: rápido, visual, sem fricção
- Filtros por pilar e humor permitem releitura com propósito

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Header: "Meu Diário" | Streak 🔥 12 | 🔔 3 | [Avatar]                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  [+ Nova Entrada]                                           +15 XP/entry││
│  │                                                                          ││
│  │  Sugestões de prompt:                                                    ││
│  │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────┐     ││
│  │  │ "Como foi seu    │ │ "O que você      │ │ "Qual foi sua maior │     ││
│  │  │  dia hoje?"      │ │  aprendeu hoje?" │ │  vitória hoje?"     │     ││
│  │  └──────────────────┘ └──────────────────┘ └──────────────────────┘     ││
│  │  ← sugestões em chip buttons, click preenche o prompt no form           ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── FORMULÁRIO DE ENTRADA (expandido ao clicar "+ Nova Entrada") ────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │  Como você está se sentindo?                                             ││
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                              ││
│  │  │ 😢  │ │ 😐  │ │ 🙂  │ │ 😊  │ │ 🤩  │   ← mood selector           ││
│  │  │Péss.│ │ Meh │ │ Ok  │ │ Bem │ │Incr.│      click seleciona          ││
│  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      (borda accent)           ││
│  │                                                                          ││
│  │  Relacionado a:                                                          ││
│  │  [♥ Saúde] [🧠 Estudos] [💰 Finanças] [⚡ Rotina] [Geral]             ││
│  │  ← pilar tag selector (multi-select, chips toggle)                       ││
│  │                                                                          ││
│  │  ┌──────────────────────────────────────────────────────────────────────┐││
│  │  │                                                                      │││
│  │  │  Escreva aqui... (textarea expandível, min 3 linhas)                │││
│  │  │                                                                      │││
│  │  │                                                                      │││
│  │  │                                                                      │││
│  │  └──────────────────────────────────────────────────────────────────────┘││
│  │                                                                          ││
│  │  ☐ Entrada privada (não visível para IA do Mentor)                      ││
│  │                                                                          ││
│  │  [Cancelar]                                            [Salvar +15 XP]  ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ── FILTROS ─────────────────────────────────────────────────────────────── │
│  Filtrar: [Todos pilares ▾] [Todos humores ▾] [Período ▾]                   │
│                                                                               │
│  ── TIMELINE DE ENTRADAS ────────────────────────────────────────────────── │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  17 Mar 2026 · 22:15                           😊  [♥ Saúde] [Privada] ││
│  │                                                                          ││
│  │  "Hoje foi um dia incrível! Consegui correr 5km pela primeira vez em    ││
│  │   meses. O corpo reclamou no km 3 mas a mente foi mais forte. A..."     ││
│  │                                                                          ││
│  │  [Ler mais →]                                                            ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  16 Mar 2026 · 21:30                     🙂  [🧠 Estudos] [💰 Finanças]││
│  │                                                                          ││
│  │  "Estudei React por 2 horas e finalmente entendi hooks. Também revi    ││
│  │   o orçamento do mês — preciso cortar gastos com delivery..."           ││
│  │                                                                          ││
│  │  [Ler mais →]                                                            ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  15 Mar 2026 · 23:00                                😐  [Geral]         ││
│  │                                                                          ││
│  │  "Dia meio parado. Não consegui focar em nada. Preciso dormir mais     ││
│  │   cedo e criar uma rotina matinal..."                                   ││
│  │                                                                          ││
│  │  [Ler mais →]                                                            ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  [Carregar entradas anteriores...]                                            │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Detalhes de implementação:**

| Elemento | Comportamento |
|----------|---------------|
| Mood selector | 5 opções de emoji com label. Click seleciona (borda accent, scale 1.1). Obrigatório. |
| Pilar tags | Multi-select. Chips toggleáveis na cor do pilar. Opcional (default: "Geral"). |
| Textarea | Min 3 linhas, expandível. Placeholder com prompt selecionado. Markdown suportado. |
| Badge "Privada" | Checkbox toggle. Se ativo, entrada não alimenta contexto do Mentor IA. Visual: cadeado + texto. |
| Timeline | Ordenação cronológica reversa (mais recente primeiro). Lazy load ao scroll. |
| Entry card | Data/hora, mood emoji, pilar badges, preview do texto (3 linhas + "Ler mais"), badge "Privada" se aplicável. |
| Filtros | Dropdown por pilar (multi), dropdown por mood (multi), date range picker. Combináveis. |
| XP | +15 XP por entrada (1 entrada/dia conta XP; entradas extras não dão XP adicional). |

### 4.7.3 Tela de Loja (Shop)

Sistema de recompensas gamificado onde o usuário gasta Gold (moeda virtual) em itens de personalização e auto-recompensas. Inspirado em lojas de jogos (Fortnite Item Shop, Genshin Impact Shop) mas adaptado para o contexto de produtividade pessoal.

**Princípios:**
- Gold é ganho ao completar tarefas e conquistas — reforça o loop de recompensa
- Auto-recompensas são criadas pelo próprio usuário (ex: "Assistir episódio de série") — personalização do sistema de motivação
- Itens de avatar alimentam a personalização visual e a identidade do personagem
- Itens sazonais criam urgência e senso de exclusividade (FOMO positivo)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Header: "Loja" | Streak 🔥 12 | 🔔 3 | [Avatar]                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │   🪙  1.250 Gold                                                        ││
│  │   (display font, 48px, cor --accent-amber, glow sutil)                  ││
│  │   "Ganhe Gold completando tarefas e desbloqueando conquistas"            ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  [ Auto-recompensas ] [ Avatar ] [ Temas ] [ Sazonais 🔴 ]                  │
│                                                                               │
│  ══ ABA: AUTO-RECOMPENSAS ══════════════════════════════════════════════════ │
│                                                                               │
│  "Crie suas próprias recompensas e resgate com Gold!"                        │
│                                                                               │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│  │                 │ │                │ │                │ │                ││
│  │   🎬            │ │   🍕           │ │   🎮           │ │   📖           ││
│  │                 │ │                │ │                │ │                ││
│  │  Assistir       │ │  Pedir         │ │  1h de         │ │  Comprar       ││
│  │  episódio       │ │  pizza         │ │  videogame     │ │  livro novo    ││
│  │  de série       │ │  no fds        │ │  sem culpa     │ │                ││
│  │                 │ │                │ │                │ │                ││
│  │  🪙 100 Gold    │ │  🪙 250 Gold   │ │  🪙 150 Gold   │ │  🪙 500 Gold   ││
│  │                 │ │                │ │                │ │                ││
│  │  [Resgatar]     │ │  [Resgatar]    │ │  [Resgatar]    │ │  [Gold insuf.] ││
│  │                 │ │  (pode!)       │ │  (pode!)       │ │  (desabilitado)││
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘│
│                                                                               │
│  ┌────────────────────────────────────────┐                                  │
│  │  [+ Criar nova recompensa]             │  ← abre modal                    │
│  └────────────────────────────────────────┘                                  │
│                                                                               │
│  ── Modal "Criar Recompensa" ────────────────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  CRIAR RECOMPENSA                                                  [✕]  ││
│  │                                                                          ││
│  │  Emoji:  [😀] [🎬] [🍕] [🎮] [📖] [🏖️] [🎵] [💆] [🛍️] [☕] [mais...]    ││
│  │          ← emoji picker grid, seleção com borda accent                   ││
│  │                                                                          ││
│  │  Nome:   [________________________________]                              ││
│  │          ex: "Assistir episódio de série"                                ││
│  │                                                                          ││
│  │  Preço:  [🪙 ___] Gold                                                  ││
│  │          Sugestão: 50-500 Gold (slider ou input numérico)                ││
│  │                                                                          ││
│  │  [Cancelar]                                              [Criar 🪙]     ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
│  ══ ABA: AVATAR ════════════════════════════════════════════════════════════ │
│                                                                               │
│  Categorias: [Cabelo] [Roupa] [Acessórios] [Fundos] [Molduras]              │
│                                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │          │ │ ░░░░░░░░ │ │          │ │ ░░░░░░░░ │ │          │          │
│  │  Cabelo  │ │ ░░░░░░░░ │ │  Armadura│ │ ░░░░░░░░ │ │  Óculos  │          │
│  │  Samurai │ │ ░░(silh.)│ │  Neon    │ │ ░░(silh.)│ │  Cyber   │          │
│  │          │ │ ░░░░░░░░ │ │          │ │ ░░░░░░░░ │ │          │          │
│  │ [Usando] │ │ 🪙 300   │ │ [Equipar]│ │ 🪙 800   │ │ [Equipar]│          │
│  │ (verde)  │ │ [Comprar]│ │ (tem)    │ │ [Comprar]│ │ (tem)    │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                               │
│  [Usando] = item equipado (borda verde, badge "Usando")                      │
│  [Equipar] = item comprado mas não equipado (borda branca)                   │
│  [Comprar] = item bloqueado (silhueta cinza, preço visível)                  │
│  🪙 800 = Gold insuficiente → botão desabilitado, texto "Faltam 550 Gold"   │
│                                                                               │
│  ══ ABA: SAZONAIS ══════════════════════════════════════════════════════════ │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  ☀️ EVENTO DE VERÃO                                                     ││
│  │  ══════════════════════════════════════════════════════════════════════  ││
│  │                                                                          ││
│  │  ⏱️ Termina em: 5 dias 14h 32min                                       ││
│  │  (countdown com timer animado, urgência visual)                          ││
│  │                                                                          ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                   ││
│  │  │  🏖️      │ │  🌴      │ │  🌊      │ │  ☀️      │                   ││
│  │  │ Fundo    │ │ Avatar   │ │ Moldura  │ │ Tema     │                   ││
│  │  │ Praia    │ │ Tropical │ │ Ondas    │ │ Sunset   │                   ││
│  │  │          │ │          │ │          │ │          │                   ││
│  │  │ 🪙 400   │ │ 🪙 600   │ │ 🪙 300   │ │ 🪙 1000  │                   ││
│  │  │ [Comprar]│ │ [Comprar]│ │ [Comprar]│ │ [Comprar]│                   ││
│  │  │ LIMITADO │ │ LIMITADO │ │ LIMITADO │ │ LIMITADO │                   ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘                   ││
│  │                                                                          ││
│  │  Badge "LIMITADO" em vermelho — disponível apenas durante o evento.      ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Tela do Mentor IA (Chat)

A interação com o Mentor é a feature mais diferenciadora do produto. O chat deve parecer uma conversa com um NPC sábio de RPG, não um chatbot corporativo.

**Desktop Layout:**

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Voltar ao Dashboard          Mentor IA           Plano Boost │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  HEADER DO MENTOR                                            ││
│  │  ┌──────┐                                                    ││
│  │  │ 🧙  │  Mentor    ● Online                                ││
│  │  │      │  "Seu guia pessoal de evolução"                    ││
│  │  └──────┘                                                    ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  ÁREA DE MENSAGENS (scroll vertical)                         ││
│  │                                                              ││
│  │        ┌──────────────────────────────────┐                  ││
│  │        │ Mentor:                          │                  ││
│  │        │ "Bom dia, guerreiro! Vi que      │  ← bg-tertiary  ││
│  │        │  seu pilar de Saúde precisa de   │    border-left   ││
│  │        │  atenção. Que tal uma missão     │    accent-cyan   ││
│  │        │  rápida?"                        │                  ││
│  │        │                    14:32         │                  ││
│  │        └──────────────────────────────────┘                  ││
│  │                                                              ││
│  │  ┌──────────────────────────────────┐                        ││
│  │  │ Você:                            │                        ││
│  │  │ "Me sugere algo leve, tô        │  ← bg-elevated        ││
│  │  │  cansado hoje"                   │    border-left        ││
│  │  │                    14:33         │    accent-primary     ││
│  │  └──────────────────────────────────┘                        ││
│  │                                                              ││
│  │        ┌──────────────────────────────────┐                  ││
│  │        │ Mentor:                          │                  ││
│  │        │ "Entendido! Que tal isso:"       │                  ││
│  │        │                                  │                  ││
│  │        │ ┌────────────────────────────┐   │                  ││
│  │        │ │ ♥ Caminhada leve 15min     │   │  ← Card de      ││
│  │        │ │   Fácil • +10 XP           │   │    missão inline ││
│  │        │ │   [Aceitar missão]         │   │                  ││
│  │        │ └────────────────────────────┘   │                  ││
│  │        │                    14:33         │                  ││
│  │        └──────────────────────────────────┘                  ││
│  │                                                              ││
│  │        ┌─────────────────────┐                               ││
│  │        │ ● ● ●  Digitando...│  ← Typing indicator           ││
│  │        └─────────────────────┘                               ││
│  │                                                              ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  [💡 Sugestões rápidas]                                      ││
│  │  [Como estou indo?] [Me dê uma missão] [Dicas para hoje]    ││
│  ├──────────────────────────────────────────────────────────────┤│
│  │  ┌────────────────────────────────────────────────┐ [Enviar] ││
│  │  │ Digite sua mensagem...                         │    ↑     ││
│  │  └────────────────────────────────────────────────┘  btn-sm  ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (360px):**

```
┌────────────────────────────────────┐
│  ← Voltar     Mentor IA     ⋮     │
├────────────────────────────────────┤
│  ┌──────┐ Mentor  ● Online        │
│  │ 🧙  │ Nível do usuário: 12    │
│  └──────┘                          │
├────────────────────────────────────┤
│                                    │
│     ┌────────────────────────┐     │
│     │ Mentor:                │     │
│     │ "Bom dia, guerreiro!"  │     │
│     │              14:32     │     │
│     └────────────────────────┘     │
│                                    │
│  ┌────────────────────────┐        │
│  │ Você:                  │        │
│  │ "Me sugere algo leve"  │        │
│  │              14:33     │        │
│  └────────────────────────┘        │
│                                    │
│     ┌────────────────────────┐     │
│     │ Mentor:                │     │
│     │ "Que tal isso:"        │     │
│     │ ┌──────────────────┐   │     │
│     │ │♥ Caminhada 15min │   │     │
│     │ │  Fácil • +10 XP  │   │     │
│     │ │ [Aceitar missão] │   │     │
│     │ └──────────────────┘   │     │
│     │              14:33     │     │
│     └────────────────────────┘     │
│                                    │
├────────────────────────────────────┤
│ [Como estou?] [Missão] [Dicas]    │
├────────────────────────────────────┤
│ ┌──────────────────────────┐ [↑]  │
│ │ Digite sua mensagem...   │      │
│ └──────────────────────────┘      │
└────────────────────────────────────┘
```

**Regras de design do chat:**

| Propriedade | Mentor (mensagem recebida) | Usuário (mensagem enviada) |
|-------------|---------------------------|---------------------------|
| Alinhamento | Esquerda, max-width 80% | Direita, max-width 80% |
| Background | `--bg-tertiary` | `--bg-elevated` |
| Border-left | 3px `--accent-cyan` | 3px `--accent-primary` |
| Radius | 0 12px 12px 12px | 12px 0 12px 12px |
| Fonte do nome | `--text-small` + `--accent-cyan` | `--text-small` + `--accent-primary-light` |
| Timestamp | `--text-tiny` + `--text-tertiary`, canto inferior direito | Idem |

**Sugestões rápidas (Quick Replies):**
- Pills horizontais scrolláveis acima do input
- Background: `--accent-primary` 10% opacity
- Texto: `--accent-primary-light`
- Radius: `--radius-full`
- Height: 32px
- Ao clicar: preenchem o input e enviam automaticamente
- Exemplos contextuais: "Como estou indo?", "Me dê uma missão", "Dicas para hoje", "Meu resumo semanal"

**Card de missão inline (sugerida pelo Mentor no chat):**
- Renderizado dentro da mensagem do Mentor como card interativo
- Mesma estrutura do card de tarefa do dashboard
- Botão "Aceitar missão" cria a tarefa diretamente (sem modal)
- Ao aceitar: card muda para estado "Missão aceita ✓" com animação de check
- Se o usuário rejeitar (botão "Não agora"): feedback registrado como em [UC-026]

**Estados do chat:**

| Estado | Visual |
|--------|--------|
| Chat vazio (primeiro acesso) | Mensagem de boas-vindas do Mentor + 3 sugestões rápidas |
| Mentor digitando | 3 pontos pulsando em bubble com bg-tertiary (animation: bounce 1.4s infinite) |
| Erro na resposta IA | Mensagem do sistema: "O Mentor não conseguiu responder. Tente novamente." + botão Retry |
| Limite de interações | Input desabilitado, mensagem: "Seu Mentor descansa até amanhã. ⏰ Reseta em {countdown}." + CTA upgrade |
| Plano sem acesso (Free/Starter) | Tela com preview borrado do chat + CTA "Faça upgrade para conversar com o Mentor" |

**Acessibilidade do chat:**
- `role="log"` na área de mensagens (anuncia novas mensagens para screen readers)
- `aria-live="polite"` no typing indicator
- Cada mensagem tem `aria-label="Mensagem do Mentor: {texto}" / "Sua mensagem: {texto}"`
- Input com `aria-label="Enviar mensagem ao Mentor"`
- Quick replies com `role="listbox"` e `aria-label="Sugestões rápidas"`

### 4.9 Tela de Perfil e Configurações

**Desktop Layout — Perfil (coluna esquerda pública + coluna direita stats):**

```
┌──────────────────────────────────────────────────────────────────┐
│  Meu Perfil                                        [Editar]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────┐  ┌───────────────────────────────┐│
│  │  PERFIL PÚBLICO            │  │  ESTATÍSTICAS                 ││
│  │                            │  │                               ││
│  │  ┌────────────┐            │  │  Tarefas completadas    847  ││
│  │  │            │            │  │  XP total          125.400  ││
│  │  │   Avatar   │  Nível 12  │  │  Dias ativos            94  ││
│  │  │   (120px)  │            │  │  Streak atual     🔥 12 dias ││
│  │  │            │  @username │  │  Maior streak        34 dias ││
│  │  └────────────┘            │  │  Conquistas         18 / 50  ││
│  │                            │  │                               ││
│  │  ██████████████░░░░ 78%    │  ├───────────────────────────────┤│
│  │  3.245 / 4.200 XP         │  │  EVOLUÇÃO SEMANAL (12 sem)   ││
│  │                            │  │                               ││
│  │  Plano: Boost ⭐           │  │  XP por semana               ││
│  │  Membro desde: Jan 2026   │  │  █                            ││
│  │                            │  │  █  █     █  █               ││
│  │  Conquistas em destaque:  │  │  █  █  █  █  █  █            ││
│  │  [🏆] [🔥] [🧠] [⚡] [💰] │  │  █  █  █  █  █  █  █  ...   ││
│  │                            │  │                               ││
│  │  ┌─────────────────────┐  │  ├───────────────────────────────┤│
│  │  │ PILARES DETALHADOS  │  │  │  DISTRIBUIÇÃO POR PILAR      ││
│  │  │                     │  │  │                               ││
│  │  │ ♥ Saúde     Lv. 8  │  │  │       ╭─────╮                ││
│  │  │   ████████░░  67%   │  │  │      ╱  28%  ╲  Saúde       ││
│  │  │                     │  │  │  ───╱─────────╲──── 31%     ││
│  │  │ 🧠 Estudos  Lv. 14 │  │  │     ╲  22%   ╱  Estudos    ││
│  │  │   ██████████  89%   │  │  │      ╲──19%─╱  Finanças    ││
│  │  │                     │  │  │       ╰─────╯  Rotina       ││
│  │  │ 💰 Finanças Lv. 10 │  │  │                               ││
│  │  │   █████████░  72%   │  │  │                               ││
│  │  │                     │  │  │                               ││
│  │  │ ⚡ Rotina   Lv. 11 │  │  │                               ││
│  │  │   █████████░  81%   │  │  │                               ││
│  │  └─────────────────────┘  │  │                               ││
│  └────────────────────────────┘  └───────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile Layout — Perfil (360px):**

```
┌────────────────────────────────────┐
│  Meu Perfil              [Editar] │
├────────────────────────────────────┤
│                                    │
│        ┌────────────┐              │
│        │   Avatar   │              │
│        │   (80px)   │              │
│        └────────────┘              │
│        @username  Nível 12         │
│    ████████████████░░░░ 78%        │
│    3.245 / 4.200 XP               │
│    Plano: Boost ⭐                 │
│                                    │
│  ┌──────┐┌──────┐┌──────┐┌──────┐ │
│  │♥  8  ││🧠 14 ││💰 10 ││⚡ 11 │ │
│  │██████││██████││██████││██████│ │
│  └──────┘└──────┘└──────┘└──────┘ │
│                                    │
│  ── Estatísticas ──────────────── │
│  Tarefas completadas         847  │
│  XP total                125.400  │
│  Streak atual          🔥 12 dias │
│  Maior streak             34 dias │
│  Conquistas              18 / 50  │
│                                    │
│  ── Atividade (12 sem) ───────── │
│  [Gráfico de barras compacto]     │
│                                    │
│  ── Conquistas destaque ──────── │
│  [🏆] [🔥] [🧠] [⚡] [💰]         │
│                                    │
├────────────────────────────────────┤
│  ▣      ☐      [+]     ★      ○  │
└────────────────────────────────────┘
```

**Desktop Layout — Configurações (sidebar tabs + painel de conteúdo):**

```
┌──────────────────────────────────────────────────────────────────┐
│  Configurações                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌────────────────────────────────────────┐│
│  │  MENU LATERAL    │  │  CONTEÚDO DA ABA SELECIONADA           ││
│  │                  │  │                                        ││
│  │  ▸ Perfil        │  │  ── Dados Pessoais ─────────────────  ││
│  │    Conta         │  │                                        ││
│  │    Avatar        │  │  Nome de exibição                      ││
│  │    Privacidade   │  │  ┌──────────────────────────────────┐  ││
│  │    Notificações  │  │  │ João Warrior                     │  ││
│  │    Plano         │  │  └──────────────────────────────────┘  ││
│  │    Idioma        │  │                                        ││
│  │                  │  │  Email                                 ││
│  │  ─────────────── │  │  ┌──────────────────────────────────┐  ││
│  │                  │  │  │ joao@email.com                   │  ││
│  │  Exportar dados  │  │  └──────────────────────────────────┘  ││
│  │  Excluir conta   │  │  ⓘ Alterar email requer verificação   ││
│  │                  │  │                                        ││
│  └──────────────────┘  │  Fuso horário                          ││
│                         │  ┌──────────────────────────────────┐  ││
│                         │  │ America/Sao_Paulo (UTC-3)    ▾  │  ││
│                         │  └──────────────────────────────────┘  ││
│                         │                                        ││
│                         │  Alterar senha                         ││
│                         │  ┌──────────────────────────────────┐  ││
│                         │  │ ••••••••                         │  ││
│                         │  └──────────────────────────────────┘  ││
│                         │  [Alterar senha →]                     ││
│                         │                                        ││
│                         │                       [Salvar]         ││
│                         └────────────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Abas de Configurações — Conteúdo de cada uma:**

| Aba | Conteúdo |
|-----|----------|
| Perfil | Nome, email, fuso horário, alterar senha. Botão "Salvar" |
| Conta | Plano atual com CTA de upgrade/downgrade, histórico de faturas (link Stripe), período de cobrança |
| Avatar | Grid de avatares base para troca [AVT-010], preview de evolução (se plano permite), inventário de itens equipáveis [UC-042] |
| Privacidade | Toggle "Aparecer no ranking público", link "Exportar meus dados" [LGPD], link "Excluir conta" (em `--semantic-error`) |
| Notificações | Toggles: email de missões diárias, relatório semanal, alertas de streak, marketing. Cada toggle com descrição curta |
| Idioma | Select de idioma (pt-BR padrão, en-US na v1.2). Aviso: "O Mentor IA responderá no idioma selecionado" |

**Mobile Layout — Configurações (360px):**

```
┌────────────────────────────────────┐
│  ← Voltar       Configurações     │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │ ○ Perfil                  → │  │
│  ├──────────────────────────────┤  │
│  │ ○ Conta e Plano           → │  │
│  ├──────────────────────────────┤  │
│  │ ○ Avatar                  → │  │
│  ├──────────────────────────────┤  │
│  │ ○ Privacidade             → │  │
│  ├──────────────────────────────┤  │
│  │ ○ Notificações            → │  │
│  ├──────────────────────────────┤  │
│  │ ○ Idioma                  → │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Exportar meus dados       → │  │
│  ├──────────────────────────────┤  │
│  │ Excluir conta             → │  │  ← text-error
│  └──────────────────────────────┘  │
│                                    │
│  Versão 1.0.0                      │
│                                    │
├────────────────────────────────────┤
│  ▣      ☐      [+]     ★      ○  │
└────────────────────────────────────┘
```

Em mobile, configurações usa padrão de lista → drill-down. Cada item abre uma tela interna com slide right. Botão "Voltar" no header retorna à lista.

**Regras de UX nas configurações:**
- Autosave em toggles (notificações, privacidade) — sem necessidade de botão "Salvar"
- Formulários de texto (nome, email, senha) requerem botão "Salvar" explícito
- Confirmação para ações destrutivas (excluir conta) segue [UC-006]: modal com digitação "EXCLUIR"
- Exportar dados exibe loading state com estimativa: "Preparando seus dados... Você receberá por email."
- "Excluir conta" sempre visível mas com destaque vermelho sutil — nunca escondido
- Alteração de email dispara toast: "Email de verificação enviado para {novo_email}"

### 4.10 Tela Admin (Painel Administrativo)

Acesso exclusivo para `role=admin`. Visual funcional — prioriza densidade de dados e eficiência operacional sobre estética gamer. Usa os mesmos tokens de cor mas com layout simplificado.

**Desktop Layout — Dashboard Admin:**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO Admin                           @admin    [Logout]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Usuários │ │ DAU      │ │ MRR      │ │ Custo IA │           │
│  │  1.247   │ │  186     │ │R$ 8.420  │ │ R$ 342   │           │
│  │ +12% ↑   │ │ 14.9%    │ │ +8% ↑    │ │ -3% ↓    │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                   │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐│
│  │  CADASTROS (últimos 30 dias) │ │  CONVERSÃO POR PLANO         ││
│  │                              │ │                              ││
│  │  █  █     █  █  █  █        │ │  Free     85% ██████████████ ││
│  │  █  █  █  █  █  █  █  █    │ │  Starter   7% █              ││
│  │  (gráfico de linha)         │ │  Boost     6% █              ││
│  │                              │ │  Ultra     2% ░              ││
│  └──────────────────────────────┘ └──────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐│
│  │  RETENÇÃO                    │ │  SAÚDE DO SISTEMA            ││
│  │                              │ │                              ││
│  │  D1:  72%  ████████████████ │ │  API Anthropic    ● Online   ││
│  │  D7:  41%  ██████████       │ │  Supabase DB      ● Online   ││
│  │  D30: 19%  █████            │ │  Stripe           ● Online   ││
│  │                              │ │  Vercel           ● Online   ││
│  │  Churn mensal: 6.2%         │ │                              ││
│  │                              │ │  Erros (24h):     12        ││
│  │                              │ │  Latência p95:    320ms     ││
│  └──────────────────────────────┘ └──────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  CUSTO DE IA DETALHADO (últimos 30 dias)                     ││
│  │                                                              ││
│  │  Total de chamadas:     14.520    |  Custo total:  R$ 342   ││
│  │  Missões diárias:       12.100    |  Custo/user:   R$ 0,27  ││
│  │  Relatórios semanais:    1.820    |  Cache hit:    22%      ││
│  │  Chat Mentor:              600    |  Tokens médio: 1.240    ││
│  │                                                              ││
│  │  (gráfico de custo diário com linha de threshold R$50/dia)  ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Abas/Seções do Admin:**

| Seção | Conteúdo | Ações |
|-------|----------|-------|
| Dashboard | KPIs, gráficos de cadastros/retenção/receita, saúde do sistema | Filtro por período (7d, 30d, 90d) |
| Usuários | Tabela com busca, filtro por plano/status, sort por data/nível/XP | Ver perfil, alterar plano, ban, impersonate (com log) |
| Finanças | MRR breakdown, churn, LTV, receita por plano, projeções | Exportar CSV |
| IA & Custos | Chamadas por tipo, custo diário, cache hit rate, erros de API, tokens consumidos | Ajustar rate limits, toggle de fallback |
| Conquistas | Catálogo de achievements, taxa de desbloqueio por conquista | Criar/editar conquistas, ativar/desativar |
| Sistema | Logs de erro (Sentry summary), status de CRONs, webhooks Stripe recentes | Trigger manual de CRON, retry de webhook |
| LGPD | Solicitações de exclusão pendentes, exportações em andamento, consentimentos | Aprovar/verificar exclusões |

**Regras do painel admin:**
- Sem bottom nav ou sidebar gamer — usa header com tabs horizontais
- Todas as ações destrutivas (ban, delete, alterar plano) requerem confirmação com motivo
- Impersonate (ver sistema como usuário) registra no `audit_log` com `action='ADMIN_IMPERSONATE'`
- Dashboard auto-refresh a cada 5 minutos (polling, não real-time)
- Mobile: tabela de usuários muda para cards empilhados com dados resumidos
- Acesso restrito por `role=admin` no middleware + RLS policy separada

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

### 11.2 Landing Page — Mobile Layout (360px)

```
┌────────────────────────────────────┐
│  ◆ LB PRO          [≡ Menu]       │  ← Header sticky, transparente
├────────────────────────────────────┤
│                                    │
│  "Transforme sua                   │
│   vida em um jogo."               │  ← Hero: texto empilhado
│                                    │
│  Evolua seu personagem             │
│  evoluindo você mesmo.             │
│                                    │
│  [  Começar Grátis — é de graça  ] │  ← CTA full-width, btn-xl
│                                    │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │    Preview do Dashboard      │  │  ← Mockup mobile, não desktop
│  │    (screenshot real, 280px)  │  │     Borda com glow sutil
│  │                              │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  Por que Life Boost PRO?           │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🧙 Mentor IA Pessoal        │  │  ← Cards empilhados
│  │ Missões personalizadas que   │  │     full-width
│  │ se adaptam ao seu progresso  │  │     scroll vertical
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ ⚔️ Gamificação Real          │  │
│  │ XP, níveis, conquistas e     │  │
│  │ avatar que evolui com você   │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 📊 4 Pilares de Vida         │  │
│  │ Saúde, Estudos, Finanças e   │  │
│  │ Rotina — visão completa      │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 🏆 Ranking Competitivo       │  │
│  │ Compare seu progresso com    │  │
│  │ outros jogadores             │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  Como funciona?                    │
│                                    │
│  ① Crie seu avatar                │
│  ┌──────────────────────────────┐  │
│  │ [Ilustração: avatar criado]  │  │
│  └──────────────────────────────┘  │
│                                    │
│  ② Complete missões               │
│  ┌──────────────────────────────┐  │
│  │ [Ilustração: tarefa + XP]    │  │
│  └──────────────────────────────┘  │
│                                    │
│  ③ Evolua                         │
│  ┌──────────────────────────────┐  │
│  │ [Ilustração: level up]       │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  "X mil jogadores já estão        │
│   evoluindo"                       │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ "Finalmente um app que me    │  │  ← Depoimentos em
│  │  motiva a ser consistente."  │  │     carousel horizontal
│  │            — @user1          │  │     (swipe)
│  └──────────────────────────────┘  │
│         ● ○ ○                      │  ← Dots de paginação
│                                    │
├────────────────────────────────────┤
│                                    │
│  Pronto para começar              │
│  sua jornada?                      │
│                                    │
│  [  Criar Conta Grátis           ] │  ← CTA final full-width
│                                    │
├────────────────────────────────────┤
│  Termos · Privacidade · Contato   │
│  © 2026 Life Boost PRO            │
└────────────────────────────────────┘
```

**Adaptações mobile-specific da landing:**

| Elemento | Desktop | Mobile |
|----------|---------|--------|
| Header | Logo + Login + CTA inline | Logo + hamburger menu (drawer) |
| Hero texto | 1 linha grande (32px) | 2 linhas empilhadas (24px) |
| Hero mockup | Screenshot desktop com moldura | Screenshot mobile com moldura mobile |
| Features | Grid 2x2 ou 3x2 | Cards empilhados full-width, scroll vertical |
| Como funciona | 3 colunas horizontal | 3 blocos empilhados vertical, numerados |
| Social proof | Cards lado a lado | Carousel horizontal com swipe + dots |
| Pricing | 4 cards em row | Stack vertical, Boost primeiro (antes de Starter) |
| CTAs | Width auto | Full-width (`w-full`) para área de toque máxima |
| Animações | Parallax no hero | Parallax desativado (performance). Fade-in on scroll mantido. |

**Hamburger menu (drawer mobile):**
```
┌────────────────────────────────────┐
│  ✕ Fechar                          │
│                                    │
│  Features                          │
│  Como funciona                     │
│  Pricing                           │
│                                    │
│  ──────────────────────────────── │
│                                    │
│  [Login]                           │
│  [Começar Grátis]                  │
│                                    │
└────────────────────────────────────┘
 Overlay: bg-black 70% + backdrop-blur
 Slide-in da direita, 300ms ease-out
 Links fazem scroll suave para a seção e fecham o drawer
```

### 11.2.1 Quiz de Segmentação (Typeform-style)

Quiz interativo full-screen que segmenta o usuário antes do cadastro. Inspirado no Typeform: uma pergunta por tela, transição suave, foco total. O quiz coleta dados para personalizar o onboarding (avatar sugerido, pilares prioritários, dificuldade inicial) e aumenta conversão ao criar investimento emocional antes do signup.

**Princípios:**
- Uma pergunta por tela — foco total, sem distrações
- Progress bar no topo — senso de progresso e comprometimento (sunk cost)
- Respostas visuais (cards, sliders) em vez de radio buttons — gamificado desde o primeiro contato
- Tela final mostra "resultado" personalizado — recompensa emocional por completar o quiz
- Fluxo de 8 etapas, estimativa de 2 minutos

**Progress bar e navegação:**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ████████████████████████░░░░░░░░░░░░░░░  Etapa 3 de 8          │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 1 — "Qual área da sua vida você mais quer melhorar?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 1 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│                                                                   │
│         Qual área da sua vida você                                │
│         mais quer melhorar?                                       │
│                                                                   │
│         (texto centralizado, 28px, --text-primary)                │
│                                                                   │
│                                                                   │
│    ┌──────────────┐  ┌──────────────┐                             │
│    │              │  │              │                             │
│    │   ♥ Saúde    │  │  🧠 Estudos  │                             │
│    │              │  │              │                             │
│    │  Exercícios, │  │  Aprender,   │                             │
│    │  alimentação,│  │  ler, cursos,│                             │
│    │  sono, saúde │  │  habilidades │                             │
│    │  mental      │  │              │                             │
│    └──────────────┘  └──────────────┘                             │
│                                                                   │
│    ┌──────────────┐  ┌──────────────┐                             │
│    │              │  │              │                             │
│    │ 💰 Finanças  │  │  ⚡ Rotina    │                             │
│    │              │  │              │                             │
│    │  Economizar, │  │  Organização,│                             │
│    │  investir,   │  │  hábitos,    │                             │
│    │  controlar   │  │  disciplina  │                             │
│    │  gastos      │  │  diária      │                             │
│    └──────────────┘  └──────────────┘                             │
│                                                                   │
│    ← Cards com hover glow na cor do pilar.                        │
│      Click seleciona (borda accent + scale 1.02)                  │
│      e auto-avança para próxima tela (300ms delay)                │
│                                                                   │
│                                          [Próximo →] (desabilitado│
│                                           até selecionar)         │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 2 — "Você já usou apps de produtividade antes?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 2 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Você já usou apps de                                      │
│         produtividade antes?                                      │
│                                                                   │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  Nunca usei                                  │               │
│    │  Sou novo nisso, quero começar do zero       │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  Sim, um ou dois                             │               │
│    │  Já experimentei mas não mantive o hábito    │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  Vários! Sou viciado em produtividade        │               │
│    │  Já usei Todoist, Notion, Habitica, etc.     │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ← Botões full-width, estilo list card.                         │
│      Hover: bg-hover. Click: borda accent + auto-avança.          │
│                                                                   │
│  [← Voltar]                              [Próximo →]             │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 3 — "O que te faz desistir?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 3 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         O que normalmente te faz                                  │
│         desistir de hábitos?                                      │
│                                                                   │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  😔 Falta de motivação                       │               │
│    │  Começo empolgado mas perco o gás rápido     │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🤯 Complexidade demais                      │               │
│    │  Apps complicados me desmotivam               │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🫥 Simplesmente esqueço                     │               │
│    │  Sem lembretes eu não faço                    │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  📉 Não vejo resultado                       │               │
│    │  Sinto que não estou evoluindo                │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│  [← Voltar]                              [Próximo →]             │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 4 — "Você gosta de competir com outros?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 4 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Você gosta de competir                                    │
│         com outras pessoas?                                       │
│                                                                   │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🏆 Adoro! Me motiva muito                   │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🤝 Um pouco, mas prefiro cooperar           │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🧘 Prefiro competir comigo mesmo             │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  🚫 Não curto competição                     │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│  [← Voltar]                              [Próximo →]             │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 5 — "Quanto tempo por dia você dedicaria?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 5 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Quanto tempo por dia você                                 │
│         dedicaria à sua evolução?                                 │
│                                                                   │
│                                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│    │          │  │          │  │          │  │          │       │
│    │   5 min  │  │  15 min  │  │  30 min  │  │   1h+    │       │
│    │          │  │          │  │          │  │          │       │
│    │ "Rapidão"│  │ "Focado" │  │"Dedicado"│  │ "All in" │       │
│    │          │  │          │  │          │  │          │       │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                   │
│    ← Cards com label + subtítulo informal.                        │
│      Hover: glow accent. Click: borda + auto-avança.              │
│                                                                   │
│  [← Voltar]                              [Próximo →]             │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 6 — "Qual classe de personagem te representa?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░  Etapa 6 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Qual classe de personagem                                 │
│         te representa?                                            │
│                                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│    │  ⚔️      │  │  🧙      │  │  🛡️      │                     │
│    │          │  │          │  │          │                     │
│    │ Guerreiro│  │  Mago    │  │ Paladino │                     │
│    │          │  │          │  │          │                     │
│    │ Força e  │  │ Sabedoria│  │ Equilí-  │                     │
│    │ discipli-│  │ e conhe- │  │ brio e   │                     │
│    │ na       │  │ cimento  │  │ proteção │                     │
│    └──────────┘  └──────────┘  └──────────┘                     │
│                                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│    │  🏹      │  │  🗡️      │  │  🧝      │                     │
│    │          │  │          │  │          │                     │
│    │ Arqueiro │  │ Assassino│  │  Druida  │                     │
│    │          │  │          │  │          │                     │
│    │ Foco e   │  │ Velocida-│  │ Natureza │                     │
│    │ precisão │  │ de e     │  │ e cura   │                     │
│    │          │  │ eficiênc.│  │          │                     │
│    └──────────┘  └──────────┘  └──────────┘                     │
│                                                                   │
│    ← 6 avatar cards em grid 3x2.                                  │
│      Cada card com ícone, classe, descrição curta.                │
│      Hover: glow + avatar preview ampliado.                       │
│      Click: borda accent + scale 1.05 + auto-avança.              │
│                                                                   │
│  [← Voltar]                              [Próximo →]             │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 7 — "Como você avalia sua vida atual?"**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ██████████████░░░░░░░░░░░░░░░░░░░░░░░  Etapa 7 de 8           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Como você avalia cada                                     │
│         área da sua vida hoje?                                    │
│                                                                   │
│         (arraste os sliders de 1 a 10)                            │
│                                                                   │
│                                                                   │
│    ♥ Saúde                                                       │
│    1 ───────●────────────────────── 10                            │
│                    [6]                                             │
│                                                                   │
│    🧠 Estudos                                                     │
│    1 ──────────────●─────────────── 10                            │
│                       [7]                                         │
│                                                                   │
│    💰 Finanças                                                    │
│    1 ──●──────────────────────────── 10                           │
│           [3]                                                     │
│                                                                   │
│    ⚡ Rotina                                                      │
│    1 ─────────●──────────────────── 10                            │
│                  [5]                                              │
│                                                                   │
│    ← 4 sliders com thumb arrastável.                              │
│      Cor do slider = cor do pilar.                                │
│      Valor numérico exibido abaixo do thumb.                      │
│      Radar chart preview no canto (opcional no desktop).          │
│                                                                   │
│  [← Voltar]                              [Ver Resultado →]       │
└──────────────────────────────────────────────────────────────────┘
```

**Tela 8 — Resultado do Quiz**

```
┌──────────────────────────────────────────────────────────────────┐
│  ◆ LB PRO                                              [✕ Sair] │
│  ████████████████████████████████████████ Completo!              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│         Seu perfil está pronto!                                   │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │                                              │               │
│    │    ┌────────────┐     GUERREIRO              │               │
│    │    │            │     Classe: Guerreiro       │               │
│    │    │   Avatar   │     Foco: Saúde             │               │
│    │    │   Preview  │     Tempo: 15min/dia        │               │
│    │    │  (animado) │     Estilo: Competitivo      │               │
│    │    │            │                              │               │
│    │    └────────────┘                              │               │
│    │                                              │               │
│    │    Radar Chart do Perfil:                     │               │
│    │                                              │               │
│    │           Saúde (6)                           │               │
│    │              ╱╲                               │               │
│    │             ╱  ╲                              │               │
│    │   Rotina  ╱ ·· ╲  Estudos                   │               │
│    │    (5)   ╲ ·  · ╱   (7)                     │               │
│    │          ╲ ·· ╱                              │               │
│    │           ╲  ╱                               │               │
│    │            ╲╱                                │               │
│    │        Finanças (3)                           │               │
│    │                                              │               │
│    │    ← polígono com valores do slider (tela 7) │               │
│    │      animação de "desenho" ao aparecer        │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    ┌──────────────────────────────────────────────┐               │
│    │  Plano recomendado: BOOST (R$ 29,90/mês)    │               │
│    │                                              │               │
│    │  ✓ Mentor IA personalizado para seu perfil   │               │
│    │  ✓ Missões adaptadas ao seu nível inicial    │               │
│    │  ✓ Ranking para alimentar seu lado competitivo│               │
│    │  ✓ Relatórios de progresso detalhados        │               │
│    │                                              │               │
│    │  (highlight dos benefícios relevantes ao      │               │
│    │   perfil detectado pelo quiz)                 │               │
│    └──────────────────────────────────────────────┘               │
│                                                                   │
│    [     Criar Conta Grátis — Começar Jornada!     ]              │
│    ← CTA XL, gradient --gradient-xp, glow, full-width            │
│                                                                   │
│    Já tem conta? [Fazer login]                                    │
│                                                                   │
│    ← Animação de confetti/partículas sutis ao carregar esta tela  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Detalhes de implementação do Quiz:**

| Aspecto | Especificação |
|---------|---------------|
| Transição entre telas | Slide horizontal (300ms ease-out). Voltar = slide reverso. |
| Progress bar | Barra contínua com gradient `--gradient-xp`. Anima ao avançar. |
| Auto-avanço | Telas com seleção única avançam automaticamente após 300ms do click. |
| Tela 7 (sliders) | Requer botão "Ver Resultado" manual (múltiplos inputs). |
| Tela 8 (resultado) | Dados do quiz são salvos no localStorage. Ao criar conta, são vinculados ao perfil. |
| Mobile | Funciona identicamente — cards empilham em 1 coluna, sliders são full-width. |
| Abandono | Se o usuário fecha o quiz, dados parciais são salvos (localStorage) para retomar. |
| Analytics | Cada etapa trackeia completion rate para otimizar funil de conversão. |
| Acessibilidade | Todas as opções navegáveis por teclado (Tab + Enter). Sliders via arrow keys. |

### 11.3 Diretrizes Visuais da Landing

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

## 13. Estratégia de Assets Visuais e Ilustrações

### 13.1 Filosofia de Ilustração

O Life Boost PRO precisa de assets visuais que reforcem a identidade gamer/RPG sem cair no genérico. As ilustrações devem ser consistentes entre si, funcionar sobre fundos escuros e ter um estilo único reconhecível.

**Estilo visual:** Flat ilustrativo com detalhes de linhas finas (line art) e acentos neon. Não é pixel art (diferencial vs Habitica), não é 3D realista (pesado demais), não é cartoon infantil (público é 18-35). Referências: ilustrações de games indie + estética cyberpunk suavizada.

### 13.2 Catálogo de Assets Necessários

#### Avatares Base (MVP — Prioridade P0)

| ID | Descrição | Estilo | Formato | Tamanhos |
|----|-----------|--------|---------|----------|
| AVT-BASE-01 | Guerreiro/Cavaleiro | Armadura leve, postura confiante | SVG | 64px, 80px, 120px, 240px |
| AVT-BASE-02 | Mago/Feiticeiro | Manto, cajado/orbe, aura mística | SVG | Idem |
| AVT-BASE-03 | Arqueiro/Ranger | Arco, capa, visual ágil | SVG | Idem |
| AVT-BASE-04 | Ninja/Assassino | Visual furtivo, máscara, dual blades | SVG | Idem |
| AVT-BASE-05 | Curandeiro/Clérigo | Vestes claras, símbolo de cura | SVG | Idem |
| AVT-BASE-06 | Técnico/Engenheiro | Armadura tech, gadgets, visual moderno | SVG | Idem |
| AVT-BASE-07 | Samurai | Katana, armadura japonesa estilizada | SVG | Idem |
| AVT-BASE-08 | Druida | Elementos naturais, bastão, animal companion | SVG | Idem |

**Especificações de cada avatar:**
- Fundo transparente (mandatory)
- Paleta limitada: 4-5 cores por avatar + preto/branco
- Cada avatar deve ter cores que remetem a pelo menos 1 pilar (ex: Curandeiro = verde/saúde, Técnico = ciano/estudos)
- Proporção: busto e rosto visíveis em 64px, corpo inteiro em 120px+
- Expressão: determinada/confiante (nunca agressiva ou triste)
- Outline sutil de 1px para contraste sobre qualquer fundo escuro

**Estágios de evolução (v1.1):**
- Cada avatar base tem 6 estágios visuais: Nível 1 (base), 10, 25, 50, 75, 100
- Evolução é aditiva (mais detalhes, mais glow, mais equipamentos), nunca subtrativa
- Estágio 1: silhueta simples com cores base
- Estágio 2 (Nv.10): adição de acessório sutil (capa, braçadeira)
- Estágio 3 (Nv.25): armadura/vestes melhoradas, detalhes luminosos
- Estágio 4 (Nv.50): efeito de aura sutil (glow na cor principal)
- Estágio 5 (Nv.75): equipamento épico, partículas visuais
- Estágio 6 (Nv.100): forma final, aura completa, visual lendário

#### Ícones de Pilar (MVP — Prioridade P0)

| Pilar | Ícone | Cor | Variantes |
|-------|-------|-----|-----------|
| Saúde | Coração com pulso (heartbeat) | `--pillar-health` #00E676 | 16px, 20px, 24px, 32px — outlined + filled |
| Estudos | Livro aberto com estrela | `--pillar-intelligence` #00D2FF | Idem |
| Finanças | Moeda/coin com brilho | `--pillar-gold` #FFAB00 | Idem |
| Rotina | Relógio com checkmark | `--pillar-strength` #6C5CE7 | Idem |

Formato: SVG inline (importados como React components). Stroke width: 1.5px (consistente com Lucide).

#### Badges de Conquistas (MVP — Prioridade P1)

| Conquista | Visual do Badge | Formato |
|-----------|----------------|---------|
| Primeiro Passo | Pegada brilhante | SVG 48px × 48px |
| Uma Semana Forte | Fogo com "7" | SVG 48px × 48px |
| Mês de Ferro | Escudo com "30" | SVG 48px × 48px |
| Aprendiz (Nv.5) | Estrela bronze | SVG 48px × 48px |
| Guerreiro (Nv.10) | Espada cruzada | SVG 48px × 48px |
| Veterano (Nv.25) | Coroa simples | SVG 48px × 48px |
| Corpo São (Saúde 10) | Coração com asas | SVG 48px × 48px |
| Mente Afiada (INT 10) | Cérebro brilhante | SVG 48px × 48px |
| Cofre Cheio (GOLD 10) | Baú de tesouro | SVG 48px × 48px |
| Disciplinado (STR 10) | Ampulheta mágica | SVG 48px × 48px |
| Dia Perfeito | Sol radiante | SVG 48px × 48px |
| Centurião (100 tarefas) | Escudo romano | SVG 48px × 48px |
| Lenda (500 tarefas) | Troféu dourado | SVG 48px × 48px |
| Discípulo (10 missões IA) | Pergaminho mágico | SVG 48px × 48px |
| Secreto 01 | Lua com estrela | SVG 48px × 48px |

**Especificações dos badges:**
- 3 estados visuais: desbloqueado (colorido + glow), progresso parcial (colorido + opacity 60%), bloqueado (monocromático cinza)
- Badges secretos quando bloqueados: silhueta de "?" com fundo `--bg-tertiary`
- Cada badge cabe em um container de 48px × 48px com 4px de padding interno
- Cores devem remeter à categoria (streak=âmbar/fogo, pilar=cor do pilar, marco=roxo/primary)

#### Ilustrações de Empty States (MVP — Prioridade P1)

| Tela | Ilustração | Descrição Visual | Tamanho |
|------|-----------|-----------------|---------|
| Dashboard sem tarefas | Avatar dormindo | Avatar do usuário (ou genérico) sentado/dormindo com "zzZ", tom relaxado não triste | 200px × 160px |
| Conquistas vazio | Baú de tesouro fechado | Baú fechado com brilho sutil saindo pelas frestas, atmosfera de mistério | 200px × 160px |
| Ranking sem posição | Pódio vazio | 3 pódios (#1, #2, #3) vazios com spotlight, convidando a ocupar | 200px × 160px |
| Busca sem resultado | Lupa com interrogação | Lupa grande com "?" no centro, linhas pontilhadas ao redor | 160px × 160px |
| Chat do Mentor vazio | Mentor acenando | Figura do Mentor com balão de fala vazio, convidativo | 200px × 160px |
| Primeira vez em tarefas | Espada fincada em pedra | Referência Excalibur — "Sua primeira missão espera por você" | 200px × 160px |
| Sem conquistas na semana | Mapa enrolado | Mapa de aventura enrolado com selo, "Novas conquistas te aguardam" | 160px × 160px |
| Erro de conexão | Cristal partido | Cristal mágico com rachadura, visual de "link quebrado" tematizado | 160px × 160px |

**Especificações dos empty states:**
- Paleta monocromática com 1 cor de acento (a cor relevante da seção)
- Opacity geral reduzida (70-80%) para não competir com a mensagem de texto
- Sem personagens detalhados (custos) — siluetas e objetos icônicos
- Fundo transparente, funciona sobre `--bg-primary` e `--bg-secondary`
- Formato: SVG preferido (escala infinita). PNG com @2x se SVG muito complexo.

#### Ilustrações do Onboarding (MVP — Prioridade P1)

| Tela | Ilustração | Descrição |
|------|-----------|-----------|
| Tela 1 — Boas-vindas | Skyline de cidade fantasia | Cidade estilizada com silhueta de herói olhando para ela. Transmite início de jornada. Cores: gradiente escuro com acentos neon. |
| Tela 2 — Perfil | Escudo com espaço para nome | Escudo/banner de guilda com espaço visual onde o nome do usuário será exibido. |
| Tela 3 — Avatar | (Grid de avatares reais) | Sem ilustração extra — o próprio grid de avatares selecionáveis é o visual. Background com partículas sutis. |
| Tela 4 — Prioridades | 4 pilares como cristais/gemas | 4 cristais nas cores dos pilares, dispostos em losango. Ao selecionar, o cristal "acende". |
| Tela 5 — Resumo/Criação | Explosão de partículas | Animação de "personagem sendo criado" — partículas convergem para o centro formando o avatar. |

#### Ilustrações da Landing Page (MVP — Prioridade P1)

| Seção | Visual | Descrição |
|-------|--------|-----------|
| Hero | Mockup do dashboard | Screenshot real envolto em moldura de device com glow `--accent-primary`. Desktop: moldura laptop. Mobile: moldura phone. |
| Features | Ícones de feature | 4-6 ícones grandes (48px) em estilo consistente com ícones de pilar. Não são os mesmos — são conceitos (IA, Gamificação, etc). |
| Como funciona | 3 ilustrações sequenciais | Mesmo estilo das ilustrações de onboarding, versão compacta (160px × 120px). 1: Avatar → 2: Tarefa + XP → 3: Level up |
| Social proof | Avatares genéricos | Circular, 40px, mostram variedade dos avatares base disponíveis |

### 13.3 Pipeline de Produção de Assets

| Fase | Ação | Responsável | Formato de Entrega |
|------|------|-------------|-------------------|
| 1. Briefing | Documento com descrição, referências, paleta e tamanhos | UX Designer | Markdown (este documento) |
| 2. Sketch | Rascunho preto e branco das ilustrações para aprovação | Ilustrador / IA generativa | PNG draft |
| 3. Produção | Versão final em alta qualidade | Ilustrador / IA generativa + refinamento manual | SVG (vetorial) |
| 4. Otimização | Compressão, limpeza de paths, remoção de metadados | Dev frontend | SVG otimizado (SVGO) |
| 5. Integração | Importação como React components ou arquivos em `public/` | Dev frontend | `.tsx` ou `.svg` |

**Opções de produção de assets:**

| Método | Custo | Qualidade | Consistência | Recomendação |
|--------|-------|-----------|-------------|-------------|
| Ilustrador freelance (Fiverr/99designs) | R$ 500-2.000 para pack completo | Alta | Alta (mesmo artista) | Melhor para avatares e badges |
| IA generativa (Midjourney/DALL-E) + edição | R$ 0-100 (subscrição) | Média-alta | Média (precisa de curadoria e edição para manter coerência) | Bom para empty states e ilustrações de landing |
| Bibliotecas open-source (unDraw, Humaaans) | R$ 0 | Média | Alta (mesmo estilo) | Aceitável para MVP rápido, mas estilo genérico |
| SVG inline customizado (código manual) | R$ 0 (tempo de dev) | Variável | Alta | Melhor para ícones e badges simples |

**Recomendação para MVP:** Combinação de métodos. Avatares via ilustrador freelance (são o coração visual do produto). Badges e ícones via SVG manual. Empty states e onboarding via IA generativa + edição. Landing page usa screenshots reais + ícones SVG.

### 13.4 Organização dos Assets no Projeto

```
public/
├── avatars/
│   ├── base/
│   │   ├── warrior.svg
│   │   ├── mage.svg
│   │   ├── archer.svg
│   │   ├── ninja.svg
│   │   ├── healer.svg
│   │   ├── engineer.svg
│   │   ├── samurai.svg
│   │   └── druid.svg
│   └── evolved/             # v1.1
│       ├── warrior-stage-2.svg
│       ├── warrior-stage-3.svg
│       └── ...
│
├── badges/
│   ├── first-task.svg
│   ├── streak-7.svg
│   ├── streak-30.svg
│   ├── level-5.svg
│   ├── level-10.svg
│   ├── level-25.svg
│   ├── health-10.svg
│   ├── intelligence-10.svg
│   ├── gold-10.svg
│   ├── strength-10.svg
│   ├── daily-clear.svg
│   ├── tasks-100.svg
│   ├── tasks-500.svg
│   ├── ai-disciple.svg
│   └── secret-01.svg
│
├── illustrations/
│   ├── empty-states/
│   │   ├── avatar-sleeping.svg
│   │   ├── treasure-chest.svg
│   │   ├── empty-podium.svg
│   │   ├── search-not-found.svg
│   │   ├── mentor-waving.svg
│   │   ├── sword-in-stone.svg
│   │   ├── rolled-map.svg
│   │   └── broken-crystal.svg
│   │
│   ├── onboarding/
│   │   ├── fantasy-skyline.svg
│   │   ├── guild-shield.svg
│   │   ├── pillar-crystals.svg
│   │   └── creation-particles.json  # Lottie animation
│   │
│   └── landing/
│       ├── feature-ai.svg
│       ├── feature-gamification.svg
│       ├── feature-pillars.svg
│       ├── feature-ranking.svg
│       ├── step-create.svg
│       ├── step-complete.svg
│       └── step-evolve.svg
│
├── icons/
│   ├── pillar-health.svg
│   ├── pillar-intelligence.svg
│   ├── pillar-gold.svg
│   └── pillar-strength.svg
│
└── og/
    ├── og-default.png        # 1200×630px Open Graph
    ├── og-pricing.png
    └── og-share-card.png     # Card para compartilhar progresso
```

**Regras de nomeação:**
- kebab-case para todos os arquivos
- Prefixo por tipo quando relevante: `pillar-`, `badge-`, `empty-`
- SVGs devem ter `viewBox` definido e sem width/height hardcoded (responsivo via CSS)
- Tamanho máximo por SVG: 15KB (otimizado com SVGO)
- PNGs apenas quando necessário (Open Graph, mockups): max 200KB, @2x resolution

### 13.5 Mentor IA — Identidade Visual

O Mentor precisa de uma identidade visual própria para não ser apenas "um ícone de chat".

| Aspecto | Definição |
|---------|-----------|
| Aparência | Figura sábia de RPG — mago/sábio com capuz e orbe luminoso. Não é um avatar jogável — é um NPC. |
| Expressão | Calma, sábia, levemente misteriosa. Nunca sorridente demais (não é mascote infantil). |
| Cor dominante | `--accent-cyan` — distingue visualmente dos avatares dos jogadores (que usam todas as cores) |
| Tamanhos necessários | 24px (inline no chat), 40px (header do chat), 80px (tela de boas-vindas do chat), 120px (onboarding) |
| Animações | Orbe na mão pulsa sutilmente (CSS animation: glow 3s infinite). No typing indicator, 3 pontos flutuam sobre o orbe. |
| Consistência | O mesmo design do Mentor aparece em: chat, notificações do dashboard, relatório semanal, onboarding, alertas proativos |

---

## 14. Checklist de Qualidade por Tela

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
