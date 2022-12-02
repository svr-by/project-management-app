import { useLayoutEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useTheme = () => {
  const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [chosenTheme, setChosenTheme] = useLocalStorage('theme', userTheme);

  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useLayoutEffect(() => {
    setTheme(chosenTheme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [chosenTheme]);

  return { theme, setChosenTheme };
};
