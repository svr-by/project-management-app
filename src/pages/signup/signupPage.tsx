import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from 'api/services/authService';
import { useAppDispatch } from 'redux/hooks';
import { singIn } from 'redux/slices/userSlice';
import { TUserPrams } from 'core/types/server';
import { PATHS } from 'core/constants';
import { SignUpForm } from 'components/forms/SignUpForm';
import { Spinner } from 'components/spinner/Spinner';
import './SignUpPage.scss';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (user: TUserPrams) => {
    setIsLoading(true);
    signUp(user)
      .then(() => {
        const userSignInParams = {
          login: user.login,
          password: user.password,
        };
        return dispatch(singIn(userSignInParams));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="signup">
      <h1>Create account</h1>
      <SignUpForm submitBtn="Submit" onSubmit={onSubmit} />
      <p>
        Already have an account?
        <Link to={`/${PATHS.SIGN_IN}`}>Sign in!</Link>
      </p>
      <Spinner open={isLoading} />
    </div>
  );
};
