interface InputAddressProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addresses?: string[];
}

export default InputAddressProps;
