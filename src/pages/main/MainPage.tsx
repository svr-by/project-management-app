import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { getBoards } from 'redux/slices/boardsSlice';
import { RootState } from 'redux/store';
import { BoardCard } from './components/boardCard/BoardCard';
import { Spinner, AddBoardModal } from 'components';
import './MainPage.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useSelector((state: RootState) => state.boards);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = () => {
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  return (
    <>
      <h1>Main page</h1>
      <div className="board-list">
        {boards.map((board) => {
          return <BoardCard board={board} key={board._id} />;
        })}
        <BoardCard empty onClick={openModal} />
      </div>
      <AddBoardModal isOpen={addModal} onCancel={closeModal} />
      <Spinner open={isLoading} />
    </>
  );
};
