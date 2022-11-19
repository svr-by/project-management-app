import { useRef, useState, useEffect } from 'react';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTasksInColumnId } from 'redux/selectors';
import { getTasksInColumnId, creatTasksInColumnId } from 'redux/slices/tasksSlice';
import { deleteColumnInBoardId } from 'redux/slices/columnsSlice';
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
      autosize();
      setValue(textAreaRef.current.value);
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
