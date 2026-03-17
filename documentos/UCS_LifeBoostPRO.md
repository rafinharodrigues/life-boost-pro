# Documento de Casos de Uso — Life Boost PRO

### Use Case Specification (UCS)

**Versão:** 1.0  
**Data:** 16/03/2026  
**Baseado no:** SRS Life Boost PRO v1.0 / PRD Life Boost PRO v1.0  
**Autor:** Claude (Use Case Engineer Sênior)

---

## 1. Introdução

### 1.1 Propósito

Este documento especifica todos os casos de uso do sistema Life Boost PRO, detalhando interações entre atores e o sistema. Cada caso de uso contém fluxos principais, alternativos e de exceção, com rastreabilidade direta aos requisitos do SRS.

### 1.2 Convenções

| Convenção | Significado |
|-----------|-------------|
| [RQ-XXX-000] | Referência a requisito do SRS |
| [RN-XXX-00] | Referência a regra de negócio |
| **Pré-condição** | Estado que deve ser verdadeiro antes do caso de uso iniciar |
| **Pós-condição (sucesso)** | Estado garantido após fluxo principal completar com sucesso |
| **Pós-condição (falha)** | Estado garantido quando o fluxo é interrompido por exceção |
| **Trigger** | Evento que inicia o caso de uso |
| FA | Fluxo Alternativo |
| FE | Fluxo de Exceção |

### 1.3 Prioridade dos Casos de Uso

| Prioridade | Definição |
|------------|-----------|
| P0 — Crítico | Sem ele o sistema não funciona. MVP blocker. |
| P1 — Essencial | Core da experiência. MVP necessário. |
| P2 — Importante | Enriquece a experiência. Pode ir na v1.1. |
| P3 — Desejável | Nice-to-have. v1.2 ou posterior. |

---

## 2. Atores do Sistema

### 2.1 Atores Primários

| Ator | Descrição | Autenticação |
|------|-----------|--------------|
| Visitante | Pessoa não cadastrada que acessa a landing page ou telas públicas | Não autenticado |
| Usuário Free | Usuário cadastrado no plano gratuito | Autenticado |
| Usuário Starter | Usuário cadastrado no plano Starter | Autenticado |
| Usuário Boost | Usuário cadastrado no plano Boost | Autenticado |
| Usuário Ultra | Usuário cadastrado no plano Ultra | Autenticado |
| Administrador | Operador interno com acesso ao painel administrativo | Autenticado (role: admin) |

*Nota: Para simplificação, os atores Usuário Free/Starter/Boost/Ultra serão referenciados como "Usuário" quando o caso de uso se aplica a todos os planos. Diferenças por plano são indicadas nos fluxos.*

### 2.2 Atores Secundários (Sistemas Externos)

| Ator | Descrição | Interação |
|------|-----------|-----------|
| API Anthropic | Serviço de IA para geração de missões e coaching | Backend → API (REST) |
| Supabase Auth | Serviço de autenticação e gerenciamento de sessão | Frontend/Backend → Supabase |
| Supabase DB | Banco de dados PostgreSQL | Backend → Supabase |
| Stripe | Plataforma de processamento de pagamentos | Backend ↔ Stripe (webhooks) |
| Servidor de Email | Serviço de envio de emails transacionais | Backend → Email (SMTP/API) |
| Scheduler (CRON) | Gatilho temporal para tarefas automáticas | Sistema interno |

---

## 3. Diagrama de Contexto dos Casos de Uso

### 3.1 Pacotes de Casos de Uso

| Pacote | Casos de Uso | Ator Principal |
|--------|-------------|----------------|
| PKG-AUTH | UC-001 a UC-006 | Visitante / Usuário |
| PKG-ONB | UC-010 a UC-012 | Usuário (novo) |
| PKG-TASK | UC-020 a UC-028 | Usuário |
| PKG-PROG | UC-030 a UC-034 | Usuário / Sistema |
| PKG-AVT | UC-040 a UC-043 | Usuário |
| PKG-ACH | UC-050 a UC-053 | Usuário / Sistema |
| PKG-AI | UC-060 a UC-066 | Usuário / Scheduler |
| PKG-RANK | UC-070 a UC-074 | Usuário / Scheduler |
| PKG-PAY | UC-080 a UC-087 | Usuário / Stripe |
| PKG-PROF | UC-090 a UC-095 | Usuário |
| PKG-LAND | UC-100 a UC-102 | Visitante |
| PKG-ANAL | UC-120 a UC-121 | Usuário / Sistema |
| PKG-JOUR | UC-130 a UC-131 | Usuário |
| PKG-SHOP | UC-140 | Usuário |
| PKG-QUIZ | UC-150 | Visitante |
| PKG-ADMIN | UC-110 a UC-113 | Administrador |

---

## 4. Casos de Uso Detalhados

---

### PKG-AUTH — Autenticação e Conta

---

#### UC-001: Cadastrar Conta com Email

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Atores Secundários:** Supabase Auth, Servidor de Email  
**Rastreabilidade:** [AUTH-001], [AUTH-003], [AUTH-009], [AUTH-010]  
**Trigger:** Visitante clica em "Criar Conta" na landing page ou tela de login

**Pré-condições:**
- PC-01: Visitante não está autenticado
- PC-02: Visitante possui um email válido

**Fluxo Principal:**
1. Sistema exibe formulário de cadastro com campos: nome, email, senha, confirmar senha
2. Sistema exibe links para Termos de Uso e Política de Privacidade com checkbox de aceite obrigatório [AUTH-010]
3. Visitante preenche os campos e marca o aceite
4. Visitante clica em "Criar Conta"
5. Sistema valida formato do email
6. Sistema valida senha conforme [RN-AUTH-01]: mínimo 8 caracteres, 1 maiúscula, 1 número
7. Sistema valida que senha e confirmação são idênticas
8. Sistema verifica que email não está cadastrado [RN-AUTH-02]
9. Sistema cria conta no Supabase Auth com status "não verificado"
10. Sistema cria registro na tabela `users` com plano=free, level=1, xp=0
11. Sistema cria 4 registros na tabela `pillars` (health, intelligence, gold, strength) com level=1, xp=0
12. Sistema envia email de verificação via Supabase Auth [AUTH-003]
13. Sistema exibe mensagem: "Conta criada! Verifique seu email para ativar."
14. Visitante clica no link de verificação no email
15. Sistema ativa a conta e redireciona para o Onboarding [UC-010]

**Fluxos Alternativos:**

*FA-01: Visitante não verifica email em 24h*
- No passo 14, se o visitante não clicar no link em 24h:
- Sistema mantém conta como "não verificada"
- Visitante pode solicitar reenvio do email na tela de login
- Após 7 dias sem verificação, conta é removida automaticamente

*FA-02: Visitante já possui conta*
- No passo 8, se email já cadastrado:
- Sistema exibe: "Este email já está cadastrado. Deseja fazer login ou recuperar senha?"
- Sistema oferece links para login e recuperação de senha

**Fluxos de Exceção:**

*FE-01: Validação de senha falha*
- No passo 6, se senha não atende [RN-AUTH-01]:
- Sistema destaca campo com borda vermelha
- Sistema exibe mensagem específica: "Senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número"
- Visitante corrige e retorna ao passo 4

*FE-02: Falha no envio de email*
- No passo 12, se o servidor de email falhar:
- Sistema cria conta normalmente
- Sistema exibe: "Conta criada, mas houve um problema ao enviar o email de verificação. Clique aqui para reenviar."
- Sistema registra o erro no log

*FE-03: Falha de conexão com Supabase*
- No passo 9, se Supabase estiver indisponível:
- Sistema exibe: "Serviço temporariamente indisponível. Tente novamente em alguns minutos."
- Sistema registra o erro no Sentry

**Pós-condição (sucesso):** Conta criada, verificada, usuário redirecionado ao onboarding  
**Pós-condição (falha):** Nenhuma conta criada ou conta em estado "não verificada"

---

#### UC-002: Cadastrar/Login via Google OAuth

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Atores Secundários:** Supabase Auth, Google OAuth  
**Rastreabilidade:** [AUTH-002]  
**Trigger:** Visitante clica em "Continuar com Google"

**Pré-condições:**
- PC-01: Visitante não está autenticado
- PC-02: Visitante possui conta Google

**Fluxo Principal:**
1. Sistema redireciona para tela de consentimento do Google OAuth
2. Visitante seleciona conta Google e autoriza
3. Google retorna token de autenticação ao Supabase Auth
4. Supabase Auth verifica o token
5. Sistema verifica se email do Google já existe na base
6. Se não existe: sistema cria conta com dados do Google (nome, email, avatar), plano=free
7. Sistema cria registros em `pillars` com valores iniciais
8. Sistema gera JWT e refresh token [RN-AUTH-04]
9. Sistema redireciona para Onboarding [UC-010] (se primeiro acesso) ou Dashboard [UC-020] (se conta existente)

**Fluxos Alternativos:**

*FA-01: Email do Google já cadastrado via email/senha*
- No passo 5, se email existe com provider=email:
- Sistema vincula a conta Google ao usuário existente (merge)
- Sistema redireciona para Dashboard (não precisa de onboarding novamente)

*FA-02: Visitante cancela no Google*
- No passo 2, se visitante cancela:
- Sistema retorna à tela de login sem mensagem de erro

**Fluxos de Exceção:**

*FE-01: Google OAuth indisponível*
- No passo 1, se Google não responde:
- Sistema exibe: "Login com Google indisponível no momento. Tente novamente ou cadastre-se com email."

**Pós-condição (sucesso):** Usuário autenticado e redirecionado  
**Pós-condição (falha):** Visitante permanece na tela de login

---

#### UC-003: Fazer Login com Email/Senha

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Atores Secundários:** Supabase Auth  
**Rastreabilidade:** [AUTH-001], [AUTH-005], [AUTH-009]  
**Trigger:** Visitante acessa tela de login

**Pré-condições:**
- PC-01: Visitante não está autenticado
- PC-02: Visitante possui conta verificada

**Fluxo Principal:**
1. Sistema exibe formulário com campos: email, senha
2. Visitante preenche email e senha
3. Visitante clica em "Entrar"
4. Sistema envia credenciais ao Supabase Auth
5. Supabase Auth valida credenciais
6. Sistema gera JWT (1h) e refresh token (30 dias) [RN-AUTH-04]
7. Sistema armazena tokens no cliente (httpOnly cookie para JWT, localStorage para refresh)
8. Sistema atualiza `last_activity_at` do usuário
9. Sistema redireciona para Dashboard

