// import { TBoardInfo } from 'core/types/boards';
import { MouseEvent } from 'react';
import { TBoardRes } from 'core/types/server';
import { Link } from 'react-router-dom';
import boardPrev from 'assets/img/board_prev.png';
import './Board.scss';

type BoardProps = {
  board: TBoardRes;
};

export const Board = ({ board }: BoardProps) => {
  // const boardObj: TBoardInfo = JSON.parse(board);
  const handleEdit = (e: MouseEvent) => {
    e.preventDefault();
    console.log('edit', e);
  };

  const handleRemove = (e: MouseEvent) => {
    e.preventDefault();
    console.log('remove');
  };

  return (
    <Link to={board._id} className="board">
      <div className="board__card">
        <h4 className="board__title">{board.title}</h4>
        <img src={boardPrev} className="board__img" />
        <p className="board__desc">desc</p>
        <div className="board__btns">
          <button className="board__btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="board__btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </Link>
  );
};
