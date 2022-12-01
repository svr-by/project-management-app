import { useLocalStorage } from 'usehooks-ts';
import { useTheme } from '../../hooks/useTheme';
import { useEffect } from 'react';

import SunPicture from '../../assets/img/sun-svgrepo-com.svg';
import MoonPicture from '../../assets/img/moon-svgrepo-com.svg';
import './changeTheme.scss';

export const ChangeTheme = () => {
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const handleThemeClick = () => {
    if (isDarkTheme) {
      setTheme('light');
      setDarkTheme(false);
    } else {
      setTheme('dark');
      setDarkTheme(true);
    }
  };

  return (
    <>
      <img
        className="theme-svg"
        onClick={handleThemeClick}
        src={isDarkTheme ? SunPicture : MoonPicture}
        alt="Change theme"
      />
    </>
  );
};
