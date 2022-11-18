import React from 'react';
import { Navigate } from 'react-router-dom';

type ComponentProps = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: ComponentProps) => {
  const auth = false;

  if (!auth) {
    return <Navigate to="/welcome" />;
  }

  return <>children</>;
};
