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
    .required("Пошта є обов’язковою"),
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
      let userMsg = 'Сталася помилка. Спробуйте пізніше.';

      switch (error?.response?.status) {
        case 400:
          userMsg = 'Невірні дані. Перевірте і спробуйте ще раз.';
          break;
        case 401:
          userMsg = 'Невірний email або пароль.';
          break;
      }
      toast.error(userMsg);
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
        {({ isSubmitting, isValid, dirty, errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <div className={css.control}>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Пошта"
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                />
              </div>
              <ErrorMessage name="email" component="p" className={css.errorText} />
            </div>

            <div className={css.formGroup}>
              <div className={css.control}>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Пароль"
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                />
              </div>
              <ErrorMessage name="password" component="p" className={css.errorText} />
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