**Fluxos Alternativos:**

*FA-01: Conta não verificada*
- No passo 5, se conta existe mas não está verificada:
- Sistema exibe: "Sua conta ainda não foi verificada. Verifique seu email ou clique aqui para reenviar."

*FA-02: Usuário marca "Lembrar de mim"*
- No passo 7: refresh token é estendido para 90 dias

**Fluxos de Exceção:**

*FE-01: Credenciais inválidas*
- No passo 5, se credenciais incorretas:
- Sistema incrementa contador de tentativas falhas
- Sistema exibe: "Email ou senha incorretos"
- Se 5 tentativas falhas consecutivas [AUTH-009]: sistema bloqueia conta por 15 minutos
- Sistema exibe: "Conta bloqueada temporariamente por segurança. Tente novamente em 15 minutos ou recupere sua senha."

*FE-02: Conta bloqueada*
- No passo 5, se conta bloqueada por tentativas:
- Sistema exibe tempo restante de bloqueio e link para recuperação de senha

**Pós-condição (sucesso):** Usuário autenticado, sessão ativa, redirecionado ao dashboard  
**Pós-condição (falha):** Visitante permanece na tela de login, contador de tentativas incrementado

---

#### UC-004: Recuperar Senha

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Atores Secundários:** Supabase Auth, Servidor de Email  
**Rastreabilidade:** [AUTH-004]  
**Trigger:** Visitante clica em "Esqueci minha senha"

**Pré-condições:**
- PC-01: Visitante possui conta cadastrada com email

**Fluxo Principal:**
1. Sistema exibe campo de email
2. Visitante insere email
3. Visitante clica em "Enviar link de recuperação"
4. Sistema verifica se email existe na base
5. Sistema solicita envio de email de recuperação ao Supabase Auth
6. Sistema exibe: "Se este email estiver cadastrado, você receberá um link de recuperação."
7. Visitante recebe email com link de redefinição (válido por 1 hora)
8. Visitante clica no link
9. Sistema exibe formulário de nova senha (senha + confirmação)
10. Visitante preenche e confirma nova senha
11. Sistema valida senha conforme [RN-AUTH-01]
12. Sistema atualiza senha no Supabase Auth
13. Sistema invalida todas as sessões ativas [AUTH-006 quando disponível]
14. Sistema exibe: "Senha redefinida com sucesso!" e redireciona para login

**Fluxos Alternativos:**

*FA-01: Email não cadastrado*
- No passo 4, se email não existe:
- Sistema exibe a mesma mensagem do passo 6 (não revela se email existe ou não — segurança)
- Nenhum email é enviado

**Fluxos de Exceção:**

*FE-01: Link expirado*
- No passo 8, se link tem mais de 1 hora:
- Sistema exibe: "Este link expirou. Solicite uma nova recuperação de senha."
- Sistema oferece botão para reenviar

**Pós-condição (sucesso):** Senha atualizada, todas as sessões anteriores invalidadas  
**Pós-condição (falha):** Senha permanece inalterada

---

#### UC-005: Fazer Logout

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Atores Secundários:** Supabase Auth  
**Rastreabilidade:** [AUTH-005]  
**Trigger:** Usuário clica em "Sair" no menu

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Usuário clica em "Sair"
2. Sistema revoga o JWT e refresh token no Supabase Auth
3. Sistema remove tokens armazenados no cliente
4. Sistema redireciona para a landing page

**Pós-condição (sucesso):** Sessão encerrada, tokens removidos  
**Pós-condição (falha):** N/A (logout local garante sessão encerrada no cliente)

---

#### UC-006: Excluir Conta

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Atores Secundários:** Supabase Auth, Supabase DB, Stripe, Servidor de Email  
**Rastreabilidade:** [AUTH-007], [LGPD-001], [LGPD-003]  
**Trigger:** Usuário acessa "Configurações > Excluir Conta"

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Usuário navega até Configurações > Excluir Conta
2. Sistema exibe aviso: "Ao excluir sua conta, todos os seus dados serão permanentemente removidos após 30 dias. Esta ação não pode ser desfeita."
3. Sistema solicita confirmação: "Digite EXCLUIR para confirmar"
4. Usuário digita "EXCLUIR" e clica em "Confirmar Exclusão"
5. Sistema valida a confirmação
6. Se usuário possui assinatura ativa: sistema cancela assinatura no Stripe [UC-086]
7. Sistema marca conta como "pendente de exclusão" com data_exclusão = hoje + 30 dias
8. Sistema faz logout do usuário [UC-005]
9. Sistema envia email de confirmação: "Sua conta será excluída em 30 dias. Se mudar de ideia, faça login para cancelar a exclusão."
10. Após 30 dias (CRON): sistema remove permanentemente todos os dados do usuário [RN-AUTH-03]

**Fluxos Alternativos:**

*FA-01: Usuário cancela exclusão dentro dos 30 dias*
- O usuário faz login durante o período de carência
- Sistema exibe: "Sua conta está marcada para exclusão. Deseja cancelar?"
- Usuário confirma cancelamento
- Sistema remove flag de exclusão pendente
- Conta volta ao normal

*FA-02: Usuário não digita "EXCLUIR" corretamente*
- No passo 5: sistema exibe erro e não prossegue

**Pós-condição (sucesso):** Conta marcada para exclusão, assinatura cancelada, dados removidos após 30 dias  
**Pós-condição (falha):** Conta permanece ativa

---

### PKG-ONB — Onboarding

---

#### UC-010: Completar Onboarding

**Prioridade:** P0 — Crítico  
**Ator Primário:** Usuário (novo)  
**Atores Secundários:** API Anthropic  
**Rastreabilidade:** [ONB-001] a [ONB-010]  
**Trigger:** Usuário acessa o sistema pela primeira vez após verificar conta

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Usuário nunca completou o onboarding (flag `onboarding_completed = false`)

**Fluxo Principal:**

*Etapa 1 — Boas-vindas (tela 1/5)*
1. Sistema exibe tela de boas-vindas com breve explicação do conceito: "Transforme sua vida em um jogo"
2. Usuário clica em "Começar"

*Etapa 2 — Perfil Básico (tela 2/5)*
3. Sistema exibe campo para nome de exibição (pré-preenchido com nome do cadastro) [ONB-002]
4. Usuário confirma ou altera o nome
5. Usuário clica em "Próximo"

*Etapa 3 — Avatar (tela 3/5)*
6. Sistema exibe grid com pelo menos 6 avatares base para escolha [ONB-003]
7. Cada avatar tem estilo visual dark/gamer coerente com a estética do sistema
8. Usuário seleciona um avatar (seleção visual com borda destacada)
9. Usuário clica em "Próximo"

*Etapa 4 — Prioridades (tela 4/5)*
10. Sistema exibe os 4 pilares (Saúde, Estudos, Finanças, Rotina) como cards selecionáveis [ONB-004]
11. Usuário seleciona 1 ou mais pilares como prioridade
12. Para cada pilar selecionado como prioridade, sistema exibe campo de texto: "Qual seu principal objetivo neste pilar?" (máx 200 caracteres) [ONB-005]
13. Usuário preenche objetivos (opcional)
14. Usuário clica em "Próximo"

*Etapa 5 — Resumo e Confirmação (tela 5/5)*
15. Sistema exibe resumo: nome, avatar escolhido, pilares prioritários, objetivos [ONB-006]
16. Sistema permite editar qualquer item clicando nele (retorna à etapa correspondente)
17. Usuário clica em "Começar Jornada!"
18. Sistema salva todas as configurações no banco de dados
19. Sistema dispara geração das 3 primeiras missões personalizadas via IA [ONB-007]
20. Sistema exibe animação de "Personagem Criado!" com o avatar animado [ONB-010]
21. Sistema marca `onboarding_completed = true`
22. Sistema redireciona para o Dashboard [UC-020] com as missões já disponíveis

**Fluxos Alternativos:**

*FA-01: Usuário pula o onboarding [ONB-009]*
- Em qualquer etapa, usuário clica em "Pular"
- Sistema salva configurações padrão: nome do cadastro, avatar aleatório, todos os pilares com peso igual, sem objetivos
- Sistema marca `onboarding_completed = false` (flag diferente: `onboarding_skipped = true`)
- Sistema redireciona para Dashboard com banner persistente: "Complete seu perfil para missões personalizadas"
- As primeiras missões são genéricas (template estático, não IA)

*FA-02: Usuário volta para etapa anterior*
- Em qualquer etapa (exceto a primeira), botão "Voltar" está disponível
- Sistema preserva as seleções feitas em etapas futuras

*FA-03: IA indisponível no passo 19*
- Se a API Anthropic falhar: sistema usa 3 missões de template estático como fallback
- Missões da IA são geradas na próxima rodada (00:05 do próximo dia)
- Usuário não percebe diferença (missões de template são igualmente apresentáveis)

**Fluxos de Exceção:**

*FE-01: Nome ofensivo*
- No passo 4, se nome contém palavras da blacklist:
- Sistema exibe: "Este nome não é permitido. Escolha outro."

**Pós-condição (sucesso):** Onboarding completo, avatar definido, prioridades salvas, primeiras missões geradas  
**Pós-condição (falha):** Onboarding incompleto, flag indica etapa de parada

---

#### UC-011: Refazer Onboarding

**Prioridade:** P3 — Desejável  
**Ator Primário:** Usuário  
**Rastreabilidade:** [ONB-009]  
**Trigger:** Usuário que pulou o onboarding clica no banner "Complete seu perfil"

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: `onboarding_skipped = true`

**Fluxo Principal:**
1. Sistema inicia fluxo de onboarding a partir da Etapa 2 (perfil básico)
2. Segue o fluxo de [UC-010] a partir do passo 3
3. Ao finalizar, sistema atualiza `onboarding_skipped = false` e `onboarding_completed = true`
4. Sistema gera missões personalizadas baseadas nos novos dados

**Pós-condição (sucesso):** Onboarding completo, dados do perfil atualizados

---

### PKG-TASK — Tarefas e Missões

---

#### UC-020: Visualizar Dashboard Principal

**Prioridade:** P0 — Crítico  
**Ator Primário:** Usuário  
**Rastreabilidade:** [DASH-001] a [DASH-011]  
**Trigger:** Usuário faz login ou navega para a tela inicial

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Onboarding completo (ou pulado)

