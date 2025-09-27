"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styles from "./StatusBlock.module.css";
import { useAuth } from "@/lib/store/authStore";
import { getWeekDynamic, getWeekStatic } from "@/lib/api/apiClient";

const StatusBlock = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekData", isAuthenticated],
    queryFn: async () => {
      try {
        return isAuthenticated ? await getWeekDynamic() : await getWeekStatic();
      } catch (err) {
        toast.error("Помилка завантаження даних");
        return { currentWeek: 0, daysToBirth: 0 };
      }
    },
  });

  if (isLoading) {
    return <div className={styles.loader}>Завантаження…</div>;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <span className={styles.label}>Тиждень</span>
        <span className={styles.value}>{data.currentWeek}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Днів до зустрічі</span>
        <span className={styles.value}>~{data.daysToBirth}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
