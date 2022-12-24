import { CustomLink } from 'components/customLink/CustomLink';
import { PATHS } from 'core/constants';
import { useTranslation } from 'react-i18next';
import KanbanPicture from 'assets/img/kanban-welcome.png';
import './Welcome.scss';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome">
      <div className="description">
        <h1 className="description__header">{t('Task Manager')}</h1>
        <p className="description__text">{t('description program')}</p>
        <CustomLink style="filled" to={PATHS.MAIN}>
          {t('Get started')}
        </CustomLink>
      </div>
      <img className="welcome__image" src={KanbanPicture} alt="Kanban Picture" />
    </div>
  );
};
