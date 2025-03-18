export interface UserInfoProps {
  phone: string;
  email: string;
  tg: string;
  handlePhone: (newPhone: string) => void;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserInfoElemProps {
  label: string;
  value: string;
  handler:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((newPhone: string) => void);
  icon: string;
  InputComponent: React.ElementType;
}
