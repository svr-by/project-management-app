import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './CustomLink.scss';

type CustomLinkProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
};

export const CustomLink = ({ children, to, onClick }: CustomLinkProps) => {
  return to ? (
    <NavLink className="custom-link" to={to}>
      {children}
    </NavLink>
  ) : (
    <a className="custom-link" onClick={onClick}>
      {children}
    </a>
  );
};