**Fluxo Principal:**
1. Sistema carrega dados do usuário: nível geral, XP, streak, avatar
2. Sistema carrega dados dos 4 pilares: nível e XP de cada um
3. Sistema carrega missões do dia: pendentes e completadas
4. Sistema carrega últimas 3 conquistas desbloqueadas
5. Sistema renderiza o dashboard com:
   - Avatar do usuário no topo com nível geral e barra de XP [DASH-001], [DASH-003]
   - 4 cards de pilares com nível individual e barra de progresso [DASH-002]
   - Streak atual com ícone de fogo e contador [DASH-005]
   - Lista de missões do dia (pendentes primeiro, completadas abaixo) [DASH-004]
   - Área de notificações do Mentor IA [DASH-006]
   - Conquistas recentes (badges pequenos) [DASH-007]
   - Botão flutuante "+" para adicionar tarefa rápida [DASH-008]
6. Sistema carrega gráfico de atividade dos últimos 7 dias (lazy load) [DASH-009]

**Regras de exibição:**
- Pilar com progresso semanal < 20% do esperado: exibe indicador de alerta (ícone de atenção) [RN-DASH-01]
- Missões da IA são marcadas com badge "IA" [TASK-013]
- Se streak foi quebrado hoje: exibe "Novo streak: dia 1" em vez de "0 dias"
- Todo o dashboard é funcional em 360px [DASH-010]
- Carregamento total < 3 segundos [DASH-011]

**Fluxos Alternativos:**

*FA-01: Nenhuma missão do dia ainda (pré 00:05)*
- Sistema exibe: "Suas missões de hoje estão sendo preparadas..." com animação de loading
- Exibe tarefas manuais pendentes normalmente

*FA-02: Primeiro acesso após onboarding*
- Sistema exibe tour guiado (tooltips) nos principais elementos do dashboard
- Tour é dismissível e não reaparece

**Pós-condição (sucesso):** Dashboard renderizado com dados atualizados

---

#### UC-021: Criar Tarefa Manual

**Prioridade:** P0 — Crítico  
**Ator Primário:** Usuário  
**Rastreabilidade:** [TASK-001], [TASK-002], [TASK-006], [TASK-016]  
**Trigger:** Usuário clica no botão "+" ou "Nova Tarefa"

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Usuário não atingiu limite de tarefas ativas do plano [RN-TASK-08]

**Fluxo Principal:**
1. Sistema exibe modal/tela de criação com campos:
   - Título (obrigatório, máx 100 caracteres)
   - Descrição (opcional, máx 500 caracteres)
   - Pilar (select: Saúde, Estudos, Finanças, Rotina)
   - Dificuldade (select: Fácil 10XP, Médio 25XP, Difícil 50XP, Épico 100XP) [TASK-003]
   - Data de vencimento (opcional, datepicker)
   - Recorrência (toggle: não recorrente / diária / semanal / personalizada) [TASK-006]
2. Usuário preenche pelo menos título e pilar
3. Usuário clica em "Criar Tarefa"
4. Sistema valida campos obrigatórios
5. Sistema cria registro na tabela `tasks` com source="user", status="pending"
6. Sistema exibe toast: "Tarefa criada!" com animação sutil
7. Tarefa aparece na lista do dashboard

**Fluxos Alternativos:**

*FA-01: Limite de tarefas atingido*
- No passo 4, se tarefas ativas >= limite do plano (Free=15, Starter=50, Boost/Ultra=ilimitado):
- Sistema exibe: "Você atingiu o limite de tarefas ativas (15). Complete ou exclua tarefas, ou faça upgrade."
- Sistema exibe botão de upgrade [UC-083]

*FA-02: Tarefa recorrente*
- No passo 1, se usuário seleciona recorrência:
- Sistema exibe opções: Diária, Semanal (selecionar dias), Personalizada (a cada N dias)
- Sistema salva `recurrence_rule` como JSONB
- Sistema cria a primeira instância imediatamente e agenda as próximas [TASK-007]

**Fluxos de Exceção:**

*FE-01: Título vazio*
- No passo 4: sistema destaca campo e exibe "Título é obrigatório"

*FE-02: Data de vencimento no passado*
- No passo 4: sistema exibe "Data de vencimento deve ser hoje ou futura"

**Pós-condição (sucesso):** Tarefa criada e visível no dashboard  
**Pós-condição (falha):** Nenhuma tarefa criada, formulário permanece aberto com erros

---

#### UC-022: Completar Tarefa

**Prioridade:** P0 — Crítico  
**Ator Primário:** Usuário  
**Atores Secundários:** Supabase DB  
**Rastreabilidade:** [TASK-004], [TASK-005], [PROG-001] a [PROG-009], [RN-G01] a [RN-G10]  
**Trigger:** Usuário clica no botão de completar (checkbox/botão) de uma tarefa

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Tarefa existe e está com status "pending"

**Fluxo Principal:**
1. Usuário clica no botão "completar" de uma tarefa
2. Sistema verifica se é tarefa manual e se o limite diário de XP manual foi atingido [RN-G09]
3. Sistema calcula XP:
   - XP_base conforme dificuldade [RN-G02]: Fácil=10, Médio=25, Difícil=50, Épico=100
   - Multiplicador conforme streak [RN-G03]: 1-6d=1x, 7-13d=1.25x, 14-29d=1.5x, 30d+=2x
   - XP_final = ceil(XP_base × multiplicador) [RN-G04]
4. Sistema atualiza tarefa: status="completed", completed_at=now()
5. Sistema adiciona XP_final ao pilar correspondente
6. Sistema verifica level up do pilar:
   - XP_necessário(n) = 100 × n^1.5 [RN-G01]
   - Se XP_acumulado >= XP_para_próximo_nível: incrementa nível do pilar
7. Sistema recalcula nível geral: floor(média dos 4 pilares) [RN-G05]
8. Sistema verifica se é a primeira tarefa do dia:
   - Se sim e streak estava em 0: inicia streak (streak=1) [RN-DASH-03]
   - Se sim e já havia streak ativo: incrementa streak (se dia anterior teve atividade)
9. Sistema registra XP diário no histórico [PROG-009]
10. Sistema dispara verificação de conquistas [UC-051]
11. Sistema exibe animação de XP ganho: "+{XP} XP" flutuando sobre a tarefa [TASK-005]
12. Sistema atualiza barras de progresso com animação suave

**Fluxos Alternativos:**

*FA-01: Level Up no pilar*
- No passo 6, se houve level up:
- Sistema exibe animação "Level Up!" com novo nível do pilar [PROG-003]
- Se o nível é um marco de evolução do avatar (10, 25, 50, 75, 100) e plano permite: exibe animação de evolução [AVT-003]

*FA-02: Level Up geral*
- No passo 7, se o nível geral aumentou:
- Sistema exibe animação "Level Up Geral!" mais impactante que a de pilar
- Verificações adicionais de conquistas por nível geral

*FA-03: Todas as missões do dia completadas*
- Se após completar esta tarefa, todas as missões do dia estão concluídas:
- Sistema exibe animação especial "Daily Clear!" [TASK-017]
- Sistema registra para verificação de conquista "Dia Perfeito"

*FA-04: Limite de XP manual diário atingido*
- No passo 2, se tarefas manuais já renderam 500 XP hoje [RN-G09]:
- Tarefa é completada normalmente
- XP é zerado para esta tarefa
- Sistema exibe: "Você atingiu o limite de XP manual de hoje (500 XP). Missões da IA ainda rendem XP!"
- Nota: missões da IA não contam nesse limite

*FA-05: Tarefa é recorrente*
- No passo 4, após completar:
- Sistema cria automaticamente a próxima instância conforme `recurrence_rule` [TASK-007]
- Nova instância aparece como pendente na data correta

**Fluxos de Exceção:**

*FE-01: Tarefa já completada (race condition)*
- No passo 2, se tarefa já está "completed":
- Sistema ignora a ação silenciosamente (idempotente)
- Nenhum XP duplicado é concedido [RN-G10]

*FE-02: Falha de conexão ao completar*
- Sistema enfileira a ação localmente
- Exibe indicador: "Salvando..." 
- Tenta novamente em background
- Se persistir: "Não foi possível salvar. Verifique sua conexão."

**Pós-condição (sucesso):** Tarefa marcada como completada, XP adicionado, nível/streak recalculados, conquistas verificadas  
**Pós-condição (falha):** Tarefa permanece como pendente, XP não alterado

---

#### UC-023: Editar Tarefa

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [TASK-008]  
**Trigger:** Usuário clica em "Editar" em uma tarefa pendente

**Pré-condições:**
- PC-01: Tarefa existe e está com status "pending"

**Fluxo Principal:**
1. Sistema exibe formulário de edição pré-preenchido com dados atuais
2. Usuário altera campos desejados (título, descrição, dificuldade, data, pilar)
3. Usuário clica em "Salvar"
4. Sistema valida campos
5. Sistema atualiza registro no banco
6. Sistema exibe toast: "Tarefa atualizada!"

**Fluxos de Exceção:**

*FE-01: Tentar editar tarefa completada*
- Sistema exibe: "Tarefas completadas não podem ser editadas"

**Pós-condição (sucesso):** Tarefa atualizada com novos dados

---

#### UC-024: Excluir Tarefa

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [TASK-009]  
**Trigger:** Usuário clica em "Excluir" em uma tarefa pendente

**Pré-condições:**
- PC-01: Tarefa existe e está com status "pending"

**Fluxo Principal:**
1. Usuário clica em "Excluir" na tarefa
2. Sistema exibe confirmação: "Excluir '{título}'? Esta ação não pode ser desfeita." [USE-002]
3. Usuário confirma
4. Sistema remove tarefa do banco (soft delete: status="deleted")
5. Sistema exibe toast: "Tarefa excluída"
6. Tarefa desaparece da lista com animação

**Fluxos Alternativos:**

*FA-01: Usuário cancela*
- No passo 3: sistema fecha o diálogo, nenhuma ação

*FA-02: Excluir tarefa recorrente*
- Sistema pergunta: "Excluir apenas esta ocorrência ou todas as ocorrências futuras?"
- "Apenas esta": remove a instância atual
- "Todas as futuras": remove instância atual e cancela recorrência

**Pós-condição (sucesso):** Tarefa removida (soft delete)

---

#### UC-025: Filtrar e Visualizar Tarefas

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [TASK-011]  
**Trigger:** Usuário acessa tela de tarefas ou aplica filtro

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Sistema exibe lista de tarefas agrupadas por pilar
2. Sistema exibe filtros: Status (Todas / Pendentes / Completadas / Expiradas), Pilar (Todos / individual), Origem (Todas / Manual / IA)
3. Usuário seleciona combinação de filtros
4. Sistema filtra e reordena lista em tempo real (client-side para listas pequenas, server-side para > 100)
5. Sistema exibe contadores por status: "12 pendentes, 45 completadas, 3 expiradas"

