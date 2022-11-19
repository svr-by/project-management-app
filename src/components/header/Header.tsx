import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Link, NavLink } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { CustomizedSwitches } from 'components';
import LogoKanban from 'assets/img/kanban-1.svg';
import './Header.scss';

export const Header = () => {
  const user = useSelector((state: RootState) => state.user);

  const [backColor, setBackColor] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setBackColor(window.scrollY);
  };

  return (
    <header className={backColor ? 'header scroll' : 'header'}>
      <div className="logo">
        <Link to={PATHS.HOME} className="logo__link">
          <img src={LogoKanban} alt="LogoKanban" className="logo__image" />
          <p className="logo__description">Kanban</p>
        </Link>
      </div>
      <nav className="nav">
        <CustomizedSwitches />
        {!user.id ? (
          <>
            <NavLink to={PATHS.SIGN_IN} className="custom-link">
              Sign in
            </NavLink>
            <NavLink to={PATHS.SIGN_UP} className="custom-link">
              Sign up
            </NavLink>
          </>
        ) : (
          <a className="custom-link">Sign out</a>
        )}
      </nav>
    </header>
  );
};
