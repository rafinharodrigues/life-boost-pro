# Documento de Elicitação de Requisitos — Life Boost PRO

### Software Requirements Specification (SRS)

**Versão:** 1.0  
**Data:** 16/03/2026  
**Baseado no:** PRD Life Boost PRO v1.0  
**Método:** Elicitação por análise de domínio, benchmarking e cenários de uso  
**Autor:** Claude (Engenheiro de Requisitos Sênior)

---

## 1. Introdução

### 1.1 Propósito

Este documento especifica os requisitos funcionais, não-funcionais, regras de negócio e restrições do sistema Life Boost PRO. Serve como contrato entre stakeholders e equipe de desenvolvimento, sendo a base para design, implementação e testes.

### 1.2 Escopo do Sistema

O Life Boost PRO é uma plataforma web responsiva de gamificação de vida pessoal com inteligência artificial. O sistema permite que usuários organizem diferentes áreas da vida (saúde, estudos, finanças, rotina) através de mecânicas de RPG (XP, níveis, avatar, conquistas, ranking), com um mentor de IA que personaliza a experiência.

### 1.3 Definições e Acrônimos

| Termo | Definição |
|-------|-----------|
| Pilar | Categoria de vida do usuário (Saúde, Estudos, Finanças, Rotina) |
| Missão | Tarefa sugerida pela IA com recompensa de XP |
| Quest | Conjunto de missões agrupadas por objetivo |
| Streak | Sequência de dias consecutivos com atividade |
| XP | Experience Points — pontos de experiência ganhos ao completar tarefas |
| Avatar | Representação visual do personagem do usuário |
| Mentor IA | Agente de IA que interage com o usuário como guia personalizado |
| RLS | Row Level Security — política de segurança no banco de dados |
| JWT | JSON Web Token — token de autenticação |
| MRR | Monthly Recurring Revenue — receita recorrente mensal |

### 1.4 Referências

- PRD Life Boost PRO v1.0
- Análise de Unit Economics Life Boost PRO
- Benchmarks: Habitica, Duolingo, LifeUp, Todoist

---

## 2. Descrição Geral

### 2.1 Perspectiva do Produto

O sistema é standalone (não depende de outro software), web-based, acessado via navegador. Integra-se com serviços externos: Supabase (banco/auth), API Anthropic (IA), Stripe (pagamentos). Futuramente terá app mobile nativo.

### 2.2 Perfis de Usuário

| Perfil | Descrição | Necessidades Principais |
|--------|-----------|------------------------|
| Jogador Casual | Usa o app esporadicamente, foco em 1-2 pilares | Simplicidade, feedback rápido, baixa fricção |
| Jogador Dedicado | Usa diariamente, completa todas as missões | Profundidade, desafios crescentes, ranking |
| Jogador Competitivo | Foco em ranking e conquistas | Leaderboard justo, badges exclusivos, comparação social |
| Usuário Novo | Primeiro contato com o sistema | Onboarding claro, tutorial, valor percebido rápido |
| Administrador | Gestão do sistema (interno) | Dashboard admin, métricas, moderação |

### 2.3 Premissas

- PR01: O usuário possui conexão com internet para acessar a plataforma
- PR02: O usuário utiliza um navegador moderno (Chrome, Firefox, Safari, Edge — últimas 2 versões)
- PR03: O usuário é honesto no auto-reporte de atividades (mitigado por validação de IA)
- PR04: A API da Anthropic mantém disponibilidade > 99.5%
- PR05: O Supabase mantém disponibilidade > 99.9%
- PR06: O volume inicial não excede 10.000 usuários nos primeiros 6 meses

### 2.4 Restrições

- RE01: O MVP deve ser entregue em até 10 semanas
- RE02: O custo de infraestrutura não deve ultrapassar R$ 800/mês nos primeiros 3 meses
- RE03: O sistema deve funcionar sem app nativo (web responsivo apenas no MVP)
- RE04: Toda comunicação com a API de IA deve ser feita pelo backend (API key nunca exposta)
- RE05: O sistema deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados)

---

## 3. Requisitos Funcionais

### 3.1 Módulo de Autenticação e Conta (AUTH)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| AUTH-001 | O sistema deve permitir cadastro com email e senha | Must | MVP |
| AUTH-002 | O sistema deve permitir cadastro/login via Google OAuth 2.0 | Must | MVP |
| AUTH-003 | O sistema deve enviar email de verificação após cadastro por email | Must | MVP |
| AUTH-004 | O sistema deve permitir recuperação de senha via email | Must | MVP |
| AUTH-005 | O sistema deve manter sessão ativa por 30 dias (refresh token) | Must | MVP |
| AUTH-006 | O sistema deve permitir logout em todos os dispositivos | Should | v1.1 |
| AUTH-007 | O sistema deve permitir exclusão de conta (LGPD) com período de carência de 30 dias | Must | MVP |
| AUTH-008 | O sistema deve permitir login via Magic Link (link enviado por email) | Could | v1.2 |
| AUTH-009 | O sistema deve bloquear conta após 5 tentativas de login falhas consecutivas por 15 minutos | Must | MVP |
| AUTH-010 | O sistema deve exibir termos de uso e política de privacidade no cadastro, exigindo aceite | Must | MVP |

**Regras de negócio:**
- RN-AUTH-01: Senha deve ter mínimo 8 caracteres, 1 maiúscula, 1 número
- RN-AUTH-02: Email deve ser único no sistema (não pode haver duas contas com mesmo email)
- RN-AUTH-03: Ao excluir conta, todos os dados pessoais devem ser removidos em até 30 dias conforme LGPD
- RN-AUTH-04: Token JWT expira em 1 hora; refresh token em 30 dias

