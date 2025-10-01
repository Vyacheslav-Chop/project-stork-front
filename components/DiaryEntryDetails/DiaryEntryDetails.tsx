"use client";

import { useState } from "react";
import { DiaryData } from "@/types/diaries";
import styles from "./DiaryEntryDetails.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiary } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import DiaryEntryForm from "../modals/AddDiaryEntryModal/AddDiaryEntryForm/AddDiaryEntryForm";
import AddDiaryModal from "../modals/AddDiaryEntryModal/AddDiaryEntryModal";

interface Props {
  diary: DiaryData;
  onSelect?: (diary: DiaryData | null) => void;
}

export default function DiaryEntryDetails({ diary, onSelect }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1440 });
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteDiaryMutation = useMutation({
    mutationFn: (id: string) => deleteDiary(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["diaries"] });
      const prevDiaries = queryClient.getQueryData<DiaryData[]>(["diaries"]);
      queryClient.setQueryData<DiaryData[]>(["diaries"], (old) =>
        old ? old.filter((d) => d._id !== id) : []
      );
      return { prevDiaries };
    },
    onError: (_err, _id, context) => {
      if (context?.prevDiaries) {
        queryClient.setQueryData(["diaries"], context.prevDiaries);
      }
    },
    onSuccess: () => {
      toast.success("Запис видалено");
      if (isMobileOrTablet) {
        router.push("/diary");
      } else {
        onSelect?.(null);
      }
    },
  });

  return (
    <>
      <article className={styles.card}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{diary.title}</h1>
            <button
              className={styles.editBtn}
              onClick={() => setIsEditOpen(true)}
            >
              <svg className={styles.icon} width={24} height={24}>
                <use href="/icons/icon-update.svg"></use>
              </svg>
            </button>
          </div>

          <div className={styles.meta}>
            <p className={styles.date}>
              {new Date(diary.updatedAt).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteDiaryMutation.mutate(diary._id)}
              disabled={deleteDiaryMutation.isPending}
            >
              <svg className={styles.icon} width={24} height={24}>
                <use href="/icons/icon-delete.svg"></use>
              </svg>
            </button>
          </div>
        </header>

        <p className={styles.description}>{diary.description}</p>

        <div className={styles.tags}>
          {diary.category.map((tag) => (
            <span key={tag._id} className={styles.tag}>
              {tag.title}
            </span>
          ))}
        </div>
      </article>

      {isEditOpen && (
        <AddDiaryModal onClose={() => setIsEditOpen(false)}>
          <DiaryEntryForm
            diary={diary}
            onClose={() => setIsEditOpen(false)}
            onSave={(updated) => onSelect?.(updated)}
          />
        </AddDiaryModal>
      )}
    </>
  );
}
