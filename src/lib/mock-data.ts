import type {
  User, Pillar, Task, Achievement, RankingEntry, ChatMessage, WeeklyActivity,
  JournalEntry, ShopReward, DailyBriefing, HeatmapDay,
} from "@/types";

export const mockUser: User = {
  id: "usr-001",
  displayName: "João Warrior",
  email: "joao@email.com",
  avatarBase: "warrior",
  currentLevel: 12,
  totalXp: 4850,
  plan: "boost",
  streakCount: 12,
  maxStreak: 34,
  timezone: "America/Sao_Paulo",
  onboardingCompleted: true,
};

export const mockPillars: Pillar[] = [
  { type: "health", currentLevel: 8, currentXp: 580, xpToNextLevel: 849 },
  { type: "intelligence", currentLevel: 14, currentXp: 1200, xpToNextLevel: 1470 },
  { type: "gold", currentLevel: 10, currentXp: 720, xpToNextLevel: 1000 },
  { type: "strength", currentLevel: 11, currentXp: 890, xpToNextLevel: 1153 },
];

export const mockTasks: Task[] = [
  { id: "t1", pillarType: "health", title: "Caminhada de 20 minutos", xpReward: 25, difficulty: "medium", isRecurring: false, status: "pending", source: "ai", aiMotivation: "Seu pilar de Saúde precisa de atenção!" },
  { id: "t2", pillarType: "intelligence", title: "Estudar React por 1 hora", xpReward: 50, difficulty: "hard", isRecurring: false, status: "pending", source: "ai", aiMotivation: "Continue evoluindo suas skills!" },
  { id: "t3", pillarType: "gold", title: "Não pedir delivery hoje", xpReward: 25, difficulty: "medium", isRecurring: false, status: "completed", source: "user", completedAt: "2026-03-17T14:30:00" },
  { id: "t4", pillarType: "strength", title: "Meditar 10 minutos", xpReward: 10, difficulty: "easy", isRecurring: true, status: "completed", source: "user", completedAt: "2026-03-17T08:00:00" },
  { id: "t5", pillarType: "gold", title: "Revisar orçamento do mês", xpReward: 25, difficulty: "medium", isRecurring: false, status: "pending", source: "ai" },
  { id: "t6", pillarType: "health", title: "Correr 30 minutos", xpReward: 50, difficulty: "hard", isRecurring: true, status: "pending", source: "user", dueDate: "2026-03-18" },
  { id: "t7", pillarType: "strength", title: "Organizar mesa de trabalho", xpReward: 10, difficulty: "easy", isRecurring: false, status: "pending", source: "user" },
  { id: "t8", pillarType: "intelligence", title: "Ler 20 páginas do livro", xpReward: 25, difficulty: "medium", isRecurring: true, status: "expired", source: "user" },
];

