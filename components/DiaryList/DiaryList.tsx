"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./DiaryList.module.css";
import { DiaryData } from "@/types/diaries";
import AddDiaryEntryForm from "../modals/AddDiaryEntryModal/AddDiaryEntryForm/AddDiaryEntryForm";

interface DiaryListProps {
  diaries: DiaryData[];
  onSelect?: (diary: DiaryData) => void;
  onRefresh?: () => void;
}

export default function DiaryList({
  diaries,
  onSelect,
  onRefresh,
}: DiaryListProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>
        <div className={styles.desc_btn}>
          <p className={styles.description}>Новий запис</p>
          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <svg width={24} height={24}>
              <use href="/icons/icon_add_task.svg"></use>
            </svg>
          </button>
        </div>
      </div>

      {(!diaries || diaries.length === 0) && (
        <p className={styles.empty}>Наразі записи у щоденнику відсутні</p>
      )}

      <ul className={styles.list}>
        {diaries.map((diary) => (
          <li
            key={diary._id}
            className={styles.item}
            onClick={() => isDesktop && onSelect?.(diary)}
          >
            {isDesktop ? (
              <div className={styles.link}>
                <h3 className={styles.entryTitle}>{diary.title}</h3>
                <p className={styles.date}>
                  {new Date(diary.createdAt).toLocaleDateString("uk-UA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className={styles.tags}>
                  {diary.category.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <Link href={`/diary/${diary._id}`} className={styles.link}>
                <h3 className={styles.entryTitle}>{diary.title}</h3>
                <p className={styles.date}>
                  {new Date(diary.createdAt).toLocaleDateString("uk-UA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className={styles.tags}>
                  {diary.category.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <AddDiaryEntryForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                onRefresh?.();
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
