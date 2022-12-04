import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { useForm } from 'react-hook-form';
import { updateColumnInBoardId } from 'redux/slices/columnsSlice';
import { ERROR_MES } from 'core/constants';
import { useTranslation } from 'react-i18next';
import { ConfModal } from 'components';
import { selectColumnsInBoardId } from 'redux/selectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteColumnInBoardId,
  updateOrderedColumnsInBoardId,
  changeColumnsState,
} from 'redux/slices/columnsSlice';

type TTitleProps = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
};

interface IFormInput {
  title: string;
}

const ColumnTitle = (props: TTitleProps) => {
  const { boardId, columnId, title, order } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  const [isEdit, setIsEdit] = useState(false);
  const showInput = () => {
    setIsEdit(true);
  };
  const hideInput = () => {
    setIsEdit(false);
  };

  const handleChangeTitleColumn = async (inputsData: IFormInput) => {
    const newColumn = {
      title: inputsData.title,
      order: order,
    };
    await dispatch(updateColumnInBoardId({ boardId, columnId, newColumn }));
    hideInput();
  };

  const { columns } = useAppSelector(selectColumnsInBoardId);
  const [confModal, setConfModal] = useState(false);
  const openConfModal = () => {
    setConfModal(true);
  };
  const closeConfModal = () => {
    setConfModal(false);
  };

  const handleDeleteColumnId = async () => {
    await dispatch(deleteColumnInBoardId({ boardId, columnId }));

    const newArrColumns = columns
      .filter((el) => el._id !== columnId)
      .sort((column1, column2) => column1.order - column2.order);

    const orderedColumnsInBoard = newArrColumns.map((column, index: number) => ({
      ...column,
      order: index + 1,
    }));

    dispatch(changeColumnsState(orderedColumnsInBoard));

    const columnsOrderList = orderedColumnsInBoard.map((column) => ({
      _id: column._id,
      order: column.order,
    }));

    await dispatch(updateOrderedColumnsInBoardId(columnsOrderList));
  };

  return isEdit ? (
    <form id="form__column-title" onSubmit={handleSubmit(handleChangeTitleColumn)} noValidate>
      <TextField
        defaultValue={title}
        fullWidth
        autoComplete="off"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title', {
          required: { value: true, message: t(ERROR_MES.EMPTY) },
          maxLength: { value: 100, message: t(ERROR_MES.MAX_LENGHTS_100) },
        })}
      />
      <IconButton type="submit" form="form__column-title" disabled={hasErrors}>
        <DoneSharpIcon color="success" />
      </IconButton>
      <IconButton onClick={hideInput}>
        <CloseSharpIcon color="action" />
      </IconButton>
    </form>
  ) : (
    <>
      <div className="title-column-box">
        <h3 className="title-column-h3" onClick={showInput}>
          {title}
        </h3>
        <button className="close-button-column" onClick={openConfModal}></button>
      </div>
      <ConfModal onSubmit={handleDeleteColumnId} isOpen={confModal} onCancel={closeConfModal}>
        <h3 className="modal__title">{t('Do you really want to delete column?')}</h3>
      </ConfModal>
    </>
  );
};

export { ColumnTitle };
