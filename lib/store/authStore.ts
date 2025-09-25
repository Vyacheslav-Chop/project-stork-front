import { create } from "zustand";

 export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  dueDate: string | null;
  babyGender: "Дівчинка" | "Хлопчик" | "Ще не знаю" | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>()((set) => {
  return {
    isAuthenticated: false,
    user: null,
    setUser: (user: AuthUser) => {
      return set({ user, isAuthenticated: true });
    },
    clearIsAuthenticated: () =>
      set({
        isAuthenticated: false,
        user: null,
      }),
  };
});
