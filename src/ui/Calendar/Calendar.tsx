import { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";

import styles from "./Calendar.module.css";
import "./React-calendar.css";

import { CalendarProps, Value } from "@/interfaces/Calendar/Calendar.intreface";

function Calendar({ value, onChange, className }: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<Value>(value);

  // Функция для переключения состояния видимости календаря
  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  // Обработчик выбора диапазона
  const handleRangeChange = (newDate: Date | [Date, Date]) => {
    if (Array.isArray(newDate)) {
      // Если выбрали диапазон, обновляем состояние с диапазоном
      setRange(newDate);
      onChange(newDate);
    } else {
      // Если выбрали одну дату, обновляем только начало диапазона
      if (range instanceof Array) {
        if (range[0] && !range[1]) {
          setRange([range[0], newDate]);
          onChange([range[0], newDate]);
        } else {
          setRange([newDate, null]);
          onChange([newDate, null]);
        }
      } else {
        setRange([newDate, null]);
        onChange([newDate, null]);
      }
    }
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString() : "не выбран";

  return (
    <div className={styles.main}>
      {/* Кнопка для скрытия/раскрытия календаря */}
      <button
        onClick={toggleCalendar}
        className={styles.toggle + " " + className}
      >
        {formatDate(range instanceof Array ? range[0] : null)} -{" "}
        {formatDate(range instanceof Array ? range[1] : null)}
      </button>

      <ReactCalendar
        onChange={handleRangeChange as (value: Value) => void} // Приведение типа
        className={`${styles.reactCalendar}  ${
          isOpen ? styles["reactCalendarActive"] : ""
        }`}
        value={range}
        selectRange={true} // Включаем выбор диапазона
      />
    </div>
  );
}

export default Calendar;
