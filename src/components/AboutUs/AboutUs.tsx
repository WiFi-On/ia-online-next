import styles from './AboutUs.module.css';
import { JSX } from 'react';

const AboutUs = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <h2>О нас</h2>
      <p>
        Мы – сервис для <span>риелторов</span>, который превращает клиентов в дополнительный доход.
      </p>
      <p>
        Подключайте интернет, клининг и переезды через нашу уникальную платформу и получайте <span>быстрое вознаграждение</span>.
      </p>
    </div>
  );
};

export default AboutUs;
