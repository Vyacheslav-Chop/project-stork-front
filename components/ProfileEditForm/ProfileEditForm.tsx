"use client";

import { useAuth } from "@/lib/store/authStore";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import React, { useId } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid, parse } from "date-fns";
import { updateUser } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import * as Yup from "yup";
import css from "./ProfileEditForm.module.css";
import { Gender, UserPayload } from "@/types/user";

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Мінімум символів 3")
    .max(32, "максимально символів 32"),
  email: Yup.string().email("Невірна пошта"),
  gender: Yup.string().oneOf(
    ["Хлопчик", "Дівчинка", "Ще не знаю"],
    "Невірна стать!"
  ),
  dueDate: Yup.date().min(new Date(), "Оберіть правильну дату!"),
});

type InitialValues = {
  username: string;
  email: string;
  babyGender: Gender | "";
  dueDate: string;
};

const ProfileEditForm = () => {
  const fieldId = useId();
  const { user } = useAuth();
  const setUser = useAuth((state) => state.setUser);

  const formValues: InitialValues = {
    username: user?.name ?? "",
    email: user?.email ?? "",
    babyGender: user?.babyGender ?? "",
    dueDate: user?.dueDate ?? format(new Date(), "dd.MM.yyyy"),
  };

  const getSelectedDate = (dueDate?: string) => {
    if (!dueDate) return new Date();
    const parsedDate = parse(dueDate, "yyyy.MM.dd", new Date());
    return isValid(parsedDate) ? parsedDate : new Date();
  };

  const changeDueDate = (
    date: Date | null,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ): void => {
    if (date) {
      setFieldValue("dueDate", format(date, "yyyy.MM.dd"));
    }
  };

  const handleSubmit = async (values: InitialValues) => {
    try {
      const payload: UserPayload = {
        name: values.username || undefined,
        email: values.email || undefined,
        babyGender:
          values.babyGender === "Хлопчик" ||
          values.babyGender === "Дівчинка" ||
          values.babyGender === "Ще не знаю"
            ? values.babyGender
            : undefined,
        dueDate: values.dueDate || undefined,
      };
      const res = await updateUser(payload);
      if (res) {
        toast.success("Дані оновлено успішно!");
        setUser(res);
      }
    } catch {
      toast.error("не вдалося оновити дані. Спробуйте пізніше!");
    }
  };

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement>,
    reset: () => void
  ) => {
    e.currentTarget.blur();
    reset();
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={ProfileSchema}
    >
      {({ values, setFieldValue, isSubmitting, resetForm }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-username`}>
              Ім&apos;я
            </label>
            <Field name="username">
              {({ field, meta }: FieldProps<string>) => (
                <input
                  {...field}
                  id={`${fieldId}-username`}
                  className={`${css.formInput} ${
                    meta.touched && meta.error ? css.inputError : ""
                  }`}
                  type="text"
                />
              )}
            </Field>
            <ErrorMessage
              component="div"
              className={css.error}
              name="username"
            />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-email`}>
              Пошта
            </label>
            <Field name="email">
              {({ field, meta }: FieldProps<string>) => (
                <input
                  {...field}
                  id={`${fieldId}-email`}
                  className={`${css.formInput} ${
                    meta.touched && meta.error ? css.inputError : ""
                  }`}
                  type="email"
                />
              )}
            </Field>
            <ErrorMessage component="div" className={css.error} name="email" />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-babyGender`}>
              Стать дитини
            </label>
            <div className={css.selectWrap}>
              <Field
                className={css.formSelect}
                as="select"
                name="babyGender"
                id={`${fieldId}-babyGender`}
              >
                <option value="" disabled>
                  Оберіть стать дитини
                </option>
                <option value="Хлопчик">Хлопчик</option>
                <option value="Дівчинка">Дівчинка</option>
                <option value="Ще не знаю">Ще не знаю</option>
              </Field>
              <svg width={24} height={24} className={css.selectIcon}>
                <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
              </svg>
            </div>
            <ErrorMessage
              component="div"
              className={css.error}
              name="babyGender"
            />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-dueDate`}>
              Планова дата пологів
            </label>
            <div className={css.dateWrap}>
              <DatePicker
                id={`${fieldId}-dueDate`}
                selected={getSelectedDate(values.dueDate)}
                onChange={(date) => changeDueDate(date, setFieldValue)}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                className={css.dateInput}
                wrapperClassName={css.dateWrapper}
                onChangeRaw={(e) => {
                  if (e) e.preventDefault();
                }}
              />
              <svg width={24} height={24} className={css.dateIcon}>
                <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
              </svg>
            </div>
            <ErrorMessage
              component="div"
              className={css.error}
              name="dueDate"
            />
          </div>

          <div className={css.btnWrap}>
            <button
              type="button"
              disabled={isSubmitting}
              className={css.cancelBtn}
              onClick={(e) => handleCancel(e, resetForm)}
            >
              Відмінити зміни
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.submitBtn}
            >
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditForm;
