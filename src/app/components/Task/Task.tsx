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
  const [isChangeTask, setIsChangeTask] = useState(false);
  const [isDeleteTask, setIsDelete] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setIsChangeTask(false);
    setIsDelete(false);
  };
  const openModalChangeTask = () => {
    setIsOpen(true);
    setIsChangeTask(true);
  };
  const openModalDeleteTask = () => {
    setIsOpen(true);
    setIsDelete(true);
  };

  const handleDeleteTaskId = async () => {
    dispatch(deleteTasksInColumnId({ boardId, columnId, taskId }));
  };

  return (
    <>
      <li className="task-item" onClick={openModalChangeTask}>
        <div className="task-title">{title}</div>
        <button className="close-button" onClick={openModalDeleteTask}></button>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        {isChangeTask &&
          <div className="task-details">
            <h4 className="task-details__header">Edit task title</h4>
            <form className="form-box" onSubmit={handleSubmit(onSubmitFn)}>
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
              <button className="task-details__btn-submit" type='submit'>submit</button>
              <button className="task-details__btn-cancel" onClick={handleCancel}>cancel</button>
            </form>
          </div>
        }
        {isDeleteTask && 
          <div className="task-details">
            <h4 className="task-details__header">Do you really want to delete task?</h4>
            <button className="task-details__btn-submit" onClick={handleDeleteTaskId}>yes</button>
            <button className="task-details__btn-cancel" onClick={handleCancel}>no</button>
          </div>
        }
      </Modal>
    </>
  );
}

export { Task };
