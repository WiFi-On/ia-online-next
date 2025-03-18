"use client";

import React from "react";
import styles from "./Checkbox.module.css";
import CheckboxProps from "./props.Checkbox";

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, children }) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkbox} />
      <span className={styles.checkboxLabel}>{children}</span>
    </label>
  );
};

export default Checkbox;
