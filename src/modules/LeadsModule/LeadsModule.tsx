"use client";

import styles from "./LeadsModule.module.css";

import Leads from "@/components/Leads/Leads";
import Filter from "@/components/Filter/Filter";

import { Option } from "@/interfaces/Filter/Filter.intreface";
import { LeadService } from "@/interfaces/Lead/Lead.interface";
import { Value } from "@/interfaces/Calendar/Calendar.intreface";

import { useState } from "react";

// TODO: добавить пагинацию и мемеизацию
const LeadsModule = () => {
  const [date, setDate] = useState<Value>([new Date(), new Date()]);
  const [servicesState, setServicesState] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const options: Option[] = [
    { id: 0, value: "new", name: "Новая заявка" },
    { id: 1, value: "noContact", name: "Недозвон" },
    { id: 2, value: "pending", name: "Отложена" },
    { id: 3, value: "scheduled", name: "Назначена" },
    { id: 4, value: "ready", name: "Готова" },
    { id: 5, value: "paid", name: "Оплачено" },
    { id: 6, value: "refusal", name: "Отказ" },
  ];
  const leads: LeadService[] = [
    {
      id: 1,
      name: "Шеламыдов Алексей Александрович",
      address:
        "Московская обл, г Красногорск, деревня Глухово, ул Рублевское предместье, д 6 к 3, кв 64",
      phone: "+7 (555) 555-55-55",
      comments: [
        "Клиент интересуется скидками jasdjasdklaskldjkasljd jasdjksdj jsjd ajsdjkasdkjaskdj jasdj",
        "Просил перезвонить asdasdasd aaaasd ssd sssd sadssasd после 18:00",
      ],
      status: { id: 0, name: "new", ru_name: "Новая заявка" },
      services: [0, 1],
      price: {
        internet: 2000,
        cleaning: 6000,
        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 2,
      name: "Мария Смирнова",
      address: "пр. Победы, д. 9, офис 302, Санкт-Петербург",
      phone: "+7 (921) 678-90-12",
      comments: ["Не берет трубку", "Оставлено голосовое сообщение"],
      status: { id: 1, name: "noContact", ru_name: "Недозвон" },
      services: [0],
      price: {
        internet: 2000,
        cleaning: 6000,
        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 3,
      name: "Владислав Петров",
      address: "ул. Гоголя, д. 15, кв. 7, Казань",
      phone: "+7 (987) 543-21-00",
      comments: ["Просил перезвонить через неделю", "Интересовался гарантией"],
      status: { id: 2, name: "pending", ru_name: "Отложена" },
      services: [1],
      price: {
        internet: 2000,
        cleaning: 6000,
        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 4,
      name: "Екатерина Васильева",
      address: "ул. Цветочная, д. 3, Сочи",
      phone: "+7 (918) 345-67-22",
      comments: [
        "Подтвердила встречу на 14:30",
        "Нужно уточнить детали договора",
      ],
      status: { id: 3, name: "scheduled", ru_name: "Назначена" },
      services: [1, 2],
      price: {
        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 5,
      name: "Дмитрий Козлов",
      address: "пр. Мира, д. 101, Новосибирск",
      phone: "+7 (913) 222-11-44",
      comments: [
        "Заказал услугу с дополнительными опциями",
        "Оформлен договор",
      ],
      status: { id: 4, name: "ready", ru_name: "Готова" },
      services: [0, 2],
      price: {
        internet: 2000,
        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 6,
      name: "Ольга Никитина",
      address: "ул. Советская, д. 8, Воронеж",
      phone: "+7 (920) 555-33-22",
      comments: ["Оплата проведена", "Ждет подтверждение доставки"],
      status: { id: 5, name: "paid", ru_name: "Оплачено" },
      services: [0, 2],
      price: {
        internet: 2000,

        shipping: 4000,
        total: 12000,
      },
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
    {
      id: 7,
      name: "Сергей Волков",
      address: "пер. Зеленый, д. 6, Екатеринбург",
      phone: "+7 (922) 111-88-99",
      comments: [
        "Передумал, выбрал другого поставщика",
        "Просил удалить его из базы",
      ],
      status: { id: 6, name: "refusal", ru_name: "Отказ" },
      services: [0, 2],
      dateAndTimeCreated: "2022-01-10T18:00:00",
    },
  ];

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleServicesChange = (newServices: number) => {
    if (servicesState.includes(newServices)) {
      setServicesState(
        servicesState.filter((service) => service !== newServices)
      );
    } else {
      setServicesState([...servicesState, newServices]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.main}>
      <Filter
        options={options}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        dateRange={date}
        handleDateChange={handleDateChange}
        services={servicesState}
        handleServicesChange={handleServicesChange}
        searchText={search}
        handleSearchChange={handleSearchChange}
      />
      <Leads leads={leads} />
    </div>
  );
};

export default LeadsModule;
