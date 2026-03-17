import { create } from "zustand";
import type { Achievement } from "@/types";

interface Toast {
  id: string;
  type: "xp" | "success" | "error" | "info" | "achievement" | "levelup";
  message: string;
  pillar?: string;
  duration?: number;
}

interface LevelUpData {
  show: boolean;
  newLevel: number;
}

interface AchievementData {
  show: boolean;
  achievement: Achievement;
}

interface UiState {
  toasts: Toast[];
  levelUpData: LevelUpData | null;
  achievementData: AchievementData | null;

  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  triggerLevelUp: (level: number) => void;
  triggerAchievement: (achievement: Achievement) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  toasts: [],
  levelUpData: null,
  achievementData: null,

  addToast(toast: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substr(2, 9);
    const duration = toast.duration ?? 3000;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast(id: string) {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  triggerLevelUp(level: number) {
    set({ levelUpData: { show: true, newLevel: level } });

    setTimeout(() => {
      set({ levelUpData: null });
    }, 3000);
  },

  triggerAchievement(achievement: Achievement) {
    set({ achievementData: { show: true, achievement } });

    setTimeout(() => {
      set({ achievementData: null });
    }, 5000);
  },
}));
