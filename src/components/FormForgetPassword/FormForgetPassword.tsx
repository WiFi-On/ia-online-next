'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FormForgetPassword.module.css';
import Button from '@/ui/Button/Button';
import InputText from '@/ui/InputText/InputText';

import { emailValidation } from '@/utils/validation';

const FormForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const sendEmail = async (event: FormEvent) => {
    event.preventDefault();

    const isEmailValid = await emailValidation(email);
    if (!isEmailValid) {
      setError('Неверный email');
      return;
    }

    const res = await fetch('/api/auth/recover', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/login'); // Перенаправляем после успешного входа
    } else {
      setError('Ошибка');
    }
  };

  return (
    <form className={styles.main} onSubmit={sendEmail}>
      <h1>Восстановление</h1>

      <p className={styles.text}>Отправим новый пароль вам на почту</p>

      <InputText value={email} onChange={handleChange} placeholder="Почта" className={styles.inputText} />

      <p className={styles.error}>{error}</p>

      <Button className={styles.button} color="green" type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default FormForgetPassword;
