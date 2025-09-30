import { create } from "zustand";
import { getWeekDynamic, getWeekStatic } from "@/lib/api/apiClient";
import { WeekRes } from "@/types/babyState";

interface WeekState {
  weekInfo: WeekRes | null;
  dayKey: string | null;
  isLoading: boolean;
  fetchUserInfo: (
    isAuthenticated: boolean,
    isLoadingAuth: boolean
  ) => Promise<void>;
}

export const useWeekStore = create<WeekState>((set, get) => ({
  weekInfo: null,
  dayKey: null,
  isLoading: false,
  fetchUserInfo: async (isAuthenticated, isLoadingAuth) => {
    if (isLoadingAuth) return;

    const todayKey = new Date().toISOString().slice(0, 10);

    if (get().dayKey === todayKey && get().weekInfo) return;

    set({ isLoading: true });

    try {
      const data = isAuthenticated
        ? await getWeekDynamic()
        : await getWeekStatic();
      set({ weekInfo: data, dayKey: todayKey, isLoading: false });
    } catch {
      set({ weekInfo: null, isLoading: false });
    }
  },
}));
