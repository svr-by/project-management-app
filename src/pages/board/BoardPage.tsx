import './BoardPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal, Spinner } from 'components';
import { Column } from 'pages/board/components/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId, selectTasksInBoardId } from 'redux/selectors';
import { getColumnsInBoardId, creatColumnInBoardId } from 'redux/slices/columnsSlice';
import { TColParams } from 'core/types/server';
import { TextField, Button } from '@mui/material';
import { ERROR_MES } from 'core/constants';

interface IFormInput {
  title: string;
}

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading: isColumnLoading } = useAppSelector(selectColumnsInBoardId);
  const { isLoading: isTaskLoading } = useAppSelector(selectTasksInBoardId);

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
    const newColumn: TColParams = {
      title: inputsData.title,
      order: 0,
    };

    if (boardId) {
      await dispatch(creatColumnInBoardId({ boardId, newColumn }));
    }
    reset();
    handleCancel();
  };

  useEffect(() => {
    if (boardId) dispatch(getColumnsInBoardId(boardId));
  }, [boardId, dispatch]);

  return (
    <>
      <div className="container-tasks">
        <ul className="container-columns">
          {data.map((el) => (
            <Column
              key={el._id}
              columnId={el._id}
              boardId={el.boardId}
              title={el.title}
              order={el.order}
            />
          ))}
        </ul>
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
    </>
  );
};

export { BoardPage };
