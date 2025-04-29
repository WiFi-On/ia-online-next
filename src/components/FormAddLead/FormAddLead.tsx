'use client';

import styles from './FormAddLead.module.css';

import InputText from '@/ui/InputText/InputText';
import InputPhone from '@/ui/InputPhone/InputPhone';
import Button from '@/ui/Button/Button';
import Switcher from '@/ui/Switcher/Swither';
import InputAddress from '@/ui/InputAddress/InputAddress';

import { useRouter } from 'next/navigation';

import { useState, useCallback, useMemo, FormEvent } from 'react';

const FormAddLead = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
    services: [] as number[], // Явно указываем, что массив состоит из чисел
  });
  const router = useRouter();
  const [info, setInfo] = useState('');

  // Мемоизация обработчиков
  const handleChange = useCallback(
    (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const handlePhoneChange = useCallback((newPhone: string) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
  }, []);

  // Мемоизация массива сервисов
  const servicesList = useMemo(
    () => [
      { id: 1, label: 'Интернет' },
      { id: 2, label: 'Клининг' },
      { id: 3, label: 'Перевозка' },
    ],
    [] // Этот список не зависит от состояния, поэтому мемоизация с пустым массивом зависимостей
  );

  // Мемоизация toggleService
  const toggleService = useCallback((serviceId: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId) ? prev.services.filter((id) => id !== serviceId) : [...prev.services, serviceId],
    }));
  }, []);

  const addLead = async (event: FormEvent) => {
    event.preventDefault();

    if (formData.name === '') {
      setInfo('Имя не заполнено');
      return;
    }
    if (formData.phone === '') {
      setInfo('Телефон не заполнен');
      return;
    }
    if (formData.address === '') {
      setInfo('Адрес не заполнен');
      return;
    }
    if (formData.services.length === 0) {
      setInfo('Нужно выбрать хотя бы одну услугу');
      return;
    }

    const res = await fetch('/api/lead/save', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status === 401) {
      router.push('/login'); // редирект на логин
      return;
    }

    if (res.ok) {
      setFormData({
        name: '',
        phone: '',
        address: '',
        comment: '',
        services: [],
      });
      setInfo('Заявка успешно отправлена');
    } else {
      setInfo('Ошибка в отправке');
    }
  };

  return (
    <form className={styles.form} onSubmit={addLead}>
      <h1>Создание заявки</h1>
      <div className={styles.inputs}>
        <InputText value={formData.name} onChange={handleChange('name')} placeholder="Имя клиента" className={styles.input} />
        <InputPhone value={formData.phone} onChange={handlePhoneChange} placeholder="Введите номер телефона" className={styles.input} />
        <InputAddress value={formData.address} onChange={handleChange('address')} placeholder="Адрес" className={styles.input} />
        <InputText value={formData.comment} onChange={handleChange('comment')} placeholder="Комментарий" className={styles.input} />
      </div>

      <div className={styles.switchers}>
        {servicesList.map(({ id, label }) => (
          <div key={id} className={styles.switch}>
            <Switcher switchClassName={styles.switchSize} switchSliderClassName={styles.switchSlider} active={formData.services.includes(id)} onChange={() => toggleService(id)} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className={styles.info}>{info}</p>

      <Button className={styles.button} color="green">
        Создать заявку
      </Button>
    </form>
  );
};

export default FormAddLead;
