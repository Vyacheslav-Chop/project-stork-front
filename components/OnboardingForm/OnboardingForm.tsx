"use client";

import { useRouter } from "next/navigation";
import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid, parse } from "date-fns";
import toast from "react-hot-toast";
import * as Yup from "yup";
import css from "./OnboardingForm.module.css";
import CustomSelect from "../ProfileEditForm/CustomSelectProfileEditForm";

const OnboardingSchema = Yup.object().shape({
  dueDate: Yup.date(),
  babyGender: Yup.string(),
});

type InitialValuesProps = {
  dueDate: string;
  babyGender: string;
};

export default function OnboardingPageForm() {
  const router = useRouter();
  const fieldId = useId();

  const initialValues: InitialValuesProps = {
    babyGender: "",
    dueDate: "",
  };

  const getSelectedDate = (dueDate?: string) => {
    if (!dueDate) return null;
    const parsedDate = parse(dueDate, "yyyy.MM.dd", new Date());
    return isValid(parsedDate) ? parsedDate : null;
  };

  const changeDueDate = (
    date: Date | null,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    if (date) {
      setFieldValue("dueDate", format(date, "yyyy.MM.dd"));
    } else {
      setFieldValue("dueDate", "");
    }
  };

  const handleSubmit = async (values: InitialValuesProps) => {
    try {
      const payload = {
        babyGender: values.babyGender,
        dueDate: values.dueDate,
      };

      console.log("Submitting payload:", payload);

      toast.success('Дані успішно збережено');
      router.push('/');

    } catch {
      toast.error("Помилка при збереженні даних");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OnboardingSchema}
      validateOnChange={true}
      validateOnBlur={true}
      
    >
      {({ values, setFieldValue, dirty, isValid, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label
              htmlFor={`${fieldId}-babyGender`}
              className={`${css.formLabel}`}
            >
              Стать дитини
            </label>

            <div className={css.selectWrap}>
              <Field name="babyGender" component={CustomSelect} />
              <svg width={24} height={24} className={css.selectIcon}>
                <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
              </svg>
            </div>

            <ErrorMessage
              name="babyGender"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label
              htmlFor={`${fieldId}-dueDate`}
              className={`${css.formLabel}`}
            >
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
                placeholderText="Оберіть дату"
                onChangeRaw={(e) => e?.preventDefault()}
              />

              <svg width={24} height={24} className={css.dateIcon}>
                <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
              </svg>
            </div>

            <ErrorMessage
              name="dueDate"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.btnContainer}>
             <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className={css.submitButton}
            >
              Зберегти
          </button>
          
             <button
              type="submit"
              disabled={isSubmitting}
              className={css.submitButton}
            >
              Пропустити
            </button> 
</div>
          

        </Form>
      )}
    </Formik>
  );
}
