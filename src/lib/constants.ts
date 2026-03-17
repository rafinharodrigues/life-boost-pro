export function xpForLevel(level: number): number {
  return Math.ceil(100 * Math.pow(level, 1.5));
}

export function levelFromXp(totalXp: number): number {
  let level = 1;
  let accumulated = 0;
  while (level < 100) {
    const needed = xpForLevel(level);
    if (accumulated + needed > totalXp) return level;
    accumulated += needed;
    level++;
  }
  return 100;
}

export function streakMultiplier(days: number): number {
  if (days >= 30) return 2;
  if (days >= 14) return 1.5;
  if (days >= 7) return 1.25;
  return 1;
}

export const PLAN_LIMITS = {
  free: { tasks: 15, aiMissions: 3, history: 7 },
  starter: { tasks: 50, aiMissions: 8, history: 30 },
  boost: { tasks: Infinity, aiMissions: 20, history: 180 },
  ultra: { tasks: Infinity, aiMissions: Infinity, history: Infinity },
} as const;

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/tasks", label: "Tarefas", icon: "list-checks" },
  { href: "/analytics", label: "Analytics", icon: "bar-chart-3" },
  { href: "/journal", label: "Diário", icon: "book-heart" },
  { href: "/shop", label: "Loja", icon: "store" },
  { href: "/achievements", label: "Conquistas", icon: "trophy" },
  { href: "/ranking", label: "Ranking", icon: "swords" },
  { href: "/mentor", label: "Mentor IA", icon: "bot" },
] as const;

export const NAV_BOTTOM = [
  { href: "/dashboard", label: "Home", icon: "layout-dashboard" },
  { href: "/tasks", label: "Tarefas", icon: "list-checks" },
  { href: "CREATE", label: "Criar", icon: "plus" },
  { href: "/achievements", label: "Conquistas", icon: "trophy" },
  { href: "/profile", label: "Perfil", icon: "user" },
] as const;
