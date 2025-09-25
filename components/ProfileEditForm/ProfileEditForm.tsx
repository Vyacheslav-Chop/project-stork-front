"use client";

import { useAuth } from "@/lib/store/authStore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid, parse } from "date-fns";
import { updateUser } from "@/lib/api/apiClient";
import toast from "react-hot-toast";
import * as Yup from "yup";
import css from "./ProfileEditForm.module.css";

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Мінімум символів 3")
    .max(32, "максимально символів 32"),
  email: Yup.string().email("Невірна пошта"),
  gender: Yup.string().oneOf(
    ["Хлопчик", "Дівчинка", "Ще не знаю"],
    "Невірна стать!"
  ),
  dueDate: Yup.string().matches(
    /^\d{2}\.\d{2}\.\d{4}$/,
    "Невірний формат дати"
  ),
});

type InitialValues = {
  username: string;
  email: string;
  gender: string;
  dueDate: string;
};

const ProfileEditForm = () => {
  const fieldId = useId();
  const { user } = useAuth();
  const setUser = useAuth((state) => state.setUser);

  const formValues: InitialValues = {
    username: user?.name ?? "",
    email: user?.email ?? "",
    gender: user?.babyGender ?? "",
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
      const res = await updateUser(values);
      if (res) {
        toast.success("Дані оновлено успішно!");
        setUser(res);
      }
    } catch {
      toast.error("не вдалося оновити дані. Спробуйте пізніше!");
    }
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={ProfileSchema}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-username`}>Ім&apos;я</label>
            <Field type="text" name="username" id={`${fieldId}-username`} />
            <ErrorMessage className={css.error} name="username" />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-email`}>Пошта</label>
            <Field type="email" name="email" id={`${fieldId}-email`} />
            <ErrorMessage className={css.error} name="email" />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-gender`}>Стать дитини</label>
            <Field as="select" name="gender" id={`${fieldId}-gender`}>
              <option value="" disabled>
                Оберіть стать дитини
              </option>
              <option value="Хлопчик">Хлопчик</option>
              <option value="Дівчинка">Дівчинка</option>
              <option value="Ще не знаю">Ще не знаю</option>
            </Field>
            <ErrorMessage className={css.error} name="gender" />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-dueDate`}>Планова дата пологів</label>
            <div className={css.dateWrap}>
              <DatePicker
                id={`${fieldId}-dueDate`}
                selected={getSelectedDate(values.dueDate)}
                onChange={(date) => changeDueDate(date, setFieldValue)}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                className={css.dateInput}
              />
              <svg width={24} height={24} className={css.dateIcon}>
                <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
              </svg>
            </div>
            <ErrorMessage className={css.error} name="dueDate" />
          </div>

          <div>
            <button type="button" disabled={isSubmitting} className={css.submitBtn}>
              Відмінити зміни
            </button>
            <button type="submit" disabled={isSubmitting} className={css.cancelBtn}>
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditForm;
