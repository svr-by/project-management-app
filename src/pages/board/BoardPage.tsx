import './BoardPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal, Spinner, ToastMessage } from 'components';
import { Column } from 'pages/board/components/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId, selectTasksInBoardId, selectBoards } from 'redux/selectors';
import {
  getColumnsInBoardId,
  creatColumnInBoardId,
  updateOrderedColumnsInBoardId,
  eraseColumnState,
  changeColumnsState,
} from 'redux/slices/columnsSlice';
import { updateTasksSet, getAllTasksInBoardId, changeTasksState } from 'redux/slices/tasksSlice';
import { TColParams, TServerMessage } from 'core/types/server';
import { TextField, Button, Breadcrumbs, Link, Typography } from '@mui/material';
import { PATHS } from 'core/constants';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

interface IFormInput {
  title: string;
}

export const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { boards } = useAppSelector(selectBoards);
  const {
    columns,
    isLoading: isColumnLoading,
    message: columnMessage,
  } = useAppSelector(selectColumnsInBoardId);

  const columnsInBoardOrdered = Array.from(columns).sort(
    (column1, column2) => column1.order - column2.order
  );

  const { tasks } = useAppSelector(selectTasksInBoardId);

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

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const orderNum = columns.length;
    const newColumn: TColParams = {
      title: inputsData.title,
      order: orderNum + 1,
    };

    if (boardId) {
      await dispatch(creatColumnInBoardId({ boardId, newColumn }));
    }
    reset();
    handleCancel();
  };

  useEffect(() => {
    if (boardId) {
      dispatch(getColumnsInBoardId(boardId));
      dispatch(getAllTasksInBoardId(boardId));
    }
    return () => {
      dispatch(eraseColumnState());
    };
  }, [boardId, dispatch]);

  const getBoardTitle = () => {
    return boards.find((board) => board._id === boardId)?.title || '';
  };

  const onDragStart = () => {
    (document.activeElement as HTMLElement).blur();
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const columnsInBoard = Array.from(columnsInBoardOrdered);
      const [removed] = columnsInBoard.splice(source.index, 1);
      columnsInBoard.splice(destination.index, 0, removed);
      const newColumnsOrder = columnsInBoard.map((column, index: number) => ({
        ...column,
        order: index + 1,
      }));

      dispatch(changeColumnsState(newColumnsOrder));

      const columnsOrderList = newColumnsOrder.map((column) => ({
        _id: column._id,
        order: column.order,
      }));
      await dispatch(updateOrderedColumnsInBoardId(columnsOrderList));

      return;
    }

    if (type === 'task') {
      const sourceColumn =
        columns[columns.findIndex((column) => column._id === source.droppableId)];

      const destinationColumn =
        columns[columns.findIndex((column) => column._id === destination.droppableId)];

      if (sourceColumn === destinationColumn) {
        const tasksInColumn = tasks
          .filter((el) => el.columnId === sourceColumn._id)
          .sort((task1, task2) => task1.order - task2.order);

        const [removed] = tasksInColumn.splice(source.index, 1);
        tasksInColumn.splice(destination.index, 0, removed);
        const newTasksInColumnSorted = tasksInColumn.map((task, index: number) => ({
          ...task,
          order: index + 1,
        }));

        const newTasks = tasks
          .filter((el) => el.columnId !== sourceColumn._id)
          .concat(newTasksInColumnSorted);

        dispatch(changeTasksState(newTasks));

        const tasksOrderList = newTasksInColumnSorted.map((task) => ({
          _id: task._id,
          order: task.order,
          columnId: task.columnId,
        }));

        await dispatch(updateTasksSet(tasksOrderList));

        return;
      } else {
        const sourceColumnTasks = tasks
          .filter((el) => el.columnId === sourceColumn._id)
          .sort((task1, task2) => task1.order - task2.order);

        const [removed] = sourceColumnTasks.splice(source.index, 1);

        const sourceColumnTasksSorted = sourceColumnTasks.map((task, index) => {
          return { ...task, order: index + 1 };
        });

        const destinationColumnTasks = tasks
          .filter((el) => el.columnId === destinationColumn._id)
          .sort((task1, task2) => task1.order - task2.order);

        destinationColumnTasks.splice(destination.index, 0, removed);

        const destinationColumnTasksSorted = destinationColumnTasks.map((task, index) => {
          return { ...task, order: index + 1, columnId: destinationColumn._id };
        });

        const newTasks = tasks
          .filter((el) => el.columnId !== sourceColumn._id)
          .filter((el) => el.columnId !== destinationColumn._id)
          .concat(sourceColumnTasksSorted)
          .concat(destinationColumnTasksSorted);

        dispatch(changeTasksState(newTasks));

        const sourceTasksOrderList = sourceColumnTasksSorted.map((task) => ({
          _id: task._id,
          order: task.order,
          columnId: sourceColumn._id,
        }));
        if (sourceTasksOrderList.length) await dispatch(updateTasksSet(sourceTasksOrderList));

        const destinationTasksOrderList = destinationColumnTasksSorted.map((task) => ({
          _id: task._id,
          order: task.order,
          columnId: destinationColumn._id,
        }));
        if (destinationTasksOrderList.length)
          await dispatch(updateTasksSet(destinationTasksOrderList));
      }
    }
  };

  return isColumnLoading ? (
    <Spinner />
  ) : (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Breadcrumbs>
        <Link className="breadcrumbs__link" to={PATHS.MAIN} component={RouterLink}>
          {t('Main page')}
        </Link>
        <Typography className="breadcrumbs__board">{getBoardTitle()}</Typography>
      </Breadcrumbs>
      <div className="board-container">
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <ul className="container-columns" ref={provided.innerRef} {...provided.droppableProps}>
              {columnsInBoardOrdered.map((el, index) => {
                return (
                  <Draggable key={el._id} draggableId={el._id} index={index}>
                    {(provided) => {
                      return (
                        <li
                          className="column"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column
                            columnId={el._id}
                            boardId={el.boardId}
                            title={el.title}
                            order={el.order}
                          />
                        </li>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className="container-add-button">
          <button className="add-button" onClick={openModal}>
            + {t('Add column')}
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3 className="modal__title">Add column</h3>
          <TextField
            label={t('Title')}
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: t('This field is required') },
              minLength: { value: 4, message: t('The min length is 4 chars') },
              pattern: { value: /^[a-zа-яё]+$/iu, message: t('Invalid characters') },
            })}
          />
          <Button type="submit" className="form__btn" variant="contained" disabled={hasErrors}>
            {t('Submit')}
          </Button>
        </form>
      </Modal>
      <ToastMessage message={columnMessage as TServerMessage} />
    </DragDropContext>
  );
};
