import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { SignUpForm } from './signUpForm/SignUpForm';
import './SignUpPage.scss';
import { useTranslation } from 'react-i18next';

export const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="signup">
      <h1>{t('Create account')}</h1>
      <SignUpForm />
      <p>
        {t('Already have an account?')}
        <Link to={`/${PATHS.SIGN_IN}`}>{t('sign in')}!</Link>
      </p>
    </div>
  );
};