### 3.2 Módulo de Onboarding (ONB)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| ONB-001 | O sistema deve apresentar um fluxo de onboarding guiado na primeira vez que o usuário acessa | Must | MVP |
| ONB-002 | O onboarding deve coletar o nome de exibição do usuário | Must | MVP |
| ONB-003 | O onboarding deve permitir que o usuário escolha um avatar base entre pelo menos 6 opções | Must | MVP |
| ONB-004 | O onboarding deve perguntar quais pilares são prioridade para o usuário (multi-select) | Must | MVP |
| ONB-005 | O onboarding deve perguntar os objetivos principais do usuário em texto livre (máx 200 caracteres por pilar) | Should | MVP |
| ONB-006 | O onboarding deve apresentar um resumo antes de finalizar, permitindo edição | Must | MVP |
| ONB-007 | Ao finalizar o onboarding, a IA deve gerar as primeiras 3 missões personalizadas | Must | MVP |
| ONB-008 | O onboarding deve ser completável em no máximo 5 telas/etapas | Must | MVP |
| ONB-009 | O sistema deve permitir pular o onboarding e completá-lo depois | Should | MVP |
| ONB-010 | O sistema deve exibir uma animação de "personagem criado" ao finalizar o onboarding | Should | MVP |

**Regras de negócio:**
- RN-ONB-01: O usuário inicia no nível 1 com 0 XP em todos os pilares
- RN-ONB-02: O avatar base selecionado pode ser alterado depois (mas perde evolução visual se trocar de classe)
- RN-ONB-03: As prioridades informadas no onboarding alimentam o contexto inicial do Mentor IA

### 3.3 Módulo de Dashboard Principal (DASH)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| DASH-001 | O dashboard deve exibir o nível geral do usuário com barra de progresso para o próximo nível | Must | MVP |
| DASH-002 | O dashboard deve exibir os 4 pilares com nível individual e barra de XP de cada um | Must | MVP |
| DASH-003 | O dashboard deve exibir o avatar do usuário no estado visual atual | Must | MVP |
| DASH-004 | O dashboard deve listar as missões ativas do dia (pendentes e completadas) | Must | MVP |
| DASH-005 | O dashboard deve exibir o streak atual (dias consecutivos) com destaque visual | Must | MVP |
| DASH-006 | O dashboard deve exibir notificações do Mentor IA (dicas, alertas, feedback) | Must | MVP |
| DASH-007 | O dashboard deve exibir um resumo rápido de conquistas recentes (últimas 3) | Should | MVP |
| DASH-008 | O dashboard deve ter atalho rápido para adicionar tarefa em qualquer pilar | Must | MVP |
| DASH-009 | O dashboard deve exibir um gráfico de atividade dos últimos 7 dias (heatmap ou barras) | Should | MVP |
| DASH-010 | O dashboard deve ser totalmente funcional em telas de 360px de largura (mobile) | Must | MVP |
| DASH-011 | O dashboard deve carregar em no máximo 3 segundos na primeira visita | Must | MVP |
| DASH-012 | O dashboard deve exibir posição no ranking semanal (se disponível) | Should | v1.1 |

**Regras de negócio:**
- RN-DASH-01: Pilares com progresso abaixo de 20% do XP esperado semanal devem exibir indicador visual de alerta
- RN-DASH-02: O streak é calculado considerando o fuso horário configurado pelo usuário
- RN-DASH-03: "Dia ativo" = pelo menos 1 tarefa completada naquele dia

### 3.4 Módulo de Tarefas e Missões (TASK)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| TASK-001 | O usuário deve poder criar tarefas manuais vinculadas a um pilar | Must | MVP |
| TASK-002 | Cada tarefa deve ter: título (obrigatório), descrição (opcional), pilar, dificuldade, data de vencimento (opcional) | Must | MVP |
| TASK-003 | As dificuldades disponíveis são: Fácil (10 XP), Médio (25 XP), Difícil (50 XP), Épico (100 XP) | Must | MVP |
| TASK-004 | O usuário deve poder marcar uma tarefa como concluída com um toque/clique | Must | MVP |
| TASK-005 | Ao completar uma tarefa, o sistema deve exibir animação de XP ganho e atualizar barras de progresso | Must | MVP |
| TASK-006 | O usuário deve poder criar tarefas recorrentes (diária, semanal, personalizada) | Must | MVP |
| TASK-007 | Tarefas recorrentes devem gerar automaticamente uma nova instância no período configurado | Must | MVP |
| TASK-008 | O usuário deve poder editar tarefas pendentes (título, descrição, dificuldade, data) | Must | MVP |
| TASK-009 | O usuário deve poder excluir tarefas pendentes | Must | MVP |
| TASK-010 | Tarefas vencidas (passaram da data) devem ser marcadas automaticamente como "expiradas" | Should | MVP |
| TASK-011 | O sistema deve exibir tarefas agrupadas por pilar com filtros (todas, pendentes, completadas, expiradas) | Must | MVP |
| TASK-012 | A IA deve gerar missões diárias personalizadas automaticamente à meia-noite (fuso do usuário) | Must | MVP |
| TASK-013 | Missões geradas pela IA devem ser visualmente distintas das tarefas manuais (badge "IA" ou ícone) | Must | MVP |
| TASK-014 | O usuário deve poder rejeitar uma missão da IA (sem penalidade de XP) | Should | MVP |
| TASK-015 | A IA deve gerar missões de dificuldade progressiva baseada no histórico do usuário | Must | MVP |
| TASK-016 | O sistema deve limitar missões IA/dia conforme o plano do usuário | Must | MVP |
| TASK-017 | Ao completar todas as missões do dia, exibir animação especial ("Daily Clear!") | Should | MVP |
| TASK-018 | O usuário deve poder reordenar tarefas por drag-and-drop | Could | v1.1 |
| TASK-019 | O sistema deve suportar subtarefas (checklist dentro de uma tarefa) | Could | v1.2 |

