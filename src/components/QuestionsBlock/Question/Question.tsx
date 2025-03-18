"use client";

import { useState } from "react";
import styles from "./Question.module.css";
import QuestionProps from "@/interfaces/QuestionsBlock/Question/Question.interface";

const Question = ({ question, answer }: QuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.main} onClick={toggleAnswer}>
      <div className={styles.question}>
        <p>{question}</p>
        <img
          src="imgs/Ask/cross_icon.png"
          alt=""
          className={`${styles.icon} ${
            isOpen ? styles.rotated : styles.initial
          }`}
        />
      </div>
      <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Question;
