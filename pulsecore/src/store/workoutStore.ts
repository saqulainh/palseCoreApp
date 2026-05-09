import { create } from "zustand";
import { api } from "@/lib/api/client";

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
  finishSession: () => Promise<void>;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  setCurrentExercise: (index: number) => void;
  startRest: (seconds: number) => void;
  skipRest: () => void;
  tickRest: () => void;
  fetchHistory: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeSession: null,
  currentExerciseIndex: 0,
  isResting: false,
  restTimer: 0,
  history: [
    { id: "1", name: "Upper Body Push", date: "May 7", duration: "52 min", volume: "4,200 kg", icon: "fitness_center" },
    { id: "2", name: "Lower Body Strength", date: "May 6", duration: "58 min", volume: "6,100 kg", icon: "directions_run" },
  ],

  startSession: (session) => set({ activeSession: session, currentExerciseIndex: 0, isResting: false, restTimer: 0 }),

  finishSession: async () => {
    const { activeSession, history } = get();
    if (!activeSession) return;
    
    const completedSets = activeSession.exercises.reduce(
      (a, e) => a + e.sets.filter((s) => s.completed).length, 0
    );
    
    const payload = {
      name: activeSession.name,
      duration_minutes: Math.floor(activeSession.duration / 60),
      notes: "Logged via PulseCore frontend",
      sets: activeSession.exercises.flatMap((ex, i) => 
        ex.sets.filter(s => s.completed).map((s, j) => ({
          exercise: 1, // Fallback to exercise ID 1 for MVP
          reps: s.reps,
          weight: s.weight,
          completed: s.completed,
          order: j
        }))
      )
    };

    try {
      // Save to Django Backend
      await api.post("/api/v1/workouts/", payload);
    } catch(err) {
      console.error("Failed to save workout to backend:", err);
    }

    const newEntry: WorkoutHistoryEntry = {
      id: Date.now().toString(),
      name: activeSession.name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      duration: `${Math.floor(activeSession.duration / 60)} min`,
      volume: `${completedSets * 120} kg`,
      icon: "fitness_center",
    };
    
    set({
      activeSession: null,
      currentExerciseIndex: 0,
      isResting: false,
      restTimer: 0,
      history: [newEntry, ...history],
    });
  },

  fetchHistory: async () => {
    try {
      const data = await api.get<any[]>("/api/v1/workouts/");
      if (data && data.length > 0) {
        const history = data.map(w => ({
          id: w.id.toString(),
          name: w.name,
          date: new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          duration: `${w.duration_minutes || 0} min`,
          volume: "—",
          icon: "fitness_center",
        }));
        set({ history });
      }
    } catch(err) {
      console.error("Failed to fetch history:", err);
    }
  },

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
