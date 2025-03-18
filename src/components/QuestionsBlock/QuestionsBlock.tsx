import styles from "./QuestionsBlock.module.css";
import Question from "./Question/Question";

const QuestionsBlock = () => {
  const questions: { question: string; answer: string }[] = [
    {
      question: "Сколько стоит подключение?",
      answer:
        "Для клиента наши услуги бесплатны. Нам платят провайдеры - не клиенты.",
    },
    {
      question: "Какого провайдера Вы подключаете?",
      answer:
        "Мы работаем со всеми федеральными провайдерами, по всей России, более подробную информацию по Вашему городу можете узнать после регистрации с помощью окна горячей линии.",
    },
    {
      question: "Зачем Вы мне?",
      answer:
        "Мы поможем Вам улучшить сервис, благодаря чему повышается лояльность клиентов. Присоединяйтесь и Вы!",
    },
    {
      question: "Когда Вы позвоните клиенту?",
      answer:
        "В среднем, мы звоним клиенту через 5-10 минут после получения заявки, но нет предела совершенству : )",
    },
  ];

  return (
    <div className={styles.main}>
      <h2>
        Частые <span>вопросы</span>{" "}
      </h2>
      <div className={styles.bottom}>
        <div className={styles.text}>
          <div className={styles.textAndLine}>
            <div className={styles.line}></div>
            <p>
              Здесь собраны вопросы, которые чаще всего задают риелторы при
              нашем первом знакомстве
            </p>
          </div>
        </div>
        <div className={styles.questions}>
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question.question}
              answer={question.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsBlock;
