"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTaskById } from "@/lib/api/apiClient";
import styles from "./AddTaskForm.module.css";

type EditingTask = {
  id: string;
  name: string;
  date: string;
} | null;

type Props = {
  onClose: () => void;
  editingTask?: EditingTask;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, "Назва завдання обов'язкова")
    .max(100, "Не більше 100 символів")
    .required("Обов'язкове поле"),
  date: Yup.string()
    .matches(/^\d{4}\.\d{2}\.\d{2}$/, "Формат дати YYYY.MM.DD")
    .required("Обов'язкове поле"),
  dateISO: Yup.string().required(),
});

const AddTaskForm = ({ onClose, editingTask }: Props) => {
  const queryClient = useQueryClient();
  const isEditing = !!editingTask;

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
    onError: (err) => {
      console.error("Помилка створення завдання:", err);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name: string; date: string };
    }) => updateTaskById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
    onError: (err) => {
      console.error("Помилка оновлення завдання:", err);
    },
  });

  const dotToISO = (dotDate: string) => {
    const [yyyy, mm, dd] = dotDate.split(".");
    return `${yyyy}-${mm}-${dd}`;
  };

  const isoToDot = (iso: string) => {
    const [yyyy, mm, dd] = iso.split("-");
    return `${yyyy}.${mm}.${dd}`;
  };

  const todayIso = new Date().toISOString().slice(0, 10);
  const todayDot = isoToDot(todayIso);

  const initialValues = isEditing
    ? {
        name: editingTask.name,
        date: editingTask.date,
        dateISO: dotToISO(editingTask.date),
      }
    : {
        name: "",
        date: todayDot,
        dateISO: todayIso,
      };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEditing ? "Редагувати завдання" : "Нове завдання"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const taskData = {
            name: values.name.trim(),
            date: values.date,
          };

          if (isEditing) {
            updateTaskMutation.mutate(
              { id: editingTask.id, data: taskData },
              { onSettled: () => setSubmitting(false) }
            );
          } else {
            createTaskMutation.mutate(taskData, {
              onSettled: () => setSubmitting(false),
            });
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Назва завдання
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Прийняти вітаміни"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="date" className={styles.label}>
                Дата
              </label>
              <Field
                id="date"
                name="date"
                type="date"
                className={styles.input}
                value={values.dateISO}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("dateISO", e.target.value);
                  setFieldValue("date", isoToDot(e.target.value));
                }}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                createTaskMutation.isPending ||
                updateTaskMutation.isPending
              }
              className={styles.submitButton}
            >
              {isSubmitting ||
              createTaskMutation.isPending ||
              updateTaskMutation.isPending
                ? "Збереження..."
                : "Зберегти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTaskForm;
