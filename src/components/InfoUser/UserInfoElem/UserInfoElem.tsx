import { useState } from "react";
import styles from "./UserInfoElem.module.css";
import { UserInfoElemProps } from "@/interfaces/UserInfo/UserInfo.interfaces";

const UserInfoElem = ({
  label,
  icon,
  value,
  handler,
  InputComponent,
}: UserInfoElemProps) => {
  const [editField, setEditField] = useState<string | null>(null);

  const handleEdit = (field: string) => setEditField(field);
  const handleBlur = () => setEditField(null);

  return (
    <div key={label} className={styles.elem}>
      <img
        className={styles.icon}
        src={`imgs/PartnerInfoModule/${icon}`}
        alt=""
      />
      <div className={styles.data}>
        {editField === label ? (
          <InputComponent
            value={value}
            onChange={handler}
            onBlur={handleBlur}
            autoFocus
            className={styles.input}
          />
        ) : (
          <span>{value}</span>
        )}

        <img
          src="imgs/PartnerInfoModule/edit.svg"
          alt="Edit"
          onClick={() => handleEdit(label)}
          className={styles.editIcon}
        />
      </div>
    </div>
  );
};

export default UserInfoElem;