**Pós-condição (sucesso):** Lista filtrada exibida conforme seleção

---

#### UC-026: Rejeitar Missão da IA

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [TASK-014], [RN-TASK-05]  
**Trigger:** Usuário clica em "Rejeitar" em uma missão gerada pela IA

**Pré-condições:**
- PC-01: Missão existe, foi gerada pela IA (source="ai"), status="pending"

**Fluxo Principal:**
1. Usuário clica em "Rejeitar" ou ícone "X" na missão
2. Sistema exibe opção rápida: "Por que está rejeitando?" (Muito fácil / Muito difícil / Não relevante / Outro)
3. Usuário seleciona motivo (opcional — pode pular)
4. Sistema marca missão como status="rejected"
5. Sistema registra o motivo para ajuste do perfil de IA [RN-TASK-05]
6. Missão desaparece da lista
7. Sistema NÃO penaliza XP ou streak do usuário
8. Na próxima geração de missões, a IA considera o feedback (reduz dificuldade, muda foco, etc.)

**Pós-condição (sucesso):** Missão rejeitada sem penalidade, feedback registrado para IA

---

#### UC-027: Processar Tarefas Expiradas (Automático)

**Prioridade:** P1 — Essencial  
**Ator Primário:** Scheduler (CRON)  
**Rastreabilidade:** [TASK-010], [RN-TASK-04]  
**Trigger:** CRON job executa a cada hora

**Pré-condições:**
- PC-01: Existem tarefas com status="pending" e due_date < now()

**Fluxo Principal:**
1. CRON identifica tarefas com due_date passada e status="pending"
2. Sistema atualiza status para "expired" em batch
3. Sistema NÃO concede XP por tarefas expiradas [RN-TASK-04]
4. Na próxima vez que o usuário acessar o dashboard, tarefas expiradas aparecem com visual diferenciado (opacidade reduzida, badge "Expirada")

**Pós-condição (sucesso):** Tarefas vencidas marcadas como expiradas

---

#### UC-028: Gerar Instância de Tarefa Recorrente (Automático)

**Prioridade:** P1 — Essencial  
**Ator Primário:** Scheduler (CRON)  
**Rastreabilidade:** [TASK-007]  
**Trigger:** CRON job executa à 00:01 do fuso de cada usuário

**Pré-condições:**
- PC-01: Existem tarefas com is_recurring=true e a próxima instância é para hoje

**Fluxo Principal:**
1. CRON identifica tarefas recorrentes cuja próxima data é hoje
2. Para cada uma, sistema cria nova instância: copia título, descrição, pilar, dificuldade; status="pending"
3. Nova instância é vinculada à tarefa pai (referência)
4. Instância anterior que não foi completada é marcada como expirada

**Pós-condição (sucesso):** Novas instâncias de tarefas recorrentes criadas para o dia

---

### PKG-AVT — Avatar

---

#### UC-040: Selecionar Avatar Base

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [AVT-001], [AVT-010]  
**Trigger:** Onboarding (etapa 3) ou Configurações > Avatar

**Fluxo Principal:**
1. Sistema exibe grid com avatares base disponíveis (mínimo 6) [AVT-001]
2. Cada avatar é exibido com preview em tamanho adequado
3. Usuário clica no avatar desejado
4. Sistema destaca o avatar selecionado com borda/glow
5. Usuário confirma seleção
6. Sistema salva `avatar_config` com o ID do avatar base selecionado

**Pós-condição (sucesso):** Avatar base definido para o usuário

---

#### UC-041: Visualizar Evolução do Avatar

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Rastreabilidade:** [AVT-003], [AVT-004], [AVT-007]  
**Trigger:** Usuário acessa perfil ou tela de avatar

**Pré-condições:**
- PC-01: Plano do usuário permite evolução visual (Starter+ conforme [AVT-007])

**Fluxo Principal:**
1. Sistema exibe avatar no estágio atual de evolução
2. Sistema exibe timeline de evolução com marcos: Nível 1, 10, 25, 50, 75, 100 [AVT-003]
3. Estágios já alcançados são exibidos desbloqueados
4. Estágios futuros são exibidos bloqueados (silhueta escura)
5. Cada estágio é visualmente distinto [AVT-004]

**Fluxos Alternativos:**

*FA-01: Usuário Free*
- Sistema exibe avatar base estático [AVT-007]
- Timeline de evolução aparece com cadeado e mensagem: "Faça upgrade para evoluir seu personagem"

**Pós-condição (sucesso):** Usuário visualiza avatar e timeline de evolução

---

#### UC-042: Equipar Item Visual

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Rastreabilidade:** [AVT-005], [AVT-006]  
**Trigger:** Usuário acessa inventário de itens desbloqueados

**Pré-condições:**
- PC-01: Usuário possui pelo menos 1 item desbloqueado via conquista

**Fluxo Principal:**
1. Sistema exibe inventário de itens agrupados por categoria (chapéu, armadura, arma, acessório, efeito)
2. Itens desbloqueados aparecem coloridos; itens bloqueados em silhueta com condição para desbloqueio
3. Usuário clica em item desbloqueado
4. Sistema exibe preview do avatar com o item equipado
5. Usuário clica em "Equipar"
6. Sistema atualiza `avatar_config` com item equipado
7. Avatar é atualizado em todas as telas (dashboard, perfil, ranking)

**Pós-condição (sucesso):** Item equipado e visível no avatar

---

### PKG-ACH — Conquistas

---

#### UC-050: Visualizar Conquistas

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [ACH-004], [ACH-005], [ACH-006], [ACH-008]  
**Trigger:** Usuário acessa tela "Conquistas"

**Fluxo Principal:**
1. Sistema carrega todas as conquistas do catálogo e status de desbloqueio do usuário
2. Sistema exibe conquistas organizadas por categoria (Streak, Marco, Pilar, Desafio, Social, Segredo)
3. Conquistas desbloqueadas: badge colorido + nome + descrição + data de desbloqueio [ACH-004]
4. Conquistas bloqueadas (não secretas): badge cinza + nome + condição para desbloqueio [ACH-005]
5. Conquistas secretas bloqueadas: badge com "???" + "Conquista secreta" [ACH-006]
6. Conquistas com progresso parcial: barra de progresso (ex: "7/30 dias de streak") [ACH-008]

**Pós-condição (sucesso):** Lista de conquistas exibida com status atualizado

---

#### UC-051: Verificar e Desbloquear Conquista (Automático)

**Prioridade:** P1 — Essencial  
**Ator Primário:** Sistema (trigger interno)  
**Rastreabilidade:** [ACH-002], [ACH-003], [ACH-009]  
**Trigger:** Chamado por [UC-022] após completar tarefa, ou por CRON periódico

**Pré-condições:**
- PC-01: Uma ação que potencialmente desbloqueia conquista acabou de ocorrer

**Fluxo Principal:**
1. Sistema identifica quais conquistas ainda estão bloqueadas para o usuário
2. Para cada conquista bloqueada, sistema avalia a condição (JSONB da tabela `achievements`):
   - Streak >= N? Verifica `streak_count`
   - Nível >= N? Verifica `current_level`
   - Total de tarefas >= N? Conta tarefas completadas
   - Missões IA completadas >= N? Conta tarefas com source="ai" e status="completed"
3. Se condição é satisfeita:
   - Sistema cria registro em `user_achievements` com `unlocked_at = now()`
   - Sistema concede XP bônus ao pilar mais fraco do usuário [RN-G07]
   - Sistema dispara notificação toast no frontend [ACH-003]: badge + "Conquista desbloqueada: {nome}!"
   - Se o usuário está no dashboard: animação aparece em tempo real
   - Se o usuário não está logado: notificação aparece no próximo login
4. Sistema atualiza progresso parcial de conquistas quase desbloqueadas [ACH-008]

**Fluxos Alternativos:**

*FA-01: Múltiplas conquistas desbloqueadas ao mesmo tempo*
- Sistema enfileira notificações
- Exibe uma por vez com 2 segundos de intervalo entre elas

**Pós-condição (sucesso):** Conquistas elegíveis desbloqueadas, XP bônus concedido, notificações exibidas

---

### PKG-AI — Mentor IA

---

#### UC-060: Gerar Missões Diárias (Automático)

**Prioridade:** P0 — Crítico  
**Ator Primário:** Scheduler (CRON)  
**Atores Secundários:** API Anthropic, Supabase DB  
**Rastreabilidade:** [AI-001] a [AI-005], [AI-010] a [AI-016], [TASK-012], [TASK-015]  
**Trigger:** CRON job às 00:05 do fuso horário de cada usuário [RN-IA01]

**Pré-condições:**
- PC-01: Usuário tem conta ativa
- PC-02: Usuário não atingiu limite de missões IA do dia

**Fluxo Principal:**

*Fase 1 — Coleta de Contexto*
1. Sistema compila contexto do usuário [AI-002]:
   - Perfil: nome, nível geral, plano ativo
   - Pilares: nível e XP de cada um, pilar mais forte e mais fraco
   - Histórico 7 dias: tarefas completadas, rejeitadas, expiradas por pilar
   - Objetivos: texto dos objetivos definidos no onboarding
   - Streak atual e maior streak
   - Missões dos últimos 7 dias (para evitar repetição) [AI-003]
   - Feedback de rejeições recentes (motivos) [RN-TASK-05]

*Fase 2 — Chamada à API*
2. Sistema monta requisição com:
   - System prompt com personalidade do Mentor (tom motivacional, gamer, personalizado) [AI-013]
   - Contexto do usuário como user message
   - Instrução para retornar JSON estruturado [AI-015]
   - Instrução para priorizar pilares fracos [AI-004]
   - Instrução para ajustar dificuldade [AI-005]:
     - >80% completadas nos últimos 7 dias → aumentar dificuldade
     - <40% completadas → diminuir dificuldade
3. Sistema envia requisição à API Anthropic com timeout de 30 segundos [AI-011]
4. API retorna JSON com array de missões:
   ```json
   {
     "missions": [
       {
         "title": "Caminhada matinal de 20 minutos",
         "description": "Comece o dia com energia! Faça uma caminhada leve de 20 minutos.",
         "pillar": "health",
         "difficulty": "medium",
         "motivation": "Seu pilar de Saúde está precisando de atenção. Vamos nessa!"
       }
     ],
     "daily_message": "Bom dia, guerreiro! Ontem você mandou bem em Estudos. Hoje foco em Saúde!"
   }
   ```

