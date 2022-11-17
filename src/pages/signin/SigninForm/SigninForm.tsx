import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from 'components/button/Button';

enum ErrorMes {
  empty = 'This field is required',
}

enum InputNames {
  login = 'login',
  password = 'password',
}

interface ISigninForm {
  login: string;
  password: string;
}

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ISigninForm>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: ISigninForm) => {
    console.log('LoginForm submit', data);
  };

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
      <Button type="submit" style="flare" disabled={hasErrors}>
        Sign in
      </Button>
    </form>
  );
};
