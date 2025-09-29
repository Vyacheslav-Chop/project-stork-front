"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationDiarySchema } from "./validation";
import css from "./AddDiaryEntryForm.module.css";
import { createDiary, getEmotions } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { Emotion } from "@/types/emotions";
import CustomCheckBoxForm from "./CustomCheckBoxForm";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
}

export default function AddDiaryEntryForm({ onClose }: Props) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmotions();
        setEmotions(data);
      } catch (err) {
        console.error("Помилка при завантаженні емоцій", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          title: "",
          emotions: [] as string[],
          description: "",
        }}
        validationSchema={validationDiarySchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await createDiary({
              title: values.title,
              description: values.description,
              category: values.emotions,
            });

            queryClient.invalidateQueries({ queryKey: ["diaries"] });

            toast.success("Новий запис створено!");
            resetForm();
            onClose();
          } catch (err) {
            console.error(err);
            toast.error("Помилка при створенні запису");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Новий запис</h2>

            <label className={css.label}>
              Заголовок
              <Field
                type="text"
                name="title"
                className={css.input}
                placeholder="Введіть заголовок запису"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Категорії
              <CustomCheckBoxForm name="emotions" emotions={emotions} />
              <ErrorMessage
                name="emotions"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Запис
              <Field
                as="textarea"
                name="description"
                className={css.textarea}
                placeholder="Запишіть, як ви себе відчуваєте"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Збереження..." : "Зберегти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
