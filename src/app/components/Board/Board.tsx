import './Board.scss';
import { useEffect } from 'react';
import { Column } from 'app/components/Column/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId } from 'redux/selectors';
import { getColumnsInBoardId, creatColumnInBoardId } from 'redux/slices/columnsSlice';
import { TColParams } from 'core/types/server';

type boardProps = {
  boardId: string;
};

const Board = (props: boardProps) => {
  const { boardId } = props;
  const dispatch = useAppDispatch();
  const { data/*, error, isLoaded*/ } = useAppSelector(selectColumnsInBoardId);

  useEffect(() => {
    dispatch(getColumnsInBoardId(boardId));
  }, [boardId, dispatch]);

  const handleAddColumnId = async () => {
    const newColumn: TColParams = {
      title: 'New Title',
      order: 0,
    };

    dispatch(creatColumnInBoardId({ boardId, newColumn}));
  };

  return (
    <div className="container-tasks">
      <ul className="container-columns">
        {data.map((el) => (
          <Column key={el._id} columnId={el._id} boardId={el.boardId} title={el.title} />
        ))}
      </ul>
      <div className="container-add-button">
        <button className="add-button" onClick={handleAddColumnId}>
          + Add column
        </button>
      </div>
    </div>
  );
};

export { Board };
