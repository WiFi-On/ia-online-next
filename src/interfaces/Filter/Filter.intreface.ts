import { Value } from "../Calendar/Calendar.intreface";

export interface FilterProps {
  options: Option[];
  selectedOption: Option | null;
  handleOptionChange: (option: Option) => void;
  searchText: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  services: number[];
  handleServicesChange: (newServices: number) => void;
  dateRange: Value;
  handleDateChange: (dateRange: Value) => void;
}

export interface Option {
  id: number;
  name: string;
  value: string;
}
