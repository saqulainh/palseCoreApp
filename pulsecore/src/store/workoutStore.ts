import { create } from "zustand";

export interface ExerciseSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  muscle: string;
  targetSets: number;
  targetReps: number;
  previousBest: string;
  sets: ExerciseSet[];
}

export interface WorkoutSession {
  id: string;
  name: string;
  startedAt: Date | null;
  finishedAt: Date | null;
  exercises: WorkoutExercise[];
  duration: number; // seconds
}

export interface WorkoutHistoryEntry {
  id: string;
  name: string;
  date: string;
  duration: string;
  volume: string;
  icon: string;
}

interface WorkoutState {
  // Active session
  activeSession: WorkoutSession | null;
  currentExerciseIndex: number;
  isResting: boolean;
  restTimer: number;

  // History
  history: WorkoutHistoryEntry[];

  // Actions
  startSession: (session: WorkoutSession) => void;
  finishSession: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  setCurrentExercise: (index: number) => void;
  startRest: (seconds: number) => void;
  skipRest: () => void;
  tickRest: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  activeSession: null,
  currentExerciseIndex: 0,
  isResting: false,
  restTimer: 0,
  history: [
    { id: "1", name: "Upper Body Push", date: "May 7", duration: "52 min", volume: "4,200 kg", icon: "fitness_center" },
    { id: "2", name: "Lower Body Strength", date: "May 6", duration: "58 min", volume: "6,100 kg", icon: "directions_run" },
    { id: "3", name: "Pull Day + Core", date: "May 5", duration: "48 min", volume: "3,800 kg", icon: "fitness_center" },
    { id: "4", name: "Active Recovery", date: "May 4", duration: "30 min", volume: "—", icon: "self_improvement" },
  ],

  startSession: (session) => set({ activeSession: session, currentExerciseIndex: 0, isResting: false, restTimer: 0 }),

  finishSession: () =>
    set((state) => {
      if (!state.activeSession) return state;
      const completedSets = state.activeSession.exercises.reduce(
        (a, e) => a + e.sets.filter((s) => s.completed).length, 0
      );
      const newEntry: WorkoutHistoryEntry = {
        id: Date.now().toString(),
        name: state.activeSession.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        duration: `${Math.floor(state.activeSession.duration / 60)} min`,
        volume: `${completedSets * 120} kg`,
        icon: "fitness_center",
      };
      return {
        activeSession: null,
        currentExerciseIndex: 0,
        isResting: false,
        restTimer: 0,
        history: [newEntry, ...state.history],
      };
    }),

  completeSet: (exerciseIndex, setIndex) =>
    set((state) => {
      if (!state.activeSession) return state;
      const exercises = state.activeSession.exercises.map((e, i) =>
        i !== exerciseIndex ? e : {
          ...e,
          sets: e.sets.map((s, j) => (j !== setIndex ? s : { ...s, completed: true })),
        }
      );
      return {
        activeSession: { ...state.activeSession, exercises },
        isResting: true,
        restTimer: 90,
      };
    }),

  setCurrentExercise: (index) => set({ currentExerciseIndex: index }),
  startRest: (seconds) => set({ isResting: true, restTimer: seconds }),
  skipRest: () => set({ isResting: false, restTimer: 0 }),
  tickRest: () =>
    set((state) => {
      if (state.restTimer <= 1) return { isResting: false, restTimer: 0 };
      return { restTimer: state.restTimer - 1 };
    }),
}));
