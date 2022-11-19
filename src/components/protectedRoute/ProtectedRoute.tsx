import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from 'core/constants';

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user.id', user.id);
  console.log('!user.id', !user.id);

  if (!user.id) {
    return <Navigate to={PATHS.SIGN_IN} replace />;
  }

  return <Outlet />;
};
