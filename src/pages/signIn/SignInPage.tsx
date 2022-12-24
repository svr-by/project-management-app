import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { singIn, eraseErr } from 'redux/slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/selectors';
import { PATHS } from 'core/constants';
import { TSignInParams, TServerMessage } from 'core/types/server';
import { SignInForm, ToastMessage } from 'components';
import { useTranslation } from 'react-i18next';
import './SignInPage.scss';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id: isAuth, message } = useSelector(selectUser);

  useEffect(() => {
    return () => {
      dispatch(eraseErr());
    };
  }, [dispatch]);

  const onSubmit = (data: TSignInParams) => {
    dispatch(singIn(data));
  };

  return isAuth ? (
    <Navigate to={PATHS.MAIN} />
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
