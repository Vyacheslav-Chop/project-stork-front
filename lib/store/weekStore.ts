import { create } from "zustand";
import { getWeekDynamic, getWeekStatic } from "@/lib/api/apiClient";
import { WeekRes } from "@/types/babyState";

interface WeekState {
  weekInfo: WeekRes | null;
  dayKey: string | null;
  fetchUserInfo: (isAuthenticated: boolean) => Promise<void>;
}

export const useWeekStore = create<WeekState>((set, get) => ({
  weekInfo: null,
  dayKey: null,
  fetchUserInfo: async (isAuthenticated) => {
    
    const todayKey = new Date().toISOString().slice(0, 10);
    if (get().dayKey === todayKey && get().weekInfo) return;

    let data;

    if (isAuthenticated) data = await getWeekDynamic();
    if (!isAuthenticated) data = await getWeekStatic();

    set({ weekInfo: data, dayKey: todayKey });
  },
}));
