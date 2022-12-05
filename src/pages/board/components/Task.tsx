import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'components/modal/Modal';
import { ConfModal } from 'components/confModal/СonfModal';
import { TTaskResExt, TTaskParamsExt } from 'core/types/server';
import {
  deleteTaskInColumnId,
  updateTaskInColumnId,
  updateTasksSet,
  changeTasksState,
} from 'redux/slices/tasksSlice';
import { TextField, Button, CircularProgress } from '@mui/material';
import { ERROR_MES } from 'core/constants';
import { selectTasksInBoardId } from 'redux/selectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useTranslation } from 'react-i18next';

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
  const userId = dataTask.userId;
  const order = dataTask.order;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { tasks, isLoading } = useAppSelector(selectTasksInBoardId);
  const tasksInColumn = tasks.filter((task) => task.columnId === columnId);

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

    const newArrTasks = tasksInColumn
      .filter((el) => el._id !== taskId)
      .sort((task1, task2) => task1.order - task2.order);

    const orderedTasksInColumn = newArrTasks.map((task, index: number) => ({
      ...task,
      order: index + 1,
    }));

    const newTasks = tasks
      .filter((task) => task.columnId !== columnId)
      .concat(orderedTasksInColumn);

    dispatch(changeTasksState(newTasks));

    const tasksOrderList = orderedTasksInColumn.map((task) => ({
      _id: task._id,
      order: task.order,
      columnId: task.columnId,
    }));

    if (tasksOrderList.length) await dispatch(updateTasksSet(tasksOrderList));

    handleCancel();
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const updateTask: TTaskParamsExt = {
      title: inputsData.title,
      order: order,
      description: inputsData.description,
      columnId: columnId,
      userId: userId,
      users: users,
    };

    await dispatch(updateTaskInColumnId({ boardId, columnId, taskId, updateTask }));
    handleCancel();
  };

  return (
    <>
      <div className="task-title" onClick={openModalChangeTask}>
        {title}
      </div>
      <button className="close-button" onClick={openConfModal}></button>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3 className="modal__title">{t('Update task')}</h3>
          <TextField
            label={t('Title')}
            defaultValue={title}
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: t(ERROR_MES.EMPTY) },
              minLength: { value: 5, message: t(ERROR_MES.MIN_LENGHTS_5) },
              maxLength: { value: 100, message: t(ERROR_MES.MAX_LENGHTS_100) },
            })}
          />
          <TextField
            label={t('Description')}
            defaultValue={description}
            autoComplete="off"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required: { value: true, message: t(ERROR_MES.EMPTY) },
              minLength: { value: 5, message: t(ERROR_MES.MIN_LENGHTS_5) },
              maxLength: { value: 100, message: t(ERROR_MES.MAX_LENGHTS_100) },
            })}
          />
          <Button
            type="submit"
            className="form__btn"
            variant="contained"
            disabled={hasErrors || isLoading}
          >
            {!isLoading ? t('Submit') : <CircularProgress size={24} />}
          </Button>
        </form>
      </Modal>
      <ConfModal onSubmit={handleDeleteTaskId} isOpen={confModal} onCancel={closeConfModal}>
        <h3 className="modal__title">{t('Do you really want to delete task?')}</h3>
      </ConfModal>
    </>
  );
}

export { Task };
