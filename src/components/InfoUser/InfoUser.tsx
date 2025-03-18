"use client";

import styles from "./InfoUser.module.css";

import InputText from "@/ui/InputText/InputText";
import InputPhone from "@/ui/InputPhone/InputPhone";
import UserInfoElem from "@/components/InfoUser/UserInfoElem/UserInfoElem";
import Button from "@/ui/Button/Button";

import { useState, useMemo, useCallback } from "react";

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({
    phone: "+7 (123) 456-78-90",
    email: "john.doe@example.com",
    tg: "@john_doe",
  });

  // Универсальный обработчик изменения данных
  const handleChange = (label: string, value: string) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  // Меморизация данных для предотвращения их пересоздания на каждом рендере
  const data = useMemo(
    () => [
      {
        label: "phone",
        value: userInfo.phone,
        handler: (newPhone: string) => handleChange("phone", newPhone),
        icon: "phone.svg",
        inputComponent: InputPhone,
      },
      {
        label: "email",
        value: userInfo.email,
        handler: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value),
        icon: "email.svg",
        inputComponent: InputText,
      },
      {
        label: "tg",
        value: userInfo.tg,
        handler: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("tg", e.target.value),
        icon: "telegramBlack.svg",
        inputComponent: InputText,
      },
    ],
    [userInfo]
  );

  // Обработчик отправки формы (клика на кнопку)
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Логика для обработки изменений
      console.log("Данные обновлены", userInfo);
    },
    [userInfo]
  );

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <h2>Личные данные</h2>
      <div className={styles.elems}>
        {data.map(({ label, value, handler, icon, inputComponent }) => (
          <UserInfoElem
            key={label}
            label={label}
            value={value}
            handler={handler}
            InputComponent={inputComponent}
            icon={icon}
          />
        ))}
      </div>
      <Button className={styles.button} onClick={() => {}} color="green">
        Изменить
      </Button>
    </form>
  );
};

export default InfoUser;
