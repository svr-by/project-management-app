import { useState } from 'react';
import { Modal } from 'components/modal/Modal';
import { TTaskResExt } from 'core/types/server';
import { useAppDispatch } from 'redux/hooks';
import { deleteTasksInColumnId } from 'redux/slices/tasksSlice';

type TaskProps = {
  boardId: string;
  columnId: string;
  dataTask: TTaskResExt;
};

function Task(props: TaskProps) {
  const { boardId, columnId, dataTask } = props;
  const taskId = dataTask._id;
  const title = dataTask.title;
  const dispatch = useAppDispatch();

  const [isOpenTask, setisOpenTask] = useState(false);
  const handleCancel = () => {
    setisOpenTask(false);
  };
  const openModal = () => {
    setisOpenTask(true);
  };

  const handleDeleteTaskId = async () => {
    dispatch(deleteTasksInColumnId({ boardId, columnId, taskId }));
  };

  return (
    <>
      <li className="task-item">
        <div className="task-title" onClick={openModal}>{title}</div>
        <button className="close-button" onClick={handleDeleteTaskId}></button>
      </li>
      <Modal isOpen={isOpenTask} onCancel={handleCancel}>
        <div className="details">
          <h4 className="details__header">Edit task title</h4>
          <form>
            <fieldset className="details__title">
              <legend>Task title</legend>
              <div>
                <input type="text" id="title" value="" {...register('title')} />
              </div>
            </fieldset>
            <fieldset className="details__description">
              <legend>Task description</legend>
              <div>
                <textarea rows={4} id="description" value="" {...register('description')} />
              </div>
            </fieldset>
            <button className="details__btn-submit" type="submit">submit</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export { Task };
