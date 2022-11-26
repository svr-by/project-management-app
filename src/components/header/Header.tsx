import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { signOut, checkToken } from 'redux/slices/userSlice';
import { RootState } from 'redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { CustomLink, CustomSwitch } from 'components';
import LogoKanban from 'assets/img/kanban-1.svg';
import './Header.scss';

export const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [backColor, setBackColor] = useState(false);

  useEffect(() => {
    user.id ? navigate(PATHS.MAIN) : navigate(PATHS.WELCOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  useEffect(() => {
    dispatch(checkToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBackColor(true);
    } else {
      setBackColor(false);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <header className={backColor ? 'header scroll' : 'header'}>
      <div className="logo">
        <Link to={PATHS.WELCOME} className="logo__link">
          <img src={LogoKanban} alt="LogoKanban" className="logo__image" />
          <p className="logo__description">Kanban</p>
        </Link>
      </div>
      <nav className="nav">
        <CustomSwitch />
        {!user.id ? (
          <>
            <CustomLink to={PATHS.SIGN_IN}>Sign in</CustomLink>
            <CustomLink to={PATHS.SIGN_UP}>Sign up</CustomLink>
          </>
        ) : (
          <>
            <CustomLink to={PATHS.PROFILE}>Edit profile</CustomLink>
            <CustomLink onClick={handleSignOut}>Sign out</CustomLink>
          </>
        )}
      </nav>
    </header>
  );
};
