import { DiaryData } from "@/types/diaries";
import styles from "./DiaryEntryDetails.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiary } from "@/lib/api/apiClient";

interface Props {
  diary: DiaryData;
}

export default function DiaryEntryDetails({ diary }: Props) {
  const queryClient = useQueryClient();

  const deleteDiaryMutation = useMutation({
    mutationFn: (id: string) => deleteDiary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{diary.title}</h1>
          <button className={styles.editBtn}>
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
  );
}
