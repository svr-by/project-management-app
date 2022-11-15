import { ITask } from '../Column/Column';

type TaskProps = {
  dataTask: ITask;
};

function Task(props: TaskProps) {
  // const dispatch = useAppDispatch();
  //  onClick={() => dispatch(deleteTask(id))}  - НА КНОПКУ.

  return (
    <li className="task-item">
      <div className="task-title">{props.dataTask.title}</div>
      <button className="close-button"></button>
    </li>
  );
}

export { Task };
