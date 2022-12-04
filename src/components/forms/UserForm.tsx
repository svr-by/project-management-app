import { useEffect } from 'react';
import { TUserPrams } from 'core/types/server';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

enum ErrorMes {
  empty = 'This field is required',
  minName = 'Min 4 letters for username',
  minLogin = 'Min 4 letters for login',
  minPass = 'Min 8 letters for password',
  pattern = 'Invalid characters',
}

enum InputNames {
  name = 'name',
  login = 'login',
  password = 'password',
}

interface IUserForm {
  name: string;
  login: string;
  password: string;
}
type TUserFormProps = {
  submitBtn: 'Update profile' | 'Sign up';
  onSubmit: (user: TUserPrams) => void;
  onDelete?: () => void;
  defaultName?: string;
  defaultLogin?: string;
};

export const UserForm = (props: TUserFormProps) => {
  const { t } = useTranslation();
  const { submitBtn, onSubmit, onDelete, defaultName, defaultLogin } = props;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IUserForm>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  useEffect(() => {
    if (defaultName && defaultLogin) {
      setValue('name', defaultName);
      setValue('login', defaultLogin);
    }
  }, [setValue, defaultName, defaultLogin]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label={t('Name')}
        autoComplete="off"
        error={!!errors[InputNames.name]}
        helperText={errors[InputNames.name] ? errors[InputNames.name]?.message : ''}
        {...register(InputNames.name, {
          required: { value: true, message: t(ErrorMes.empty) },
          minLength: { value: 4, message: t(ErrorMes.minName) },
        })}
      />
      <TextField
        label={t('Login')}
        autoComplete="off"
        error={!!errors[InputNames.login]}
        helperText={errors[InputNames.login] ? errors[InputNames.login]?.message : ''}
        {...register(InputNames.login, {
          required: { value: true, message: t(ErrorMes.empty) },
          minLength: { value: 4, message: t(ErrorMes.minLogin) },
        })}
      />
      <TextField
        label={submitBtn === 'Update profile' ? t('New password') : t('Password')}
        type="password"
        autoComplete="off"
        error={!!errors[InputNames.password]}
        helperText={errors[InputNames.password] ? errors[InputNames.password]?.message : ''}
        {...register(InputNames.password, {
          required: { value: true, message: t(ErrorMes.empty) },
          minLength: { value: 8, message: t(ErrorMes.minPass) },
        })}
      />
      <div className="form__btns">
        <Button type="submit" className="form__btn" variant="contained" disabled={hasErrors}>
          {t(submitBtn)}
        </Button>
        {onDelete && (
          <Button color="error" variant="outlined" onClick={onDelete}>
            {t('Delete profile')}
          </Button>
        )}
      </div>
    </form>
  );
};
