import { useRef, useState, useEffect } from 'react';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTasksInColumnId } from 'redux/selectors';
import { getTasksInColumnId, creatTasksInColumnId } from 'redux/slices/tasksSlice';
import { deleteColumnInBoardId, updateColumnInBoardId } from 'redux/slices/columnsSlice';
import { TTaskParams } from 'core/types/server';

type TaskProps = {
  boardId: string;
  columnId: string;
  title: string;
};

const Column = (props: TaskProps) => {
  const { boardId, columnId, title } = props;
  const dispatch = useAppDispatch();
  const { data/*, error, isLoaded*/ } = useAppSelector(selectTasksInColumnId);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(title);

  // const tasksInColumnId = data.filter((el) => el._id === columnId); //! если тащить общие таски

  useEffect(() => {
    dispatch(getTasksInColumnId({ boardId, columnId }));
  }, [boardId, columnId, dispatch]);

  const autosize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  const handleChange = () => {
    if (textAreaRef.current) {
      const newColumn = {
        title: textAreaRef.current.value,
        order: 0,
      };
      setValue(textAreaRef.current.value);
      dispatch(updateColumnInBoardId({ boardId, columnId, newColumn }));
    }
  };

  const handleDeleteColumnId = async () => {
    dispatch(deleteColumnInBoardId({boardId, columnId}));
  };

  const handleAddTaskId = async () => {
    const newTask: TTaskParams = {
      title: '',
      order: 0,
      description: '',
      userId: '',
      users: [''],
    };

    dispatch(creatTasksInColumnId({boardId, columnId, newTask}));
  };

  return (
    <li className="column">
      <div className="card-task">
        <div className="title-task">
          <textarea
            className="title-input"
            spellCheck="false"
            ref={textAreaRef}
            onBlur={handleChange}
            onChange={autosize}
            value={value}
          ></textarea>
          <button className="close-button" onClick={handleDeleteColumnId}></button>
        </div>
        <ul className="tasks-list">
          {data.map((el) => (
              <Task boardId={boardId} columnId={columnId} dataTask={el} />
          ))}
        </ul>
        <button className="add-button" onClick={handleAddTaskId}>
          + Add task
        </button>
      </div>
    </li>
  );
};

export { Column };