**Regras de negócio:**
- RN-TASK-01: XP base por dificuldade: Fácil=10, Médio=25, Difícil=50, Épico=100
- RN-TASK-02: Multiplicador de streak: dias 1-6=1x, dias 7-13=1.25x, dias 14-29=1.5x, dias 30+=2x
- RN-TASK-03: XP final = XP base × multiplicador de streak (arredondado para cima)
- RN-TASK-04: Tarefas expiradas não rendem XP e não contam para streak
- RN-TASK-05: Missões da IA rejeitadas não penalizam, mas a IA ajusta o perfil (reduz dificuldade ou muda foco)
- RN-TASK-06: Limites de missões IA/dia: Free=3, Starter=8, Boost=20, Ultra=ilimitado
- RN-TASK-07: Tarefas completadas não podem ser revertidas (evitar farming de XP)
- RN-TASK-08: Máximo de 200 tarefas ativas para evitar abuso (mesmo plano Ultra)

### 3.5 Módulo de Sistema de Progressão (PROG)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| PROG-001 | O sistema deve calcular o nível do usuário em cada pilar com base no XP acumulado | Must | MVP |
| PROG-002 | A fórmula de XP por nível deve ser: XP_necessário(n) = 100 × n^1.5 (arredondado) | Must | MVP |
| PROG-003 | Ao subir de nível, o sistema deve exibir animação de "Level Up!" com efeitos visuais e sonoros (opcional) | Must | MVP |
| PROG-004 | O nível geral do usuário deve ser a média ponderada dos 4 pilares | Must | MVP |
| PROG-005 | O peso padrão de cada pilar no nível geral é 25% (igual), mas o usuário pode personalizar os pesos | Could | v1.2 |
| PROG-006 | O sistema deve calcular e exibir o streak atual (dias consecutivos com atividade) | Must | MVP |
| PROG-007 | O streak deve resetar para 0 se o usuário não completar nenhuma tarefa em um dia | Must | MVP |
| PROG-008 | O sistema deve exibir o maior streak já alcançado (recorde pessoal) | Should | MVP |
| PROG-009 | O sistema deve registrar histórico de XP diário para gráficos de evolução | Must | MVP |
| PROG-010 | O sistema deve calcular e exibir estatísticas: total de tarefas completadas, XP total, dias ativos | Must | MVP |

**Regras de negócio:**
- RN-PROG-01: Nível máximo por pilar: 100. Nível geral máximo: 100.
- RN-PROG-02: Tabela de XP acumulado para referência: Nível 5=745 XP, Nível 10=3.873 XP, Nível 25=31.623 XP, Nível 50=177.828 XP, Nível 100=1.000.000 XP
- RN-PROG-03: O streak considera o fuso horário do usuário. O "dia" reseta à 00:00 do fuso configurado.
- RN-PROG-04: Se o usuário não configurar fuso, usar o fuso detectado pelo navegador

### 3.6 Módulo de Avatar (AVT)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| AVT-001 | O sistema deve oferecer pelo menos 6 avatares base para escolha no onboarding | Must | MVP |
| AVT-002 | O avatar deve ser exibido no dashboard, perfil e ranking | Must | MVP |
| AVT-003 | O avatar deve evoluir visualmente em marcos de nível: 1, 10, 25, 50, 75, 100 | Should | v1.1 |
| AVT-004 | Cada evolução visual deve ser claramente diferente da anterior (não apenas mudança de cor) | Should | v1.1 |
| AVT-005 | O sistema deve desbloquear itens visuais (equipamentos, acessórios) ao completar conquistas | Should | v1.1 |
| AVT-006 | Itens visuais desbloqueados devem ser equipáveis e visíveis no avatar | Should | v1.1 |
| AVT-007 | O plano Free deve ter o avatar base estático (sem evolução) | Must | v1.1 |
| AVT-008 | Skins exclusivas devem estar disponíveis para planos Boost e Ultra | Should | v1.1 |
| AVT-009 | O avatar deve ser renderizado em formato SVG ou PNG com fundo transparente | Must | MVP |
| AVT-010 | O usuário deve poder trocar o avatar base a qualquer momento nas configurações | Should | MVP |

**Regras de negócio:**
- RN-AVT-01: Avatares base são gratuitos para todos os planos
- RN-AVT-02: Evolução visual é bloqueada no plano Free (avatar permanece no estágio 1)
- RN-AVT-03: Se o usuário fizer downgrade de plano, o avatar não regride, mas para de evoluir
- RN-AVT-04: Itens de conquistas são permanentes (não perdem ao mudar de plano)

