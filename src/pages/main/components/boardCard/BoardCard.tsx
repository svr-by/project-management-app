import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { delBoard } from 'redux/slices/boardsSlice';
import { TBoardInfo } from 'core/types/boards';
import { TBoardRes } from 'core/types/server';
import { ConfModal } from 'components';
import { EditBoardModal } from '../EditBoardModal';
import { Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import boardPrev from 'assets/img/board_prev.png';
import './BoardCard.scss';

type TBoardCardProps = {
  board?: TBoardRes;
  empty?: boolean;
  onClick?: () => void;
};

export const BoardCard = (props: TBoardCardProps) => {
  const { board, empty = false, onClick } = props;
  const dispatch = useAppDispatch();
  const [editModal, setEditModal] = useState(false);
  const [confModal, setConfModal] = useState(false);

  if (!empty && board) {
    const boardObj: TBoardInfo = JSON.parse(board.title);

    const openEditModal = (e: MouseEvent) => {
      e.preventDefault();
      setEditModal(true);
    };

    const closeEditModal = () => {
      setEditModal(false);
    };

    const openConfModal = (e: MouseEvent) => {
      e.preventDefault();
      setConfModal(true);
    };

    const closeConfModal = () => {
      setConfModal(false);
    };

    const handleDelete = () => {
      dispatch(delBoard(board._id));
    };
    return (
      <>
        <Link to={board._id} className="board">
          <div className="board__card">
            <h4 className="board__title">{boardObj.title}</h4>
            <img src={boardPrev} className="board__img" />
            <p className="board__desc">{boardObj.description}</p>
            <div className="board__btns">
              <Button
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                size="small"
                color="inherit"
                onClick={openEditModal}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                size="small"
                color="inherit"
                onClick={openConfModal}
              >
                Delete
              </Button>
            </div>
          </div>
        </Link>
        <EditBoardModal isOpen={editModal} board={board} onCancel={closeEditModal} />
        <ConfModal isOpen={confModal} onSubmit={handleDelete} onCancel={closeConfModal}>
          <h3>Do you really want to delete board?</h3>
        </ConfModal>
      </>
    );
  } else if (empty && onClick) {
    return (
      <div className="board board--empty">
        <IconButton
          style={{ width: '100%', height: '100%', borderRadius: '0px' }}
          onClick={onClick}
        >
          <AddBoxOutlinedIcon fontSize="large" color="inherit" />
        </IconButton>
      </div>
    );
  } else {
    return null;
  }
};
