"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./TasksReminderCard.module.css";
import { getTasks, updateTaskStatusById } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ErrorText from "../ErrorText/ErrorText";
import AddTaskModal from "../modals/AddTaskModal/AddTaskModal";
import AddTaskForm from "../modals/AddTaskModal/AddTaskForm/AddTaskForm";
import { Task } from "@/types/tasks";

type EditingTask = {
  id: string;
  name: string;
  date: string;
} | null;

export default function TasksReminderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<EditingTask>(null);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
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
    const formatDateToDot = (isoDate: string) => {
      const d = new Date(isoDate);
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(d.getUTCDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
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
    statusMutation.mutate(taskId);
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

  const sorted = [...tasks].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
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
              alt=""
            />
          </button>
        </div>

        <div className={styles.content}>
          {sorted.length === 0 ? (
            <>
              <h3 className={styles.subtitle}>Наразі немає жодних завдань</h3>
              <p className={styles.description}>
                Створіть перший нове завдання!
              </p>
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
                <div
                  className={styles.taskContent}
                  onClick={() => handleEdit(t)}
                >
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(e) => handleCheckboxChange(e, t._id)}
                    className={styles.taskCheckbox}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span
                    className={`${styles.taskText} ${
                      t.isDone ? styles.doneText : ""
                    }`}
                  >
                    {t.name}
                  </span>
                </div>
              </div>
            ))
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
