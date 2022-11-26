import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { SignInForm } from './SignInForm/SignInForm';
import { Spinner } from 'components';
import './SignInPage.scss';

export const SignInPage = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);

  return (
    <div className="signin">
      <h1>Sign in to your account</h1>
      <SignInForm />
      <p>
        No account?
        <Link to={`/${PATHS.SIGN_UP}`}>Sign up!</Link>
      </p>
      <Spinner open={isLoading} />
    </div>
  );
};
