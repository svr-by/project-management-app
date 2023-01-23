import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TBoardInfo } from 'core/types/boards';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

enum InputNames {
  title = 'title',
  description = 'description',
}

interface IAddBoardForm {
  title: string;
  description: string;
}

type TBoardFormProps = {
  formTitle: string;
  defaultTitle?: string;
  defaultDesc?: string;
  onSubmit: (data: TBoardInfo) => void;
};

export const BoardForm = (props: TBoardFormProps) => {
  const { formTitle, defaultTitle, defaultDesc, onSubmit } = props;
  const { t } = useTranslation();

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

  const onSubmitForm = (data: IAddBoardForm) => {
    onSubmit(data);
  };

  return (
    <form className="form form--modal" onSubmit={handleSubmit(onSubmitForm)} noValidate>
      <h3 className="modal__title">{formTitle}</h3>
      <TextField
        label={t('Title')}
        defaultValue={defaultTitle}
        autoComplete="off"
        error={!!errors[InputNames.title]}
        helperText={errors[InputNames.title]?.message}
        {...register(InputNames.title, {
          required: { value: true, message: t('This field is required') },
          minLength: { value: 3, message: t('The min length is 3 chars') },
          pattern: { value: /^[a-zа-яё]+$/iu, message: t('Invalid characters') },
        })}
      />
      <TextField
        label={t('Description')}
        defaultValue={defaultDesc}
        autoComplete="off"
        error={!!errors[InputNames.description]}
        helperText={errors[InputNames.description]?.message}
        multiline
        minRows={4}
        maxRows={4}
        {...register(InputNames.description, {
          required: { value: true, message: t('This field is required') },
          maxLength: { value: 100, message: t('The max length is 100 chars') },
        })}
      />
      <Button type="submit" className="form__btn" variant="contained" disabled={hasErrors}>
        {t('Submit')}
      </Button>
    </form>
  );
};
