import { useRef, useState } from 'react';
import { Task } from '../Task/Task';

export type ITask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userID: string | null;
};

type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
};

type ColumnProps = {
  dataColumn: IColumn;
};

function Column(props: ColumnProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

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

  return (
    <div className="card-task">
      <div className="title-task">
        <textarea
          className="title-input"
          spellCheck="false"
          ref={textAreaRef}
          onChange={handleChange}
          value={props.dataColumn.title}
        ></textarea>
        <button className="close-button"></button>
      </div>
      <ul className="tasks-list">
        {props.dataColumn.tasks.map((el, ind) => (
          <Task key={ind} dataTask={el} />
        ))}
      </ul>
      <button className="add-button">+ Add task</button>
    </div>
  );
}

export { Column };
