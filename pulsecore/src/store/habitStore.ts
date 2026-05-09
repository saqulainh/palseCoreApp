import { create } from "zustand";

export interface Habit {
  id: number;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekData: boolean[];
}

interface HabitState {
  habits: Habit[];
  toggleHabit: (id: number) => void;
  addHabit: (name: string, icon: string) => void;
  removeHabit: (id: number) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [
    { id: 1, name: "Morning Workout", icon: "fitness_center", streak: 12, completedToday: true, weekData: [true, true, true, false, true, true, true] },
    { id: 2, name: "Drink 2L Water", icon: "water_drop", streak: 8, completedToday: false, weekData: [true, true, false, true, true, true, false] },
    { id: 3, name: "8h Sleep", icon: "bedtime", streak: 5, completedToday: false, weekData: [false, true, true, true, false, true, false] },
    { id: 4, name: "Stretching", icon: "self_improvement", streak: 3, completedToday: true, weekData: [true, false, true, false, true, false, true] },
    { id: 5, name: "Meditation", icon: "spa", streak: 15, completedToday: true, weekData: [true, true, true, true, true, true, true] },
    { id: 6, name: "Log Meals", icon: "restaurant", streak: 7, completedToday: false, weekData: [true, true, true, true, true, true, false] },
  ],

  toggleHabit: (id) =>
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
    })),

  addHabit: (name, icon) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: Date.now(),
          name,
          icon,
          streak: 0,
          completedToday: false,
          weekData: [false, false, false, false, false, false, false],
        },
      ],
    })),

  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    })),
}));
