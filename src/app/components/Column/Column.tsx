import { useRef, useState, useEffect } from 'react';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector, selectTasksInColumnId } from 'redux/hooks';
import { getTasksInColumnId } from 'redux/slices/tasksSlice';
import { getColumnsInBoardId } from 'redux/slices/columnsSlice';
import { deleteColumnById } from 'api/services/columnsService';
import { createTask } from 'api/services/tasksService';
import { TTaskParams } from 'core/types/server';

type TaskProps = {
  boardId: string;
  columnId: string;
  title: string;
};

const Column = (props: TaskProps) => {
  const { boardId, columnId, title } = props;
  const dispatch = useAppDispatch();
  const { data /*error, isLoaded*/ } = useAppSelector(selectTasksInColumnId);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(title);

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
      setValue(textAreaRef.current.value);
      autosize();
    }
  };

  const handleDeleteColumnId = async () => {
    await deleteColumnById(boardId, columnId);

    dispatch(getColumnsInBoardId(boardId));
  };

  const handleAddTaskId = async () => {
    const newTask: TTaskParams = {
      title: '',
      order: 0,
      description: '',
      userId: '',
      users: [''],
    };

    await createTask(boardId, columnId, newTask);

    dispatch(getTasksInColumnId({ boardId, columnId }));
  };

  return (
    <div className="card-task">
      <div className="title-task">
        <textarea
          className="title-input"
          spellCheck="false"
          ref={textAreaRef}
          onChange={handleChange}
          value={value}
        ></textarea>
        <button className="close-button" onClick={handleDeleteColumnId}></button>
      </div>
      <ul className="tasks-list">
        {data.map((el) => (
          <Task key={el._id} boardId={boardId} columnId={columnId} dataTask={el} />
        ))}
      </ul>
      <button className="add-button" onClick={handleAddTaskId}>
        + Add task
      </button>
    </div>
  );
};

export { Column };
