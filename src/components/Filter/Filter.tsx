"use client";

import styles from "./Filter.module.css";

import Calendar from "@/ui/Calendar/Calendar";
import Select from "@/ui/Select/Select";
import ServicesSelect from "../../ui/ServicesSelect/ServicesSelect";
import InputText from "@/ui/InputText/InputText";

import { FilterProps } from "@/interfaces/Filter/Filter.intreface";

const Filter = ({
  options,
  selectedOption,
  handleOptionChange,
  dateRange,
  handleDateChange,
  services,
  handleServicesChange,
  searchText,
  handleSearchChange,
}: FilterProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.calendar + " " + styles.calendarSize}>
        <span className={styles.span}>Дата</span>
        <Calendar
          className={styles.calendarSize}
          value={dateRange}
          onChange={handleDateChange}
        />
      </div>

      <div className={styles.select}>
        <span className={styles.span}>Статус</span>
        <Select
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
          options={options}
          selectSize={styles.selectSize}
          arrowSize={styles.arrowSize}
          listSize={styles.listSize}
        />
      </div>
      <div className={styles.services}>
        <ServicesSelect
          svgSize={styles.svgSize}
          handleServicesChange={handleServicesChange}
          services={services}
        />
      </div>

      <div className={styles.search}>
        <span className={styles.span}>Поиск</span>
        <InputText
          placeholder="Имя, номер, адрес"
          className={styles.input}
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Filter;
