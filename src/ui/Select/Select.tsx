import styles from "./Select.module.css";
import { SelectProps } from "./Select.props";
import { useState } from "react";

const Select = ({
  options,
  selectedOption,
  handleOptionChange,
  arrowSize,
  selectSize,
  listSize,
}: SelectProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.main}>
      <div
        className={styles.select + " " + selectSize}
        onClick={() => setActive(!active)}
      >
        <span>{selectedOption?.name || "Выберите"}</span>
        <div
          className={`${styles.arrow} ${arrowSize} ${
            active ? styles.rotated : ""
          }`}
        ></div>
      </div>
      <div
        className={`${styles.list} ${listSize} ${
          active ? styles["list-active"] : ""
        }`}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={`${styles.option} ${
              selectedOption?.id === option.id ? styles.selected : ""
            }`}
            onClick={() => {
              handleOptionChange(option);
              setActive(false);
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
