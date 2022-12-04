import './BoardPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal, Spinner, ToastMessage } from 'components';
import { Column } from 'pages/board/components/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId, selectBoards } from 'redux/selectors';
import { getAllTasksInBoardId } from 'redux/slices/tasksSlice';
import {
  getColumnsInBoardId,
  creatColumnInBoardId,
  eraseColumnState,
} from 'redux/slices/columnsSlice';
import { TColParams, TServerMessage } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { TextField, Button, Breadcrumbs, Link, Typography } from '@mui/material';
import { ERROR_MES, PATHS } from 'core/constants';
import { useTranslation } from 'react-i18next';

interface IFormInput {
  title: string;
}

export const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    columns,
    isLoading: isColumnLoading,
    message: columnMessage,
  } = useAppSelector(selectColumnsInBoardId);

  const { boards } = useAppSelector(selectBoards);

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
    if (boardId) {
      dispatch(getColumnsInBoardId(boardId));
      dispatch(getAllTasksInBoardId(boardId));
    }
    return () => {
      dispatch(eraseColumnState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const getBoardTitle = () => {
    const boardTitle = boards.find((board) => board._id === boardId)?.title || '';
    const boardObj: TBoardInfo = JSON.parse(boardTitle);
    return boardObj.title;
  };

  return (
    <>
      <Breadcrumbs>
        <Link underline="hover" to={`/${PATHS.MAIN}`} component={RouterLink}>
          {t('Main')}
        </Link>
        <Typography>{`Board ${getBoardTitle()}`}</Typography>
      </Breadcrumbs>
      <div className="container-tasks">
        <ul className="container-columns">
          {columns.map((el) => (
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
            + {t('Add column')}
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3>Add column</h3>
          <TextField
            label={t('Title')}
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: t(ERROR_MES.EMPTY) },
              minLength: { value: 5, message: t(ERROR_MES.MIN_LENGHTS_5) },
            })}
          />
          <Button type="submit" variant="contained" disabled={hasErrors}>
            {t('Submit')}
          </Button>
        </form>
      </Modal>
      <ToastMessage message={columnMessage as TServerMessage} />
      <Spinner open={isColumnLoading} />
    </>
  );
};
