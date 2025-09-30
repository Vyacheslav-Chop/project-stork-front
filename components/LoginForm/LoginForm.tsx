"use client";

import type { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { login, getUser } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import type { UserResponse } from "@/types/user";
import css from "@/components/LoginForm/LoginForm.module.css";
import NavBarLogo from "../NavBarLogo/NavBarLogo";
import Image from "next/image";
import { useEffect } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введіть коректний email")
    .required("Пошта є обов’язковою"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Пароль є обов’язковим"),
});

const loadSavedValues = (): LoginFormValues => {
  if (typeof window === "undefined") return initialValues;
  const saved = localStorage.getItem("loginForm");
  if (saved) {
    const parsed = JSON.parse(saved) as LoginFormValues;
    return { email: parsed.email || "", password: "" };
  }
  return initialValues;
};

function PersistLoginForm() {
  const { values } = useFormikContext<LoginFormValues>();

  useEffect(() => {
    localStorage.setItem("loginForm", JSON.stringify({ email: values.email }));
  }, [values.email]);

  return null;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);
  const [serverError, setServerError] = useState<string>("");

  const handleSubmit = async (
    values: LoginFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (v: boolean) => void; resetForm: () => void }
  ) => {
    setServerError("");
    try {
      const res = await login(values);
      if (!res) {
        throw new Error("Неочікувана відповідь сервера");
      }

      const user: UserResponse = await getUser();
      setUser(user);

      toast.success("Вхід успішний!");
      localStorage.removeItem("loginForm");
      resetForm();
      router.replace("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            toast.error("Невірні дані. Перевірте і спробуйте ще раз.");
            break;
          case 401:
            toast.error("Невірна пошта або пароль.");
            break;
          default:
            toast.error("Сталася помилка на сервері. Спробуйте пізніше.");
        }
      } else if (error.request) {
        toast.error(
          "Сервер не відповідає. Перевірте підключення до інтернету."
        );
      } else {
        toast.error("Помилка при відправці запиту.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={css.mainContent}>
      <div className={css.logo}>
        <NavBarLogo />
      </div>
      <div className={css.wrapper}>
        <h1 className={css.title}>Вхід</h1>

        <Formik<LoginFormValues>
          initialValues={loadSavedValues()}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, errors, touched }) => (
            <Form className={css.form}>
              <PersistLoginForm />

              <div className={css.formGroup}>
                <div className={css.control}>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Пошта"
                    className={`${css.input} ${
                      errors.email && touched.email ? css.inputError : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className={css.errorText}
                />
              </div>

              <div className={css.formGroup}>
                <div className={css.control}>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    className={`${css.input} ${
                      errors.password && touched.password ? css.inputError : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className={css.errorText}
                />
              </div>

              {serverError && <p>{serverError}</p>}

              <button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? "Вхід..." : "Увійти"}
              </button>
            </Form>
          )}
        </Formik>

        <div className={css.content}>
          <p className={css.contenText}>
            Немає акаунта?{" "}
            <Link href="/auth/register" className={css.link}>
              Зареєструватися
            </Link>
          </p>
        </div>
      </div>

      <div className={css.imageWrapper}>
        <Image
          src="/image/login/LoginForm.jpg"
          alt="Ілюстрація логіну"
          width={720}
          height={900}
          className={css.image}
          priority
        />
      </div>
    </section>
  );
}
