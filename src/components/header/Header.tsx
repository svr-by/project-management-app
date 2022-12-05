import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { signOut, checkToken } from 'redux/slices/userSlice';
import { eraseBoards } from 'redux/slices/boardsSlice';
import { RootState } from 'redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { CustomLink, LangSwitch, AddBoardModal, ThemeSwitcher } from 'components';
import LogoKanban from 'assets/img/logo.png';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import { SideMenu } from 'components/sideMenu/SideMenu';

export const Header = () => {
  const { id: isAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [backColor, setBackColor] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);

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
    dispatch(eraseBoards());
  };

  const openModal = () => {
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  const openMenu = () => {
    setSideMenu(true);
  };

  const closeMenu = () => {
    setSideMenu(false);
  };

  return (
    <header className={backColor ? 'header scroll' : 'header'}>
      <div className="logo">
        <Link to={PATHS.WELCOME} className="logo__link">
          <img className="logo__image" src={LogoKanban} alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <ThemeSwitcher />
        <LangSwitch />
        {isAuth ? (
          <>
            <CustomLink onClick={openModal}>{t('Create board')}</CustomLink>
            <CustomLink to={PATHS.PROFILE}>{t('Edit profile')}</CustomLink>
            <CustomLink onClick={handleSignOut}>{t('Sign out')}</CustomLink>
          </>
        ) : (
          <>
            <CustomLink to={PATHS.SIGN_IN}>{t('sign in')}</CustomLink>
            <CustomLink to={PATHS.SIGN_UP}>{t('sign up')}</CustomLink>
          </>
        )}
      </nav>
      <IconButton size="large" className="hamburger" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <AddBoardModal isOpen={addModal} onCancel={closeModal} />
      <SideMenu
        isOpen={sideMenu}
        onClose={closeMenu}
        isAuth={Boolean(isAuth)}
        handleSignOut={handleSignOut}
        openBoardModal={openModal}
      />
    </header>
  );
};
