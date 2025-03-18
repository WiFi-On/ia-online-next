import styles from "./Header.module.css";
import { HeaderAndMobileBarProps } from "@/interfaces/Header/Header.interface";

const Header = ({ active }: HeaderAndMobileBarProps) => {
  return (
    <header className={styles.main}>
      <a className={styles.logo} href="">
        <img src="imgs/Header/logoblack.png" alt="Logo" />
      </a>

      <nav className={styles.navLinks}>
        <a className={active === "create" ? styles.active : ""} href="/create">
          Создать заявку
        </a>
        <a className={active === "leads" ? styles.active : ""} href="/leads">
          Заявки
        </a>
        <a
          className={active === "profile" ? styles.active : ""}
          href="/profile"
        >
          Профиль
        </a>
      </nav>
    </header>
  );
};

export default Header;
