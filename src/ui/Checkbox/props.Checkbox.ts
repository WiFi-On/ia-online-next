interface CheckboxProps {
  checked: boolean;
  children: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default CheckboxProps;
