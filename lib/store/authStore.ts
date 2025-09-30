import { create } from "zustand";
import { UserResponse } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserResponse | null;
  currentWeek: number | null;
  setCurrentWeek: (week: number) => void;
  setUser: (user: UserResponse) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  currentWeek: null,
  setUser: (user: UserResponse) => set({ user, isAuthenticated: true }),
  setCurrentWeek: (week: number) => set({ currentWeek: week }),
  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
      currentWeek: null,
    }),
}));
