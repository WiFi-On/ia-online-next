import styles from "./Fact.module.css";
import PropsFact from "./props.Fact";

const Fact = ({ desc, title }: PropsFact) => {
  return (
    <div className={styles.main}>
      <div className={styles.desc}>
        <p className={styles.textWithDot}>{desc}</p>
      </div>

      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Fact;
