"use client";

import styles from "./DownloadReport.module.css";
import Calendar from "@/ui/Calendar/Calendar";
import { Value } from "@/interfaces/Calendar/Calendar.intreface";
import { useState } from "react";

const DownloadReport = () => {
  const [date, setDate] = useState<Value>([new Date(), new Date()]);
  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <div className={styles.main}>
      <p>Скачать отчет</p>
      <div className={styles.calendarAndIcon}>
        <Calendar
          className={styles.calendarSize}
          onChange={handleDateChange}
          value={date}
        />
        <img src="/imgs/PartnerInfoModule/download.svg" alt="" />
      </div>
    </div>
  );
};

export default DownloadReport;
