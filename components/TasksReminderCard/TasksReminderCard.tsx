"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./TasksReminderCard.module.css";
import { getTasks, updateTaskStatusById } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import AddTaskModal from "../modals/AddTaskModal/AddTaskModal";
import AddTaskForm from "../modals/AddTaskModal/AddTaskForm/AddTaskForm";
import { Task } from "@/types/tasks";

type EditingTask = { id: string; name: string; date: string } | null;

export default function TasksReminderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<EditingTask>(null);

  const [strikingIds, setStrikingIds] = useState<Set<string>>(new Set());
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const {
    data: tasks = [],
    isLoading,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: isAuthenticated,
  });

  const statusMutation = useMutation<Task, Error, string>({
    mutationFn: (taskId) => updateTaskStatusById(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleAdd = () => {
    if (isAuthenticated) {
      setEditingTask(null);
      setIsModalOpen(true);
    } else {
      router.push("/auth/register");
    }
  };

  const handleEdit = (task: Task) => {
    const formatDateToDot = (iso: string) => {
      const d = new Date(iso);
      return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}.${String(d.getUTCDate()).padStart(2, "0")}`;
    };
    setEditingTask({
      id: task._id,
      name: task.name,
      date: formatDateToDot(task.date),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    e.stopPropagation();
    setStrikingIds((prev) => new Set(prev).add(taskId));
    setTimeout(() => {
      statusMutation.mutate(taskId);
      setHiddenIds((prev) => new Set(prev).add(taskId));
      setStrikingIds((prev) => {
        const nxt = new Set(prev);
        nxt.delete(taskId);
        return nxt;
      });
    }, 2000);
  };

  if (isLoading)
    return (
      <div className={styles.card}>
        <Loader />
      </div>
    );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekLimit = new Date(today);
  weekLimit.setDate(weekLimit.getDate() + 7);

  const visible = tasks.filter((t) => !t.isDone && !hiddenIds.has(t._id));

  const todayTasks = visible.filter((t) => {
    const d = new Date(t.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });
  const weekTasks = visible.filter((t) => {
    const d = new Date(t.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() > today.getTime() && d.getTime() <= weekLimit.getTime();
  });

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Важливі завдання</h2>
          <button
            className={styles.addButton}
            onClick={handleAdd}
            aria-label="Додати завдання"
          >
            <Image
              src="/icons/icon_add_task.svg"
              width={22}
              height={22}
              alt="+"
            />
          </button>
        </div>
        <div className={styles.content}>
          {todayTasks.length === 0 && weekTasks.length === 0 ? (
            <>
              <h3 className={styles.subtitle}>Наразі немає жодних завдань</h3>
              <p className={styles.description}>
                Створіть перше нове завдання!
              </p>
              <button className={styles.createButton} onClick={handleAdd}>
                Створити завдання
              </button>
            </>
          ) : (
            <>
              {todayTasks.length > 0 && (
                <>
                  <h3 className={styles.sectionTitle}>Сьогодні:</h3>
                  {todayTasks.map((t) => (
                    <div key={t._id} className={styles.taskRow}>
                      <span className={styles.taskDate}>
                        {new Date(t.date).toLocaleDateString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                      <div
                        className={styles.taskContent}
                        onClick={() => handleEdit(t)}
                      >
                        <input
                          type="checkbox"
                          className={styles.taskCheckbox}
                          onChange={(e) => handleCheckboxChange(e, t._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span
                          className={
                            strikingIds.has(t._id)
                              ? styles.doneText
                              : styles.taskText
                          }
                        >
                          {t.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {weekTasks.length > 0 && (
                <>
                  <h3 className={styles.sectionTitle}>Найближчий тиждень:</h3>
                  {weekTasks.map((t) => (
                    <div key={t._id} className={styles.taskRow}>
                      <span className={styles.taskDate}>
                        {new Date(t.date).toLocaleDateString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                      <div
                        className={styles.taskContent}
                        onClick={() => handleEdit(t)}
                      >
                        <input
                          type="checkbox"
                          className={styles.taskCheckbox}
                          onChange={(e) => handleCheckboxChange(e, t._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span
                          className={
                            strikingIds.has(t._id)
                              ? styles.doneText
                              : styles.taskText
                          }
                        >
                          {t.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddTaskModal onClose={handleCloseModal}>
          <AddTaskForm onClose={handleCloseModal} editingTask={editingTask} />
        </AddTaskModal>
      )}
    </>
  );
}
