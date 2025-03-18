import styles from "./Referral.module.css";
import color from "./ReferralColors.module.css";
import { ReferralProps } from "@/interfaces/Referrals/Referrals";
import { getStatusText, getLevelText } from "@/utils/getText";

const Referral = ({ name, city, phone, status, level }: ReferralProps) => {
  const backgroundColorStatus =
    color["background_color_" + status.toLowerCase()];
  const backgroundColorLevel = color["background_color_" + level.toLowerCase()];

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <div>
          <p>Партнер:</p>
          <span>{name}</span>
        </div>
        <div>
          <p>Город:</p>
          <span>{city}</span>
        </div>
        <div>
          <p>Телефон:</p>
          <span>{phone}</span>
        </div>
      </div>

      <div className={styles.statusAndLevel}>
        <p className={styles.level + " " + backgroundColorLevel}>
          {getLevelText(level)}
        </p>
        <p className={styles.status + " " + backgroundColorStatus}>
          {getStatusText(status)}
        </p>
      </div>
    </div>
  );
};

export default Referral;
