

'use client';

import css from './RegistrationForm.module.css';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/apiClient';
import { useAuth } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Ім’я є обов’язковим'),
  email: Yup.string().email('Невірна пошта').required('Пошта є обов’язковою'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Пароль є обов’язковим'),
});

const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuth(state => state.setUser);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      const res = await register(values);
      if (res) {
        toast.success('Реєстрація пройшла успішно');
        setUser(res);
        router.push('/onboarding');
      }
    } catch {
      setErrorMessage('Не вдалося зареєструватися. Можливо, акаунт вже існує або сталася помилка.');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Реєстрація</h1>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="name">Імʼя</label>
            <Field id="name" name="name" type="text" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email">Пошта</label>
            <Field id="email" name="email" type="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Пароль</label>
            <Field id="password" name="password" type="password" className={css.input} />
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>

          <button type="submit" className={css.submitButton}>
            Зареєструватись
          </button>

          {errorMessage && <p className={css.error}>{errorMessage}</p>}
        </Form>
      </Formik>

      <div className={css.content}>
        <p className={css.contenText}>Вже маєте аккаунт?</p>
        <Link href="/auth/login" className={css.link}>
          Увійти
        </Link>
      </div>
    </main>
  );
};

export default RegistrationForm;
