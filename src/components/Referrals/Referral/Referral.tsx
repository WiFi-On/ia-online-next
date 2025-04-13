import styles from './Referral.module.css';
import color from './ReferralColors.module.css';
import { ReferralProps } from '@/interfaces/Referrals/Referrals';

const Referral = ({ name, city, phone, active }: ReferralProps) => {
  const backgroundColorActive = color['background_color_' + (active ?? true ? 'active' : 'unactive')];

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
        <p className={styles.status + ' ' + backgroundColorActive}>{active ?? true ? 'Активный' : 'Неактивный'}</p>
      </div>
    </div>
  );
};

export default Referral;
