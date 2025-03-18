"use client";

import styles from "./CardLead.module.css";
import colorStyles from "./ColorLead.module.css";
import { LeadProps } from "@/interfaces/Lead/Lead.interface";

const CardLead = ({ lead }: LeadProps) => {
  const borderColor = colorStyles["border_status_" + lead.status.name];
  const backgroundColor = colorStyles["background_status_" + lead.status.name];
  const color = colorStyles["color_status_" + lead.status.name];

  return (
    <div className={styles.card + " " + borderColor}>
      <div className={styles.text}>
        <div className={styles.nameAndPhone}>
          <div className={styles.text_elem}>
            <span>Имя клиента:</span>
            <p>{lead.name}</p>
          </div>
          <div className={styles.text_elem}>
            <span>Телефон:</span>
            <p>{lead.phone}</p>
          </div>
        </div>

        <div className={styles.text_elem}>
          <span>Адрес:</span>
          <p>{lead.address}</p>
        </div>

        <div className={styles.text_elem}>
          <span>Комментарии:</span>
          {lead.comments.map((comment, index) => {
            return <p key={index}>{comment}</p>; // Используйте уникальный ключ
          })}
        </div>
      </div>

      <div className={styles.dates}>
        <div className={styles.text_elem}>
          <span>Создана:</span>
          <p>
            {new Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(lead.dateAndTimeCreated))}
          </p>
        </div>
        <div className={styles.text_elem}>
          <span>Выполнена:</span>
          <p>
            {new Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(lead.dateAndTimeCreated))}
          </p>
        </div>
        <div className={styles.text_elem}>
          <span>Оплачена:</span>
          <p>
            {new Intl.DateTimeFormat("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(lead.dateAndTimeCreated))}
          </p>
        </div>
      </div>

      <div className={styles.prices}>
        <div className={styles.services}>
          <div className={styles.service}>
            <svg
              width="800px"
              height="800px"
              className={
                lead.services.includes(0)
                  ? color
                  : colorStyles.color_status_default
              }
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 15L20 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 9L20 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0004 20.8182L11.2862 21.5181C11.4742 21.7101 11.7317 21.8182 12.0004 21.8182C12.2691 21.8182 12.5265 21.7101 12.7146 21.5181L12.0004 20.8182ZM12.0004 3.18188L12.7146 2.48198C12.5265 2.29005 12.2691 2.18188 12.0004 2.18188C11.7317 2.18188 11.4742 2.29005 11.2861 2.48198L12.0004 3.18188ZM14.6004 12.0001C14.6004 15.1611 13.3373 18.0251 11.2862 20.1183L12.7146 21.5181C15.1173 19.0662 16.6004 15.7053 16.6004 12.0001H14.6004ZM11.2861 3.88178C13.3373 5.97501 14.6004 8.83903 14.6004 12.0001H16.6004C16.6004 8.29478 15.1173 4.93389 12.7146 2.48198L11.2861 3.88178ZM9.40039 12.0001C9.40039 8.83903 10.6634 5.97501 12.7146 3.88178L11.2861 2.48198C8.88347 4.93389 7.40039 8.29478 7.40039 12.0001H9.40039ZM12.7146 20.1183C10.6634 18.0251 9.40039 15.1611 9.40039 12.0001H7.40039C7.40039 15.7053 8.88348 19.0662 11.2862 21.5181L12.7146 20.1183Z"
                fill="currentColor"
              />
            </svg>
            <span>
              {lead?.price?.internet ? lead.price.internet + "₽" : ""}{" "}
            </span>
          </div>
          <div className={styles.service}>
            <svg
              version="1.1"
              className={
                lead.services.includes(1)
                  ? color
                  : colorStyles.color_status_default
              }
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <g fill="currentColor">
                <path d="M18,14h-4c-0.6,0-1-0.4-1-1V3c0-1.7,1.3-3,3-3s3,1.3,3,3v10C19,13.6,18.6,14,18,14z" />
              </g>
              <g fill="currentColor">
                <path d="M24.7,20l-0.3-1.6C24,17,22.8,16,21.4,16H10.6c-1.4,0-2.6,1-2.9,2.4L7.3,20H24.7z" />
                <path
                  d="M6.9,22L5,30.8c-0.1,0.3,0,0.6,0.2,0.8C5.4,31.9,5.7,32,6,32h4v-5c0-0.6,0.4-1,1-1s1,0.4,1,1v5h8v-3c0-0.6,0.4-1,1-1
		s1,0.4,1,1v3h4c0.3,0,0.6-0.1,0.8-0.4c0.2-0.2,0.3-0.5,0.2-0.8L25.1,22H6.9z"
                />
              </g>
            </svg>
            <span>
              {lead?.price?.cleaning ? lead.price.cleaning + "₽" : ""}
            </span>
          </div>
          <div className={styles.service}>
            <svg
              width="800px"
              height="800px"
              className={
                lead.services.includes(2)
                  ? color
                  : colorStyles.color_status_default
              }
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2.92V11.23C14 12.25 13.17 13.08 12.15 13.08H3C2.45 13.08 2 12.63 2 12.08V5.69C2 3.65 3.65 2 5.69 2H13.07C13.59 2 14 2.41 14 2.92Z"
                fill="currentColor"
              />
              <path
                d="M21.5 15.5C21.78 15.5 22 15.72 22 16V17C22 18.66 20.66 20 19 20C19 18.35 17.65 17 16 17C14.35 17 13 18.35 13 20H11C11 18.35 9.65 17 8 17C6.35 17 5 18.35 5 20C3.34 20 2 18.66 2 17V15C2 14.45 2.45 14 3 14H12.5C13.88 14 15 12.88 15 11.5V6C15 5.45 15.45 5 16 5H16.84C17.56 5 18.22 5.39 18.58 6.01L19.22 7.13C19.31 7.29 19.19 7.5 19 7.5C17.62 7.5 16.5 8.62 16.5 10V13C16.5 14.38 17.62 15.5 19 15.5H21.5Z"
                fill="currentColor"
              />
              <path
                d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                fill="currentColor"
              />
              <path
                d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                fill="currentColor"
              />
              <path
                d="M22 12.53V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L21.74 11.54C21.91 11.84 22 12.18 22 12.53Z"
                fill="currentColor"
              />
            </svg>
            <span>
              {lead?.price?.shipping ? lead.price.shipping + "₽" : ""}
            </span>
          </div>
        </div>

        <span className={styles.repayment}>
          {lead.price?.total ? lead.price.total + " ₽" : ""}
        </span>
      </div>

      <span className={styles.status + " " + backgroundColor}>
        {lead.status.ru_name}
      </span>
    </div>
  );
};

export default CardLead;
