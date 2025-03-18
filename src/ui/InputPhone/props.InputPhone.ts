interface InputPasswordProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (newPhone: string) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export default InputPasswordProps;
