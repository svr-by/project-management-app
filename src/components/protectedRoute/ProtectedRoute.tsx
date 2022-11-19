import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from 'core/constants';

export const ProtectedRoute = () => {
  const isUserAuth = false;

  if (!isUserAuth) {
    return <Navigate to={PATHS.SIGN_IN} replace />;
  }

  return <Outlet />;
};
