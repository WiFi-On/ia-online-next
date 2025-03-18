interface InputTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  type?: string;
  className?: string;
}

export default InputTextProps;
