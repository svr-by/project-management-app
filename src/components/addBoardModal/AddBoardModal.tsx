import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { RootState } from 'redux/store';
import { addBoard } from 'redux/slices/mainSlice';
import { TBoardParams } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { PATHS } from 'core/constants';
import { Modal, BoardForm } from 'components';

type TAddBoardModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export const AddBoardModal = ({ isOpen, onCancel }: TAddBoardModalProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data: TBoardInfo) => {
    const boardInfo: TBoardInfo = { title: data.title, description: data.description };
    const board: TBoardParams = {
      title: JSON.stringify(boardInfo),
      owner: user.id,
      users: [],
    };
    dispatch(addBoard(board));
    onCancel();
    if (location.pathname !== `/${PATHS.MAIN}`) {
      navigate(PATHS.MAIN);
    }
  };

  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <BoardForm formTitle="Add board" onSubmit={onSubmit} />
    </Modal>
  );
};
