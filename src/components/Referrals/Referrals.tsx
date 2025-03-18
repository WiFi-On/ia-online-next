import styles from "./Referrals.module.css";
import Referral from "./Referral/Referral";

const Referrals = () => {
  const referrals = [
    {
      id: 1,
      name: "John Doe",
      city: "New York",
      phone: "+1 123 456 7890",
      status: "active",
      level: "bronze",
    },
    {
      id: 2,
      name: "Jane Doe",
      city: "Los Angeles",
      phone: "+1 987 654 3210",
      status: "unactive",
      level: "silver",
    },
    {
      id: 3,
      name: "Michael Doe",
      city: "Chicago",
      phone: "+1 765 432 1098",
      status: "active",
      level: "gold",
    },
    {
      id: 4,
      name: "Sarah Doe",
      city: "San Francisco",
      phone: "+1 555 555 5555",
      status: "unactive",
      level: "bronze",
    },
    {
      id: 5,
      name: "David Doe",
      city: "Seattle",
      phone: "+1 234 567 8901",
      status: "active",
      level: "gold",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <span>Информация</span>
        <span>Статус</span>
      </div>
      <div className={styles.referrals}>
        {referrals.map((referral) => (
          <Referral
            key={referral.name}
            name={referral.name}
            city={referral.city}
            phone={referral.phone}
            status={referral.status}
            level={referral.level}
          />
        ))}
      </div>
    </div>
  );
};

export default Referrals;
