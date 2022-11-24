import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { singUp } from 'redux/slices/userSlice';
import { TUserPrams } from 'core/types/server';
import { PATHS } from 'core/constants';
import { SignUpForm } from 'components/forms/SignUpForm';
import './SignUpPage.scss';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (user: TUserPrams) => {
    dispatch(singUp(user));
  };

  return (
    <div className="signup">
      <h1>Create account</h1>
      <SignUpForm submitBtn="Submit" onSubmit={onSubmit} />
      <p>
        Already have an account?
        <Link to={`/${PATHS.SIGN_IN}`}>Sign in!</Link>
      </p>
    </div>
  );
};
