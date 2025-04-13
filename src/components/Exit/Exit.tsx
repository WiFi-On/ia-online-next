"use client";

import { useRouter } from "next/navigation";
import styles from "./Exit.module.css";

const Exit = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
    } else {
      console.error("Ошибка при выходе");
    }
  };

  return (
    <div onClick={handleLogout} className={styles.main}>
      <span>Выйти</span>
      <img src="/imgs/PartnerInfoModule/exit.svg" alt="Выйти" />
    </div>
  );
};

export default Exit;