### 3.7 Módulo de Conquistas (ACH)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| ACH-001 | O sistema deve ter pelo menos 15 conquistas no MVP, categorizadas | Must | MVP |
| ACH-002 | Conquistas devem ser verificadas automaticamente quando a condição é atingida | Must | MVP |
| ACH-003 | Ao desbloquear uma conquista, exibir notificação toast com animação | Must | MVP |
| ACH-004 | O sistema deve ter uma tela de "Conquistas" listando todas (desbloqueadas e bloqueadas) | Must | MVP |
| ACH-005 | Conquistas bloqueadas devem exibir condição para desbloqueio (exceto conquistas secretas) | Must | MVP |
| ACH-006 | Conquistas secretas devem exibir "???" até serem desbloqueadas | Should | MVP |
| ACH-007 | Cada conquista deve ter um ícone/badge visual único | Must | MVP |
| ACH-008 | O sistema deve rastrear progresso parcial de conquistas (ex: "7/30 dias de streak") | Should | MVP |
| ACH-009 | Conquistas devem conceder XP bônus ao serem desbloqueadas | Should | MVP |

**Catálogo inicial de conquistas (MVP):**

| Código | Nome | Condição | XP Bônus | Categoria |
|--------|------|----------|----------|-----------|
| FIRST_TASK | Primeiro Passo | Completar a primeira tarefa | 50 | Marco |
| STREAK_7 | Uma Semana Forte | Streak de 7 dias | 100 | Streak |
| STREAK_30 | Mês de Ferro | Streak de 30 dias | 500 | Streak |
| LEVEL_5 | Aprendiz | Alcançar nível geral 5 | 200 | Marco |
| LEVEL_10 | Guerreiro | Alcançar nível geral 10 | 500 | Marco |
| LEVEL_25 | Veterano | Alcançar nível geral 25 | 1500 | Marco |
| HEALTH_10 | Corpo São | Alcançar nível 10 no pilar Saúde | 300 | Pilar |
| INT_10 | Mente Afiada | Alcançar nível 10 no pilar Estudos | 300 | Pilar |
| GOLD_10 | Cofre Cheio | Alcançar nível 10 no pilar Finanças | 300 | Pilar |
| STR_10 | Disciplinado | Alcançar nível 10 no pilar Rotina | 300 | Pilar |
| ALL_DAILY | Dia Perfeito | Completar todas as missões do dia | 75 | Desafio |
| TASKS_100 | Centurião | Completar 100 tarefas total | 400 | Marco |
| TASKS_500 | Lenda | Completar 500 tarefas total | 2000 | Marco |
| AI_ACCEPT_10 | Discípulo | Completar 10 missões da IA | 150 | Desafio |
| SECRET_01 | ??? | Completar tarefa à meia-noite | 200 | Segredo |

### 3.8 Módulo de Mentor IA (AI)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| AI-001 | O sistema deve gerar missões diárias personalizadas via API Anthropic | Must | MVP |
| AI-002 | O contexto enviado à IA deve incluir: perfil do usuário, nível/XP por pilar, histórico dos últimos 7 dias, objetivos, streak atual | Must | MVP |
| AI-003 | A IA deve variar as missões (não repetir a mesma missão em dias consecutivos) | Must | MVP |
| AI-004 | A IA deve priorizar pilares com menor progresso relativo | Must | MVP |
| AI-005 | A IA deve ajustar dificuldade: se o usuário completou >80% das missões nos últimos 7 dias, aumentar dificuldade; se completou <40%, diminuir | Must | MVP |
| AI-006 | O sistema deve gerar relatório semanal por IA (todo domingo à noite ou segunda de manhã) | Should | MVP |
| AI-007 | O relatório semanal deve conter: resumo de progresso, pilar mais forte/fraco, sugestão de foco, mensagem motivacional | Should | MVP |
| AI-008 | O Mentor deve responder a interações do usuário em formato de chat contextual | Should | v1.1 |
| AI-009 | O Mentor deve enviar alertas proativos quando detectar padrões negativos (3+ dias sem atividade) | Should | v1.1 |
| AI-010 | O sistema deve cachear respostas de IA quando o contexto não mudou significativamente | Must | MVP |
| AI-011 | Todas as chamadas à API devem ter timeout de 30 segundos com fallback | Must | MVP |
| AI-012 | Se a API de IA estiver indisponível, o sistema deve funcionar normalmente sem missões de IA (modo degradado) | Must | MVP |
| AI-013 | O system prompt do Mentor deve ter personalidade consistente (tom motivacional, gamer, não genérico) | Must | MVP |
| AI-014 | O sistema deve registrar todas as interações com a IA para controle de custo e melhoria | Must | MVP |
| AI-015 | As respostas da IA devem ser formatadas em JSON estruturado (não texto livre) para parsing seguro | Must | MVP |
| AI-016 | O sistema deve validar a resposta da IA antes de exibir ao usuário (sanitizar, verificar formato) | Must | MVP |

**Regras de negócio:**
- RN-AI-01: O system prompt NUNCA deve ser exposto ao frontend ou ao usuário
- RN-AI-02: Limite de tokens por chamada: input máx 2000, output máx 1000
- RN-AI-03: Se o usuário atingir o limite de chamadas IA/dia, exibir mensagem de upgrade com countdown para reset
- RN-AI-04: Horário de geração de missões diárias: 00:05 do fuso do usuário (5 minutos de margem)
- RN-AI-05: Relatório semanal gerado domingo 23:00 ou segunda 06:00 (configurável)
- RN-AI-06: A IA não deve gerar missões que possam ser prejudiciais à saúde (ex: "fique 24h sem comer")
- RN-AI-07: O modelo utilizado deve ser claude-sonnet para custo-benefício; considerar claude-haiku para funções simples