*Fase 3 — Validação e Persistência*
5. Sistema valida resposta [AI-016]:
   - Verifica se é JSON válido
   - Verifica se cada missão tem os campos obrigatórios
   - Verifica se `pillar` é válido (health/intelligence/gold/strength)
   - Verifica se `difficulty` é válido (easy/medium/hard/epic)
   - Sanitiza textos contra XSS
6. Sistema verifica se missão é similar a alguma dos últimos 7 dias [AI-003] (comparação semântica simplificada por título)
7. Sistema cria registros na tabela `tasks` com source="ai" e status="pending"
8. Sistema salva a `daily_message` para exibição no dashboard [DASH-006]
9. Sistema registra interação na tabela `ai_interactions` [AI-014]: tokens consumidos, tipo="daily_missions"
10. Quantidade de missões conforme plano: Free=3, Starter=8, Boost=20, Ultra=sem limite [RN-TASK-06]

**Fluxos Alternativos:**

*FA-01: API Anthropic indisponível [AI-012]*
- No passo 3, se timeout ou erro HTTP:
- Sistema usa banco de missões template estático como fallback [RN-IA04]
- Templates são pré-categorizados por pilar e dificuldade
- Sistema seleciona templates relevantes baseado nos pilares mais fracos
- Sistema registra falha no log e no Sentry
- Retry automático em 30 minutos (máximo 3 tentativas)

*FA-02: Resposta da IA malformada*
- No passo 5, se JSON inválido ou campos faltando:
- Sistema tenta extrair o que for possível
- Para missões com dados incompletos: descarta e substitui por template
- Sistema registra a resposta raw para debug

*FA-03: Contexto indica que IA não deve gerar certas missões [RN-IA02]*
- Se a IA sugerir algo potencialmente prejudicial (detectado por keywords):
- Sistema filtra a missão e substitui por template seguro
- Sistema registra para ajuste do system prompt

*FA-04: Usuário está no plano Free e já tem 3 missões*
- Sistema não gera novas missões
- Missões existentes permanecem até completadas ou expiradas

**Fluxos de Exceção:**

*FE-01: Supabase DB indisponível*
- Sistema não consegue buscar contexto do usuário
- Atrasa geração para próxima execução do CRON (1 hora depois)
- Se persistir por 3 ciclos: registra alerta crítico

**Pós-condição (sucesso):** Missões do dia criadas e disponíveis no dashboard  
**Pós-condição (falha):** Missões de template estático usadas como fallback

---

#### UC-061: Gerar Relatório Semanal por IA

**Prioridade:** P2 — Importante  
**Ator Primário:** Scheduler (CRON)  
**Atores Secundários:** API Anthropic  
**Rastreabilidade:** [AI-006], [AI-007]  
**Trigger:** CRON job no domingo 23:00 do fuso do usuário [RN-IA05]

**Pré-condições:**
- PC-01: Usuário tem plano Starter+ (Free não recebe relatório)
- PC-02: Usuário teve atividade na semana

**Fluxo Principal:**
1. Sistema compila dados semanais:
   - XP ganho total e por pilar
   - Tarefas completadas vs criadas (taxa de conclusão)
   - Streak atual vs início da semana
   - Conquistas desbloqueadas na semana
   - Comparação com semana anterior (melhor/pior/igual)
2. Sistema envia contexto à API Anthropic com instrução para relatório semanal
3. API retorna JSON com:
   - Resumo (2-3 frases)
   - Pilar mais forte da semana
   - Pilar que precisa de atenção
   - Sugestão de foco para próxima semana
   - Mensagem motivacional personalizada
4. Sistema salva relatório no banco
5. Sistema exibe relatório no dashboard na próxima visita (card destacado)
6. Sistema envia email com resumo (se notificações por email ativas) [PROF-008]

**Fluxos Alternativos:**

*FA-01: Plano Starter — relatório simplificado*
- API recebe instrução para relatório curto (3 frases máximo)
- Sem sugestão de foco detalhada

*FA-02: Plano Boost/Ultra — relatório completo*
- Relatório com todas as seções
- Plano Ultra inclui insights mais profundos e comparação com metas de longo prazo

*FA-03: Usuário não teve atividade na semana*
- Sistema gera relatório focado em "retorno": "Sentimos sua falta! Que tal recomeçar com uma missão simples?"

**Pós-condição (sucesso):** Relatório semanal gerado e disponível

---

#### UC-062: Interagir com Mentor IA (Chat)

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Atores Secundários:** API Anthropic  
**Rastreabilidade:** [AI-008]  
**Trigger:** Usuário clica no ícone do Mentor ou botão "Falar com Mentor"

**Pré-condições:**
- PC-01: Usuário tem plano Boost+ (Starter tem apenas dicas genéricas)
- PC-02: Usuário não atingiu limite de interações IA do dia

**Fluxo Principal:**
1. Sistema exibe interface de chat com o Mentor
2. Sistema carrega últimas 5 mensagens de contexto (se houver)
3. Usuário digita mensagem (máx 500 caracteres)
4. Sistema envia mensagem + contexto do usuário à API Anthropic
5. Sistema exibe indicador de "Mentor está digitando..."
6. API retorna resposta
7. Sistema valida e sanitiza resposta [AI-016]
8. Sistema exibe resposta no chat com animação de typing
9. Sistema registra interação em `ai_interactions` [AI-014]

**Regras do Mentor:**
- O Mentor responde no contexto de gamificação (usa termos de RPG)
- O Mentor pode sugerir novas missões durante a conversa
- O Mentor não fornece conselhos médicos, financeiros ou legais (redireciona para profissionais)
- O Mentor tem personalidade consistente [AI-013]: motivador, gamer, direto

**Fluxos Alternativos:**

*FA-01: Plano Starter*
- Chat não disponível
- Substituído por dicas pré-programadas (não IA) rotativas no dashboard

*FA-02: Limite de interações atingido*
- Sistema exibe: "Seu Mentor está descansando por hoje. Volte amanhã ou faça upgrade para mais interações."
- Exibe contador de horas até reset

**Pós-condição (sucesso):** Resposta do Mentor exibida no chat

---

#### UC-063: Enviar Alerta Proativo (Automático)

**Prioridade:** P2 — Importante  
**Ator Primário:** Scheduler (CRON)  
**Rastreabilidade:** [AI-009]  
**Trigger:** CRON job diário verifica padrões negativos

**Pré-condições:**
- PC-01: Usuário tem plano Starter+ e notificações ativas

**Fluxo Principal:**
1. CRON analisa atividade recente de cada usuário
2. Sistema detecta padrões negativos:
   - 3+ dias sem completar tarefa
   - Streak prestes a quebrar (22h sem atividade no dia)
   - Pilar negligenciado por 7+ dias
   - Downgrade de engajamento (50%+ menos tarefas que semana passada)
3. Para cada padrão detectado, sistema seleciona mensagem contextual:
   - Streak em risco: "Seu streak de {N} dias está em risco! Complete uma tarefa hoje para mantê-lo."
   - Inatividade: "Faz {N} dias que não te vemos por aqui. Que tal uma missão rápida para recomeçar?"
   - Pilar negligenciado: "Seu pilar de {pilar} está pedindo atenção. Tenho uma missão especial para você."
4. Sistema envia notificação por email e/ou salva como notificação in-app [DASH-006]

**Pós-condição (sucesso):** Alerta enviado ao usuário

---

### PKG-RANK — Ranking

---

#### UC-070: Visualizar Ranking Semanal

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Rastreabilidade:** [RANK-001], [RANK-005], [RANK-006], [RANK-009]  
**Trigger:** Usuário acessa tela "Ranking"

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Sistema carrega snapshot mais recente do ranking semanal [RN-RANK-02]
2. Sistema exibe tabela com colunas: Posição, Avatar, Nome, Nível, XP da Semana [RANK-006]
3. Top 3 são destacados visualmente (ouro/prata/bronze) [RANK-007]
4. Se o usuário não está no top visível: sistema exibe a posição dele separadamente no topo da tela [RANK-005]
5. Sistema exibe tabs: "Semanal" / "Global (All-Time)"
6. Sistema exibe countdown para reset do ranking semanal (segunda 00:00 UTC) [RANK-002]

**Fluxos Alternativos:**

*FA-01: Usuário optou por não aparecer no ranking [RANK-009]*
- Usuário vê o ranking mas sua posição mostra: "Você optou por não participar do ranking. Ative nas configurações."
- Outros usuários não veem este usuário no ranking

*FA-02: Conta com menos de 7 dias*
- Usuário vê o ranking normalmente mas não aparece para outros [RN-RANK-04]
- Mensagem: "Você aparecerá no ranking após 7 dias de conta ativa"

**Pós-condição (sucesso):** Ranking exibido com posição do usuário

---

#### UC-071: Calcular Snapshot de Ranking (Automático)

**Prioridade:** P2 — Importante  
**Ator Primário:** Scheduler (CRON)  
**Rastreabilidade:** [RN-RANK-02], [RN-RANK-03]  
**Trigger:** CRON job a cada 1 hora [RN-RANK-03]

**Fluxo Principal:**
1. Sistema calcula XP ganho na semana atual por todos os usuários ativos e participantes do ranking
2. Sistema ordena por XP da semana (decrescente)
3. Sistema atribui posições (1º, 2º, 3º...)
4. Sistema salva snapshot na tabela `leaderboard_snapshots`
5. Em caso de empate: desempate por menor tempo (quem atingiu o XP primeiro)

**Pós-condição (sucesso):** Snapshot atualizado disponível para consulta

---

#### UC-072: Resetar Ranking Semanal (Automático)

**Prioridade:** P2 — Importante  
**Ator Primário:** Scheduler (CRON)  
**Rastreabilidade:** [RANK-002]  
**Trigger:** Segunda-feira 00:00 UTC

**Fluxo Principal:**
1. Sistema cria snapshot final da semana anterior
2. Sistema registra top 3 para atribuição de badges temporários [RANK-007]
3. Sistema inicia nova semana com todos os contadores zerados
4. Badges temporários da semana anterior são removidos
5. Novos badges atribuídos ao top 3 da semana finalizada

**Pós-condição (sucesso):** Ranking resetado, badges redistribuídos

---

### PKG-PAY — Pagamento e Planos

---

