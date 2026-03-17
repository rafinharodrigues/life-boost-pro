import { create } from "zustand";
import type { User, Pillar, PillarType } from "@/types";
import { xpForLevel } from "@/lib/constants";
import { mockUser, mockPillars, mockUserGold } from "@/lib/mock-data";

interface UserState {
  user: User;
  pillars: Pillar[];
  gold: number;

  addXpToPillar: (
    pillarType: PillarType,
    xp: number
  ) => { leveled: boolean; newLevel: number };
  addGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: { ...mockUser },
  pillars: mockPillars.map((p) => ({ ...p })),
  gold: mockUserGold,

  addXpToPillar(pillarType: PillarType, xp: number) {
    let leveled = false;
    let newLevel = 0;

    set((state) => {
      const pillars = state.pillars.map((pillar) => {
        if (pillar.type !== pillarType) return pillar;

        let currentXp = pillar.currentXp + xp;
        let currentLevel = pillar.currentLevel;
        let xpToNextLevel = pillar.xpToNextLevel;

        // Check for level ups (may level up multiple times)
        while (currentXp >= xpToNextLevel) {
          currentXp -= xpToNextLevel;
          currentLevel++;
          xpToNextLevel = xpForLevel(currentLevel);
          leveled = true;
        }

        if (leveled) {
          newLevel = currentLevel;
        }

        return { ...pillar, currentXp, currentLevel, xpToNextLevel };
      });

      // Recalculate user level as floor of average of 4 pillar levels
      const avgLevel = Math.floor(
        pillars.reduce((sum, p) => sum + p.currentLevel, 0) / pillars.length
      );

      const user = {
        ...state.user,
        currentLevel: avgLevel,
        totalXp: state.user.totalXp + xp,
      };

      newLevel = avgLevel;

      return { pillars, user };
    });

    return { leveled, newLevel };
  },

  addGold(amount: number) {
    set((state) => ({ gold: state.gold + amount }));
  },

  spendGold(amount: number) {
    const { gold } = get();
    if (gold < amount) return false;
    set({ gold: gold - amount });
    return true;
  },

  incrementStreak() {
    set((state) => {
      const newStreak = state.user.streakCount + 1;
      return {
        user: {
          ...state.user,
          streakCount: newStreak,
          maxStreak: Math.max(newStreak, state.user.maxStreak),
        },
      };
    });
  },

  resetStreak() {
    set((state) => ({
      user: { ...state.user, streakCount: 0 },
    }));
  },
}));
