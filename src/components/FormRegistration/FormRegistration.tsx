'use client';
import { useState, useCallback, FormEvent } from 'react';
import { ChangeEvent } from 'react';

import styles from './FormRegistration.module.css';

import Button from '@/ui/Button/Button';
// import OAuthButton from '@/ui/OAuthButton/OAuthButton';
import InputPhone from '@/ui/InputPhone/InputPhone';
import InputText from '@/ui/InputText/InputText';
import InputAddress from '@/ui/InputAddress/InputAddress';
import InputPassword from '@/ui/InputPassword/InputPassword';

import { emailValidation, passwordValidation, phoneValidation } from '@/utils/validation';

import { useRouter } from 'next/navigation';

const FormRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tg: '',
    city: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = useCallback(
    (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const handlePhoneChange = useCallback((newPhone: string) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
  }, []);

  const registration = async (event: FormEvent) => {
    event.preventDefault(); // Останавливаем перезагрузку страницы при сабмите формы

    if (formData.name == '') {
      setError('Заполните имя');
      return;
    }

    const isEmailValid = await emailValidation(formData.email);
    if (!isEmailValid) {
      setError('Неверный email');
      return;
    }

    const isPhoneValid = await phoneValidation(formData.phone);
    if (!isPhoneValid) {
      setError('Неверный номер телефона');
      return;
    }

    const isPasswordValid = await passwordValidation(formData.newPassword);
    if (!isPasswordValid) {
      setError('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ');
      return;
    }

    if (formData.city === '') {
      setError('Место проживания не указано');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const res = await fetch('/api/auth/registration', {
      method: 'POST',
      body: JSON.stringify(formData), // Передаем все необходимые данные
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/confirm'); // Перенаправляем после успешного входа
    } else {
      setError((await res.json()).message);
    }
  };

  return (
    <form className={styles.main} onSubmit={registration}>
      <h1>Регистрация</h1>
      <div className={styles.inputs}>
        <InputText value={formData.name} onChange={handleChange('name')} placeholder="Имя" className={styles.inputText} />
        <InputText value={formData.email} onChange={handleChange('email')} placeholder="Почта" className={styles.inputText} />
        <InputPhone value={formData.phone} onChange={handlePhoneChange} placeholder="Номер(Привязаный к whatsapp)" className={styles.inputText} />
        <InputText value={formData.tg} onChange={handleChange('tg')} placeholder="Телеграмм(@primer)" className={styles.inputText} />
        <InputAddress value={formData.city} onChange={handleChange('city')} placeholder="Город, поселок, деревня" className={styles.inputText} />
        <InputPassword value={formData.newPassword} onChange={handleChange('newPassword')} placeholder="Пароль" className={styles.inputPassword} />
        <InputPassword value={formData.confirmPassword} onChange={handleChange('confirmPassword')} placeholder="Повторите пароль" className={styles.inputPassword} />
      </div>

      <p className={styles.error}>{error}</p>

      <Button onClick={() => console.log('Registration', formData)} className={styles.button} color="green" type="submit">
        Регистрация
      </Button>

      <p>
        Уже зарегистрированы? <span onClick={() => router.push('/login')}>Войти.</span>
      </p>

      {/* <OAuthButton company="vk" /> */}
    </form>
  );
};

export default FormRegistration;
