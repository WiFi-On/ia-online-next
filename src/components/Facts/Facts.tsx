import styles from './Facts.module.css';
import Fact from './Fact/Fact';

const facts = [
  ['Ваши заявки обрабатываются мгновенно, для сохранения Вашего клиента и Вашего дохода.', 'Скорость'],
  [
    'С нашей системой мы контролируем каждый этап: гарантируем стабильное подключение, качественную уборку и безопасность при переезде. Ваши клиенты довольны, а вы – стабильным доходом.',
    'Контроль',
  ],
  [
    'Наша уникальная платформа – это максимум скорости и контроля. Мгновенные заявки, гарантированное качество и автоматические выплаты. Всё для вашего успеха, стабильного дохода и лояльности ваших клиентов.',
    'Платформа',
  ],
];

const Facts = () => {
  return (
    <div className={styles.main}>
      <h2>Преимущества нашей платформы</h2>
      {facts.map((fact, index) => (
        <Fact key={index} desc={fact[0]} title={fact[1]} />
      ))}
    </div>
  );
};

export default Facts;
