"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import css from "./AddDiaryEntryForm.module.css";
import { createDiary, updateDiary } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import { DiaryData } from "@/types/diaries";
import { useQueryClient } from "@tanstack/react-query";
import { validationDiarySchema } from "./validation";
import CustomCheckBoxForm from "./CustomCheckBoxForm";
import { useEmotion } from "@/lib/store/emotionsStore";
import { useDiaryDraftStore } from "@/lib/store/diaryDraftStore";
import { useId, useMemo } from "react";

interface Props {
  onClose: () => void;
  diary?: DiaryData;
  onSave?: (updated: DiaryData) => void;
}

export default function DiaryEntryForm({ onClose, diary, onSave }: Props) {
  const queryClient = useQueryClient();
  const emotions = useEmotion((s) => s.emotions);
  const { draft, setDraft, clearDraft } = useDiaryDraftStore();
  const fieldId = useId();

  const isEdit = Boolean(diary);

  const initialValues = useMemo(() => {
    return {
      title: isEdit ? diary?.title || "" : draft.title || "",
      emotions: isEdit
        ? (diary?.category ?? []).map((c) => c._id)
        : draft.emotions || [],
      description: isEdit ? diary?.description || "" : draft.description || "",
    };
  }, [isEdit, diary, draft]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
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

            // Інвалідуємо конкретний запис
            queryClient.invalidateQueries({ queryKey: ["diary", diary._id] });

            // Інвалідуємо список
            queryClient.invalidateQueries({ queryKey: ["diaries"] });

            onSave?.(updated);
          } else {
            await createDiary({
              title: values.title,
              description: values.description,
              category: values.emotions,
            });
            toast.success("Новий запис створено!");
            clearDraft();
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
      {({ isSubmitting, setFieldValue }) => {
        const updateDraft = (
          patch: Partial<{
            title: string;
            emotions: string[];
            description: string;
          }>
        ) => {
          if (!isEdit) setDraft(patch);
        };
        return (
          <Form className={css.form}>
            <h2 className={css.title}>
              {diary ? "Редагування запису" : "Новий запис"}
            </h2>

            <div className={css.entryForm}>
              <div className={css.inputWrap}>
                <label htmlFor={`${fieldId}-title`} className={css.label}>
                  Заголовок
                </label>

                <Field name="title">
                  {({ field, meta }: FieldProps<string>) => (
                    <input
                      {...field}
                      id={`${fieldId}-title`}
                      placeholder="Введіть заголовок запису"
                      className={`${css.input} ${
                        meta.touched && meta.error ? css.inputError : ""
                      }`}
                      onChange={(event) => {
                        field.onChange(event);
                        updateDraft({ title: event.target.value });
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrap}>
                <label htmlFor={`${fieldId}-emotions`} className={css.label}>
                  Категорії
                </label>

                <CustomCheckBoxForm
                  name="emotions"
                  id={`${fieldId}-emotions`}
                  emotions={emotions}
                  onChange={(changed: string[]) => {
                    setFieldValue("emotions", changed);
                    updateDraft({ emotions: changed });
                  }}
                />
                <ErrorMessage
                  name="emotions"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrap}>
                <label htmlFor={`${fieldId}-description`} className={css.label}>
                  Запис
                </label>

                <Field name="description">
                  {({ field, meta }: FieldProps<string>) => (
                    <textarea
                      {...field}
                      id={`${fieldId}-description`}
                      placeholder="Запишіть, як ви себе відчуваєте"
                      className={`${css.textarea} ${
                        meta.touched && meta.error ? css.inputError : ""
                      }`}
                      onChange={(event) => {
                        field.onChange(event);
                        updateDraft({ description: event.target.value });
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className={css.error}
                />
              </div>

              <button
                type="submit"
                className={css.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Збереження..."
                  : diary
                  ? "Оновити"
                  : "Зберегти"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
