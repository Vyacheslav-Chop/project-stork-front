
import { getDiaryById } from "@/lib/api/apiClient";
import styles from "./DiaryDetailsPage.module.css";

interface Props {
  params: { diaryId: string };
}

export default async function DiaryDetailsPage({ params }: Props) {
  const diary = await getDiaryById(params.diaryId);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>{diary.title}</h1>

        <div className={styles.actions}>
          <button className={styles.editBtn}>✏️</button>
          <button className={styles.deleteBtn}>❌</button>
        </div>
      </header>

      <p className={styles.date}>
        {new Date(diary.createdAt).toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className={styles.description}>{diary.description}</p>

      <div className={styles.tags}>
        {diary.category.map((tag: string) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

