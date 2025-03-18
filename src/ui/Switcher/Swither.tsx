"use client";

import styles from "./Switcher.module.css";
import { SwitcherProps } from "./Switcher.props";

const Switcher = ({
  switchClassName,
  switchSliderClassName,
  active = false,
  onChange,
}: SwitcherProps) => {
  return (
    <label className={styles.switch + " " + switchClassName}>
      <input
        type="checkbox"
        className={styles.switchInput}
        checked={active}
        onChange={onChange}
      />
      <span
        className={styles.switchSlider + " " + switchSliderClassName}
      ></span>
    </label>
  );
};

export default Switcher;
