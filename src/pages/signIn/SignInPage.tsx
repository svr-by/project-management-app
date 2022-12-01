import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { singIn, eraseErr } from 'redux/slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { PATHS } from 'core/constants';
import { TSignInParams, TServerMessage } from 'core/types/server';
import { SignInForm, Spinner, ToastMessage } from 'components';
import './SignInPage.scss';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, message } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    return () => {
      dispatch(eraseErr());
    };
  }, [dispatch]);

  const onSubmit = (data: TSignInParams) => {
    dispatch(singIn(data));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="signin">
        <h1>Sign in to your account</h1>
        <SignInForm onSubmit={onSubmit} />
        <p>
          No account?
          <Link to={`/${PATHS.SIGN_UP}`}>Sign up!</Link>
        </p>
      </div>
      <ToastMessage message={message as TServerMessage} />
    </>
  );
};
