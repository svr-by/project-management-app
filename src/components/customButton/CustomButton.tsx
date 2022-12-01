import { ReactNode, MouseEvent } from 'react';
import './CustomButton.scss';

type TCustomButtonProps = {
  children?: ReactNode;
  className?: string;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  disabled?: boolean;
  style?: 'flare' | 'shadow';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const CustomButton = (props: TCustomButtonProps) => {
  const { children, className, active, onClick, style, ...atrs } = props;
  function renderClassName(className?: string, style?: string, active?: boolean) {
    let agrClass = 'button';
    agrClass = style === 'flare' ? `${agrClass} style--flare` : agrClass;
    agrClass = style === 'shadow' ? `${agrClass} style--shadow` : agrClass;
    agrClass = className ? `${agrClass} ${className}` : agrClass;
    agrClass = active ? `${agrClass} active` : agrClass;
    return agrClass;
  }

  return (
    <button className={renderClassName(className, style, active)} onClick={onClick} {...atrs}>
      {children}
    </button>
  );
};
