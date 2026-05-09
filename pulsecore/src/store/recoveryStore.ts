import { create } from "zustand";

export interface RecoveryBreakdown {
  sleepQuality: number;
  hrv: number;
  restingHR: number;
  soreness: number;
}

export interface MuscleStatus {
  id: string;
  label: string;
  side: "front" | "back";
  x: number;
  y: number;
  soreness: number; // 0-5
}

interface RecoveryState {
  recoveryScore: number;
  readinessScore: number;
  breakdown: RecoveryBreakdown;
  muscles: MuscleStatus[];
  hrvHistory: number[];
  readinessLevel: "rest" | "easy" | "moderate" | "intense";

  // Actions
  updateRecoveryScore: (score: number) => void;
  updateMuscleSoreness: (muscleId: string, soreness: number) => void;
  refreshScores: () => void;
}

const DEFAULT_MUSCLES: MuscleStatus[] = [
  { id: "chest", label: "Chest", side: "front", x: 42, y: 22, soreness: 1 },
  { id: "shoulders", label: "Shoulders", side: "front", x: 28, y: 18, soreness: 0 },
  { id: "biceps", label: "Biceps", side: "front", x: 22, y: 30, soreness: 2 },
  { id: "abs", label: "Abs", side: "front", x: 42, y: 36, soreness: 0 },
  { id: "quads", label: "Quads", side: "front", x: 36, y: 55, soreness: 4 },
  { id: "calves", label: "Calves", side: "front", x: 36, y: 75, soreness: 3 },
  { id: "traps", label: "Traps", side: "back", x: 60, y: 16, soreness: 1 },
  { id: "lats", label: "Lats", side: "back", x: 62, y: 28, soreness: 0 },
  { id: "lower_back", label: "Lower Back", side: "back", x: 62, y: 38, soreness: 2 },
  { id: "glutes", label: "Glutes", side: "back", x: 62, y: 46, soreness: 1 },
  { id: "hamstrings", label: "Hamstrings", side: "back", x: 62, y: 58, soreness: 3 },
];

export const useRecoveryStore = create<RecoveryState>((set) => ({
  recoveryScore: 82,
  readinessScore: 74,
  breakdown: {
    sleepQuality: 88,
    hrv: 76,
    restingHR: 85,
    soreness: 70,
  },
  muscles: DEFAULT_MUSCLES,
  hrvHistory: [52, 58, 55, 62, 60, 65, 58, 63, 70, 68, 72, 65, 68, 74],
  readinessLevel: "moderate",

  updateRecoveryScore: (score) => set({ recoveryScore: score }),

  updateMuscleSoreness: (muscleId, soreness) =>
    set((state) => ({
      muscles: state.muscles.map((m) =>
        m.id === muscleId ? { ...m, soreness: Math.max(0, Math.min(5, soreness)) } : m
      ),
    })),

  refreshScores: () =>
    set((state) => {
      // Recalculate recovery from breakdown
      const { sleepQuality, hrv, restingHR, soreness } = state.breakdown;
      const score = Math.round(sleepQuality * 0.4 + hrv * 0.3 + restingHR * 0.15 + soreness * 0.15);
      const level =
        score < 40 ? "rest" as const :
        score < 60 ? "easy" as const :
        score < 80 ? "moderate" as const :
        "intense" as const;
      return { recoveryScore: score, readinessLevel: level };
    }),
}));