#### UC-080: Visualizar Planos e Pricing

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário / Visitante  
**Rastreabilidade:** [PAY-002], [PAY-003], [PAY-004], [PAY-005]  
**Trigger:** Usuário acessa tela "Planos" ou clica em CTA de upgrade

**Fluxo Principal:**
1. Sistema exibe os 4 planos lado a lado: Free, Starter, Boost (destaque), Ultra [PAY-002]
2. Plano Boost tem borda/badge "Recomendado" [PAY-005]
3. Toggle mensal/anual exibido no topo, com anual como padrão [PAY-004]
4. Preços exibidos conforme ciclo selecionado [PAY-003]
5. No modo anual, sistema exibe economia: "Economize R$ XX,XX/ano"
6. Features de cada plano listadas com checkmarks/locks
7. Plano atual do usuário é indicado com "Plano Atual"
8. Botões de "Assinar" apenas nos planos superiores ao atual

**Pós-condição (sucesso):** Tela de pricing exibida

---

#### UC-081: Realizar Upgrade de Plano

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Atores Secundários:** Stripe  
**Rastreabilidade:** [PAY-001], [PAY-007], [PAY-009], [PAY-013]  
**Trigger:** Usuário clica "Assinar" em plano superior ao atual

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Plano selecionado é superior ao atual

**Fluxo Principal:**
1. Usuário seleciona plano e ciclo (mensal/anual) em [UC-080]
2. Usuário clica em "Assinar {nome do plano}"
3. Sistema cria sessão de checkout no Stripe (Stripe Checkout) [PAY-001]
4. Sistema redireciona para a página de pagamento do Stripe
5. Usuário insere dados do cartão
6. Stripe processa pagamento
7. Stripe envia webhook `checkout.session.completed` ao backend [PAY-013]
8. Backend valida assinatura do webhook [SEC-009]
9. Backend atualiza `plan` do usuário no banco de dados
10. Backend desbloqueia recursos do novo plano imediatamente [PAY-007]
11. Sistema envia email de confirmação de pagamento [PAY-009]
12. Sistema redireciona para dashboard com banner: "Bem-vindo ao plano {nome}!"
13. Avatar, conquistas e limites são atualizados conforme novo plano

**Fluxos Alternativos:**

*FA-01: Upgrade de pago para pago superior (ex: Starter → Boost)*
- No passo 3: Stripe calcula pro-rata do valor restante do ciclo atual
- Usuário paga apenas a diferença
- Novo plano ativado imediatamente

*FA-02: Upgrade para plano anual estando no mensal*
- Stripe calcula crédito do período restante do mensal
- Aplica como desconto na primeira cobrança anual

**Fluxos de Exceção:**

*FE-01: Pagamento recusado*
- No passo 6: Stripe retorna erro
- Sistema exibe: "Pagamento recusado. Verifique os dados do cartão ou tente outro método."
- Usuário permanece no plano atual

*FE-02: Webhook não recebido (timeout)*
- Sistema implementa polling a cada 30 segundos por 5 minutos
- Se confirmar via API do Stripe: ativa plano
- Se não confirmar: registra como pendente para investigação manual

**Pós-condição (sucesso):** Plano atualizado, recursos desbloqueados, cobrança recorrente ativa  
**Pós-condição (falha):** Plano permanece inalterado

---

#### UC-082: Realizar Downgrade de Plano

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Atores Secundários:** Stripe  
**Rastreabilidade:** [PAY-008], [RN-P01] a [RN-P05]  
**Trigger:** Usuário seleciona plano inferior nas configurações

**Pré-condições:**
- PC-01: Usuário está em plano pago

**Fluxo Principal:**
1. Usuário acessa Configurações > Plano > "Alterar Plano"
2. Usuário seleciona plano inferior
3. Sistema exibe aviso: "Seu plano atual permanece ativo até {data_fim_ciclo}. Após essa data, seu plano será alterado para {novo plano}. Alguns recursos serão limitados."
4. Sistema lista recursos que serão perdidos
5. Usuário confirma
6. Sistema agenda downgrade no Stripe para o fim do ciclo [RN-P03]
7. Sistema exibe: "Downgrade agendado para {data}. Você pode cancelar a qualquer momento."
8. No fim do ciclo (webhook Stripe): sistema atualiza plano
9. Se tarefas ativas excedem novo limite [RN-P05]: tarefas excedentes ficam read-only

**Fluxos Alternativos:**

*FA-01: Downgrade para Free (cancelamento)*
- Segue fluxo de [UC-084]

*FA-02: Usuário cancela o downgrade antes do fim do ciclo*
- Usuário acessa mesma tela e clica "Cancelar Downgrade"
- Sistema remove agendamento no Stripe
- Plano continua como estava

**Pós-condição (sucesso):** Downgrade agendado para fim do ciclo

---

#### UC-083: Exibir Prompt de Upgrade Contextual

**Prioridade:** P2 — Importante  
**Ator Primário:** Sistema  
**Rastreabilidade:** PRD seção 8.3 (Estratégia de conversão)  
**Trigger:** Diversos eventos contextuais

**Pré-condições:**
- PC-01: Usuário está no plano Free ou em plano inferior ao necessário

**Fluxo Principal:**
1. Sistema detecta um dos seguintes eventos:
   - Usuário atingiu limite de tarefas ativas
   - Usuário atingiu limite de missões IA do dia
   - Usuário alcançou nível 5 (avatar poderia evoluir)
   - Usuário tentou acessar recurso premium (relatório detalhado, chat com mentor)
   - Usuário visualiza conquista bloqueada por plano
2. Sistema exibe modal/banner contextual com:
   - Mensagem personalizada ao contexto (ex: "Suas 3 missões de hoje acabaram. Quer mais?")
   - Preview do recurso bloqueado (ex: avatar evoluído em silhueta)
   - CTA: "Ver Planos" ou "Upgrade para {plano sugerido}"
   - Opção de fechar/dismiss
3. Se usuário clica no CTA: redireciona para [UC-080]
4. Se usuário fecha: sistema não exibe novamente por 24 horas (mesmo trigger)

**Regras:**
- Máximo 1 prompt de upgrade por sessão (não bombardear)
- Nunca exibir prompt durante completar tarefa ou level up (não interromper momentos positivos)
- Frequência máxima: 1 por dia por trigger

**Pós-condição (sucesso):** Prompt exibido, usuário informado sobre opção de upgrade

---

#### UC-084: Cancelar Assinatura

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Atores Secundários:** Stripe  
**Rastreabilidade:** [PAY-011], [RN-P01], [RN-P02]  
**Trigger:** Usuário acessa Configurações > Plano > "Cancelar Assinatura"

**Pré-condições:**
- PC-01: Usuário está em plano pago ativo

**Fluxo Principal:**
1. Usuário clica em "Cancelar Assinatura"
2. Sistema exibe: "Tem certeza? Seu plano continuará ativo até {data_fim_ciclo}. Após isso, você voltará para o plano Free."
3. Sistema exibe o que será perdido (lista de features premium)
4. Sistema pergunta motivo de cancelamento (opcional: preço alto / não uso / encontrei alternativa / outro)
5. Usuário confirma cancelamento [PAY-011]
6. Sistema cancela renovação no Stripe (mas mantém ativo até fim do ciclo) [RN-P01]
7. Sistema envia email: "Sua assinatura foi cancelada. Acesso premium até {data}."
8. No fim do ciclo: sistema faz downgrade para Free automaticamente [RN-P02]

**Pós-condição (sucesso):** Assinatura cancelada, plano ativo até fim do ciclo, downgrade agendado

---

#### UC-085: Processar Falha de Pagamento (Automático)

**Prioridade:** P1 — Essencial  
**Ator Primário:** Stripe (webhook)  
**Rastreabilidade:** [PAY-014], [RN-P06], [RN-P07]  
**Trigger:** Stripe envia webhook `invoice.payment_failed`

**Fluxo Principal:**
1. Stripe tenta cobrança e falha
2. Stripe envia webhook `invoice.payment_failed` ao backend
3. Backend registra falha
4. Sistema envia email ao usuário: "Falha no pagamento da sua assinatura. Atualize seu método de pagamento."
5. Sistema inicia período de graça de 7 dias [RN-P06]
6. Stripe tenta novamente automaticamente conforme configuração de dunning [PAY-014]
7. Se pagamento bem-sucedido durante período de graça: tudo normal, plano permanece
8. Se 7 dias passam sem pagamento [RN-P07]:
   - Sistema faz downgrade automático para Free
   - Sistema envia email informando o downgrade
   - Sistema exibe banner no dashboard: "Seu plano expirou. Atualize seu pagamento para reativar."

**Pós-condição (sucesso):** Pagamento retentado, ou downgrade aplicado após período de graça

---

#### UC-086: Ativar Trial do Plano Boost

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Rastreabilidade:** [PAY-012], [RN-PAY-03], [RN-PAY-04]  
**Trigger:** Usuário novo vê oferta de trial ou clica em "Experimentar Grátis"

**Pré-condições:**
- PC-01: Usuário nunca usou trial antes
- PC-02: Usuário está no plano Free

**Fluxo Principal:**
1. Sistema exibe oferta: "Experimente o plano Boost por 7 dias grátis"
2. Usuário clica em "Iniciar Trial Grátis"
3. Sistema NÃO solicita cartão de crédito [RN-PAY-03]
4. Sistema ativa plano Boost para o usuário com data_fim = hoje + 7 dias
5. Sistema exibe: "Trial Boost ativo! Aproveite por 7 dias."
6. Sistema exibe contador no dashboard: "Trial: {N} dias restantes"
7. No dia 5: sistema envia email "Seu trial acaba em 2 dias. Assine para continuar."
8. No dia 7: trial expira automaticamente
9. Se não converteu: sistema volta para Free [RN-PAY-04]
10. Se converteu durante trial: plano Boost ativado sem interrupção

**Pós-condição (sucesso):** Trial ativado por 7 dias

---

### PKG-PROF — Perfil e Configurações

---

#### UC-090: Editar Perfil

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [PROF-001] a [PROF-004]  
**Trigger:** Usuário acessa "Configurações > Perfil"

**Fluxo Principal:**
1. Sistema exibe formulário com dados atuais: nome, email, fuso horário
2. Usuário altera campos desejados
3. Se email alterado: sistema envia verificação para novo email [PROF-002]
4. Se senha alterada: sistema valida senha antiga e nova conforme [RN-AUTH-01] [PROF-003]
5. Usuário clica em "Salvar"
6. Sistema atualiza dados e exibe toast: "Perfil atualizado!"

**Pós-condição (sucesso):** Dados do perfil atualizados

