import styles from "./Partners.module.css";

const Parteners = () => {
  return (
    <div className={styles.main}>
      <h2>
        Наши <span>партнеры</span>
      </h2>
      <div className={styles.partners}>
        <img src="imgs/Partners/beeline.svg" alt="" />
        <img src="imgs/Partners/megafon.svg" alt="" />
        <img src="imgs/Partners/mts.svg" alt="" />
        <img src="imgs/Partners/tele2.svg" alt="" />
        <img src="imgs/Partners/rtk.svg" alt="" />
        <img src="imgs/Partners/ttk.svg" alt="" />
        <img src="imgs/Partners/ufanet.svg" alt="" />
        <img src="imgs/Partners/domru.svg" alt="" />
      </div>
    </div>
  );
};

export default Parteners;
