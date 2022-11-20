import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { SignUpForm } from './SignUpForm/SignUpForm';
import './SignUpPage.scss';

export const SignUpPage = () => {
  return (
    <div className="signup">
      <h1>Create account</h1>
      <SignUpForm />
      <p>
        Already have an account?
        <Link to={`/${PATHS.SIGN_IN}`}>Sign in!</Link>
      </p>
    </div>
  );
};
