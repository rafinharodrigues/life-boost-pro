import { create } from "zustand";
import type { ShopReward } from "@/types";
import { mockShopRewards } from "@/lib/mock-data";
import { useUserStore } from "./user.store";
import { useUiStore } from "./ui.store";

interface ShopState {
  rewards: ShopReward[];

  createReward: (data: Omit<ShopReward, "id" | "timesRedeemed">) => void;
  redeemReward: (id: string) => boolean;
  deleteReward: (id: string) => void;
}

export const useShopStore = create<ShopState>()((set, get) => ({
  rewards: mockShopRewards.map((r) => ({ ...r })),

  createReward(data: Omit<ShopReward, "id" | "timesRedeemed">) {
    const newReward: ShopReward = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timesRedeemed: 0,
    };

    set((state) => ({
      rewards: [...state.rewards, newReward],
    }));
  },

  redeemReward(id: string) {
    const reward = get().rewards.find((r) => r.id === id);
    if (!reward) return false;

    const userStore = useUserStore.getState();
    const uiStore = useUiStore.getState();

    // Attempt to spend gold
    const success = userStore.spendGold(reward.costGold);
    if (!success) {
      uiStore.addToast({
        type: "error",
        message: "Gold insuficiente!",
      });
      return false;
    }

    // Increment times redeemed
    set((state) => ({
      rewards: state.rewards.map((r) =>
        r.id === id ? { ...r, timesRedeemed: r.timesRedeemed + 1 } : r
      ),
    }));

    // Show success toast
    uiStore.addToast({
      type: "success",
      message: `${reward.emoji} ${reward.name} resgatado!`,
    });

    return true;
  },

  deleteReward(id: string) {
    set((state) => ({
      rewards: state.rewards.filter((r) => r.id !== id),
    }));
  },
}));
