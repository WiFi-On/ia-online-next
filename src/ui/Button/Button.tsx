"use client";

import styles from "./Button.module.css";
import { JSX } from "react";
import PropsButton from "./props.Button";

const Button = ({
  children,
  color,
  className,
  onClick,
}: PropsButton): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
