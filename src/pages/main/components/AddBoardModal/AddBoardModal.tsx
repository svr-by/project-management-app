import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { addBoard } from 'redux/slices/mainSlice';
import { TBoardParams } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { Modal, BoardForm } from 'components';
import { RootState } from 'redux/store';

type TAddBoardModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export const AddBoardModal = ({ isOpen, onCancel }: TAddBoardModalProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = (data: TBoardInfo) => {
    const boardInfo: TBoardInfo = { title: data.title, description: data.description };
    const board: TBoardParams = {
      title: JSON.stringify(boardInfo),
      owner: user.id,
      users: [],
    };
    dispatch(addBoard(board));
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <BoardForm formTitle="Add board" onSubmit={onSubmit} />
    </Modal>
  );
};
