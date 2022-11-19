import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomLink.scss';

type CustomLinkProps = {
  child: string;
  to: string;
};

const CustomLink = ({ child, to }: CustomLinkProps) => {
  return (
    <NavLink className="link" to={to}>
      {child}
    </NavLink>
  );
};

export default CustomLink;
