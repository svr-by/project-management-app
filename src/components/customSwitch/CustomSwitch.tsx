import { styled } from '@mui/material/styles';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './customSwitch.scss';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 33,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#e74c3c',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#e74c3c',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 30,
    height: 29,
  },
  '& .MuiSwitch-track': {
    borderRadius: 33 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const CustomSwitch = () => {
  const [lang, setLang] = useState('ru');
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    setLang(lang === 'en' ? 'ru' : 'en');
    i18n.changeLanguage(lang);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked onChange={() => changeLanguage()} />}
        label={'Rus/En'}
      />
    </FormGroup>
  );
};