export const mockAchievements: Achievement[] = [
  { id: "a1", code: "FIRST_TASK", name: "Primeiro Passo", description: "Completar a primeira tarefa", category: "milestone", xpBonus: 50, isSecret: false, condition: "1 tarefa", unlocked: true, unlockedAt: "2026-01-15" },
  { id: "a2", code: "STREAK_7", name: "Uma Semana Forte", description: "Manter streak de 7 dias", category: "streak", xpBonus: 100, isSecret: false, condition: "7 dias", unlocked: true, unlockedAt: "2026-02-01" },
  { id: "a3", code: "STREAK_30", name: "Mês de Ferro", description: "Manter streak de 30 dias", category: "streak", xpBonus: 500, isSecret: false, condition: "30 dias", unlocked: false, progress: 12, progressMax: 30 },
  { id: "a4", code: "LEVEL_5", name: "Aprendiz", description: "Alcançar nível geral 5", category: "milestone", xpBonus: 200, isSecret: false, condition: "Nível 5", unlocked: true, unlockedAt: "2026-01-28" },
  { id: "a5", code: "LEVEL_10", name: "Guerreiro", description: "Alcançar nível geral 10", category: "milestone", xpBonus: 500, isSecret: false, condition: "Nível 10", unlocked: true, unlockedAt: "2026-02-20" },
  { id: "a6", code: "LEVEL_25", name: "Veterano", description: "Alcançar nível geral 25", category: "milestone", xpBonus: 1500, isSecret: false, condition: "Nível 25", unlocked: false, progress: 12, progressMax: 25 },
  { id: "a7", code: "HEALTH_10", name: "Corpo São", description: "Alcançar nível 10 em Saúde", category: "pillar", xpBonus: 300, isSecret: false, condition: "Saúde Nv.10", unlocked: false, progress: 8, progressMax: 10 },
  { id: "a8", code: "INT_10", name: "Mente Afiada", description: "Alcançar nível 10 em Estudos", category: "pillar", xpBonus: 300, isSecret: false, condition: "Estudos Nv.10", unlocked: true, unlockedAt: "2026-02-15" },
  { id: "a9", code: "GOLD_10", name: "Cofre Cheio", description: "Alcançar nível 10 em Finanças", category: "pillar", xpBonus: 300, isSecret: false, condition: "Finanças Nv.10", unlocked: true, unlockedAt: "2026-03-10" },
  { id: "a10", code: "STR_10", name: "Disciplinado", description: "Alcançar nível 10 em Rotina", category: "pillar", xpBonus: 300, isSecret: false, condition: "Rotina Nv.10", unlocked: false, progress: 11, progressMax: 10 },
  { id: "a11", code: "ALL_DAILY", name: "Dia Perfeito", description: "Completar todas as missões do dia", category: "challenge", xpBonus: 75, isSecret: false, condition: "Todas do dia", unlocked: false },
  { id: "a12", code: "TASKS_100", name: "Centurião", description: "Completar 100 tarefas", category: "milestone", xpBonus: 400, isSecret: false, condition: "100 tarefas", unlocked: true, unlockedAt: "2026-03-05" },
  { id: "a13", code: "TASKS_500", name: "Lenda", description: "Completar 500 tarefas", category: "milestone", xpBonus: 2000, isSecret: false, condition: "500 tarefas", unlocked: false, progress: 147, progressMax: 500 },
  { id: "a14", code: "AI_ACCEPT_10", name: "Discípulo", description: "Completar 10 missões da IA", category: "challenge", xpBonus: 150, isSecret: false, condition: "10 missões IA", unlocked: true, unlockedAt: "2026-02-10" },
  { id: "a15", code: "SECRET_01", name: "???", description: "???", category: "secret", xpBonus: 200, isSecret: true, condition: "???", unlocked: false },
];

export const mockRanking: RankingEntry[] = [
  { position: 1, userId: "u1", displayName: "ShadowBlade", avatarBase: "ninja", level: 42, xpEarned: 2450 },
  { position: 2, userId: "u2", displayName: "ArcaneQueen", avatarBase: "mage", level: 38, xpEarned: 2120 },
  { position: 3, userId: "u3", displayName: "IronClad", avatarBase: "warrior", level: 35, xpEarned: 1890 },
  { position: 4, userId: "u4", displayName: "NightOwl", avatarBase: "archer", level: 33, xpEarned: 1650 },
  { position: 5, userId: "u5", displayName: "CodeWarrior", avatarBase: "engineer", level: 31, xpEarned: 1420 },
  { position: 6, userId: "u6", displayName: "ZenMaster", avatarBase: "healer", level: 28, xpEarned: 1200 },
  { position: 7, userId: "u7", displayName: "StormRider", avatarBase: "samurai", level: 25, xpEarned: 980 },
  { position: 8, userId: "u8", displayName: "DruidKing", avatarBase: "druid", level: 22, xpEarned: 750 },
  { position: 47, userId: "usr-001", displayName: "João Warrior", avatarBase: "warrior", level: 12, xpEarned: 340, isCurrentUser: true },
];

export const mockChat: ChatMessage[] = [
  { id: "m1", sender: "mentor", text: "Bom dia, guerreiro! Vi que seu pilar de Saúde precisa de atenção. Que tal uma missão rápida?", timestamp: "14:32" },
  { id: "m2", sender: "user", text: "Me sugere algo leve, tô cansado hoje", timestamp: "14:33" },
  {
    id: "m3", sender: "mentor", text: "Entendido! Que tal isso:", timestamp: "14:33",
    suggestedMission: { id: "tm1", pillarType: "health", title: "Caminhada leve de 15 minutos", xpReward: 10, difficulty: "easy", isRecurring: false, status: "pending", source: "ai" },
  },
];

export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: "Seg", xp: 120 },
  { day: "Ter", xp: 85 },
  { day: "Qua", xp: 45 },
  { day: "Qui", xp: 150 },
  { day: "Sex", xp: 95 },
  { day: "Sáb", xp: 130 },
  { day: "Dom", xp: 0 },
];

