'use client';

import { useRouter } from 'next/navigation';

import styles from './FormConfirmation.module.css';

import Button from '@/ui/Button/Button';

const FormLogin = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <h1>Подтверждение</h1>

      <p className={styles.text}>Перейдите по ссылке, которая направлена вам на почту и войдите в личный кабинет</p>

      <Button
        className={styles.button}
        onClick={() => {
          router.push('/login');
        }}
        color="green"
        type="submit"
      >
        Вход
      </Button>
    </div>
  );
};
export default FormLogin;
