import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './CustomLink.scss';

type CustomLinkProps = {
  children: ReactNode;
  active?: boolean;
  style?: 'filled';
  to?: string;
  onClick?: () => void;
};

export const CustomLink = (props: CustomLinkProps) => {
  const { children, active, onClick, style, to } = props;

  function renderClassName() {
    let agrClass = 'custom-link';
    agrClass = style === 'filled' ? `${agrClass} custom-link--filled` : agrClass;
    agrClass = active ? `${agrClass} active` : agrClass;
    return agrClass;
  }

  return to ? (
    <NavLink className={renderClassName()} to={to}>
      {children}
    </NavLink>
  ) : (
    <a className={renderClassName()} onClick={onClick}>
      {children}
    </a>
  );
};