### 3.9 Módulo de Ranking/Leaderboard (RANK)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| RANK-001 | O sistema deve calcular ranking semanal de todos os usuários por XP ganho na semana | Must | v1.1 |
| RANK-002 | O ranking semanal deve resetar toda segunda-feira 00:00 UTC | Must | v1.1 |
| RANK-003 | O sistema deve exibir ranking global (all-time) por XP total | Should | v1.1 |
| RANK-004 | O sistema deve exibir ranking por pilar individual | Could | v1.2 |
| RANK-005 | O usuário deve ver sua posição no ranking mesmo que não esteja no top | Must | v1.1 |
| RANK-006 | O ranking deve exibir: posição, avatar, nome, nível, XP do período | Must | v1.1 |
| RANK-007 | O top 3 do ranking semanal deve receber badges visuais temporários (ouro, prata, bronze) | Should | v1.1 |
| RANK-008 | O sistema deve ter ranking entre amigos (usuários que se seguem mutuamente) | Should | v1.2 |
| RANK-009 | O usuário deve poder optar por não aparecer no ranking público (privacidade) | Must | v1.1 |
| RANK-010 | O sistema deve implementar anti-cheating: limite máximo de XP/dia para evitar farming | Must | v1.1 |

**Regras de negócio:**
- RN-RANK-01: XP máximo por dia: 500 (tarefas manuais) + sem limite de missões IA completadas
- RN-RANK-02: Rankings são pré-calculados (snapshot), não em tempo real (performance)
- RN-RANK-03: Snapshots de ranking gerados a cada 1 hora
- RN-RANK-04: Usuários com conta com menos de 7 dias não aparecem no ranking (evitar contas descartáveis)

### 3.10 Módulo de Pagamento e Planos (PAY)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| PAY-001 | O sistema deve integrar com Stripe para processamento de pagamentos | Must | v1.1 |
| PAY-002 | O sistema deve oferecer 4 planos: Free, Starter, Boost (destaque), Ultra | Must | v1.1 |
| PAY-003 | Cada plano pago deve oferecer ciclo mensal e anual (com desconto ~30-33%) | Must | v1.1 |
| PAY-004 | A tela de pricing deve exibir o plano anual como padrão, com toggle para mensal | Must | v1.1 |
| PAY-005 | O plano Boost deve ser visualmente destacado como "Recomendado" | Must | v1.1 |
| PAY-006 | O sistema deve aplicar limites de recursos conforme o plano ativo do usuário | Must | v1.1 |
| PAY-007 | O usuário deve poder fazer upgrade de plano a qualquer momento (pro-rata) | Must | v1.1 |
| PAY-008 | O usuário deve poder fazer downgrade ao final do ciclo de cobrança atual | Must | v1.1 |
| PAY-009 | O sistema deve enviar email de confirmação de pagamento | Must | v1.1 |
| PAY-010 | O sistema deve enviar email de aviso 3 dias antes da renovação | Should | v1.1 |
| PAY-011 | O sistema deve processar cancelamentos sem retenção forçada | Must | v1.1 |
| PAY-012 | O sistema deve oferecer trial de 7 dias do plano Boost para novos usuários | Should | v1.1 |
| PAY-013 | O sistema deve gerenciar webhook do Stripe para atualizar status de assinatura em tempo real | Must | v1.1 |
| PAY-014 | O sistema deve tratar falhas de pagamento com retry automático (Stripe dunning) | Must | v1.1 |
| PAY-015 | O sistema deve exibir histórico de faturas no perfil do usuário | Should | v1.1 |

**Regras de negócio:**
- RN-PAY-01: Ao fazer downgrade, recursos premium continuam até o fim do ciclo pago
- RN-PAY-02: Ao cancelar, o usuário volta para Free ao fim do ciclo. Dados são mantidos, mas recursos limitados.
- RN-PAY-03: Trial de 7 dias não exige cartão de crédito
- RN-PAY-04: Após trial, retorna ao Free se não converter
- RN-PAY-05: Webhook do Stripe deve ser idempotente (processar o mesmo evento múltiplas vezes sem efeito colateral)
- RN-PAY-06: Em caso de falha de pagamento, manter plano ativo por até 7 dias (período de graça)

### 3.11 Módulo de Perfil e Configurações (PROF)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| PROF-001 | O usuário deve poder editar nome de exibição | Must | MVP |
| PROF-002 | O usuário deve poder alterar email (com verificação do novo email) | Must | MVP |
| PROF-003 | O usuário deve poder alterar senha | Must | MVP |
| PROF-004 | O usuário deve poder configurar fuso horário | Must | MVP |
| PROF-005 | O perfil público deve exibir: avatar, nome, nível geral, nível por pilar, conquistas selecionadas (até 5) | Should | v1.1 |
| PROF-006 | O usuário deve poder escolher quais conquistas exibir no perfil público | Should | v1.1 |
| PROF-007 | O usuário deve poder configurar perfil como privado (não aparece em ranking ou busca) | Must | v1.1 |
| PROF-008 | O usuário deve poder configurar notificações por email (on/off por tipo) | Should | v1.1 |
| PROF-009 | O usuário deve poder exportar seus dados em JSON (LGPD — portabilidade) | Must | v1.1 |
| PROF-010 | O sistema deve exibir painel de estatísticas gerais no perfil (total de tarefas, XP, dias ativos, maior streak) | Must | MVP |

### 3.12 Módulo de Landing Page (LAND)

