import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { udateBoard } from 'redux/slices/mainSlice';
import { TBoardParams, TBoardRes } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { Modal } from 'components/modal/Modal';
import { RootState } from 'redux/store';
import { BoardForm } from '../BoardForm/BoardForm';

type TEditBoardModalProps = {
  board: TBoardRes;
  isOpen: boolean;
  onCancel: () => void;
};

export const EditBoardModal = ({ isOpen, onCancel, board }: TEditBoardModalProps) => {
  const boardObj: TBoardInfo = JSON.parse(board.title);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = (data: TBoardInfo) => {
    const boardInfo: TBoardInfo = { title: data.title, description: data.description };
    const editedBoard: TBoardParams = {
      title: JSON.stringify(boardInfo),
      owner: user.id,
      users: [],
    };
    dispatch(udateBoard({ id: board._id, board: editedBoard }));
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <BoardForm
        formTitle={t('Edit board')}
        defaultTitle={boardObj.title}
        defaultDesc={boardObj.description}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
