'use client';

import { useParams } from 'next/navigation';
import RegistrationForm from '../../../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../../../components/LoginForm/LoginForm';

export default function AuthPage() {
  const { authType } = useParams<{ authType: string }>();

  if (authType === 'register') {
    return <RegistrationForm />;
  }

  if (authType === 'login') {
    return <LoginForm />;
  }

  return <div>Невірний тип аутентифікації</div>;
}
