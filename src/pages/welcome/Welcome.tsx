import { CustomLink } from 'components/customLink/CustomLink';
import { PATHS } from 'core/constants';
import KanbanPicture from 'assets/img/kanban-welcome.png';
import './Welcome.scss';

export const Welcome = () => {
  return (
    <div className="welcome">
      <div className="description">
        <h1 className="description__header">Task Manager</h1>
        <p className="description__text">
          It is a project management software that allows you to centrally manage tasks and their
          timely completion. Trackers are widely used in project management, because they allow you
          to easily monitor all work processes and control the work of the team
        </p>
        <CustomLink style="filled" to={PATHS.MAIN}>
          Get started
        </CustomLink>
      </div>
      <img className="welcome__image" src={KanbanPicture} alt="Kanban Picture" />
    </div>
  );
};
