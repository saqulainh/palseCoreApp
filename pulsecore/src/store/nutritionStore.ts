import { create } from "zustand";
import { api } from "@/lib/api/client";

export interface MealItem {
  name: string;
  cal: number;
  p: number;
  c: number;
  f: number;
}

export interface MealSlot {
  slot: string;
  icon: string;
  items: MealItem[];
}

interface NutritionState {
  waterGlasses: number;
  meals: MealSlot[];
  goals: { calories: number; protein: number; carbs: number; fat: number };
  fetchNutrition: () => Promise<void>;
  updateWater: (glasses: number) => Promise<void>;
  addMeal: (slot: string, item: MealItem) => Promise<void>;
}

export const useNutritionStore = create<NutritionState>((set, get) => ({
  waterGlasses: 5,
  goals: { calories: 2400, protein: 180, carbs: 280, fat: 70 },
  meals: [
    { slot: "Breakfast", icon: "egg_alt", items: [
      { name: "Oatmeal with banana", cal: 340, p: 12, c: 58, f: 8 },
      { name: "Protein shake", cal: 200, p: 30, c: 10, f: 4 },
    ]},
    { slot: "Lunch", icon: "lunch_dining", items: [
      { name: "Grilled chicken salad", cal: 480, p: 42, c: 20, f: 26 },
    ]},
    { slot: "Dinner", icon: "dinner_dining", items: [] },
    { slot: "Snacks", icon: "cookie", items: [
      { name: "Greek yogurt", cal: 150, p: 15, c: 12, f: 5 },
    ]},
  ],

  fetchNutrition: async () => {
    try {
      const data = await api.get<any>("/api/v1/nutrition/today/");
      if (data) {
        set({
          waterGlasses: data.water_glasses || 0,
          // Hydrate other data as needed if API returns it
        });
      }
    } catch(err) {
      console.error("Failed to fetch nutrition data:", err);
    }
  },

  updateWater: async (glasses) => {
    set({ waterGlasses: glasses });
    try {
      await api.post("/api/v1/nutrition/water/", { amount: glasses });
    } catch(err) {
      console.error("Failed to update water:", err);
    }
  },

  addMeal: async (slot, item) => {
    set((state) => ({
      meals: state.meals.map((m) =>
        m.slot === slot ? { ...m, items: [...m.items, item] } : m
      ),
    }));
    try {
      await api.post("/api/v1/nutrition/meal/", { slot, ...item });
    } catch(err) {
      console.error("Failed to log meal:", err);
    }
  }
}));
