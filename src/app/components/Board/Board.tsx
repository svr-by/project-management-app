import './Board.scss';
import { useEffect } from 'react';
import { Column } from 'app/components/Column/Column';
import { useAppDispatch, useAppSelector, selectColumnsInBoardId } from 'redux/hooks';
import { getColumnsInBoardId } from 'redux/slices/columnsSlice';
import { TColParams } from 'core/types/server';
import { createColumn } from 'api/services/columnsService';

type boardProps = {
  boardId: string;
};

const Board = (props: boardProps) => {
  const dispatch = useAppDispatch();
  const { data /*error, isLoaded*/ } = useAppSelector(selectColumnsInBoardId);

  useEffect(() => {
    dispatch(getColumnsInBoardId(props.boardId));
  }, [props.boardId, dispatch]);

  const handleAddColumnId = async () => {
    const newColumn: TColParams = {
      title: 'New Title',
      order: 0,
    };

    await createColumn(props.boardId, newColumn);

    dispatch(getColumnsInBoardId(props.boardId));
  };

  return (
    <div className="container-tasks">
      <ul className="container-columns">
        {data.map((el) => (
          <li className="column" key={el._id}>
            <Column columnId={el._id} boardId={el.boardId} title={el.title} />
          </li>
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