| ID | Requisito | Prioridade | Release |
|----|-----------|------------|---------|
| LAND-001 | O sistema deve ter uma landing page pública otimizada para conversão | Must | MVP |
| LAND-002 | A landing page deve conter: hero section, features, como funciona, pricing, CTA de cadastro | Must | MVP |
| LAND-003 | A landing page deve ter estética dark/neon consistente com o app | Must | MVP |
| LAND-004 | A landing page deve carregar em menos de 2 segundos (Lighthouse > 90) | Must | MVP |
| LAND-005 | A landing page deve ser otimizada para SEO (meta tags, Open Graph, schema.org) | Should | MVP |
| LAND-006 | A landing page deve ter CTA visível em todas as seções (sticky header ou botões repetidos) | Must | MVP |
| LAND-007 | A landing page deve exibir a tabela de preços com plano Boost em destaque | Must | v1.1 |
| LAND-008 | A landing page deve funcionar perfeitamente em mobile | Must | MVP |
| LAND-009 | A landing page deve ter animações sutis de scroll (não pesadas) | Could | MVP |

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance (PERF)

| ID | Requisito | Métrica |
|----|-----------|---------|
| PERF-001 | Tempo de carregamento inicial do dashboard | < 3 segundos em 4G |
| PERF-002 | Tempo de resposta de API (endpoints internos) | < 500ms (p95) |
| PERF-003 | Tempo de resposta da IA (geração de missões) | < 10 segundos (com loading state) |
| PERF-004 | Tempo de carregamento da landing page | < 2 segundos (Lighthouse > 90) |
| PERF-005 | First Contentful Paint (FCP) | < 1.5 segundos |
| PERF-006 | Largest Contentful Paint (LCP) | < 2.5 segundos |
| PERF-007 | Cumulative Layout Shift (CLS) | < 0.1 |
| PERF-008 | O sistema deve suportar 1.000 usuários simultâneos sem degradação | Tempo de resposta < 1s |
| PERF-009 | Operação de completar tarefa (incluindo cálculo de XP) | < 300ms |

### 4.2 Segurança (SEC)

| ID | Requisito |
|----|-----------|
| SEC-001 | Toda comunicação deve ser via HTTPS (TLS 1.2+) |
| SEC-002 | Senhas devem ser armazenadas com hash bcrypt (Supabase Auth padrão) |
| SEC-003 | API keys de serviços externos devem ser armazenadas apenas em variáveis de ambiente do servidor |
| SEC-004 | Implementar Row Level Security (RLS) em todas as tabelas do Supabase |
| SEC-005 | Sanitizar todos os inputs do usuário contra XSS e SQL injection |
| SEC-006 | Implementar rate limiting em todos os endpoints de API (por IP e por usuário) |
| SEC-007 | Implementar CORS restritivo (apenas domínio da aplicação) |
| SEC-008 | Tokens JWT devem expirar em 1 hora com refresh token de 30 dias |
| SEC-009 | Webhooks do Stripe devem ser validados com assinatura (webhook secret) |
| SEC-010 | Logs de acesso e erros devem ser mantidos por 90 dias |
| SEC-011 | Dados pessoais sensíveis (email) devem ser tratados conforme LGPD |
| SEC-012 | Respostas da IA devem ser sanitizadas antes de exibição (prevenir injection via prompt) |

### 4.3 Usabilidade (USE)

| ID | Requisito |
|----|-----------|
| USE-001 | O sistema deve ser utilizável sem necessidade de manual ou documentação |
| USE-002 | Ações destrutivas (excluir conta, excluir tarefa) devem exigir confirmação |
| USE-003 | O sistema deve fornecer feedback visual imediato para toda ação do usuário (loading states, toasts, animações) |
| USE-004 | O sistema deve ser navegável por teclado (acessibilidade básica) |
| USE-005 | O contraste de texto deve atender WCAG 2.1 nível AA |
| USE-006 | Mensagens de erro devem ser em português, claras e com sugestão de solução |
| USE-007 | O onboarding deve ser completável em menos de 2 minutos |
| USE-008 | O sistema deve funcionar em modo offline gracioso (exibir último estado salvo + mensagem de conectividade) |

### 4.4 Disponibilidade e Confiabilidade (AVAIL)

| ID | Requisito |
|----|-----------|
| AVAIL-001 | O sistema deve ter uptime de 99.5% (excluindo manutenções programadas) |
| AVAIL-002 | Manutenções programadas devem ser comunicadas com 24h de antecedência |
| AVAIL-003 | O sistema deve funcionar em modo degradado se a API de IA estiver indisponível |
| AVAIL-004 | Backups do banco de dados devem ser automáticos e diários (Supabase provê) |
| AVAIL-005 | O sistema deve ter monitoramento de erros em tempo real (Sentry) |
| AVAIL-006 | Alertas de erro crítico devem ser enviados em até 5 minutos |

### 4.5 Escalabilidade (SCAL)

| ID | Requisito |
|----|-----------|
| SCAL-001 | A arquitetura deve suportar crescimento de 0 a 10.000 usuários sem refatoração |
| SCAL-002 | O sistema de geração de missões IA deve ser assíncrono (não bloquear a thread principal) |
| SCAL-003 | Rankings devem ser pré-calculados (snapshot) para evitar queries pesadas em tempo real |
| SCAL-004 | Assets estáticos devem ser servidos via CDN (Vercel CDN) |
| SCAL-005 | O schema do banco deve usar índices em colunas frequentemente filtradas (user_id, status, created_at) |

