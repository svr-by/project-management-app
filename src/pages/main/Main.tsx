import { Button } from '../../components/button/Button';
import KanbanBeautifulPicture from '../../assets/img/kanban-g96044c9d3_1920.jpg';
import './Main.scss';

export const Main = () => {
  return (
    <div className="main">
      <div className="description">
        <h1 className="description__header">Task Manager</h1>
        <p className="description__text">
          It is a project management software that allows you to centrally manage tasks and their
          timely completion. Trackers are widely used in project management, because they allow you
          to easily monitor all work processes and control the work of the team
        </p>
        <Button style="shadow">Get started</Button>
      </div>
      <img className="image" src={KanbanBeautifulPicture} alt="KanbanBeautifulPicture" />
    </div>
  );
};
