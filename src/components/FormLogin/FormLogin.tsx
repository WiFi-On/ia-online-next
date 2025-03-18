"use client";

import { useState, ChangeEvent, useCallback } from "react";

import styles from "./FormLogin.module.css";

import Checkbox from "@/ui/Checkbox/Checkbox";
import Button from "@/ui/Button/Button";
import OAuthButton from "@/ui/OAuthButton/OAuthButton";
import InputText from "@/ui/InputText/InputText";
import InputPassword from "@/ui/InputPassword/InputPassword";

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleChange = useCallback(
    (field: keyof typeof formData) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      },
    []
  );

  return (
    <form className={styles.main}>
      <h1>Вход</h1>
      <div className={styles.inputs}>
        <InputText
          value={formData.email}
          onChange={handleChange("email")}
          className={styles.inputText}
          placeholder="Почта"
        ></InputText>
        <InputPassword
          className={styles.inputPassword}
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Пароль"
        ></InputPassword>
      </div>

      <Button
        className={styles.button}
        onClick={() => {}}
        color="green"
        type="submit"
      >
        Войти
      </Button>

      <Checkbox
        checked={formData.rememberMe}
        onChange={handleChange("rememberMe")}
      >
        Запомнить меня
      </Checkbox>

      <div className={styles.links}>
        <p>
          Нет аккаунта? <span>Регистрация</span>
        </p>
        <p>
          Забыли пароль? <span>Восстановить</span>
        </p>
      </div>

      <OAuthButton company="vk" />
    </form>
  );
};
export default FormLogin;
