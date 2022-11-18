import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from 'components/button/Button';

enum ErrorMes {
  empty = 'This field is required',
  minName = 'Min 4 letters for username',
  minLogin = 'Min 4 letters for login',
  minPass = 'Min  8 letters for password',
  pattern = 'Invalid characters',
}

enum InputNames {
  name = 'name',
  login = 'login',
  password = 'password',
}

interface ISignupForm {
  name: string;
  login: string;
  password: string;
}

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ISignupForm>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: ISignupForm) => {
    console.log('SignupForm submit', data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Name"
        autoComplete="off"
        error={!!errors[InputNames.name]}
        helperText={errors[InputNames.name] ? errors[InputNames.name]?.message : ''}
        {...register(InputNames.name, {
          required: { value: true, message: ErrorMes.empty },
          minLength: { value: 4, message: ErrorMes.minName },
        })}
      />
      <TextField
        label="Login"
        autoComplete="off"
        error={!!errors[InputNames.login]}
        helperText={errors[InputNames.login] ? errors[InputNames.login]?.message : ''}
        {...register(InputNames.login, {
          required: { value: true, message: ErrorMes.empty },
          minLength: { value: 4, message: ErrorMes.minLogin },
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
          minLength: { value: 8, message: ErrorMes.minPass },
        })}
      />
      <Button type="submit" disabled={hasErrors}>
        Sign up
      </Button>
    </form>
  );
};
