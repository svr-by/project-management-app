import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { delBoard } from 'redux/slices/mainSlice';
import { TBoardInfo } from 'core/types/boards';
import { TBoardRes } from 'core/types/server';
import { Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import boardPrev from 'assets/img/board_prev.png';
import './Board.scss';

type TBoardProps = {
  board?: TBoardRes;
  empty?: boolean;
  onClick?: () => void;
};

export const Board = (props: TBoardProps) => {
  const { board, empty = false, onClick } = props;
  const dispatch = useAppDispatch();

  if (!empty && board) {
    const boardObj: TBoardInfo = JSON.parse(board.title);

    const handleEdit = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDelete = (e: MouseEvent, id: string) => {
      e.preventDefault();
      dispatch(delBoard(id));
    };

    return (
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
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              size="small"
              color="inherit"
              onClick={(e) => handleDelete(e, board._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Link>
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
