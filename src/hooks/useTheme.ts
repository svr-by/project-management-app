import { useLayoutEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useTheme = (userTheme: 'dark' | 'light') => {
  const [chosenTheme, setChosenTheme] = useLocalStorage('theme', userTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', chosenTheme);
  }, [chosenTheme]);

  return { chosenTheme, setChosenTheme };
};
