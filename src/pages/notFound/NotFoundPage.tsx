import { CustomLink } from 'components/customLink/CustomLink';
import { PATHS } from 'core/constants';
import { useTranslation } from 'react-i18next';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">{t('Not found title')}</h1>
      <CustomLink style="filled" to={PATHS.MAIN}>
        {t('Go to main page')}
      </CustomLink>
    </div>
  );
};
