import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { singIn } from 'redux/slices/userSlice';
import { TSignInParams } from 'core/types/server';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from 'components/button/Button';
import { useTranslation } from 'react-i18next';

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

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  const onSubmit = (data: TSignInParams) => {
    dispatch(singIn(data));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label={t('Login')}
        autoComplete="off"
        error={!!errors[InputNames.login]}
        helperText={errors[InputNames.login] ? errors[InputNames.login]?.message : ''}
        {...register(InputNames.login, {
          required: { value: true, message: ErrorMes.empty },
        })}
      />
      <TextField
        label={t('Password')}
        type="password"
        autoComplete="off"
        error={!!errors[InputNames.password]}
        helperText={errors[InputNames.password] ? errors[InputNames.password]?.message : ''}
        {...register(InputNames.password, {
          required: { value: true, message: ErrorMes.empty },
        })}
      />
      <Button type="submit" disabled={hasErrors}>
        {t('sign in')}
      </Button>
    </form>
  );
};
