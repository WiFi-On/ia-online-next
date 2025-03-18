import styles from "./Statistics.module.css";
import { StatisticsI } from "@/interfaces/Statistics/Statistics.interfaces";

const Statistics = () => {
  const data: StatisticsI = {
    totalPay: 10000,
    internetPay: 500,
    cleaningPay: 5500,
    referralsPay: 2000,
    movingPay: 2000,
  };

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <span className={styles.month}>Март</span>
        <span className={styles.month}>{data.totalPay + "₽"}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/internet.svg" alt="" />
            <span>Домашний интернет</span>
          </div>
          <div className={styles.number}>{data.internetPay + "₽"}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/cleaning.svg" alt="" />
            <span>Клининг</span>
          </div>
          <div className={styles.number}>{data.cleaningPay + "₽"}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/moving.svg" alt="" />
            <span>Переезды</span>
          </div>
          <div className={styles.number}>{data.movingPay + "₽"}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            <img src="/imgs/PartnerInfoModule/referrals.svg" alt="" />
            <span>Рефералы</span>
          </div>
          <div className={styles.number}>{data.referralsPay + "₽"}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
