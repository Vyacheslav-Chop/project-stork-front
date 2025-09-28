"use client";

import { useEffect, useState } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryData } from "@/types/diaries";
import { getDiaries } from "@/lib/api/apiClient";
import styles from "./page.module.css";

export default function DiaryPage() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const data = await getDiaries();
        setDiaries(data);
      } catch (err) {
        console.error("Помилка при завантаженні щоденника", err);
      } finally {
        setLoading(false);
      }
    };
    loadDiaries();
  }, []);

  if (loading) {
    return <div className={styles.wrapper}>Завантаження...</div>;
  }

  return (
    <div className={styles.wrapper}>
      {isDesktop ? (
        <div className={styles.desktopLayout}>
          <div className={styles.greetingBlock}>
            <GreetingBlock />
          </div>
          <div className={styles.listBlock}>
            <DiaryList diaries={diaries} onSelect={setSelectedDiary} />
          </div>
          <div className={styles.detailsBlock}>
            {selectedDiary ? (
              <DiaryEntryDetails diary={selectedDiary} />
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.mobileLayout}>
          <GreetingBlock />
          {/* 👉 На мобиле список ведет на /diary/[id] */}
          <DiaryList diaries={diaries} />
        </div>
      )}
    </div>
  );
}
