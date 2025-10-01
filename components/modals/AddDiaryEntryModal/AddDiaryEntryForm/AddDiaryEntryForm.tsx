"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AddDiaryEntryForm.module.css";
import { createDiary,  updateDiary } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { DiaryData } from "@/types/diaries";
import { useQueryClient } from "@tanstack/react-query";
import { validationDiarySchema } from "./validation";
import CustomCheckBoxForm from "./CustomCheckBoxForm";
import { useEmotion } from "@/lib/store/emotionsStore";

interface Props {
  onClose: () => void;
  diary?: DiaryData;
  onSave?: (updated: DiaryData) => void;
}

export default function DiaryEntryForm({ onClose, diary, onSave }: Props) {
  const queryClient = useQueryClient();

  const emotions = useEmotion((s) => s.emotions)

  return (
    <Formik
      initialValues={{
        title: diary?.title || "",
        emotions: diary?.category.map((c) => c._id) || [],
        description: diary?.description || "",
      }}
      validationSchema={validationDiarySchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (diary) {
            const updated = await updateDiary(diary._id, {
              title: values.title,
              description: values.description,
              category: values.emotions,
            });
            toast.success("Запис оновлено!");
            queryClient.invalidateQueries({ queryKey: ["diaries"] });
            onSave?.(updated);
          } else {
            await createDiary({
              title: values.title,
              description: values.description,
              category: values.emotions,
            });
            toast.success("Новий запис створено!");
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
            {diary ? "Редагування запису" : "Новий запис"}
          </h2>

          <label className={css.label}>
            Заголовок
            <Field
              type="text"
              name="title"
              className={css.input}
              placeholder="Введіть заголовок запису"
            />
            <ErrorMessage name="title" component="div" className={css.error} />
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
            {isSubmitting ? "Збереження..." : diary ? "Оновити" : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
