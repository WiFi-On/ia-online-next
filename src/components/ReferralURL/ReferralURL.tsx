import styles from "./ReferralURL.module.css";
import { ReferralURLProps } from "@/interfaces/Referrals/Referrals";

const ReferralURL = ({ url }: ReferralURLProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Приглашай:</h1>
      <p>{url}</p>
      <div className={styles.copy} onClick={copyToClipboard} role="button">
        <img src="imgs/PartnerInfoModule/copy.svg" alt="Копировать" />
      </div>
    </div>
  );
};

export default ReferralURL;
