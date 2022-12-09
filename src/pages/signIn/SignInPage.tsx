import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singIn, eraseErr } from 'redux/slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { PATHS } from 'core/constants';
import { TSignInParams, TServerMessage } from 'core/types/server';
import { SignInForm, Spinner, ToastMessage } from 'components';
import { useTranslation } from 'react-i18next';
import './SignInPage.scss';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id: isAuth, isLoading, message } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(PATHS.MAIN);
    }
  }, [navigate, isAuth]);

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
        <h1>{t('Sign in to your account')}</h1>
        <SignInForm onSubmit={onSubmit} />
        <p>
          {t('No account?')} <Link to={PATHS.SIGN_UP}>{t('sign up')}!</Link>
        </p>
      </div>
      <ToastMessage message={message as TServerMessage} />
    </>
  );
};
