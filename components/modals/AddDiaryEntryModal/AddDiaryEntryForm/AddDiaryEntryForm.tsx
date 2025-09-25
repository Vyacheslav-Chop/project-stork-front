"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationDiarySchema } from "./validation";
import styles from "./AddDiaryEntryForm.module.css";
import { createDiary, getEmotions } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { Emotion } from "@/types/emotions";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDiaryEntryForm({ onClose, onSuccess }: Props) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

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
    <Formik
      initialValues={{
        title: "",
        categories: [] as string[],
        description: "",
        emotions: [] as string[],
      }}
      validationSchema={validationDiarySchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createDiary({
            title: values.title,
            description: values.description,
            category: values.categories,
            emotions: values.emotions,
          });

          toast.success("✅ Новий запис створено!");
          resetForm();
          onSuccess();
          onClose();
        } catch (err) {
          console.error(err);
          toast.error("❌ Помилка при створенні запису");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Новий запис</h2>

          <label className={styles.label}>
            Заголовок
            <Field type="text" name="title" className={styles.input} />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Категорії
            <select
              multiple
              className={styles.select}
              value={values.categories}
              onChange={(e) =>
                setFieldValue(
                  "categories",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              <option value="Натхнення">Натхнення</option>
              <option value="Вдячність">Вдячність</option>
              <option value="Тривога">Тривога</option>
              <option value="Дивні бажання">Дивні бажання</option>
              <option value="Нудота">Нудота</option>
            </select>
            <ErrorMessage
              name="categories"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Емоції
            <select
              multiple
              className={styles.select}
              value={values.emotions}
              onChange={(e) =>
                setFieldValue(
                  "emotions",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {emotions.map((emo) => (
                <option key={emo._id} value={emo._id}>
                  {emo.title}
                </option>
              ))}
            </select>
            <ErrorMessage
              name="emotions"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Запис
            <Field
              as="textarea"
              name="description"
              className={styles.textarea}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </label>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Збереження..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
