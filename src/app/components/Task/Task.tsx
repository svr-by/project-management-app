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

  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleDeleteTaskId = async () => {
    dispatch(deleteTasksInColumnId({ boardId, columnId, taskId }));
  };

  return (
    <>
      <li className="task-item" onClick={openModal}>
        <div className="task-title">{title}</div>
        <button className="close-button" onClick={handleDeleteTaskId}></button>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <div className="task-details">
          <h4 className="task-details__header">Edit task title</h4>
          <fieldset className="task-details__task-title">
            <legend>Task title</legend>
            <div>
              <input type="text" id="title" value="" {...register('title')} />
            </div>
          </fieldset>
          <fieldset className="task-details__task-description">
            <legend>Task description</legend>
            <div>
              <textarea rows={4} id="description" value="" {...register('description')} />
            </div>
          </fieldset>
          <button className="task-details__btn-submit">submit</button>
        </div>
      </Modal>
    </>
  );
}

export { Task };
