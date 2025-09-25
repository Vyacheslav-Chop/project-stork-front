"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./TasksReminderCard.module.css";
import { getTasks } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ErrorText from "../ErrorText/ErrorText";

export default function TasksReminderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: isAuthenticated,
  });

  const handleAdd = () => {
    router.push(isAuthenticated ? "/tasks/new" : "/auth/register");
  };

  if (isError) {
    return <ErrorText message="Помилка завантаження завдань" />;
  }

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Loader />
      </div>
    );
  }

  const sorted = [...tasks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>
        <button
          className={styles.addButton}
          onClick={handleAdd}
          aria-label="Додати завдання"
        >
          <Image src="/icons/icon_add_task.svg" width={22} height={22} alt="" />
        </button>
      </div>

      <div className={styles.content}>
        {sorted.length === 0 ? (
          <>
            <h3 className={styles.subtitle}>Наразі немає жодних завдань</h3>
            <p className={styles.description}>Створіть перший нове завдання!</p>
            <button className={styles.createButton} onClick={handleAdd}>
              Створити завдання
            </button>
          </>
        ) : (
          sorted.map((t) => (
            <div key={t._id} className={styles.taskRow}>
              <span className={styles.taskDate}>
                {new Date(t.date).toLocaleDateString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
              <label className={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  readOnly
                  className={styles.taskCheckbox}
                />
                <span className={t.isDone ? styles.doneText : ""}>
                  {t.name}
                </span>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
