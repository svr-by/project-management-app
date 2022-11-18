import { TTaskResExt } from 'core/types/server';
import { useAppDispatch } from 'redux/hooks';
import { getTasksInColumnId } from 'redux/slices/tasksSlice';
import { deleteTaskById } from 'api/services/tasksService';

type TaskProps = {
  boardId: string;
  columnId: string;
  dataTask: TTaskResExt;
};

function Task(props: TaskProps) {
  const { boardId, columnId, dataTask } = props;
  const dispatch = useAppDispatch();

  const handleDeleteTaskId = async () => {
    await deleteTaskById(boardId, columnId, dataTask._id);

    dispatch(getTasksInColumnId({ boardId, columnId }));
  };

  return (
    <li className="task-item">
      <div className="task-title">{dataTask.title}</div>
      <button className="close-button" onClick={handleDeleteTaskId}></button>
    </li>
  );
}

export { Task };