### 4.6 Compatibilidade (COMP)

| ID | Requisito |
|----|-----------|
| COMP-001 | Chrome (últimas 2 versões) |
| COMP-002 | Firefox (últimas 2 versões) |
| COMP-003 | Safari (últimas 2 versões, incluindo iOS Safari) |
| COMP-004 | Edge (últimas 2 versões) |
| COMP-005 | Resoluções: 360px (mobile) até 1920px (desktop) |
| COMP-006 | O sistema deve funcionar com JavaScript desabilitado em modo leitura (landing page) — degradação graceful |

### 4.7 Internacionalização (I18N)

| ID | Requisito | Release |
|----|-----------|---------|
| I18N-001 | O MVP deve estar em Português (pt-BR) | MVP |
| I18N-002 | A arquitetura deve suportar internacionalização (i18n) futura sem refatoração | MVP |
| I18N-003 | Strings da UI devem estar em arquivos de tradução, não hardcoded | MVP |
| I18N-004 | Suporte a Inglês (en-US) | v1.2 |
| I18N-005 | O Mentor IA deve responder no idioma configurado pelo usuário | v1.2 |

---

## 5. Regras de Negócio Consolidadas

### 5.1 Regras de Gamificação

| ID | Regra |
|----|-------|
| RN-G01 | XP necessário para próximo nível = 100 × nível_atual^1.5 (arredondado para cima) |
| RN-G02 | XP base: Fácil=10, Médio=25, Difícil=50, Épico=100 |
| RN-G03 | Multiplicador de streak: 1-6 dias=1x, 7-13=1.25x, 14-29=1.5x, 30+=2x |
| RN-G04 | XP final de tarefa = ceil(XP_base × multiplicador_streak) |
| RN-G05 | Nível geral = floor(média dos níveis dos 4 pilares) |
| RN-G06 | Nível máximo: 100 por pilar e 100 geral |
| RN-G07 | XP de conquista é adicionado ao pilar mais fraco do usuário |
| RN-G08 | Streak reseta à 00:00 do fuso do usuário se nenhuma tarefa foi completada no dia anterior |
| RN-G09 | Limite de XP manual por dia: 500 (anti-farming). Missões IA não contam nesse limite. |
| RN-G10 | Tarefas completadas são irreversíveis |

### 5.2 Regras de Planos e Limites

| ID | Regra |
|----|-------|
| RN-P01 | Limites por plano devem ser verificados em tempo real antes de cada ação limitada |
| RN-P02 | Upgrade é imediato, com cobrança proporcional ao restante do ciclo |
| RN-P03 | Downgrade efetivado apenas ao fim do ciclo de cobrança atual |
| RN-P04 | Dados criados durante plano superior são mantidos no downgrade, mas acesso a recursos premium é bloqueado |
| RN-P05 | Se ultrapassar limite de tarefas no downgrade, as excedentes ficam read-only (não pode criar novas até estar dentro do limite) |
| RN-P06 | Período de graça para falha de pagamento: 7 dias |
| RN-P07 | Após 7 dias sem pagamento, downgrade automático para Free |

### 5.3 Regras de IA

| ID | Regra |
|----|-------|
| RN-IA01 | Missões diárias são geradas às 00:05 do fuso do usuário |
| RN-IA02 | A IA nunca deve sugerir missões prejudiciais à saúde |
| RN-IA03 | A IA deve variar missões (check contra histórico dos últimos 7 dias) |
| RN-IA04 | Se a API falhar, o sistema exibe missões do template estático (fallback) |
| RN-IA05 | Respostas da IA devem ser em JSON estruturado e validadas antes de uso |
| RN-IA06 | Custo máximo permitido por chamada: 3000 tokens total (input + output) |

---

## 6. Requisitos de Dados

### 6.1 Retenção de Dados

| Dado | Retenção |
|------|----------|
| Dados de conta (email, nome) | Enquanto conta ativa + 30 dias pós-exclusão |
| Histórico de tarefas | Conforme plano (7 dias Free, 30 Starter, 180 Boost, ilimitado Ultra) |
| Histórico de XP diário | Mesmo período do histórico de tarefas |
| Interações com IA | 90 dias (para melhoria do sistema) |
| Logs de acesso | 90 dias |
| Dados de pagamento | Gerenciados pelo Stripe (não armazenados localmente) |

### 6.2 Backup e Recuperação

| Aspecto | Especificação |
|---------|--------------|
| Frequência de backup | Diário automático (Supabase) |
| Retenção de backups | 7 dias |
| RTO (Recovery Time Objective) | < 4 horas |
| RPO (Recovery Point Objective) | < 24 horas (último backup diário) |

### 6.3 LGPD — Requisitos de Conformidade

| ID | Requisito |
|----|-----------|
| LGPD-001 | O usuário deve poder visualizar todos os dados armazenados sobre ele |
| LGPD-002 | O usuário deve poder exportar seus dados em formato portável (JSON) |
| LGPD-003 | O usuário deve poder solicitar exclusão total de dados (direito ao esquecimento) |
| LGPD-004 | Consentimento explícito para coleta de dados deve ser obtido no cadastro |
| LGPD-005 | A política de privacidade deve detalhar: quais dados são coletados, por quê, por quanto tempo, com quem são compartilhados |
| LGPD-006 | Dados de menores de 18 anos: se detectado, solicitar consentimento do responsável |

---

## 7. Casos de Uso Principais

### UC-001: Completar Tarefa e Ganhar XP

