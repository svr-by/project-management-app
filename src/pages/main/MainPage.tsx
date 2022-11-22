import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { getBoards } from 'redux/slices/mainSlice';
import { RootState } from 'redux/store';
import { Modal } from 'components/modal/Modal';
import { AddBoardForm } from './AddBoardForm/AddBoardForm';
import { Board } from './Board/Board';
import './MainPage.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const boards = useSelector((state: RootState) => state.main.boards);
  const [addBoardModal, setAddBoardModal] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  const openModal = () => {
    setAddBoardModal(true);
  };

  const closeModal = () => {
    setAddBoardModal(false);
  };

  return (
    <>
      <h1>Main page</h1>
      <div className="board-list">
        {boards.map((board) => {
          return <Board board={board} key={board._id} />;
        })}
        <Board empty onClick={openModal} />
      </div>
      <Modal isOpen={addBoardModal} onCancel={closeModal}>
        <AddBoardForm onCancel={closeModal} />
      </Modal>
    </>
  );
};
