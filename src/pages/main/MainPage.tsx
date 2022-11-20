import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { getBoards } from 'redux/slices/mainSlice';
import { RootState } from 'redux/store';
import { AddBoardForm } from './AddBoardForm/AddBoardForm';
import { TBoardInfo } from 'core/types/boards';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const boards = useSelector((state: RootState) => state.main.boards);

  useEffect(() => {
    dispatch(getBoards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  return (
    <>
      <h1>Main page</h1>
      <ul>
        {boards.map((board) => {
          // const boardObj: TBoardInfo = JSON.parse(board.title);
          return (
            <li key={board._id}>
              {board.title}
              {/* <h1>{boardObj.title}</h1>
              <p>{boardObj.description}</p> */}
            </li>
          );
        })}
      </ul>
      <AddBoardForm />
    </>
  );
};
