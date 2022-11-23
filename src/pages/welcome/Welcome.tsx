// import CustomLink from '../../components/customLink/CustomLink';
import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import KanbanBeautifulPicture from 'assets/img/kanban-g96044c9d3_1920.jpg';
import './Welcome.scss';
import { useTranslation } from 'react-i18next';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome">
      <div className="description">
        <h1 className="description__header">{t('Task Manager')}</h1>
        <p className="description__text">{t('description program')}</p>
        <Link to={PATHS.BOARD} className="custom-link">
          {t('Get started')}
        </Link>
      </div>
      <img className="image" src={KanbanBeautifulPicture} alt="KanbanBeautifulPicture" />
    </div>
  );
};
