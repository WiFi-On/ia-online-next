import styles from './HowDoWeWork.module.css';
import Stage from './Stage/Stage';

const HowDoWeWork = () => {
  const stages = [
    'Регистрируетсь в личном кабинете',
    'Отправляете контактные данные клиента через форму',
    'Мы подбираем выгодный тариф для Вашего клиента',
    'Подключаем клиента и выплачиваем Вам вознаграждение',
  ];

  return (
    <div className={styles.main}>
      <h2>Как мы работаем</h2>
      <div className={styles.stages}>
        <Stage number={1} color="grey" title={stages[0]} />
        <Stage number={2} color="grey" title={stages[1]} />
        <Stage number={3} color="grey" title={stages[2]} />
        <Stage number={4} color="green" title={stages[3]} />
      </div>
    </div>
  );
};

export default HowDoWeWork;
