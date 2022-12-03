import { useTheme } from '../../hooks/useTheme';

import SunPicture from '../../assets/img/sun-svgrepo-com.svg';
import MoonPicture from '../../assets/img/moon-svgrepo-com.svg';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const { chosenTheme, setChosenTheme } = useTheme();

  const handleThemeClick = () => {
    if (chosenTheme === 'dark') {
      setChosenTheme('light');
    } else {
      setChosenTheme('dark');
    }
  };

  return (
    <img
      className="theme-svg"
      onClick={handleThemeClick}
      src={chosenTheme === 'dark' ? SunPicture : MoonPicture}
      alt="Change theme"
    />
  );
};
