import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { signOut, checkToken } from 'redux/slices/userSlice';
import { RootState } from 'redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { CustomLink, CustomSwitch, AddBoardModal, ThemeSwitcher } from 'components';
import { ReactComponent as LogoKanban } from 'assets/img/kanban-1.svg';
import './Header.scss';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { id: isAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [backColor, setBackColor] = useState(0);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    dispatch(checkToken());
    isAuth ? navigate(PATHS.MAIN) : navigate(PATHS.WELCOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setBackColor(window.scrollY);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const openModal = () => {
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  return (
    <header className={backColor ? 'header scroll' : 'header'}>
      <div className="logo">
        <Link to={PATHS.WELCOME} className="logo__link">
          <LogoKanban className="logo__image" />
          <p className="logo__description">Kanban</p>
        </Link>
      </div>
      <nav className="nav">
        <ThemeSwitcher />
        <CustomSwitch />
        {isAuth ? (
          <>
            <CustomLink onClick={openModal}>Create board</CustomLink>
            <CustomLink to={PATHS.PROFILE}>Edit profile</CustomLink>
            <CustomLink onClick={handleSignOut}>Sign out</CustomLink>
          </>
        ) : (
          <>
            <CustomLink to={PATHS.SIGN_IN}>{t('sign in')}</CustomLink>
            <CustomLink to={PATHS.SIGN_UP}>{t('sign up')}</CustomLink>
          </>
        )}
      </nav>
      {isAuth && <AddBoardModal isOpen={addModal} onCancel={closeModal} />}
    </header>
  );
};
