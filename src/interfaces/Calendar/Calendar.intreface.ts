type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface CalendarProps {
  value: Value;
  className?: string;
  onChange: (newDate: Value) => void;
}
