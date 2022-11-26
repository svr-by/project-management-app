import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { singIn } from 'redux/slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { PATHS } from 'core/constants';
import { TSignInParams } from 'core/types/server';
import { Spinner, SignInForm } from 'components';
import './SignInPage.scss';

export const SignInPage = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = (data: TSignInParams) => {
    dispatch(singIn(data));
  };

  return (
    <div className="signin">
      <h1>Sign in to your account</h1>
      <SignInForm onSubmit={onSubmit} />
      <p>
        No account?
        <Link to={`/${PATHS.SIGN_UP}`}>Sign up!</Link>
      </p>
      <Spinner open={isLoading} />
    </div>
  );
};
