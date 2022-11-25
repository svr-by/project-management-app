import './Board.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'components/modal/Modal';
import { Column } from 'app/components/Column/Column';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectColumnsInBoardId } from 'redux/selectors';
import { getColumnsInBoardId, creatColumnInBoardId } from 'redux/slices/columnsSlice';
import { TColParams } from 'core/types/server';

interface IFormInput {
  title: string;
}

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { data /*, error, isLoaded*/ } = useAppSelector(selectColumnsInBoardId);

  const {
    register,
    // formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmitFn = async (inputsData: IFormInput) => {
    const newColumn: TColParams = {
      title: inputsData.title,
      order: 0,
    };

    if (boardId) {
      await dispatch(creatColumnInBoardId({ boardId, newColumn }));
    }
    reset();
    handleCancel();
  };

  useEffect(() => {
    if (boardId) dispatch(getColumnsInBoardId(boardId));
  }, [boardId, dispatch]);

  return (
    <>
      <div className="container-tasks">
        <ul className="container-columns">
          {data.map((el) => (
            <Column key={el._id} columnId={el._id} boardId={el.boardId} title={el.title} />
          ))}
        </ul>
        <div className="container-add-button">
          <button className="add-button" onClick={openModal}>
            + Add column
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onCancel={handleCancel}>
        <div className="details">
          <h4 className="details__header">Creat column</h4>
          <form className="form-box" onSubmit={handleSubmit(onSubmitFn)}>
            <fieldset className="details__title">
              <legend>Column title</legend>
              <div>
                <input type="text" id="title" {...register('title')} />
              </div>
            </fieldset>
            <button className="details__btn-submit" type="submit">
              submit
            </button>
            <button className="details__btn-cancel" onClick={handleCancel}>
              cancel
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export { Board };
