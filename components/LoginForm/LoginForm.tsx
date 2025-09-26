'use client';

import type { AxiosError } from "axios";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { login, getUser } from '@/lib/api/apiClient';
import { useAuth } from '@/lib/store/authStore';
import type { UserResponse } from '@/types/user';
import css from '@/components/LoginForm/LoginForm.module.css'


const AFTER_LOGIN_ROUTE = '/';

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введіть коректний email')
    .required("Email є обов’язковим"),
  password: Yup.string()
    .min(6, 'Мінімум 6 символів')
    .required("Пароль є обов’язковим"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);
  const [serverError, setServerError] = useState<string>('');

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (v: boolean) => void; resetForm: () => void }
  ) => {
    setServerError('');
    try {
      const res = await login(values);
      if (!res?.data) {
        throw new Error('Неочікувана відповідь сервера');
      }

      const userRes = await getUser();
      const user: UserResponse = userRes.data;

      setUser(user);


      toast.success('Вхід успішний!');
      resetForm();
      router.replace(AFTER_LOGIN_ROUTE);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Помилка входу. Спробуйте ще раз.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.main}>
      <h1 className={css.title}>Вхід</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="email">
                Пошта
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={css.input} />
              <ErrorMessage name="email" />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password" >
                Пароль
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={css.input}
                placeholder="********" />
              <ErrorMessage name="password" />
            </div>


            {serverError && (
              <p className="text-red-600 text-sm">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className={css.submitButton}>
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.content}>
        <p className={css.contenText}>
          Немає акаунта?{' '}
          <Link href="/auth/register" className={css.link}>
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
