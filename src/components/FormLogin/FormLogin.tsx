'use client';

import { useState, ChangeEvent, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import styles from './FormLogin.module.css';

import Checkbox from '@/ui/Checkbox/Checkbox';
import Button from '@/ui/Button/Button';
// import OAuthButton from '@/ui/OAuthButton/OAuthButton';
import InputText from '@/ui/InputText/InputText';
import InputPassword from '@/ui/InputPassword/InputPassword';

import { emailValidation } from '@/utils/validation';

const FormLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [error, setError] = useState('');

  const handleChange = useCallback(
    (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const login = async (event: FormEvent) => {
    event.preventDefault(); // Останавливаем перезагрузку страницы при сабмите формы

    const { email, password } = formData;

    const isEmailValid = await emailValidation(email);
    if (!isEmailValid) {
      setError('Неверный email');
      return;
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Передаем все необходимые данные
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/leads'); // Перенаправляем после успешного входа
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <form className={styles.main} onSubmit={login}>
      <h1>Вход</h1>
      <div className={styles.inputs}>
        <InputText value={formData.email} onChange={handleChange('email')} className={styles.inputText} placeholder="Почта"></InputText>
        <InputPassword className={styles.inputPassword} value={formData.password} onChange={handleChange('password')} placeholder="Пароль"></InputPassword>
      </div>

      <Button className={styles.button} color="green" type="submit">
        Войти
      </Button>

      <p className={styles.error}>{error}</p>

      <Checkbox checked={formData.rememberMe} onChange={handleChange('rememberMe')}>
        Запомнить меня
      </Checkbox>

      <div className={styles.links}>
        <p>
          Нет аккаунта?{' '}
          <span
            onClick={() => {
              router.push('/registration');
            }}
          >
            Регистрация
          </span>
        </p>
        <p>
          Забыли пароль?{' '}
          <span
            onClick={() => {
              router.push('/forget');
            }}
          >
            Восстановить
          </span>
        </p>
      </div>

      {/* <OAuthButton company="vk" /> */}
    </form>
  );
};
export default FormLogin;
