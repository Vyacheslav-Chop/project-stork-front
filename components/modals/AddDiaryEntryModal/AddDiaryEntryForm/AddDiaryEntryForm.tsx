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
}

export default function AddDiaryEntryForm({ onClose }: Props) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className={styles.container}>
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

            toast.success("✅ Новий запис створено!");
            resetForm();
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
              <Field
                type="text"
                name="title"
                className={styles.input}
                placeholder="Введіть заголовок запису"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />
            </label>

            <label className={styles.label}>
              Категорії
              <div className={styles.multiSelectWrapper}>
                <div
                  className={styles.multiSelectTrigger}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {values.emotions.length > 0 ? (
                    <div className={styles.tags}>
                      {values.emotions.map((id) => {
                        const emo = emotions.find((e) => e._id === id);
                        return (
                          <span key={id} className={styles.tag}>
                            {emo?.title}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className={styles.placeholder}>Обрати категорію</span>
                  )}
                  <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {isOpen && (
                  <ul className={styles.dropdown}>
                    {emotions.map((emo) => (
                      <li key={emo._id} className={styles.item}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={values.emotions.includes(emo._id)}
                            onChange={() => {
                              const updated = new Set(values.emotions);
                              updated.has(emo._id)
                                ? updated.delete(emo._id)
                                : updated.add(emo._id);
                              setFieldValue("emotions", Array.from(updated));
                            }}
                          />
                          {emo.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                placeholder="Запишіть, як ви себе відчуваєте"
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
    </div>
  );
}
