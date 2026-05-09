import { create } from "zustand";
import { api } from "@/lib/api/client";

export interface UserProfile {
  id?: number;
  username?: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  fitnessGoal: string;
  fitnessLevel: string;
  activity_level?: string;
  weight?: number;
  height?: number;
  age?: number;
  equipment: string;
  schedule: string;
  injuries: string;
  units: "metric" | "imperial";
  subscriptionTier: "free" | "pro" | "elite";
}

interface UserState {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Record<string, string>) => Promise<void>;
  register: (credentials: Record<string, string>) => Promise<void>;
  fetchUser: () => Promise<void>;
  updateProfile: (partial: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Athlete",
  email: "",
  avatarUrl: null,
  fitnessGoal: "",
  fitnessLevel: "",
  equipment: "",
  schedule: "",
  injuries: "",
  units: "metric",
  subscriptionTier: "free",
};

export const useUserStore = create<UserState>((set, get) => ({
  isAuthenticated: false,
  isOnboarded: false,
  profile: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post<{ access: string; refresh: string }>("/api/v1/auth/login/", credentials, { skipAuth: true });
      localStorage.setItem("pulsecore_access_token", res.access);
      localStorage.setItem("pulsecore_refresh_token", res.refresh);
      set({ isAuthenticated: true });
      await get().fetchUser();
    } catch (err: any) {
      set({ error: err.data?.detail || err.message || "Login failed", isLoading: false });
      throw err;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/api/v1/auth/register/", credentials, { skipAuth: true });
      await get().login({ email: credentials.email, password: credentials.password });
    } catch (err: any) {
      set({ error: err.data?.email?.[0] || err.message || "Registration failed", isLoading: false });
      throw err;
    }
  },

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await api.get<UserProfile>("/api/v1/auth/me/");
      // Determine if onboarded (e.g. fitnessGoal exists)
      const isOnboarded = !!user.fitnessGoal;
      // Merge with default to avoid undefined errors in UI
      const profile = { ...DEFAULT_PROFILE, ...user };
      set({ profile, isAuthenticated: true, isOnboarded, isLoading: false });
    } catch (err: any) {
      set({ isAuthenticated: false, profile: null, isLoading: false });
      localStorage.removeItem("pulsecore_access_token");
      localStorage.removeItem("pulsecore_refresh_token");
    }
  },

  updateProfile: async (partial) => {
    try {
      const updated = await api.put<UserProfile>("/api/v1/auth/profile/", partial);
      set((state) => ({ profile: { ...state.profile, ...updated } as UserProfile }));
    } catch (err) {
      console.error("Failed to update profile", err);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("pulsecore_access_token");
    localStorage.removeItem("pulsecore_refresh_token");
    set({ isAuthenticated: false, isOnboarded: false, profile: null });
  },
}));
