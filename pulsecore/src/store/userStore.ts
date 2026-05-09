import { create } from "zustand";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string | null;
  fitnessGoal: string;
  fitnessLevel: string;
  equipment: string;
  schedule: string;
  injuries: string;
  units: "metric" | "imperial";
  subscriptionTier: "free" | "pro" | "elite";
}

interface UserState {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  profile: UserProfile;
  setAuthenticated: (val: boolean) => void;
  setOnboarded: (val: boolean) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  logout: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Athlete",
  email: "athlete@pulsecore.app",
  avatarUrl: null,
  fitnessGoal: "Build Muscle",
  fitnessLevel: "Intermediate",
  equipment: "Full Gym",
  schedule: "5 days/week",
  injuries: "None",
  units: "metric",
  subscriptionTier: "pro",
};

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: true,
  isOnboarded: true,
  profile: DEFAULT_PROFILE,
  setAuthenticated: (val) => set({ isAuthenticated: val }),
  setOnboarded: (val) => set({ isOnboarded: val }),
  updateProfile: (partial) =>
    set((state) => ({ profile: { ...state.profile, ...partial } })),
  logout: () =>
    set({ isAuthenticated: false, isOnboarded: false, profile: DEFAULT_PROFILE }),
}));
