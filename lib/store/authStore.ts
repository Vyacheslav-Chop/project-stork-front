import { UserResponse } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>()((set) => {
  return {
    isAuthenticated: false,
    user: null,
    setUser: (user: UserResponse) => {
      return set({ user, isAuthenticated: true });
    },
    clearIsAuthenticated: () =>
      set({
        isAuthenticated: false,
        user: null,
      }),
  };
});
