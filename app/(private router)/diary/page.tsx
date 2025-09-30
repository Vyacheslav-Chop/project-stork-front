"use client";

import { useEffect, useState } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryData } from "@/types/diaries";
import { getDiaries } from "@/lib/api/apiClient";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DiaryPage() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: diaries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["diaries"],
    queryFn: () => getDiaries(),
  });

  const diaryList = diaries ?? [];
  console.log(diaryList);

  if (isLoading) {
    return <div className={styles.wrapper}>Завантаження...</div>;
  }

  if (isError) {
    return toast.error("Не вдалось завантажити дані.");
  }

  return (
    <div className={styles.wrapper}>
      {isDesktop ? (
        <div className={styles.desktopLayout}>
          <div className={styles.greetingBlock}>
            <GreetingBlock />
          </div>
          <div className={styles.listBlock}>
            <DiaryList diaries={diaryList} onSelect={setSelectedDiary} />
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

          <DiaryList diaries={diaryList} />
        </div>
      )}
    </div>
  );
}
