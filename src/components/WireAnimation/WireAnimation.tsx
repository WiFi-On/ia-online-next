"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./WireAnimation.module.css";
import { JSX } from "react";
import PropsWireAnimation from "@/interfaces/WireAnimation/WireAnimation.interface";

const WireAnimation = ({ videoSrc, top }: PropsWireAnimation): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null); // Ссылка на видео
  const containerRef = useRef<HTMLDivElement>(null); // Ссылка на контейнер
  const [hasPlayed, setHasPlayed] = useState(false); // Флаг, указывающий, проиграно ли видео

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !hasPlayed) {
          videoRef.current.play(); // Запускаем видео, когда оно становится видимым
          setHasPlayed(true); // Устанавливаем флаг, что видео проиграно
        }
      },
      {
        threshold: 0.5, // Срабатывает, когда 50% элемента видно
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current); // Начинаем наблюдение
    }

    // Очистка при размонтировании
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasPlayed]); // Добавляем hasPlayed как зависимость

  return (
    <div ref={containerRef} className={styles.container} style={{ top }}>
      <video ref={videoRef} muted playsInline className={styles.video}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default WireAnimation;
