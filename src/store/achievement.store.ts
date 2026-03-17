import { create } from "zustand";
import type { Achievement } from "@/types";
import { mockAchievements } from "@/lib/mock-data";
import { useUserStore } from "./user.store";
import { useUiStore } from "./ui.store";

interface AchievementState {
  achievements: Achievement[];

  checkAchievements: () => void;
  getUnlockedCount: () => number;
  getNextAchievements: () => Achievement[];
}

export const useAchievementStore = create<AchievementState>()((set, get) => ({
  achievements: mockAchievements.map((a) => ({ ...a })),

  checkAchievements() {
    const userState = useUserStore.getState();
    const uiStore = useUiStore.getState();

    const { user, pillars } = userState;

    // Lazy import to avoid circular dependency with task.store
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useTaskStore } = require("./task.store") as {
      useTaskStore: typeof import("./task.store").useTaskStore;
    };
    const tasks = useTaskStore.getState().tasks;

    const completedTasks = tasks.filter((t) => t.status === "completed");
    const totalCompleted = completedTasks.length;
    const aiCompleted = completedTasks.filter((t) => t.source === "ai").length;

    const getPillarLevel = (type: string) =>
      pillars.find((p) => p.type === type)?.currentLevel ?? 0;

    // Check if all of today's tasks are completed
    const todayStr = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter((t) => {
      if (t.dueDate && t.dueDate.startsWith(todayStr)) return true;
      if (t.completedAt && t.completedAt.startsWith(todayStr)) return true;
      return false;
    });
    const allDailyCompleted =
      todayTasks.length > 0 &&
      todayTasks.every((t) => t.status === "completed");

    set((state) => {
      const achievements = state.achievements.map((achievement) => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        let progress = achievement.progress;
        const progressMax = achievement.progressMax;

        switch (achievement.code) {
          case "FIRST_TASK":
            progress = Math.min(totalCompleted, 1);
            shouldUnlock = totalCompleted >= 1;
            break;
          case "STREAK_7":
            progress = Math.min(user.streakCount, 7);
            shouldUnlock = user.streakCount >= 7;
            break;
          case "STREAK_30":
            progress = Math.min(user.streakCount, 30);
            shouldUnlock = user.streakCount >= 30;
            break;
          case "LEVEL_5":
            progress = Math.min(user.currentLevel, 5);
            shouldUnlock = user.currentLevel >= 5;
            break;
          case "LEVEL_10":
            progress = Math.min(user.currentLevel, 10);
            shouldUnlock = user.currentLevel >= 10;
            break;
          case "LEVEL_25":
            progress = Math.min(user.currentLevel, 25);
            shouldUnlock = user.currentLevel >= 25;
            break;
          case "HEALTH_10":
            progress = Math.min(getPillarLevel("health"), 10);
            shouldUnlock = getPillarLevel("health") >= 10;
            break;
          case "INT_10":
            progress = Math.min(getPillarLevel("intelligence"), 10);
            shouldUnlock = getPillarLevel("intelligence") >= 10;
            break;
          case "GOLD_10":
            progress = Math.min(getPillarLevel("gold"), 10);
            shouldUnlock = getPillarLevel("gold") >= 10;
            break;
          case "STR_10":
            progress = Math.min(getPillarLevel("strength"), 10);
            shouldUnlock = getPillarLevel("strength") >= 10;
            break;
          case "ALL_DAILY":
            shouldUnlock = allDailyCompleted;
            break;
          case "TASKS_100":
            progress = Math.min(totalCompleted, 100);
            shouldUnlock = totalCompleted >= 100;
            break;
          case "TASKS_500":
            progress = Math.min(totalCompleted, 500);
            shouldUnlock = totalCompleted >= 500;
            break;
          case "AI_ACCEPT_10":
            progress = Math.min(aiCompleted, 10);
            shouldUnlock = aiCompleted >= 10;
            break;
          default:
            break;
        }

        if (shouldUnlock) {
          const unlocked: Achievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            progress: progressMax ?? progress,
          };
          // Defer notification to avoid nested set calls
          setTimeout(() => uiStore.triggerAchievement(unlocked), 0);
          return unlocked;
        }

        return { ...achievement, progress };
      });

      return { achievements };
    });
  },

  getUnlockedCount() {
    return get().achievements.filter((a) => a.unlocked).length;
  },

  getNextAchievements() {
    const locked = get().achievements.filter(
      (a) =>
        !a.unlocked &&
        !a.isSecret &&
        a.progressMax != null &&
        a.progressMax > 0
    );

    return locked
      .sort((a, b) => {
        const ratioA = (a.progress ?? 0) / (a.progressMax ?? 1);
        const ratioB = (b.progress ?? 0) / (b.progressMax ?? 1);
        return ratioB - ratioA;
      })
      .slice(0, 3);
  },
}));
