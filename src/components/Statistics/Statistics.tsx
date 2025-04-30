import styles from './Statistics.module.css';
import { StatisticsI } from '@/interfaces/Statistics/Statistics.interfaces';

// Функция для капитализации первой буквы
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Statistics = ({ totalPay, internetPay, cleaningPay, referralsPay, movingPay, startDate }: StatisticsI) => {
  // Форматируем месяц
  const month = capitalize(new Date(startDate).toLocaleString('ru-RU', { month: 'long' }));

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <span className={styles.month}>{month}</span>
        <span className={styles.month}>{totalPay + '₽'}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/internet.svg" alt="" />
            <span>Домашний интернет</span>
          </div>
          <div className={styles.number}>{internetPay + '₽'}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/cleaning.svg" alt="" />
            <span>Клининг</span>
          </div>
          <div className={styles.number}>{cleaningPay + '₽'}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/moving.svg" alt="" />
            <span>Переезды</span>
          </div>
          <div className={styles.number}>{movingPay + '₽'}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/referrals.svg" alt="" />
            <span>Рефералы</span>
          </div>
          <div className={styles.number}>{referralsPay + '₽'}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
