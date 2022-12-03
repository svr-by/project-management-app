import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'components/modal/Modal';
import { ConfModal } from 'components/confModal/СonfModal';
import { TTaskResExt, TTaskParamsExt } from 'core/types/server';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTasksInBoardId } from 'redux/selectors';
import { deleteTaskInColumnId, updateTaskInColumnId } from 'redux/slices/tasksSlice';
import { TextField, Button, CircularProgress } from '@mui/material';
import { ERROR_MES } from 'core/constants';

type TaskProps = {
  boardId: string;
  columnId: string;
  dataTask: TTaskResExt;
  order: number;
};

interface IFormInput {
  title: string;
  description: string;
}

function Task(props: TaskProps) {
  const { boardId, columnId, dataTask } = props;
  const taskId = dataTask._id;
  const title = dataTask.title;
  const description = dataTask.description;
  const users = dataTask.users;
  // const order = dataTask.order;
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(selectTasksInBoardId);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };
  const openModalChangeTask = () => {
    setIsOpen(true);
  };

  const [confModal, setConfModal] = useState(false);
  const openConfModal = () => {
    setConfModal(true);
  };

  const closeConfModal = () => {
    setConfModal(false);
  };

  const handleDeleteTaskId = async () => {
    await dispatch(deleteTaskInColumnId({ boardId, columnId, taskId }));
    handleCancel();
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const updateTask: TTaskParamsExt = {
      title: inputsData.title,
      order: 0,
      description: inputsData.description,
      columnId: columnId,
      userId: '',
      users: users,
    };

    await dispatch(updateTaskInColumnId({ boardId, columnId, taskId, updateTask }));
    handleCancel();
  };

  return (
    <>
      <li className="task-item">
        <div className="task-title" onClick={openModalChangeTask}>
          {title}
        </div>
        <button className="close-button" onClick={openConfModal}></button>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3>Update task</h3>
          <TextField
            label="Title"
            defaultValue={title}
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: ERROR_MES.EMPTY },
              minLength: { value: 5, message: ERROR_MES.MIN_LENGHTS_5 },
              maxLength: { value: 100, message: ERROR_MES.MAX_LENGHTS_100 },
            })}
          />
          <TextField
            label="Description"
            defaultValue={description}
            autoComplete="off"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required: { value: true, message: ERROR_MES.EMPTY },
              minLength: { value: 5, message: ERROR_MES.MIN_LENGHTS_5 },
              maxLength: { value: 100, message: ERROR_MES.MAX_LENGHTS_100 },
            })}
          />
          <Button type="submit" variant="contained" disabled={hasErrors || isLoading}>
            {!isLoading ? 'Submit' : <CircularProgress size={24} />}
          </Button>
        </form>
      </Modal>
      <ConfModal onSubmit={handleDeleteTaskId} isOpen={confModal} onCancel={closeConfModal}>
        <h3>Do you really want to delete task?</h3>
      </ConfModal>
    </>
  );
}

export { Task };
