import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { addBoard } from 'redux/slices/mainSlice';
import { TBoardParams } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { Modal } from 'components/modal/Modal';
import { RootState } from 'redux/store';
import { BoardForm } from '../BoardForm/BoardForm';

type TAddBoardModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export const AddBoardModal = ({ isOpen, onCancel }: TAddBoardModalProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
      <BoardForm formTitle={t('Add board')} onSubmit={onSubmit} />
    </Modal>
  );
};
