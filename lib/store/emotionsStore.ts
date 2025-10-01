import { create } from "zustand";
import { Emotion } from "@/types/emotions";

type EmotionStore = {
  emotions: Emotion[];
  setEmotions: (emotions: Emotion[]) => void;
};

export const useEmotion = create<EmotionStore>((set) => ({
  emotions: [],
  setEmotions: (emotions: Emotion[]) => set({ emotions }),
}));
