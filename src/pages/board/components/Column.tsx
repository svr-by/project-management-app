import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from './Task';
import { ColumnTitle } from 'pages/board/components/ColumnTitle';
import { Modal, ConfModal, ToastMessage } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTasksInBoardId } from 'redux/selectors';
import { creatTasksInColumnId } from 'redux/slices/tasksSlice';
import { deleteColumnInBoardId } from 'redux/slices/columnsSlice';
import { useTranslation } from 'react-i18next';
import { TTaskParams } from 'core/types/server';
import { ERROR_MES } from 'core/constants';
import { TServerMessage } from 'core/types/server';
import { TextField, Button, CircularProgress } from '@mui/material';

type TaskProps = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
};

interface IFormInput {
  title: string;
  description: string;
}

const Column = (props: TaskProps) => {
  const { boardId, columnId, title, order } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    tasks,
    isLoading: isTaskLoading,
    message: taskMessage,
  } = useAppSelector(selectTasksInBoardId);
  const tasksInColumnId = tasks.filter((el) => el.columnId === columnId);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const openModalCreatTask = () => {
    setIsOpen(true);
  };

  const [confModal, setConfModal] = useState(false);
  const openConfModal = () => {
    setConfModal(true);
  };

  const closeConfModal = () => {
    setConfModal(false);
  };

  const handleDeleteColumnId = async () => {
    await dispatch(deleteColumnInBoardId({ boardId, columnId }));
    handleCancel();
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const newTask: TTaskParams = {
      title: inputsData.title,
      order: 0,
      description: inputsData.description,
      userId: '0',
      users: [''],
    };

    await dispatch(creatTasksInColumnId({ boardId, columnId, newTask }));
    reset();
    handleCancel();
  };

  return (
    <>
      <li className="column">
        <div className="card-column">
          <div className="title-column-box">
            <ColumnTitle boardId={boardId} columnId={columnId} title={title} order={order} />
            <button className="close-button-column" onClick={openConfModal}></button>
          </div>
          <ul className="tasks-list">
            {tasksInColumnId.map((el) => (
              <Task
                key={el._id}
                boardId={boardId}
                columnId={columnId}
                dataTask={el}
                order={el.order}
              />
            ))}
          </ul>
          <button className="add-button" onClick={openModalCreatTask}>
            + {t('Add task')}
          </button>
        </div>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3>{t('Add task')}</h3>
          <TextField
            label={t('Title')}
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
            autoComplete="off"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required: { value: true, message: t(ERROR_MES.EMPTY) },
              minLength: { value: 5, message: t(ERROR_MES.MIN_LENGHTS_5) },
              maxLength: { value: 100, message: t(ERROR_MES.MAX_LENGHTS_100) },
            })}
          />
          <Button type="submit" variant="contained" disabled={hasErrors || isTaskLoading}>
            {!isTaskLoading ? t('Submit') : <CircularProgress size={24} />}
          </Button>
        </form>
      </Modal>
      <ConfModal onSubmit={handleDeleteColumnId} isOpen={confModal} onCancel={closeConfModal}>
        <h3>{t('Do you really want to delete column?')}</h3>
      </ConfModal>
      <ToastMessage message={taskMessage as TServerMessage} />
    </>
  );
};

export { Column };
