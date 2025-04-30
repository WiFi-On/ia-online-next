import styles from './Nav.module.css';
import { NavProps } from '@/interfaces/Nav/Nav.interfaces';

const Nav = ({ text, imgPath, name = 'default' }: NavProps) => {
  return (
    <a href="https://t.me/iaonlineru" className={styles.main + ' ' + styles[name]}>
      <span>{text}</span>
      <img src={imgPath} alt="" />
    </a>
  );
};

export default Nav;
