'use client';

import styles from './InfoUser.module.css';

import InputText from '@/ui/InputText/InputText';
import InputPhone from '@/ui/InputPhone/InputPhone';
import UserInfoElem from '@/components/InfoUser/UserInfoElem/UserInfoElem';
import Button from '@/ui/Button/Button';

import { emailValidation, phoneValidation } from '@/utils/validation';

import { useState, useMemo, useEffect, FormEvent } from 'react';

const InfoUser = ({ phone, email, tg }: { phone: string; email: string; tg: string }) => {
  const [userInfo, setUserInfo] = useState({
    phone: phone || 'Укажите телефон',
    email: email || 'Укажите почту',
    tg: tg || 'Укажите телеграмм',
  });
  const [error, setError] = useState<string>('');

  // Синхронизация с пропсами при их изменении
  useEffect(() => {
    setUserInfo({
      phone: phone || 'Укажите телефон',
      email: email || 'Укажите почту',
      tg: tg || 'Укажите телеграмм',
    });
  }, [phone, email, tg]);

  const handleChange = (label: string, value: string) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  const data = useMemo(
    () => [
      {
        label: 'phone',
        value: userInfo.phone,
        handler: (newPhone: string) => handleChange('phone', newPhone),
        icon: 'phone.svg',
        inputComponent: InputPhone,
      },
      {
        label: 'email',
        value: userInfo.email,
        handler: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value),
        icon: 'email.svg',
        inputComponent: InputText,
      },
      {
        label: 'tg',
        value: userInfo.tg,
        handler: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('tg', e.target.value),
        icon: 'telegramBlack.svg',
        inputComponent: InputText,
      },
    ],
    [userInfo]
  );

  const editUser = async (event: FormEvent) => {
    event.preventDefault();

    const isEmailValid = await emailValidation(userInfo.email);
    if (!isEmailValid) {
      setError('Неверный email');
      return;
    }

    const isPhoneValid = await phoneValidation(userInfo.phone);
    if (!isPhoneValid) {
      setError('Неверный телефон');
      return;
    }

    if (userInfo.tg === '') {
      setError('Введите коректный телеграм');
      return;
    }

    const res = await fetch('/api/profile/edit', {
      method: 'POST',
      body: JSON.stringify({ phone: userInfo.phone, tg: userInfo.tg, email: userInfo.email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setError('Данные обновлены');
      return;
    } else {
      setError('Ошибка в обновлении');
      return;
    }
  };

  return (
    <form className={styles.main} onSubmit={editUser}>
      <h2>Личные данные</h2>
      <div className={styles.elems}>
        {data.map(({ label, value, handler, icon, inputComponent }) => (
          <UserInfoElem key={label} label={label} value={value} handler={handler} InputComponent={inputComponent} icon={icon} />
        ))}
      </div>
      <p className={styles.error}>{error}</p>
      <Button className={styles.button} type="submit" color="green">
        Изменить
      </Button>
    </form>
  );
};

export default InfoUser;
