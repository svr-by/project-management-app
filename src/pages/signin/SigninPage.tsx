import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { SignInForm } from './signInForm/SignInForm';
import './SignInPage.scss';

export const SignInPage = () => {
  return (
    <div className="signin">
      <h1>Sign in to your account</h1>
      <SignInForm />
      <p>
        No account?
        <Link to={`/${PATHS.SIGN_UP}`}>Sign up!</Link>
      </p>
    </div>
  );
};
