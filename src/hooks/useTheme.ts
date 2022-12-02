import { useLayoutEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useTheme = () => {
  const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [chosenTheme, setChosenTheme] = useLocalStorage('theme', userTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', chosenTheme);
  }, [chosenTheme]);

  return { chosenTheme, setChosenTheme };
};
