import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useAppDispatch } from 'redux/hooks';
import { RootState } from 'redux/store';

export const MainPage = () => {
  // const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <h1>Main page</h1>;
};
