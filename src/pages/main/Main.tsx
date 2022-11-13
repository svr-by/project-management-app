import { Button } from '../../components/button/Button';
import KanbanBeautifulPicture from '../../assets/img/kanban-g96044c9d3_1920.jpg';
import './Main.scss';

export const Main = () => {
  return (
    <div>
      <div>
        <h1>Task Manager</h1>
        <p>
          It is a project management software that allows you to centrally manage tasks and their
          timely completion. Trackers are widely used in project management, because they allow you
          to easily monitor all work processes and control the work of the team
        </p>
        <Button naming="Get started" />
      </div>
      <img src={KanbanBeautifulPicture} alt="KanbanBeautifulPicture" />
    </div>
  );
};
