"use client";

import React, { memo } from "react";
import styles from "./InputPassword.module.css";
import { JSX } from "react";
import InputPasswordProps from "./props.InputPassword";
import { useState } from "react";

const InputPassword = memo(
  ({
    placeholder,
    value,
    className,
    onChange,
    onBlur,
    autoFocus = false,
  }: InputPasswordProps): JSX.Element => {
    const [active, setActive] = useState(false);

    return (
      <div className={styles.main + " " + className}>
        <input
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus={autoFocus}
          type={active ? "text" : "password"}
          value={value}
          className={`${styles.input}`}
        />
        <img
          onClick={() => setActive((prev) => !prev)}
          src={
            active
              ? "/imgs/InputPassword/eye-open.svg"
              : "/imgs/InputPassword/eye-close.svg"
          }
          alt={active ? "Скрыть пароль" : "Показать пароль"}
        />
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
