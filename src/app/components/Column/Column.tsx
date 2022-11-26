import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../Task/Task';
import { Modal } from 'components/modal/Modal';
import { ConfModal } from 'components/confModal/СonfModal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTasksInBoardId } from 'redux/selectors';
import { getAllTasksInBoardId, creatTasksInColumnId } from 'redux/slices/tasksSlice';
import { deleteColumnInBoardId, updateColumnInBoardId } from 'redux/slices/columnsSlice';
import { TTaskParams } from 'core/types/server';
import { TextField, Button } from '@mui/material';
import { ERROR_MES } from 'core/constants';

type TaskProps = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
};

interface IFormInput {
  title: string;
  description: string;
}

const Column = (props: TaskProps) => {
  const { boardId, columnId, title, order } = props;
  const dispatch = useAppDispatch();
  const { data /*, error, isLoaded*/ } = useAppSelector(selectTasksInBoardId);
  const tasksInColumnId = data.filter((el) => el.columnId === columnId);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const columnRef = useRef<HTMLLIElement>(null);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();

  const hasErrors = errors && Object.keys(errors).length !== 0;

  const [valueColumnTitle, setValueColumnTitle] = useState(title);

  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const openModalCreatTask = () => {
    setIsOpen(true);
  };

  const [confModal, setConfModal] = useState(false);
  const openConfModal = () => {
    setConfModal(true);
  };

  const closeConfModal = () => {
    setConfModal(false);
  };

  const autosize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  const handleChangeTitleColumn = async () => {
    if (textAreaRef.current) {
      setValueColumnTitle(textAreaRef.current.value);
      const newColumn = {
        title: textAreaRef.current.value,
        order: 0,
      };
      await dispatch(updateColumnInBoardId({ boardId, columnId, newColumn }));
    }
  };

  const handleDeleteColumnId = async () => {
    await dispatch(deleteColumnInBoardId({ boardId, columnId }));
    handleCancel();
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const newTask: TTaskParams = {
      title: inputsData.title,
      order: 0,
      description: inputsData.description,
      userId: '0',
      users: [''],
    };

    await dispatch(creatTasksInColumnId({ boardId, columnId, newTask }));
    reset();
    handleCancel();
  };

  useEffect(() => {
    dispatch(getAllTasksInBoardId(boardId));
  }, [boardId, dispatch]);

  autosize();

  return (
    <>
      <li className="column" ref={columnRef}>
        <div className="card-task">
          <div className="title-task">
            <textarea
              className="title-input"
              spellCheck="false"
              ref={textAreaRef}
              onBlur={handleChangeTitleColumn}
              onChange={autosize}
            >
              {valueColumnTitle}
            </textarea>
            <button className="close-button-column" onClick={openConfModal}></button>
          </div>
          <ul className="tasks-list">
            {tasksInColumnId.map((el) => (
              <Task
                key={el._id}
                boardId={boardId}
                columnId={columnId}
                dataTask={el}
                order={el.order}
              />
            ))}
          </ul>
          <button className="add-button" onClick={openModalCreatTask}>
            + Add task
          </button>
        </div>
      </li>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <form className="form form--modal" onSubmit={handleSubmit(onSubmitFn)} noValidate>
          <h3>Add task</h3>
          <TextField
            label="Title"
            autoComplete="off"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: { value: true, message: ERROR_MES.EMPTY },
              minLength: { value: 5, message: ERROR_MES.MIN_LENGHTS_5 },
            })}
          />
          <TextField
            label="Description"
            autoComplete="off"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              maxLength: { value: 100, message: ERROR_MES.MAX_LENGHTS_100 },
            })}
          />
          <Button type="submit" variant="contained" disabled={hasErrors}>
            Submit
          </Button>
        </form>
      </Modal>
      <ConfModal onSubmit={handleDeleteColumnId} isOpen={confModal} onCancel={closeConfModal}>
        <h3>Do you really want to delete column?</h3>
      </ConfModal>
    </>
  );
};

export { Column };
