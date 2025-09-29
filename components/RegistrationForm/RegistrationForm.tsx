'use client';

import css from './RegistrationForm.module.css';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/apiClient';
import { useAuth } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import NavBarLogo from '../NavBarLogo/NavBarLogo'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Мінімум 1 символ')
    .required('Ім’я є обов’язковим')
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s'-]+$/, 'Ім’я може містити лише літери та цифри'),
  email: Yup.string()
    .email('Невірна пошта')
    .required('Пошта є обов’язковою'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required('Пароль є обов’язковим'),
});
type ValuesProps = {
  name: string;
  email: string;
  password: string
}
const initialValues: ValuesProps = {
  name: "",
  email: "",
  password: ""
}
const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuth(state => state.setUser);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values: ValuesProps) => {
    try {
      const res = await register(values);
      if (res) {
        toast.success('Реєстрація пройшла успішно');
            setUser(res);
        router.push('/profile/edit');
      }
    } catch { 
      setErrorMessage('Не вдалося зареєструватися. Можливо, акаунт вже існує або сталася помилка.');
    }
  };

  return (
    
    <div className={css.mainContent}>

      <div className={css.wrapper}>
        <div className={css.logo}><NavBarLogo/></div> 
      
        <h1 className={css.formTitle}>Реєстрація</h1>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
       {({ dirty, isValid, isSubmitting }) => (      
        <Form className={css.form}>
          
         <Field name="name">
  {({ field, meta }: FieldProps<string>) => (
    <div className={css.formGroup}>
      <label
        htmlFor="name"
        className={`${css.formLabel} ${meta.touched && meta.error ? css.labelError : ''}`}
      >
        Імʼя*
      </label>
      <input
        {...field}
        id="name"
        type="text"
        placeholder="Your Name"
        className={`${css.input} ${meta.touched && meta.error ? css.inputError : ''}`}
      />
      {meta.touched && meta.error && (
        <div className={css.errorText}>{meta.error}</div>
      )}
    </div>
  )}
</Field>

        <Field name="email">
  {({ field, meta }: FieldProps<string>) => (
    <div className={css.formGroup}>
      <label
        htmlFor="email"
        className={`${css.formLabel} ${meta.touched && meta.error ? css.labelError : ''}`}
      >
        Пошта*
      </label>
      <input
        {...field}
        id="email"
        type="text"
        placeholder="you@example.com"
        className={`${css.input} ${meta.touched && meta.error ? css.inputError : ''}`}
      />
      {meta.touched && meta.error && (
        <div className={css.errorText}>{meta.error}</div>
      )}
    </div>
  )}
</Field>
            

     <Field name="password">
  {({ field, meta }: FieldProps<string>) => (
    <div className={css.formGroup}>
      <label
        htmlFor="password"
        className={`${css.formLabel} ${meta.touched && meta.error ? css.labelError : ''}`}
      >
        Пароль*
      </label>
      <input
        {...field}
        id="password"
        type="password"
        placeholder="********"
        className={`${css.input} ${meta.touched && meta.error ? css.inputError : ''}`}
      />
      {meta.touched && meta.error && (
        <div className={css.errorText}>{meta.error}</div>
      )}
    </div>
  )}
</Field>
          <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className={css.submitButton}>
              Зареєструватись
            </button>     

     {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
            </Form>
      )}      
        </Formik>

      <div className={css.content}>
        <p className={css.contenText}>Вже маєте аккаунт?</p>
        <Link href="/auth/login" className={css.link}>
          Увійти
        </Link>
        </div>
      </div>

   <div className={css.imageWrapper}>
  <Image
    src="/image/registration/stork.jpg"
    alt="Ілюстрація реєстрації"
    width={720} 
    height={900}
    className={css.image}
    priority
  />
</div>
      
    </div>
  );
};     

export default RegistrationForm;
