import styles from "./Stage.module.css";
import { JSX } from "react";
import { StageProps } from "@/interfaces/HowDoWeWork/Stage/Stage.interface";

const Stage = ({ number, title, color }: StageProps): JSX.Element => {
  return (
    <div className={styles.main + " " + styles[color]}>
      <span>{number}</span>
      <p>{title}</p>
    </div>
  );
};

export default Stage;
