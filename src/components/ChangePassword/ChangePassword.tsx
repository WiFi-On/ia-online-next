'use client';

import styles from './ChangePassword.module.css';
import { useState, useCallback } from 'react';

import InputPassword from '@/ui/InputPassword/InputPassword';
import Button from '@/ui/Button/Button';

import { passwordValidation } from '@/utils/validation';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (oldPassword === newPassword) {
      setMessage('Старый и новый пароль не должны совпадать');
      setLoading(false);
      return;
    }

    const isPasswordValid = await passwordValidation(newPassword);
    if (!isPasswordValid) {
      setMessage('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Новые пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          repeat_new_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Пароль успешно изменён');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setMessage(data.message || 'Произошла ошибка');
      }
    } catch {
      setMessage('Ошибка в изменении пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <h2>Изменить пароль</h2>

      <div className={styles.inputs}>
        <InputPassword value={formData.oldPassword} onChange={handleChange('oldPassword')} placeholder="Старый пароль" className={styles.input} />
        <InputPassword value={formData.newPassword} onChange={handleChange('newPassword')} placeholder="Новый пароль" className={styles.input} />
        <InputPassword value={formData.confirmPassword} onChange={handleChange('confirmPassword')} placeholder="Повторите новый пароль" className={styles.input} />
      </div>

      <p className={styles.message}>{message}</p>

      <Button onClick={() => {}} className={styles.button} color="green" type="submit" disabled={loading}>
        {loading ? 'Сохраняем...' : 'Изменить'}
      </Button>
    </form>
  );
};

export default ChangePassword;