---

#### UC-091: Visualizar Estatísticas do Perfil

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [PROF-010], [PROG-010]  
**Trigger:** Usuário acessa seção de estatísticas no perfil

**Fluxo Principal:**
1. Sistema carrega e exibe:
   - Total de tarefas completadas (all-time)
   - XP total acumulado
   - Dias ativos desde o cadastro
   - Streak atual e maior streak histórico [PROG-008]
   - Nível mais alto em cada pilar
   - Total de conquistas desbloqueadas / total disponível
2. Sistema exibe gráfico de evolução de XP por semana (últimas 12 semanas)
3. Sistema exibe distribuição de tarefas por pilar (pizza chart)

**Pós-condição (sucesso):** Estatísticas exibidas

---

#### UC-092: Exportar Dados Pessoais (LGPD)

**Prioridade:** P1 — Essencial  
**Ator Primário:** Usuário  
**Rastreabilidade:** [PROF-009], [LGPD-001], [LGPD-002]  
**Trigger:** Usuário acessa "Configurações > Privacidade > Exportar Meus Dados"

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Usuário clica em "Exportar Meus Dados"
2. Sistema exibe aviso: "Preparando seus dados. Você receberá um link por email quando estiver pronto."
3. Sistema gera arquivo JSON contendo:
   - Dados de conta (nome, email, data de cadastro)
   - Configuração do avatar
   - Todas as tarefas (com histórico)
   - Progressão (XP, níveis, streaks)
   - Conquistas desbloqueadas
   - Interações com IA (resumos, relatórios)
   - Dados de assinatura (plano, datas)
4. Sistema envia email com link de download (válido por 48 horas)
5. Limite: 1 exportação por semana

**Pós-condição (sucesso):** Dados exportados em JSON, link enviado por email

---

#### UC-093: Configurar Privacidade do Ranking

**Prioridade:** P2 — Importante  
**Ator Primário:** Usuário  
**Rastreabilidade:** [RANK-009], [PROF-007]  
**Trigger:** Usuário acessa "Configurações > Privacidade"

**Fluxo Principal:**
1. Sistema exibe toggle: "Aparecer no ranking público" (on/off)
2. Usuário altera configuração
3. Sistema salva preferência
4. Se desativado: usuário é removido do próximo snapshot de ranking
5. Se ativado: usuário aparece no próximo snapshot

**Pós-condição (sucesso):** Preferência de privacidade atualizada

---

### PKG-LAND — Landing Page

---

#### UC-100: Visualizar Landing Page

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Rastreabilidade:** [LAND-001] a [LAND-009]  
**Trigger:** Visitante acessa URL do sistema

**Fluxo Principal:**
1. Sistema carrega landing page com seções:
   - **Hero**: título impactante + subtítulo + CTA "Começar Grátis" + screenshot/mockup do dashboard [LAND-002]
   - **Features**: 4-6 cards com principais funcionalidades [LAND-002]
   - **Como funciona**: 3 passos ilustrados (Crie seu avatar → Complete missões → Evolua) [LAND-002]
   - **Pricing**: tabela de planos (após v1.1) ou "Comece grátis" (MVP) [LAND-007]
   - **Social proof**: depoimentos ou métricas (quando disponível)
   - **Footer CTA**: último CTA antes do rodapé [LAND-006]
2. CTA está acessível em todas as seções (header sticky + botões repetidos) [LAND-006]
3. Estética dark/neon consistente com o app [LAND-003]
4. Totalmente responsiva (mobile-first) [LAND-008]
5. Carregamento < 2 segundos [LAND-004]
6. Meta tags, Open Graph e schema.org configurados [LAND-005]

**Fluxos Alternativos:**

*FA-01: Visitante já está logado*
- CTA muda de "Começar Grátis" para "Ir para Dashboard"
- Redireciona para o dashboard ao clicar

**Pós-condição (sucesso):** Landing page carregada e exibida

---

#### UC-101: Converter Visitante em Cadastro

**Prioridade:** P0 — Crítico  
**Ator Primário:** Visitante  
**Rastreabilidade:** [LAND-002], [LAND-006]  
**Trigger:** Visitante clica em CTA "Começar Grátis" na landing page

**Fluxo Principal:**
1. Visitante clica em qualquer CTA da landing page
2. Sistema redireciona para tela de cadastro [UC-001] ou [UC-002]
3. Após cadastro: fluxo continua conforme [UC-010] (onboarding)

**Pós-condição (sucesso):** Visitante redirecionado para cadastro

---

### PKG-ANAL — Analytics e Insights

---

#### UC-120: Visualizar Analytics Detalhado

**Prioridade:** P1 — Essencial
**Ator Primário:** Usuário
**Rastreabilidade:** [ANAL-001] a [ANAL-010]
**Trigger:** Usuário acessa tela "Analytics" ou "Insights"

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Sistema carrega dados do período selecionado (padrão: 30 dias)
2. Sistema exibe 4 KPI cards no topo: XP total no período, tarefas concluídas, taxa de conclusão (%), streak atual
3. Sistema exibe gráfico de linha com XP por semana — 4 linhas coloridas por pilar + 1 linha de total
4. Sistema exibe lado a lado: gráfico radar dos 4 pilares (valores 0-10 baseados no nível relativo) + donut chart de distribuição de tarefas por pilar
5. Sistema exibe heatmap de atividade estilo GitHub — cada célula = 1 dia, cor = intensidade de XP
6. Sistema exibe card de insights IA com padrões detectados ("Seu melhor dia é terça-feira", "Você é 40% mais produtivo de manhã")
7. Sistema exibe tabela comparativa: esta semana vs anterior, este mês vs anterior, com setas ↑↓ e percentuais

**Fluxos Alternativos:**

*FA-01: Seleção de período*
- Usuário clica em tabs: 7d | 30d | 90d | 6m | 1 ano
- Todos os gráficos e KPIs recalculam para o período selecionado
- Período limitado conforme plano [RN-ANAL-01]

*FA-02: Plano Free (dados limitados)*
- Gráficos mostram apenas últimos 7 dias
- Heatmap mostra 7 dias com restante borrado + CTA de upgrade
- Radar chart visível para todos (incentivo visual)

**Pós-condição (sucesso):** Analytics exibido com dados do período selecionado

---

#### UC-121: Visualizar Briefing Diário IA

**Prioridade:** P0 — Crítico
**Ator Primário:** Usuário / Sistema (CRON)
**Atores Secundários:** API Anthropic
**Rastreabilidade:** [BRIEF-001] a [BRIEF-007]
**Trigger:** Usuário acessa dashboard pela primeira vez no dia

**Pré-condições:**
- PC-01: Usuário está autenticado
- PC-02: Briefing do dia ainda não foi gerado OU foi gerado pelo CRON

**Fluxo Principal:**
1. Sistema verifica se briefing do dia existe no cache
2. Se não existe: sistema compila contexto (últimos 7 dias) e chama API Anthropic
3. API retorna JSON com: greeting, analysis, motivational_phrase, alerts[], priorities[], level_prediction
4. Sistema valida e sanitiza resposta
5. Sistema cacheia briefing até meia-noite do fuso do usuário
6. Sistema renderiza card hero no topo do dashboard com:
   - Saudação personalizada + análise contextual
   - Frase motivacional em destaque (fonte maior, com aspas estilizadas)
   - Até 3 alertas (ícones: streak em risco, pilar fraco, prazo próximo)
   - Top 3 prioridades sugeridas para o dia
   - Previsão: "Se mantiver este ritmo, Nível X em ~Y dias"
7. Badge "IA" visível no canto do card

**Fluxos Alternativos:**

*FA-01: API indisponível*
- Sistema exibe briefing template estático com dados calculados localmente
- Saudação genérica + alertas baseados em regras (sem IA)
- Frase motivacional de banco estático

*FA-02: Briefing já gerado (retorno ao dashboard)*
- Sistema exibe briefing cacheado instantaneamente

**Pós-condição (sucesso):** Briefing do dia exibido no dashboard

---

### PKG-JOUR — Diário/Journal

---

#### UC-130: Criar Entrada no Diário

**Prioridade:** P1 — Essencial
**Ator Primário:** Usuário
**Rastreabilidade:** [JOUR-001], [JOUR-002], [JOUR-006], [JOUR-007]
**Trigger:** Usuário clica em "Nova entrada" na tela de Diário

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Sistema exibe formulário de entrada com:
   - Seletor de humor (5 emojis: ótimo, bom, neutro, ruim, péssimo)
   - Seletor de pilar (opcional: Saúde, Estudos, Finanças, Rotina, ou Geral)
   - Campo de texto (máx 2000 caracteres)
   - Toggle "Entrada privada" (não usada pelo Mentor IA)
   - Sugestão de prompt do dia: "Como foi seu dia?", "O que você aprendeu hoje?", "Pelo que é grato?"
2. Usuário preenche pelo menos o humor e algum texto
3. Usuário clica em "Salvar"
4. Sistema salva entrada com timestamp
5. Se não privada: entrada fica disponível como contexto para Mentor IA [JOUR-005]
6. Sistema exibe toast: "Reflexão salva! +5 XP" (XP bônus por journaling)
7. Entrada aparece no topo da timeline

**Pós-condição (sucesso):** Entrada criada e visível na timeline

---

#### UC-131: Visualizar Timeline do Diário

**Prioridade:** P1 — Essencial
**Ator Primário:** Usuário
**Rastreabilidade:** [JOUR-003]
**Trigger:** Usuário acessa tela "Diário"

**Fluxo Principal:**
1. Sistema carrega entradas do diário ordenadas por data (mais recente primeiro)
2. Cada entrada exibe: data, emoji de humor, badge de pilar, preview do texto (2 linhas), badge "Privada" se aplicável
3. Filtros disponíveis: por pilar, por humor, por período
4. Ao clicar em uma entrada: expande para exibir texto completo

**Pós-condição (sucesso):** Timeline do diário exibida com entradas filtráveis

---

### PKG-SHOP — Loja de Recompensas

---

#### UC-140: Visualizar e Comprar na Loja

**Prioridade:** P1 — Essencial
**Ator Primário:** Usuário
**Rastreabilidade:** [SHOP-001] a [SHOP-006]
**Trigger:** Usuário acessa tela "Loja"

**Pré-condições:**
- PC-01: Usuário está autenticado

