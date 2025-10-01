import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Emotion } from "@/types/emotions";

type EmotionStore = {
  emotions: Emotion[];
  setEmotions: (emotions: Emotion[]) => void;
};

export const useEmotion = create(
  persist<EmotionStore>(
    (set) => ({
      emotions: [],
      setEmotions: (emotions) => set({ emotions }),
    }),
    {
      name: "emotion-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
