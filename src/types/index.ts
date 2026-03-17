export type PillarType = "health" | "intelligence" | "gold" | "strength";
export type Difficulty = "easy" | "medium" | "hard" | "epic";
export type TaskStatus = "pending" | "completed" | "expired" | "rejected";
export type TaskSource = "user" | "ai" | "template";
export type PlanType = "free" | "starter" | "boost" | "ultra";
export type AchievementCategory = "streak" | "milestone" | "pillar" | "challenge" | "social" | "secret";

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarBase: string;
  currentLevel: number;
  totalXp: number;
  plan: PlanType;
  streakCount: number;
  maxStreak: number;
  timezone: string;
  onboardingCompleted: boolean;
}

export interface Pillar {
  type: PillarType;
  currentLevel: number;
  currentXp: number;
  xpToNextLevel: number;
}

export interface Task {
  id: string;
  pillarType: PillarType;
  title: string;
  description?: string;
  xpReward: number;
  difficulty: Difficulty;
  isRecurring: boolean;
  status: TaskStatus;
  source: TaskSource;
  dueDate?: string;
  completedAt?: string;
  aiMotivation?: string;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  category: AchievementCategory;
  xpBonus: number;
  isSecret: boolean;
  condition: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  progressMax?: number;
}

export interface RankingEntry {
  position: number;
  userId: string;
  displayName: string;
  avatarBase: string;
  level: number;
  xpEarned: number;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
  suggestedMission?: Task;
}

export interface WeeklyActivity {
  day: string;
  xp: number;
}

export interface JournalEntry {
  id: string;
  pillarType?: PillarType;
  mood: 1 | 2 | 3 | 4 | 5;
  content: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface ShopReward {
  id: string;
  emoji: string;
  name: string;
  costGold: number;
  timesRedeemed: number;
}

export interface DailyBriefing {
  greeting: string;
  analysis: string;
  motivationalPhrase: string;
  alerts: { type: "streak" | "pillar" | "deadline"; message: string }[];
  priorities: string[];
  levelPrediction: string;
}

export interface HeatmapDay {
  date: string;
  xp: number;
  tasks: number;
}

export type Mood = 1 | 2 | 3 | 4 | 5;
export const MOOD_EMOJIS: Record<Mood, string> = {
  1: "😢", 2: "😕", 3: "😐", 4: "😊", 5: "😄",
};

export const PILLAR_CONFIG: Record<PillarType, { label: string; icon: string; color: string }> = {
  health: { label: "Saúde", icon: "heart-pulse", color: "pillar-health" },
  intelligence: { label: "Estudos", icon: "book-open", color: "pillar-intelligence" },
  gold: { label: "Finanças", icon: "coins", color: "pillar-gold" },
  strength: { label: "Rotina", icon: "clock", color: "pillar-strength" },
};

export const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; xp: number; color: string }> = {
  easy: { label: "Fácil", xp: 10, color: "semantic-success" },
  medium: { label: "Médio", xp: 25, color: "accent-cyan" },
  hard: { label: "Difícil", xp: 50, color: "accent-amber" },
  epic: { label: "Épico", xp: 100, color: "accent-pink" },
};
