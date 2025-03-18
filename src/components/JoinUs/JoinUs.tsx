"use client";

import styles from "./JoinUs.module.css";
import Button from "@/ui/Button/Button";
import useRedirect from "@/hooks/useRedirect";

const JoinUs = () => {
  const redirect = useRedirect();

  return (
    <div className={styles.main}>
      <h2>
        Понравилось? <span>Присоединяйся!</span>
      </h2>
      <Button
        onClick={() => redirect("/login")}
        className={styles.button}
        color="black"
      >
        Присоединяйся
      </Button>
    </div>
  );
};

export default JoinUs;
