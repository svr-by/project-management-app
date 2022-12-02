import { useTheme } from '../../hooks/useTheme';

import SunPicture from '../../assets/img/sun-svgrepo-com.svg';
import MoonPicture from '../../assets/img/moon-svgrepo-com.svg';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const { theme, setChosenTheme } = useTheme();

  const handleThemeClick = () => {
    if (theme === 'dark') {
      setChosenTheme('light');
    } else {
      setChosenTheme('dark');
    }
  };

  return (
    <img
      className="theme-svg"
      onClick={handleThemeClick}
      src={theme !== 'dark' ? SunPicture : MoonPicture}
      alt="Change theme"
    />
  );
};
