import { create } from "zustand";
import { UserResponse } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserResponse | null;
  currentWeek: number | null;
  isLoadingAuth: boolean;
  setCurrentWeek: (week: number) => void;
  setUser: (user: UserResponse) => void;
  clearIsAuthenticated: () => void;
  setLoadingAuth: (loading: boolean) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  currentWeek: null,
  isLoadingAuth: true,
  setUser: (user: UserResponse) =>
    set({ user, isAuthenticated: true, isLoadingAuth: false }),
  setCurrentWeek: (week: number) => set({ currentWeek: week }),
  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
      currentWeek: null,
      isLoadingAuth: false,
    }),
  setLoadingAuth: (loading: boolean) => set({ isLoadingAuth: loading }),
}));
