"use client";

import styles from "./ChangePassword.module.css";
import { useState, useCallback } from "react";

import InputPassword from "@/ui/InputPassword/InputPassword";
import Button from "@/ui/Button/Button";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = useCallback(
    (field: keyof typeof formData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      },
    []
  );

  return (
    <form className={styles.main}>
      <h2>Изменить пароль</h2>
      <div className={styles.inputs}>
        <InputPassword
          value={formData.oldPassword}
          onChange={handleChange("oldPassword")}
          placeholder="Старый пароль"
          className={styles.input}
        />
        <InputPassword
          value={formData.newPassword}
          onChange={handleChange("newPassword")}
          placeholder="Новый пароль"
          className={styles.input}
        />
        <InputPassword
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Повторите новый пароль"
          className={styles.input}
        />
      </div>
      <Button
        onClick={() => {}}
        className={styles.button}
        color="green"
        type="submit"
      >
        Изменить
      </Button>
    </form>
  );
};

export default ChangePassword;
