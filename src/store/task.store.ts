import { create } from "zustand";
import type { Task, PillarType, TaskStatus, Difficulty } from "@/types";
import { streakMultiplier } from "@/lib/constants";
import { mockTasks } from "@/lib/mock-data";
import { useUserStore } from "./user.store";
import { useAchievementStore } from "./achievement.store";
import { useUiStore } from "./ui.store";

const GOLD_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 5,
  medium: 12,
  hard: 25,
  epic: 50,
};

interface CompleteTaskResult {
  xpGained: number;
  goldGained: number;
  leveledUp: boolean;
}

interface TaskState {
  tasks: Task[];

  completeTask: (id: string) => CompleteTaskResult | null;
  createTask: (data: Partial<Task>) => void;
  rejectTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getFilteredTasks: (pillar?: PillarType, status?: TaskStatus) => Task[];
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: mockTasks.map((t) => ({ ...t })),

  completeTask(id: string): CompleteTaskResult | null {
    const task = get().tasks.find((t) => t.id === id);
    if (!task || task.status === "completed") return null;

    const userStore = useUserStore.getState();
    const achievementStore = useAchievementStore.getState();
    const uiStore = useUiStore.getState();

    // 1. Base XP from task
    const baseXp = task.xpReward;

    // 2. Apply streak multiplier
    const multiplier = streakMultiplier(userStore.user.streakCount);
    const finalXp = Math.ceil(baseXp * multiplier);

    // 3. Mark task as completed
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, status: "completed" as const, completedAt: new Date().toISOString() }
          : t
      ),
    }));

    // 4. Add XP to the corresponding pillar
    const { leveled, newLevel } = userStore.addXpToPillar(
      task.pillarType,
      finalXp
    );

    // 5. Calculate and add gold
    const goldGained = GOLD_BY_DIFFICULTY[task.difficulty];
    userStore.addGold(goldGained);

    // 6. Check achievements
    achievementStore.checkAchievements();

    // 7. Show XP toast
    uiStore.addToast({
      type: "xp",
      message: `+${finalXp} XP`,
      pillar: task.pillarType,
    });

    // 8. If leveled up, trigger level up animation
    if (leveled) {
      uiStore.triggerLevelUp(newLevel);
    }

    // 9. Return result
    return {
      xpGained: finalXp,
      goldGained,
      leveledUp: leveled,
    };
  },

  createTask(data: Partial<Task>) {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      pillarType: data.pillarType ?? "health",
      title: data.title ?? "Nova tarefa",
      description: data.description,
      xpReward: data.xpReward ?? 10,
      difficulty: data.difficulty ?? "easy",
      isRecurring: data.isRecurring ?? false,
      status: "pending",
      source: "user",
      dueDate: data.dueDate,
      aiMotivation: data.aiMotivation,
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  rejectTask(id: string) {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: "rejected" as const } : t
      ),
    }));
  },

  deleteTask(id: string) {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },

  getFilteredTasks(pillar?: PillarType, status?: TaskStatus) {
    const { tasks } = get();
    return tasks.filter((task) => {
      if (pillar && task.pillarType !== pillar) return false;
      if (status && task.status !== status) return false;
      return true;
    });
  },
}));