**Fluxo Principal:**
1. Sistema exibe saldo de Ouro no topo (ícone de moeda + valor em display font)
2. Sistema exibe tabs de categoria: Auto-recompensas | Avatar | Temas | Sazonais
3. Auto-recompensas: grid de cards com emoji, nome, preço em ouro, botão "Resgatar"
4. Usuário clica em "Resgatar" em uma auto-recompensa
5. Sistema verifica saldo suficiente
6. Sistema deduz ouro e exibe animação de celebração
7. Toast especial: "Você resgatou: {recompensa}! Aproveite!"

**Fluxos Alternativos:**

*FA-01: Saldo insuficiente*
- Botão "Resgatar" exibe tooltip: "Você precisa de mais {X} ouro"
- Sugestão: "Complete tarefas para ganhar mais ouro!"

*FA-02: Criar auto-recompensa*
- Usuário clica em "+ Criar recompensa"
- Modal com: emoji picker, nome (máx 50 chars), preço em ouro (slider 10-500)
- Ao salvar: recompensa aparece no grid pessoal

**Pós-condição (sucesso):** Recompensa resgatada, ouro deduzido

---

### PKG-QUIZ — Quiz de Segmentação

---

#### UC-150: Completar Quiz de Segmentação

**Prioridade:** P1 — Essencial
**Ator Primário:** Visitante
**Rastreabilidade:** [QUIZ-001] a [QUIZ-007]
**Trigger:** Visitante clica em "Descobrir meu perfil" ou CTA similar na landing page

**Pré-condições:**
- PC-01: Visitante está na landing page (não autenticado)

**Fluxo Principal:**
1. Sistema exibe quiz fullscreen no formato one-field-at-a-time (Typeform-style)
2. Pergunta 1: "Qual área da sua vida você mais quer melhorar?" — 4 cards de pilar selecionáveis
3. Pergunta 2: "Você já usou apps de produtividade?" — Sim / Não / Vários
4. Pergunta 3: "O que te faz desistir?" — 4 opções (motivação, complexidade, esquecimento, resultado)
5. Pergunta 4: "Você gosta de competir com outros?" — 4 opções
6. Pergunta 5: "Quanto tempo por dia dedicaria?" — 4 opções (5min, 15min, 30min, 1h+)
7. Pergunta 6: "Qual classe te representa?" — 6 cards de avatar
8. Pergunta 7: "Como avalia sua vida atual?" — 4 sliders (pilares, 1-10)
9. Resultado: sistema calcula perfil e exibe:
   - Avatar sugerido com preview
   - Radar chart do perfil baseado nos sliders
   - Plano recomendado com justificativa
   - "Criar Conta" CTA
10. Sistema salva respostas em localStorage [QUIZ-006]
11. Se visitante se cadastra: dados do quiz pré-preenchem o onboarding

**Lógica de recomendação de plano:**
- Tempo ≤ 5min + não competitivo → Free
- Tempo 15min + alguma experiência → Starter
- Tempo 30min+ OU competitivo OU múltiplas prioridades → Boost
- Tempo 1h+ + competitivo + todas as prioridades → Ultra

**Pós-condição (sucesso):** Perfil calculado, plano recomendado, dados salvos para eventual cadastro

---

### PKG-ADMIN — Administração

---

#### UC-110: Visualizar Dashboard Administrativo

**Prioridade:** P2 — Importante  
**Ator Primário:** Administrador  
**Trigger:** Administrador acessa /admin

**Pré-condições:**
- PC-01: Usuário autenticado com role=admin

**Fluxo Principal:**
1. Sistema exibe dashboard com métricas:
   - Total de usuários (por plano)
   - DAU / WAU / MAU
   - Receita (MRR, total)
   - Custo de IA acumulado do mês
   - Taxas de conversão (Free → Pago)
   - Churn rate
   - Top usuários por XP
2. Sistema exibe gráficos de tendência (últimos 30 dias)
3. Sistema exibe alertas: erros de API, custos acima do esperado, picos de uso

**Pós-condição (sucesso):** Dashboard admin exibido com métricas atualizadas

---

#### UC-111: Gerenciar Conquistas

**Prioridade:** P2 — Importante  
**Ator Primário:** Administrador  
**Trigger:** Administrador acessa /admin/achievements

**Fluxo Principal:**
1. Sistema exibe lista de todas as conquistas
2. Administrador pode: criar nova conquista, editar existente, ativar/desativar
3. Ao criar/editar: sistema solicita nome, descrição, condição (JSONB), XP bônus, categoria, ícone
4. Sistema valida e salva
5. Novas conquistas ficam disponíveis para desbloqueio imediatamente

**Pós-condição (sucesso):** Conquista criada/editada

---

#### UC-112: Monitorar Custos de IA

**Prioridade:** P1 — Essencial  
**Ator Primário:** Administrador  
**Trigger:** Administrador acessa /admin/ai-costs

**Fluxo Principal:**
1. Sistema exibe:
   - Custo total de IA do mês atual
   - Custo médio por usuário
   - Custo por tipo de interação (missões, relatórios, chat)
   - Gráfico de evolução diária do custo
   - Projeção para fim do mês
2. Sistema exibe alertas se custo/usuário ultrapassar threshold configurado
3. Administrador pode ajustar limites de rate limiting por plano

**Pós-condição (sucesso):** Painel de custos exibido com projeções

---

#### UC-113: Moderar Ranking (Anti-Cheating)

**Prioridade:** P2 — Importante  
**Ator Primário:** Administrador  
**Rastreabilidade:** [RANK-010]  
**Trigger:** Sistema detecta anomalia ou administrador revisa manualmente

**Fluxo Principal:**
1. Sistema exibe lista de usuários com padrões suspeitos:
   - XP/dia muito acima da média
   - Tarefas completadas em sequência instantânea
   - Padrões de horário impossíveis
2. Administrador revisa o caso
3. Administrador pode:
   - Marcar como "OK" (falso positivo)
   - Aplicar warning ao usuário
   - Resetar XP da semana
   - Banir do ranking por tempo determinado
4. Sistema registra ação e motivo

**Pós-condição (sucesso):** Caso de suspeita resolvido

---

## 5. Matriz de Rastreabilidade UC × Requisitos

| Caso de Uso | Requisitos Cobertos |
|-------------|-------------------|
| UC-001 | AUTH-001, AUTH-003, AUTH-009, AUTH-010, RN-AUTH-01 a 04, LGPD-004 |
| UC-002 | AUTH-002 |
| UC-003 | AUTH-001, AUTH-005, AUTH-009, RN-AUTH-04, SEC-008 |
| UC-004 | AUTH-004, SEC-002 |
| UC-005 | AUTH-005 |
| UC-006 | AUTH-007, LGPD-003, RN-AUTH-03 |
| UC-010 | ONB-001 a ONB-010, RN-ONB-01 a 03 |
| UC-020 | DASH-001 a DASH-011, RN-DASH-01 a 03 |
| UC-021 | TASK-001, TASK-002, TASK-003, TASK-006, TASK-007, RN-TASK-06, RN-TASK-08 |
| UC-022 | TASK-004, TASK-005, TASK-017, PROG-001 a 009, RN-G01 a G10 |
| UC-023 | TASK-008 |
| UC-024 | TASK-009, USE-002 |
| UC-025 | TASK-011, TASK-013 |
| UC-026 | TASK-014, RN-TASK-05 |
| UC-027 | TASK-010, RN-TASK-04 |
| UC-028 | TASK-007 |
| UC-040 | AVT-001, AVT-009, AVT-010 |
| UC-041 | AVT-003, AVT-004, AVT-007 |
| UC-042 | AVT-005, AVT-006 |
| UC-050 | ACH-004, ACH-005, ACH-006, ACH-008 |
| UC-051 | ACH-002, ACH-003, ACH-009, RN-G07 |
| UC-060 | AI-001 a AI-005, AI-010 a AI-016, TASK-012, TASK-015, RN-IA01 a 07 |
| UC-061 | AI-006, AI-007 |
| UC-062 | AI-008, AI-013 |
| UC-063 | AI-009 |
| UC-070 | RANK-001, RANK-005, RANK-006, RANK-007, RANK-009 |
| UC-071 | RN-RANK-02, RN-RANK-03 |
| UC-072 | RANK-002 |
| UC-080 | PAY-002, PAY-003, PAY-004, PAY-005 |
| UC-081 | PAY-001, PAY-007, PAY-009, PAY-013, SEC-009 |
| UC-082 | PAY-008, RN-P01 a RN-P05 |
| UC-083 | PRD 8.3 |
| UC-084 | PAY-011, RN-P01, RN-P02 |
| UC-085 | PAY-014, RN-P06, RN-P07 |
| UC-086 | PAY-012, RN-PAY-03, RN-PAY-04 |
| UC-090 | PROF-001 a PROF-004 |
| UC-091 | PROF-010, PROG-010 |
| UC-092 | PROF-009, LGPD-001, LGPD-002 |
| UC-093 | RANK-009, PROF-007 |
| UC-100 | LAND-001 a LAND-009 |
| UC-101 | LAND-002, LAND-006 |
| UC-120 | ANAL-001 a ANAL-010, RN-ANAL-01 |
| UC-121 | BRIEF-001 a BRIEF-007 |
| UC-130 | JOUR-001, JOUR-002, JOUR-005, JOUR-006, JOUR-007 |
| UC-131 | JOUR-003 |
| UC-140 | SHOP-001 a SHOP-006 |
| UC-150 | QUIZ-001 a QUIZ-007 |
| UC-110 | — (requisito implícito de operação) |
| UC-111 | — (gestão de conquistas) |
| UC-112 | AI-014 (custos de IA) |
| UC-113 | RANK-010 |

---

## 6. Requisitos Não Cobertos por Casos de Uso

Os seguintes requisitos do SRS são de natureza não-funcional ou transversal e não possuem caso de uso dedicado, mas são implementados como cross-cutting concerns:

| Requisito | Implementação |
|-----------|--------------|
| PERF-001 a 009 | Verificados por testes de performance (Lighthouse, load testing) |
| SEC-001 a 012 | Implementados na arquitetura e validados por security review |
| USE-001 a 008 | Validados por testes de usabilidade e QA |
| AVAIL-001 a 006 | Configurados na infraestrutura (Supabase, Vercel, Sentry) |
| SCAL-001 a 005 | Implementados no design da arquitetura |
| COMP-001 a 006 | Validados por testes cross-browser |
| I18N-001 a 005 | Implementados na arquitetura (arquivos de tradução) |

---

*Documento de Casos de Uso completo. Deve ser revisado e aprovado pelo Product Owner antes do início da implementação. Todos os casos de uso devem ter testes de aceitação correspondentes.*
