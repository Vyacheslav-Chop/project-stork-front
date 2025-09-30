"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AddDiaryEntryForm.module.css";
import { createDiary, updateDiary, getEmotions } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { Emotion } from "@/types/emotions";
import CustomCheckBoxForm from "../AddDiaryEntryForm/CustomCheckBoxForm";
import { useQueryClient } from "@tanstack/react-query";
import { DiaryData, CreateDiary } from "@/types/diaries";
import { validationDiarySchema } from "../AddDiaryEntryForm/validation";

interface Props {
  onClose: () => void;
  diaryToCorect?: DiaryData | null;
}

export default function UpdateDiaryEntryForm({
  onClose,
  diaryToCorect,
}: Props) {
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
          title: diaryToCorect?.title ?? "",
          emotions:
            diaryToCorect?.category.map((category) => category._id) ?? [],
          description: diaryToCorect?.description ?? "",
        }}
        validationSchema={validationDiarySchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (diaryToCorect) {
              const payload: CreateDiary = {};

              if (values.title.trim() !== diaryToCorect.title) {
                payload.title = values.title.trim();
              }

              if (values.description.trim() !== diaryToCorect.description) {
                payload.description = values.description.trim();
              }

              const oldCategories = diaryToCorect.category.map(
                (category) => category._id
              );
              if (values.emotions.join(",") !== oldCategories.join(",")) {
                payload.category = values.emotions;
              }

              await updateDiary(diaryToCorect._id, payload);
              toast.success("Запис оновлено!");
            } else {
              await createDiary({
                title: values.title.trim(),
                description: values.description.trim(),
                category: values.emotions,
              });
              toast.success("Новий запис створено!");
              resetForm();
            }

            queryClient.invalidateQueries({ queryKey: ["diaries"] });
            onClose();
          } catch (err) {
            console.error(err);
            toast.error("Помилка при збереженні запису");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <h2 className={css.title}>
              {diaryToCorect ? "Редагувати запис" : "Новий запис"}
            </h2>

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
