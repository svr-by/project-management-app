import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { SignInForm } from './signInForm/SignInForm';
import './SignInPage.scss';
import { useTranslation } from 'react-i18next';

export const SignInPage = () => {
  const { t } = useTranslation();

  return (
    <div className="signin">
      <h1>{t('Sign in to your account')}</h1>
      <SignInForm />
      <p>
        {t('No account?')}
        <Link to={`/${PATHS.SIGN_UP}`}>{t('sign up')}!</Link>
      </p>
    </div>
  );
};
