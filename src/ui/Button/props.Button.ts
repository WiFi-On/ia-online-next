interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color: "green" | "black";
  className?: string;
  onClick: () => void;
}

export default PropsButton;
