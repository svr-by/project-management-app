import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../Task/Task';
import { Modal } from 'components/modal/Modal';
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

interface IFormInput {
  title: string;
  description: string;
}

const Column = (props: TaskProps) => {
  const { boardId, columnId, title } = props;
  const dispatch = useAppDispatch();
  const { data/*, error, isLoaded*/ } = useAppSelector(selectTasksInColumnId);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [valueColumnTitle, setValueColumnTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatTask, setIsCreatTask] = useState(false);
  const [isDeleteColumn, setIsDeleteColumn] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setIsCreatTask(false);
    setIsDeleteColumn(false);
  };
  const openModalCreatTask = () => {
    setIsOpen(true);
    setIsCreatTask(true);
  };
  const openModalDeleteColumn = () => {
    setIsOpen(true);
    setIsDeleteColumn(true);
  };

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

  const handleChangeTitleColumn = async () => {
    if (textAreaRef.current) {
      const newColumn = {
        title: textAreaRef.current.value,
        order: 0,
      };
      setValueColumnTitle(textAreaRef.current.value);
      await dispatch(updateColumnInBoardId({ boardId, columnId, newColumn }));
    }
  };

  const handleDeleteColumnId = async () => {
    handleCancel();
    await dispatch(deleteColumnInBoardId({ boardId, columnId }));
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const newTask: TTaskParams = {
      title: inputsData.title,
      order: 0,
      description: inputsData.description,
      userId: columnId,
      users: [''],
    };

    await dispatch(creatTasksInColumnId({ boardId, columnId, newTask }));
  };

  return (
    <>
      <li className="column">
        <div className="card-task">
          <div className="title-task">
            <textarea
              className="title-input"
              spellCheck="false"
              ref={textAreaRef}
              onBlur={handleChangeTitleColumn}
              onChange={autosize}
              value={valueColumnTitle}
            ></textarea>
            <button className="close-button" onClick={openModalDeleteColumn}></button>
          </div>
          <ul className="tasks-list">
            {data.map((el) => (
                <Task boardId={boardId} columnId={columnId} dataTask={el} />
            ))}
          </ul>
          <button className="add-button" onClick={openModalCreatTask}>
            + Add task
          </button>
        </div>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        {isCreatTask &&
          <div className="details">
            <h4 className="details__header">Creat task</h4>
            <form className="form-box" onSubmit={handleSubmit(onSubmitFn)}>
              <fieldset className="details__title">
                <legend>Task title</legend>
                <div>
                  <input type="text" id="title" value="" {...register('title')} />
                </div>
              </fieldset>
              <fieldset className="details__description">
                <legend>Task description</legend>
                <div>
                  <textarea rows={4} id="description" value="" {...register('description')} />
                </div>
              </fieldset>
              <button className="details__btn-submit" type='submit' onClick={handleCancel}>submit</button>
              <button className="details__btn-cancel" onClick={handleCancel}>cancel</button>
            </form>
          </div>
        }
        {isDeleteColumn &&
          <div className="details">
            <h4 className="details__header">Do you want to delete column?</h4>
            <button className="details__btn-submit" onClick={handleDeleteColumnId}>yes</button>
            <button className="details__btn-cancel" onClick={handleCancel}>no</button>
          </div>
        }
        </Modal>
    </>
  );
};

export { Column };
