import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { udateBoard } from 'redux/slices/mainSlice';
import { TBoardParams, TBoardRes } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RootState } from 'redux/store';

enum ErrorMes {
  empty = 'This field is required',
  maxLength = 'The max length is 100 chars',
}

enum InputNames {
  title = 'title',
  description = 'description',
}

interface IAddBoardForm {
  title: string;
  description: string;
}

type TComponentProps = {
  board: TBoardRes;
  onCancel: () => void;
};

export const EditBoardForm = ({ onCancel, board }: TComponentProps) => {
  const boardObj: TBoardInfo = JSON.parse(board.title);

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
    const editedBoard: TBoardParams = {
      title: JSON.stringify(boardInfo),
      owner: user.id,
      users: [],
    };
    dispatch(udateBoard({ id: board._id, board: editedBoard }));
    onCancel();
  };

  return (
    <form className="form form--modal" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>Create board</h3>
      <TextField
        label="Title"
        defaultValue={boardObj.title}
        autoComplete="off"
        error={!!errors[InputNames.title]}
        helperText={errors[InputNames.title]?.message}
        {...register(InputNames.title, {
          required: { value: true, message: ErrorMes.empty },
          minLength: { value: 5, message: ErrorMes.empty },
        })}
      />
      <TextField
        label="Description"
        defaultValue={boardObj.description}
        autoComplete="off"
        // multiline
        // minRows={4}
        error={!!errors[InputNames.description]}
        helperText={errors[InputNames.description]?.message}
        {...register(InputNames.description, {
          maxLength: { value: 100, message: ErrorMes.maxLength },
        })}
      />
      <Button type="submit" variant="contained" disabled={hasErrors}>
        Submit
      </Button>
    </form>
  );
};
