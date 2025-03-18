export interface SelectProps {
  options: Option[];
  selectedOption: Option | null;
  handleOptionChange: (option: Option) => void;
  arrowSize: string;
  selectSize: string;
  listSize: string;
}

export interface Option {
  id: number;
  name: string;
  value: string;
}
