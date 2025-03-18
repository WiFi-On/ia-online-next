import styles from "./Nav.module.css";
import { NavProps } from "@/interfaces/Nav/Nav.interfaces";

const Nav = ({ text, imgPath, name = "default" }: NavProps) => {
  return (
    <div className={styles.main + " " + styles[name]}>
      <span>{text}</span>
      <img src={imgPath} alt="" />
    </div>
  );
};

export default Nav;
