"use client";

import styles from "./InputAddress.module.css";
import { JSX } from "react";

import InputAddressProps from "./props.InputAddress";

const InputAddress = ({
  placeholder,
  className,
  value,
  onChange,
}: InputAddressProps): JSX.Element => {
  const addresses = [
    "Москва, ул. Тверская, д. 12",
    "Санкт-Петербург, Невский пр., д. 45",
    "Екатеринбург, ул. Ленина, д. 7",
    "Казань, ул. Баумана, д. 25",
    "Новосибирск, Красный проспект, д. 18",
  ];

  return (
    <div className={styles.main}>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type="text"
        value={value}
        className={`${styles.input} ${className}`}
      />
      <div className={`${styles.list}  ${value ? styles["list-active"] : ""}`}>
        {addresses.map((address, index) => (
          <div key={index}>{address}</div>
        ))}
      </div>
    </div>
  );
};

export default InputAddress;
