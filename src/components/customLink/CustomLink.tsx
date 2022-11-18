import React, { useState } from 'react';
import { Link as ReactRouterLink, useMatch } from 'react-router-dom';
import './CustomLink.scss';

type CustomLinkProps = {
  child: string;
  to: string;
};

const CustomLink = ({ child, to }: CustomLinkProps) => {
  const match = useMatch(to);
  const [color, setColor] = useState('#000000');

  return (
    <ReactRouterLink
      className="link"
      to={to}
      onMouseEnter={() => setColor('#ffffff')}
      onMouseLeave={() => setColor('#000000')}
      style={{
        color: match ? '#e3cc00' : color,
      }}
    >
      {child}
    </ReactRouterLink>
  );
};

export default CustomLink;
