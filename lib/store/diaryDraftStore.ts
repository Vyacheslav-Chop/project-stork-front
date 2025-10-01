import { create } from "zustand";
import { persist } from "zustand/middleware";

type DiaryDraft = {
  title: string;
  emotions: string[];
  description: string;
};

type DiaryDraftStore = {
  draft: DiaryDraft;
  setDraft: (patch: Partial<DiaryDraft>) => void;
  clearDraft: () => void;
};

const initialDraft: DiaryDraft = {
  title: "",
  emotions: [],
  description: "",
};

export const useDiaryDraftStore = create<DiaryDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      clearDraft: () => set(() => ({ draft: { ...initialDraft } })),
    }),
    {
      name: "diary-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);