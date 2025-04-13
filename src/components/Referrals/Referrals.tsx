import styles from './Referrals.module.css';
import Referral from './Referral/Referral';
import { referralI } from '@/app/api/auth/payloads.interface';

const Referrals = ({ referrals }: { referrals: referralI[] }) => {
  console.log(referrals);

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <span>Информация</span>
        <span>Статус</span>
      </div>
      <div className={styles.referrals}>
        {referrals.map((referral: referralI) => (
          <Referral key={referral.id} name={referral.name} city={referral.city} phone={referral.phone_number} active={referral.active} />
        ))}
      </div>
    </div>
  );
};

export default Referrals;
