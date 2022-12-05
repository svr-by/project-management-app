import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from './Task';
import { ColumnTitle } from 'pages/board/components/ColumnTitle';
import { Modal, ToastMessage } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId, selectTasksInBoardId, selectUser } from 'redux/selectors';
import { creatTasksInColumnId } from 'redux/slices/tasksSlice';
import { TTaskParams, TServerMessage } from 'core/types/server';
import { useTranslation } from 'react-i18next';
import { TextField, Button, CircularProgress } from '@mui/material';
import { ERROR_MES } from 'core/constants';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
  const { columns } = useAppSelector(selectColumnsInBoardId);
  const { id: userId } = useAppSelector(selectUser);

  const {
    tasks,
    isLoading: isTaskLoading,
    message: taskMessage,
  } = useAppSelector(selectTasksInBoardId);

  const tasksInColumnId = tasks.filter((task) => task.columnId === columnId);

  const orderedTasks = tasksInColumnId.sort((task1, task2) => {
    return task1.order - task2.order;
  });

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

  const onSubmitFn = async (inputsData: IFormInput) => {
    const orderNum = orderedTasks.length;
    const newTask: TTaskParams = {
      title: inputsData.title,
      order: orderNum + 1,
      description: inputsData.description,
      userId: userId,
      users: [''],
    };

    await dispatch(creatTasksInColumnId({ boardId, columnId, newTask }));
    reset();
    handleCancel();
  };

  return (
    <>
      <div className="card-column">
        <ColumnTitle boardId={boardId} columnId={columnId} title={title} order={order} />
        <Droppable droppableId={columnId} type="task">
          {(provided) => (
            <ul className="tasks-list" ref={provided.innerRef} {...provided.droppableProps}>
              {orderedTasks.map((el, index) => {
                return (
                  <Draggable key={el._id} draggableId={el._id} index={index}>
                    {(provided) => (
                      <li
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          boardId={boardId}
                          columnId={columnId}
                          dataTask={el}
                          order={el.order}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <button className="add-button" onClick={openModalCreatTask}>
          + {t('Add task')}
        </button>
      </div>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3 className="modal__title">{t('Add task')}</h3>
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
          <Button
            type="submit"
            className="form__btn"
            variant="contained"
            disabled={hasErrors || isTaskLoading}
          >
            {!isTaskLoading ? t('Submit') : <CircularProgress size={24} />}
          </Button>
        </form>
      </Modal>
      <ToastMessage message={taskMessage as TServerMessage} />
    </>
  );
};

export { Column };
