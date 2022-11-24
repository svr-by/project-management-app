import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TBoardInfo } from 'core/types/boards';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ERROR_MES } from 'core/constants';

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
      <h3>{formTitle}</h3>
      <TextField
        label={t('Title')}
        defaultValue={defaultTitle}
        autoComplete="off"
        error={!!errors[InputNames.title]}
        helperText={errors[InputNames.title]?.message}
        {...register(InputNames.title, {
          required: { value: true, message: ERROR_MES.EMPTY },
          minLength: { value: 5, message: ERROR_MES.MIN_LENGHTS_5 },
        })}
      />
      <TextField
        label={t('Description')}
        defaultValue={defaultDesc}
        autoComplete="off"
        error={!!errors[InputNames.description]}
        helperText={errors[InputNames.description]?.message}
        {...register(InputNames.description, {
          maxLength: { value: 100, message: ERROR_MES.MAX_LENGHTS_100 },
        })}
      />
      <Button type="submit" variant="contained" disabled={hasErrors}>
        {t('Submit')}
      </Button>
    </form>
  );
};
