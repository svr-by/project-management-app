import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/selectors';
import { TSignInParams } from 'core/types/server';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { isLoading } = useSelector(selectUser);
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

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label={t('Login')}
        autoComplete="off"
        error={!!errors[InputNames.login]}
        helperText={errors[InputNames.login] ? errors[InputNames.login]?.message : ''}
        {...register(InputNames.login, {
          required: { value: true, message: t('This field is required') },
        })}
      />
      <TextField
        label={t('Password')}
        type="password"
        autoComplete="off"
        error={!!errors[InputNames.password]}
        helperText={errors[InputNames.password] ? errors[InputNames.password]?.message : ''}
        {...register(InputNames.password, {
          required: { value: true, message: t('This field is required') },
        })}
      />
      <Button
        type="submit"
        className="form__btn"
        variant="contained"
        disabled={hasErrors || isLoading}
      >
        {!isLoading ? t('sign in') : <CircularProgress size={24} />}
      </Button>
    </form>
  );
};
