import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { addBoard } from 'redux/slices/mainSlice';
import { TBoardParams } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from 'components/button/Button';
import { RootState } from 'redux/store';

enum ErrorMes {
  empty = 'This field is required',
}

enum InputNames {
  title = 'title',
  description = 'description',
}

interface IAddBoardForm {
  title: string;
  description: string;
}

export const AddBoardForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IAddBoardForm>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: IAddBoardForm) => {
    const boardInfo: TBoardInfo = { title: data.title, description: data.description };
    const board: TBoardParams = {
      title: JSON.stringify(boardInfo),
      owner: user.id,
      users: [],
    };
    dispatch(addBoard(board));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Board title"
        autoComplete="off"
        error={!!errors[InputNames.title]}
        helperText={errors[InputNames.title] ? errors[InputNames.title]?.message : ''}
        {...register(InputNames.title, {
          required: { value: true, message: ErrorMes.empty },
          minLength: { value: 5, message: ErrorMes.empty },
        })}
      />
      <TextField
        label="Board description"
        autoComplete="off"
        multiline
        rows={4}
        error={!!errors[InputNames.description]}
        helperText={errors[InputNames.description] ? errors[InputNames.description]?.message : ''}
        {...register(InputNames.description, {
          required: { value: true, message: ErrorMes.empty },
          minLength: { value: 10, message: ErrorMes.empty },
        })}
      />
      <Button type="submit" disabled={hasErrors}>
        Submit
      </Button>
    </form>
  );
};
