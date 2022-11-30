import SunPicture from '../../assets/img/sun-svgrepo-com.svg';
import './changeTheme.scss';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeClick = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <img className="theme-svg" onClick={handleThemeClick} src={SunPicture} alt="Change theme" />
    </>
  );
};
