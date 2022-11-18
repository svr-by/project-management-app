import React, { useState } from 'react';
import { NavLink as ReactRouterLink, useMatch } from 'react-router-dom';
import './CustomLink.scss';

type CustomLinkProps = {
  child: string;
  to: string;
};

const CustomLink = ({ child, to }: CustomLinkProps) => {
  return (
    <ReactRouterLink className="link" to={to}>
      {child}
    </ReactRouterLink>
  );
};

export default CustomLink;
