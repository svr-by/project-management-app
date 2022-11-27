import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'redux/hooks';
import { updateColumnInBoardId } from 'redux/slices/columnsSlice';
import { ERROR_MES } from 'core/constants';

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

  const {
    register,
    formState: { errors, isSubmitSuccessful },
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

  return isEdit ? (
    <form id="form__column-title" onSubmit={handleSubmit(handleChangeTitleColumn)} noValidate>
      <TextField
        defaultValue={title}
        fullWidth
        autoComplete="off"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title', {
          required: { value: true, message: ERROR_MES.EMPTY },
          maxLength: { value: 100, message: ERROR_MES.MAX_LENGHTS_100 },
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
    <h3 className="title-column-h3" onClick={showInput}>
      {title}
    </h3>
  );
};

export { ColumnTitle };
