import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { useAppDispatch } from 'redux/hooks';
import { signUp, singIn, eraseErr } from 'redux/slices/userSlice';
import { TUserPrams, TServerMessage } from 'core/types/server';
import { PATHS } from 'core/constants';
import { UserForm, Spinner, ToastMessage } from 'components';
import { useTranslation } from 'react-i18next';
import './SignUpPage.scss';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isLoading, message } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    return () => {
      dispatch(eraseErr());
    };
  }, [dispatch]);

  const onSubmit = async (user: TUserPrams) => {
    const newUser = await dispatch(signUp(user));
    if (newUser.meta.requestStatus !== 'rejected') {
      const userSignInParams = {
        login: user.login,
        password: user.password,
      };
      return dispatch(singIn(userSignInParams));
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="signup">
        <h1>{t('Create account')}</h1>
        <UserForm submitBtn="Sign up" onSubmit={onSubmit} />
        <p>
          {t('Already have an account?')}
          <Link to={`/${PATHS.SIGN_IN}`}>{t('sign in')}!</Link>
        </p>
      </div>
      <ToastMessage message={message as TServerMessage} />
    </>
  );
};
