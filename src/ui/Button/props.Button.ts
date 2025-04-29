import { ReactNode } from 'react';

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: 'green' | 'black';
  className?: string;
  onClick?: () => void;
}

export default PropsButton;
