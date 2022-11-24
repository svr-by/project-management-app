import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { getBoards } from 'redux/slices/mainSlice';
import { RootState } from 'redux/store';
import { Board } from './components/Board/Board';
import { AddBoardModal } from './components/AddBoardModal/AddBoardModal';
import './MainPage.scss';
import { useTranslation } from 'react-i18next';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const boards = useSelector((state: RootState) => state.main.boards);
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
      <h1>{t('Main page')}</h1>
      <div className="board-list">
        {boards.map((board) => {
          return <Board board={board} key={board._id} />;
        })}
        <Board empty onClick={openModal} />
      </div>
      <AddBoardModal isOpen={addModal} onCancel={closeModal} />
    </>
  );
};
