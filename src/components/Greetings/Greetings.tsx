'use client';

import styles from './Greetings.module.css';
import Button from '@/ui/Button/Button';
import { JSX } from 'react';
import useRedirect from '@/hooks/useRedirect';

const Greetings = (): JSX.Element => {
  const redirect = useRedirect();

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          Привет, Мы <span>Яонлайн</span>
        </h1>
        <h4>Сделки. Сервис. Прибыль.</h4>
      </div>

      <div className={styles.buttons}>
        <Button className={styles.button} color="green" onClick={() => redirect('/register')}>
          Регистрация
        </Button>
        <Button className={styles.button} color="black" onClick={() => redirect('/login')}>
          Вход
        </Button>
      </div>
    </div>
  );
};

export default Greetings;
