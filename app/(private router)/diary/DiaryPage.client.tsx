"use client";

import { useEffect, useMemo, useState } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryData } from "@/types/diaries";
import { getDiaries } from "@/lib/api/apiClient";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";

export default function DiaryPageClient() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1440);
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

  const diaryList = useMemo(() => diaries ?? [], [diaries]);

  useEffect(() => {
    if (!isDesktop) return;

    if (diaryList.length === 0) {
      setSelectedDiary(null);
      return;
    }

    if (selectedDiary) {
      const updated = diaryList.find((d) => d._id === selectedDiary._id);
      if (updated && updated !== selectedDiary) {
        setSelectedDiary(updated);
      }
    } else {
      setSelectedDiary(diaryList[0]);
    }
  }, [isDesktop, diaryList, selectedDiary]);
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
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
          <div className={styles.diaryContentBlock}>
            <div className={styles.listBlock}>
              <DiaryList diaries={diaryList} onSelect={setSelectedDiary} />
            </div>
            <div className={styles.detailsBlock}>
              {selectedDiary ? (
                <DiaryEntryDetails
                  diary={selectedDiary}
                  onSelect={setSelectedDiary}
                />
              ) : (
                <div className={styles.placeholder}></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mobileLayout}>
          <GreetingBlock />

          <DiaryList diaries={diaryList} onSelect={setSelectedDiary} />
        </div>
      )}
    </div>
  );
}
