import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <img className={styles.logo} src="imgs/Footer/logowhite.png" alt="" />
      <p>© 2023-2024 Яонлайн. Все права защищены.</p>
      <div className={styles.links}>
        <a href="">
          <img src="imgs/Footer/telegram.svg" alt="" />
        </a>
        <a href="">
          <img src="imgs/Footer/vk-logo.svg" alt="" />
        </a>
        <a href="">
          <img src="imgs/Footer/whatsapp.svg" alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
