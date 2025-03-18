import React, { memo } from "react";
import styles from "./InputText.module.css";
import { JSX } from "react";
import InputTextProps from "./props.InputText";

const InputText = memo(
  ({
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    autoFocus = false,
  }: InputTextProps): JSX.Element => {
    console.log(`Render InputText: ${placeholder}`); // Проверить ререндеры

    return (
      <input
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        type="text"
        value={value}
        className={`${styles.main} ${className}`}
      />
    );
  }
);

// Указываем displayName для удобной отладки
InputText.displayName = "InputText";

export default InputText;
