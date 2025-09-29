"use client";

import { useEffect, useState } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryData } from "@/types/diaries";
import { getDiaries } from "@/lib/api/apiClient";
import styles from "./page.module.css";
import { useMediaQuery } from "react-responsive";

export default function DiaryPage() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | null>(null);
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [loading, setLoading] = useState(true);

  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const data = await getDiaries();
        setDiaries(data);

        if (isDesktop && data.length > 0) {
          setSelectedDiary(data[0]);
        }
      } catch (err) {
        console.error("Помилка при завантаженні щоденника", err);
      } finally {
        setLoading(false);
      }
    };
    loadDiaries();
  }, [isDesktop]);

  if (loading) {
    return <div className={styles.wrapper}>Завантаження...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <GreetingBlock />

      {isDesktop ? (
        <div className={styles.mainContent}>
          <div className={styles.listBlock}>
            <DiaryList diaries={diaries} onSelect={setSelectedDiary} />
          </div>
          <div className={styles.detailsBlock}>
            {selectedDiary ? (
              <DiaryEntryDetails
                diary={selectedDiary}
                onDeleted={() => {
                  setDiaries((prev) =>
                    prev.filter((d) => d._id !== selectedDiary._id)
                  );
                  setSelectedDiary(null);
                }}
              />
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.mobileLayout}>
          <DiaryList
            diaries={diaries}
            onRefresh={async () => {
              const updated = await getDiaries();
              setDiaries(updated);
            }}
          />
        </div>
      )}
    </div>
  );
}