**Ator:** Usuário autenticado  
**Pré-condição:** Usuário tem pelo menos 1 tarefa pendente  
**Fluxo principal:**
1. Usuário acessa o dashboard
2. Sistema exibe lista de tarefas pendentes
3. Usuário clica no botão de "completar" em uma tarefa
4. Sistema calcula XP: XP_base × multiplicador_streak
5. Sistema atualiza XP do pilar correspondente
6. Sistema verifica se houve level up no pilar
7. Sistema verifica se houve level up geral
8. Sistema verifica conquistas desbloqueáveis
9. Sistema exibe animação de XP ganho
10. Se houve level up, exibe animação de "Level Up!"
11. Se conquista desbloqueada, exibe notificação toast
12. Sistema atualiza streak (se primeira tarefa do dia)
13. Sistema atualiza dashboard

**Fluxo alternativo — Level Up:**
- No passo 6, se XP acumulado >= XP necessário para próximo nível: incrementar nível, exibir animação especial, verificar evolução de avatar

**Fluxo alternativo — Streak quebrado:**
- Se o dia anterior não teve atividade, streak já foi resetado à 00:00. O sistema exibe mensagem: "Novo streak iniciado!"

**Pós-condição:** XP atualizado, tarefa marcada como completada, conquistas verificadas

### UC-002: Receber Missões Diárias da IA

**Ator:** Sistema (automático) / Usuário  
**Pré-condição:** Usuário tem conta ativa, não excedeu limite de missões IA do dia  
**Fluxo principal:**
1. Às 00:05 do fuso do usuário, o sistema dispara geração de missões
2. Sistema compila contexto: perfil, nível/XP por pilar, histórico 7 dias, objetivos, streak
3. Sistema envia requisição à API Anthropic com system prompt + contexto
4. API retorna JSON com missões sugeridas (título, descrição, pilar, dificuldade)
5. Sistema valida e sanitiza a resposta
6. Sistema cria as tarefas no banco com source="ai"
7. Usuário abre o dashboard e vê as missões disponíveis

**Fluxo alternativo — API indisponível:**
- No passo 4, se timeout ou erro: sistema usa banco de missões template (estático) como fallback
- Sistema registra a falha para monitoramento

**Fluxo alternativo — Limite atingido:**
- Se usuário já recebeu o máximo de missões IA do dia (conforme plano): sistema não gera novas e exibe mensagem de upgrade

**Pós-condição:** Missões do dia disponíveis no dashboard do usuário

### UC-003: Upgrade de Plano

**Ator:** Usuário autenticado (plano Free ou inferior)  
**Pré-condição:** Usuário está em plano inferior ao desejado  
**Fluxo principal:**
1. Usuário acessa tela de planos/pricing
2. Sistema exibe os 4 planos com Boost destacado, toggle mensal/anual
3. Usuário seleciona plano e ciclo de cobrança
4. Sistema redireciona para checkout do Stripe
5. Usuário insere dados de pagamento
6. Stripe processa pagamento
7. Stripe envia webhook de confirmação
8. Sistema atualiza plano do usuário em tempo real
9. Sistema desbloqueia recursos do novo plano imediatamente
10. Sistema envia email de confirmação
11. Usuário é redirecionado ao dashboard com mensagem de boas-vindas ao plano

**Fluxo alternativo — Pagamento falha:**
- No passo 6: Stripe retorna erro, sistema exibe mensagem clara, usuário pode tentar novamente

**Pós-condição:** Plano atualizado, recursos desbloqueados, cobrança recorrente ativa

---

## 8. Matriz de Rastreabilidade (Requisitos × Release)

| Release | Módulos | Total de Requisitos |
|---------|---------|---------------------|
| MVP | AUTH, ONB, DASH, TASK, PROG, AVT (base), ACH, AI, PROF (base), LAND | ~85 requisitos |
| v1.1 | RANK, PAY, AVT (evolução), PROF (completo), LAND (pricing) | ~35 requisitos |
| v1.2 | Sistema de amigos, ranking entre amigos, desafios em grupo, I18N inglês | ~20 requisitos |
| v2.0 | App mobile nativo, push notifications, widgets | A definir |

---

## 9. Critérios de Aceitação do MVP

O MVP será considerado pronto para lançamento quando:

- CA-01: Usuário consegue se cadastrar, fazer login e completar onboarding em menos de 3 minutos
- CA-02: Usuário consegue criar, completar e excluir tarefas em todos os 4 pilares
- CA-03: Sistema calcula XP e nível corretamente conforme fórmulas definidas
- CA-04: Streak é calculado corretamente considerando fuso horário
- CA-05: IA gera missões diárias personalizadas e diferentes das do dia anterior
- CA-06: Sistema funciona em modo degradado quando API de IA está indisponível
- CA-07: Conquistas são desbloqueadas automaticamente quando condições são atingidas
- CA-08: Dashboard carrega em menos de 3 segundos em conexão 4G
- CA-09: Todas as telas funcionam corretamente em viewport de 360px
- CA-10: Landing page atinge score > 90 no Lighthouse (Performance)
- CA-11: Nenhuma vulnerabilidade de segurança crítica ou alta (validado por scan)
- CA-12: RLS do Supabase impede acesso a dados de outros usuários (testado)
- CA-13: Todos os textos da UI estão em pt-BR e em arquivos de tradução

---

*Este documento deve ser revisado e aprovado antes do início do desenvolvimento. Qualquer mudança de requisito após início da implementação deve passar por processo de change request documentado.*
