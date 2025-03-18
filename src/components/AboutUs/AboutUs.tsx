import styles from "./AboutUs.module.css";
import { JSX } from "react";

const AboutUs = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <h2>О нас</h2>
      <p>
        Мы подключаем <span>Ваших</span> клиентов к интернету
      </p>
      <p>
        И <span>платим</span> Вам за это!
      </p>
    </div>
  );
};

export default AboutUs;
