"use client";
import { useState, useCallback } from "react";
import { ChangeEvent } from "react";

import styles from "./FormRegistration.module.css";

import Button from "@/ui/Button/Button";
import OAuthButton from "@/ui/OAuthButton/OAuthButton";
import InputPhone from "@/ui/InputPhone/InputPhone";
import InputText from "@/ui/InputText/InputText";
import InputAddress from "@/ui/InputAddress/InputAddress";
import InputPassword from "@/ui/InputPassword/InputPassword";

const FormRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tg: "",
    city: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = useCallback(
    (field: keyof typeof formData) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      },
    []
  );

  const handlePhoneChange = useCallback((newPhone: string) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
  }, []);

  return (
    <form className={styles.main}>
      <h1>Регистрация</h1>
      <div className={styles.inputs}>
        <InputText
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="Имя"
          className={styles.inputText}
        />
        <InputText
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="Почта"
          className={styles.inputText}
        />
        <InputPhone
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Номер(Привязаный к whatsapp)"
          className={styles.inputText}
        />
        <InputText
          value={formData.tg}
          onChange={handleChange("tg")}
          placeholder="Телеграмм(@primer)"
          className={styles.inputText}
        />
        <InputAddress
          value={formData.city}
          onChange={handleChange("city")}
          placeholder="Город"
          className={styles.inputText}
        />
        <InputPassword
          value={formData.newPassword}
          onChange={handleChange("newPassword")}
          placeholder="Пароль"
          className={styles.inputPassword}
        />
        <InputPassword
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Повторите пароль"
          className={styles.inputPassword}
        />
      </div>

      <Button
        onClick={() => console.log("Registration", formData)}
        className={styles.button}
        color="green"
      >
        Регистрация
      </Button>

      <p>
        Уже зарегистрированы? <span>Войти.</span>
      </p>

      <OAuthButton company="vk" />
    </form>
  );
};

export default FormRegistration;
