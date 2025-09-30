"use client";

import { useRouter } from "next/navigation";
import styles from "./DiaryEntryCard.module.css";
import { DiaryData } from "@/types/diaries";
import { Emotion } from "@/types/emotions";

interface Props {
  diary: DiaryData;
  onSelect?: (diary: DiaryData) => void;
}

export default function DiaryEntryCard({ diary, onSelect }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      router.push(`/diary/${diary._id}`);
    } else {
      onSelect?.(diary);
    }
  };

  return (
    <li className={styles.card} onClick={handleClick}>
      <h3 className={styles.title}>{diary.title}</h3>
      <p className={styles.date}>
        {new Date(diary.createdAt).toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className={styles.emotions}>
        {diary.category && diary.category.length > 0 ? (
          diary.category.map((emo: Emotion) => (
            <span key={emo._id} className={styles.emoji}>
              {emo.title}
            </span>
          ))
        ) : (
          <span className={styles.noEmotions}>Без емоцій</span>
        )}
      </div>
    </li>
  );
}
