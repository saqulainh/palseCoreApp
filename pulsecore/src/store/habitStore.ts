import { create } from "zustand";
import { api } from "@/lib/api/client";

export interface Habit {
  id: number;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekData: boolean[];
}

  habits: Habit[];
  fetchHabits: () => Promise<void>;
  toggleHabit: (id: number) => Promise<void>;
  addHabit: (name: string, icon: string) => Promise<void>;
  removeHabit: (id: number) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],

  fetchHabits: async () => {
    try {
      const data = await api.get<any[]>("/api/v1/habits/");
      const habits: Habit[] = data.map(h => ({
        id: h.id,
        name: h.name,
        icon: h.name.toLowerCase().includes("water") ? "water_drop" : 
              h.name.toLowerCase().includes("sleep") ? "bedtime" : 
              h.name.toLowerCase().includes("medit") ? "spa" : "task_alt",
        streak: h.streak || 0,
        completedToday: h.completed_today || false,
        weekData: [true, false, true, false, true, false, true], // Mock data for UI 
      }));
      set({ habits });
    } catch(err) {
      console.error("Failed to fetch habits:", err);
    }
  },

  toggleHabit: async (id) => {
    // Optimistic UI update
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: h.completedToday ? h.streak - 1 : h.streak + 1,
            }
          : h
      ),
    }));

    // Perform API call
    try {
      await api.post(`/api/v1/habits/${id}/log/`);
    } catch (err) {
      console.error("Failed to log habit:", err);
      // Revert optimism if needed (skipped for simplicity here)
    }
  },

  addHabit: async (name, icon) => {
    try {
      const h = await api.post<any>("/api/v1/habits/", { name, description: "" });
      const newHabit: Habit = {
        id: h.id,
        name: h.name,
        icon,
        streak: 0,
        completedToday: false,
        weekData: [false, false, false, false, false, false, false],
      };
      set((state) => ({ habits: [...state.habits, newHabit] }));
    } catch (err) {
      console.error("Failed to add habit:", err);
    }
  },

  removeHabit: async (id) => {
    // Optimistic UI update
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    }));

    try {
      await api.delete(`/api/v1/habits/${id}/`);
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  },
}));
