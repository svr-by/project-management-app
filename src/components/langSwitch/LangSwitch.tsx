import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';
import './LangSwitch.scss';

const CustomSwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'RU'",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#e84419',
    width: 32,
    height: 32,
    '&:before': {
      content: "'EN'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 5,
      top: 5,
      color: '#fff',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const LangSwitch = () => {
  const [lang, setLang] = useLocalStorage<'en' | 'ru'>('language', 'en');
  const { i18n } = useTranslation(lang);

  const changeLanguage = () => {
    setLang(lang === 'en' ? 'ru' : 'en');
    i18n.changeLanguage(lang);
  };

  return <CustomSwitch sx={{ m: 1 }} checked={lang === 'en'} onChange={() => changeLanguage()} />;
};
