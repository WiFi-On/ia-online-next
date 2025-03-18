"use client";

import React, { useState, useEffect, memo } from "react";
import styles from "./InputPhone.module.css";
import { JSX } from "react";

import InputPhoneProps from "./props.InputPhone";
import {
  getInputNumbersValue,
  formatPhoneNumber,
  handlePhonePaste,
} from "@/utils/phoneUtils";

const InputPhone = memo(
  ({
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    autoFocus = false,
  }: InputPhoneProps): JSX.Element => {
    const [phoneValue, setPhoneValue] = useState(value);

    // Синхронизируем локальный стейт, если `value` меняется извне
    useEffect(() => {
      setPhoneValue(value);
    }, [value]);

    const onPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const inputNumbersValue = getInputNumbersValue(input.value);
      const selectionStart = input.selectionStart ?? 0;

      if (!inputNumbersValue) {
        setPhoneValue("");
        onChange?.(""); // Вызов onChange если он передан
        return;
      }

      if (input.value.length !== selectionStart) {
        if (
          e.nativeEvent instanceof InputEvent &&
          /\D/g.test(e.nativeEvent.data ?? "")
        ) {
          input.value = inputNumbersValue;
        }
        return;
      }

      const formattedInputValue = formatPhoneNumber(inputNumbersValue);
      setPhoneValue(formattedInputValue);
      onChange?.(formattedInputValue); // Вызов onChange если он передан
    };

    const onPhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = (e.target as HTMLInputElement).value.replace(
        /\D/g,
        ""
      );
      if (e.key === "Backspace" && inputValue.length === 1) {
        setPhoneValue("");
        onChange?.("");
      }
    };

    return (
      <input
        placeholder={placeholder}
        type="tel"
        value={phoneValue}
        className={`${styles.main} ${className}`}
        onChange={onPhoneInput}
        onPaste={handlePhonePaste}
        onKeyDown={onPhoneKeyDown}
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    );
  }
);

InputPhone.displayName = "InputPhone";

export default InputPhone;
