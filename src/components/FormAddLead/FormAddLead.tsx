"use client";

import styles from "./FormAddLead.module.css";

import InputText from "@/ui/InputText/InputText";
import InputPhone from "@/ui/InputPhone/InputPhone";
import Button from "@/ui/Button/Button";
import Switcher from "@/ui/Switcher/Swither";
import InputAddress from "@/ui/InputAddress/InputAddress";

import { useState, useCallback, useMemo } from "react";

const FormAddLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    services: [] as number[], // Явно указываем, что массив состоит из чисел
  });

  // Мемоизация обработчиков
  const handleChange = useCallback(
    (field: keyof typeof formData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
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
      { id: 1, label: "Интернет" },
      { id: 2, label: "Клининг" },
      { id: 3, label: "Перевозка" },
    ],
    [] // Этот список не зависит от состояния, поэтому мемоизация с пустым массивом зависимостей
  );

  // Мемоизация toggleService
  const toggleService = useCallback((serviceId: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  }, []);

  return (
    <form className={styles.form}>
      <h1>Создание заявки</h1>
      <div className={styles.inputs}>
        <InputText
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="Имя клиента"
          className={styles.input}
        />
        <InputPhone
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Введите номер телефона"
          className={styles.input}
        />
        <InputAddress
          value={formData.address}
          onChange={handleChange("address")}
          placeholder="Адрес"
          className={styles.input}
        />
        <InputText
          value={formData.comment}
          onChange={handleChange("comment")}
          placeholder="Комментарий"
          className={styles.input}
        />
      </div>

      <div className={styles.switchers}>
        {servicesList.map(({ id, label }) => (
          <div key={id} className={styles.switch}>
            <Switcher
              switchClassName={styles.switchSize}
              switchSliderClassName={styles.switchSlider}
              active={formData.services.includes(id)}
              onChange={() => toggleService(id)}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <Button
        className={styles.button}
        color="green"
        onClick={() => console.log(formData)}
      >
        Создать заявку
      </Button>
    </form>
  );
};

export default FormAddLead;
