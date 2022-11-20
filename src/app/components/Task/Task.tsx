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
        <div></div>
        <input type="text" />
        <button></button>
      </Modal>
    </>
  );
}

export { Task };
