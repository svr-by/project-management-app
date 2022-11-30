import './BoardPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal, Spinner } from 'components';
import { Column } from 'pages/board/components/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId, selectTasksInBoardId } from 'redux/selectors';
import { getColumnsInBoardId, creatColumnInBoardId, updateOrderedColumnsInBoardId } from 'redux/slices/columnsSlice';
import { TColParams, TColRes } from 'core/types/server';
import { TextField, Button } from '@mui/material';
import { ERROR_MES } from 'core/constants';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface IFormInput {
  title: string;
}

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading: isColumnLoading } = useAppSelector(selectColumnsInBoardId);
  const { isLoading: isTaskLoading } = useAppSelector(selectTasksInBoardId);
  const [columns, setColumns] = useState<TColRes[]>(data);

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

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type, mode } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    
    if (type === "column") {
      let newColumnsOrder: TColRes[] = Array.from(columns);
      const [removed] = newColumnsOrder.splice(source.index, 1);
      newColumnsOrder.splice(destination.index, 0, removed);
      newColumnsOrder = newColumnsOrder.map((column, index: number) => ({
        ...column,
        order: index + 1,
      }));
      setColumns(newColumnsOrder);
      const columnsOrderList = columns.map((column, index: number) => ({
        _id: column._id,
        order: column.order,
      }));

      await dispatch(updateOrderedColumnsInBoardId(columnsOrderList));

      return;
    }


  };

  useEffect(() => {
    if (boardId) dispatch(getColumnsInBoardId(boardId));
  }, [boardId, dispatch]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided, snapshot) => (
            <ul className="container-columns" ref={provided.innerRef} {...provided.droppableProps}>
              {columns.map((el, index) => {
                return (
                  <Draggable
                    key={el._id}
                    draggableId={el._id}
                    index={index}
                    // disableInteractiveElementBlocking={isInteractiveElementsDisabled}
                  >
                    {(provided, snapshot) => {
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
            + Add column
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3>Add column</h3>
          <TextField
            label="Title"
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: ERROR_MES.EMPTY },
              minLength: { value: 5, message: ERROR_MES.MIN_LENGHTS_5 },
            })}
          />
          <Button type="submit" variant="contained" disabled={hasErrors}>
            Submit
          </Button>
        </form>
      </Modal>
      <Spinner open={isColumnLoading || isTaskLoading} />
    </DragDropContext>
  );
};

export { BoardPage };
