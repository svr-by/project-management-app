import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { RootState } from 'redux/store';
import { updateUser, deleteUser, eraseErr } from 'redux/slices/userSlice';
import { TUserPrams } from 'core/types/server';
import { TServerMessage } from 'core/types/server';
import { UserForm, ConfModal, Spinner, ToastMessage } from 'components';
import './UserProfilePage.scss';

export const UserProfilePage = () => {
  const { name, login, id, isLoading, message } = useSelector((state: RootState) => state.user);
  const [confModal, setConfModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(eraseErr());
    };
  }, [dispatch]);

  const onSubmit = (updatedUser: TUserPrams) => {
    dispatch(updateUser({ id, user: updatedUser }));
  };

  const onDelete = () => {
    dispatch(deleteUser(id));
  };

  const openConfModal = () => {
    setConfModal(true);
  };

  const closeConfModal = () => {
    setConfModal(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="profile">
        <h1>Edit profile</h1>
        <UserForm
          submitBtn="Update profile"
          onSubmit={onSubmit}
          onDelete={openConfModal}
          defaultName={name}
          defaultLogin={login}
        />
        <ConfModal isOpen={confModal} onSubmit={onDelete} onCancel={closeConfModal}>
          <h3>Do you really want to delete your profile?</h3>
        </ConfModal>
        <ToastMessage message={message as TServerMessage} />
      </div>
    </>
  );
};
