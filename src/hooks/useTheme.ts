import { useLayoutEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
