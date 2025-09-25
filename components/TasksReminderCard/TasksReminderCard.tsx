"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./TasksReminderCard.module.css";
import { getTasks } from "@/lib/api/apiClient";

interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export default function TasksReminderCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const auth = Boolean(token);
    setIsAuth(auth);

    if (!auth) {
      setLoading(false);
      return;
    }

    getTasks()
      .then((data) => {
        const sorted = data
          .map((t: any) => ({
            _id: t._id,
            name: t.name,
            date: t.date,
            isDone: t.isDone,
          }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        setTasks(sorted);
      })
      .catch(() => {
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    router.push(isAuth ? "/tasks/new" : "/login");
  };

  if (loading) {
    return <div className={styles.card}>Завантаження…</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>
        <button
          className={styles.addButton}
          onClick={handleAdd}
          aria-label="Додати завдання"
        >
          <Image src="/icon_add_task.svg" width={22} height={22} alt="" />
        </button>
      </div>

      <div className={styles.content}>
        {tasks.length === 0 ? (
          <>
            <h3 className={styles.subtitle}>Наразі немає жодних завдань</h3>
            <p className={styles.description}>Створіть перший нове завдання!</p>
            <button className={styles.createButton} onClick={handleAdd}>
              Створити завдання
            </button>
          </>
        ) : (
          tasks.map((t) => (
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
