import { WeekRes } from "@/types/babyState";
import { create } from "zustand";

type AuthInfo = {
  publicInfo: WeekRes | null;
  setInfo: (publicInfo: WeekRes) => void;
  clearIsInfo: () => void;
};

export const useInfo = create<AuthInfo>()((set) => {
  return {
    publicInfo: null,
    setInfo: (publicInfo: WeekRes) => {
      return set({ publicInfo });
    },

    clearIsInfo: () =>
      set({
        publicInfo: null,
      }),
  };
});
