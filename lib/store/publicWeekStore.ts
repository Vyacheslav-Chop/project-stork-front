import { UserResponse } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserResponse | null;
  currentWeek: number | null;
  setUser: (user: UserResponse) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>()((set) => {
  return {
    isAuthenticated: false,
    user: null,
    currentWeek: null,
    setUser: (user: UserResponse) => {
      return set({ user, isAuthenticated: true });
    },
    setCurrentWeek: (week: number) => {
      set({ currentWeek: week });
    },
    clearIsAuthenticated: () =>
      set({
        isAuthenticated: false,
        user: null,
      }),
  };
});
