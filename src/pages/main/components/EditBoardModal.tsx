import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { updateBoard } from 'redux/slices/boardsSlice';
import { RootState } from 'redux/store';
import { TBoardParams, TBoardRes } from 'core/types/server';
import { TBoardInfo } from 'core/types/boards';
import { Modal, BoardForm } from 'components';

type TEditBoardModalProps = {
  board: TBoardRes;
  isOpen: boolean;
  onCancel: () => void;
};

export const EditBoardModal = ({ isOpen, onCancel, board }: TEditBoardModalProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = ({ title, description }: TBoardInfo) => {
    if (board.title !== title || board.description !== description) {
      const editedBoard: TBoardParams = {
        title,
        description,
        owner: user.id,
        users: [],
      };
      dispatch(updateBoard({ id: board._id, board: editedBoard }));
    }
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <BoardForm
        formTitle={t('Edit board')}
        defaultTitle={board.title}
        defaultDesc={board.description}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
