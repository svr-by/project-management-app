import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TSignInParams } from 'core/types/server';
import { TextField, Button } from '@mui/material';

enum ErrorMes {
  empty = 'This field is required',
}

enum InputNames {
  login = 'login',
  password = 'password',
}

interface ISignInForm {
  login: string;
  password: string;
}

type TSignInFormProps = {
  onSubmit: (user: TSignInParams) => void;
};

export const SignInForm = ({ onSubmit }: TSignInFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ISignInForm>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Login"
        autoComplete="off"
        error={!!errors[InputNames.login]}
        helperText={errors[InputNames.login] ? errors[InputNames.login]?.message : ''}
        {...register(InputNames.login, {
          required: { value: true, message: ErrorMes.empty },
        })}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="off"
        error={!!errors[InputNames.password]}
        helperText={errors[InputNames.password] ? errors[InputNames.password]?.message : ''}
        {...register(InputNames.password, {
          required: { value: true, message: ErrorMes.empty },
        })}
      />
      <Button type="submit" className="form__btn" variant="contained" disabled={hasErrors}>
        Sign in
      </Button>
    </form>
  );
};
