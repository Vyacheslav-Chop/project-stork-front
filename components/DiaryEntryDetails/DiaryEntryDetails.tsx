import { DiaryData } from "@/types/diaries";
import styles from "./DiaryEntryDetails.module.css";

interface Props {
  diary: DiaryData;
}

export default function DiaryEntryDetails({ diary }: Props) {
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
        {new Date(diary.updatedAt).toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
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