export const mockMentorMessage = "Bom dia, guerreiro! Ontem você mandou bem em Estudos. Hoje foco em Saúde!";

export const mockBriefing: DailyBriefing = {
  greeting: "Bom dia, João! Ontem você completou 89% das missões — excelente ritmo!",
  analysis: "Seu pilar de Saúde está 23% abaixo da média das últimas 2 semanas. Estudos continua sendo seu ponto forte com crescimento constante. Finanças estabilizou após uma boa semana de controle.",
  motivationalPhrase: "Disciplina é escolher entre o que você quer agora e o que você mais quer.",
  alerts: [
    { type: "streak", message: "Streak de 12 dias — mantenha o ritmo!" },
    { type: "pillar", message: "Saúde precisa de atenção: 5 dias sem atividade física" },
    { type: "deadline", message: "Revisão financeira mensal vence amanhã" },
  ],
  priorities: [
    "Fazer 20min de exercício (Saúde precisa de atenção)",
    "Completar módulo 5 de React (sequência de 3 dias)",
    "Revisar orçamento mensal (prazo amanhã)",
  ],
  levelPrediction: "Se mantiver este ritmo, você atinge Nível 15 em ~12 dias",
};

export const mockJournalEntries: JournalEntry[] = [
  { id: "j1", mood: 5, content: "Dia incrível! Consegui completar todas as missões e ainda fiz uma corrida de 5km. Me sinto muito motivado.", pillarType: "health", isPrivate: false, createdAt: "2026-03-17T22:00:00" },
  { id: "j2", mood: 4, content: "Bom progresso nos estudos de React. O módulo de hooks está ficando mais claro. Preciso focar mais em TypeScript.", pillarType: "intelligence", isPrivate: false, createdAt: "2026-03-16T21:30:00" },
  { id: "j3", mood: 3, content: "Dia neutro. Não consegui manter a rotina matinal mas pelo menos controlei os gastos.", isPrivate: false, createdAt: "2026-03-15T20:00:00" },
  { id: "j4", mood: 2, content: "Estou me sentindo sobrecarregado com as metas. Talvez precise reduzir um pouco o ritmo.", isPrivate: true, createdAt: "2026-03-14T23:00:00" },
  { id: "j5", mood: 4, content: "Consegui economizar R$150 esta semana cortando delivery. Pequenas vitórias!", pillarType: "gold", isPrivate: false, createdAt: "2026-03-13T19:00:00" },
];

export const mockShopRewards: ShopReward[] = [
  { id: "sr1", emoji: "🎬", name: "Assistir 1 episódio de série", costGold: 50, timesRedeemed: 8 },
  { id: "sr2", emoji: "🍕", name: "Pedir pizza no fim de semana", costGold: 150, timesRedeemed: 2 },
  { id: "sr3", emoji: "🎮", name: "1 hora de videogame", costGold: 80, timesRedeemed: 5 },
  { id: "sr4", emoji: "☕", name: "Café especial na cafeteria", costGold: 60, timesRedeemed: 4 },
  { id: "sr5", emoji: "📚", name: "Comprar um livro novo", costGold: 200, timesRedeemed: 1 },
  { id: "sr6", emoji: "💤", name: "Dormir até tarde no domingo", costGold: 100, timesRedeemed: 3 },
];

export const mockHeatmap: HeatmapDay[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const xp = Math.random() > 0.15 ? Math.floor(Math.random() * (isWeekend ? 100 : 200) + 10) : 0;
  return {
    date: date.toISOString().split("T")[0],
    xp,
    tasks: xp > 0 ? Math.floor(xp / 25) + 1 : 0,
  };
});

export const mockUserGold = 340;

export const mockXpToday = 85;
export const mockXpAvgDaily = 76;

export const mockWeeklyXpTrend = [
  { week: "Sem 1", health: 120, intelligence: 200, gold: 80, strength: 150 },
  { week: "Sem 2", health: 90, intelligence: 250, gold: 110, strength: 180 },
  { week: "Sem 3", health: 160, intelligence: 180, gold: 95, strength: 200 },
  { week: "Sem 4", health: 140, intelligence: 220, gold: 130, strength: 170 },
  { week: "Sem 5", health: 80, intelligence: 280, gold: 150, strength: 190 },
  { week: "Sem 6", health: 110, intelligence: 240, gold: 140, strength: 210 },
];
