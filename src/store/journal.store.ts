import { create } from "zustand";
import type { JournalEntry, PillarType, Mood } from "@/types";
import { mockJournalEntries } from "@/lib/mock-data";

interface JournalState {
  entries: JournalEntry[];

  addEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  deleteEntry: (id: string) => void;
  getFilteredEntries: (pillar?: PillarType, mood?: Mood) => JournalEntry[];
}

export const useJournalStore = create<JournalState>()((set, get) => ({
  entries: mockJournalEntries.map((e) => ({ ...e })),

  addEntry(entry: Omit<JournalEntry, "id" | "createdAt">) {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      entries: [newEntry, ...state.entries],
    }));
  },

  deleteEntry(id: string) {
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== id),
    }));
  },

  getFilteredEntries(pillar?: PillarType, mood?: Mood) {
    const { entries } = get();
    return entries.filter((entry) => {
      if (pillar && entry.pillarType !== pillar) return false;
      if (mood && entry.mood !== mood) return false;
      return true;
    });
  },
}));
