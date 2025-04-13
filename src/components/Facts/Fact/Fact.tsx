import styles from './Fact.module.css';

const Fact = ({ desc, title }: { desc: string; title: string }) => {
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
